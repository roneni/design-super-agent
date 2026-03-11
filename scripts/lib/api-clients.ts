/**
 * API wrappers for image sources: Pexels, Unsplash, NASA Image Library.
 *
 * Each client handles pagination, rate limiting, and returns raw image buffers.
 */

// ── Types ───────────────────────────────────────────────────────────────

export interface FetchedPhoto {
  id: string;
  sourceUrl: string;
  downloadUrl: string;
  photographer?: string;
  description?: string;
  width: number;
  height: number;
  source: 'pexels' | 'unsplash' | 'nasa' | 'deviantart' | 'mars-rover' | 'apod';
}

// ── Rate Limiter ────────────────────────────────────────────────────────

async function rateLimitedFetch(
  url: string,
  options: RequestInit = {},
  delayMs = 500,
): Promise<Response> {
  await new Promise(resolve => setTimeout(resolve, delayMs));
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}: ${await res.text().catch(() => 'no body')}`);
  }
  return res;
}

// ── Pexels ──────────────────────────────────────────────────────────────

export class PexelsClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey ?? process.env.PEXELS_API_KEY ?? '';
    if (!this.apiKey) throw new Error('PEXELS_API_KEY not set');
  }

  async searchPhotos(query: string, perPage = 15, page = 1): Promise<FetchedPhoto[]> {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    const res = await rateLimitedFetch(url, {
      headers: { Authorization: this.apiKey },
    });
    const data = await res.json() as {
      photos: Array<{
        id: number;
        url: string;
        src: { large2x: string; original: string };
        photographer: string;
        alt: string;
        width: number;
        height: number;
      }>;
    };

    return data.photos.map(p => ({
      id: `pexels-${p.id}`,
      sourceUrl: p.url,
      downloadUrl: p.src.large2x || p.src.original,
      photographer: p.photographer,
      description: p.alt || undefined,
      width: p.width,
      height: p.height,
      source: 'pexels' as const,
    }));
  }

  async downloadPhoto(downloadUrl: string): Promise<Buffer> {
    const res = await rateLimitedFetch(downloadUrl, {}, 200);
    return Buffer.from(await res.arrayBuffer());
  }
}

// ── Unsplash ────────────────────────────────────────────────────────────

export class UnsplashClient {
  private accessKey: string;

  constructor(accessKey?: string) {
    this.accessKey = accessKey ?? process.env.UNSPLASH_ACCESS_KEY ?? '';
    if (!this.accessKey) throw new Error('UNSPLASH_ACCESS_KEY not set');
  }

  async searchPhotos(query: string, perPage = 15, page = 1): Promise<FetchedPhoto[]> {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    const res = await rateLimitedFetch(url, {
      headers: { Authorization: `Client-ID ${this.accessKey}` },
    });
    const data = await res.json() as {
      results: Array<{
        id: string;
        links: { html: string; download_location: string };
        urls: { regular: string; full: string };
        user: { name: string };
        description: string | null;
        alt_description: string | null;
        width: number;
        height: number;
      }>;
    };

    return data.results.map(p => ({
      id: `unsplash-${p.id}`,
      sourceUrl: p.links.html,
      downloadUrl: p.urls.regular, // 1080px wide
      photographer: p.user.name,
      description: p.description || p.alt_description || undefined,
      width: p.width,
      height: p.height,
      source: 'unsplash' as const,
      // Note: Per Unsplash ToS, we should trigger the download endpoint
      _downloadLocation: p.links.download_location,
    }));
  }

  /** Trigger download tracking per Unsplash ToS */
  async triggerDownload(downloadLocation: string): Promise<void> {
    try {
      await rateLimitedFetch(
        `${downloadLocation}?client_id=${this.accessKey}`,
        {},
        100,
      );
    } catch {
      // Non-critical — just tracking
    }
  }

  async downloadPhoto(photo: FetchedPhoto & { _downloadLocation?: string }): Promise<Buffer> {
    // Trigger download tracking
    if (photo._downloadLocation) {
      await this.triggerDownload(photo._downloadLocation);
    }
    const res = await rateLimitedFetch(photo.downloadUrl, {}, 200);
    return Buffer.from(await res.arrayBuffer());
  }
}

// ── DeviantArt (RSS — no auth needed) ───────────────────────────────────

export class DeviantArtClient {
  /**
   * Search DeviantArt via RSS feed. No API key required.
   * Uses Media RSS which includes image URLs and dimensions.
   *
   * Query syntax: tags are searched directly. Use boost:popular for best results.
   * Example: "nebula" → popular nebula art
   */
  async searchArt(query: string, limit = 20, offset = 0): Promise<FetchedPhoto[]> {
    const q = encodeURIComponent(`boost:popular ${query}`);
    const url = `https://backend.deviantart.com/rss.xml?type=deviation&q=${q}&offset=${offset}&limit=${limit}`;

    const res = await rateLimitedFetch(url, {
      headers: {
        'User-Agent': 'design-references/1.0 (visual reference library)',
      },
    }, 1000); // Respectful 1s delay between requests

    const xml = await res.text();
    return this.parseRss(xml);
  }

  /**
   * Search within a specific DeviantArt category.
   * Categories: digitalart/drawings, digitalart/paintings, photography, designs
   */
  async searchCategory(query: string, category: string, limit = 20): Promise<FetchedPhoto[]> {
    const q = encodeURIComponent(`boost:popular in:${category} ${query}`);
    const url = `https://backend.deviantart.com/rss.xml?type=deviation&q=${q}&limit=${limit}`;

    const res = await rateLimitedFetch(url, {
      headers: {
        'User-Agent': 'design-references/1.0 (visual reference library)',
      },
    }, 1000);

    const xml = await res.text();
    return this.parseRss(xml);
  }

  async downloadPhoto(downloadUrl: string): Promise<Buffer> {
    const res = await rateLimitedFetch(downloadUrl, {
      headers: {
        'User-Agent': 'design-references/1.0 (visual reference library)',
      },
    }, 500);
    return Buffer.from(await res.arrayBuffer());
  }

  private parseRss(xml: string): FetchedPhoto[] {
    const items: FetchedPhoto[] = [];

    // Parse <item> blocks from RSS XML
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xml)) !== null) {
      const itemXml = match[1];

      const title = this.extractTag(itemXml, 'title');
      const link = this.extractTag(itemXml, 'link');
      const author = this.extractTag(itemXml, 'media:credit');

      // Extract media:content — the full-size image
      const mediaMatch = itemXml.match(
        /<media:content[^>]*url="([^"]*)"[^>]*(?:width="(\d+)")?[^>]*(?:height="(\d+)")?/,
      );
      if (!mediaMatch) continue;

      const imageUrl = mediaMatch[1];
      const width = mediaMatch[2] ? parseInt(mediaMatch[2], 10) : 0;
      const height = mediaMatch[3] ? parseInt(mediaMatch[3], 10) : 0;

      // Skip if no usable image URL
      if (!imageUrl || imageUrl.includes('/thumbnails/')) continue;

      // Extract a stable ID from the link
      const idMatch = link?.match(/\/art\/[^/]*?-(\d+)$/);
      const deviationId = idMatch ? idMatch[1] : String(items.length);

      items.push({
        id: `deviantart-${deviationId}`,
        sourceUrl: link || '',
        downloadUrl: imageUrl,
        photographer: author || undefined,
        description: title || undefined,
        width,
        height,
        source: 'deviantart' as const,
      });
    }

    return items;
  }

  private extractTag(xml: string, tag: string): string | null {
    // Handle CDATA
    const cdataMatch = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([^\\]]*?)\\]\\]></${tag}>`));
    if (cdataMatch) return cdataMatch[1].trim();

    // Handle plain text
    const plainMatch = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`));
    if (plainMatch) return plainMatch[1].trim();

    return null;
  }
}

// ── NASA Mars Rover Photos ─────────────────────────────────────────────

export class MarsRoverClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey ?? process.env.NASA_API_KEY ?? 'DEMO_KEY';
  }

  /**
   * Fetch photos from a Mars rover by sol (Martian day).
   * Rovers: curiosity, perseverance, opportunity
   * Camera options: FHAZ (front hazard), RHAZ (rear hazard), MAST (mast cam),
   *   CHEMCAM, MAHLI, MARDI, NAVCAM, PANCAM, MINITES
   *
   * Note: The Mars Photos API backend (Heroku-hosted) may be intermittently
   * unavailable. The client handles this gracefully by returning [].
   */
  async getPhotosBySol(
    rover: 'curiosity' | 'perseverance' | 'opportunity',
    sol: number,
    camera?: string,
    page = 1,
  ): Promise<FetchedPhoto[]> {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=${this.apiKey}`;
    if (camera) url += `&camera=${camera}`;

    const res = await rateLimitedFetch(url, {}, 400);
    const data = await res.json() as {
      photos: Array<{
        id: number;
        sol: number;
        camera: { name: string; full_name: string };
        img_src: string;
        earth_date: string;
        rover: { name: string };
      }>;
    };

    return data.photos.map(p => ({
      id: `mars-${rover}-${p.id}`,
      sourceUrl: `https://mars.nasa.gov/raw_images/?id=${p.id}`,
      downloadUrl: p.img_src.replace('http://', 'https://'),
      photographer: `NASA/${p.rover.name} - ${p.camera.full_name}`,
      description: `Mars ${p.rover.name} Sol ${p.sol} - ${p.camera.full_name} (${p.earth_date})`,
      width: 0,
      height: 0,
      source: 'mars-rover' as const,
    }));
  }

  /**
   * Get latest photos from a rover (most recent sol with data).
   */
  async getLatestPhotos(
    rover: 'curiosity' | 'perseverance',
    page = 1,
  ): Promise<FetchedPhoto[]> {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?page=${page}&api_key=${this.apiKey}`;
    const res = await rateLimitedFetch(url, {}, 400);
    const data = await res.json() as {
      latest_photos: Array<{
        id: number;
        sol: number;
        camera: { name: string; full_name: string };
        img_src: string;
        earth_date: string;
        rover: { name: string };
      }>;
    };

    return data.latest_photos.map(p => ({
      id: `mars-${rover}-${p.id}`,
      sourceUrl: `https://mars.nasa.gov/raw_images/?id=${p.id}`,
      downloadUrl: p.img_src.replace('http://', 'https://'),
      photographer: `NASA/${p.rover.name} - ${p.camera.full_name}`,
      description: `Mars ${p.rover.name} Sol ${p.sol} - ${p.camera.full_name} (${p.earth_date})`,
      width: 0,
      height: 0,
      source: 'mars-rover' as const,
    }));
  }

  async downloadPhoto(downloadUrl: string): Promise<Buffer> {
    const res = await rateLimitedFetch(downloadUrl, {}, 200);
    return Buffer.from(await res.arrayBuffer());
  }
}

// ── NASA APOD (Astronomy Picture of the Day) ───────────────────────────

export class ApodClient {
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey ?? process.env.NASA_API_KEY ?? 'DEMO_KEY';
  }

  /**
   * Get random APOD images. Each is expert-curated with a description.
   * count: number of random images (max 100)
   */
  async getRandomApods(count = 20): Promise<FetchedPhoto[]> {
    const url = `https://api.nasa.gov/planetary/apod?count=${count}&api_key=${this.apiKey}`;
    const res = await rateLimitedFetch(url, {}, 400);
    const data = await res.json() as Array<{
      date: string;
      title: string;
      explanation: string;
      url: string;
      hdurl?: string;
      media_type: string;
      copyright?: string;
    }>;

    return data
      .filter(item => item.media_type === 'image')
      .map(item => ({
        id: `apod-${item.date}`,
        sourceUrl: `https://apod.nasa.gov/apod/ap${item.date.replace(/-/g, '').slice(2)}.html`,
        downloadUrl: item.hdurl || item.url,
        photographer: item.copyright || 'NASA/APOD',
        description: `${item.title} — ${item.explanation.slice(0, 150)}`,
        width: 0,
        height: 0,
        source: 'apod' as const,
      }));
  }

  /**
   * Get APOD images for a date range.
   */
  async getDateRange(startDate: string, endDate: string): Promise<FetchedPhoto[]> {
    const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${this.apiKey}`;
    const res = await rateLimitedFetch(url, {}, 400);
    const data = await res.json() as Array<{
      date: string;
      title: string;
      explanation: string;
      url: string;
      hdurl?: string;
      media_type: string;
      copyright?: string;
    }>;

    return data
      .filter(item => item.media_type === 'image')
      .map(item => ({
        id: `apod-${item.date}`,
        sourceUrl: `https://apod.nasa.gov/apod/ap${item.date.replace(/-/g, '').slice(2)}.html`,
        downloadUrl: item.hdurl || item.url,
        photographer: item.copyright || 'NASA/APOD',
        description: `${item.title} — ${item.explanation.slice(0, 150)}`,
        width: 0,
        height: 0,
        source: 'apod' as const,
      }));
  }

  async downloadPhoto(downloadUrl: string): Promise<Buffer> {
    const res = await rateLimitedFetch(downloadUrl, {}, 200);
    return Buffer.from(await res.arrayBuffer());
  }
}

// ── NASA Image Library ──────────────────────────────────────────────────

export class NasaImageClient {
  async searchPhotos(query: string, pageSize = 15, page = 1): Promise<FetchedPhoto[]> {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=${pageSize}&page=${page}`;
    const res = await rateLimitedFetch(url, {}, 300);
    const data = await res.json() as {
      collection: {
        items: Array<{
          data: Array<{
            nasa_id: string;
            title: string;
            description?: string;
          }>;
          links?: Array<{
            href: string;
            rel: string;
            render?: string;
          }>;
        }>;
      };
    };

    return data.collection.items
      .filter(item => item.links?.some(l => l.rel === 'preview'))
      .map(item => {
        const meta = item.data[0];
        const previewLink = item.links!.find(l => l.rel === 'preview')!;
        // NASA preview images are ~300px. We'll fetch the original via asset manifest.
        return {
          id: `nasa-${meta.nasa_id}`,
          sourceUrl: `https://images.nasa.gov/details/${meta.nasa_id}`,
          downloadUrl: previewLink.href,
          description: meta.title,
          width: 0, // Unknown until download
          height: 0,
          source: 'nasa' as const,
          _nasaId: meta.nasa_id,
        };
      });
  }

  /** Get the original-resolution image URL for a NASA asset */
  async getOriginalUrl(nasaId: string): Promise<string | null> {
    try {
      const url = `https://images-api.nasa.gov/asset/${nasaId}`;
      const res = await rateLimitedFetch(url, {}, 300);
      const data = await res.json() as {
        collection: {
          items: Array<{ href: string }>;
        };
      };

      // Find the ~orig or ~large version
      const items = data.collection.items;
      const orig = items.find(i => i.href.includes('~orig'));
      const large = items.find(i => i.href.includes('~large'));
      const medium = items.find(i => i.href.includes('~medium'));

      return (orig ?? large ?? medium)?.href ?? null;
    } catch {
      return null;
    }
  }

  async downloadPhoto(photo: FetchedPhoto & { _nasaId?: string }): Promise<Buffer> {
    let url = photo.downloadUrl;

    // Try to get higher-res version
    if (photo._nasaId) {
      const origUrl = await this.getOriginalUrl(photo._nasaId);
      if (origUrl) url = origUrl;
    }

    const res = await rateLimitedFetch(url, {}, 200);
    return Buffer.from(await res.arrayBuffer());
  }
}
