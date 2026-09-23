import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/auth/jwt';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '@/lib/auth/session';

const PROTECTED_PREFIXES = ['/admin', '/coach', '/school', '/sponsor', '/student'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const matchedPrefix = PROTECTED_PREFIXES.find((prefix) => pathname.startsWith(prefix));
  if (!matchedPrefix) {
    return NextResponse.next();
  }

  const requiredRole = matchedPrefix.substring(1); // 'admin', 'coach', etc.
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  // If no auth cookies at all, redirect to login
  if (!accessToken && !refreshToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If access token is present, verify role authorization
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) {
      if (payload.role !== requiredRole && payload.role !== 'admin') {
        // User logged in with a different role; redirect to their respective dashboard
        return NextResponse.redirect(new URL(`/${payload.role}/dashboard`, request.url));
      }
      return NextResponse.next();
    }
  }

  // If access token expired but refresh token exists, allow through so the page/layout
  // or API guard can transparently rotate and refresh the session
  if (refreshToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/coach/:path*',
    '/school/:path*',
    '/sponsor/:path*',
    '/student/:path*',
  ],
};

export default proxy;
