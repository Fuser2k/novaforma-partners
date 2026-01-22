import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Edit, GripVertical, Layers } from 'lucide-react';

async function getSteps() {
    return prisma.step.findMany({
        orderBy: {
            number: 'asc',
        },
    });
}

export default async function StepsIndex() {
    const steps = await getSteps();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">7-Stappen Model</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Beheer de stappen van het ZorgForma model
                    </p>
                </div>
                {/* Usually fixed number of steps, so maybe no create button needed if all 7 exist */}
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-6 py-4 font-medium w-16">Stap</th>
                            <th className="px-6 py-4 font-medium">Titel</th>
                            <th className="px-6 py-4 font-medium">Samenvatting</th>
                            <th className="px-6 py-4 font-medium text-right">Acties</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {steps.map((step) => (
                            <tr key={step.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-blue-600 text-lg">
                                    {step.number}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {step.title}
                                </td>
                                <td className="px-6 py-4 text-gray-500 max-w-md truncate">
                                    {step.summary}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link
                                            href={`/admin/steps/${step.id}`}
                                            className="rounded p-2 text-blue-600 hover:bg-blue-50"
                                            title="Bewerken"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
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
