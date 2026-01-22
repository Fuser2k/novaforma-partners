import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { audienceSchema } from '@/lib/validation';

// GET /api/admin/audiences
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const audiences = await prisma.audience.findMany({
            orderBy: { order: 'asc' },
        });

        return NextResponse.json({ audiences });
    } catch (error) {
        console.error('Get audiences error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/admin/audiences
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = audienceSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }


        const audience = await prisma.audience.create({
            data: {
                ...validation.data,
                benefits: JSON.stringify(validation.data.benefits),
            },
        });

        return NextResponse.json({ audience }, { status: 201 });
    } catch (error) {
        console.error('Create audience error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/audiences
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...data } = body;

        const validation = audienceSchema.safeParse(data);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const audience = await prisma.audience.update({
            where: { id },
            data: {
                ...validation.data,
                benefits: JSON.stringify(validation.data.benefits),
            },
        });

        return NextResponse.json({ audience });
    } catch (error) {
        console.error('Update audience error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/audiences
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

        await prisma.audience.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete audience error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
