import Link from 'next/link';
import { prisma } from '@/lib/db';
import { ArticleActions } from '@/components/admin/ArticleActions';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

async function getArticles() {
    return prisma.article.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            slug: true,
            category: true,
            isDraft: true,
            publishDate: true,
            createdAt: true,
            createdBy: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
}

export default async function ArticlesIndex() {
    const articles = await getArticles();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Artikelen</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Beheer uw blog artikelen en nieuws
                    </p>
                </div>
                <Link
                    href="/admin/articles/create"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Nieuw Artikel
                </Link>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Titel</th>
                            <th className="px-6 py-4 font-medium">Categorie</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Auteur</th>
                            <th className="px-6 py-4 font-medium">Datum</th>
                            <th className="px-6 py-4 font-medium text-right">Acties</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {articles.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="block font-medium text-gray-900">{article.title}</span>
                                    <span className="text-xs text-gray-500">/{article.slug}</span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {article.isDraft ? (
                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                            Concept
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                            Gepubliceerd
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {article.createdBy ? `${article.createdBy.firstName} ${article.createdBy.lastName}` : '-'}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {article.publishDate ? format(new Date(article.publishDate), 'd MMM yyyy', { locale: nl }) : '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <ArticleActions id={article.id} slug={article.slug} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
