import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Algemene Voorwaarden | NovaForma',
    description: 'Algemene voorwaarden voor het gebruik van de website en diensten van NovaForma.',
};

import { BlocksRenderer } from '@/components/strapi-blocks-renderer';
import { getLegalPageBySlug } from '@/lib/strapi';

export default async function TermsPage() {
    const page = await getLegalPageBySlug('algemene-voorwaarden');

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">{page?.title || 'Algemene Voorwaarden'}</h1>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-slate-800 prose prose-slate max-w-none">
                    {page?.content ? (
                        Array.isArray(page.content) ? (
                            <BlocksRenderer content={page.content} />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: page.content }} />
                        )
                    ) : (
                        <>
                            <h3>1. Toepasselijkheid</h3>
                            <p>
                                Door deze website te bezoeken of gebruik te maken van onze diensten, gaat u akkoord met deze algemene voorwaarden.
                            </p>
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
