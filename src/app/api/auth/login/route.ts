import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { createAuthSession, setAuthCookies } from '@/lib/auth/session';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(1, 'Please enter your password.'),
  targetRole: z.string().optional(),
});

const PRESET_DEMO_USERS: Record<
  string,
  { name: string; role: string; institution: string; avatar: string }
> = {
  'student@sportsmedia.world': {
    name: 'Anirudh',
    role: 'student',
    institution: 'Sports Media Journalism School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  'coach@sportsmedia.world': {
    name: 'Coach Rajesh Sharma',
    role: 'coach',
    institution: 'NIS Athletics Academy & DPS Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  'school@sportsmedia.world': {
    name: 'ABC International School',
    role: 'school',
    institution: 'Hyderabad Sports Wing',
    avatar: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80',
  },
  'sponsor@sportsmedia.world': {
    name: 'BlueZone Sports Fund',
    role: 'sponsor',
    institution: 'Grassroots Sports Impact Foundation',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  'admin@sportsmedia.world': {
    name: 'Super Administrator',
    role: 'admin',
    institution: 'SportsMedia.World Central HQ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
};

const DEMO_PASSWORD = 'sports123';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rateLimit = checkRateLimit(`login_${ip}`, 15, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many login attempts. Please wait ${rateLimit.retryAfter}s before trying again.`,
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: parsed.error.issues[0]?.message || 'Invalid email or password.',
          },
        },
        { status: 400 }
      );
    }

    const { email, password, targetRole } = parsed.data;
    const cleanEmail = email.trim().toLowerCase();

    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    // Auto-seed demo accounts on first login if not yet created in the database
    if (!user && PRESET_DEMO_USERS[cleanEmail] && password === DEMO_PASSWORD) {
      const preset = PRESET_DEMO_USERS[cleanEmail];
      const passwordHash = await hashPassword(DEMO_PASSWORD);
      user = await prisma.user.create({
        data: {
          name: preset.name,
          email: cleanEmail,
          passwordHash,
          role: preset.role,
          institution: preset.institution,
          avatar: preset.avatar,
          status: 'Active',
          isVerified: true,
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Incorrect email or password.',
          },
        },
        { status: 401 }
      );
    }

    // Verify password hash
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Incorrect email or password.',
          },
        },
        { status: 401 }
      );
    }

    // Role verification if requested from a specific role tab
    if (targetRole && user.role !== targetRole && user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ROLE_MISMATCH',
            message: `Access Denied: This account is registered under the ${user.role.toUpperCase()} role. You cannot sign in through the ${targetRole.toUpperCase()} portal. Please select the ${user.role.toUpperCase()} tab.`,
          },
        },
        { status: 403 }
      );
    }

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
          avatar: user.avatar || '',
        },
      },
    });

    setAuthCookies(response, accessToken, refreshToken);
    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred during authentication. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}
