import { readFile } from 'fs/promises';

export interface ProjectConfig {
  /** Selects domain knowledge modules */
  domain?: 'web' | 'mobile' | 'branding';

  /** Free-text project context injected into system prompt */
  projectContext?: string;

  /** Visual references the agent should study */
  references?: Array<{
    url: string;
    description: string;
  }>;

  /** Override Pencil binary path */
  pencilBinary?: string;
}

export async function loadProjectConfig(configPath?: string): Promise<ProjectConfig> {
  if (!configPath) return {};
  const raw = await readFile(configPath, 'utf-8');
  return JSON.parse(raw) as ProjectConfig;
}
