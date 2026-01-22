export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { serviceSchema } from '@/lib/validation';

// GET /api/admin/services
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const services = await prisma.service.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json({ services });
    } catch (error) {
        console.error('Get services error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/admin/services
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = serviceSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const service = await prisma.service.create({
            data: validation.data,
        });

        return NextResponse.json({ service }, { status: 201 });
    } catch (error) {
        console.error('Create service error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/services
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...data } = body;

        const validation = serviceSchema.safeParse(data);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const service = await prisma.service.update({
            where: { id },
            data: validation.data,
        });

        return NextResponse.json({ service });
    } catch (error) {
        console.error('Update service error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/services
export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        await prisma.service.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete service error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

