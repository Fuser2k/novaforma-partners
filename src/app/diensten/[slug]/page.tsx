'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, Calendar, Share2 } from 'lucide-react';

// Data for each audience segment acting as a "Blog Post" / Detail Page
const SERVICES_DATA: Record<string, {
    title: string;
    subtitle: string;
    image: string;
    content: React.ReactNode;
    readTime: string;
    date: string;
    tags: string[];
}> = {
    'ondernemers': {
        title: "Centrale Regie",
        subtitle: "Centrale regie over het volledige zorgondernemingstraject.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        readTime: "4 min lezen",
        date: "Actueel",
        tags: ["Regie", "Overzicht", "Monitoring"],
        content: (
            <div className="space-y-8 text-lg font-light leading-relaxed text-slate-300">
                <p>
                    Het digitale portaal biedt zorgondernemers een gestructureerd en inzichtelijk overzicht van het volledige ontwikkel- en implementatietraject richting een zorgonderneming.
                    Alle stappen binnen het NovaForma Partners 6-stappenmodel worden binnen het portaal ondersteund en inzichtelijk gemaakt.
                </p>

                <h3 className="text-2xl font-serif font-medium text-white mt-12 mb-6">Functionaliteiten</h3>
                <p>Via het portaal kunnen ondernemers onder meer:</p>
                <ul className="space-y-4 my-6">
                    {[
                        "De voortgang per stap volgen",
                        "Relevante documentatie centraal beheren",
                        "Deadlines, beslismomenten en oplevercriteria monitoren",
                        "Inzicht krijgen in afhankelijkheden tussen juridische, organisatorische, kwalitatieve en operationele onderdelen"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
                <p>
                    Hiermee fungeert het portaal als een digitaal kompas gedurende het gehele traject, van eerste initiatief tot stabiele exploitatie.
                </p>
            </div>
        )
    },
    'zorginstellingen': {
        title: "Kennis & Expertise",
        subtitle: "Toegang tot exclusieve kennis en expertise.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
        readTime: "6 min lezen",
        date: "Actueel",
        tags: ["Kennisdeling", "Wetgeving", "Innovatie"],
        content: (
            <div className="space-y-8 text-lg font-light leading-relaxed text-slate-300">
                <p>
                    Het NovaForma Partners Portaal biedt toegang tot een uitgebreide en exclusieve kennisomgeving die specifiek is ingericht voor zorgondernemers en zorgbestuurders.
                    De inhoud is samengesteld op basis van praktijkervaring, actuele regelgeving en strategische inzichten uit het zorgveld.
                </p>

                <h3 className="text-2xl font-serif font-medium text-white mt-12 mb-6">Kennisdomeinen</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-white mb-2">Zorgvastgoed</h4>
                        <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                            <li>Vastgoedontwikkeling en -selectie</li>
                            <li>Huur- en koopstructuren</li>
                            <li>Zorggeschikte inrichting en veiligheid</li>
                        </ul>
                    </div>
                    <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-white mb-2">Wet- en Regelgeving</h4>
                        <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                            <li>WLZ-kaders (GGZ en VG)</li>
                            <li>Governance en toezicht</li>
                            <li>Kwaliteitsnormen en compliance</li>
                        </ul>
                    </div>
                    <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-white mb-2">Zorgexploitatie</h4>
                        <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                            <li>Financiële sturing en modellen</li>
                            <li>Personeelsplanning</li>
                            <li>Capaciteitsmanagement</li>
                        </ul>
                    </div>
                    <div className="bg-[#1E293B] p-6 rounded-xl border border-slate-700">
                        <h4 className="font-bold text-white mb-2">Bestuur & Ondernerschap</h4>
                        <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
                            <li>Strategische besluitvorming</li>
                            <li>Risicomanagement</li>
                            <li>Leiderschap in de zorg</li>
                        </ul>
                    </div>
                </div>
                <p>
                    Deze kennisomgeving wordt continu geactualiseerd en uitgebreid, zodat zorgondernemers altijd beschikken over relevante en actuele inzichten.
                </p>
            </div>
        )
    },
    'investeerders': {
        title: "Veilig Netwerk",
        subtitle: "Beveiligde communicatie en vertrouwelijk overleg.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        readTime: "5 min lezen",
        date: "Actueel",
        tags: ["Security", "Netwerk", "Webinars"],
        content: (
            <div className="space-y-8 text-lg font-light leading-relaxed text-slate-300">
                <p>
                    Een essentieel onderdeel van het digitale portaal is de geavanceerde, encrypted chatfunctie, speciaal ontwikkeld voor zorgbestuurders en zorgondernemers.
                </p>

                <h3 className="text-2xl font-serif font-medium text-white mt-12 mb-6">Functionaliteiten</h3>
                <ul className="space-y-4 my-6">
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                        <span>Vertrouwelijke en privacygevoelige informatie veilig delen</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                        <span>Één-op-één of in besloten groepen sparren over bestuurlijke vraagstukken</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0" />
                        <span>Ervaringen en dilemma’s uitwisselen met gelijkgestemde professionals</span>
                    </li>
                </ul>

                <h3 className="text-2xl font-serif font-medium text-white mt-12 mb-6">Digitale Bijeenkomsten</h3>
                <p>
                    Via het NovaForma portaal worden tevens digitale webinars en kennissessies georganiseerd, exclusief voor aangesloten zorgondernemers.
                </p>
                <div className="my-8 p-6 bg-slate-800/50 rounded-xl border-l-4 border-blue-500">
                    <h4 className="text-lg font-bold text-white mb-2">Webinar Kenmerken</h4>
                    <ul className="list-disc list-inside text-slate-400 space-y-1">
                        <li>Deelname op afstand, volledig digitaal</li>
                        <li>Bijdragen van toonaangevende sprekers en experts</li>
                        <li>Verdieping op actuele thema's</li>
                        <li>Mogelijkheid tot interactie en discussie</li>
                    </ul>
                </div>
                <p>
                    Hiermee fungeert het portaal niet alleen als informatiebron, maar ook als actief netwerk- en leerplatform.
                </p>
            </div>
        )
    }
};

export default function ServiceDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const data = SERVICES_DATA[slug];

    if (!data) {
        return notFound();
    }

    return (
        <div className="bg-[#0F172A] min-h-screen font-sans text-white overflow-hidden">
            {/* Reading Progress Bar (Optional) */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1 }} // Placeholder for scroll progress
            />

            {/* Hero Section with Parallax Effect */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={data.image}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end container mx-auto px-4 pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href="/voor-wie" className="inline-flex items-center text-blue-300 hover:text-white mb-8 transition-colors group">
                            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Terug
                        </Link>

                        <div className="flex flex-wrap gap-4 mb-6">
                            {data.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-4 leading-tight">
                            {data.title}
                        </h1>
                        <p className="text-xl text-slate-300 font-light max-w-2xl">
                            {data.subtitle}
                        </p>

                        <div className="flex items-center gap-6 mt-8 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                {data.readTime}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {data.date}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid lg:grid-cols-[1fr_300px] gap-16 max-w-6xl mx-auto">

                    {/* Main Article */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="prose prose-lg prose-invert max-w-none"
                    >
                        {data.content}
                    </motion.article>

                    {/* Sidebar */}
                    <aside className="hidden lg:block space-y-8">
                        {/* Share Card */}
                        <div className="bg-[#1E293B]/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 sticky top-32">
                            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Delen
                            </h3>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-blue-600 transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center hover:bg-blue-700 transition-colors">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* Quick Call to Action */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-xl text-center sticky top-72">
                            <h3 className="text-lg font-bold text-white mb-2">Start Vandaag</h3>
                            <p className="text-sm text-blue-100 mb-6">
                                Neem de eerste stap om uw project te realiseren met ons expertteam.
                            </p>
                            <Link href="/contact" className="block w-full py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                Neem Contact Op
                            </Link>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
