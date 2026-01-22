'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

const AUDIENCES = [
    {
        id: 1,
        title: "Centrale Regie",
        desc: "Een gestructureerd en inzichtelijk overzicht van het volledige ontwikkel- en implementatietraject richting een zorgonderneming. Alle stappen van het 6-stappenmodel in één oogopslag.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop",
        href: "/diensten/ondernemers",
        features: [
            "Voortgang bewaking per stap",
            "Centraal documentbeheer",
            "Monitoring van deadlines",
            "Inzicht in afhankelijkheden",
            "Oplevercriteria monitoren",
            "Volledige procescontrole"
        ]
    },
    {
        id: 2,
        title: "Kennis & Expertise",
        desc: "Toegang tot een uitgebreide en exclusieve kennisomgeving, samengesteld op basis van praktijkervaring, actuele regelgeving en strategische inzichten uit het zorgveld.",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
        href: "/diensten/zorginstellingen",
        features: [
            "Zorgvastgoed & Inrichting",
            "WLZ-kaders & Compliance",
            "Financiële sturing & Modellen",
            "Zorginnovatie & E-health",
            "Personeelsplanning & HR",
            "Strategische besluitvorming"
        ]
    },
    {
        id: 3,
        title: "Veilig Netwerk",
        desc: "Een beveiligd ecosysteem voor vertrouwelijke communicatie, encrypted overleg en deelname aan exclusieve digitale kennissessies en webinars met experts.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
        href: "/diensten/investeerders",
        features: [
            "Encrypted chatfunctie",
            "Exclusieve webinars",
            "Privacygevoelige data delen",
            "Netwerk van professionals",
            "Besloten groepen"
        ]
    }
];

function FeatureCard({ item, index }: { item: any; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className="group relative bg-slate-900 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-colors duration-500 flex flex-col h-full"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          650px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.15),
                          transparent 80%
                        )
                      `,
                }}
            />

            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 w-full z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-blue-300 transition-colors drop-shadow-lg">
                        {item.title}
                    </h2>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 relative z-20 bg-slate-900/50 backdrop-blur-sm -mt-2 flex flex-col flex-1">
                <p className="text-slate-300 text-base leading-relaxed mb-8 font-light min-h-[5rem]">
                    {item.desc}
                </p>

                <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-colors">
                    <span className="text-xs font-extrabold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MousePointer2 className="w-3 h-3" /> KENMERKEN
                    </span>
                    <ul className="space-y-3">
                        {item.features.map((feature: string, idx: number) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (idx * 0.1), duration: 0.5 }}
                                className="flex items-start gap-3 text-sm text-slate-400 group-hover:text-slate-200 transition-colors"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                {feature}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <Link
                    href={item.href}
                    className="w-full py-4 rounded-xl relative overflow-hidden group/btn border border-blue-500/30 bg-blue-500/10 hover:bg-blue-600 hover:border-blue-600 text-blue-300 hover:text-white font-bold text-sm transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(59,130,246,0.0)] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-auto"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Meer Informatie <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
                </Link>
            </div>
        </motion.div>
    );
}

export function AudienceClient() {
    return (
        <div className="bg-[#0b1121] min-h-screen font-sans text-white overflow-hidden selection:bg-blue-500/30">

            {/* Background Video */}
            <div className="absolute inset-0 h-full w-full pointer-events-none z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/novaforma/audience-bg-poster.png"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-corporate-office-4299-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#0b1121]/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-4">
                <div className="container mx-auto max-w-6xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold tracking-[0.3em] mb-8 uppercase backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                            DIGITAAL PLATFORM
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-serif font-medium mb-8 leading-snug tracking-tight">
                            Het Digitale <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400 italic py-1 pr-6">Portaal</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300/80 max-w-3xl mx-auto font-light leading-relaxed">
                            Ontworpen vanuit één kernprincipe: regie, overzicht en kennisdeling in een complexe en voortdurend veranderende zorgsector.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="pb-32 px-4 relative z-10">
                <div className="container mx-auto max-w-[1400px]">
                    <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                        {AUDIENCES.map((item, index) => (
                            <FeatureCard key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Strip */}
            <section className="py-32 bg-gradient-to-b from-[#0b1121] to-[#0f172a] relative overflow-hidden border-t border-white/5">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-10">
                            Klaar voor uw reis?
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/contact" className="group relative px-10 py-5 bg-white text-[#0F172A] font-bold text-lg rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] transition-all">
                                <span className="relative z-10 flex items-center gap-2">
                                    Start Nu Uw Aanvraag <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-blue-50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                            </Link>
                            <Link href="/7-stappen-model" className="group px-10 py-5 bg-transparent border border-white/10 text-slate-300 font-medium text-lg rounded-full hover:bg-white/5 hover:text-white hover:border-white/30 transition-all">
                                Bekijk Het 7-Stappenplan
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
