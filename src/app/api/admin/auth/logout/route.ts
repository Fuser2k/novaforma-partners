import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin-token')?.value;

        if (token) {
            // Delete session from database
            await prisma.session.deleteMany({
                where: { token },
            });

            // Clear cookie
            cookieStore.delete('admin-token');
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
