import { prisma } from '@/lib/db';
import StepForm from '@/components/admin/StepForm';
import { notFound } from 'next/navigation';

export default async function EditStepPage({ params }: { params: { id: string } }) {
    const step = await prisma.step.findUnique({
        where: { id: params.id },
    });

    if (!step) notFound();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Stap {step.number} Bewerken</h1>
            </div>
            <StepForm initialData={step} />
        </div>
    );
}
