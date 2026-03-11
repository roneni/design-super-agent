/**
 * Custom in-process tools for capabilities the built-in tools don't cover.
 *
 * Uses the SDK's createSdkMcpServer() for proper in-process MCP server creation.
 * These tools are exposed to sub-agents (primarily code-generator) for:
 * - Image generation (hero images, backgrounds, illustrations, icons)
 * - Image comparison (before/after design review)
 * - Regression detection (before/after visual diff)
 */

import { createSdkMcpServer, tool } from '@anthropic-ai/claude-agent-sdk';
import Anthropic from '@anthropic-ai/sdk';
import { readFile, readdir } from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';
import { join } from 'path';
import { z } from 'zod';
import { getImageService } from './image-generation.js';
import type { ImageProvider, FalModel, OpenAIModel, GenerateOptions } from './image-generation.js';
import { getReferenceLibrary } from './reference-library.js';
import { GENRE_IDS, QUALITY_TIERS } from '../types/reference-library.js';
import type { GenreId, QualityTier } from '../types/reference-library.js';

const execAsync = promisify(exec);

// ── Deployment Command Blocklist ──────────────────────────────────────────
// These patterns block shell commands that would deploy code to external services.
// This is a CODE-LEVEL guardrail — it cannot be overridden by prompts or briefs.
// See AGENT_SAFETY.md Rule 1.
const BLOCKED_COMMAND_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\bvercel\b/i, label: 'vercel' },
  { pattern: /\bnetlify\s+deploy\b/i, label: 'netlify deploy' },
  { pattern: /\bgit\s+push\b/i, label: 'git push' },
  { pattern: /\bnpm\s+publish\b/i, label: 'npm publish' },
  { pattern: /\bnpx\s+wrangler\b/i, label: 'wrangler (Cloudflare)' },
  { pattern: /\bfirebase\s+deploy\b/i, label: 'firebase deploy' },
  { pattern: /\bsurge\b/i, label: 'surge' },
  { pattern: /\bgh-pages\b/i, label: 'gh-pages' },
  { pattern: /\baws\s+s3\s+(sync|cp)\b/i, label: 'aws s3 deploy' },
  { pattern: /\bflyctl\s+deploy\b/i, label: 'fly.io deploy' },
  { pattern: /\brailway\s+(up|deploy)\b/i, label: 'railway deploy' },
  { pattern: /\bheroku\b/i, label: 'heroku' },
  { pattern: /\brender\s+deploy\b/i, label: 'render deploy' },
];

// ── Vision Helpers ────────────────────────────────────────────────────────

async function loadImageAsBase64(filePath: string): Promise<{
  base64: string;
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';
}> {
  const buffer = await readFile(filePath);
  const base64 = buffer.toString('base64');
  const ext = filePath.split('.').pop()?.toLowerCase();
  const mediaTypeMap: Record<string, 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
  };
  return { base64, mediaType: mediaTypeMap[ext ?? 'png'] ?? 'image/png' };
}

function getAnthropicClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
}

export function createCustomTools() {
  return createSdkMcpServer({
    name: 'custom-tools',
    tools: [
      // ── Image Generation ────────────────────────────────────────────
      tool(
        'generate_image',
        'Generate an image from a text prompt using AI (Flux, GPT Image, Ideogram, Recraft, etc). ' +
        'Saves the image to disk and returns the file path. ' +
        'Use this when building websites/code that need hero images, backgrounds, illustrations, icons, or brand assets. ' +
        "For .pen file work, use Pencil's built-in G() operation instead.",
        {
          prompt: z.string().describe(
            'Detailed text prompt describing the image. Be specific about style, colors, composition, mood.',
          ),
          provider: z.enum(['fal', 'openai']).optional().describe(
            'Image provider. "fal" (default) uses fal.ai — fastest and cheapest. "openai" uses GPT Image — best quality.',
          ),
          model: z.enum([
            'flux-schnell', 'flux-2-klein', 'flux-2-pro',
            'flux-kontext-pro', 'flux-kontext-max',
            'recraft-v3', 'recraft-v3-svg',
            'ideogram-v3', 'ideogram-v3-turbo',
            'imagen-4-fast', 'imagen-4-pro',
            'gpt-image-1', 'gpt-image-1.5',
          ]).optional().describe(
            'Specific model. Defaults to flux-2-pro (fal) or gpt-image-1 (openai).',
          ),
          aspect_ratio: z.enum(['1:1', '16:9', '9:16', '4:3', '3:4', '3:2', '2:3']).optional().describe(
            'Aspect ratio. Common: 16:9 for hero banners, 1:1 for cards.',
          ),
          width: z.number().optional().describe('Image width in pixels (default 1024).'),
          height: z.number().optional().describe('Image height in pixels (default 768).'),
          output_dir: z.string().optional().describe('Directory to save the image to.'),
          filename: z.string().optional().describe('Output filename.'),
          format: z.enum(['png', 'jpeg', 'webp']).optional().describe('Image format (default: png).'),
          negative_prompt: z.string().optional().describe('What to avoid in the image.'),
          style: z.enum(['photorealistic', 'illustration', 'graphic-design', 'artistic', 'minimal']).optional().describe(
            'Style hint for the generator.',
          ),
        },
        async (args) => {
          try {
            const service = getImageService();
            const available = service.getAvailableProviders();

            if (available.length === 0) {
              return {
                content: [{
                  type: 'text' as const,
                  text: 'ERROR: No image generation provider configured. Set FAL_KEY or OPENAI_API_KEY.',
                }],
              };
            }

            const options: GenerateOptions = {
              provider: args.provider as ImageProvider | undefined,
              model: args.model as FalModel | OpenAIModel | undefined,
              aspectRatio: args.aspect_ratio as GenerateOptions['aspectRatio'],
              width: args.width,
              height: args.height,
              outputDir: args.output_dir,
              filename: args.filename,
              format: args.format as GenerateOptions['format'],
              negativePrompt: args.negative_prompt,
              style: args.style as GenerateOptions['style'],
            };

            const result = await service.generate(args.prompt, options);

            return {
              content: [{
                type: 'text' as const,
                text: JSON.stringify({
                  success: true,
                  filePath: result.filePath,
                  provider: result.provider,
                  model: result.model,
                  dimensions: `${result.width}x${result.height}`,
                  fileSize: `${(result.fileSize / 1024).toFixed(1)}KB`,
                  format: result.format,
                  sourceUrl: result.sourceUrl,
                }, null, 2),
              }],
            };
          } catch (err) {
            return {
              content: [{
                type: 'text' as const,
                text: `ERROR generating image: ${err instanceof Error ? err.message : String(err)}`,
              }],
            };
          }
        },
      ),

      // ── Batch Image Generation ──────────────────────────────────────
      tool(
        'generate_images_batch',
        'Generate multiple images in parallel. Use when you need several assets at once ' +
        '(e.g., hero image + section backgrounds + icons).',
        {
          images: z.array(z.object({
            prompt: z.string().describe('Image prompt'),
            filename: z.string().describe('Output filename'),
            model: z.string().optional().describe('Model to use'),
            aspect_ratio: z.string().optional().describe('Aspect ratio (e.g., 16:9, 1:1)'),
            width: z.number().optional().describe('Image width in pixels'),
            height: z.number().optional().describe('Image height in pixels'),
          })).describe('Array of image generation requests'),
          output_dir: z.string().optional().describe('Shared output directory for all images'),
          provider: z.enum(['fal', 'openai']).optional().describe('Provider for all images'),
        },
        async (args) => {
          try {
            const service = getImageService();

            const results = await Promise.allSettled(
              args.images.map(img =>
                service.generate(img.prompt, {
                  provider: args.provider as ImageProvider | undefined,
                  model: img.model as FalModel | OpenAIModel | undefined,
                  aspectRatio: img.aspect_ratio as GenerateOptions['aspectRatio'],
                  width: img.width,
                  height: img.height,
                  outputDir: args.output_dir,
                  filename: img.filename,
                }),
              ),
            );

            const summary = results.map((r, i) => {
              if (r.status === 'fulfilled') {
                return {
                  filename: args.images[i].filename,
                  success: true,
                  filePath: r.value.filePath,
                  dimensions: `${r.value.width}x${r.value.height}`,
                };
              }
              return {
                filename: args.images[i].filename,
                success: false,
                error: r.reason instanceof Error ? r.reason.message : String(r.reason),
              };
            });

            const succeeded = summary.filter(s => s.success).length;
            const failed = summary.filter(s => !s.success).length;

            return {
              content: [{
                type: 'text' as const,
                text: JSON.stringify({ total: args.images.length, succeeded, failed, results: summary }, null, 2),
              }],
            };
          } catch (err) {
            return {
              content: [{
                type: 'text' as const,
                text: `ERROR in batch generation: ${err instanceof Error ? err.message : String(err)}`,
              }],
            };
          }
        },
      ),

      // ── Image Comparison ────────────────────────────────────────────
      tool(
        'compare_images',
        "Compare two images using Claude vision and describe visual differences. " +
        "Used to check if a sub-agent's changes improved the design. Returns structured analysis " +
        "of layout, color, typography, imagery, and overall quality changes.",
        {
          before_path: z.string().describe('Path to the before screenshot'),
          after_path: z.string().describe('Path to the after screenshot'),
          focus_areas: z.string().optional().describe('What to focus the comparison on (e.g., "color palette", "layout", "typography")'),
        },
        async (args) => {
          try {
            const client = getAnthropicClient();
            if (!client) {
              return {
                content: [{
                  type: 'text' as const,
                  text: 'ERROR: ANTHROPIC_API_KEY not set. Cannot perform vision-based comparison.',
                }],
              };
            }

            const [before, after] = await Promise.all([
              loadImageAsBase64(args.before_path),
              loadImageAsBase64(args.after_path),
            ]);

            const focusInstruction = args.focus_areas
              ? `\n\nPay special attention to: ${args.focus_areas}`
              : '';

            const response = await client.messages.create({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 1500,
              messages: [{
                role: 'user',
                content: [
                  { type: 'text', text: 'BEFORE image:' },
                  { type: 'image', source: { type: 'base64', media_type: before.mediaType, data: before.base64 } },
                  { type: 'text', text: 'AFTER image:' },
                  { type: 'image', source: { type: 'base64', media_type: after.mediaType, data: after.base64 } },
                  {
                    type: 'text',
                    text: `Compare these two design screenshots (BEFORE and AFTER). Provide a structured analysis:${focusInstruction}

Return JSON with these fields:
{
  "overall_improved": true/false,
  "changes": [
    { "area": "layout|color|typography|imagery|spacing|motion|content", "description": "what changed", "improvement": true/false }
  ],
  "quality_shift": "better|worse|lateral" (overall quality direction),
  "before_tier": "stock|competent|professional|exceptional|masterclass",
  "after_tier": "stock|competent|professional|exceptional|masterclass",
  "summary": "1-2 sentence summary of the most significant change"
}`,
                  },
                ],
              }],
            });

            const text = response.content.find(b => b.type === 'text');
            return {
              content: [{
                type: 'text' as const,
                text: text ? text.text : 'No comparison result returned.',
              }],
            };
          } catch (err) {
            return {
              content: [{
                type: 'text' as const,
                text: `ERROR comparing images: ${err instanceof Error ? err.message : String(err)}`,
              }],
            };
          }
        },
      ),

      // ── Provider Status ─────────────────────────────────────────────
      tool(
        'check_image_providers',
        'Check which image generation providers are configured and available.',
        {},
        async () => {
          const service = getImageService();
          const available = service.getAvailableProviders();
          const allProviders = ['fal', 'openai'] as const;

          const status = allProviders.map(p => ({
            provider: p,
            available: available.includes(p),
            envVar: p === 'fal' ? 'FAL_KEY or FAL_API_KEY' : 'OPENAI_API_KEY',
            models: p === 'fal'
              ? ['flux-schnell', 'flux-2-klein', 'flux-2-pro', 'flux-kontext-pro',
                 'flux-kontext-max', 'recraft-v3', 'recraft-v3-svg', 'ideogram-v3',
                 'ideogram-v3-turbo', 'imagen-4-fast', 'imagen-4-pro']
              : ['gpt-image-1', 'gpt-image-1.5'],
          }));

          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({ available_providers: available, details: status }, null, 2),
            }],
          };
        },
      ),

      // ── Reference Library: Browse ─────────────────────────────────────
      tool(
        'browse_references',
        'Browse the visual reference library. Returns metadata only (no images). ' +
        'Use without genre to see all available genres and image counts. ' +
        'Use with genre to see filtered image metadata including tier justifications ' +
        'that explain WHY each image is at its quality level.',
        {
          genre: z.enum(GENRE_IDS as unknown as [string, ...string[]]).optional().describe(
            'Filter by genre. Omit to see all genres with counts.',
          ),
          tier: z.enum(QUALITY_TIERS as unknown as [string, ...string[]]).optional().describe(
            'Filter by quality tier: stock (40-50), competent (55-65), professional (70-80), exceptional (85-95), masterclass (95-100).',
          ),
          tags: z.array(z.string()).optional().describe(
            'Filter by tags (any match). E.g., ["nebula", "sacred-geometry"].',
          ),
          limit: z.number().min(1).max(25).optional().describe(
            'Max results to return (default 10, max 25).',
          ),
        },
        async (args) => {
          try {
            const library = getReferenceLibrary();

            if (!library.isAvailable()) {
              return {
                content: [{
                  type: 'text' as const,
                  text: JSON.stringify({
                    available: false,
                    message: 'Reference library not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env.',
                  }),
                }],
              };
            }

            // No genre → return global manifest (genre list with counts)
            if (!args.genre) {
              const global = await library.getGlobalManifest();
              if (!global) {
                return {
                  content: [{
                    type: 'text' as const,
                    text: JSON.stringify({
                      available: true,
                      populated: false,
                      message: 'Reference library is configured but has no data yet. Run "npm run populate:all" to populate.',
                    }),
                  }],
                };
              }
              return {
                content: [{
                  type: 'text' as const,
                  text: JSON.stringify({
                    available: true,
                    populated: true,
                    totalImages: global.totalImages,
                    genres: global.genres,
                    lastUpdated: global.lastUpdated,
                  }, null, 2),
                }],
              };
            }

            // With genre → return filtered image metadata
            const result = await library.browseReferences({
              genre: args.genre as GenreId,
              tier: args.tier as QualityTier | undefined,
              tags: args.tags,
              limit: args.limit,
            });

            if (!result) {
              return {
                content: [{
                  type: 'text' as const,
                  text: JSON.stringify({
                    available: true,
                    genre: args.genre,
                    message: `No data for genre "${args.genre}". Run: npm run populate:references --genre ${args.genre}`,
                  }),
                }],
              };
            }

            return {
              content: [{
                type: 'text' as const,
                text: JSON.stringify({
                  genre: args.genre,
                  tier: args.tier ?? 'all',
                  totalAvailable: result.totalAvailable,
                  returned: result.images.length,
                  images: result.images.map(img => ({
                    id: img.id,
                    key: img.key,
                    tier: img.tier,
                    tierJustification: img.tierJustification,
                    demonstrates: img.demonstrates,
                    tags: img.tags,
                    source: img.source,
                    dimensions: `${img.width}x${img.height}`,
                    curationStatus: img.curationStatus,
                  })),
                }, null, 2),
              }],
            };
          } catch (err) {
            return {
              content: [{
                type: 'text' as const,
                text: `ERROR browsing references: ${err instanceof Error ? err.message : String(err)}`,
              }],
            };
          }
        },
      ),

      // ── Reference Library: View ───────────────────────────────────────
      tool(
        'view_reference',
        'View actual reference images from the library. Returns images as base64 with metadata. ' +
        'Use this to SEE reference images before designing — calibrate your quality standards against real examples. ' +
        'Max 5 images per call (~1.5MB total).',
        {
          keys: z.array(z.string()).min(1).max(5).describe(
            'R2 object keys of images to view (from browse_references results). Max 5.',
          ),
        },
        async (args) => {
          try {
            const library = getReferenceLibrary();

            if (!library.isAvailable()) {
              return {
                content: [{
                  type: 'text' as const,
                  text: 'Reference library not configured. Set R2 credentials in .env.',
                }],
              };
            }

            const contentBlocks: Array<
              | { type: 'text'; text: string }
              | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
            > = [];

            for (const key of args.keys) {
              const imageData = await library.getImageAsBase64(key);

              if (!imageData) {
                contentBlocks.push({
                  type: 'text' as const,
                  text: `[${key}] — Image not found in R2.`,
                });
                continue;
              }

              // Add metadata text block
              contentBlocks.push({
                type: 'text' as const,
                text: `[${key}]`,
              });

              // Add the actual image
              contentBlocks.push({
                type: 'image' as const,
                source: {
                  type: 'base64' as const,
                  media_type: imageData.mimeType,
                  data: imageData.base64,
                },
              });
            }

            if (contentBlocks.length === 0) {
              contentBlocks.push({
                type: 'text' as const,
                text: 'No images found for the provided keys.',
              });
            }

            return { content: contentBlocks };
          } catch (err) {
            return {
              content: [{
                type: 'text' as const,
                text: `ERROR viewing references: ${err instanceof Error ? err.message : String(err)}`,
              }],
            };
          }
        },
      ),
      // ── Safe Bash (Deployment-Filtered Shell) ───────────────────────
      tool(
        'safe_bash',
        'Execute a shell command with deployment safety filtering. ' +
        'Blocks commands that would deploy to external services (vercel, netlify, git push, npm publish, etc). ' +
        'Use for all shell operations: npm install, npm run build, npx, node, etc. ' +
        'This is the ONLY shell access available — the standard Bash tool is not provided.',
        {
          command: z.string().describe('The shell command to execute'),
          cwd: z.string().optional().describe('Working directory for the command'),
          timeout: z.number().optional().describe('Timeout in milliseconds (default: 120000, max: 300000)'),
        },
        async (args) => {
          // Check for blocked deployment patterns
          const blocked = BLOCKED_COMMAND_PATTERNS.find(p => p.pattern.test(args.command));
          if (blocked) {
            return {
              content: [{
                type: 'text' as const,
                text: `BLOCKED: Command contains deployment pattern "${blocked.label}". ` +
                  'Deployment is forbidden per AGENT_SAFETY.md Rule 1. ' +
                  "The agent's job ends at \"npm run build\". The user deploys manually.",
              }],
            };
          }

          try {
            const timeout = Math.min(args.timeout ?? 120000, 300000);
            const result = await execAsync(args.command, {
              cwd: args.cwd,
              timeout,
              maxBuffer: 10 * 1024 * 1024, // 10MB
              shell: '/bin/zsh',
            });

            let output = '';
            if (result.stdout) output += result.stdout;
            if (result.stderr) output += (output ? '\n' : '') + result.stderr;

            return {
              content: [{
                type: 'text' as const,
                text: output || '(command completed with no output)',
              }],
            };
          } catch (err: unknown) {
            const execErr = err as { stdout?: string; stderr?: string; code?: number; message?: string };
            let output = '';
            if (execErr.stdout) output += execErr.stdout;
            if (execErr.stderr) output += (output ? '\n' : '') + execErr.stderr;
            if (!output && execErr.message) output = execErr.message;

            return {
              content: [{
                type: 'text' as const,
                text: `Command failed (exit code ${execErr.code ?? 'unknown'}):\n${output}`,
              }],
            };
          }
        },
      ),

      // ── Image Count Gate ───────────────────────────────────────────────
      tool(
        'validate_project_images',
        'Count actual image files in a project directory and compare against expected count from the Visual Asset Plan. ' +
        'Returns PASS if enough images exist, FAIL if not. Use this as a post-build gate before approving any visual design. ' +
        'This is a CODE-LEVEL check — it counts real files, not what the sub-agent claims to have generated.',
        {
          project_dir: z.string().describe('Absolute path to the project directory'),
          expected_count: z.number().min(0).describe('Number of generated images the Visual Asset Plan specified'),
          image_dirs: z.array(z.string()).optional().describe(
            'Directories to search relative to project_dir (default: ["public/images", "public", "src/assets", "images"])',
          ),
        },
        async (args) => {
          const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);
          const searchDirs = args.image_dirs ?? ['public/images', 'public', 'src/assets', 'images'];
          const foundImages: string[] = [];

          for (const dir of searchDirs) {
            const fullDir = join(args.project_dir, dir);
            try {
              const entries = await readdir(fullDir, { recursive: true });
              for (const entry of entries) {
                const name = String(entry);
                const ext = '.' + name.split('.').pop()?.toLowerCase();
                if (IMAGE_EXTENSIONS.has(ext)) {
                  const relPath = join(dir, name);
                  if (!foundImages.includes(relPath)) {
                    foundImages.push(relPath);
                  }
                }
              }
            } catch {
              // Directory doesn't exist — skip
            }
          }

          const passed = foundImages.length >= args.expected_count;

          return {
            content: [{
              type: 'text' as const,
              text: JSON.stringify({
                verdict: passed ? 'PASS' : 'FAIL',
                expected: args.expected_count,
                found: foundImages.length,
                images: foundImages,
                message: passed
                  ? `Image count gate PASSED: ${foundImages.length}/${args.expected_count} images found.`
                  : `IMAGE COUNT GATE FAILED: Expected ${args.expected_count} images but found only ${foundImages.length}. ` +
                    'The Visual Asset Plan specified imagery that was not generated. ' +
                    'Delegate to code-generator with explicit image generation prompts before approving.',
              }, null, 2),
            }],
          };
        },
      ),

      // ── Regression Detection ─────────────────────────────────────────
      tool(
        'check_regression',
        'Detect visual regressions between before/after screenshots. ' +
        'Uses Claude vision to find lost content, broken layouts, color shifts, missing images, ' +
        'and other unintended changes. Returns a structured report with severity levels.',
        {
          before_path: z.string().describe('Path to the before screenshot (baseline)'),
          after_path: z.string().describe('Path to the after screenshot (current)'),
          protected_elements: z.array(z.string()).optional().describe(
            'Elements that MUST survive the iteration (e.g., ["hero counter animation", "navbar logo", "gradient transitions"])',
          ),
        },
        async (args) => {
          try {
            const client = getAnthropicClient();
            if (!client) {
              return {
                content: [{
                  type: 'text' as const,
                  text: 'ERROR: ANTHROPIC_API_KEY not set. Cannot perform regression detection.',
                }],
              };
            }

            const [before, after] = await Promise.all([
              loadImageAsBase64(args.before_path),
              loadImageAsBase64(args.after_path),
            ]);

            const protectedList = args.protected_elements?.length
              ? `\n\nPROTECTED ELEMENTS (must be present in AFTER):\n${args.protected_elements.map(e => `- ${e}`).join('\n')}`
              : '';

            const response = await client.messages.create({
              model: 'claude-haiku-4-5-20251001',
              max_tokens: 2000,
              messages: [{
                role: 'user',
                content: [
                  { type: 'text', text: 'BEFORE (baseline) screenshot:' },
                  { type: 'image', source: { type: 'base64', media_type: before.mediaType, data: before.base64 } },
                  { type: 'text', text: 'AFTER (current) screenshot:' },
                  { type: 'image', source: { type: 'base64', media_type: after.mediaType, data: after.base64 } },
                  {
                    type: 'text',
                    text: `You are a visual regression detector for web design. Compare BEFORE (baseline) to AFTER (current) and identify any REGRESSIONS — things that got WORSE or were LOST.${protectedList}

Return JSON:
{
  "has_regressions": true/false,
  "severity": "none|low|medium|high|critical",
  "regressions": [
    {
      "type": "lost_content|broken_layout|color_shift|missing_image|typography_change|spacing_issue|animation_lost|accessibility_regression",
      "severity": "low|medium|high|critical",
      "description": "specific description of what regressed",
      "location": "where on the page (e.g., 'hero section', 'footer', 'top-right')"
    }
  ],
  "protected_element_status": [
    { "element": "name", "present": true/false, "notes": "any changes observed" }
  ],
  "improvements": ["list of things that genuinely improved (not regressions)"],
  "verdict": "PASS (no regressions) | WARN (minor regressions) | FAIL (critical regressions that must be fixed)"
}

Focus on REGRESSIONS only. Intentional design improvements are NOT regressions. A regression is something that was working before and is now broken, missing, or degraded.`,
                  },
                ],
              }],
            });

            const text = response.content.find(b => b.type === 'text');
            return {
              content: [{
                type: 'text' as const,
                text: text ? text.text : 'No regression analysis returned.',
              }],
            };
          } catch (err) {
            return {
              content: [{
                type: 'text' as const,
                text: `ERROR checking regressions: ${err instanceof Error ? err.message : String(err)}`,
              }],
            };
          }
        },
      ),
    ],
  });
}
