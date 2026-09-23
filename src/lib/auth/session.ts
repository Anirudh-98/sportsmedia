import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/db/prisma';
import { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken, TokenPayload } from './jwt';

export const ACCESS_TOKEN_COOKIE = 'sm_access_token';
export const REFRESH_TOKEN_COOKIE = 'sm_refresh_token';

// Access token: 15 minutes (in seconds)
export const ACCESS_TOKEN_MAX_AGE = 15 * 60;
// Refresh token: 30 days (in seconds)
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;

export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Creates an active database session for a user and returns tokens.
 */
export async function createAuthSession(user: {
  id: string;
  email: string;
  role: string;
  name: string;
}) {
  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  const refreshToken = await signRefreshToken(user.id);
  const refreshTokenHash = hashToken(refreshToken);

  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE * 1000);

  try {
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash,
        expiresAt,
      },
    });
  } catch (error) {
    console.error('Failed to create session in database:', error);
  }

  return { accessToken, refreshToken };
}

/**
 * Attaches HttpOnly secure cookies to a NextResponse.
 */
export function setAuthCookies(
  res: NextResponse,
  accessToken: string,
  refreshToken?: string
) {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    path: '/',
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  if (refreshToken) {
    res.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }
}

/**
 * Clears authentication cookies from response.
 */
export function clearAuthCookies(res: NextResponse) {
  res.cookies.set(ACCESS_TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  res.cookies.set(REFRESH_TOKEN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

/**
 * Revokes a session by marking revokedAt or deleting it.
 */
export async function revokeAuthSession(refreshToken: string) {
  const refreshTokenHash = hashToken(refreshToken);
  try {
    await prisma.session.updateMany({
      where: { refreshTokenHash },
      data: { revokedAt: new Date() },
    });
  } catch (err) {
    console.error('Failed to revoke session:', err);
  }
}
