import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { hashPassword } from '@/lib/auth/password';
import { hashToken } from '@/lib/auth/session';

const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = ResetPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid input.' },
        },
        { status: 400 }
      );
    }

    const { token, password } = parsed.data;
    const tokenHash = hashToken(token);

    const resetRecord = await prisma.passwordResetToken.findFirst({
      where: {
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });

    if (!resetRecord) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_TOKEN', message: 'Password reset link is invalid or has expired.' },
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: resetRecord.email } });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'Associated user account not found.' },
        },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Update password and invalidate all active sessions
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { passwordHash },
      }),
      prisma.session.updateMany({
        where: { userId: user.id },
        data: { revokedAt: new Date() },
      }),
      prisma.passwordResetToken.deleteMany({
        where: { email: user.email },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: { message: 'Password has been reset successfully. Please log in with your new password.' },
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to reset password.' },
      },
      { status: 500 }
    );
  }
}
