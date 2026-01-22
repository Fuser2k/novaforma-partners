import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacyverklaring | NovaForma',
    description: 'NovaForma Privacyverklaring en informatie over de Algemene Verordening Gegevensbescherming (AVG).',
};

import { BlocksRenderer } from '@/components/strapi-blocks-renderer';
import { getLegalPageBySlug } from '@/lib/strapi';

export default async function PrivacyPage() {
    const page = await getLegalPageBySlug('privacyverklaring');

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">{page?.title || 'Privacyverklaring'}</h1>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-slate-800 prose prose-slate max-w-none">
                    {page?.content ? (
                        Array.isArray(page.content) ? (
                            <BlocksRenderer content={page.content} />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: page.content }} />
                        )
                    ) : (
                        // Fallback hardcoded if for some reason mock fails or returns empty
                        <>
                            <h3>1. Verwerkingsverantwoordelijke</h3>
                            <p>
                                NovaForma Partners B.V. treedt op als verwerkingsverantwoordelijke in de zin van de Algemene Verordening Gegevensbescherming ("AVG") en overige toepasselijke privacywetgeving.
                            </p>
                            {/* ... more default content could go here, but since MOCK handles it, this branch might rarely be hit unless mock is empty */}
                        </>
                    )}

                    <p className="mt-8 text-sm text-slate-500">
                        Laatste update: {page ? new Date(page.updatedAt).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' }) : '14 januari 2026'}
                    </p>
                </div>
            </div>
        </div>
    );
}
