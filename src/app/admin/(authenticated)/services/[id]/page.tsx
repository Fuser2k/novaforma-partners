import { prisma } from '@/lib/db';
import ServiceForm from '@/components/admin/ServiceForm';
import { notFound } from 'next/navigation';

export default async function EditServicePage({ params }: { params: { id: string } }) {
    const service = await prisma.service.findUnique({
        where: { id: params.id },
    });

    if (!service) notFound();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dienst Bewerken</h1>
            </div>
            <ServiceForm initialData={service} />
        </div>
    );
}
