import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

async function getAudiences() {
    return prisma.audience.findMany({
        orderBy: {
            order: 'asc',
        },
    });
}

export default async function AudiencesIndex() {
    const audiences = await getAudiences();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Doelgroepen</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Beheer de doelgroep segmenten
                    </p>
                </div>
                <Link
                    href="/admin/audiences/create"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Nieuwe Doelgroep
                </Link>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium">Titel</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Acties</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {audiences.map((audience) => (
                            <tr key={audience.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {audience.title}
                                </td>
                                <td className="px-6 py-4">
                                    {audience.isActive ? (
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                                            Actief
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                            Inactief
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/audiences/${audience.id}`}
                                            className="rounded p-2 text-blue-600 hover:bg-blue-50"
                                            title="Bewerken"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <button className="rounded p-2 text-red-600 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
