'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Target, Building2, MapPin, Users, FileCheck, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { MouseEvent } from 'react';

const CORE_SOLUTIONS = [
    {
        title: 'Zorginstellingen realiseren',
        desc: 'Binnen 6 maanden naar een draaiende WLZ-zorginstelling.',
        icon: ShieldCheck,
        color: 'bg-blue-600'
    },
    {
        title: 'Zorgplaatsen vullen & bezettingsgarantie',
        desc: 'Cliëntenwerving en overdracht van netwerk met ≥75% bezetting.',
        icon: Users,
        color: 'bg-indigo-600'
    },
    {
        title: 'Locaties ontwikkelen & verbouwen',
        desc: 'Van vastgoedselectie en renovatie naar oplevering.',
        icon: MapPin,
        color: 'bg-sky-600'
    },
    {
        title: 'Governance, toezicht & certificering',
        desc: 'Juridische structuur, kwaliteit en integriteit borgen.',
        icon: FileCheck,
        color: 'bg-cyan-600'
    }
];

const DETAILED_FEATURES = [
    {
        title: 'Locatie & exploitatie',
        desc: 'Selectie, contractering en exploitatie van zorgvastgoed.',
        icon: Building2
    },
    {
        title: 'Instroom & netwerk',
        desc: 'Cliëntenwerving, bezetting vanaf opening en netwerkoverdracht.',
        icon: Users
    },
    {
        title: 'Kwaliteit & veiligheid',
        desc: 'Kwaliteit, compliance en toezicht-proof organisatie.',
        icon: Award
    },
    {
        title: 'Juridisch & governance',
        desc: 'Zorgondernemers juridisch en bestuurlijk borgen.',
        icon: FileCheck
    }
];

const PORTAL_FEATURES = [
    {
        step: "1",
        title: "Centrale regie over het volledige zorgondernemingstraject",
        points: [
            "Volledige procesoverzicht, van initieel plan t/m exploitatie",
            "Alle documenten en deadlines centraal beheerd",
            "Inrichting afhankelijkhede, juridische, organisatorische, kwalitatieve en operationele onderdelen"
        ]
    },
    {
        step: "2",
        title: "Toegang tot exclusieve kennis en expertise",
        points: [
            "Zorgvastgoed & exploitatie",
            "Zorginnovatie & technologie",
            "Wet- en regelgeving",
            "Bestuur & ondernemerschap"
        ]
    },
    {
        step: "3",
        title: "Veilig en vertrouwelijk digitaal overleg",
        points: [
            "Encrypted chatruimte voor privacygevoelige onderwerpen",
            "Verantwoordelijke afstemming tussen bestuurders",
            "Ervaringen en dilemma's delen met gelijkgestemden"
        ]
    }
];

function PortalFeatureCard({ feature, index }: { feature: any; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            onMouseMove={handleMouseMove}
            className="group relative bg-slate-900 border border-white/10 rounded-3xl p-8 h-full overflow-hidden hover:border-blue-500/50 transition-colors duration-500"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          500px circle at ${mouseX}px ${mouseY}px,
                          rgba(59, 130, 246, 0.1),
                          transparent 80%
                        )
                      `,
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-blue-900/50 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.step}
                </div>

                <h3 className="text-xl font-bold text-white mb-6 min-h-[3.5rem] group-hover:text-blue-200 transition-colors">
                    {feature.title}
                </h3>

                <ul className="space-y-4 flex-1">
                    {feature.points.map((point: string, pIdx: number) => (
                        <li key={pIdx} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                            <span>{point}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

export function ServicesClient() {
    return (
        <div className="bg-[#0F172A] min-h-screen font-sans text-white overflow-hidden">

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 px-4 z-10 overflow-hidden">
                {/* Section Specific Background */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                        src="/images/novaforma/ne_yapiyoruz_bg.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-[#0F172A]/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                </div>

                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight text-white">
                            Duurzame en succesvolle <br />
                            <span className="italic text-blue-400">zorgexploitaties maken</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-6">
                            Voor en door ervaren zorgondernemers
                        </p>
                    </motion.div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-blue-900/10 blur-[130px] -z-10 rounded-full" />
            </section>

            {/* Core Solutions Grid (2x2) */}
            <section className="py-12 px-4 relative z-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {CORE_SOLUTIONS.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6, type: "spring", bounce: 0.3 }}
                                className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl flex flex-col items-start relative overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`absolute top-0 right-0 w-40 h-40 ${item.color} opacity-5 rounded-bl-[100px] transition-transform group-hover:scale-150 duration-700`} />

                                <div className={`shrink-0 w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                                    <item.icon className="w-8 h-8" />
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 leading-tight">{item.title}</h3>
                                <p className="text-slate-600 text-lg leading-relaxed font-light">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed Features List */}
            <section className="py-12 px-4 relative z-20">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-slate-800/50 backdrop-blur-md rounded-3xl border border-slate-700 p-8 md:p-14"
                    >
                        <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-12 text-center">
                            Alles voor toekomstbestendige zorgexploitatie
                        </h3>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            {DETAILED_FEATURES.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-default"
                                >
                                    <div className="shrink-0 w-14 h-14 bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-300 border border-blue-500/20 group-hover:border-blue-400/50 group-hover:scale-110 transition-all">
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{feature.title}</h4>
                                        <p className="text-slate-400 text-base leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Digital Portal Section (New) */}
            <section className="py-24 px-4 relative z-10 bg-gradient-to-b from-[#1E3A8A] via-[#2563EB]/10 to-[#0F172A] border-y border-white/5 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-bold tracking-[0.2em] mb-6 uppercase">
                            Digitale Oplossingen
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 leading-tight">
                            Het digitale portaal van <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 italic">NovaForma Partners B.V.</span>
                        </h2>
                        <p className="text-blue-100/80 text-lg font-light leading-relaxed">
                            Een centraal platform ontwikkeld voor zorgondernemers. Toegang tot kennis, oplossingen en een beveiligde omgeving.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {PORTAL_FEATURES.map((feature, idx) => (
                            <PortalFeatureCard key={idx} feature={feature} index={idx} />
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-t from-slate-900 via-[#0F172A] to-[#0F172A] border-t border-slate-800 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-8">
                        De Weg naar Succes
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Neem contact met ons op en zet samen met ons de eerste stap naar het realiseren van uw doelen.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center gap-2">
                            Vrijblijvend Advies <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/7-stappen-model" className="group px-8 py-4 bg-transparent border border-slate-600 text-slate-300 font-medium text-lg rounded-sm hover:bg-white/5 hover:text-white hover:border-white/30 transition-all">
                            Bekijk onze Werkwijze
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
