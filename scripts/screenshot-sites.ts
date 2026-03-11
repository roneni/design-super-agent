#!/usr/bin/env tsx
/**
 * Capture screenshots of exemplary websites for the reference library.
 *
 * Per site: hero viewport (1920x1080), scrolled mid-page, mobile (390x844).
 * Processes images to 1024px wide JPEG 80% and uploads to R2.
 *
 * Usage:
 *   npx tsx scripts/screenshot-sites.ts
 *   npx tsx scripts/screenshot-sites.ts --site linear.app
 *
 * Requires: R2 credentials in .env, playwright installed (npx playwright install chromium)
 */

import 'dotenv/config';
import { chromium } from 'playwright';
import { createR2Client, processImage, uploadToR2, uploadJsonToR2, existsInR2 } from './lib/image-processing.js';
import type {
  GenreId,
  QualityTier,
  ReferenceImage,
  GenreManifest,
} from '../src/types/reference-library.js';
import { TIER_DEFINITIONS } from '../src/types/reference-library.js';

// ── Exemplary Sites ─────────────────────────────────────────────────────

interface SiteConfig {
  url: string;
  genre: GenreId;
  tier: QualityTier;
  score: number;
  name: string;
}

const SITES: SiteConfig[] = [
  { url: 'https://linear.app', genre: 'saas-tech-dashboard', tier: 'exceptional', score: 90, name: 'linear' },
  { url: 'https://stripe.com', genre: 'saas-tech-dashboard', tier: 'masterclass', score: 88, name: 'stripe' },
  { url: 'https://vercel.com', genre: 'saas-tech-dashboard', tier: 'exceptional', score: 87, name: 'vercel' },
  { url: 'https://notion.so', genre: 'saas-tech-dashboard', tier: 'exceptional', score: 82, name: 'notion' },
  { url: 'https://apple.com', genre: 'ecommerce-luxury', tier: 'masterclass', score: 95, name: 'apple' },
  { url: 'https://aesop.com', genre: 'ecommerce-luxury', tier: 'exceptional', score: 92, name: 'aesop' },
  { url: 'https://wise.com', genre: 'fintech-banking', tier: 'exceptional', score: 80, name: 'wise' },
  { url: 'https://mercury.com', genre: 'fintech-banking', tier: 'exceptional', score: 82, name: 'mercury' },
  { url: 'https://duolingo.com', genre: 'education-learning', tier: 'exceptional', score: 87, name: 'duolingo' },
  { url: 'https://readymag.com', genre: 'media-editorial', tier: 'exceptional', score: 88, name: 'readymag' },
  { url: 'https://cosmos.so', genre: 'portfolio-creative', tier: 'exceptional', score: 82, name: 'cosmos' },
  { url: 'https://lusion.co', genre: 'portfolio-creative', tier: 'exceptional', score: 90, name: 'lusion' },
  { url: 'https://ozorafestival.eu', genre: 'cosmic-psytrance-space', tier: 'professional', score: 78, name: 'ozora' },
  { url: 'https://boomfestival.org', genre: 'cosmic-psytrance-space', tier: 'professional', score: 75, name: 'boom' },
  { url: 'https://meowwolf.com', genre: 'cosmic-psytrance-space', tier: 'exceptional', score: 88, name: 'meowwolf' },
  { url: 'https://webbtelescope.org', genre: 'cosmic-psytrance-space', tier: 'exceptional', score: 85, name: 'webb' },
];

type ViewportType = 'hero' | 'midpage' | 'mobile';

interface Screenshot {
  viewportType: ViewportType;
  buffer: Buffer;
}

// ── Capture Logic ───────────────────────────────────────────────────────

async function captureSite(site: SiteConfig): Promise<Screenshot[]> {
  const browser = await chromium.launch({ headless: true });
  const screenshots: Screenshot[] = [];

  try {
    // Hero viewport (1920x1080)
    console.log(`    [hero] ${site.url}...`);
    const heroCtx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const heroPage = await heroCtx.newPage();
    try {
      await heroPage.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await heroPage.waitForTimeout(2000); // Let animations settle
      const heroBuffer = await heroPage.screenshot({ type: 'jpeg', quality: 90 });
      screenshots.push({ viewportType: 'hero', buffer: Buffer.from(heroBuffer) });
    } catch (err) {
      console.error(`    [hero] FAIL: ${err instanceof Error ? err.message : err}`);
    }
    await heroCtx.close();

    // Mid-page scroll (1920x1080, scrolled ~2 viewports down)
    console.log(`    [midpage] ${site.url}...`);
    const midCtx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const midPage = await midCtx.newPage();
    try {
      await midPage.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await midPage.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
      await midPage.waitForTimeout(2000);
      const midBuffer = await midPage.screenshot({ type: 'jpeg', quality: 90 });
      screenshots.push({ viewportType: 'midpage', buffer: Buffer.from(midBuffer) });
    } catch (err) {
      console.error(`    [midpage] FAIL: ${err instanceof Error ? err.message : err}`);
    }
    await midCtx.close();

    // Mobile (390x844)
    console.log(`    [mobile] ${site.url}...`);
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    });
    const mobilePage = await mobileCtx.newPage();
    try {
      await mobilePage.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      await mobilePage.waitForTimeout(2000);
      const mobileBuffer = await mobilePage.screenshot({ type: 'jpeg', quality: 90 });
      screenshots.push({ viewportType: 'mobile', buffer: Buffer.from(mobileBuffer) });
    } catch (err) {
      console.error(`    [mobile] FAIL: ${err instanceof Error ? err.message : err}`);
    }
    await mobileCtx.close();
  } finally {
    await browser.close();
  }

  return screenshots;
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`Usage:
  npx tsx scripts/screenshot-sites.ts              Screenshot all sites
  npx tsx scripts/screenshot-sites.ts --site name  Screenshot one site (by name)

Available sites:
${SITES.map(s => `  ${s.name.padEnd(15)} ${s.url} (${s.genre}, ${s.tier})`).join('\n')}
`);
    return;
  }

  const r2Client = createR2Client();
  const siteArg = args.indexOf('--site');
  const targetSite = siteArg >= 0 ? args[siteArg + 1] : null;

  const sites = targetSite
    ? SITES.filter(s => s.name === targetSite)
    : SITES;

  if (sites.length === 0) {
    console.error(`Site "${targetSite}" not found. Use --help to see available sites.`);
    process.exit(1);
  }

  console.log(`Capturing ${sites.length} site(s)...\n`);

  // Group images by genre for manifest updates
  const genreImages = new Map<GenreId, ReferenceImage[]>();

  for (const site of sites) {
    console.log(`\n  ${site.name} (${site.url}):`);

    const screenshots = await captureSite(site);

    for (const ss of screenshots) {
      const key = `${site.genre}/${site.tier}/screenshot-${site.name}-${ss.viewportType}.jpg`;

      // Skip if exists
      if (await existsInR2(r2Client.client, r2Client.bucket, key)) {
        console.log(`    skip (exists): ${key}`);
        continue;
      }

      try {
        const processed = await processImage(ss.buffer);
        const url = await uploadToR2(
          r2Client.client, r2Client.bucket, key,
          processed.buffer, processed.mimeType,
        );

        const image: ReferenceImage = {
          id: `${site.genre}-screenshot-${site.name}-${ss.viewportType}`,
          key,
          url,
          genre: site.genre,
          tier: site.tier,
          source: 'screenshot',
          sourceUrl: site.url,
          tierJustification: TIER_DEFINITIONS[site.tier].autoJustification,
          demonstrates: [
            `${site.tier}-tier web design`,
            `${ss.viewportType} viewport`,
            site.score >= 90 ? 'industry benchmark' : 'strong reference',
          ],
          tags: [site.name, site.genre, ss.viewportType, 'screenshot', 'exemplary'],
          width: processed.width,
          height: processed.height,
          fileSize: processed.fileSize,
          mimeType: 'image/jpeg',
          curationStatus: 'auto',
          addedAt: new Date().toISOString(),
        };

        if (!genreImages.has(site.genre)) genreImages.set(site.genre, []);
        genreImages.get(site.genre)!.push(image);

        console.log(`    uploaded: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
      } catch (err) {
        console.error(`    FAIL upload: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // Update genre manifests with new screenshots
  // (Merge with existing manifest data if available)
  for (const [genre, newImages] of genreImages) {
    try {
      const { GetObjectCommand } = await import('@aws-sdk/client-s3');
      let existingImages: ReferenceImage[] = [];

      try {
        const res = await r2Client.client.send(
          new GetObjectCommand({ Bucket: r2Client.bucket, Key: `${genre}/manifest.json` }),
        );
        const text = await res.Body!.transformToString();
        const existing = JSON.parse(text) as GenreManifest;
        // Remove old screenshots that we're replacing
        const newKeys = new Set(newImages.map(i => i.key));
        existingImages = existing.images.filter(i => !newKeys.has(i.key));
      } catch {
        // No existing manifest
      }

      const allImages = [...existingImages, ...newImages];
      const tierCounts: Record<QualityTier, number> = {
        stock: 0, competent: 0, professional: 0, exceptional: 0, masterclass: 0,
      };
      for (const img of allImages) tierCounts[img.tier]++;

      const manifest: GenreManifest = {
        genre,
        displayName: SITES.find(s => s.genre === genre)?.genre ?? genre,
        description: `Screenshots and references for ${genre}`,
        totalImages: allImages.length,
        tierCounts,
        images: allImages,
        lastUpdated: new Date().toISOString(),
      };

      await uploadJsonToR2(r2Client.client, r2Client.bucket, `${genre}/manifest.json`, manifest);
      console.log(`\n  Updated manifest: ${genre} (${allImages.length} images)`);
    } catch (err) {
      console.error(`  FAIL manifest update for ${genre}: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
