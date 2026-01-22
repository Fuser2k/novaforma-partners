'use client';

import { motion } from 'framer-motion';
import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { GlobalSettings } from '@/lib/strapi';

export function ContactClient({ contact }: { contact?: GlobalSettings['contact'] }) {
    return (
        <div className="bg-[#0F172A] min-h-screen font-sans text-white overflow-hidden">

            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #3b82f6 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4">
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-900/30 border border-blue-800/50 text-blue-300 text-xs font-bold tracking-[0.2em] mb-8 uppercase">
                            Neem Contact Op
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 leading-tight">
                            Contact & <span className="italic text-blue-400">Aanmelden</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
                            Zet de eerste stap naar het realiseren van uw eigen zorginstelling met professionele ondersteuning.
                        </p>
                    </motion.div>
                </div>
                {/* Decorative Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-900/10 blur-[130px] -z-10 rounded-full" />
            </section>

            <div className="container mx-auto px-4 pb-24 relative z-10">
                <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">

                    {/* Contact Info Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2 space-y-6 pt-0 lg:pt-12"
                    >
                        <div className="bg-[#1E293B]/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 shadow-xl hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif font-medium text-white mb-2">Hoofdkantoor</h4>
                                    <p className="text-slate-400 leading-relaxed font-light">
                                        {contact?.address || "Keizersgracht 123, 1015 CJ Amsterdam, Nederland"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1E293B]/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 shadow-xl hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif font-medium text-white mb-2">Telefoon</h4>
                                    <p className="text-slate-400 font-light mb-1">{contact?.phone || "+31 (0) 20 123 4567"}</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Ma-Vr 09:00 - 18:00
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1E293B]/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 shadow-xl hover:border-blue-500/30 transition-colors group">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif font-medium text-white mb-2">E-mail</h4>
                                    <p className="text-slate-400 font-light">{contact?.email || "info@novaforma.nl"}</p>
                                    <a href={`mailto:${contact?.email || "info@novaforma.nl"}`} className="text-xs text-blue-400 uppercase tracking-wider mt-2 flex items-center gap-1 hover:text-blue-300 transition-colors">
                                        Stuur ons een bericht <ArrowRight className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-3"
                    >
                        <ContactForm />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
