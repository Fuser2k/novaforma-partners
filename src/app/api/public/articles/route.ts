export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const limit = parseInt(searchParams.get('limit') || '100');

        // Build where clause
        const where: any = {
            isDraft: false,
            deletedAt: null,
        };

        if (category) {
            where.category = category;
        }

        if (featured === 'true') {
            where.isFeatured = true;
        }

        // Fetch articles
        const articles = await prisma.article.findMany({
            where,
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
            },
            orderBy: [
                { publishDate: 'desc' },
                { createdAt: 'desc' },
            ],
            take: limit,
        });

        return NextResponse.json({ articles });
    } catch (error) {
        console.error('Get articles error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
