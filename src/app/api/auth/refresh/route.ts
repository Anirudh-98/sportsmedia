import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, signAccessToken } from '@/lib/auth/jwt';
import { REFRESH_TOKEN_COOKIE, hashToken, setAuthCookies } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'No refresh token provided.' },
        },
        { status: 401 }
      );
    }

    const payload = await verifyRefreshToken(refreshToken);
    if (!payload || !payload.sub) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'INVALID_TOKEN', message: 'Refresh token expired or invalid.' },
        },
        { status: 401 }
      );
    }

    const refreshTokenHash = hashToken(refreshToken);
    const session = await prisma.session.findFirst({
      where: {
        refreshTokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session || !session.user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'SESSION_REVOKED', message: 'Session has been revoked or expired.' },
        },
        { status: 401 }
      );
    }

    const newAccessToken = await signAccessToken({
      sub: session.user.id,
      email: session.user.email,
      role: session.user.role,
      name: session.user.name,
    });

    const response = NextResponse.json({
      success: true,
      data: { message: 'Token refreshed successfully.' },
    });

    setAuthCookies(response, newAccessToken);
    return response;
  } catch (error: any) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      {
        success: false,
        error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to refresh token.' },
      },
      { status: 500 }
    );
  }
}
