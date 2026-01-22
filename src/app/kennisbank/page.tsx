'use client';

import { FileText, Download, Play, ChevronRight, BookOpen, ShieldCheck, CheckSquare, BarChart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ResourcesPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Hero Section */}
            <div className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 mix-blend-soft-light pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Kenniscentrum & Bronnen
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
                        Uitgebreide gidsen, sjablonen en tools voor het opzetten en beheren van zorginstellingen.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 max-w-6xl space-y-24">

                {/* 1. Rehberler (Guides) */}
                <section>
                    <div className="flex items-center gap-2 mb-8">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold text-slate-900 font-serif">Uitgebreide Gidsen</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {GUIDES.map((guide, idx) => (
                            <Link key={idx} href={guide.href} className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-16 -mt-16 transition-colors group-hover:bg-blue-50"></div>

                                <span className="inline-block px-3 py-1 bg-blue-50 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                                    Gids
                                </span>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors font-serif">
                                    {guide.title}
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {guide.summary}
                                </p>

                                <div className="flex items-center text-primary font-bold text-sm">
                                    Begin met lezen <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* 2. Şablonlar & Checklist'ler (Lead Magnets) */}
                <section>
                    <div className="flex items-center gap-2 mb-8">
                        <Download className="w-6 h-6 text-teal-600" />
                        <h2 className="text-2xl font-bold text-slate-900 font-serif">Sjablonen & Tools</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TEMPLATES.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-teal-500/50 transition-colors group text-center hover:shadow-lg">
                                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-xs text-slate-500 mb-4">{item.desc}</p>
                                <button className="w-full py-2 bg-slate-50 text-slate-600 font-medium rounded-lg text-sm hover:bg-teal-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" /> Downloaden
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Panel */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-serif font-bold mb-4">Weet u niet waar te beginnen?</h2>
                        <p className="text-slate-300 max-w-xl mx-auto mb-8">
                            Plan een gratis adviesgesprek van 15 minuten met onze experts en laten we samen uw routekaart bepalen.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/50">
                            Gratis Gesprek Plannen
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

const GUIDES = [
    {
        title: "Zorginstelling Opzetten in Nederland",
        summary: "End-to-end startgids over WLZ- en WMO-processen, licentiestappen en wettelijke vereisten.",
        href: "/blog/zorginstelling-opzetten-gids"
    },
    {
        title: "Het 7-Stappen Model",
        summary: "Details van de 24 weken durende reis van idee naar operatie met het bewezen model van NovaForma.",
        href: "/7-stappen-model"
    },
    {
        title: "WLZ vs WMO: Verschillen en Keuzegids",
        summary: "Welke financieringswet (WLZ of WMO) is geschikt voor uw initiatief? Voor- en nadelen.",
        href: "/blog/wlz-wmo-vergelijking"
    },
    {
        title: "Voorbereiding op Inspectie & Kwaliteitssysteem",
        summary: "De basisprincipes van het kwaliteitsmanagementsysteem die u moet opzetten om met succes door IGJ-audits te komen.",
        href: "/blog/inspectie-voorbereiding-gids"
    }
];

const TEMPLATES = [
    { title: "Inspectie Checklist", desc: "Checklist voor IGJ-audit.", icon: ShieldCheck },
    { title: "Roosterplanning", desc: "Voorbeeld Excel-sjabloon voor personeelsplanning.", icon: CheckSquare },
    { title: "Bedrijfsplan Sjabloon", desc: "Financiële projectie voor banken.", icon: BarChart },
    { title: "Risicoanalyse", desc: "Intern risicobeoordelingsformulier.", icon: FileText },
];
