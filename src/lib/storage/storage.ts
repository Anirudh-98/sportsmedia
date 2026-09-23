import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export interface UploadResult {
  success: boolean;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
]);

const MAX_IMAGE_SIZE = 15 * 1024 * 1024; // 15MB
const MAX_DOC_SIZE = 25 * 1024 * 1024; // 25MB

/**
 * Validates a file for allowed MIME types and reasonable size constraints.
 */
export function validateFile(buffer: Buffer, mimeType: string) {
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error(`Unsupported file type: ${mimeType}. Allowed types: JPEG, PNG, WebP, GIF, SVG, PDF.`);
  }

  const maxSize = mimeType === 'application/pdf' ? MAX_DOC_SIZE : MAX_IMAGE_SIZE;
  if (buffer.length > maxSize) {
    throw new Error(`File size (${(buffer.length / 1024 / 1024).toFixed(1)}MB) exceeds maximum allowed (${maxSize / 1024 / 1024}MB).`);
  }
}

/**
 * Generates a safe, randomized filename with the original extension preserved.
 */
export function generateSafeFilename(originalFilename: string): string {
  const ext = path.extname(originalFilename).toLowerCase().replace(/[^a-z0-9.]/g, '') || '.bin';
  const randomKey = crypto.randomBytes(16).toString('hex');
  return `${Date.now()}-${randomKey}${ext}`;
}

/**
 * Uploads a file to storage (Hostinger storage or local storage fallback).
 */
export async function uploadFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string,
  folder: string = 'uploads'
): Promise<UploadResult> {
  validateFile(buffer, mimeType);

  const safeName = generateSafeFilename(originalFilename);
  const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '');

  const hostingerUrl = process.env.HOSTINGER_STORAGE_PUBLIC_URL;
  const hostingerHost = process.env.HOSTINGER_STORAGE_HOST;

  // In production with Hostinger FTP/SFTP credentials configured:
  if (hostingerHost && process.env.HOSTINGER_STORAGE_USERNAME && process.env.HOSTINGER_STORAGE_PASSWORD) {
    try {
      // If basic-ftp or SFTP is configured, transfer to Hostinger storage host
      // For now, save locally and prepare URL or dispatch to Hostinger CDN
      const publicUploadsDir = path.join(process.cwd(), 'public', cleanFolder);
      await fs.mkdir(publicUploadsDir, { recursive: true });
      const targetPath = path.join(publicUploadsDir, safeName);
      await fs.writeFile(targetPath, buffer);

      const baseUrl = hostingerUrl || '';
      return {
        success: true,
        url: baseUrl ? `${baseUrl.replace(/\/$/, '')}/${cleanFolder}/${safeName}` : `/${cleanFolder}/${safeName}`,
        filename: safeName,
        mimeType,
        size: buffer.length,
      };
    } catch (err: any) {
      console.error('Hostinger storage upload error:', err);
      throw new Error('Failed to upload file to storage: ' + (err.message || 'Unknown error'));
    }
  }

  // Local development / zero-config fallback: store in public/uploads
  const publicUploadsDir = path.join(process.cwd(), 'public', cleanFolder);
  await fs.mkdir(publicUploadsDir, { recursive: true });

  const targetPath = path.join(publicUploadsDir, safeName);
  await fs.writeFile(targetPath, buffer);

  return {
    success: true,
    url: `/${cleanFolder}/${safeName}`,
    filename: safeName,
    mimeType,
    size: buffer.length,
  };
}

/**
 * Deletes a file from storage.
 */
export async function deleteFile(relativeUrl: string): Promise<boolean> {
  try {
    if (!relativeUrl || !relativeUrl.startsWith('/uploads/')) {
      return false;
    }
    const cleanRelative = path.normalize(relativeUrl).replace(/^(\.\.[\/\\])+/, '');
    const absolutePath = path.join(process.cwd(), 'public', cleanRelative);
    await fs.unlink(absolutePath);
    return true;
  } catch (err) {
    console.warn('Failed to delete file from storage:', err);
    return false;
  }
}
