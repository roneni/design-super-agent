import { query } from '@anthropic-ai/claude-agent-sdk';
import type { SDKMessage } from '@anthropic-ai/claude-agent-sdk';
import path from 'path';
import { buildSystemPrompt } from './prompts/system.js';
import { buildSubAgentDefinitions } from './agents/definitions.js';
import { verdictSchema } from './schemas/verdict.js';
import { createCustomTools } from './tools/custom.js';
import { getImageService } from './tools/image-generation.js';
import type { ProjectConfig } from './schemas/project-config.js';

export interface CLIArgs {
  brief: string;
  config?: string;
  file?: string;
  maxTurns?: number;
  maxBudget?: number;
}

function logMessage(msg: SDKMessage): void {
  switch (msg.type) {
    case 'system':
      if (msg.subtype === 'init') {
        console.log('\n--- Agent initialized ---');
        console.log(`  Model: ${msg.model}`);
        console.log(`  Tools: ${msg.tools.length} available`);
        console.log(
          `  MCP: ${msg.mcp_servers.map((s: { name: string; status: string }) => `${s.name}(${s.status})`).join(', ')}`,
        );
      }
      break;

    case 'assistant':
      for (const block of msg.message.content) {
        if (block.type === 'text' && block.text.trim()) {
          const preview = block.text.slice(0, 300);
          console.log(`\n[director] ${preview}${block.text.length > 300 ? '...' : ''}`);
        }
        if (block.type === 'tool_use') {
          console.log(`\n[tool] ${block.name}`);
        }
      }
      break;

    case 'result':
      if (msg.subtype === 'success') {
        console.log('\n--- Agent finished ---');
        console.log(`  Turns: ${msg.num_turns}`);
        console.log(`  Cost: $${msg.total_cost_usd.toFixed(4)}`);
        console.log(`  Duration: ${(msg.duration_ms / 1000).toFixed(1)}s`);
        if (msg.result) {
          console.log(`\nFinal verdict:\n${msg.result}`);
        }
      } else {
        console.error(`\nAgent ended: ${msg.subtype}`);
        if ('errors' in msg && msg.errors) {
          for (const err of msg.errors as string[]) {
            console.error(`  ${err}`);
          }
        }
      }
      break;
  }
}

export async function runAgent(
  brief: string,
  config: ProjectConfig,
  args: CLIArgs,
): Promise<void> {
  const systemPrompt = await buildSystemPrompt(config);
  const agents = buildSubAgentDefinitions(config);
  const customTools = createCustomTools();

  const pencilBinary =
    config.pencilBinary ??
    process.env.PENCIL_MCP_PATH ??
    '/Applications/Pencil.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64';

  // Check image generation availability
  const imageService = getImageService();
  const imageProviders = imageService.getAvailableProviders();

  console.log('=== Design Super Agent ===');
  console.log(`Brief: ${brief}`);
  console.log(`Domain: ${config.domain ?? 'general'}`);
  console.log(`Pencil MCP: ${pencilBinary}`);
  console.log(`Image providers: ${imageProviders.length > 0 ? imageProviders.join(', ') : 'NONE (set FAL_KEY or OPENAI_API_KEY)'}`);
  console.log(`Max turns: ${args.maxTurns ?? 50}`);
  console.log(`Budget: $${(args.maxBudget ?? 5.0).toFixed(2)}`);

  // Build the prompt — include file context if specified
  let prompt = brief;
  if (args.file) {
    const filePath = path.resolve(args.file);
    prompt = `Work on the Pencil file at: ${filePath}\n\nIMPORTANT: When delegating to pencil-executor, always include this exact file path in your instructions so it can call open_document("${filePath}") FIRST before making any changes.\n\nBrief: ${brief}`;
  }

  // Add reference study instructions if references exist
  if (config.references?.length) {
    prompt += '\n\nBefore starting design work, study these references first:\n';
    for (const ref of config.references) {
      prompt += `- ${ref.description}: ${ref.url}\n`;
    }
  }

  const startTime = Date.now();

  // Remove CLAUDECODE env var to allow spawning inside an existing Claude Code session.
  // The Agent SDK inherits process.env for the Claude Code subprocess.
  delete process.env.CLAUDECODE;

  const conversation = query({
    prompt,
    options: {
      model: 'claude-opus-4-6',
      systemPrompt,

      // Sub-agents the super agent can spawn
      agents,

      // MCP connections
      mcpServers: {
        pencil: {
          command: pencilBinary,
          args: ['--app', 'desktop'],
        },
        // Custom tools server (image generation, comparison) — runs in-process via SDK
        'custom-tools': customTools,
      },

      // What the main agent can do directly
      allowedTools: [
        'Agent',               // Spawn sub-agents
        'Read',                // Read screenshots/files for vision
        'WebFetch',            // Fetch reference sites
        'WebSearch',           // Research references
        'AskUserQuestion',     // Escalate to human
        'mcp__pencil__get_screenshot',    // Review design visually
        'mcp__pencil__get_editor_state',  // Check Pencil connection
        'mcp__custom-tools__compare_images',         // Compare before/after
        'mcp__custom-tools__check_regression',       // Detect visual regressions
        'mcp__custom-tools__check_image_providers',  // Check what's available
        'mcp__custom-tools__browse_references',      // Browse reference library metadata
        'mcp__custom-tools__view_reference',         // View reference images (base64)
        'mcp__custom-tools__validate_project_images', // Post-build image count gate
      ],

      // No disallowedTools — restrictions are enforced via system prompt (delegation rules).
      // Sub-agents inherit disallowedTools, so restricting here would break their access.

      // Execution limits
      maxTurns: args.maxTurns ?? 50,
      maxBudgetUsd: args.maxBudget ?? 5.0,

      // Structured verdict output
      outputFormat: {
        type: 'json_schema',
        schema: verdictSchema,
      },

      // Extended thinking for Opus
      thinking: { type: 'enabled', budgetTokens: 10000 },

      // Full autonomy for sub-agents
      permissionMode: 'bypassPermissions',
      allowDangerouslySkipPermissions: true,

      // Working directory
      cwd: args.file ? path.dirname(path.resolve(args.file)) : process.cwd(),
    },
  });

  // Process streaming messages
  for await (const message of conversation) {
    logMessage(message);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nTotal wall time: ${elapsed}s`);
}
