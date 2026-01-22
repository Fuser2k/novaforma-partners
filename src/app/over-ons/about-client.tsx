'use client';

import { motion } from 'framer-motion';
import { Target, Compass, Users, CheckCircle2, ArrowRight, ShieldCheck, FileCheck, Building2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const COMPANY_VALUES = [
    {
        title: "Resultaatgericht",
        desc: "Ontwikkel- en implementatiepartner voor zorgondernemers (WLZ GGZ en VG).",
        icon: FileCheck
    },
    {
        title: "Eindgebruiker",
        desc: "Blijft te allen tijde ondernemer en bestuurder van de zorgorganisatie.",
        icon: Users
    },
    {
        title: "Onderscheidend",
        desc: "Geen klassieke consultancy maar daadwerkelijk functionerende zorginstelling opleveren inclusief organisatie, processen en lopende zorgexploitatie.",
        icon: Target
    },
    {
        title: "Operationeel in 6 maanden",
        desc: "Bouwt operationele zorginstellingen in 6 maanden, ondersteund door ervaren zorgpartners en een digitaal portaal.",
        icon: Building2
    },
    {
        title: "Integrale 6-stappen aanpak",
        desc: "Volledige zorginstelling met exploitatie.",
        icon: Compass
    },
    {
        title: "Toetsingsklaar en duurzaam",
        desc: "Praktisch netwerk en portaal.",
        icon: ShieldCheck
    }
];

export function AboutClient() {
    return (
        <div className="bg-[#0F172A] min-h-screen font-sans text-white overflow-hidden">

            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e40af 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            {/* Hero Section - Full Screen with Text Overlay */}
            <section className="relative h-[70vh] min-h-[600px] flex items-end pb-12 md:pb-24 px-4 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/novaforma/over-ons-clean.jpg"
                        alt="NovaForma Partners Team"
                        fill
                        className="object-cover object-top"
                        quality={100}
                        priority
                    />
                    {/* Light Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-transparent to-transparent" />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10 w-full mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="max-w-4xl bg-slate-900/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 text-white tracking-tight drop-shadow-lg">
                            Over ons
                        </h1>
                        <div className="space-y-4">
                            <p className="text-xl md:text-2xl text-slate-100 font-light leading-relaxed drop-shadow-md">
                                <span className="font-bold text-white">NovaForma Partners B.V.</span> is een samenwerkingsverband
                                van ervaren zorginstellingen en zorgondernemers, gespecialiseerd
                                in het realiseren van toekomstbestendige zorgexploitaties.
                            </p>
                            <p className="text-lg md:text-xl text-slate-200 font-light leading-relaxed drop-shadow-md">
                                Wij bieden professionele samenwerking, innovatieve oplossingen en
                                actief netwerk aan, waarmee wij <span className="text-white font-medium border-b border-blue-400">succesvolle</span> zorginstellingen <span className="text-white font-medium border-b border-blue-400">ontwikkelen.</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Independent Partnership Context */}
            <section className="py-20 px-4 relative z-10">
                <div className="container mx-auto max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-[#1E293B]/60 backdrop-blur-md border border-slate-700/50 p-10 md:p-14 rounded-3xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                            <div className="shrink-0 w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-serif font-medium text-white mb-4 flex items-center gap-3">
                                    Onafhankelijke Partnerstructuur
                                </h3>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    NovaForma Partners richt zelf geen zorginstellingen op. De ondernemer blijft te allen tijde de volledige eigenaar en licentiehouder.
                                    Samen met een landelijk netwerk van ervaren zorg- en samenwerkingspartners, waaronder Mentis Care B.V., faciliteren wij het gehele proces en coördineren wij de uitvoering.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Company Values / Over NovaForma Section */}
            <section className="py-24 px-4 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        {/* Visual Side - Keeping a relevant image or pattern */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-[2/3] group">
                                <Image
                                    src="/images/novaforma/about.jpg"
                                    alt="NovaForma Building"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="bg-transparent p-2">
                                        <h4 className="text-3xl font-serif font-medium text-white mb-2 shadow-black/50 drop-shadow-lg">NovaForma Partners B.V.</h4>
                                        <p className="text-blue-200 text-lg shadow-black/50 drop-shadow-md">Uw partner in zorgexploitatie</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side - The List */}
                        <div className="w-full lg:w-1/2">
                            <h3 className="text-3xl md:text-4xl font-serif font-medium text-white mb-12">
                                Over <span className="text-blue-400">NovaForma Partners B.V.</span>
                            </h3>

                            <div className="space-y-8">
                                {COMPANY_VALUES.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                                        className="flex gap-5 group"
                                    >
                                        <div className="shrink-0 w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-blue-400 border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                            <item.icon className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Grid */}
            <section className="py-24 px-4 relative z-10 border-t border-slate-800/50">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                        {/* Mission Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group shadow-2xl"
                        >
                            <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600/20 group-hover:scale-110 transition-all duration-300">
                                <Target className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-serif font-medium text-white mb-8">
                                Missie <span className="block text-blue-400">NovaForma Partners B.V.</span>
                            </h2>
                            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
                                <p>
                                    NovaForma Partners B.V. is ontstaan vanuit een krachtig samenwerkingsverband van ervaren zorginstellingen en zorgondernemers uit heel Nederland. Door het bundelen van praktijkervaring, ondernemerschap en deskundigheid hebben wij een solide fundament gecreëerd voor nieuwe zorginitiatieven.
                                </p>
                                <p>
                                    Onze missie is het <span className="text-white font-medium">herwaarderen en versterken van ondernemerschap</span> binnen de zorg. Juist nu de sector onder druk staat, vormen zorgondernemers de ruggengraat van kwalitatieve zorg.
                                </p>
                                <p>
                                    Wij stellen ons ten doel om zorgondernemen opnieuw toe te juichen en te faciliteren. Wij begeleiden ondernemers bij het realiseren van toekomstbestendige zorgexploitatie, waarbij kwaliteit en maatschappelijke waarde centraal staan.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 md:p-12 rounded-[2rem] border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500 group shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative blur */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            <div className="w-16 h-16 bg-blue-400/10 rounded-2xl flex items-center justify-center text-blue-300 mb-8 group-hover:bg-blue-400/20 group-hover:scale-110 transition-all duration-300 relative z-10">
                                <Compass className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-serif font-medium text-white mb-8 relative z-10">
                                Visie <span className="block text-blue-300">NovaForma Partners B.V.</span>
                            </h2>
                            <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light relative z-10">
                                <p>
                                    Wij geloven dat een toekomstbestendige zorgsector alleen mogelijk is wanneer ondernemerschap, deskundigheid en samenwerking centraal blijven staan. Zorg wordt gedragen door mensen die verantwoordelijkheid nemen en durven investeren in kwaliteit.
                                </p>
                                <p>
                                    NovaForma Partners B.V. ziet een zorglandschap voor zich waarin zorgondernemers worden verbonden binnen een <span className="text-blue-200 font-medium">krachtig en professioneel netwerk</span>.
                                </p>
                                <p>
                                    Door het samenbrengen van zorgondernemers, vastgoedpartijen en experts bouwen wij aan een collectief van kennis, ervaring en vertrouwen. Een ecosysteem voor stabiliteit, continuïteit en groei.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Final Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-12 relative overflow-hidden rounded-[2rem] bg-blue-600 p-12 text-center shadow-2xl shadow-blue-900/50"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 opacity-50" />

                        <h3 className="relative z-10 text-2xl md:text-3xl font-serif font-medium text-white leading-relaxed max-w-4xl mx-auto">
                            &ldquo;NovaForma Partners B.V. wil daarin een structurele en verbindende rol vervullen — als ontwikkelaar, als sparringpartner en als hoeder van duurzaam zorgondernemen.&rdquo;
                        </h3>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
