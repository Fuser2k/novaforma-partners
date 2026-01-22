import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookiebeleid | NovaForma',
    description: 'Details over het cookiegebruik van NovaForma.',
};

import { BlocksRenderer } from '@/components/strapi-blocks-renderer';
import { getLegalPageBySlug } from '@/lib/strapi';

export default async function CookiesPage() {
    const page = await getLegalPageBySlug('cookiebeleid');

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">{page?.title || 'Cookiebeleid'}</h1>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-slate-800 prose prose-slate max-w-none">
                    {page?.content ? (
                        Array.isArray(page.content) ? (
                            <BlocksRenderer content={page.content} />
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: page.content }} />
                        )
                    ) : (
                        <>
                            <h3>1. Wat zijn cookies?</h3>
                            <p>
                                Cookies zijn kleine tekstbestanden die door uw browser op uw apparaat worden opgeslagen wanneer u onze website bezoekt.
                            </p>
                            {/* Shortened fallback for code brevity, since mock is main logic */}
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
