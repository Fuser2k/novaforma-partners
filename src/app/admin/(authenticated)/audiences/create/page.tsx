import AudienceForm from '@/components/admin/AudienceForm';

export default function CreateAudiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Nieuwe Doelgroep</h1>
            </div>
            <AudienceForm />
        </div>
    );
}
