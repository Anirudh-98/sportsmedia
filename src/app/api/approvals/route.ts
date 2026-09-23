import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/guard';

const INITIAL_PENDING_APPROVALS = [
  {
    id: 'appr-1',
    type: 'Article Moderation',
    title: 'Next Gen Cricket Player Auction Analysis',
    submittedBy: 'Anirudh (Trainee Journalist)',
    role: 'Trainee Journalist',
    timestamp: '2 hours ago',
    status: 'pending',
    details: 'Draft article examining grassroots analytics and player scouting bids.',
  },
  {
    id: 'appr-2',
    type: 'Coach Registration',
    title: 'Senior NIS Badminton Coach Verification',
    submittedBy: 'Coach Vikram Rao',
    role: 'Coach',
    timestamp: '4 hours ago',
    status: 'pending',
    details: 'Submitted NIS Diploma in Sports Coaching and SAI accreditation proofs.',
  },
  {
    id: 'appr-3',
    type: 'School Verification',
    title: 'St. Andrews High School Sports Wing',
    submittedBy: 'Principal Sister Mary',
    role: 'School',
    timestamp: 'Yesterday',
    status: 'pending',
    details: 'Application to register 640 student athletes and 8 sports disciplines.',
  },
  {
    id: 'appr-4',
    type: 'Sponsor Verification',
    title: 'Decathlon South Zone Talent Grant Application',
    submittedBy: 'Decathlon Foundation Lead',
    role: 'Sponsor',
    timestamp: 'Yesterday',
    status: 'pending',
    details: 'Corporate CSR sponsorship proposal targeting 50 rural athletics kits.',
  },
  {
    id: 'appr-5',
    type: 'Event Submission',
    title: 'Inter-School Invitational Aquatics Meet 2026',
    submittedBy: 'Hyderabad Aquatic Association',
    role: 'Coach / Organizer',
    timestamp: '2 days ago',
    status: 'pending',
    details: 'Live scoring & event live stream coverage requested for 32 school teams.',
  },
];

export async function GET() {
  try {
    let approvals = await prisma.pendingApproval.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (approvals.length === 0) {
      await prisma.pendingApproval.createMany({
        data: INITIAL_PENDING_APPROVALS,
        skipDuplicates: true,
      });
      approvals = await prisma.pendingApproval.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return NextResponse.json({ success: true, data: approvals });
  } catch (error: any) {
    console.error('GET /api/approvals error:', error);
    return NextResponse.json({ success: true, data: INITIAL_PENDING_APPROVALS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const approval = await prisma.pendingApproval.create({
      data: {
        id: `appr-${Date.now()}`,
        type: body.type,
        title: body.title,
        submittedBy: body.submittedBy,
        submittedById: body.submittedById,
        role: body.role,
        timestamp: 'Just now',
        status: 'pending',
        details: body.details || '',
      },
    });

    return NextResponse.json({ success: true, data: approval });
  } catch (error: any) {
    console.error('POST /api/approvals error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create approval.' } },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);
    if (adminCheck.response) return adminCheck.response;

    const { id, status } = await req.json();

    const approval = await prisma.pendingApproval.update({
      where: { id },
      data: { status },
    });

    // If Article Moderation is approved, publish the matching article
    if (approval.type === 'Article Moderation' && status === 'approved') {
      await prisma.article.updateMany({
        where: { title: approval.title },
        data: {
          status: 'published',
          publishedAt: 'Today',
          views: 1,
        },
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, data: approval });
  } catch (error: any) {
    console.error('PATCH /api/approvals error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update approval.' } },
      { status: 500 }
    );
  }
}
