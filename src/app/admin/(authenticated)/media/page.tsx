import { MediaLibrary } from '@/components/admin/MediaLibrary';

export default function MediaPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Media Bibliotheek</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Beheer alle afbeeldingen en bestanden
                    </p>
                </div>
            </div>

            <MediaLibrary />
        </div>
    );
}
