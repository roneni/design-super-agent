import 'dotenv/config';
import { runAgent } from './agent.js';
import { loadProjectConfig } from './schemas/project-config.js';
import type { CLIArgs } from './agent.js';

function parseArgs(argv: string[]): CLIArgs {
  let brief = '';
  let config: string | undefined;
  let file: string | undefined;
  let maxTurns: number | undefined;
  let maxBudget: number | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = argv[i + 1];
    switch (arg) {
      case '--brief':
        brief = next ?? '';
        i++;
        break;
      case '--config':
        config = next;
        i++;
        break;
      case '--file':
        file = next;
        i++;
        break;
      case '--max-turns':
        maxTurns = parseInt(next ?? '', 10) || undefined;
        i++;
        break;
      case '--max-budget':
        maxBudget = parseFloat(next ?? '') || undefined;
        i++;
        break;
      case '--help':
        printUsage();
        process.exit(0);
    }
  }

  if (!brief) {
    printUsage();
    process.exit(1);
  }

  return { brief, config, file, maxTurns, maxBudget };
}

function printUsage(): void {
  console.log(`
design-super-agent — Autonomous design director powered by Claude Opus

Usage:
  npx tsx src/index.ts --brief "..." [options]

Required:
  --brief "..."        What you want designed

Options:
  --config <path>      Project config JSON (domain, references, context)
  --file <path>        Target .pen file to work on
  --max-turns <n>      Max agent turns (default: 50)
  --max-budget <usd>   Budget cap in USD (default: 5.00)
  --help               Show this help
`);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  const config = await loadProjectConfig(args.config);
  await runAgent(args.brief, config, args);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
