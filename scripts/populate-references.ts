#!/usr/bin/env tsx
/**
 * Populate the visual reference library on Cloudflare R2.
 *
 * Usage:
 *   npx tsx scripts/populate-references.ts --all
 *   npx tsx scripts/populate-references.ts --genre cosmic-psytrance-space
 *   npx tsx scripts/populate-references.ts --verify
 *
 * Requires: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
 *           PEXELS_API_KEY, UNSPLASH_ACCESS_KEY in .env
 */

import 'dotenv/config';
import { createR2Client, processImage, uploadToR2, uploadJsonToR2, existsInR2 } from './lib/image-processing.js';
import { PexelsClient, UnsplashClient, NasaImageClient, DeviantArtClient, MarsRoverClient, ApodClient } from './lib/api-clients.js';
import type { FetchedPhoto } from './lib/api-clients.js';
import type {
  GenreId,
  QualityTier,
  ReferenceImage,
  GenreManifest,
  GlobalManifest,
  GenreSearchConfig,
} from '../src/types/reference-library.js';
import {
  GENRE_IDS,
  GENRE_DISPLAY_NAMES,
  TIER_DEFINITIONS,
} from '../src/types/reference-library.js';

// ── Genre Search Configurations ─────────────────────────────────────────

const GENRE_CONFIGS: GenreSearchConfig[] = [
  {
    genre: 'cosmic-psytrance-space',
    displayName: 'Cosmic / Psytrance / Space',
    description: 'Deep space, nebulae, sacred geometry, psychedelic art, cosmic atmospheres',
    pexelsQueries: ['nebula space', 'galaxy stars', 'cosmos universe', 'aurora borealis', 'starfield night sky'],
    unsplashQueries: ['cosmic nebula', 'galaxy deep space', 'sacred geometry art', 'psychedelic art', 'fractal art'],
    nasaQueries: ['JWST deep field', 'Hubble nebula', 'supernova remnant', 'Carina Nebula', 'Pillars of Creation'],
    deviantartQueries: ['nebula digital art', 'sacred geometry fractal', 'psychedelic cosmic art', 'space painting', 'visionary art cosmic'],
    marsRoverQueries: [
      { rover: 'curiosity', sol: 1000, camera: 'MAST' },
      { rover: 'curiosity', sol: 2000, camera: 'NAVCAM' },
      { rover: 'perseverance', sol: 500, camera: 'MCZ_RIGHT' },
      { rover: 'perseverance', sol: 100, camera: 'NAVCAM_LEFT' },
      { rover: 'curiosity', sol: 3000, camera: 'MAST' },
    ],
    apodQueries: [
      { count: 30 }, // 30 random expert-curated astronomy images
    ],
    screenshotSites: [
      { url: 'https://ozorafestival.eu', tier: 'professional', score: 78 },
      { url: 'https://boomfestival.org', tier: 'professional', score: 75 },
      { url: 'https://meowwolf.com', tier: 'exceptional', score: 88 },
      { url: 'https://webbtelescope.org', tier: 'exceptional', score: 85 },
    ],
    defaultTags: ['cosmic', 'space', 'nebula', 'atmospheric', 'deep'],
    defaultDemonstrates: {
      stock: ['basic space imagery', 'generic starfield'],
      competent: ['intentional color palette', 'basic depth'],
      professional: ['multiple depth layers', 'consistent color temperature'],
      exceptional: ['volumetric light', 'hand-crafted luminosity', 'emotional depth'],
      masterclass: ['creates imitators', 'every element inevitable'],
    },
  },
  {
    genre: 'saas-tech-dashboard',
    displayName: 'SaaS / Tech / Dashboard',
    description: 'Modern tech interfaces, dashboards, data visualization, developer tools',
    pexelsQueries: ['tech dashboard', 'data visualization', 'modern office tech'],
    unsplashQueries: ['dashboard interface', 'dark mode ui', 'tech workspace', 'data analytics'],
    nasaQueries: [],
    deviantartQueries: ['ui design dashboard', 'interface design dark', 'futuristic hud interface'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://linear.app', tier: 'exceptional', score: 90 },
      { url: 'https://stripe.com', tier: 'masterclass', score: 88 },
      { url: 'https://vercel.com', tier: 'exceptional', score: 87 },
      { url: 'https://notion.so', tier: 'exceptional', score: 82 },
    ],
    defaultTags: ['saas', 'dashboard', 'tech', 'interface', 'dark-mode'],
    defaultDemonstrates: {
      stock: ['generic template', 'placeholder charts'],
      competent: ['basic grid layout', 'intentional spacing'],
      professional: ['consistent type scale', 'clear data hierarchy'],
      exceptional: ['micro-interactions', 'information density without clutter'],
      masterclass: ['every pixel intentional', 'creates industry standard'],
    },
  },
  {
    genre: 'japanese-minimalist',
    displayName: 'Japanese / Minimalist',
    description: 'Zen aesthetics, wabi-sabi, clean minimalism, intentional whitespace',
    pexelsQueries: ['zen garden', 'minimalist japanese', 'wabi sabi', 'tatami room', 'ikebana'],
    unsplashQueries: ['japanese minimalism', 'zen interior', 'ryokan', 'japanese architecture', 'tea ceremony'],
    nasaQueries: [],
    deviantartQueries: ['japanese minimalist art', 'zen ink painting', 'wabi sabi art'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [],
    defaultTags: ['japanese', 'minimalist', 'zen', 'whitespace', 'calm'],
    defaultDemonstrates: {
      stock: ['generic zen stock photo'],
      competent: ['intentional whitespace', 'natural materials'],
      professional: ['ma (negative space)', 'material honesty'],
      exceptional: ['wabi-sabi philosophy visible', 'emotional restraint'],
      masterclass: ['profound simplicity', 'every absence intentional'],
    },
  },
  {
    genre: 'brutalist-industrial',
    displayName: 'Brutalist / Industrial',
    description: 'Raw concrete, industrial aesthetics, monochrome typography, unpolished power',
    pexelsQueries: ['brutalist architecture', 'raw concrete', 'industrial building', 'monochrome architecture'],
    unsplashQueries: ['brutalist design', 'concrete texture', 'industrial interior', 'raw architecture'],
    nasaQueries: [],
    deviantartQueries: ['brutalist architecture art', 'industrial digital art', 'concrete monochrome'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [],
    defaultTags: ['brutalist', 'industrial', 'raw', 'concrete', 'monochrome'],
    defaultDemonstrates: {
      stock: ['generic concrete texture'],
      competent: ['intentional rawness', 'bold type'],
      professional: ['systematic grid', 'expressive typography'],
      exceptional: ['rawness as luxury', 'controlled chaos'],
      masterclass: ['brutalism as brand language', 'unforgettable presence'],
    },
  },
  {
    genre: 'wellness-calm',
    displayName: 'Wellness / Calm',
    description: 'Spa, meditation, health, soft light, natural tones, serenity',
    pexelsQueries: ['spa interior', 'meditation zen', 'lavender field', 'calm nature', 'soft morning light'],
    unsplashQueries: ['wellness spa', 'mindfulness meditation', 'natural skincare', 'serene landscape'],
    nasaQueries: [],
    deviantartQueries: ['serene landscape painting', 'calm nature digital art', 'meditation art'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [],
    defaultTags: ['wellness', 'calm', 'spa', 'natural', 'soft'],
    defaultDemonstrates: {
      stock: ['generic spa photo', 'flat wellness imagery'],
      competent: ['warm tones', 'intentional calm'],
      professional: ['consistent light quality', 'natural material palette'],
      exceptional: ['sensory experience through screen', 'specific light source'],
      masterclass: ['redefines wellness visual language', 'beyond cliche'],
    },
  },
  {
    genre: 'fintech-banking',
    displayName: 'Fintech / Banking',
    description: 'Financial interfaces, banking apps, trading dashboards, trust signals',
    pexelsQueries: ['banking app', 'finance dashboard', 'trading interface'],
    unsplashQueries: ['fintech interface', 'banking technology', 'financial data'],
    nasaQueries: [],
    deviantartQueries: ['finance infographic design', 'data visualization art'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://wise.com', tier: 'exceptional', score: 80 },
      { url: 'https://mercury.com', tier: 'exceptional', score: 82 },
    ],
    defaultTags: ['fintech', 'banking', 'finance', 'trust', 'data'],
    defaultDemonstrates: {
      stock: ['generic banking stock', 'clip art money'],
      competent: ['basic data tables', 'brand colors applied'],
      professional: ['clear information hierarchy', 'trust signals'],
      exceptional: ['complexity made simple', 'delight in financial tasks'],
      masterclass: ['industry-defining interface', 'trust through craft'],
    },
  },
  {
    genre: 'education-learning',
    displayName: 'Education / Learning',
    description: 'Learning platforms, educational tools, gamification, knowledge sharing',
    pexelsQueries: ['education technology', 'learning platform', 'classroom modern'],
    unsplashQueries: ['edtech learning', 'educational app', 'study workspace'],
    nasaQueries: [],
    deviantartQueries: ['education illustration', 'learning gamification art', 'colorful infographic'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://duolingo.com', tier: 'exceptional', score: 87 },
    ],
    defaultTags: ['education', 'learning', 'edtech', 'gamification'],
    defaultDemonstrates: {
      stock: ['generic classroom photo'],
      competent: ['friendly colors', 'basic gamification'],
      professional: ['clear learning paths', 'consistent reward system'],
      exceptional: ['learning feels like play', 'emotional engagement'],
      masterclass: ['redefines how people learn', 'addictive knowledge'],
    },
  },
  {
    genre: 'media-editorial',
    displayName: 'Media / Editorial',
    description: 'Magazine layouts, editorial design, content-driven, typography-forward',
    pexelsQueries: ['magazine layout', 'editorial design', 'typography print'],
    unsplashQueries: ['editorial photography', 'magazine spread', 'print design'],
    nasaQueries: [],
    deviantartQueries: ['editorial layout design', 'typography art', 'magazine cover art'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://readymag.com', tier: 'exceptional', score: 88 },
    ],
    defaultTags: ['editorial', 'magazine', 'typography', 'content', 'layout'],
    defaultDemonstrates: {
      stock: ['basic blog layout', 'template typography'],
      competent: ['intentional type hierarchy', 'column grid'],
      professional: ['strong editorial voice', 'image-text interplay'],
      exceptional: ['typography as expression', 'scroll as narrative'],
      masterclass: ['defines visual journalism', 'content IS the design'],
    },
  },
  {
    genre: 'ecommerce-luxury',
    displayName: 'E-commerce / Luxury',
    description: 'Premium product presentation, luxury branding, aspirational commerce',
    pexelsQueries: ['luxury product', 'premium branding', 'high end retail'],
    unsplashQueries: ['luxury brand', 'premium product photography', 'high fashion'],
    nasaQueries: [],
    deviantartQueries: ['luxury product design', 'premium brand art', 'fashion illustration'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://apple.com', tier: 'masterclass', score: 95 },
      { url: 'https://aesop.com', tier: 'exceptional', score: 92 },
    ],
    defaultTags: ['luxury', 'ecommerce', 'premium', 'aspirational', 'product'],
    defaultDemonstrates: {
      stock: ['generic product shot', 'white background catalog'],
      competent: ['styled product photo', 'brand colors'],
      professional: ['consistent visual language', 'lifestyle integration'],
      exceptional: ['product as art object', 'desire through restraint'],
      masterclass: ['defines luxury digital', 'every scroll builds desire'],
    },
  },
  {
    genre: 'portfolio-creative',
    displayName: 'Portfolio / Creative',
    description: 'Creative portfolios, agency sites, experimental web, artistic expression',
    pexelsQueries: ['creative workspace', 'art studio', 'design portfolio'],
    unsplashQueries: ['creative portfolio', 'design studio', 'artistic workspace'],
    nasaQueries: [],
    deviantartQueries: ['portfolio design concept', 'creative studio art', 'experimental digital art'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://cosmos.so', tier: 'exceptional', score: 82 },
      { url: 'https://lusion.co', tier: 'exceptional', score: 90 },
    ],
    defaultTags: ['portfolio', 'creative', 'experimental', 'artistic', 'agency'],
    defaultDemonstrates: {
      stock: ['generic portfolio template'],
      competent: ['personal style emerging', 'custom layout'],
      professional: ['strong visual identity', 'cohesive project presentation'],
      exceptional: ['the portfolio IS the work', 'technical + artistic fusion'],
      masterclass: ['redefines web creativity', 'influential approach'],
    },
  },
  {
    genre: 'festival-events',
    displayName: 'Festival / Events',
    description: 'Music festivals, cultural events, nightlife, immersive experiences',
    pexelsQueries: ['music festival', 'concert stage', 'festival crowd', 'neon lights event'],
    unsplashQueries: ['festival experience', 'concert photography', 'cultural event', 'immersive art'],
    nasaQueries: [],
    deviantartQueries: ['music festival art', 'psychedelic poster art', 'concert poster design', 'immersive art installation'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [
      { url: 'https://ozorafestival.eu', tier: 'professional', score: 78 },
      { url: 'https://boomfestival.org', tier: 'professional', score: 75 },
    ],
    defaultTags: ['festival', 'events', 'music', 'nightlife', 'immersive'],
    defaultDemonstrates: {
      stock: ['generic concert photo', 'stock crowd'],
      competent: ['energy captured', 'brand colors'],
      professional: ['atmosphere communicated', 'consistent visual identity'],
      exceptional: ['you can feel the bass', 'FOMO through screen'],
      masterclass: ['the site IS the experience', 'cultural moment captured'],
    },
  },
  {
    genre: 'gaming-esports',
    displayName: 'Gaming / Esports',
    description: 'Game interfaces, esports branding, neon aesthetics, high energy',
    pexelsQueries: ['gaming setup', 'esports arena', 'neon gaming', 'cyberpunk interface'],
    unsplashQueries: ['gaming aesthetic', 'esports tournament', 'rgb gaming', 'cyber neon'],
    nasaQueries: [],
    deviantartQueries: ['cyberpunk digital art', 'neon gaming art', 'esports logo design', 'futuristic neon city'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [],
    defaultTags: ['gaming', 'esports', 'neon', 'cyberpunk', 'energy'],
    defaultDemonstrates: {
      stock: ['generic gaming stock', 'basic neon gradient'],
      competent: ['intentional neon palette', 'gaming typography'],
      professional: ['cohesive visual system', 'energy without chaos'],
      exceptional: ['immersive game-like web experience', 'visceral energy'],
      masterclass: ['defines esports visual culture', 'brand as experience'],
    },
  },
  {
    genre: 'food-culinary',
    displayName: 'Food / Culinary',
    description: 'Food photography, restaurant branding, culinary experiences, appetite appeal',
    pexelsQueries: ['gourmet food', 'restaurant interior', 'food photography', 'culinary art'],
    unsplashQueries: ['food styling', 'restaurant design', 'culinary photography', 'artisan food'],
    nasaQueries: [],
    deviantartQueries: ['food illustration art', 'culinary art painting', 'restaurant poster design'],
    marsRoverQueries: [],
    apodQueries: [],
    screenshotSites: [],
    defaultTags: ['food', 'culinary', 'restaurant', 'gourmet', 'appetite'],
    defaultDemonstrates: {
      stock: ['generic food photo', 'flat cafeteria shot'],
      competent: ['styled food photo', 'warm lighting'],
      professional: ['consistent food styling', 'specific light direction'],
      exceptional: ['you can taste through the screen', 'sensory narrative'],
      masterclass: ['redefines food digital', 'culture through cuisine'],
    },
  },
  {
    genre: 'travel-adventure',
    displayName: 'Travel / Adventure',
    description: 'Travel destinations, adventure experiences, wanderlust, exploration',
    pexelsQueries: ['travel destination', 'adventure landscape', 'wanderlust nature', 'exotic location'],
    unsplashQueries: ['travel photography', 'adventure travel', 'destination landscape', 'exploration'],
    nasaQueries: [],
    deviantartQueries: ['landscape digital painting', 'adventure fantasy art', 'travel illustration', 'exotic destination art'],
    marsRoverQueries: [
      { rover: 'curiosity', sol: 1500, camera: 'MAST' },
      { rover: 'perseverance', sol: 300, camera: 'MCZ_RIGHT' },
    ],
    apodQueries: [],
    screenshotSites: [],
    defaultTags: ['travel', 'adventure', 'wanderlust', 'destination', 'explore'],
    defaultDemonstrates: {
      stock: ['generic travel postcard', 'overprocessed HDR'],
      competent: ['sense of place', 'intentional composition'],
      professional: ['narrative through images', 'consistent travel voice'],
      exceptional: ['you book the flight', 'emotional transportation'],
      masterclass: ['defines how we see places', 'cultural bridge'],
    },
  },
];

// ── Tier Assignment Logic ───────────────────────────────────────────────

function assignTier(
  source: 'pexels' | 'unsplash' | 'nasa' | 'deviantart' | 'mars-rover' | 'apod',
  queryIndex: number,
  resultIndex: number,
): QualityTier {
  // First page results from stock sources are generally more generic
  if (source === 'pexels') {
    if (resultIndex < 3) return 'stock';
    if (resultIndex < 8) return 'competent';
    return 'professional'; // Deeper results tend to be more specific
  }

  if (source === 'unsplash') {
    // Unsplash is more curated
    if (resultIndex < 2) return 'competent';
    if (resultIndex < 6) return 'professional';
    return 'professional';
  }

  if (source === 'nasa') {
    // NASA JWST/Hubble images are inherently high quality
    if (queryIndex < 2) return 'exceptional'; // JWST, Hubble — premier
    return 'professional'; // Other NASA imagery
  }

  if (source === 'deviantart') {
    // DeviantArt popular results are hand-crafted art — higher tier than stock photos
    // Top results from boost:popular are community-vetted quality
    if (resultIndex < 3) return 'exceptional'; // Top popular art
    if (resultIndex < 8) return 'professional';
    return 'competent';
  }

  if (source === 'mars-rover') {
    // Real Mars surface photography — inherently exceptional
    // Mast cam (main camera) produces the best landscape shots
    if (resultIndex < 5) return 'exceptional'; // Best Mars shots
    return 'professional';
  }

  if (source === 'apod') {
    // APOD is expert-curated — every image was selected by NASA astronomers
    if (resultIndex < 10) return 'exceptional'; // Top curated picks
    return 'professional';
  }

  return 'competent';
}

function buildImageId(
  genre: GenreId,
  source: string,
  sourceId: string,
  index: number,
): string {
  return `${genre}-${source}-${String(index).padStart(3, '0')}`;
}

function buildR2Key(genre: GenreId, tier: QualityTier, filename: string): string {
  return `${genre}/${tier}/${filename}.jpg`;
}

// ── Main Population Logic ───────────────────────────────────────────────

async function populateGenre(
  genreConfig: GenreSearchConfig,
  r2Client: ReturnType<typeof createR2Client>,
): Promise<GenreManifest> {
  const { client, bucket } = r2Client;
  const images: ReferenceImage[] = [];
  let imageIndex = 0;

  console.log(`\n--- Populating: ${genreConfig.displayName} ---`);

  // ── Pexels ──────────────────────────────────────────────────────
  let pexels: PexelsClient | null = null;
  try { pexels = new PexelsClient(); } catch { /* API key not set */ }

  if (pexels) {
    for (const query of genreConfig.pexelsQueries) {
      console.log(`  [pexels] "${query}"...`);
      try {
        const photos = await pexels.searchPhotos(query, 10);
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const tier = assignTier('pexels', 0, i);
          const id = buildImageId(genreConfig.genre, 'pexels', photo.id, imageIndex);
          const key = buildR2Key(genreConfig.genre, tier, `pexels-${photo.id}`);

          // Skip if already uploaded
          if (await existsInR2(client, bucket, key)) {
            console.log(`    skip (exists): ${key}`);
            imageIndex++;
            // Still add to manifest
            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex));
            continue;
          }

          try {
            const buffer = await pexels.downloadPhoto(photo.downloadUrl);
            const processed = await processImage(buffer);
            const url = await uploadToR2(client, bucket, key, processed.buffer, processed.mimeType);

            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex, {
              url,
              width: processed.width,
              height: processed.height,
              fileSize: processed.fileSize,
            }));
            console.log(`    ${tier}: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
          } catch (err) {
            console.error(`    FAIL: ${photo.id} — ${err instanceof Error ? err.message : err}`);
          }
          imageIndex++;
        }
      } catch (err) {
        console.error(`  [pexels] query failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // ── Unsplash ────────────────────────────────────────────────────
  let unsplash: UnsplashClient | null = null;
  try { unsplash = new UnsplashClient(); } catch { /* API key not set */ }

  if (unsplash) {
    for (const query of genreConfig.unsplashQueries) {
      console.log(`  [unsplash] "${query}"...`);
      try {
        const photos = await unsplash.searchPhotos(query, 10);
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const tier = assignTier('unsplash', 0, i);
          const id = buildImageId(genreConfig.genre, 'unsplash', photo.id, imageIndex);
          const key = buildR2Key(genreConfig.genre, tier, `unsplash-${photo.id.replace(/[^a-zA-Z0-9-]/g, '')}`);

          if (await existsInR2(client, bucket, key)) {
            console.log(`    skip (exists): ${key}`);
            imageIndex++;
            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex));
            continue;
          }

          try {
            const buffer = await (unsplash as UnsplashClient).downloadPhoto(photo);
            const processed = await processImage(buffer);
            const url = await uploadToR2(client, bucket, key, processed.buffer, processed.mimeType);

            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex, {
              url,
              width: processed.width,
              height: processed.height,
              fileSize: processed.fileSize,
            }));
            console.log(`    ${tier}: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
          } catch (err) {
            console.error(`    FAIL: ${photo.id} — ${err instanceof Error ? err.message : err}`);
          }
          imageIndex++;
        }
      } catch (err) {
        console.error(`  [unsplash] query failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // ── NASA ────────────────────────────────────────────────────────
  if (genreConfig.nasaQueries.length > 0) {
    const nasa = new NasaImageClient();
    for (let qi = 0; qi < genreConfig.nasaQueries.length; qi++) {
      const query = genreConfig.nasaQueries[qi];
      console.log(`  [nasa] "${query}"...`);
      try {
        const photos = await nasa.searchPhotos(query, 8);
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const tier = assignTier('nasa', qi, i);
          const nasaId = photo.id.replace('nasa-', '');
          const id = buildImageId(genreConfig.genre, 'nasa', nasaId, imageIndex);
          const key = buildR2Key(genreConfig.genre, tier, `nasa-${nasaId.replace(/[^a-zA-Z0-9-]/g, '-').slice(0, 60)}`);

          if (await existsInR2(client, bucket, key)) {
            console.log(`    skip (exists): ${key}`);
            imageIndex++;
            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex));
            continue;
          }

          try {
            const buffer = await nasa.downloadPhoto(photo);
            const processed = await processImage(buffer);
            const url = await uploadToR2(client, bucket, key, processed.buffer, processed.mimeType);

            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex, {
              url,
              width: processed.width,
              height: processed.height,
              fileSize: processed.fileSize,
            }));
            console.log(`    ${tier}: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
          } catch (err) {
            console.error(`    FAIL: ${photo.id} — ${err instanceof Error ? err.message : err}`);
          }
          imageIndex++;
        }
      } catch (err) {
        console.error(`  [nasa] query failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // ── DeviantArt ──────────────────────────────────────────────────
  if (genreConfig.deviantartQueries.length > 0) {
    const deviantart = new DeviantArtClient();
    for (const query of genreConfig.deviantartQueries) {
      console.log(`  [deviantart] "${query}"...`);
      try {
        const photos = await deviantart.searchArt(query, 10);
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const tier = assignTier('deviantart', 0, i);
          const daId = photo.id.replace('deviantart-', '');
          const id = buildImageId(genreConfig.genre, 'deviantart', daId, imageIndex);
          const key = buildR2Key(genreConfig.genre, tier, `deviantart-${daId}`);

          if (await existsInR2(client, bucket, key)) {
            console.log(`    skip (exists): ${key}`);
            imageIndex++;
            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex));
            continue;
          }

          try {
            const buffer = await deviantart.downloadPhoto(photo.downloadUrl);
            const processed = await processImage(buffer);
            const url = await uploadToR2(client, bucket, key, processed.buffer, processed.mimeType);

            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex, {
              url,
              width: processed.width,
              height: processed.height,
              fileSize: processed.fileSize,
            }));
            console.log(`    ${tier}: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
          } catch (err) {
            console.error(`    FAIL: ${photo.id} — ${err instanceof Error ? err.message : err}`);
          }
          imageIndex++;
        }
      } catch (err) {
        console.error(`  [deviantart] query failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // ── Mars Rover ────────────────────────────────────────────────────
  if (genreConfig.marsRoverQueries.length > 0) {
    const marsRover = new MarsRoverClient();
    for (let qi = 0; qi < genreConfig.marsRoverQueries.length; qi++) {
      const q = genreConfig.marsRoverQueries[qi];
      const label = `${q.rover} sol ${q.sol ?? 'latest'}${q.camera ? ` ${q.camera}` : ''}`;
      console.log(`  [mars-rover] ${label}...`);
      try {
        let photos: FetchedPhoto[];
        if (q.sol !== undefined) {
          photos = await marsRover.getPhotosBySol(q.rover, q.sol, q.camera);
        } else {
          photos = await marsRover.getLatestPhotos(q.rover as 'curiosity' | 'perseverance');
        }
        // Limit to 10 best per query
        photos = photos.slice(0, 10);
        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const tier = assignTier('mars-rover', qi, i);
          const marsId = photo.id.replace('mars-', '');
          const id = buildImageId(genreConfig.genre, 'mars', marsId, imageIndex);
          const key = buildR2Key(genreConfig.genre, tier, `mars-${marsId}`);

          if (await existsInR2(client, bucket, key)) {
            console.log(`    skip (exists): ${key}`);
            imageIndex++;
            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex));
            continue;
          }

          try {
            const buffer = await marsRover.downloadPhoto(photo.downloadUrl);
            const processed = await processImage(buffer);
            const url = await uploadToR2(client, bucket, key, processed.buffer, processed.mimeType);

            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex, {
              url,
              width: processed.width,
              height: processed.height,
              fileSize: processed.fileSize,
            }));
            console.log(`    ${tier}: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
          } catch (err) {
            console.error(`    FAIL: ${photo.id} — ${err instanceof Error ? err.message : err}`);
          }
          imageIndex++;
        }
      } catch (err) {
        console.error(`  [mars-rover] query failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // ── APOD (Astronomy Picture of the Day) ──────────────────────────
  if (genreConfig.apodQueries.length > 0) {
    const apod = new ApodClient();
    for (let qi = 0; qi < genreConfig.apodQueries.length; qi++) {
      const q = genreConfig.apodQueries[qi];
      const label = q.count ? `${q.count} random` : `${q.startDate} to ${q.endDate}`;
      console.log(`  [apod] ${label}...`);
      try {
        let photos: FetchedPhoto[];
        if (q.count) {
          photos = await apod.getRandomApods(q.count);
        } else if (q.startDate && q.endDate) {
          photos = await apod.getDateRange(q.startDate, q.endDate);
        } else {
          continue;
        }

        for (let i = 0; i < photos.length; i++) {
          const photo = photos[i];
          const tier = assignTier('apod', qi, i);
          const apodDate = photo.id.replace('apod-', '');
          const id = buildImageId(genreConfig.genre, 'apod', apodDate, imageIndex);
          const key = buildR2Key(genreConfig.genre, tier, `apod-${apodDate}`);

          if (await existsInR2(client, bucket, key)) {
            console.log(`    skip (exists): ${key}`);
            imageIndex++;
            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex));
            continue;
          }

          try {
            const buffer = await apod.downloadPhoto(photo.downloadUrl);
            const processed = await processImage(buffer);
            const url = await uploadToR2(client, bucket, key, processed.buffer, processed.mimeType);

            images.push(buildReferenceImage(id, key, genreConfig, tier, photo, imageIndex, {
              url,
              width: processed.width,
              height: processed.height,
              fileSize: processed.fileSize,
            }));
            console.log(`    ${tier}: ${key} (${(processed.fileSize / 1024).toFixed(0)}KB)`);
          } catch (err) {
            console.error(`    FAIL: ${photo.id} — ${err instanceof Error ? err.message : err}`);
          }
          imageIndex++;
        }
      } catch (err) {
        console.error(`  [apod] query failed: ${err instanceof Error ? err.message : err}`);
      }
    }
  }

  // ── Build Genre Manifest ────────────────────────────────────────
  const tierCounts: Record<QualityTier, number> = {
    stock: 0, competent: 0, professional: 0, exceptional: 0, masterclass: 0,
  };
  for (const img of images) {
    tierCounts[img.tier]++;
  }

  const manifest: GenreManifest = {
    genre: genreConfig.genre,
    displayName: genreConfig.displayName,
    description: genreConfig.description,
    totalImages: images.length,
    tierCounts,
    images,
    lastUpdated: new Date().toISOString(),
  };

  // Upload genre manifest
  await uploadJsonToR2(client, bucket, `${genreConfig.genre}/manifest.json`, manifest);
  console.log(`  Manifest uploaded: ${genreConfig.genre}/manifest.json (${images.length} images)`);

  return manifest;
}

function buildReferenceImage(
  id: string,
  key: string,
  config: GenreSearchConfig,
  tier: QualityTier,
  photo: FetchedPhoto,
  _index: number,
  processed?: { url: string; width: number; height: number; fileSize: number },
): ReferenceImage {
  const publicUrl = process.env.R2_PUBLIC_URL;
  return {
    id,
    key,
    url: processed?.url ?? (publicUrl ? `${publicUrl}/${key}` : key),
    genre: config.genre,
    tier,
    source: photo.source,
    sourceUrl: photo.sourceUrl,
    tierJustification: TIER_DEFINITIONS[tier].autoJustification,
    demonstrates: config.defaultDemonstrates[tier] ?? [],
    tags: [...config.defaultTags, ...(photo.description ? photo.description.toLowerCase().split(/\s+/).slice(0, 5) : [])],
    width: processed?.width ?? photo.width,
    height: processed?.height ?? photo.height,
    fileSize: processed?.fileSize ?? 0,
    mimeType: 'image/jpeg',
    curationStatus: 'auto',
    addedAt: new Date().toISOString(),
  };
}

// ── Global Manifest ─────────────────────────────────────────────────────

async function buildGlobalManifest(
  genreManifests: GenreManifest[],
  r2Client: ReturnType<typeof createR2Client>,
): Promise<void> {
  const { client, bucket } = r2Client;

  const global: GlobalManifest = {
    totalImages: genreManifests.reduce((sum, g) => sum + g.totalImages, 0),
    genres: genreManifests.map(g => ({
      genre: g.genre,
      displayName: g.displayName,
      totalImages: g.totalImages,
      tierCounts: g.tierCounts,
    })),
    lastUpdated: new Date().toISOString(),
  };

  await uploadJsonToR2(client, bucket, 'manifest.json', global);
  console.log(`\nGlobal manifest uploaded: ${global.totalImages} total images across ${genreManifests.length} genres`);
}

// ── Verify Mode ─────────────────────────────────────────────────────────

async function verifyReferences(r2Client: ReturnType<typeof createR2Client>): Promise<void> {
  const { client, bucket } = r2Client;
  console.log('Verifying reference library...\n');

  // Check global manifest
  const { GetObjectCommand } = await import('@aws-sdk/client-s3');
  try {
    const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: 'manifest.json' }));
    const text = await res.Body!.transformToString();
    const global = JSON.parse(text) as GlobalManifest;

    console.log(`Global: ${global.totalImages} images, ${global.genres.length} genres`);
    console.log(`Last updated: ${global.lastUpdated}\n`);

    for (const genre of global.genres) {
      const tierStr = Object.entries(genre.tierCounts)
        .filter(([, count]) => count > 0)
        .map(([tier, count]) => `${tier}:${count}`)
        .join(', ');
      console.log(`  ${genre.displayName}: ${genre.totalImages} images (${tierStr})`);
    }

    // Check for genres with low image counts
    const lowGenres = global.genres.filter(g => g.totalImages < 20);
    if (lowGenres.length > 0) {
      console.log('\nWARNING: Low image count genres:');
      for (const g of lowGenres) {
        console.log(`  ${g.displayName}: only ${g.totalImages} images`);
      }
    }

    console.log('\nVerification complete.');
  } catch (err) {
    console.error('No global manifest found. Run populate first.');
  }
}

// ── CLI Entry Point ─────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    console.log(`Usage:
  npx tsx scripts/populate-references.ts --all              Populate all genres
  npx tsx scripts/populate-references.ts --genre <id>       Populate one genre
  npx tsx scripts/populate-references.ts --verify           Verify manifests

Available genres:
${GENRE_IDS.map(g => `  ${g}`).join('\n')}
`);
    return;
  }

  const r2Client = createR2Client();

  if (args.includes('--verify')) {
    await verifyReferences(r2Client);
    return;
  }

  const genreArg = args.indexOf('--genre');
  const targetGenre = genreArg >= 0 ? args[genreArg + 1] as GenreId : null;

  const configs = targetGenre
    ? GENRE_CONFIGS.filter(c => c.genre === targetGenre)
    : args.includes('--all')
      ? GENRE_CONFIGS
      : [];

  if (configs.length === 0) {
    console.error(`No matching genre. Use --all or --genre <id>.`);
    process.exit(1);
  }

  console.log(`Populating ${configs.length} genre(s)...`);

  const manifests: GenreManifest[] = [];
  for (const config of configs) {
    const manifest = await populateGenre(config, r2Client);
    manifests.push(manifest);
  }

  // If populating all, rebuild global manifest
  if (args.includes('--all') || configs.length === GENRE_CONFIGS.length) {
    await buildGlobalManifest(manifests, r2Client);
  } else {
    // Partial update — try to merge with existing global manifest
    try {
      const { GetObjectCommand } = await import('@aws-sdk/client-s3');
      const res = await r2Client.client.send(
        new GetObjectCommand({ Bucket: r2Client.bucket, Key: 'manifest.json' }),
      );
      const text = await res.Body!.transformToString();
      const existing = JSON.parse(text) as GlobalManifest;

      // Merge: replace updated genres, keep others
      const updatedGenreIds = new Set(manifests.map(m => m.genre));
      const merged = [
        ...existing.genres.filter(g => !updatedGenreIds.has(g.genre)),
        ...manifests.map(m => ({
          genre: m.genre,
          displayName: m.displayName,
          totalImages: m.totalImages,
          tierCounts: m.tierCounts,
        })),
      ];

      const global: GlobalManifest = {
        totalImages: merged.reduce((sum, g) => sum + g.totalImages, 0),
        genres: merged,
        lastUpdated: new Date().toISOString(),
      };

      await uploadJsonToR2(r2Client.client, r2Client.bucket, 'manifest.json', global);
      console.log(`\nGlobal manifest updated: ${global.totalImages} total images`);
    } catch {
      // No existing manifest — create from what we have
      await buildGlobalManifest(manifests, r2Client);
    }
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
