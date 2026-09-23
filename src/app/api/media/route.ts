import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getAuthUser } from '@/lib/auth/guard';

const INITIAL_MEDIA_UPLOADS = [
  {
    id: 'med-1',
    title: 'Rohit Kumar 10.42s 100m Sprint Finish',
    type: 'photo',
    url: '/image/athelete.png',
    athleteName: 'Rohit Kumar',
    sport: 'Athletics',
    uploadedBy: 'Coach Rajesh Sharma',
    uploadedAt: '15 Sep 2026',
  },
  {
    id: 'med-2',
    title: 'Ananya Reddy District Trophy Handover',
    type: 'photo',
    url: '/image/athelete1.png',
    athleteName: 'Ananya Reddy',
    sport: 'Badminton',
    uploadedBy: 'Coach Rajesh Sharma',
    uploadedAt: '14 Sep 2026',
  },
  {
    id: 'med-3',
    title: 'Under-19 State Selection Certificate',
    type: 'certificate',
    url: '/image/athelete2.png',
    athleteName: 'Vikram Singh',
    sport: 'Cricket',
    uploadedBy: 'Coach Rajesh Sharma',
    uploadedAt: '12 Sep 2026',
  },
];

export async function GET() {
  try {
    let media = await prisma.mediaUpload.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (media.length === 0) {
      await prisma.mediaUpload.createMany({
        data: INITIAL_MEDIA_UPLOADS,
        skipDuplicates: true,
      });
      media = await prisma.mediaUpload.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return NextResponse.json({ success: true, data: media });
  } catch (error: any) {
    console.error('GET /api/media error:', error);
    return NextResponse.json({ success: true, data: INITIAL_MEDIA_UPLOADS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await getAuthUser(req);
    const body = await req.json();

    const media = await prisma.mediaUpload.create({
      data: {
        id: `med-${Date.now()}`,
        title: body.title,
        type: body.type || 'photo',
        url: body.url || '/image/athelete.png',
        athleteName: body.athleteName || 'Varsity Athlete',
        sport: body.sport || 'Multi-Sport',
        uploadedBy: body.uploadedBy || user?.name || 'Verified Member',
        uploadedById: user?.id,
        uploadedAt: 'Just now',
      },
    });

    return NextResponse.json({ success: true, data: media });
  } catch (error: any) {
    console.error('POST /api/media error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to record media upload.' } },
      { status: 500 }
    );
  }
}
