import Link from 'next/link';
import { prisma } from '@/lib/db';
import { LegalPageActions } from '@/components/admin/LegalPageActions';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

async function getLegalPages() {
    return prisma.legalPage.findMany({
        orderBy: {
            title: 'asc',
        },
    });
}

export default async function LegalPagesIndex() {
    const pages = await getLegalPages();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Juridische Pagina's</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Beheer algemene voorwaarden en privacy beleid
                    </p>
                </div>
                <Link
                    href="/admin/legal-pages/create"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Nieuwe Pagina
                </Link>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Titel</th>
                            <th className="px-6 py-4 font-medium">Slug</th>
                            <th className="px-6 py-4 font-medium">Laatst gewijzigd</th>
                            <th className="px-6 py-4 font-medium text-right">Acties</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {page.title}
                                </td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                                    /{page.slug}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {format(new Date(page.updatedAt), 'd MMM yyyy HH:mm', { locale: nl })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <LegalPageActions id={page.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
