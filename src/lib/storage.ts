/**
 * Neon Object Storage Integration (S3-compatible)
 * Handles file uploads and downloads using Neon's object storage
 */

import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const REGION = process.env.AWS_REGION || 'us-east-2';
const BUCKET_NAME = process.env.NEON_BUCKET_NAME || 'assets';

// Neon S3-compatible endpoint (will be set by neon deploy)
const S3_ENDPOINT = process.env.NEON_S3_ENDPOINT;

let s3Client: S3Client | null = null;

/**
 * Initialize S3 client for Neon object storage
 */
export function getS3Client(): S3Client {
  if (!s3Client) {
    s3Client = new S3Client({
      region: REGION,
      endpoint: S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.NEON_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEON_SECRET_ACCESS_KEY || '',
      },
      forcePathStyle: true, // Required for S3-compatible services
    });
  }
  return s3Client;
}

/**
 * Upload a file to Neon object storage
 */
export async function uploadFile(
  key: string,
  body: Buffer | string,
  contentType: string = 'application/octet-stream'
): Promise<string> {
  const client = getS3Client();

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await client.send(command);
  return key;
}

/**
 * Get a presigned URL for downloading a file
 */
export async function getDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
  const client = getS3Client();

  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
}

/**
 * Delete a file from Neon object storage
 */
export async function deleteFile(key: string): Promise<void> {
  const client = getS3Client();

  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await client.send(command);
}

/**
 * Check if object storage is configured
 */
export function isStorageConfigured(): boolean {
  return !!(
    process.env.NEON_S3_ENDPOINT &&
    process.env.NEON_ACCESS_KEY_ID &&
    process.env.NEON_SECRET_ACCESS_KEY
  );
}
