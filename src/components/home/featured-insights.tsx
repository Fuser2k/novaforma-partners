'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mic, Play, Youtube } from 'lucide-react';
import Link from 'next/link';

export function FeaturedInsights() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Centered Top Headline */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif text-slate-900 leading-tight">
                        Volg de laatste inzichten <br /> en sectorontwikkelingen.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
                    {/* Left Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full aspect-[4/3] rounded-sm overflow-hidden shadow-xl"
                    >
                        {/* Fallback pattern or use the uploaded image which is now saved as insights.png */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                            style={{
                                backgroundImage: "url('/images/novaforma/insights.png')",
                                backgroundSize: '135%',
                                backgroundPosition: 'center'
                            }}
                        />
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-start text-left"
                    >
                        <h3 className="text-3xl font-serif text-[#1e3a8a] mb-6">
                            NovaForma Kenniscentrum
                        </h3>

                        <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-lg">
                            Krijg toegang tot onze analyses over wetswijzigingen, kwaliteitsnormen (WLZ, WMO, ISO 9001) en zorgondernemerschap.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/blog" className="px-8 py-4 bg-slate-900 text-white font-medium text-sm tracking-wide hover:bg-slate-800 transition-colors rounded-sm">
                                Lees onze artikelen
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
