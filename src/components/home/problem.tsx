'use client';

import { AlertTriangle, FileText, Landmark, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const PROBLEMS = [
    {
        icon: FileText,
        title: 'Karmaşık Mevzuat',
        desc: 'Hollanda sağlık sistemi düzenlemeleri ve sürekli değişen bürokratik prosedürler arasında kaybolmadan ilerlemek.'
    },
    {
        icon: AlertTriangle,
        title: 'Kaliteyi Kanıtlama',
        desc: 'IGJ standartlarını karşılayan ve denetimlerden başarıyla geçen bir kalite yönetim sistemini sıfırdan kurmak.'
    },
    {
        icon: Landmark,
        title: 'Lokasyon ve Hazırlık',
        desc: 'Yönetmeliklere uygun gayrimenkulü bulmak, tadilat ve ruhsatlandırma süreçlerini zamanında tamamlamak.'
    },
    {
        icon: Users,
        title: 'Danışan Akışı',
        desc: 'Kurum açıldığında boş odalarla beklemek yerine, ilk günden itibaren doluluk ve finansal akış sağlamak.'
    },
];

export function Problem() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-primary font-semibold text-sm uppercase tracking-wider">Meydan Okumalar</span>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Sağlık Girişimciliğinin Zorlukları
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Bir WLZ bakım kuruluşu açmak, sadece iyi bir niyetten fazlasını gerektirir. Yola çıkarken karşılaşacağınız temel engelleri analiz ettik.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROBLEMS.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white text-primary shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
