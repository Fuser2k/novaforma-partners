import { prisma } from '@/lib/db';
import ArticleForm from '@/components/admin/ArticleForm';
import { notFound } from 'next/navigation';

async function getArticle(id: string) {
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            images: true, // We need images for the form
        },
    });

    if (!article) return null;
    return article;
}

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Artikel Bewerken</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Pas het artikel "{article.title}" aan
                </p>
            </div>

            <ArticleForm initialData={article} />
        </div>
    );
}
