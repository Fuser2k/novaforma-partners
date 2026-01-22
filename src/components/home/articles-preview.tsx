'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ArticlesPreview() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Minimal Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 leading-tight"
                    >
                        Volg de laatste inzichten en <br className="hidden sm:block" />
                        sectorontwikkelingen.
                    </motion.h2>
                </div>

                {/* Content Layout - Matches the 'App Download' section vibe but for Articles */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Featured Visual / Cover */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="aspect-[4/3] relative w-full overflow-hidden bg-slate-100 shadow-xl rounded-sm">
                            <Image
                                src="/images/novaforma/hero.png"
                                alt="NovaForma Kenniscentrum"
                                fill
                                className="object-cover object-left"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Text & Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:w-1/2"
                    >
                        <h3 className="text-2xl font-serif text-slate-900 mb-6">
                            NovaForma Kenniscentrum
                        </h3>
                        <p className="text-lg text-slate-600 font-light mb-8 leading-relaxed">
                            Krijg toegang tot onze analyses over wetswijzigingen, kwaliteitsnormen (WLZ, ISO 9001) en zorgondernemerschap.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/blog" className="inline-flex items-center justify-center px-6 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-sm text-sm font-semibold">
                                Lees Artikelen
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
