'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AUDIENCES = [
    {
        title: "Centrale Regie",
        desc: "Een gestructureerd en inzichtelijk overzicht van het volledige ontwikkel- en implementatietraject richting een zorgonderneming.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        href: "/diensten/ondernemers",
        features: [
            "Voortgang bewaking per stap",
            "Centraal documentbeheer",
            "Monitoring van deadlines",
            "Volledige procescontrole"
        ]
    },
    {
        title: "Kennis & Expertise",
        desc: "Toegang tot een uitgebreide en exclusieve kennisomgeving, samengesteld op basis van praktijkervaring en actuele regelgeving.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
        href: "/diensten/zorginstellingen",
        features: [
            "Zorgvastgoed & Inrichting",
            "WLZ-kaders & Compliance",
            "Financiële sturing & Modellen",
            "Strategische besluitvorming"
        ]
    },
    {
        title: "Veilig Netwerk",
        desc: "Een beveiligd ecosysteem voor vertrouwelijke communicatie, encrypted overleg en deelname aan exclusieve digitale kennissessies.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        href: "/diensten/investeerders",
        features: [
            "Encrypted chatfunctie",
            "Exclusieve webinars",
            "Sparren met bestuurders",
            "Netwerk van professionals"
        ]
    },
];

export function Audience() {
    return (
        <section className="py-32 bg-[#0F172A] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-bold tracking-[0.3em] text-blue-400 uppercase block mb-6">
                        DIGITAAL PLATFORM
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-medium leading-tight max-w-4xl mx-auto text-white">
                        Het Digitale <span className="italic text-blue-200">Portaal</span>
                    </h2>
                    <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Ontworpen vanuit één kernprincipe: regie, overzicht en kennisdeling in een complexe en voortdurend veranderende zorgsector.
                    </p>
                </motion.div>

                {/* Card Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {AUDIENCES.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative bg-[#1E293B]/50 backdrop-blur-sm border border-slate-800 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/20"
                        >
                            {/* Image Header */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-80 mix-blend-overlay"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-serif font-medium text-white group-hover:text-blue-200 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 pt-2">
                                <p className="text-slate-400 text-sm leading-relaxed mb-8 border-b border-slate-800/80 pb-6 min-h-[80px]">
                                    {item.desc}
                                </p>

                                <div className="space-y-4 mb-8">
                                    <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2 block">KENMERKEN</span>
                                    {item.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                                <ChevronRight className="w-3 h-3 text-blue-400" />
                                            </div>
                                            <span className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={item.href}
                                    className="inline-flex items-center text-sm font-bold text-white hover:text-blue-400 transition-colors group/link"
                                >
                                    Meer Informatie <ChevronRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
