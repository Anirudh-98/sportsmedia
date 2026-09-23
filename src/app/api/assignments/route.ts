import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getAuthUser } from '@/lib/auth/guard';

const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-1',
    title: 'District Finals Match Report (500 Words)',
    courseTitle: 'Sports Reporting & Writing',
    dueDate: '25 Sep 2026',
    status: 'pending',
    studentName: 'Anirudh',
  },
  {
    id: 'asg-2',
    title: 'Under-16 Athlete Profile Interview Piece',
    courseTitle: 'Interview & Athlete Profiling',
    dueDate: '28 Sep 2026',
    status: 'pending',
    studentName: 'Anirudh',
  },
  {
    id: 'asg-3',
    title: 'Track & Field Action Photo Essay (5 Shots)',
    courseTitle: 'Sports Photography',
    dueDate: '30 Sep 2026',
    status: 'graded',
    studentName: 'Anirudh',
    score: '96 / 100',
    feedback: 'Exceptional framing of sprint finish line expressions. Well accredited.',
  },
];

export async function GET() {
  try {
    let assignments = await prisma.assignment.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (assignments.length === 0) {
      await prisma.assignment.createMany({
        data: INITIAL_ASSIGNMENTS,
        skipDuplicates: true,
      });
      assignments = await prisma.assignment.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return NextResponse.json({ success: true, data: assignments });
  } catch (error: any) {
    console.error('GET /api/assignments error:', error);
    return NextResponse.json({ success: true, data: INITIAL_ASSIGNMENTS });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await getAuthUser(req);
    const body = await req.json();

    const { assignmentId, notes, studentName } = body;
    const resolvedStudentName = studentName || user?.name || 'Trainee Journalist';

    // Update assignment status to submitted
    let updated;
    try {
      updated = await prisma.assignment.update({
        where: { id: assignmentId },
        data: {
          status: 'submitted',
          submittedAt: 'Just now',
          feedback: notes ? `Notes: ${notes}` : undefined,
        },
      });
    } catch {
      // If assignment didn't exist in DB yet, create or ignore
    }

    // Add pending approval for journalism reviewer
    await prisma.pendingApproval.create({
      data: {
        type: 'Trainee Journalist Registration',
        title: `Assignment Submission: ${updated?.title || 'Journalism Assignment'}`,
        submittedBy: resolvedStudentName,
        submittedById: user?.id,
        role: 'Trainee Journalist',
        timestamp: 'Just now',
        status: 'pending',
        details: notes || 'Trainee Journalist submitted completed report for grading.',
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, data: updated || { id: assignmentId, status: 'submitted' } });
  } catch (error: any) {
    console.error('POST /api/assignments error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to submit assignment.' } },
      { status: 500 }
    );
  }
}
