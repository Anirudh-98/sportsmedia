import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import prisma from '@/lib/db/prisma';
import { hashToken } from '@/lib/auth/session';
import { checkRateLimit, getClientIp } from '@/lib/security/rateLimit';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    const rateLimit = checkRateLimit(`forgot_pw_${ip}`, 5, 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: `Too many password reset requests. Please wait ${rateLimit.retryAfter}s.`,
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = ForgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Please provide a valid email.' },
        },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      const resetToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = hashToken(resetToken);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.passwordResetToken.create({
        data: {
          email,
          tokenHash,
          expiresAt,
        },
      });

      // In development or when email provider is configured, log or dispatch email
      if (process.env.NODE_ENV !== 'production') {
        console.log(`[DEV ONLY] Password reset token for ${email}: ${resetToken}`);
      }
    }

    // Always respond with a generic success message to prevent user enumeration
    return NextResponse.json({
      success: true,
      data: {
        message: 'If an account exists with that email, a password reset link has been dispatched.',
      },
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong. Please try again.' },
      },
      { status: 500 }
    );
  }
}
