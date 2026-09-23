import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/guard';
import { uploadFile } from '@/lib/storage/storage';
import prisma from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAuth(req);
    if (authResult.response) return authResult.response;

    const user = authResult.user;
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';
    const title = (formData.get('title') as string) || file?.name || 'Uploaded File';
    const type = (formData.get('type') as string) || 'photo';
    const athleteName = (formData.get('athleteName') as string) || '';
    const sport = (formData.get('sport') as string) || 'Multi-Sport';

    if (!file) {
      return NextResponse.json(
        { success: false, error: { code: 'FILE_REQUIRED', message: 'No file provided in request.' } },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await uploadFile(buffer, file.name, file.type, folder);

    // Save media metadata to database
    const mediaRecord = await prisma.mediaUpload.create({
      data: {
        id: `med-${Date.now()}`,
        title,
        type,
        url: uploadResult.url,
        athleteName: athleteName || user.name,
        sport,
        uploadedBy: user.name,
        uploadedById: user.id,
        uploadedAt: 'Just now',
      },
    }).catch((err) => {
      console.warn('Could not record media upload in database:', err);
      return null;
    });

    return NextResponse.json({
      success: true,
      data: {
        ...uploadResult,
        mediaRecord,
      },
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'UPLOAD_FAILED',
          message: error.message || 'File upload failed.',
        },
      },
      { status: 500 }
    );
  }
}
