export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { legalPageSchema } from '@/lib/validation';

// GET /api/admin/legal-pages
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const pages = await prisma.legalPage.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ pages });
    } catch (error) {
        console.error('Get legal pages error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/admin/legal-pages
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = legalPageSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const page = await prisma.legalPage.create({
            data: validation.data,
        });

        return NextResponse.json({ page }, { status: 201 });
    } catch (error) {
        console.error('Create legal page error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

