import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';

// GET /api/admin/messages/[id] - Get single message
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const message = await prisma.message.findUnique({
            where: { id },
        });

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        return NextResponse.json({ message });
    } catch (error) {
        console.error('Get message error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/admin/messages/[id] - Update message (mark as read, add notes)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const { isRead, isArchived, notes } = body;

        const message = await prisma.message.update({
            where: { id },
            data: {
                ...(isRead !== undefined && { isRead }),
                ...(isArchived !== undefined && { isArchived }),
                ...(notes !== undefined && { notes }),
            },
        });

        return NextResponse.json({ message });
    } catch (error) {
        console.error('Update message error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/messages/[id] - Delete message
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        await prisma.message.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete message error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
