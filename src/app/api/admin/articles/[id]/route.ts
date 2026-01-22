import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { articleSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';

// GET /api/admin/articles/[id] - Get single article
export const dynamic = 'force-dynamic';

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

        const article = await prisma.article.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
                createdBy: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                updatedBy: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        });

        if (!article || article.deletedAt) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        return NextResponse.json({ article });
    } catch (error) {
        console.error('Get article error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

import { sanitizeContent, logAudit } from '@/lib/security';

// ... (GET remains same)

// PATCH /api/admin/articles/[id] - Update article
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'EDITOR')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Check if article exists
        const existing = await prisma.article.findUnique({
            where: { id },
        });

        if (!existing || existing.deletedAt) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        const validation = articleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;
        const sanitizedContent = typeof data.content === 'string' ? sanitizeContent(data.content) : data.content;

        // Transaction to handle image update
        const article = await prisma.$transaction(async (tx) => {
            const updated = await tx.article.update({
                where: { id },
                data: {
                    title: data.title,
                    summary: data.summary,
                    category: data.category,
                    slug: data.slug,
                    content: sanitizedContent,
                    seoTitle: data.seoTitle,
                    seoDescription: data.seoDescription,
                    keywords: data.keywords,
                    isFeatured: data.isFeatured,
                    isDraft: data.isDraft,
                    publishDate: data.publishDate ? new Date(data.publishDate) : null,
                    publishedAt: !data.isDraft && !existing.publishedAt ? new Date() : existing.publishedAt,
                    updatedById: session.adminId,
                }
            });

            // Handle images if provided
            if (data.images) {
                // Delete existing images
                await tx.articleImage.deleteMany({
                    where: { articleId: id }
                });

                // Create new images
                if (data.images.length > 0) {
                    await tx.articleImage.createMany({
                        data: data.images.map((img: any) => ({
                            articleId: id,
                            url: img.url,
                            alt: img.alt,
                            order: img.order || 0
                        }))
                    });
                }
            }

            return updated;
        });

        await logAudit(session.adminId, 'UPDATE', 'Article', id, { title: data.title });

        // Revalidate cache
        try { revalidatePath('/blog'); } catch (e) { console.error('Revalidation error:', e); }

        return NextResponse.json({ article });
    } catch (error) {
        console.error('Update article error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/admin/articles/[id] - Soft delete article
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'EDITOR')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Soft delete
        await prisma.article.update({
            where: { id },
            data: {
                deletedAt: new Date(),
            },
        });

        await logAudit(session.adminId, 'DELETE', 'Article', id);

        // Revalidate cache
        try { revalidatePath('/blog'); } catch (e) { console.error('Revalidation error:', e); }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete article error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
