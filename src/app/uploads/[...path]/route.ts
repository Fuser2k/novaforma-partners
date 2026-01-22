
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    try {
        const pathArray = (await params).path;
        const filename = pathArray.join('/');

        // Security check: prevent directory traversal
        if (filename.includes('..')) {
            return new NextResponse('Access Denied', { status: 403 });
        }

        // Match the upload directory used in the upload API
        const UPLOAD_DIR = process.env.UPLOAD_DIR || './public/uploads';
        const filePath = join(process.cwd(), UPLOAD_DIR, filename);

        if (!existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return new NextResponse('File not found', { status: 404 });
        }

        const fileBuffer = await readFile(filePath);

        // Determine mime type based on extension
        const ext = filename.split('.').pop()?.toLowerCase();
        let contentType = 'application/octet-stream';
        if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
        else if (ext === 'png') contentType = 'image/png';
        else if (ext === 'webp') contentType = 'image/webp';
        else if (ext === 'gif') contentType = 'image/gif';
        else if (ext === 'svg') contentType = 'image/svg+xml';

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                // Cache for 1 hour, then revalidate. This helps with new uploads showing up but also caching.
                'Cache-Control': 'public, max-age=3600, must-revalidate',
            },
        });
    } catch (error) {
        console.error('Error serving file:', error);
        return new NextResponse('Error reading file', { status: 500 });
    }
}
