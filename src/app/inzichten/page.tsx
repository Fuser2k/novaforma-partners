'use client';

import { TrendingUp, AlertCircle, Lightbulb, ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function InsightsPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Hero Section */}
            <div className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-soft-light pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Inzichten & Sectoranalyse
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
                        Trends in de Nederlandse zorgsector, wetgevingsupdates en expertperspectieven.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 max-w-6xl space-y-24">

                {/* 1. Trends & Analyse */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-900 font-serif">Trends & Analyse</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TRENDS.map((item, idx) => (
                            <Link key={idx} href={item.href} className="group flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="h-48 bg-slate-200 relative overflow-hidden">
                                    {/* Placeholder for image */}
                                    <div className={`absolute inset-0 ${item.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-2">
                                        <Calendar className="w-3 h-3" /> {item.date}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors font-serif leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-6 flex-1">
                                        {item.summary}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-bold text-sm mt-auto">
                                        Lees Analyse <ArrowUpRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 2. Wet- en Regelgeving */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <h2 className="text-2xl font-bold text-slate-900 font-serif">Wet- en Regelgeving</h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                        {REGULATIONS.map((item, idx) => (
                            <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:bg-slate-50 transition-colors">
                                <div className="shrink-0 pt-1">
                                    <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 uppercase tracking-wide">
                                        {item.tag}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">
                                        <Link href={item.href} className="hover:text-red-700 transition-colors">
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                        {item.summary}
                                    </p>
                                    <Link href={item.href} className="text-sm font-semibold text-slate-400 hover:text-slate-700 transition-colors inline-flex items-center">
                                        Bekijk details <ArrowRight className="w-3 h-3 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. NovaForma Perspectief */}
                <section>
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
                        <Lightbulb className="w-6 h-6 text-yellow-600" />
                        <h2 className="text-2xl font-bold text-slate-900 font-serif">NovaForma Perspectief</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {PERSPECTIVES.map((item, idx) => (
                            <Link key={idx} href={item.href} className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden group hover:shadow-2xl transition-all">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>

                                <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-4 block">Visieartikel</span>

                                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight group-hover:text-yellow-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 mb-8 leading-relaxed">
                                    {item.summary}
                                </p>

                                <div className="inline-flex items-center text-white font-bold border-b border-yellow-500/50 pb-1 group-hover:border-yellow-400 transition-colors">
                                    Lees onze Visie <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12">
                    <p className="text-slate-500 mb-4">Abonneer u op onze nieuwsbrief om geen inzichten te missen.</p>
                    <div className="max-w-md mx-auto flex gap-2">
                        <input type="email" placeholder="Uw e-mailadres" className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">Inschrijven</button>
                    </div>
                </section>

            </div>
        </div>
    );
}

const TRENDS = [
    {
        title: "Vooruitzichten Zorgsector 2026",
        summary: "Analyse van hoe personeelstekorten, digitalisering en thuiszorgtrends de sector in 2026 zullen vormen.",
        date: "Januari 2026",
        href: "/blog/zorgsector-vooruitzichten-2026",
        color: "bg-blue-600"
    },
    {
        title: "Duurzame Oplossingen voor de Personeelscrisis",
        summary: "Strategische HR-benaderingen om ZZP-kosten te verlagen en de betrokkenheid van vast personeel te vergroten.",
        date: "December 2025",
        href: "/blog/oplossingen-personeelscrisis",
        color: "bg-teal-600"
    },
    {
        title: "Technologie in de Thuiszorg",
        summary: "Integratie van monitoring op afstand en digitale gezondheidstools in WLZ-processen.",
        date: "November 2025",
        href: "/blog/technologie-thuiszorg",
        color: "bg-purple-600"
    }
];

const REGULATIONS = [
    {
        title: "Wijziging WLZ Indicatiecriteria",
        summary: "Hoe beïnvloeden de nieuwe evaluatiecriteria van het CIZ de aanvraagprocessen?",
        tag: "WLZ Update",
        href: "/blog/wijziging-wlz-indicatiecriteria"
    },
    {
        title: "Details Nieuw Kwaliteitskader",
        summary: "Nieuwe kwaliteits- en transparantiestandaarden die vanaf 2026 van kracht worden.",
        tag: "Wetgeving",
        href: "/blog/nieuw-kwaliteitskader"
    }
];

const PERSPECTIVES = [
    {
        title: "De 10 Meest Gemaakte Fouten in de Zorgsector",
        summary: "Kritieke fouten en oplossingen die ertoe leiden dat veel initiatieven in het eerste jaar falen of groeipijn ervaren.",
        href: "/blog/10-fouten-zorgsector"
    },
    {
        title: "Waarom Blijft een Kwaliteitssysteem op Papier?",
        summary: "Het belang van het opzetten van een cultuurgericht kwaliteitssysteem in plaats van een auditgericht systeem.",
        href: "/blog/kwaliteitssysteem-cultuur"
    }
];
