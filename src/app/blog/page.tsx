import { Metadata } from 'next';
import { getArticles } from '@/lib/strapi';
import { BlogClient } from './blog-client';

export const metadata: Metadata = {
    title: 'Blog & İçgörüler | NovaForma',
    description: 'Hollanda sağlık sektörü, WLZ bakım süreçleri ve stratejik yönetim hakkında güncel makaleler.',
};

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <div className="bg-white min-h-screen pb-24 font-sans text-slate-900">
            {/* Minimalist Header with Video Background */}
            <div className="relative pt-48 pb-32 md:min-h-[85vh] flex items-end mb-16 overflow-hidden bg-slate-900">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten"
                >
                    <source src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4" type="video/mp4" />
                </video>
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent"></div>

                {/* Smooth Bottom Fade to White */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>

                <div className="container mx-auto px-4 max-w-[1600px] relative z-20 text-white pb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <span className="text-xs font-bold tracking-widest uppercase text-blue-300 mb-2 block">Kenniscentrum & Inzichten</span>
                            <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-tight">
                                Nieuw op <br />
                                <span className="italic">NovaForma Blog</span>
                            </h1>
                        </div>
                        <p className="text-slate-200 max-w-lg text-sm leading-relaxed mb-2 font-light drop-shadow-md bg-slate-900/30 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                            NovaForma Partners B.V. is een onafhankelijke ontwikkel- en implementatiepartner die nieuwe zorgondernemers begeleidt bij het realiseren van een volwaardige WLZ-zorginstelling in de GGZ en/of VG sector.
                        </p>
                    </div>
                </div>

                {/* Animated Scroll Indicator - Darker for visibility on white fade */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-900 font-bold animate-pulse">Scrol Omlaag</span>
                    <div className="w-5 h-8 border-2 border-slate-900/80 rounded-full flex justify-center p-1">
                        <div className="w-1 h-1.5 bg-slate-900 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Client Grid */}
            <BlogClient articles={articles} />
        </div>
    );
}
