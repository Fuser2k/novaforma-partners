'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function CareersPreview() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Label */}
                <div className="text-center mb-12">
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">CARRIÈRES</span>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-4xl sm:text-5xl font-serif text-blue-600 mb-6 leading-tight">
                            Op zoek naar uw volgende uitdaging?
                        </h2>
                        <p className="text-lg text-slate-700 font-light leading-relaxed mb-8 max-w-lg">
                            Wij zoeken mensen die energie krijgen van dezelfde waarden als onze cliënten: gedurfd denken, echte impact en de moed om voorop te lopen.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors rounded-sm"
                        >
                            Neem Contact Op
                        </Link>
                    </motion.div>

                    {/* Right Content (Image + Decorative Element) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-1/2 relative"
                    >
                        {/* Decorative Blue Square */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600 z-0 hidden lg:block" />

                        {/* Image Container */}
                        <div className="relative z-10 aspect-video w-full bg-slate-100 overflow-hidden shadow-lg group cursor-pointer">
                            <Image
                                src="/images/novaforma/health-tourism-cover.png"
                                alt="Gezondheidstoerisme NovaForma"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                            {/* Play Button Removed */}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
