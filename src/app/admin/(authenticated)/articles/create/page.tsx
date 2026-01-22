import ArticleForm from '@/components/admin/ArticleForm';

export default function CreateArticlePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Nieuw Artikel</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Maak een nieuw artikel aan voor de website
                </p>
            </div>

            <ArticleForm />
        </div>
    );
}
