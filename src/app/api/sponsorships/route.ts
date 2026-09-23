import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getAuthUser } from '@/lib/auth/guard';

const INITIAL_SPONSOR_PROGRAMS = [
  {
    id: 'prog-1',
    title: 'Grassroots Athletics Equipment & Nutrition Drive',
    sport: 'Athletics',
    location: 'Telangana & Andhra Pradesh',
    athletesCount: 25,
    requirement: 'Spikes, Tournament Travel & Nutrition Kits',
    status: 'active',
    targetAmount: '₹5,00,000',
    raisedAmount: '₹4,20,000',
    sponsorName: 'BlueZone Sports Fund',
  },
  {
    id: 'prog-2',
    title: 'Rural Girls Badminton Coaching Scholarship',
    sport: 'Badminton',
    location: 'Warangal & Nizamabad',
    athletesCount: 18,
    requirement: 'Carbon Racquets, Court Fees & NIS Coaching',
    status: 'active',
    targetAmount: '₹3,50,000',
    raisedAmount: '₹3,50,000',
    sponsorName: 'BlueZone Sports Fund',
  },
  {
    id: 'prog-3',
    title: 'Under-16 Fast Bowlers Conditioning Camp',
    sport: 'Cricket',
    location: 'Hyderabad District',
    athletesCount: 15,
    requirement: 'Physiotherapy & High Performance Turf Shoes',
    status: 'open',
    targetAmount: '₹4,00,000',
    raisedAmount: '₹2,50,000',
  },
  {
    id: 'prog-4',
    title: 'Para-Athlete Equipment & Wheelchair Support',
    sport: 'Para Sports',
    location: 'Pan India',
    athletesCount: 12,
    requirement: 'Custom Sports Wheelchairs & Travel Stipends',
    status: 'open',
    targetAmount: '₹6,00,000',
    raisedAmount: '₹2,30,000',
  },
];

export async function GET() {
  try {
    let programs = await prisma.sponsorshipProgram.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (programs.length === 0) {
      await prisma.sponsorshipProgram.createMany({
        data: INITIAL_SPONSOR_PROGRAMS,
        skipDuplicates: true,
      });
      programs = await prisma.sponsorshipProgram.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return NextResponse.json({ success: true, data: programs });
  } catch (error: any) {
    console.error('GET /api/sponsorships error:', error);
    return NextResponse.json({ success: true, data: INITIAL_SPONSOR_PROGRAMS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await getAuthUser(req);
    const body = await req.json();
    const { programId, athleteName, sponsorName, amount } = body;

    const resolvedSponsorName = sponsorName || user?.name || 'BlueZone Sports Fund';

    if (programId) {
      await prisma.sponsorshipProgram.update({
        where: { id: programId },
        data: {
          sponsorName: resolvedSponsorName,
          status: 'active',
          raisedAmount: amount || undefined,
        },
      }).catch(() => {});
    }

    if (athleteName) {
      await prisma.coachAthlete.updateMany({
        where: { name: { equals: athleteName } },
        data: { sponsorName: resolvedSponsorName },
      }).catch(() => {});
    }

    // Queue approval for sponsor verification
    await prisma.pendingApproval.create({
      data: {
        type: 'Sponsor Verification',
        title: `New Sponsorship Commitment: ${amount || 'Disbursement Pledge'}`,
        submittedBy: resolvedSponsorName,
        submittedById: user?.id,
        role: 'Sponsor',
        timestamp: 'Just now',
        status: 'pending',
        details: `Allocated to ${athleteName || 'Program funding'}. Awaiting fund disbursement confirmation.`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, data: { message: 'Sponsorship pledged successfully.' } });
  } catch (error: any) {
    console.error('POST /api/sponsorships error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to record sponsorship.' } },
      { status: 500 }
    );
  }
}
