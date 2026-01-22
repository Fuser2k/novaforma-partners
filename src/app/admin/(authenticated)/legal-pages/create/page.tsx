import LegalPageForm from '@/components/admin/LegalPageForm';

export default function CreateLegalPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Nieuwe Pagina</h1>
            </div>
            <LegalPageForm />
        </div>
    );
}
