import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getAuthUser } from '@/lib/auth/guard';

const INITIAL_COACH_ATHLETES = [
  {
    id: 'ath-1',
    name: 'Rohit Kumar',
    sport: 'Athletics (100m & 200m)',
    performance: 92,
    school: 'DPS Hyderabad',
    recentAchievement: 'New State Athletics Record (10.42s in 100m Sprint)',
    medals: 8,
    photo: '/image/athelete.png',
    coachName: 'Coach Rajesh Sharma',
    sponsorName: 'BlueZone Sports Fund',
  },
  {
    id: 'ath-2',
    name: 'Ananya Reddy',
    sport: 'Badminton (Singles)',
    performance: 89,
    school: 'Oakridge International School',
    recentAchievement: 'Won District Badminton Championship (U-16)',
    medals: 12,
    photo: '/image/athelete1.png',
    coachName: 'Coach Rajesh Sharma',
    sponsorName: 'SportsMedia Talent Grant',
  },
  {
    id: 'ath-3',
    name: 'Vikram Singh',
    sport: 'Cricket (All-rounder)',
    performance: 86,
    school: 'Chirec Public School',
    recentAchievement: 'Selected for State Under-19 Camp squad',
    medals: 5,
    photo: '/image/athelete2.png',
    coachName: 'Coach Rajesh Sharma',
  },
  {
    id: 'ath-4',
    name: 'Sara Khan',
    sport: 'Swimming (100m Freestyle)',
    performance: 94,
    school: 'Telangana Sports School',
    recentAchievement: 'Gold Medal at South Zone Aquatics Meet',
    medals: 15,
    photo: '/image/athelete3.png',
    coachName: 'Coach Rajesh Sharma',
    sponsorName: 'Decathlon Sports Foundation',
  },
];

export async function GET() {
  try {
    let athletes = await prisma.coachAthlete.findMany({
      orderBy: { performance: 'desc' },
    });

    if (athletes.length === 0) {
      await prisma.coachAthlete.createMany({
        data: INITIAL_COACH_ATHLETES,
        skipDuplicates: true,
      });
      athletes = await prisma.coachAthlete.findMany({ orderBy: { performance: 'desc' } });
    }

    return NextResponse.json({ success: true, data: athletes });
  } catch (error: any) {
    console.error('GET /api/athletes error:', error);
    return NextResponse.json({ success: true, data: INITIAL_COACH_ATHLETES });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await getAuthUser(req);
    const body = await req.json();

    const athlete = await prisma.coachAthlete.create({
      data: {
        id: `ath-${Date.now()}`,
        name: body.name,
        sport: body.sport,
        performance: Number(body.performance) || 80,
        school: body.school,
        recentAchievement: body.recentAchievement || 'Enrolled in Varsity Training',
        medals: Number(body.medals) || 0,
        phone: body.phone,
        photo: body.photo || '/image/athelete.png',
        coachName: body.coachName || user?.name || 'Coach Rajesh Sharma',
        coachId: user?.id,
        sponsorName: body.sponsorName,
      },
    });

    // Notify administrators
    await prisma.pendingApproval.create({
      data: {
        type: 'Coach Registration',
        title: `New Athlete Enrolled: ${athlete.name} (${athlete.sport})`,
        submittedBy: athlete.coachName,
        submittedById: user?.id,
        role: 'Coach',
        timestamp: 'Just now',
        status: 'pending',
        details: `Performance baseline: ${athlete.performance}%, School: ${athlete.school}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, data: athlete });
  } catch (error: any) {
    console.error('POST /api/athletes error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to add athlete.' } },
      { status: 500 }
    );
  }
}
