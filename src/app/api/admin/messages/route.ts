import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

// GET /api/admin/messages - List all messages
export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const sector = searchParams.get('sector');
        const isRead = searchParams.get('isRead');
        const isArchived = searchParams.get('isArchived');

        const where: any = {};

        if (sector) {
            where.sector = sector;
        }

        if (isRead !== null) {
            where.isRead = isRead === 'true';
        }

        if (isArchived !== null) {
            where.isArchived = isArchived === 'true';
        }

        const messages = await prisma.message.findMany({
            where,
            orderBy: [
                { isRead: 'asc' },
                { createdAt: 'desc' },
            ],
        });

        return NextResponse.json({ messages });
    } catch (error) {
        console.error('Get messages error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
