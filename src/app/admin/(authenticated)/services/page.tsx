import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Plus, Edit, Trash2, Briefcase, GripVertical } from 'lucide-react';

async function getServices() {
    return prisma.service.findMany({
        orderBy: {
            order: 'asc',
        },
    });
}

export default async function ServicesIndex() {
    const services = await getServices();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Diensten</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Beheer het aanbod van diensten
                    </p>
                </div>
                <Link
                    href="/admin/services/create"
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Nieuwe Dienst
                </Link>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium w-10">#</th>
                            <th className="px-6 py-4 font-medium">Titel</th>
                            <th className="px-6 py-4 font-medium">Icon</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Acties</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {services.map((service) => (
                            <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-400">
                                    <GripVertical className="h-4 w-4" />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {service.title}
                                </td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                                    {service.icon || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    {service.isActive ? (
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
                                            href={`/admin/services/${service.id}`}
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
