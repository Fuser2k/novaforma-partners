import { prisma } from '@/lib/db';
import AudienceForm from '@/components/admin/AudienceForm';
import { notFound } from 'next/navigation';

export default async function EditAudiencePage({ params }: { params: { id: string } }) {
    const audience = await prisma.audience.findUnique({
        where: { id: params.id },
    });

    if (!audience) notFound();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Doelgroep Bewerken</h1>
            </div>
            <AudienceForm initialData={audience} />
        </div>
    );
}
