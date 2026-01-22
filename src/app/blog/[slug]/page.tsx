import { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, User, Share2, Clock, ChevronRight } from 'lucide-react';
import { getArticleBySlug, getArticles } from '@/lib/strapi';

interface PageProps {
    params: {
        slug: string;
    };
}

// Fallback data for demo purposes (when backend data is missing)
const FALLBACK_ARTICLES: Record<string, any> = {
    'acht-voordeuren-acht-verhalen-hoe-een-woonconcept-tot-leven-komt': {
        title: 'Acht voordeuren, acht verhalen: hoe een woonconcept tot leven komt',
        summary: 'Ontdek hoe kleinschalige woonvormen een groot verschil maken in de beleving van zorg en welzijn for bewoners.',
        content: `
Kleinschalig wonen is meer dan een trend; het is een noodzakelijke evolutie in de ouderenzorg en gehandicaptenzorg. In dit artikel bespreken we hoe het ontwerp van de fysieke omgeving direct bijdraagt aan de levenskwaliteit van bewoners.

## De menselijke maat
Grote instellingen voelen vaak onpersoonlijk aan. Door te kiezen voor clusters van bijvoorbeeld acht wooneenheden, creëren we een omgeving die overzichtelijk en veilig voelt. Hier kennen bewoners en zorgverleners elkaar echt.

## Privacy en ontmoeting
Een goed ontwerp balanceert tussen privacy (de eigen voordeur) en ontmoeting (de gezamenlijke huiskamer). Uit onderzoek blijkt dat deze balans essentieel is voor het verminderen van eenzaamheid en het vergroten van de zelfredzaamheid.

## Conclusie
Bij NovaForma zien we dat vastgoedontwikkeling hand in hand moet gaan met de zorgvisie. Acht voordeuren staan voor acht unieke levensverhalen die de ruimte krijgen om zich te ontvouwen in een veilige, huiselijke omgeving.
        `,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
        publishedAt: new Date().toISOString(),
        category: 'Vastgoed & Zorg'
    },
    'van-gebouw-naar-gemeenschap-hoe-woonconcepten-verbinding-creren': {
        title: 'Van gebouw naar gemeenschap: hoe woonconcepten verbinding creëren',
        summary: 'De rol van fysieke omgeving en sociale interactie in het bouwen van een hechte zorgcommunity.',
        content: `
Een gebouw bestaat uit stenen, een gemeenschap uit mensen. Maar de manier waarop we die stenen stapelen, bepaalt wel degelijk hoe die mensen met elkaar omgaan.

## Ontmoetingsplekken faciliteren
Brede gangen, nissen met zitjes, een centrale koffiehoek: het zijn 'kleine' ingrepen met grote impact. Ze nodigen uit tot spontaan contact tussen bewoners, familie en personeel.

## De buurt naar binnen halen
Een succesvol zorgconcept staat niet op zichzelf, maar is verbonden met de wijk. Een eerstelijns praktijk in de plint of een restaurant dat ook open is voor buurtbewoners zorgt voor levendigheid en verbinding.

## Samenredzaamheid
In een hechte gemeenschap kijken mensen naar elkaar om. Dit principe van 'samenredzaamheid' wordt steeds belangrijker nu de druk op de professionele zorg toeneemt.
        `,
        image: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=2670&auto=format&fit=crop',
        publishedAt: new Date().toISOString(),
        category: 'Sociale Innovatie'
    },
    'wonen-is-geen-bijzaak-het-is-de-basis-van-goede-zorg': {
        title: 'Wonen is geen bijzaak — het is de basis van goede zorg',
        summary: 'Waarom de woonomgeving net zo belangrijk is als de zorgverlening zelf, en hoe u dit optimaliseert.',
        content: `
Te vaak wordt zorgvastgoed gezien als een functionele huls voor zorglevering. Wij draaien het om: goed wonen is een voorwaarde voor goede zorg.

## Healing Environment
Licht, lucht, groen en akoestiek hebben aantoonbaar invloed op het herstel en welbevinden van mensen. Een 'Healing Environment' reduceert stress bij bewoners én verlaagt het ziekteverzuim onder personeel.

## Technologie als ondersteuner
Domotica en slimme sensoren maken het mogelijk om langer zelfstandig te wonen. Maar deze technologie moet dienend zijn en onzichtbaar geïntegreerd in het woonconcept, niet leidend.

## Flexibiliteit voor de toekomst
De zorgvraag verandert. Een goed gebouw kan meeademen met die veranderingen zonder dat er direct sloop of ingrijpende renovatie nodig is. Dat is duurzaamheid in de puurste vorm.
        `,
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop',
        publishedAt: new Date().toISOString(),
        category: 'Zorgvisie'
    }
};

// Since params is a promise in newer Next.js versions (though often still synchronus in type defs depending on version),
// we should treat it carefully. But standard Next.js 14/15 usage often awaits it or treats it as object.
// We'll proceed with standard async component.

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params; // Await params just in case (Next.js 15 requirement, harmless in 14)
    let article = await getArticleBySlug(slug);

    // Fallback if not found in backend
    if (!article && FALLBACK_ARTICLES[slug]) {
        article = { ...FALLBACK_ARTICLES[slug], id: 'fallback-' + slug, slug };
    }

    if (!article) {
        return {
            title: 'Artikel niet gevonden',
        };
    }

    return {
        title: `${article.title} | NovaForma Blog`,
        description: article.summary,
    };
}

export default async function ArticleDetail({ params }: PageProps) {
    const { slug } = await params;

    // Fetch multiple things in parallel for performance
    const [fetchedArticle, recentArticles] = await Promise.all([
        getArticleBySlug(slug),
        getArticles()
    ]);

    let article = fetchedArticle;
    if (!article && FALLBACK_ARTICLES[slug]) {
        article = { ...FALLBACK_ARTICLES[slug], id: 'fallback-' + slug, slug };
    }

    if (!article) {
        notFound();
    }

    // Helper to render content
    const renderContent = () => {
        if (!article.content) return null;

        // Handle Markdown/String - assuming HTML from Tiptap
        if (typeof article.content === 'string') {
            return <div className="prose prose-lg prose-slate max-w-none hover:prose-a:text-primary prose-a:font-bold prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-800 prose-p:leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />;
        }

        return <div className="text-red-500 bg-red-50 p-4 rounded-lg">Inhoud kan niet worden weergegeven.</div>;
    };

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-foreground">
            {/* Dark Hero Section */}
            <div className="bg-slate-900 pb-32 pt-24 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900/60 to-slate-900 z-0" />

                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <Link href="/blog" className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium group">
                            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Terug naar Blog
                        </Link>


                    </div>

                    <div className="flex flex-wrap gap-4 text-sm font-medium mb-6">
                        <span className="flex items-center text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                            <Tag className="h-3.5 w-3.5 mr-2" /> {article.category || 'Algemeen'}
                        </span>
                        <span className="flex items-center text-slate-300">
                            <Calendar className="h-3.5 w-3.5 mr-2" />
                            {new Date(article.publishedAt || new Date().toISOString()).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>

                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300 drop-shadow-sm">
                        {article.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl border-l-4 border-primary/50 pl-6">
                        {article.summary}
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container mx-auto px-4 relative z-20 max-w-6xl -mt-20">
                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Left Column: Article Content */}
                    <div className="lg:col-span-8">
                        {/* Featured Image */}
                        {article.image && (() => {
                            const getFullUrl = (url: string) => {
                                if (!url) return '';
                                if (url.startsWith('http')) return url;
                                if (url.startsWith('/')) return url;
                                return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${url}`;
                            };

                            const imageUrl = getFullUrl(article.image);
                            if (!imageUrl) return null;

                            return (
                                <div className="mb-10 rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200/10">
                                    <div className="aspect-video relative">
                                        <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            );
                        })()}

                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-slate-800">
                            {/* Author Info Small */}
                            <div className="flex items-center mb-10 pb-8 border-b border-slate-100">
                                <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                    <User className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-bold text-slate-900">NovaForma Redactie</p>
                                    <p className="text-xs text-slate-500">Wet- en Regelgeving Specialist</p>
                                </div>
                            </div>

                            {renderContent()}

                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4 space-y-8 lg:mt-32">
                        {/* Sticky Container */}
                        <div className="sticky top-28 space-y-8">

                            {/* CTA Card */}
                            <div className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <h3 className="text-xl font-serif font-bold mb-3 relative z-10">Start u uw eigen zorginstelling?</h3>
                                <p className="text-primary-foreground/90 text-sm mb-6 relative z-10">
                                    Plan een gratis adviesgesprek van 15 minuten met onze experts en versnel uw proces.
                                </p>
                                <Link href="/contact" className="inline-flex items-center justify-center w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm relative z-10">
                                    Direct een afspraak maken
                                </Link>
                            </div>

                            {/* Recent Articles */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-lg font-bold text-slate-900 mb-6 font-serif flex items-center">
                                    <span className="w-1 h-6 bg-primary rounded-full mr-3" />
                                    Recente Artikelen
                                </h3>
                                <div className="space-y-6">
                                    {recentArticles.filter(a => a.id !== article.id).slice(0, 3).map((recent: any) => {
                                        // Simple image extraction for sidebar
                                        let thumbUrl = null;
                                        if (recent.image) {
                                            if (recent.image.startsWith('http') || recent.image.startsWith('/')) {
                                                thumbUrl = recent.image;
                                            } else {
                                                thumbUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${recent.image}`;
                                            }
                                        }

                                        return (
                                            <Link key={recent.id} href={`/blog/${recent.slug || recent.id}`} className="group block">
                                                <div className="flex gap-4">
                                                    <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 relative border border-slate-100">
                                                        {thumbUrl ? (
                                                            <img src={thumbUrl} alt={recent.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300" />
                                                        ) : (
                                                            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">ZF</div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                                                            {recent.title}
                                                        </h4>
                                                        <span className="text-xs text-slate-500">{new Date(recent.publishedAt || recent.createdAt || new Date().toISOString()).toLocaleDateString('nl-NL')}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                    {recentArticles.filter(a => a.id !== article.id).length === 0 && (
                                        <div className="text-sm text-slate-400 italic">Geen andere artikelen gevonden.</div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
