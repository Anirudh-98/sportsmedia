import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { createAuthSession, setAuthCookies } from '@/lib/auth/session';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';

const RegisterSchema = z.object({
  name: z.string().min(1, 'Please enter your full name or institution.'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  role: z.enum(['student', 'coach', 'school', 'sponsor']),
  institution: z.string().optional(),
});

const ROLE_APPROVAL_TYPE: Record<string, string> = {
  student: 'Trainee Journalist Registration',
  coach: 'Coach Registration',
  school: 'School Verification',
  sponsor: 'Sponsor Verification',
};

const DEFAULT_AVATARS: Record<string, string> = {
  student: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  coach: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  school: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80',
  sponsor: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  admin: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
};

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rateLimit = checkRateLimit(`register_${ip}`, 10, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many registration attempts. Please try again in ${rateLimit.retryAfter}s.`,
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message || 'Invalid input.',
          },
        },
        { status: 400 }
      );
    }

    const { name, email, password, role, institution } = parsed.data;
    const cleanEmail = email.trim().toLowerCase();

    // Check existing account
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EMAIL_ALREADY_IN_USE',
            message: 'An account with this email already exists. Please sign in instead.',
          },
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const avatar = DEFAULT_AVATARS[role] || DEFAULT_AVATARS.student;

    const user = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        passwordHash,
        role,
        institution: institution || '',
        avatar,
        status: 'Active',
      },
    });

    // Create pending approval item for administrators
    await prisma.pendingApproval.create({
      data: {
        type: ROLE_APPROVAL_TYPE[role] || 'Account Registration',
        title: `New Account: ${name} (${role.toUpperCase()})`,
        submittedBy: name,
        submittedById: user.id,
        role,
        timestamp: 'Just now',
        status: 'pending',
        details: `Email: ${cleanEmail}, Institution: ${institution || 'Individual'}`,
      },
    }).catch((err) => console.warn('Could not record pending approval:', err));

    const { accessToken, refreshToken } = await createAuthSession({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          institution: user.institution || '',
          avatar: user.avatar,
        },
      },
    });

    setAuthCookies(response, accessToken, refreshToken);
    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An unexpected error occurred during registration. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}
