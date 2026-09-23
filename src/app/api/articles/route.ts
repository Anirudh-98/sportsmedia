import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getAuthUser } from '@/lib/auth/guard';

const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'Inside the Andhra Veterans Premier League Season 2 Clash of Titans',
    excerpt: 'A ringside analysis of how SS Interiors overcame Go Sportz in the thrilling semi-final at Doctors Ground, Vijayawada.',
    category: 'Cricket',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Trainee Journalist',
    views: 1420,
    publishedAt: '12 Sep 2026',
  },
  {
    id: 'art-2',
    title: 'From Grassroots to State Podium: Ananya Reddy’s Badminton Odyssey',
    excerpt: 'Tracing the rigorous NIS coaching regimen and multi-court agility routines powering Hyderabad’s rising shuttler.',
    category: 'Badminton',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Trainee Journalist',
    views: 980,
    publishedAt: '08 Sep 2026',
  },
  {
    id: 'art-3',
    title: 'The Sprint Revolution in Telangana Schools: A Data-Driven Report',
    excerpt: 'Analyzing the 100m sprint timing progression across district government schools equipped with professional timing gates.',
    category: 'Athletics',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Trainee Journalist',
    views: 740,
    publishedAt: '01 Sep 2026',
  },
  {
    id: 'art-4',
    title: 'Next Gen Cricket Player Auction: Key Takeaways for Academy Scouts',
    excerpt: 'How data analytics and live video streaming are transforming grassroots talent scouting in South India.',
    category: 'Cricket',
    status: 'pending_approval',
    authorName: 'Anirudh',
    authorRole: 'Trainee Journalist',
    views: 0,
    publishedAt: 'Pending Review',
  },
];

export async function GET() {
  try {
    let articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (articles.length === 0) {
      await prisma.article.createMany({
        data: INITIAL_ARTICLES,
        skipDuplicates: true,
      });
      articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
    }

    return NextResponse.json({ success: true, data: articles });
  } catch (error: any) {
    console.error('GET /api/articles error:', error);
    return NextResponse.json({ success: true, data: INITIAL_ARTICLES });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user } = await getAuthUser(req);
    const body = await req.json();

    const { title, excerpt, category, authorName, authorRole, coverImage } = body;

    const resolvedAuthorName = authorName || user?.name || 'Trainee Journalist';
    const resolvedAuthorRole = authorRole || user?.role || 'student';

    const article = await prisma.article.create({
      data: {
        id: `art-${Date.now()}`,
        title,
        excerpt,
        category: category || 'Sports',
        status: 'pending_approval',
        authorName: resolvedAuthorName,
        authorRole: resolvedAuthorRole,
        authorId: user?.id,
        views: 0,
        publishedAt: 'Pending Review',
        coverImage,
      },
    });

    // Create pending approval for moderation
    await prisma.pendingApproval.create({
      data: {
        type: 'Article Moderation',
        title: article.title,
        submittedBy: `${resolvedAuthorName} (${resolvedAuthorRole})`,
        submittedById: user?.id,
        role: resolvedAuthorRole,
        timestamp: 'Just now',
        status: 'pending',
        details: excerpt,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    console.error('POST /api/articles error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to submit article.' } },
      { status: 500 }
    );
  }
}
