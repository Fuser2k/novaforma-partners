export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { prisma } from '@/lib/db';

// Hardened defaults
const UPLOAD_DIR = process.env.UPLOAD_DIR || './public/uploads';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB Limit (Stricter)

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // 1. Strict Size Check
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
                { status: 400 }
            );
        }

        // 2. MIME Allowlist (Preliminary check)
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedMimes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed' },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const inputBuffer = Buffer.from(bytes);

        // 3. Magic Byte & Integrity Check via Sharp
        // We attempt to process the image. If it fails, it's not a valid image.
        // We also force re-encoding to strip metadata and malicious payloads.
        let processedBuffer: Buffer;
        let finalExtension: string;
        let finalMime: string;

        try {
            const pipeline = sharp(inputBuffer);
            const metadata = await pipeline.metadata();

            // Limit dimensions to prevent pixel bombs
            if ((metadata.width || 0) > 4096 || (metadata.height || 0) > 4096) {
                return NextResponse.json({ error: 'Image dimensions too large (max 4096px)' }, { status: 400 });
            }

            // Normalization: specific to input type
            if (metadata.format === 'gif') {
                // For GIFs, we just optimize, we don't convert to webp/png to keep animation
                processedBuffer = await pipeline.gif().toBuffer();
                finalExtension = 'gif';
                finalMime = 'image/gif';
            } else {
                // For others, convert to WebP for safety & performance
                processedBuffer = await pipeline.webp({ quality: 80 }).toBuffer();
                finalExtension = 'webp';
                finalMime = 'image/webp';
            }
        } catch (error) {
            console.error('Image processing failed:', error);
            return NextResponse.json(
                { error: 'Invalid or corrupt image file' },
                { status: 400 }
            );
        }

        // 4. Generate Safe Filename
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const filename = `${timestamp}-${randomString}.${finalExtension}`; // Force extension based on safe type

        // Ensure upload directory exists
        const uploadPath = join(process.cwd(), UPLOAD_DIR);
        try {
            await mkdir(uploadPath, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // 5. Save Sanitized File
        const filepath = join(uploadPath, filename);
        await writeFile(filepath, processedBuffer);

        // 6. Create Thumbnail (200x200)
        const thumbnailFilename = `thumb-${filename}`;
        const thumbnailPath = join(uploadPath, thumbnailFilename);

        await sharp(processedBuffer)
            .resize(200, 200, { fit: 'cover' })
            .toBuffer()
            .then(buffer => writeFile(thumbnailPath, buffer));

        // 7. Save to DB
        const media = await prisma.media.create({
            data: {
                filename,
                originalName: file.name, // Keep original name reference
                mimeType: finalMime,
                size: processedBuffer.length,
                url: `/uploads/${filename}`,
                thumbnailUrl: `/uploads/${thumbnailFilename}`,
                uploadedById: session.adminId,
            },
        });

        return NextResponse.json({
            success: true,
            file: {
                id: media.id,
                url: media.url,
                thumbnailUrl: media.thumbnailUrl,
                filename: media.filename,
                size: media.size,
            },
        }, { status: 201 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Upload failed' },
            { status: 500 }
        );
    }
}

