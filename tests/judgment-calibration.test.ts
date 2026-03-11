/**
 * Judgment Calibration Tests
 *
 * Validates the agent's judgment prompt against known good/bad designs.
 * Uses the raw Anthropic SDK (not Agent SDK) to test the judgment prompt in isolation.
 *
 * Usage: npx tsx tests/judgment-calibration.test.ts
 *
 * To add test cases:
 * 1. Place screenshots in tests/fixtures/
 * 2. Add a TestCase entry with expected verdict and failure rules
 */

import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '../src/prompts/system.js';
import { readFile, readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface TestCase {
  name: string;
  screenshotPath: string;
  expectedVerdict: 'approve' | 'reject';
  expectedFailures?: string[];  // Knowledge base rules it should cite
  domain?: 'web' | 'mobile' | 'branding';
}

// Test cases — populate with real screenshots in tests/fixtures/
const testCases: TestCase[] = [
  // Example (uncomment and add real screenshots):
  // {
  //   name: 'Good landing page with clear hierarchy',
  //   screenshotPath: 'fixtures/good-landing-page.png',
  //   expectedVerdict: 'approve',
  //   domain: 'web',
  // },
  // {
  //   name: 'Bad contrast - light gray text on white',
  //   screenshotPath: 'fixtures/bad-contrast.png',
  //   expectedVerdict: 'reject',
  //   expectedFailures: ['contrast ratio below 4.5:1'],
  //   domain: 'web',
  // },
];

async function runTest(tc: TestCase, systemPrompt: string): Promise<{
  passed: boolean;
  name: string;
  expected: string;
  actual: string;
  citedFailures: string[];
  reasoning: string;
}> {
  const client = new Anthropic();
  const screenshotFullPath = path.join(__dirname, tc.screenshotPath);
  const screenshot = await readFile(screenshotFullPath);
  const base64 = screenshot.toString('base64');

  // Determine media type from extension
  const ext = path.extname(tc.screenshotPath).toLowerCase();
  const mediaType = ext === '.jpg' || ext === '.jpeg'
    ? 'image/jpeg' as const
    : 'image/png' as const;

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2000,
    system: systemPrompt,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: mediaType, data: base64 },
        },
        {
          type: 'text',
          text: 'Judge this design. Respond with:\n1. Verdict: APPROVE or REJECT\n2. If REJECT: cite specific failures from your knowledge base\n3. Brief reasoning (2-3 sentences)',
        },
      ],
    }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map(b => b.text)
    .join('\n');

  const verdictMatch = text.match(/\b(APPROVE|REJECT)\b/i);
  const actualVerdict = verdictMatch ? verdictMatch[1].toLowerCase() : 'unknown';

  // Extract cited failures
  const citedFailures: string[] = [];
  const failLines = text.match(/FAIL:.*$/gm) ?? [];
  citedFailures.push(...failLines.map(l => l.replace(/^.*FAIL:\s*/, '').trim()));

  // Check if expected failures are cited
  let failuresCited = true;
  if (tc.expectedFailures) {
    for (const expected of tc.expectedFailures) {
      if (!text.toLowerCase().includes(expected.toLowerCase())) {
        failuresCited = false;
      }
    }
  }

  const verdictCorrect = actualVerdict === tc.expectedVerdict;
  const passed = verdictCorrect && (tc.expectedFailures ? failuresCited : true);

  return {
    passed,
    name: tc.name,
    expected: tc.expectedVerdict,
    actual: actualVerdict,
    citedFailures,
    reasoning: text.slice(0, 500),
  };
}

async function main() {
  if (testCases.length === 0) {
    console.log('No test cases defined yet.');
    console.log('To add test cases:');
    console.log('  1. Create tests/fixtures/ directory');
    console.log('  2. Add design screenshots (.png or .jpg)');
    console.log('  3. Uncomment and edit the testCases array in this file');
    console.log('\nBuilding system prompt to verify it assembles correctly...\n');

    const prompt = await buildSystemPrompt({ domain: 'web' });
    console.log(`System prompt length: ${prompt.length} characters`);
    console.log(`Knowledge modules included:`);
    const moduleTitles = prompt.match(/## (core|domains|culture|anti-patterns)\/\S+/g) ?? [];
    for (const title of moduleTitles) {
      console.log(`  ${title}`);
    }
    console.log('\nSystem prompt assembled successfully.');
    return;
  }

  const systemPrompt = await buildSystemPrompt({ domain: 'web' });
  console.log(`Running ${testCases.length} judgment calibration tests...\n`);

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      const result = await runTest(tc, systemPrompt);
      if (result.passed) {
        console.log(`  PASS: ${result.name}`);
        passed++;
      } else {
        console.log(`  FAIL: ${result.name}`);
        console.log(`    Expected: ${result.expected}, Got: ${result.actual}`);
        if (result.citedFailures.length > 0) {
          console.log(`    Cited: ${result.citedFailures.join(', ')}`);
        }
        failed++;
      }
    } catch (err) {
      console.log(`  ERROR: ${tc.name} — ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  console.log(`\n${passed}/${passed + failed} tests passed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
