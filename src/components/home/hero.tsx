'use client';

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden">
            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-background z-0">
                <div
                    className="absolute inset-0 bg-[url('/assets/hero/cosmic-bg.png')] bg-cover bg-center opacity-80 mix-blend-screen"
                    style={{ backgroundAttachment: 'fixed' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background/90" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* --- COLUMN 1 --- */}
                    <div className="flex flex-col gap-6 lg:w-[45%]">
                        {/* 1. Title Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative pb-8 flex flex-col justify-start">
                            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-tight tracking-tight mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                <span className="block whitespace-nowrap">Wat is uw volgende</span>
                                <span className="block whitespace-nowrap ml-[1.5em] sm:ml-[1.2em] lg:ml-[1.5em]">strategische zet?</span>
                            </h1>
                            <p className="text-lg text-blue-100/80 max-w-2xl font-light leading-relaxed mb-8 drop-shadow-md">
                                Innovatieve zorgconcepten. Duurzame groei. Bij NovaForma helpen we u groter te denken, sterker te bouwen en kansen te benutten in de zorgsector.
                            </p>

                            <Link href="/contact?type=startscan" className="absolute right-0 top-1/2 -translate-y-1/2 group relative flex items-center justify-center w-20 h-20 rounded-full bg-slate-600/80 border border-white/10 backdrop-blur-md transition-all duration-500 hover:bg-slate-500/80 hover:border-white/30 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(66,200,255,0.5)]">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <ArrowRight className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                            </Link>
                        </motion.div>

                        {/* 2. Globe Card (Tall) */}
                        {/* 2. 7-Step Model Card (Replaces Globe Card) */}
                        <Link href="/7-stappen-model" className="block w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="group relative aspect-square w-full overflow-hidden rounded-md border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-[url('/images/novaforma/hero-7step.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-blue-200 uppercase mb-3 drop-shadow-md">BLUEPRINT</p>
                                    <h3 className="text-2xl font-serif text-white group-hover:text-blue-200 transition-colors duration-300 leading-tight">
                                        The 7-Step NovaForma <br /> Model
                                    </h3>
                                    <div className="mt-4 flex items-center text-xs font-semibold text-blue-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        READ MORE <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* 3. Asia Card (Short) */}
                        {/* 3. Who Is It For Card (Replaces Asia Card) */}
                        <Link href="/voor-wie" className="block w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="group relative w-full min-h-[360px] overflow-hidden rounded-md border border-white/10 bg-blue-950/30 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-blue-300/30 hover:shadow-[0_0_40px_rgba(29,78,216,0.2)] cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-[#1a237e]/50 to-[#4a148c]/50" />
                                <div className="absolute inset-0 bg-[url('/images/novaforma/hero-who-is-it-for.png')] bg-cover bg-center opacity-60 mix-blend-screen transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-blue-200 uppercase mb-3 drop-shadow-md">TARGET AUDIENCE</p>
                                    <h3 className="text-2xl font-serif text-white group-hover:text-blue-100 transition-colors duration-300">
                                        Voor wie is NovaForma: Ondernemers, Zorgprofessionals & Investeerders
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    {/* --- COLUMN 2 --- */}
                    <div className="flex flex-col gap-6 lg:w-[25%]">
                        {/* Spacer to stagger WEF Card */}
                        <div className="hidden lg:block h-[360px] w-full" />

                        {/* 4. WEF Card (Short/Medium) */}
                        {/* 4. Blog Card (Replaces WEF Card) */}
                        <Link href="/blog" className="block w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="group relative w-full h-[280px] overflow-hidden rounded-md border border-white/10 bg-[#002040]/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-cyan-300/30 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] cursor-pointer"
                            >
                                <div className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage: `repeating-radial-gradient( circle at 0 0, transparent 0, #002040 10px ), repeating-linear-gradient( #1e40af55, #1e40af55 )`
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 to-blue-900/30" />
                                <div className="absolute inset-0 bg-[url('/images/novaforma/hero-blog.png')] bg-cover bg-center opacity-40 mix-blend-screen group-hover:scale-105 transition-transform duration-700" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-200 uppercase mb-3 drop-shadow-md">INSIGHTS</p>
                                    <h3 className="text-2xl font-serif text-white group-hover:text-cyan-100 transition-colors duration-300">
                                        NovaForma Insights: Nieuws, Trends & Wetgeving
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>

                        {/* 5. Tech Resolutions (Tall) */}
                        {/* 5. What We Do Card (Replaces Tech Resolutions) */}
                        <Link href="/onze-diensten" className="block w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="group relative w-full min-h-[560px] overflow-hidden rounded-md border border-white/10 bg-[#1e1b4b]/40 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-purple-300/30 hover:shadow-[0_0_40px_rgba(147,51,234,0.15)] cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-[#3b0764]/60 via-[#1e1b4b]/40 to-transparent" />
                                <div className="absolute inset-0 bg-[url('/images/novaforma/hero-what-we-do.png')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700 mix-blend-screen" />

                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-purple-200 uppercase mb-3 drop-shadow-md">SOLUTIONS</p>
                                    <h3 className="text-2xl font-serif text-white group-hover:text-purple-100 transition-colors duration-300">
                                        Onze Diensten: Realisatie, Exploitatie & Digitale Portaal
                                    </h3>
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    {/* --- COLUMN 3 --- */}
                    <div className="flex flex-col gap-6 lg:w-[30%]">
                        {/* 6. Featured Case Study (Very Tall) - At Top */}
                        {/* 6. About Us Card (Replaces Case Study) - At Top */}
                        <Link href="/over-ons" className="block w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="group relative w-full min-h-[840px] overflow-hidden rounded-md border border-white/10 bg-blue-900/20 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-blue-400/40 hover:shadow-[0_0_60px_rgba(37,99,235,0.2)] cursor-pointer flex flex-col"
                            >
                                <div className="absolute inset-0 bg-[url('/images/novaforma/hero-about.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-slate-950/90" />
                                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />

                                <div className="relative z-20 p-10 h-full flex flex-col justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.2em] text-blue-200 uppercase mb-6 drop-shadow-md">OVER ONS</p>
                                        <h2 className="text-3xl lg:text-4xl font-serif text-white leading-tight drop-shadow-lg">
                                            Visies en waarden die morgen werken. <br />
                                            De toekomst van zorgexploitatie.
                                        </h2>
                                    </div>

                                    <div className="mt-8">
                                        <div className="bg-white/90 backdrop-blur-sm text-slate-900 px-8 py-4 font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] inline-flex items-center rounded-sm">
                                            Ontmoet ons team <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                        {/* 7. Contact CTA Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="group relative w-full overflow-hidden rounded-md border border-white/10 bg-[#1e293b]/90 backdrop-blur-xl p-8 transition-colors hover:bg-[#1e293b]"
                        >
                            <div className="relative z-20 flex flex-col h-full justify-center">
                                <h3 className="text-xl font-serif text-white mb-8 leading-snug">
                                    Heeft u vragen over zorgexploitatie? Neem direct contact op.
                                </h3>

                                <Link href="/contact" className="w-full group/btn bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                                    Neem Contact Op <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
