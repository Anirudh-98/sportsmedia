import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { requireAdmin } from '@/lib/auth/guard';

const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Valid email is required.'),
  role: z.enum(['student', 'coach', 'school', 'sponsor', 'admin']),
  institution: z.string().optional(),
  status: z.enum(['Active', 'Verified', 'Pending', 'Suspended']).default('Active'),
  password: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);
    if (adminCheck.response) return adminCheck.response;

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        institution: true,
        avatar: true,
        status: true,
        joinedDate: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role as any,
      institution: u.institution || 'Individual',
      status: u.status as any,
      joinedDate: u.joinedDate || u.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      avatar: u.avatar,
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('GET /api/users error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to fetch users.' } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminCheck = await requireAdmin(req);
    if (adminCheck.response) return adminCheck.response;

    const body = await req.json().catch(() => null);
    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid input.' } },
        { status: 400 }
      );
    }

    const { name, email, role, institution, status, password } = parsed.data;
    const cleanEmail = email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'EMAIL_EXISTS', message: 'User with this email already exists.' } },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password || 'sports123');

    const newUser = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        passwordHash,
        role,
        institution: institution || 'Individual',
        status,
        joinedDate: 'Today',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        institution: true,
        avatar: true,
        status: true,
        joinedDate: true,
      },
    });

    // Enqueue approval notification
    await prisma.pendingApproval.create({
      data: {
        type: `${role.charAt(0).toUpperCase() + role.slice(1)} Registration`,
        title: `Admin Created: ${name} (${role.toUpperCase()})`,
        submittedBy: 'Super Admin',
        role,
        timestamp: 'Just now',
        status: 'pending',
        details: `Email: ${cleanEmail}, Institution: ${institution || 'Individual'}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true, data: newUser });
  } catch (error: any) {
    console.error('POST /api/users error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create user.' } },
      { status: 500 }
    );
  }
}
