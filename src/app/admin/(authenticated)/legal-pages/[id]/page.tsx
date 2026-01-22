import { prisma } from '@/lib/db';
import LegalPageForm from '@/components/admin/LegalPageForm';
import { notFound } from 'next/navigation';

export default async function EditLegalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const page = await prisma.legalPage.findUnique({
        where: { id: id },
    });

    if (!page) notFound();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Pagina Bewerken</h1>
            </div>
            <LegalPageForm initialData={page} />
        </div>
    );
}
