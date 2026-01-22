'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Cta() {
    return (
        <section className="relative py-24 overflow-hidden bg-slate-900">
            {/* Background Gradients */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="mx-auto max-w-3xl text-3xl font-serif font-medium tracking-tight text-white sm:text-5xl mb-6">
                        U staat er niet alleen voor met uw zorgonderneming.
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-10">
                        Maak kennis met ons expertteam, bespreek uw doelen en laten we samen de beste route voor uw succes bepalen.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto rounded-md bg-blue-600 px-10 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-500 transition-all hover:shadow-blue-600/25"
                        >
                            Plan een Kennismakingsgesprek
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
