/**
 * Reference Library Service — reads from Cloudflare R2.
 *
 * Provides cached manifest access and on-demand image fetching.
 * Used by the browse_references and view_reference MCP tools.
 */

import {
  S3Client,
  GetObjectCommand,
  HeadBucketCommand,
} from '@aws-sdk/client-s3';
import type {
  GenreId,
  QualityTier,
  ReferenceImage,
  GenreManifest,
  GlobalManifest,
} from '../types/reference-library.js';

export class ReferenceLibraryService {
  private client: S3Client | null = null;
  private bucket: string;
  private publicUrl: string;

  // In-memory manifest cache (session lifetime)
  private globalManifestCache: GlobalManifest | null = null;
  private genreManifestCache = new Map<GenreId, GenreManifest>();

  constructor() {
    this.bucket = process.env.R2_BUCKET_NAME ?? 'design-references';
    this.publicUrl = process.env.R2_PUBLIC_URL ?? '';

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

    if (accountId && accessKeyId && secretAccessKey) {
      this.client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId, secretAccessKey },
      });
    }
  }

  /** Check if R2 credentials are configured */
  isAvailable(): boolean {
    return this.client !== null;
  }

  /** Verify the bucket exists and is accessible */
  async verifyConnection(): Promise<boolean> {
    if (!this.client) return false;
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      return true;
    } catch {
      return false;
    }
  }

  /** Fetch and cache the global manifest */
  async getGlobalManifest(): Promise<GlobalManifest | null> {
    if (this.globalManifestCache) return this.globalManifestCache;
    const data = await this.fetchJson<GlobalManifest>('manifest.json');
    if (data) this.globalManifestCache = data;
    return data;
  }

  /** Fetch and cache a genre manifest */
  async getGenreManifest(genre: GenreId): Promise<GenreManifest | null> {
    const cached = this.genreManifestCache.get(genre);
    if (cached) return cached;
    const data = await this.fetchJson<GenreManifest>(`${genre}/manifest.json`);
    if (data) this.genreManifestCache.set(genre, data);
    return data;
  }

  /**
   * Browse references with optional filters.
   * Returns metadata only — no image data.
   */
  async browseReferences(options: {
    genre?: GenreId;
    tier?: QualityTier;
    tags?: string[];
    limit?: number;
  }): Promise<{ images: ReferenceImage[]; totalAvailable: number } | null> {
    const limit = Math.min(options.limit ?? 10, 25);

    // No genre specified → return global overview
    if (!options.genre) {
      return null; // Caller should use getGlobalManifest() instead
    }

    const manifest = await this.getGenreManifest(options.genre);
    if (!manifest) return null;

    let filtered = manifest.images;

    // Filter by tier
    if (options.tier) {
      filtered = filtered.filter(img => img.tier === options.tier);
    }

    // Filter by tags (any match)
    if (options.tags?.length) {
      const searchTags = options.tags.map(t => t.toLowerCase());
      filtered = filtered.filter(img =>
        img.tags.some(t => searchTags.includes(t.toLowerCase())),
      );
    }

    return {
      totalAvailable: filtered.length,
      images: filtered.slice(0, limit),
    };
  }

  /**
   * Download an image from R2 and return as base64.
   * Returns null if the image doesn't exist.
   */
  async getImageAsBase64(key: string): Promise<{
    base64: string;
    mimeType: string;
  } | null> {
    if (!this.client) return null;

    try {
      const response = await this.client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      );

      if (!response.Body) return null;

      const bytes = await response.Body.transformToByteArray();
      const base64 = Buffer.from(bytes).toString('base64');
      const mimeType = response.ContentType ?? 'image/jpeg';

      return { base64, mimeType };
    } catch {
      return null;
    }
  }

  /** Invalidate cached manifests (e.g., after population) */
  clearCache(): void {
    this.globalManifestCache = null;
    this.genreManifestCache.clear();
  }

  // ── Internal ────────────────────────────────────────────────────────

  private async fetchJson<T>(key: string): Promise<T | null> {
    if (!this.client) return null;

    try {
      const response = await this.client.send(
        new GetObjectCommand({ Bucket: this.bucket, Key: key }),
      );

      if (!response.Body) return null;

      const text = await response.Body.transformToString();
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  }
}

// Singleton
let _service: ReferenceLibraryService | null = null;

export function getReferenceLibrary(): ReferenceLibraryService {
  if (!_service) {
    _service = new ReferenceLibraryService();
  }
  return _service;
}
