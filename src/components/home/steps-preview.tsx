'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
    { num: '01', title: 'Startscan & ZorgBlueprint', desc: 'Zorgvisie en strategische roadmap.' },
    { num: '02', title: 'Juridische Structuur & Governance', desc: 'Rechtsvorm conform wet- en regelgeving.' },
    { num: '03', title: 'Kwaliteitssysteem & Compliance', desc: 'Volledige integratie met WLZ-normen.' },
    { num: '04', title: 'Locatie & Cliënteninstroom', desc: 'De juiste locatie en duurzame bezetting.' },
    { num: '05', title: 'Team & Operatie', desc: 'Bekwaam team en dagelijkse bedrijfsvoering.' },
    { num: '06', title: 'Voorbereiding op Toezicht', desc: 'IGJ en zorgkantoor auditsimulaties.' },
    { num: '07', title: 'Exploitatie & Groei', desc: 'Duurzame exploitatie en gecontroleerde groei.' },
];

export function StepsPreview() {
    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-indigo-500 blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Onze Methodologie</span>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-white">
                            Het 7-Stappen NovaForma Model
                        </h2>
                        <p className="mt-4 text-slate-400 text-lg">
                            Ons bewezen proces dat risico's minimaliseert en succes systematiseert op weg van idee naar realisatie.
                        </p>
                    </div>
                    <Link
                        href="/7-stappen-model"
                        className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Bekijk Alle Stappen in Detail <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative p-6 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 group`}
                        >
                            <div className="text-4xl font-bold text-slate-700 mb-4 group-hover:text-blue-500/20 transition-colors">
                                {step.num}
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
