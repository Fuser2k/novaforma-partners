'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Clock, FileText, Users, Building, Activity, TrendingUp, ChevronDown, Download, Play, Award, BarChart3, Star, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const STEPS = [
    {
        number: 1,
        title: "Stap 1: Startscan, positionering & ZorgBlueprint",
        duration: "Week 1–2",
        icon: FileText,
        aim: "Binnen 10 werkdagen een volledig en gedragen ZorgBlueprint, waarin zowel de zorginhoud, exploitatie, organisatie als externe positionering van de zorginstelling zijn vastgelegd.",
        activities: [
            "Intake met ondernemer(s): ervaring, rolverdeling, beschikbaarheid en ambities",
            "Vaststellen scope: WLZ GGZ, WLZ VG of gecombineerd",
            "Afbakening doelgroep: zorgzwaarte, risicoprofiel, 24/7-zorg ja/nee",
            "Regiokeuze (zorgkantoorregio) en ketenanalyse (verwijzers, instroom, uitstroom)",
            "Exploitatiekader: capaciteit, formatie, nachtzorg, overhead, startbudget",
            "Integrale risicoanalyse: veiligheid, medicatie, agressie, crisisroutes",
            "Positionering & externe uitstraling: missie, visie en kernwaarden",
            "Opzet van website, verwijzingscommunicatie en profiel",
            "Afstemming van taal, uitstraling en inhoud op doelgroep"
        ],
        deliverables: [
            "Zorgpropositie en doelgroepkader",
            "Capaciteits- en groeiplan",
            "Integrale 6-maandenplanning met kritieke paden",
            "Financiële startopzet (capex, opex, break-even)",
            "Vastgestelde missie, visie en positionering",
            "Richtinggevende website- en communicatieopzet",
            "Randvoorwaarden voor resultaatgerichte oplevering"
        ],
        goNoGo: [
            "ZorgBlueprint akkoord",
            "Positionering vastgesteld",
            "Budget en mandaat geborgd"
        ],
        stats: { label: "Doorlooptijd", value: "10 Dagen" }
    },
    {
        number: 2,
        title: "Stap 2: Juridische structuur & governance",
        duration: "Week 2–6",
        icon: Building,
        aim: "Een juridisch en bestuurlijk correcte organisatie die voldoet aan eisen van toezicht, samenwerking en zorgproductie.",
        activities: [
            "Inrichting rechtsvorm en organisatiestructuur",
            "Vastleggen bestuur, directie en mandaten",
            "Governance-documenten: integriteit, besluitvorming, verantwoording",
            "Contractstrategie: startfase (onderaanneming/PGB) & groeifase (ZIN)",
            "Basisadministratie: contracten, leveranciers, HR-basis, verzekeringen"
        ],
        deliverables: [
            "Volledig toetredingsdossier",
            "Governance- en besluitregister",
            "Contracterings- en groeistrategie per regio"
        ],
        goNoGo: [
            "Juridische structuur compleet",
            "Rollen en verantwoordelijkheden vastgesteld",
            "Route naar zorgproductie bepaald"
        ],
        stats: { label: "Governance", value: "Compleet" }
    },
    {
        number: 3,
        title: "Stap 3: Kwaliteitssysteem & compliance",
        duration: "Week 4–10",
        icon: ShieldCheck,
        aim: "Een werkend en aantoonbaar kwaliteits- en veiligheidsmanagementsysteem dat dagelijks wordt toegepast.",
        activities: [
            "Ontwerp volledige cliëntreis: aanmelding tot uitstroom",
            "Opstellen beleidsset: incidenten, meldingen, verbetercyclus, privacy/AVG",
            "Inrichten klachten- en inspraakstructuur passend bij omvang",
            "Scholings- en bekwaamheidsmatrix (BHV, agressie, rapportage, medicatie)",
            "Opbouw toezichtbestendige documentatie en audittrail"
        ],
        deliverables: [
            "Praktisch kwaliteitshandboek",
            "Beleidsset en werkformats",
            "Auditkalender en managementreview-cyclus"
        ],
        goNoGo: [
            "Processen functioneren in praktijk",
            "Bewijsvoering volledig",
            "Organisatie audit-gereed"
        ],
        stats: { label: "Compliance", value: "100%" }
    },
    {
        number: 4,
        title: "Stap 4: Locatie, inrichting & gegarandeerde cliënteninstroom",
        duration: "Week 4–12",
        icon: Building,
        aim: "Een zorggeschikte locatie die operationeel opent met substantiële bezetting, waardoor de exploitatie direct levensvatbaar is.",
        activities: [
            "Opstellen locatieprofiel per doelgroep",
            "Selectie en contractering (huur/koop, gebruik, verbouwing)",
            "Inrichting woon- en werkruimtes conform zorg- en veiligheidsnormen",
            "Facilitaire en operationele open-checks",
            "Actieve inzet van het NovaForma Partners-netwerk voor cliëntenwerving",
            "Realisatie van circa 75% bezettingsgraad bij opening",
            "Matching van cliënten op doelgroep en draagkracht organisatie",
            "Opzetten duurzame instroomstructuur"
        ],
        deliverables: [
            "Locatiedossier en openingschecklist",
            "Inrichtings- en opleverplanning",
            "Operationele go-live checklist",
            "Actieve cliënteninstroom met substantiële bezetting",
            "Overgedragen netwerk en instroommethodiek"
        ],
        goNoGo: [
            "Locatie operationeel",
            "Opening gepland",
            "Bezetting richting 75% gerealiseerd"
        ],
        stats: { label: "Bezetting", value: "75%+" }
    },
    {
        number: 5,
        title: "Stap 5: Team, roosters & uitvoeringskracht",
        duration: "Week 6–14",
        icon: Users,
        aim: "Een stabiel, deskundig en inzetbaar team dat de zorg continu kan leveren.",
        activities: [
            "Formatieraming per cliëntgroep",
            "Werving via netwerk en samenwerkingspartners",
            "Inwerk- en scholingsprogramma",
            "Opstellen roosters, achterwacht en escalatiestructuur",
            "Borging overdracht en multidisciplinair overleg"
        ],
        deliverables: [
            "Functieprofielen en aannamecriteria",
            "Operationele roosters",
            "Inwerkprogramma en bekwaamverklaringen"
        ],
        goNoGo: [
            "Minimale bezetting ingevuld",
            "Team startklaar"
        ],
        stats: { label: "Team", value: "Startklaar" }
    },
    {
        number: 6,
        title: "Stap 6: Toezichtproof & operationeel volwassen",
        duration: "Week 10–18",
        icon: Activity,
        aim: "Een transparante, lerende en aantoonbaar ‘in-control’ organisatie.",
        activities: [
            "Inrichting medezeggenschap en inspraak",
            "Borging dossierkwaliteit en evaluatiecycli",
            "Uitvoering interne audits",
            "Externe communicatie en cliëntinformatie"
        ],
        deliverables: [
            "Volledig toezichtdossier",
            "Verbeterregister",
            "Interne auditrapportage"
        ],
        goNoGo: [
            "Organisatie aantoonbaar in control",
            "Klaar voor opschaling"
        ],
        stats: { label: "Toezicht", value: "Proof" }
    },
    {
        number: 7,
        title: "Stap 7: Exploitatie, groei & stabilisatie",
        duration: "Week 12–24",
        icon: TrendingUp,
        aim: "Een duurzame zorgexploitatie met gecontroleerde groei.",
        activities: [
            "Doorontwikkeling instroomkanalen",
            "Optimalisatie plaatsings- en zorgprocessen",
            "Opschalen personeel en organisatie",
            "Borging kwaliteit bij groei"
        ],
        deliverables: [
            "Instroom- en bezettingsdashboard",
            "Plaatsings- en intakeprotocollen",
            "Stabiele exploitatie met groeiplan"
        ],
        goNoGo: [
            "Zorginstelling draait stabiel",
            "Groei beheersbaar"
        ],
        stats: { label: "Groei", value: "Stabiel" }
    }
];

export function ModelClient({
    heroVideoUrl,
    heroImageUrl,
    title,
    subtitle
}: {
    heroVideoUrl?: string;
    heroImageUrl?: string;
    title?: string;
    subtitle?: string;
}) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="bg-background min-h-screen pb-0 font-sans text-foreground overflow-x-hidden">
            {/* Scroll Progress Bar (Top) - Optional, user requested Widget instead, but a top bar is nice too. keeping widget. */}

            {/* Hero Section */}
            <section className="bg-slate-900 pt-40 pb-32 relative overflow-hidden min-h-[90vh] flex items-center justify-center">
                {/* Media Background */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                    {heroVideoUrl ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 mix-blend-screen"
                        >
                            <source src={heroVideoUrl} type="video/mp4" />
                        </video>
                    ) : heroImageUrl ? (
                        <Image
                            src={heroImageUrl}
                            alt="Background"
                            fill
                            className="object-cover opacity-60 mix-blend-screen"
                        />
                    ) : (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 mix-blend-screen"
                        >
                            {/* High quality corporate abstract blue network video (Fallback) */}
                            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                        </video>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-slate-900/90" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-blue-900/30 border border-blue-800/50 text-blue-200 text-sm font-semibold mb-10 tracking-widest uppercase"
                        >
                            6-Maands Versneld Programma
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-8 text-white leading-tight">
                            Het 7-Stappen <br className="hidden md:block" />
                            <span className="italic text-blue-200">NovaForma Model</span>
                        </h1>

                        <p className="max-w-3xl mx-auto text-slate-300 text-xl font-light leading-relaxed mb-12">
                            Van idee tot realisatie, van inspectie tot exploitatie: <br className="hidden md:block" />
                            verlies geen tijd met ons end-to-end, <strong className="text-white font-medium">gegarandeerde oprichtingsproces</strong>.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <Link href="/contact" className="group w-full sm:w-auto px-10 py-4 bg-white text-[#0F172A] font-medium text-lg rounded hover:bg-blue-50 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                Demo / Advies Aanvragen <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-600" />
                            </Link>

                            <button onClick={() => document.getElementById('steps-timeline')?.scrollIntoView({ behavior: 'smooth' })} className="group w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/10 font-medium text-lg rounded hover:bg-white/10 transition-all duration-300 hover:border-white/30">
                                Bekijk de Stappen
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
                >
                    <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-slate-500 to-transparent" />
                </motion.div>
            </section>

            {/* Timeline Section */}
            <div id="steps-timeline" className="container mx-auto px-4 mt-24 mb-32 max-w-5xl relative">
                {/* Vertical Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-slate-200 to-transparent -translate-x-1/2 hidden md:block" />
                <motion.div
                    className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-blue-500 -translate-x-1/2 origin-top hidden md:block shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ scaleY: scrollYProgress, height: '100%' }}
                />

                <div className="space-y-24 md:space-y-32">
                    {STEPS.map((step, idx) => (
                        <StepCard key={idx} step={step} index={idx} isActive={activeStep === idx} onActive={() => setActiveStep(idx)} id={`step-card-${idx}`} />
                    ))}
                </div>
            </div>

            {/* Certification Section */}
            <section className="bg-slate-50 py-16 mb-24 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-700 mb-6">
                        <Award className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">
                        Certificering binnen het Model
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                        <strong>NovaForma Partners B.V.</strong> richt organisaties certificeringsgereed in:
                        aantoonbare kwaliteit en compliance binnen 6 maanden en begeleiding richting externe toetsing indien vereist.
                    </p>
                    <div className="inline-block bg-white border-2 border-green-500/20 px-8 py-4 rounded-xl shadow-lg shadow-green-500/10">
                        <span className="text-green-700 font-bold flex items-center gap-2">
                            <Check className="w-5 h-5" /> De organisatie wordt volledig audit-ready opgeleverd.
                        </span>
                    </div>
                </div>
            </section>

            {/* Impact Section - Redesigned for Portrait Image */}
            <section className="py-24 bg-white border-y border-slate-200">
                <div className="container mx-auto px-4 max-w-[1600px]">
                    <div className="flex flex-col lg:flex-row gap-0 border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden rounded-lg">

                        {/* LEFT COLUMN: Content Blocks (60% width) */}
                        <div className="w-full lg:w-3/5 flex flex-col">

                            {/* Block 1: Academy (Top - Full Width of Col) */}
                            <div className="flex-1 bg-[#BFDBFE] p-10 md:p-16 flex flex-col justify-center text-left relative overflow-hidden text-[#0F172A] border-b border-slate-200">
                                <span className="text-xs font-bold tracking-widest uppercase text-blue-900 mb-6">ACADEMIE</span>
                                <h3 className="text-4xl md:text-6xl font-serif font-medium mb-8 leading-tight max-w-2xl">
                                    Zorgondernemerschap: <br />
                                    <span className="text-blue-700">Visie 2026</span>
                                </h3>
                                <p className="text-blue-900/80 text-lg mb-8 max-w-xl leading-relaxed">
                                    Een uitgebreid opleidings- en mentorprogramma om de zorgleiders van de toekomst op te leiden.
                                </p>
                                <div>
                                    <Link href="/contact" className="px-8 py-4 bg-white text-[#0F172A] font-bold text-base inline-flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-sm rounded-sm">
                                        Meld u aan <ArrowRight className="w-5 h-5 ml-1" />
                                    </Link>
                                </div>
                                {/* Decorative circle */}
                                <div className="absolute -right-20 -top-20 w-96 h-96 border-[60px] border-white/40 rounded-full blur-xl opacity-60 pointer-events-none" />
                            </div>

                            {/* Bottom Row (Split 50/50) */}
                            <div className="flex-[1] flex flex-col md:flex-row border-b lg:border-b-0">

                                {/* Block 2: Expert Opinion */}
                                <div className="w-full md:w-1/2 bg-[#003366] p-10 md:p-12 flex flex-col justify-center text-left relative overflow-hidden border-r border-slate-200/10">
                                    <span className="text-xs font-bold tracking-widest uppercase text-blue-300 mb-4">EXPERT VISIE</span>
                                    <h3 className="text-3xl font-serif font-medium text-white mb-4 leading-normal">
                                        Strategische <br /> Dialogen
                                    </h3>
                                    <p className="text-blue-100/70 text-sm leading-relaxed mb-8 font-light">
                                        Ontmoet onze experts die wetgeving omzetten in businessmodellen.
                                    </p>
                                    <Link href="/contact" className="text-white border-b border-blue-400/30 pb-1 inline-flex items-center gap-2 hover:text-blue-300 transition-colors text-sm font-medium w-max">
                                        Nu Luisteren <Play className="w-3 h-3 fill-current" />
                                    </Link>
                                </div>

                                {/* Block 3: Efficiency */}
                                <div className="w-full md:w-1/2 bg-[#EBF4FA] p-10 md:p-12 flex flex-col justify-center relative overflow-hidden group">
                                    <Activity className="absolute top-8 right-8 w-20 h-20 text-blue-200/50 group-hover:scale-110 transition-transform duration-700" />
                                    <h3 className="text-3xl font-serif font-medium text-[#002244] mb-4">60% Sneller</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 pr-8">
                                        Vergunningverlening in weken in plaats van maanden vergeleken met traditionele processen.
                                    </p>
                                    <div className="text-[#004488] font-bold text-xs tracking-widest uppercase flex items-center gap-2 mt-auto">
                                        <Clock className="w-4 h-4" /> Tijdsbesparing
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* RIGHT COLUMN: Portrait Image (40% width) */}
                        {/* RIGHT COLUMN: Portrait Image & Blog CTA (40% width) */}
                        <div className="w-full lg:w-2/5 flex flex-col relative group overflow-hidden min-h-[500px] lg:min-h-0">
                            {/* Full Height Image Background */}
                            <Image
                                src="/images/novaforma/6-step-model.jpg"
                                alt="NovaForma 7-Stappen Model"
                                fill
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 origin-top"
                                sizes="(max-width: 768px) 100vw, 40vw"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />

                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/40 to-transparent" />

                            {/* Content Overlay - Positioned at Bottom */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
                                <div className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 drop-shadow-md">KENNISCENTRUM</div>
                                <h3 className="text-3xl font-serif font-medium text-white mb-3 drop-shadow-md">
                                    Ontdek Meer
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm drop-shadow-sm font-light">
                                    Bezoek onze blog voor actuele ontwikkelingen in de zorgsector, installatiegidsen en wetgevingsdetails.
                                </p>
                                <Link href="/blog" className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-blue-400 transition-colors group">
                                    Bezoek de Blog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Final CTA - Dark minimalist theme */}
            <section className="mt-0 py-32 bg-[#0a1628] text-center border-t border-slate-800">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8 leading-tight tracking-tight">
                        U hoeft uw zorgonderneming niet <br className="hidden md:block" />
                        alleen op te zetten.
                    </h2>

                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                        Maak kennis met ons expertteam, bespreek uw doelen en laten we samen de beste routekaart bepalen.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="group w-full sm:w-auto px-10 py-4 bg-white text-[#0F172A] font-medium text-lg rounded hover:bg-blue-50 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            Startscan Aanvragen <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-600" />
                        </Link>
                        <Link href="/contact" className="group w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/10 font-medium text-lg rounded hover:bg-white/10 transition-all duration-300 hover:border-white/30 text-center">
                            Kennismakingsgesprek
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sticky Progress Widget */}
            <StickyProgress totalSteps={STEPS.length} currentStep={activeStep + 1} />
        </div>
    );
}

function StepCard({ step, index, isActive, onActive, id }: { step: any, index: number, isActive: boolean, onActive: () => void, id?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isInView) onActive();
    }, [isInView, onActive]);

    return (
        <motion.div
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Center Number Bubble */}
            <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-slate-50 bg-white text-slate-900 font-bold flex items-center justify-center shadow-xl z-20 group">
                <span className={`text-xl transition-colors duration-300 ${isActive ? 'text-primary' : 'text-slate-400'}`}>{step.number}</span>
                {isActive && <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75" />}
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right text-left md:items-end' : 'md:text-left text-left items-start'}`}>
                <motion.div
                    className={`bg-white p-8 md:p-10 rounded-[2rem] border transition-all duration-500 relative cursor-default overflow-hidden
                        ${isActive
                            ? 'shadow-2xl shadow-blue-900/10 border-primary/20 scale-100 ring-4 ring-blue-50/50'
                            : 'shadow-sm border-slate-100 hover:shadow-xl'}`}
                    animate={{
                        y: isActive ? -5 : 0
                    }}
                >
                    {/* Gradient Top Border */}
                    {isActive && <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 animate-gradient-xy" />}

                    <div className={`flex items-center gap-4 mb-6 pl-12 md:pl-0 ${index % 2 === 0 && 'md:flex-row-reverse'}`}>
                        <span className={`p-3 rounded-2xl ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-blue-50 text-slate-500'} transition-all duration-300`}>
                            <step.icon className="w-6 h-6" />
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider border border-slate-200">
                            {step.duration}
                        </span>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 mb-4 font-serif">{step.title}</h3>
                    <p className="text-slate-600 mb-8 italic border-l-4 md:border-l-0 md:border-r-4 (index%2==0) border-primary/20 pl-4 md:pl-0 md:pr-4 text-lg leading-relaxed">
                        {step.aim}
                    </p>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 pb-2 border-t border-slate-100 space-y-4 text-left">
                                    <div className="grid gap-3">
                                        <h5 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-primary" /> Kernactiviteiten
                                        </h5>
                                        <ul className="space-y-3 mb-4">
                                            {step.activities.map((d: string, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <h5 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                                            <Award className="w-4 h-4 text-orange-500" /> Oplevering
                                        </h5>
                                        <ul className="space-y-2 mb-6">
                                            {step.deliverables.map((d: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                                    <span>{d}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {step.goNoGo && (
                                            <>
                                                <h5 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
                                                    <TrendingUp className="w-4 h-4 text-blue-600" /> Go / No-Go
                                                </h5>
                                                <ul className="space-y-2">
                                                    {step.goNoGo.map((d: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 font-medium bg-blue-50/50 p-2 rounded">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                                            <span>{d}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mt-6 w-full py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-primary transition-all flex items-center justify-center gap-2 group"
                    >
                        {isOpen ? 'Details Verbergen' : 'Details Bekijken'}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                </motion.div>
            </div>

            {/* Context Data for Empty Side */}
            <div className="hidden md:flex w-[calc(50%-2rem)] items-center justify-center opacity-100 select-none pointer-events-none">
                {step.stats && (
                    <div className={`text-center transition-all duration-700 ${isActive ? 'scale-110 opacity-100 blur-0' : 'scale-90 opacity-30 blur-sm'}`}>
                        <div className="text-8xl font-black text-white/10 tracking-tighter leading-none">
                            {step.stats.value}
                        </div>
                        <div className="text-xl font-bold text-blue-200/40 uppercase tracking-[0.3em] mt-4">
                            {step.stats.label}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function MetricCard({ icon: Icon, value, label }: { icon: any, value: string, label: string }) {
    return (
        <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary shadow-inner">
                <Icon className="w-8 h-8" />
            </div>
            <div className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{value}</div>
            <div className="text-base text-slate-500 font-medium uppercase tracking-wide">{label}</div>
        </div>
    );
}

function StickyProgress({ totalSteps, currentStep }: { totalSteps: number, currentStep: number }) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-10 right-10 z-40 bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100 hidden lg:block w-80 ring-1 ring-slate-900/5 backdrop-blur-xl bg-white/95"
        >
            <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Voortgang</span>
                <span className="text-2xl font-black text-slate-900">{currentStep}<span className="text-slate-300 text-lg">/{totalSteps}</span></span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-4 shadow-inner">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg shadow-blue-500/30"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, type: "spring" }}
                />
            </div>
            <p className="text-sm text-slate-600 font-bold leading-snug line-clamp-2">
                {STEPS[currentStep - 1]?.title}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-primary font-bold cursor-pointer hover:text-blue-700 transition-colors"
                onClick={() => {
                    if (currentStep < totalSteps) {
                        document.getElementById(`step-card-${currentStep}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }}
            >
                Ga Verder <ArrowRight className="w-3 h-3" />
            </div>
        </motion.div>
    );
}
