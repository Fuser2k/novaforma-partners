export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { stepSchema } from '@/lib/validation';

// GET /api/admin/steps
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const steps = await prisma.step.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json({ steps });
    } catch (error) {
        console.error('Get steps error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/admin/steps
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = stepSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const step = await prisma.step.create({
            data: validation.data,
        });

        return NextResponse.json({ step }, { status: 201 });
    } catch (error) {
        console.error('Create step error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/steps/[id]
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...data } = body;

        const validation = stepSchema.safeParse(data);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const step = await prisma.step.update({
            where: { id },
            data: validation.data,
        });

        return NextResponse.json({ step });
    } catch (error) {
        console.error('Update step error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/steps/[id]  
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

        await prisma.step.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete step error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

