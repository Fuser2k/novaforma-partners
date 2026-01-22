
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, hasRole } from '@/lib/auth';
import { articleSchema } from '@/lib/validation';
import { revalidatePath } from 'next/cache';
import { sanitizeContent, logAudit } from '@/lib/security'; // Re-added import

export const dynamic = 'force-dynamic';

// GET /api/admin/articles - List all articles (with filters)
export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const isDraft = searchParams.get('isDraft');
        const search = searchParams.get('search');

        const where: any = {
            deletedAt: null,
        };

        if (category) {
            where.category = category;
        }

        if (isDraft !== null) {
            where.isDraft = isDraft === 'true';
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { summary: { contains: search, mode: 'insensitive' } },
            ];
        }

        const articles = await prisma.article.findMany({
            where,
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
            },
            orderBy: [
                { createdAt: 'desc' },
            ],
        });

        return NextResponse.json({ articles });
    } catch (error: any) {
        console.error('Get articles error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}

// POST /api/admin/articles - Create new article
export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session || !hasRole(session.role, 'EDITOR')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Validate input
        const validation = articleSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;
        // Ensure content is string
        const sanitizedContent = typeof data.content === 'string' ? sanitizeContent(data.content) : String(data.content);

        // Safe Date Parsing
        let publishDate: Date | null = null;
        if (data.publishDate) {
            const parsed = new Date(data.publishDate);
            if (!isNaN(parsed.getTime())) {
                publishDate = parsed;
            }
        }

        let publishedAt: Date | null = null;
        if (!data.isDraft) {
            publishedAt = new Date();
        }

        // 1. Create Article (No Transaction for safety)
        const article = await prisma.article.create({
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
                publishDate: publishDate,
                publishedAt: publishedAt,
                createdById: session.adminId,
                updatedById: session.adminId,
            }
        });

        // 2. Create Images if they exist
        if (data.images && data.images.length > 0) {
            try {
                await prisma.articleImage.createMany({
                    data: data.images.map((img: any) => ({
                        articleId: article.id,
                        url: img.url,
                        alt: img.alt,
                        order: img.order || 0
                    }))
                });
            } catch (imgError) {
                console.error("Error creating images:", imgError);
                // We don't fail the whole request if images fail, but we log it.
            }
        }

        // await logAudit(session.adminId, 'CREATE', 'Article', article.id, { title: article.title });

        // Revalidate cache
        try {
            revalidatePath('/blog');
            revalidatePath(`/blog/${article.slug}`);
        } catch (e) {
            console.error('Revalidation error:', e);
        }

        return NextResponse.json({ article }, { status: 201 });
    } catch (error: any) {
        console.error('Create article error:', error);
        return NextResponse.json({
            error: error.message || 'Internal server error',
            details: error.message,
            code: error.code, // Prisma error code
            meta: error.meta  // Prisma error meta
        }, { status: 500 });
    }
}
