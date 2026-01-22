export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const audiences = await prisma.audience.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                order: 'asc',
            },
        });

        return NextResponse.json({ audiences });
    } catch (error) {
        console.error('Get audiences error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
