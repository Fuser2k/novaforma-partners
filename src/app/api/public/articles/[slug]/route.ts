import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';


export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        // Find article by slug
        const article = await prisma.article.findFirst({
            where: {
                slug,
                isDraft: false,
                deletedAt: null,
            },
            include: {
                images: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ article });
    } catch (error) {
        console.error('Get article error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
