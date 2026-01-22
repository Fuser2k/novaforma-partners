export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { globalSettingsSchema } from '@/lib/validation';

// GET /api/admin/settings - Get global settings
export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const settings = await prisma.globalSettings.findFirst();

        return NextResponse.json({ settings });
    } catch (error) {
        console.error('Get settings error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/settings - Update global settings
export async function PUT(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'ADMIN')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Validate input
        const validation = globalSettingsSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Get existing settings or create new
        const existing = await prisma.globalSettings.findFirst();

        let settings;
        if (existing) {
            settings = await prisma.globalSettings.update({
                where: { id: existing.id },
                data,
            });
        } else {
            settings = await prisma.globalSettings.create({
                data,
            });
        }

        return NextResponse.json({ settings });
    } catch (error) {
        console.error('Update settings error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

