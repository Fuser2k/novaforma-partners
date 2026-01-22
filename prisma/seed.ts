import { prisma } from '../src/lib/db';

async function seed() {
    console.log('🌱 Seeding database with initial data...\n');

    try {
        // Seed Steps (7-stappen model)
        console.log('📍 Creating steps...');
        const steps = [
            {
                number: 1,
                order: 1,
                title: 'Startscan & Bakim Blueprinti',
                summary: 'Kurumunuzun temel yapi taslarini ve stratejik planini olusturuyoruz.',
                description: 'Detaylı kurum analizi ve stratejik planlama süreci.'
            },
            {
                number: 2,
                order: 2,
                title: 'Hukuki Yapı & Yönetişim',
                summary: 'Mevzuata uygun tüzel kişilik ve yönetim yapısının kurulması.',
                description: 'Yasal gereksinimlerin karşılanması ve yönetim yapısının oluşturulması.'
            },
            {
                number: 3,
                order: 3,
                title: 'Kalite Sistemi & Uyum',
                summary: 'WLZ standartlarına tam uyumlu kalite yönetim sisteminin inşası.',
                description: 'Kalite yönetim sisteminin kurulması ve belgelendirme.'
            },
            {
                number: 4,
                order: 4,
                title: 'Lokasyon & Danışan Akışı',
                summary: 'Uygun gayrimenkul seçimi ve sürdürülebilir danışan kabul süreçleri.',
                description: 'Lokasyon seçimi ve hasta kabul süreçlerinin oluşturulması.'
            },
            {
                number: 5,
                order: 5,
                title: 'Ekip & Operasyon',
                summary: 'Yetkin bakım ekibinin kurulması ve operasyonel süreçlerin başlaması.',
                description: 'Ekip oluşturma ve operasyonel süreçlerin başlatılması.'
            },
            {
                number: 6,
                order: 6,
                title: 'Denetime Hazırlık',
                summary: 'IGJ ve diğer denetimler için simülasyonlar ve hazırlık.',
                description: 'Denetim süreçlerine hazırlık ve simülasyonlar.'
            },
            {
                number: 7,
                order: 7,
                title: 'İşletme, Büyüme & İstikrar',
                summary: 'Açılış sonrası finansal sürdürülebilirlik ve büyüme stratejileri.',
                description: 'Sürdürülebilir büyüme ve finansal istikrar stratejileri.'
            },
        ];

        for (const step of steps) {
            await prisma.step.upsert({
                where: { number: step.number },
                update: step,
                create: step,
            });
        }
        console.log(`✅ Created ${steps.length} steps`);

        // Seed Audiences
        console.log('\n👥 Creating audiences...');
        const audiences = [
            {
                title: 'Yeni Sağlık Girişimcileri',
                description: 'Sektöre yeni adım atacak girişimciler için uçtan uca rehberlik.',
                benefits: ['Sıfırdan kurulum desteği', 'Mevzuat karmaşasından kurtulun', 'Hızlı pazar girişi'],
                order: 1,
            },
            {
                title: 'Mevcut Kurumlar',
                description: 'Hali hazırda hizmet veren ve büyümek isteyen kurumlar.',
                benefits: ['Operasyonel verimlilik', 'Kalite sistemi revizyonu', 'Kapasite artışı'],
                order: 2,
            },
            {
                title: 'Yatırımcılar',
                description: 'Sağlık sektörüne yatırım yapmak isteyen sermaye sahipleri.',
                benefits: ['Yüksek ROI potansiyeli', 'Risk analizi', 'Gayrimenkul değerlendirmesi'],
                order: 3,
            },
            {
                title: 'Yöneticiler & Profesyoneller',
                description: 'Kendi kurumunu açmak isteyen deneyimli sağlık profesyonelleri.',
                benefits: ['Kariyerden iş sahipliğine geçiş', 'Profesyonel ağ erişimi', 'Mentorluk'],
                order: 4,
            },
        ];

        // Delete existing audiences first
        await prisma.audience.deleteMany({});

        for (const audience of audiences) {
            await prisma.audience.create({
                data: {
                    ...audience,
                    benefits: JSON.stringify(audience.benefits), // Convert array to JSON string for SQLite
                },
            });
        }
        console.log(`✅ Created ${audiences.length} audiences`);

        // Seed Services
        console.log('\n💼 Creating services...');
        const services = [
            {
                title: 'Stratejik Danışmanlık',
                description: 'Sağlık kurumunuzun stratejik planlaması ve gelişimi için kapsamlı danışmanlık hizmetleri.',
                icon: 'strategy',
                order: 1,
            },
            {
                title: 'Mevzuat Uyumu',
                description: 'WLZ, GGZ ve VG sektörlerinde tam mevzuat uyumu ve belgelendirme desteği.',
                icon: 'legal',
                order: 2,
            },
            {
                title: 'Kalite Yönetimi',
                description: 'Uluslararası standartlara uygun kalite yönetim sistemlerinin kurulması.',
                icon: 'quality',
                order: 3,
            },
            {
                title: 'Operasyonel Destek',
                description: 'Günlük operasyonların optimizasyonu ve verimliliğin artırılması.',
                icon: 'operations',
                order: 4,
            },
        ];

        // Delete existing services first
        await prisma.service.deleteMany({});

        for (const service of services) {
            await prisma.service.create({
                data: service,
            });
        }
        console.log(`✅ Created ${services.length} services`);

        // Seed Landing Page (7-stappen-model)
        console.log('\n🎯 Creating landing pages...');
        await prisma.landingPage.upsert({
            where: { slug: '7-stappen-model' },
            update: {
                title: 'Het 7-Stappen NovaForma Model',
                subtitle: 'Van idee tot realisatie, van inspectie tot exploitatie',
                heroVideoUrl: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
                isActive: true,
            },
            create: {
                slug: '7-stappen-model',
                title: 'Het 7-Stappen NovaForma Model',
                subtitle: 'Van idee tot realisatie, van inspectie tot exploitatie',
                heroVideoUrl: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
                isActive: true,
            },
        });
        console.log('✅ Created landing page');

        // Seed Legal Pages (Cookie Policy, etc.)
        console.log('\n📜 Creating legal pages...');
        const legalPages = [
            {
                title: 'Cookiebeleid',
                slug: 'cookiebeleid',
                content: JSON.stringify({
                    type: 'doc',
                    content: [
                        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Cookiebeleid' }] },
                        { type: 'paragraph', content: [{ type: 'text', text: 'Op deze pagina leggen we uit hoe wij cookies gebruiken om uw ervaring te verbeteren.' }] }
                    ]
                }),
            },
            {
                title: 'Privacyverklaring',
                slug: 'privacyverklaring', // Keep consistency
                content: JSON.stringify({
                    type: 'doc',
                    content: [
                        { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Privacyverklaring' }] },
                        { type: 'paragraph', content: [{ type: 'text', text: 'Uw privacy is belangrijk voor ons.' }] }
                    ]
                }),
            }
        ];

        for (const page of legalPages) {
            await prisma.legalPage.upsert({
                where: { slug: page.slug },
                update: {}, // Don't overwrite existing content if the user edited it
                create: page,
            });
        }
        console.log(`✅ Processed ${legalPages.length} legal pages`);

        console.log('\n✨ Seed complete!\n');
        console.log('📊 Summary:');
        console.log(`   ✅ Steps: ${steps.length}`);
        console.log(`   ✅ Audiences: ${audiences.length}`);
        console.log(`   ✅ Services: ${services.length}`);
        console.log(`   ✅ Landing Pages: 1`);

    } catch (error) {
        console.error('❌ Seed failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run seed
seed()
    .then(() => {
        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    });
