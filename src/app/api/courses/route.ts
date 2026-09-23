import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/guard';

const INITIAL_COURSES = [
  {
    id: 'course-1',
    title: 'Sports Reporting & Writing',
    category: 'Print & Digital',
    progress: 80,
    modulesCount: 10,
    completedModules: 8,
    nextLesson: 'Writing a Match Report',
    status: 'in_progress',
  },
  {
    id: 'course-2',
    title: 'Sports Photography & DSLR Handling',
    category: 'Visual Media',
    progress: 100,
    modulesCount: 8,
    completedModules: 8,
    nextLesson: 'Course Completed',
    status: 'completed',
  },
  {
    id: 'course-3',
    title: 'Mobile Video Journalism (MoJo)',
    category: 'Broadcast & Social',
    progress: 65,
    modulesCount: 12,
    completedModules: 8,
    nextLesson: '4K Smartphone Gimbal Framing',
    status: 'in_progress',
  },
  {
    id: 'course-4',
    title: 'Interview & Athlete Profiling',
    category: 'Features',
    progress: 100,
    modulesCount: 6,
    completedModules: 6,
    nextLesson: 'Course Completed',
    status: 'completed',
  },
  {
    id: 'course-5',
    title: 'Live Event & Match Commentary',
    category: 'Live Broadcasting',
    progress: 40,
    modulesCount: 8,
    completedModules: 3,
    nextLesson: 'Scoreboard Live Sync Voiceover',
    status: 'in_progress',
  },
  {
    id: 'course-6',
    title: 'Social Media & YouTube Sports Content',
    category: 'Digital Reach',
    progress: 30,
    modulesCount: 8,
    completedModules: 2,
    nextLesson: 'Viral Short-form Highlights Editing',
    status: 'in_progress',
  },
  {
    id: 'course-7',
    title: 'Sports Ethics & Responsible Journalism',
    category: 'Legal & Ethics',
    progress: 15,
    modulesCount: 6,
    completedModules: 1,
    nextLesson: 'Minors & Student Athlete Privacy Laws',
    status: 'in_progress',
  },
];

export async function GET() {
  try {
    let courses = await prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
    });

    if (courses.length === 0) {
      // Auto-seed initial courses if table is empty
      await prisma.course.createMany({
        data: INITIAL_COURSES,
        skipDuplicates: true,
      });
      courses = await prisma.course.findMany({ orderBy: { createdAt: 'asc' } });
    }

    return NextResponse.json({ success: true, data: courses });
  } catch (error: any) {
    console.error('GET /api/courses error:', error);
    // Fallback to in-memory initial list if database connection is pending
    return NextResponse.json({ success: true, data: INITIAL_COURSES });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);
    if (adminCheck.response) return adminCheck.response;

    const body = await req.json();
    const course = await prisma.course.create({
      data: {
        title: body.title,
        category: body.category,
        progress: body.progress || 0,
        modulesCount: body.modulesCount || 1,
        completedModules: body.completedModules || 0,
        nextLesson: body.nextLesson || 'First Lesson',
        status: body.status || 'not_started',
      },
    });

    return NextResponse.json({ success: true, data: course });
  } catch (error: any) {
    console.error('POST /api/courses error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create course.' } },
      { status: 500 }
    );
  }
}
