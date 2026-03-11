/**
 * Data model for the Visual Reference Library.
 *
 * Images are stored on Cloudflare R2 and organized by genre (14 categories)
 * and quality tier (Stock 40 → Masterclass 100). Each image carries metadata
 * explaining WHY it's at its tier — this is a teaching database, not just
 * an inspiration board.
 */

// ── Genres ──────────────────────────────────────────────────────────────

export const GENRE_IDS = [
  'cosmic-psytrance-space',
  'saas-tech-dashboard',
  'japanese-minimalist',
  'brutalist-industrial',
  'wellness-calm',
  'fintech-banking',
  'education-learning',
  'media-editorial',
  'ecommerce-luxury',
  'portfolio-creative',
  'festival-events',
  'gaming-esports',
  'food-culinary',
  'travel-adventure',
] as const;

export type GenreId = (typeof GENRE_IDS)[number];

export const GENRE_DISPLAY_NAMES: Record<GenreId, string> = {
  'cosmic-psytrance-space': 'Cosmic / Psytrance / Space',
  'saas-tech-dashboard': 'SaaS / Tech / Dashboard',
  'japanese-minimalist': 'Japanese / Minimalist',
  'brutalist-industrial': 'Brutalist / Industrial',
  'wellness-calm': 'Wellness / Calm',
  'fintech-banking': 'Fintech / Banking',
  'education-learning': 'Education / Learning',
  'media-editorial': 'Media / Editorial',
  'ecommerce-luxury': 'E-commerce / Luxury',
  'portfolio-creative': 'Portfolio / Creative',
  'festival-events': 'Festival / Events',
  'gaming-esports': 'Gaming / Esports',
  'food-culinary': 'Food / Culinary',
  'travel-adventure': 'Travel / Adventure',
};

// ── Quality Tiers ───────────────────────────────────────────────────────

export const QUALITY_TIERS = [
  'stock',
  'competent',
  'professional',
  'exceptional',
  'masterclass',
] as const;

export type QualityTier = (typeof QUALITY_TIERS)[number];

export interface TierDefinition {
  tier: QualityTier;
  scoreRange: [number, number];
  visualMarkers: string;
  autoJustification: string;
}

export const TIER_DEFINITIONS: Record<QualityTier, TierDefinition> = {
  stock: {
    tier: 'stock',
    scoreRange: [40, 50],
    visualMarkers: 'Generic, template-level, emotionally void',
    autoJustification:
      'Generic stock imagery. No intentional design decisions. Template-level quality.',
  },
  competent: {
    tier: 'competent',
    scoreRange: [55, 65],
    visualMarkers: 'Intentional but flat, one-dimensional',
    autoJustification:
      'Intentional composition but lacks system. Spacing approximate, colors close but not derived.',
  },
  professional: {
    tier: 'professional',
    scoreRange: [70, 80],
    visualMarkers: 'Clear system, consistent, safe',
    autoJustification:
      'Clear design system. Consistent spacing, type scale, color hierarchy. Solid but safe.',
  },
  exceptional: {
    tier: 'exceptional',
    scoreRange: [85, 95],
    visualMarkers: 'Every decision interconnected, "how did they do that?"',
    autoJustification:
      'Every element serves the whole. 3+ depth layers, specific light sources, one surprise moment.',
  },
  masterclass: {
    tier: 'masterclass',
    scoreRange: [95, 100],
    visualMarkers: 'Creates imitators, every pixel intentional',
    autoJustification:
      'Design IS the brand. Creates imitators. Both inevitable and surprising. Obsessive care.',
  },
};

// ── Reference Image ─────────────────────────────────────────────────────

export type ImageSource = 'pexels' | 'unsplash' | 'nasa' | 'deviantart' | 'mars-rover' | 'apod' | 'screenshot' | 'manual';
export type ImageMimeType = 'image/jpeg' | 'image/png' | 'image/webp';
export type CurationStatus = 'auto' | 'human-reviewed' | 'exemplary';

export interface ReferenceImage {
  /** Unique identifier (genre + source + index) */
  id: string;
  /** R2 object key (e.g., "cosmic-psytrance-space/professional/nasa-jwst-carina-001.jpg") */
  key: string;
  /** Full public R2 URL */
  url: string;
  /** Genre category */
  genre: GenreId;
  /** Quality tier */
  tier: QualityTier;
  /** Where the image came from */
  source: ImageSource;
  /** Original source URL */
  sourceUrl: string;
  /** WHY this tier — the teaching payload */
  tierJustification: string;
  /** Design principles this image demonstrates */
  demonstrates: string[];
  /** Searchable tags */
  tags: string[];
  /** Image dimensions */
  width: number;
  height: number;
  /** File size in bytes */
  fileSize: number;
  /** MIME type */
  mimeType: ImageMimeType;
  /** Curation level */
  curationStatus: CurationStatus;
  /** ISO date string */
  addedAt: string;
}

// ── Manifests ───────────────────────────────────────────────────────────

export interface GenreManifest {
  genre: GenreId;
  displayName: string;
  description: string;
  totalImages: number;
  tierCounts: Record<QualityTier, number>;
  images: ReferenceImage[];
  lastUpdated: string;
}

export interface GlobalManifest {
  totalImages: number;
  genres: {
    genre: GenreId;
    displayName: string;
    totalImages: number;
    tierCounts: Record<QualityTier, number>;
  }[];
  lastUpdated: string;
}

// ── Genre Search Config ─────────────────────────────────────────────────

export interface GenreSearchConfig {
  genre: GenreId;
  displayName: string;
  description: string;
  pexelsQueries: string[];
  unsplashQueries: string[];
  nasaQueries: string[];
  deviantartQueries: string[];
  marsRoverQueries: { rover: 'curiosity' | 'perseverance' | 'opportunity'; sol?: number; camera?: string }[];
  apodQueries: { startDate?: string; endDate?: string; count?: number }[];
  screenshotSites: {
    url: string;
    tier: QualityTier;
    score: number;
  }[];
  /** Default tags applied to all images in this genre */
  defaultTags: string[];
  /** Default design principles for auto-generated tier justifications */
  defaultDemonstrates: Record<QualityTier, string[]>;
}
