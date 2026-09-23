import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/guard';

const INITIAL_SCHOOL_INFO = {
  id: 'default-school',
  name: 'ABC International School',
  city: 'Hyderabad, Telangana',
  principal: 'Dr. R. K. Sharma',
  sportsCoordinator: 'M. Swaminathan (Senior PET)',
  studentsCount: 850,
  coachesCount: 12,
  sportsCount: 14,
  achievementsCount: 320,
  sportsBreakdown: JSON.stringify([
    { sport: 'Athletics', athletes: 280, color: 'bg-[#1565C0]' },
    { sport: 'Football', athletes: 210, color: 'bg-[#168C45]' },
    { sport: 'Cricket', athletes: 195, color: 'bg-[#F28C28]' },
    { sport: 'Badminton', athletes: 140, color: 'bg-[#7E378B]' },
    { sport: 'Basketball', athletes: 95, color: 'bg-[#E5232E]' },
  ]),
};

export async function GET() {
  try {
    let school = await prisma.schoolInfo.findUnique({
      where: { id: 'default-school' },
    });

    if (!school) {
      school = await prisma.schoolInfo.create({
        data: INITIAL_SCHOOL_INFO,
      });
    }

    const formatted = {
      ...school,
      sportsBreakdown: typeof school.sportsBreakdown === 'string'
        ? JSON.parse(school.sportsBreakdown)
        : school.sportsBreakdown,
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('GET /api/schools error:', error);
    return NextResponse.json({
      success: true,
      data: {
        ...INITIAL_SCHOOL_INFO,
        sportsBreakdown: JSON.parse(INITIAL_SCHOOL_INFO.sportsBreakdown),
      },
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authCheck = await requireAuth(req);
    if (authCheck.response) return authCheck.response;

    const body = await req.json();

    const dataToUpdate: any = { ...body };
    if (dataToUpdate.sportsBreakdown && typeof dataToUpdate.sportsBreakdown !== 'string') {
      dataToUpdate.sportsBreakdown = JSON.stringify(dataToUpdate.sportsBreakdown);
    }
    delete dataToUpdate.id;

    const updated = await prisma.schoolInfo.upsert({
      where: { id: 'default-school' },
      update: dataToUpdate,
      create: {
        ...INITIAL_SCHOOL_INFO,
        ...dataToUpdate,
      },
    });

    const formatted = {
      ...updated,
      sportsBreakdown: typeof updated.sportsBreakdown === 'string'
        ? JSON.parse(updated.sportsBreakdown)
        : updated.sportsBreakdown,
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('PUT /api/schools error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update school info.' } },
      { status: 500 }
    );
  }
}
