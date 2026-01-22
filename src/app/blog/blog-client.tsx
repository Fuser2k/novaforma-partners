'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function BlogClient({ articles }: { articles: any[] }) {
    const [visibleCount, setVisibleCount] = useState(20);

    // Insert Newsletter Card logic:
    // We want to render the newsletter card as the 2nd item (index 1) manually in the UI loop 
    // or insert it into the array.
    // Let's insert it into the array for simpler masonry flow.
    // But articles are objects. Newsletter is a different shape.

    const displayArticles = articles.slice(0, visibleCount);

    // Helper to render contact/CTA card
    const ContactCard = () => (
        <div className="mb-8 break-inside-avoid bg-slate-900 text-white p-8 rounded-none md:rounded-lg text-center flex flex-col items-center justify-center h-full min-h-[300px]">
            <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-400 mb-6">
                <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-4">Direct Contact?</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Heeft u vragen over zorgexploitatie of wilt u sparren met een van onze experts?
            </p>
            <Link href="/contact" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-sm transition-all flex items-center justify-center gap-2 group">
                Neem Contact Op <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-16 max-w-[1600px]"> {/* Wide container like McKinsey */}

            {/* Masonry Grid with CSS Columns */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {displayArticles.map((article, index) => {
                    // Render Newsletter Card as the 2nd item (visual position changes with columns, but logical index 1)
                    // Using CSS columns, order is top-to-bottom.
                    // To simulate chronological LTR flow with masonry, JS is needed.
                    // But for visual masonry, standard CSS columns is acceptable if strict order isn't critical.

                    // Helper for render
                    return (
                        <div key={article.id || index} className="break-inside-avoid mb-8">
                            {/* Insert Contact Card before the 2nd article */}
                            {index === 1 && <ContactCard />}

                            <ArticleCard article={article} />
                        </div>
                    );
                })}
            </div>

            {/* Load More Button */}
            {visibleCount < articles.length && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="px-8 py-4 bg-slate-100 text-slate-900 font-medium hover:bg-slate-200 transition-colors tracking-wide text-sm border border-slate-200 uppercase"
                    >
                        Meer Laden
                    </button>
                </div>
            )}
        </div>
    );
}

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

function ArticleCard({ article }: { article: any }) {
    // Image Handling
    let imageUrl = null;
    if (article.image) {
        if (typeof article.image === 'string') {
            imageUrl = article.image;
        } else if (article.image.url) {
            imageUrl = article.image.url;
        } else if (Array.isArray(article.image) && article.image[0]?.url) {
            imageUrl = article.image[0].url;
        } else if (article.image.data) {
            const imgData = Array.isArray(article.image.data) ? article.image.data[0] : article.image.data;
            if (imgData?.attributes?.url) imageUrl = imgData.attributes.url;
            else if (imgData?.url) imageUrl = imgData.url;
        }
    }

    // Normalize relative URLs
    if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
        imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
    }


    // Determine Link Href
    // If slug exists, use it. If not, generate one from title.
    const articleSlug = article.slug || slugify(article.title);

    return (
        <Link href={`/blog/${articleSlug}`} className="group block">
            <div className="bg-white group-hover:opacity-90 transition-opacity">
                {/* Image */}
                <div className="w-full relative overflow-hidden mb-6">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={article.title}
                            className="w-full h-auto object-cover"
                        />
                    ) : (
                        <div className="w-full aspect-[4/3] bg-slate-100 flex items-center justify-center text-slate-300">
                            ZF Blog
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="pr-4">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors">
                        {article.title}
                    </h2>

                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-4">
                        {new Date(article.publishedAt || article.createdAt).toLocaleDateString('nl-NL', { month: 'long', day: 'numeric', year: 'numeric' })}
                        {' • '}
                        {article.category || 'Inzicht'}
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3 text-sm">
                        {article.summary}
                    </p>

                    {/* McKinsey style doesn't always have a button, title is the link. But user asked for View More mechanism. */}
                    {/* The "View More" button is usually for the list, not the card. */}
                </div>
            </div>
        </Link>
    );
}
