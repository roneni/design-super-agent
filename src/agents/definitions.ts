import type { ProjectConfig } from '../schemas/project-config.js';
import {
  PENCIL_EXECUTOR_PROMPT,
  CODE_GENERATOR_PROMPT,
  RESEARCHER_PROMPT,
} from '../prompts/sub-agents.js';

/** Agent definition shape expected by the SDK */
export interface AgentDefinition {
  description: string;
  prompt: string;
  model?: 'sonnet' | 'opus' | 'haiku' | 'inherit';
  tools?: string[];
  disallowedTools?: string[];
  maxTurns?: number;
}

export function buildSubAgentDefinitions(
  _config: ProjectConfig,
): Record<string, AgentDefinition> {
  return {
    'pencil-executor': {
      description:
        'Executes design changes in Pencil .pen files. Use when you need to create or modify visual designs.',
      prompt: PENCIL_EXECUTOR_PROMPT,
      model: 'sonnet',
      tools: [
        'mcp__pencil__batch_design',
        'mcp__pencil__batch_get',
        'mcp__pencil__get_screenshot',
        'mcp__pencil__get_editor_state',
        'mcp__pencil__snapshot_layout',
        'mcp__pencil__find_empty_space_on_canvas',
        'mcp__pencil__get_guidelines',
        'mcp__pencil__get_style_guide',
        'mcp__pencil__get_style_guide_tags',
        'mcp__pencil__open_document',
        'mcp__pencil__search_all_unique_properties',
        'mcp__pencil__replace_all_matching_properties',
        'mcp__pencil__get_variables',
        'mcp__pencil__set_variables',
      ],
      maxTurns: 20,
    },

    'code-generator': {
      description:
        'Full-stack web builder. Can scaffold entire projects from scratch (Vite/React/Next.js), ' +
        'install dependencies (Tailwind, Framer Motion, fonts), generate AI images ' +
        '(hero backgrounds, illustrations, icons, brand assets), write React/TypeScript components, ' +
        'implement animations and CSS effects, and run local builds. ' +
        'CANNOT deploy — deployment is disabled for safety. ' +
        'Use for any task that produces code/website output, not a .pen file.',
      prompt: CODE_GENERATOR_PROMPT,
      model: 'sonnet',
      tools: [
        // File operations
        'Read', 'Write', 'Edit', 'Glob', 'Grep',
        // Shell — deployment-filtered (blocks vercel, netlify, git push, etc.)
        'mcp__custom-tools__safe_bash',
        // Image generation
        'mcp__custom-tools__generate_image',
        'mcp__custom-tools__generate_images_batch',
        'mcp__custom-tools__check_image_providers',
      ],
      maxTurns: 40,
    },

    researcher: {
      description:
        'Researches visual references, cultural context, and design inspiration from the web.',
      prompt: RESEARCHER_PROMPT,
      model: 'haiku',
      tools: ['WebFetch', 'WebSearch', 'Read'],
      maxTurns: 10,
    },
  };
}
