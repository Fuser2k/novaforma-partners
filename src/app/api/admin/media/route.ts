import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { unlink } from 'fs/promises';
import { join } from 'path';

const UPLOAD_DIR = process.env.UPLOAD_DIR || './public/uploads';

// GET /api/admin/media - List all media
export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder');
        const mimeType = searchParams.get('mimeType');

        const where: any = {
            deletedAt: null,
        };

        if (folder) {
            where.folder = folder;
        }

        if (mimeType) {
            where.mimeType = { startsWith: mimeType };
        }

        const media = await prisma.media.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 100,
        });

        return NextResponse.json({ media });
    } catch (error) {
        console.error('Get media error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/media/[id]
export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID required' }, { status: 400 });
        }

        // Get media record
        const media = await prisma.media.findUnique({
            where: { id },
        });

        if (!media) {
            return NextResponse.json({ error: 'Media not found' }, { status: 404 });
        }

        // Delete files from disk
        const uploadPath = join(process.cwd(), UPLOAD_DIR);
        try {
            await unlink(join(uploadPath, media.filename));
            if (media.thumbnailUrl) {
                const thumbFilename = media.thumbnailUrl.split('/').pop();
                if (thumbFilename) {
                    await unlink(join(uploadPath, thumbFilename));
                }
            }
        } catch (error) {
            console.error('File deletion error:', error);
            // Continue even if file deletion fails
        }

        // Soft delete in database
        await prisma.media.update({
            where: { id },
            data: { deletedAt: new Date() },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete media error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
