/**
 * Shared image processing utilities for population scripts.
 *
 * Resizes images to 1024px wide and compresses to JPEG 80%.
 * Uploads processed images to Cloudflare R2.
 */

import sharp from 'sharp';
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

const TARGET_WIDTH = 1024;
const JPEG_QUALITY = 80;

export interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
  fileSize: number;
  mimeType: 'image/jpeg';
}

/**
 * Resize an image to TARGET_WIDTH and compress to JPEG 80%.
 * Maintains aspect ratio. Strips metadata.
 */
export async function processImage(input: Buffer): Promise<ProcessedImage> {
  const image = sharp(input);
  const metadata = await image.metadata();

  // Only resize if wider than target
  const needsResize = metadata.width && metadata.width > TARGET_WIDTH;

  const processed = needsResize
    ? image.resize(TARGET_WIDTH, undefined, { fit: 'inside', withoutEnlargement: true })
    : image;

  const buffer = await processed
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  const outputMeta = await sharp(buffer).metadata();

  return {
    buffer,
    width: outputMeta.width ?? TARGET_WIDTH,
    height: outputMeta.height ?? 0,
    fileSize: buffer.length,
    mimeType: 'image/jpeg',
  };
}

/**
 * Upload a buffer to R2 with the given key.
 * Returns the public URL.
 */
export async function uploadToR2(
  client: S3Client,
  bucket: string,
  key: string,
  buffer: Buffer,
  mimeType: string,
): Promise<string> {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }),
  );

  const publicUrl = process.env.R2_PUBLIC_URL;
  return publicUrl ? `${publicUrl}/${key}` : key;
}

/**
 * Upload JSON data to R2.
 */
export async function uploadJsonToR2(
  client: S3Client,
  bucket: string,
  key: string,
  data: unknown,
): Promise<void> {
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: 'application/json',
    }),
  );
}

/**
 * Check if an object already exists in R2 (for idempotent uploads).
 */
export async function existsInR2(
  client: S3Client,
  bucket: string,
  key: string,
): Promise<boolean> {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch {
    return false;
  }
}

/**
 * Create an S3 client configured for Cloudflare R2.
 * Throws if credentials are missing.
 */
export function createR2Client(): { client: S3Client; bucket: string } {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME ?? 'design-references';

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      'Missing R2 credentials. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY in .env',
    );
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return { client, bucket };
}
