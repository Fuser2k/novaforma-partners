'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ITEMS = [
    {
        title: 'Acht voordeuren, acht verhalen: hoe een woonconcept tot leven komt',
        desc: 'Ontdek hoe kleinschalige woonvormen een groot verschil maken in de beleving van zorg en welzijn.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', // Abstract blue glass
        href: '/blog/acht-voordeuren-acht-verhalen-hoe-een-woonconcept-tot-leven-komt'
    },
    {
        title: 'Van gebouw naar gemeenschap: hoe woonconcepten verbinding creëren',
        desc: 'De rol van fysieke omgeving en sociale interactie in het bouwen van een hechte zorgcommunity.',
        image: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2670&auto=format&fit=crop', // Abstract fluid blue
        href: '/blog/van-gebouw-naar-gemeenschap-hoe-woonconcepten-verbinding-creren'
    },
    {
        title: 'Wonen is geen bijzaak — het is de basis van goede zorg',
        desc: 'Waarom de woonomgeving net zo belangrijk is als de zorgverlening zelf, en hoe u dit optimaliseert.',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop', // Abstract spiral/tech blue
        href: '/blog/wonen-is-geen-bijzaak-het-is-de-basis-van-goede-zorg'
    }
];

interface Article {
    id: string;
    title: string;
    summary: string;
    category: string;
    slug: string;
    publishedAt: string;
    content?: string;
    image?: string;
}

interface HowWeHelpProps {
    articles?: Article[];
}

export function HowWeHelp({ articles = [] }: HowWeHelpProps) {
    // Use passed articles or fallback to empty (or we could keep mock data as fallback)
    const displayItems = articles.slice(0, 3).map(article => {
        let imageUrl = article.image || '';
        if (imageUrl && !imageUrl.startsWith('http') && !imageUrl.startsWith('/')) {
            imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
        }

        return {
            title: article.title,
            desc: article.summary,
            image: imageUrl,
            href: `/blog/${article.slug}`
        };
    });

    if (displayItems.length === 0) return null;

    return (
        <section className="py-24 bg-[#001120] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold tracking-[0.2em] text-blue-200 uppercase block mb-6"
                    >
                        Uitgelichte Artikelen
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight md:leading-snug"
                    >
                        Kennis die uw organisatie <br className="hidden md:block" />
                        verder brengt.
                    </motion.h2>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {displayItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + (index * 0.2), ease: "easeOut" }}
                            className="group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden mb-8 bg-blue-900/20">
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-600">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="pr-4">
                                <Link href={item.href} className="inline-flex items-center text-xl font-bold mb-4 group-hover:text-blue-300 transition-colors">
                                    {item.title}
                                    <ChevronRight className="ml-1 h-5 w-5 md:opacity-0 md:-translate-x-2 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300" />
                                    <ChevronRight className="ml-1 h-5 w-5 md:hidden" /> {/* Always show on mobile */}
                                </Link>
                                <p className="text-lg text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
