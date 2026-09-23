import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db/prisma';
import { requireAdmin } from '@/lib/auth/guard';

const UpdateUserSchema = z.object({
  role: z.enum(['student', 'coach', 'school', 'sponsor', 'admin']).optional(),
  status: z.enum(['Active', 'Verified', 'Pending', 'Suspended']).optional(),
  name: z.string().optional(),
  institution: z.string().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCheck = await requireAdmin(req);
    if (adminCheck.response) return adminCheck.response;

    const { id } = await params;
    const body = await req.json().catch(() => null);
    const parsed = UpdateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.issues[0]?.message || 'Invalid input.' } },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        institution: true,
        status: true,
        avatar: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('PUT /api/users/[id] error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to update user.' } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminCheck = await requireAdmin(req);
    if (adminCheck.response) return adminCheck.response;

    const { id } = await params;

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: { message: 'User deleted successfully.' } });
  } catch (error: any) {
    console.error('DELETE /api/users/[id] error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'Failed to delete user.' } },
      { status: 500 }
    );
  }
}
