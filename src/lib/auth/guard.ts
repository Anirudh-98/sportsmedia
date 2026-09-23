import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken, signAccessToken, TokenPayload } from './jwt';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, hashToken, setAuthCookies } from './session';
import prisma from '@/lib/db/prisma';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  name: string;
}

/**
 * Extracts and validates the authenticated user from cookies or Authorization header.
 * Automatically performs transparent token refresh if the access token has expired
 * but a valid refresh session exists in the database.
 */
export async function getAuthUser(req: NextRequest): Promise<{
  user: AuthenticatedUser | null;
  newAccessToken?: string;
}> {
  // 1. Try Bearer token or sm_access_token cookie
  const authHeader = req.headers.get('authorization');
  let token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    token = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value || null;
  }

  if (token) {
    const payload = await verifyAccessToken(token);
    if (payload && payload.sub) {
      return {
        user: {
          id: payload.sub,
          email: payload.email,
          role: payload.role,
          name: payload.name,
        },
      };
    }
  }

  // 2. If access token is missing or expired, check for refresh token in cookie
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) {
    return { user: null };
  }

  const refreshPayload = await verifyRefreshToken(refreshToken);
  if (!refreshPayload || !refreshPayload.sub) {
    return { user: null };
  }

  // Validate session in database
  const refreshTokenHash = hashToken(refreshToken);
  try {
    const session = await prisma.session.findFirst({
      where: {
        refreshTokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session || !session.user) {
      return { user: null };
    }

    // Generate renewed access token
    const newAccessToken = await signAccessToken({
      sub: session.user.id,
      email: session.user.email,
      role: session.user.role,
      name: session.user.name,
    });

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        name: session.user.name,
      },
      newAccessToken,
    };
  } catch (err) {
    console.error('Error validating refresh session:', err);
    return { user: null };
  }
}

/**
 * Requires authentication. Returns user or sends 401 response.
 */
export async function requireAuth(req: NextRequest): Promise<
  | { user: AuthenticatedUser; response?: never }
  | { user?: never; response: NextResponse }
> {
  const { user, newAccessToken } = await getAuthUser(req);
  if (!user) {
    return {
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication required. Please sign in.',
          },
        },
        { status: 401 }
      ),
    };
  }

  return { user };
}

/**
 * Requires specific role(s). Returns 403 if role does not match.
 */
export async function requireRole(
  req: NextRequest,
  allowedRoles: string[]
): Promise<
  | { user: AuthenticatedUser; response?: never }
  | { user?: never; response: NextResponse }
> {
  const authResult = await requireAuth(req);
  if (authResult.response) {
    return authResult;
  }

  if (!allowedRoles.includes(authResult.user.role) && authResult.user.role !== 'admin') {
    return {
      response: NextResponse.json(
        {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: `Access denied. Requires one of: ${allowedRoles.join(', ')}`,
          },
        },
        { status: 403 }
      ),
    };
  }

  return { user: authResult.user };
}

/**
 * Requires admin role specifically.
 */
export async function requireAdmin(req: NextRequest) {
  return requireRole(req, ['admin']);
}
