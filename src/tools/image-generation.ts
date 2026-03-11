/**
 * Image Generation Service
 *
 * Multi-provider image generation for web/code projects.
 * - Primary: fal.ai (Flux models, Recraft, Ideogram — fastest, cheapest)
 * - Secondary: OpenAI GPT Image 1.5 (best quality + text rendering)
 *
 * For .pen file work, use Pencil's built-in G() operation instead.
 */

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// ── Types ───────────────────────────────────────────────────────────────────

export type ImageProvider = 'fal' | 'openai';

export type FalModel =
  | 'flux-schnell'        // Fast drafts, ~$0.003/MP
  | 'flux-2-klein'        // Good balance, ~$0.014
  | 'flux-2-pro'          // Top quality, ~$0.055
  | 'flux-kontext-pro'    // Edit existing images via prompt
  | 'flux-kontext-max'    // Max quality editing + consistency
  | 'recraft-v3'          // Design assets, raster
  | 'recraft-v3-svg'      // Vector/SVG generation (unique)
  | 'ideogram-v3'         // Best typography in images
  | 'ideogram-v3-turbo'   // Fast typography
  | 'imagen-4-fast'       // Budget option, $0.02
  | 'imagen-4-pro';       // Google high quality

export type OpenAIModel =
  | 'gpt-image-1'         // High quality
  | 'gpt-image-1.5';      // Flagship, best text rendering

export interface GenerateOptions {
  /** Which provider to use */
  provider?: ImageProvider;
  /** Model to use (defaults to flux-2-pro for fal, gpt-image-1.5 for openai) */
  model?: FalModel | OpenAIModel;
  /** Image dimensions */
  width?: number;
  height?: number;
  /** Aspect ratio shorthand (overrides width/height) */
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' | '3:2' | '2:3';
  /** Output directory for saved images */
  outputDir?: string;
  /** Output filename (auto-generated if not specified) */
  filename?: string;
  /** Image format */
  format?: 'png' | 'jpeg' | 'webp';
  /** Style hint for the generator */
  style?: 'photorealistic' | 'illustration' | 'graphic-design' | 'artistic' | 'minimal';
  /** Negative prompt — what to avoid */
  negativePrompt?: string;
}

export interface GeneratedImage {
  /** Local file path where the image was saved */
  filePath: string;
  /** Original URL from the provider (if available) */
  sourceUrl?: string;
  /** Provider used */
  provider: ImageProvider;
  /** Model used */
  model: string;
  /** Width of generated image */
  width: number;
  /** Height of generated image */
  height: number;
  /** File size in bytes */
  fileSize: number;
  /** Format */
  format: string;
}

// ── Provider Interface ──────────────────────────────────────────────────────

interface ImageProviderImpl {
  generate(prompt: string, options: GenerateOptions): Promise<GeneratedImage>;
  isAvailable(): boolean;
}

// ── fal.ai Provider ─────────────────────────────────────────────────────────

class FalProvider implements ImageProviderImpl {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.FAL_KEY ?? process.env.FAL_API_KEY;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  private getEndpoint(model: FalModel): string {
    const endpoints: Record<FalModel, string> = {
      'flux-schnell': 'fal-ai/flux/schnell',
      'flux-2-klein': 'fal-ai/flux-2/klein',
      'flux-2-pro': 'fal-ai/flux-2-pro',
      'flux-kontext-pro': 'fal-ai/flux-kontext/pro',
      'flux-kontext-max': 'fal-ai/flux-kontext/max',
      'recraft-v3': 'fal-ai/recraft-v3',
      'recraft-v3-svg': 'fal-ai/recraft-v3/svg',
      'ideogram-v3': 'fal-ai/ideogram/v3',
      'ideogram-v3-turbo': 'fal-ai/ideogram/v3/turbo',
      'imagen-4-fast': 'fal-ai/imagen4/fast',
      'imagen-4-pro': 'fal-ai/imagen4/pro',
    };
    return endpoints[model] ?? 'fal-ai/flux-2-pro';
  }

  async generate(prompt: string, options: GenerateOptions): Promise<GeneratedImage> {
    const model = (options.model as FalModel) ?? 'flux-2-pro';
    const endpoint = this.getEndpoint(model);
    const width = options.width ?? 1024;
    const height = options.height ?? 768;
    const format = options.format ?? 'png';

    // Build request body
    const body: Record<string, unknown> = {
      prompt,
      image_size: options.aspectRatio
        ? { aspect_ratio: options.aspectRatio }
        : { width, height },
      output_format: format,
    };

    if (options.negativePrompt) {
      body.negative_prompt = options.negativePrompt;
    }

    // Submit to fal.ai queue
    const submitResponse = await fetch(`https://queue.fal.run/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!submitResponse.ok) {
      const error = await submitResponse.text();
      throw new Error(`fal.ai submit error (${submitResponse.status}): ${error}`);
    }

    const queued = await submitResponse.json() as {
      request_id: string;
      response_url: string;
      status_url: string;
    };

    // Poll for completion (max ~3 minutes)
    const maxPolls = 90;
    const pollInterval = 2000;
    for (let i = 0; i < maxPolls; i++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const statusResponse = await fetch(queued.status_url, {
        headers: { 'Authorization': `Key ${this.apiKey}` },
      });
      if (!statusResponse.ok) continue;

      const status = await statusResponse.json() as { status: string };
      if (status.status === 'COMPLETED') break;
      if (status.status === 'FAILED') {
        throw new Error(`fal.ai generation failed for model ${model}`);
      }
    }

    // Fetch the result
    const resultResponse = await fetch(queued.response_url, {
      headers: { 'Authorization': `Key ${this.apiKey}` },
    });

    if (!resultResponse.ok) {
      const error = await resultResponse.text();
      throw new Error(`fal.ai result error (${resultResponse.status}): ${error}`);
    }

    const result = await resultResponse.json() as {
      images?: Array<{ url: string; width: number; height: number }>;
      image?: { url: string; width: number; height: number };
    };

    // fal.ai returns images in different shapes depending on the model
    const imageData = result.images?.[0] ?? result.image;
    if (!imageData?.url) {
      throw new Error('fal.ai returned no image data');
    }

    // Download and save
    const outputDir = options.outputDir ?? process.cwd();
    const filename = options.filename ?? `generated-${crypto.randomUUID().slice(0, 8)}.${format}`;
    const filePath = path.join(outputDir, filename);

    await mkdir(outputDir, { recursive: true });

    const imageResponse = await fetch(imageData.url);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image from ${imageData.url}`);
    }
    const buffer = Buffer.from(await imageResponse.arrayBuffer());
    await writeFile(filePath, buffer);

    return {
      filePath,
      sourceUrl: imageData.url,
      provider: 'fal',
      model,
      width: imageData.width ?? width,
      height: imageData.height ?? height,
      fileSize: buffer.length,
      format,
    };
  }
}

// ── OpenAI Provider ─────────────────────────────────────────────────────────

class OpenAIProvider implements ImageProviderImpl {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async generate(prompt: string, options: GenerateOptions): Promise<GeneratedImage> {
    const model = (options.model as OpenAIModel) ?? 'gpt-image-1';
    const format = options.format ?? 'png';

    // Map dimensions to OpenAI's supported sizes (only 3 valid: 1024x1024, 1536x1024, 1024x1536)
    const size = this.resolveSize(options);

    const body: Record<string, unknown> = {
      model,
      prompt,
      n: 1,
      size,
      quality: 'high',
      output_format: format,
      response_format: 'b64_json',
    };

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI error (${response.status}): ${error}`);
    }

    const result = await response.json() as {
      data: Array<{ b64_json: string; revised_prompt?: string }>;
    };

    if (!result.data?.[0]?.b64_json) {
      throw new Error('OpenAI returned no image data');
    }

    const buffer = Buffer.from(result.data[0].b64_json, 'base64');

    // Save to disk
    const outputDir = options.outputDir ?? process.cwd();
    const filename = options.filename ?? `generated-${crypto.randomUUID().slice(0, 8)}.${format}`;
    const filePath = path.join(outputDir, filename);

    await mkdir(outputDir, { recursive: true });
    await writeFile(filePath, buffer);

    // Parse dimensions from size string
    const [w, h] = size.split('x').map(Number);

    return {
      filePath,
      provider: 'openai',
      model,
      width: w,
      height: h,
      fileSize: buffer.length,
      format,
    };
  }

  private resolveSize(options: GenerateOptions): string {
    // gpt-image-1 only supports exactly 3 sizes
    if (options.aspectRatio) {
      const ratioMap: Record<string, string> = {
        '1:1': '1024x1024',
        '16:9': '1536x1024',
        '9:16': '1024x1536',
        '4:3': '1536x1024',   // snap to nearest valid landscape
        '3:4': '1024x1536',   // snap to nearest valid portrait
        '3:2': '1536x1024',
        '2:3': '1024x1536',
      };
      return ratioMap[options.aspectRatio] ?? '1024x1024';
    }

    const w = options.width ?? 1024;
    const h = options.height ?? 1024;
    // Snap to nearest of the 3 valid sizes
    if (w === h) return '1024x1024';
    if (w > h) return '1536x1024';
    return '1024x1536';
  }
}

// ── Main Service ────────────────────────────────────────────────────────────

export class ImageGenerationService {
  private providers: Map<ImageProvider, ImageProviderImpl>;

  constructor() {
    this.providers = new Map<ImageProvider, ImageProviderImpl>([
      ['fal', new FalProvider()],
      ['openai', new OpenAIProvider()],
    ]);
  }

  /** Check which providers have API keys configured */
  getAvailableProviders(): ImageProvider[] {
    return [...this.providers.entries()]
      .filter(([, p]) => p.isAvailable())
      .map(([name]) => name);
  }

  /** Select the best provider based on the use case */
  private selectProvider(options: GenerateOptions): ImageProviderImpl {
    // If user specified a provider, use it
    if (options.provider) {
      const provider = this.providers.get(options.provider);
      if (!provider?.isAvailable()) {
        throw new Error(
          `Provider "${options.provider}" not available. ` +
          `Set ${options.provider === 'fal' ? 'FAL_KEY' : 'OPENAI_API_KEY'} environment variable.`,
        );
      }
      return provider;
    }

    // Auto-select: fal.ai preferred (faster, cheaper), fall back to OpenAI
    const fal = this.providers.get('fal');
    if (fal?.isAvailable()) return fal;

    const openai = this.providers.get('openai');
    if (openai?.isAvailable()) return openai;

    throw new Error(
      'No image generation provider available. Set FAL_KEY or OPENAI_API_KEY environment variable.',
    );
  }

  /** Generate an image from a text prompt */
  async generate(prompt: string, options: GenerateOptions = {}): Promise<GeneratedImage> {
    const provider = this.selectProvider(options);
    return provider.generate(prompt, options);
  }
}

/** Singleton for convenience */
let _service: ImageGenerationService | null = null;
export function getImageService(): ImageGenerationService {
  if (!_service) _service = new ImageGenerationService();
  return _service;
}
