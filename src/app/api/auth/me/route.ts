import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth/guard';
import { setAuthCookies } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  try {
    const { user: authUser, newAccessToken } = await getAuthUser(req);

    if (!authUser) {
      return NextResponse.json({
        success: true,
        authenticated: false,
        data: { user: null },
      });
    }

    // Fetch freshest user data from database
    const dbUser = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        institution: true,
        avatar: true,
        status: true,
      },
    });

    const userProfile = dbUser || {
      id: authUser.id,
      name: authUser.name,
      email: authUser.email,
      role: authUser.role,
      institution: '',
      avatar: '',
      status: 'Active',
    };

    const response = NextResponse.json({
      success: true,
      authenticated: true,
      data: {
        user: userProfile,
      },
    });

    if (newAccessToken) {
      setAuthCookies(response, newAccessToken);
    }

    return response;
  } catch (error: any) {
    console.error('Error in /api/auth/me:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve user session.',
        },
      },
      { status: 500 }
    );
  }
}
