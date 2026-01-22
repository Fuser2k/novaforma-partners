'use client';

import { Activity, ShieldCheck, TrendingUp, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
    {
        title: 'Centraal Procesbeheer',
        desc: 'Voorkom tijd- en middelenverlies met een gecentraliseerd installatieproces. Wij beheren alle stakeholders (gemeente, architect, jurist).',
        icon: Activity
    },
    {
        title: 'Kwaliteit Conform Wetgeving',
        desc: 'Een transparant en traceerbaar kwaliteitsmanagementsysteem dat 100% voldoet aan IGJ- en zorgkantoor-normen, zonder angst voor inspecties.',
        icon: ShieldCheck
    },
    {
        title: 'Sterke Cliëntinstroom',
        desc: 'Wij bouwen niet alleen het pand, maar ook de business. Strategieën die financiële risico\'s minimaliseren met als doel 75% bezetting bij opening.',
        icon: TrendingUp
    },
    {
        title: 'Ondernemersvrijheid',
        desc: 'Geen franchise. Het eigendom, de vergunning en de toekomst van de instelling zijn volledig van u. Wij zijn slechts de versneller die u naar uw doel brengt.',
        icon: UserCheck
    },
];

export function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Waarom NovaForma?</span>
                    <h2 className="mt-2 text-3xl font-serif font-medium tracking-tight text-slate-900 sm:text-4xl">
                        Niet Alleen Advies, Maar Een <span className="text-primary">Strategisch Partnerschap</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-6"
                        >
                            <div className="shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mx-auto max-w-3xl">
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-6 text-center shadow-sm">
                        <p className="text-slate-700 font-medium text-sm sm:text-base">
                            Disclaimer: <span className="font-semibold text-slate-900">“NovaForma is geen zorgaanbieder; wij coördineren het oprichtings- en implementatieproces.”</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
