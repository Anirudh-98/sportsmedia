import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies, revokeAuthSession, REFRESH_TOKEN_COOKIE } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
    if (refreshToken) {
      await revokeAuthSession(refreshToken);
    }

    const response = NextResponse.json({
      success: true,
      data: { message: 'Logged out successfully.' },
    });

    clearAuthCookies(response);
    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    const response = NextResponse.json({
      success: true,
      data: { message: 'Logged out.' },
    });
    clearAuthCookies(response);
    return response;
  }
}
