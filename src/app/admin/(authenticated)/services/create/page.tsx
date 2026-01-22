import ServiceForm from '@/components/admin/ServiceForm';

export default function CreateServicePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Nieuwe Dienst</h1>
            </div>
            <ServiceForm />
        </div>
    );
}
