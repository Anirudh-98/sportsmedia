import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

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
 * Uploads a file to storage (Firebase Storage with local storage fallback).
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

  // 1. Attempt upload to Firebase Storage if available
  if (storage) {
    try {
      const storageRef = ref(storage, `${cleanFolder}/${safeName}`);
      const snapshot = await uploadBytes(storageRef, buffer, {
        contentType: mimeType,
      });
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return {
        success: true,
        url: downloadUrl,
        filename: safeName,
        mimeType,
        size: buffer.length,
      };
    } catch (firebaseErr: any) {
      console.warn('Firebase Storage upload failed, falling back to local storage:', firebaseErr?.message);
    }
  }

  // 2. Local fallback: store in public/uploads
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
    // If it's a Firebase Storage URL
    if (relativeUrl.includes('firebasestorage.googleapis.com') && storage) {
      try {
        const fileRef = ref(storage, relativeUrl);
        await deleteObject(fileRef);
        return true;
      } catch (err) {
        console.warn('Failed to delete from Firebase Storage:', err);
      }
    }

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
