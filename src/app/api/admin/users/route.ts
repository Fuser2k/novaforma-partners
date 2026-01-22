import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole, hashPassword } from '@/lib/auth';
import { createAdminSchema } from '@/lib/validation';

// GET /api/admin/users - List all admin users (SUPER_ADMIN only)
export async function GET() {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const users = await prisma.admin.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                lastLoginAt: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Get users error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/admin/users - Create new admin user (SUPER_ADMIN only)
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = createAdminSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { email, password, firstName, lastName, role } = validation.data;

        // Check if email already exists
        const existing = await prisma.admin.findUnique({
            where: { email },
        });

        if (existing) {
            return NextResponse.json(
                { error: 'Email already in use' },
                { status: 400 }
            );
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const user = await prisma.admin.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
                role,
                isActive: true,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                createdAt: true,
            },
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error('Create user error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/users/[id] - Update admin user (SUPER_ADMIN only)
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, email, firstName, lastName, role, isActive, password } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        const updateData: any = {};

        if (email) updateData.email = email;
        if (firstName) updateData.firstName = firstName;
        if (lastName) updateData.lastName = lastName;
        if (role) updateData.role = role;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update password if provided
        if (password) {
            updateData.passwordHash = await hashPassword(password);
        }

        const user = await prisma.admin.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/users/[id] - Delete admin user (SUPER_ADMIN only)
export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'SUPER_ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        // Prevent self-deletion
        if (id === session.adminId) {
            return NextResponse.json(
                { error: 'Cannot delete your own account' },
                { status: 400 }
            );
        }

        // Delete user and all their sessions
        await prisma.admin.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete user error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
