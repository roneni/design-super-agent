import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

export interface KnowledgeModule {
  category: string;   // 'core', 'domains', 'culture', 'anti-patterns'
  name: string;       // 'color-theory', 'web', etc.
  content: string;    // The actual markdown text
}

const CATEGORIES = ['core', 'domains', 'culture', 'anti-patterns', 'taste', 'reasoning', 'implementation'] as const;

export async function loadKnowledge(knowledgeDir?: string): Promise<KnowledgeModule[]> {
  const dir = knowledgeDir ?? path.join(
    path.dirname(fileURLToPath(import.meta.url)),
  );
  const modules: KnowledgeModule[] = [];

  for (const category of CATEGORIES) {
    const categoryDir = path.join(dir, category);
    const files = await readdir(categoryDir).catch(() => []);
    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = await readFile(path.join(categoryDir, file), 'utf-8');
      modules.push({
        category,
        name: file.replace('.md', ''),
        content,
      });
    }
  }
  return modules;
}

/** Selects which modules to include based on project domain */
export function selectModules(
  modules: KnowledgeModule[],
  domain?: string,
): KnowledgeModule[] {
  // Core, anti-patterns, taste, and reasoning always included
  const selected = modules.filter(
    m => m.category === 'core' || m.category === 'anti-patterns'
      || m.category === 'taste' || m.category === 'reasoning',
  );

  // Domain-specific if project specifies one
  if (domain) {
    selected.push(
      ...modules.filter(m => m.category === 'domains' && m.name === domain),
    );
  }

  // Always include foundational domain modules (user-research, design-systems)
  const alwaysIncludeDomains = ['user-research', 'design-systems'];
  for (const name of alwaysIncludeDomains) {
    if (!selected.some(m => m.name === name)) {
      const mod = modules.find(m => m.category === 'domains' && m.name === name);
      if (mod) selected.push(mod);
    }
  }

  // Include data-visualization for dashboard/analytics domains
  if (domain && ['dashboard', 'analytics', 'saas', 'data'].includes(domain)) {
    const dataViz = modules.find(m => m.category === 'domains' && m.name === 'data-visualization');
    if (dataViz && !selected.includes(dataViz)) selected.push(dataViz);
  }

  // Culture always included
  selected.push(...modules.filter(m => m.category === 'culture'));

  return selected;
}
