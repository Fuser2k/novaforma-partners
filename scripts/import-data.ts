import { prisma } from '../src/lib/db';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface StrapiExportData {
    articles: any[];
    globalSettings: any[];
    legalPages: any[];
    messages: any[];
    exportedAt: string;
}

async function importData() {
    console.log('📥 Starting data import to PostgreSQL...\n');

    try {
        // Load exported data
        const exportPath = join(process.cwd(), 'data', 'exports', 'latest.json');
        console.log('📂 Loading data from:', exportPath);

        const fileContent = await readFile(exportPath, 'utf-8');
        const data: StrapiExportData = JSON.parse(fileContent);

        console.log('✅ Data loaded successfully');
        console.log(`   Exported at: ${data.exportedAt}\n`);

        let imported = {
            articles: 0,
            images: 0,
            settings: 0,
            legalPages: 0,
            messages: 0,
        };

        // Import Global Settings
        console.log('⚙️  Importing global settings...');
        if (data.globalSettings.length > 0) {
            const settings = data.globalSettings[0];
            const attrs = settings.attributes || settings;

            // Delete existing settings
            await prisma.globalSettings.deleteMany({});

            await prisma.globalSettings.create({
                data: {
                    facebookUrl: attrs.facebookUrl || '',
                    instagramUrl: attrs.instagramUrl || '',
                    twitterUrl: attrs.twitterUrl || '',
                    linkedinUrl: attrs.linkedinUrl || '',
                    phone: attrs.phone || '',
                    email: attrs.email || '',
                    address: attrs.address || '',
                },
            });
            imported.settings = 1;
            console.log('✅ Imported global settings');
        }

        // Import Articles
        console.log('\n📝 Importing articles...');
        for (const article of data.articles) {
            const attrs = article.attributes || article;

            try {
                const created = await prisma.article.create({
                    data: {
                        title: attrs.title || 'Untitled',
                        summary: attrs.summary || '',
                        category: attrs.category || 'Uncategorized',
                        slug: attrs.slug || `article-${article.id}`,
                        content: attrs.content || {},
                        seoTitle: attrs.seoTitle,
                        seoDescription: attrs.seoDescription,
                        keywords: attrs.keywords,
                        isFeatured: attrs.isFeatured || false,
                        isDraft: false, // Published articles from Strapi
                        publishDate: attrs.publishDate ? new Date(attrs.publishDate) : null,
                        publishedAt: attrs.publishedAt ? new Date(attrs.publishedAt) : new Date(),
                    },
                });

                // Import images if they exist
                if (attrs.image?.data) {
                    const images = Array.isArray(attrs.image.data) ? attrs.image.data : [attrs.image.data];

                    for (let i = 0; i < images.length; i++) {
                        const img = images[i];
                        const imgAttrs = img.attributes || img;

                        await prisma.articleImage.create({
                            data: {
                                articleId: created.id,
                                url: imgAttrs.url || '',
                                alt: imgAttrs.alternativeText || attrs.title,
                                caption: imgAttrs.caption,
                                order: i,
                            },
                        });
                        imported.images++;
                    }
                }

                imported.articles++;
            } catch (error: any) {
                console.error(`   ❌ Failed to import article "${attrs.title}":`, error.message);
            }
        }
        console.log(`✅ Imported ${imported.articles} articles with ${imported.images} images`);

        // Import Legal Pages
        console.log('\n📄 Importing legal pages...');
        for (const page of data.legalPages) {
            const attrs = page.attributes || page;

            try {
                await prisma.legalPage.create({
                    data: {
                        title: attrs.title || 'Untitled',
                        slug: attrs.slug || `page-${page.id}`,
                        content: attrs.content || {},
                    },
                });
                imported.legalPages++;
            } catch (error: any) {
                console.error(`   ❌ Failed to import legal page "${attrs.title}":`, error.message);
            }
        }
        console.log(`✅ Imported ${imported.legalPages} legal pages`);

        // Import Messages
        console.log('\n✉️  Importing messages...');
        for (const message of data.messages) {
            const attrs = message.attributes || message;

            try {
                await prisma.message.create({
                    data: {
                        name: attrs.name || 'Unknown',
                        email: attrs.email || 'unknown@example.com',
                        phone: attrs.phone || '',
                        sector: attrs.sector || 'Andere',
                        region: attrs.region,
                        message: attrs.message || '',
                        termsAccepted: attrs.termsAccepted || false,
                        isRead: false,
                        isArchived: false,
                    },
                });
                imported.messages++;
            } catch (error: any) {
                console.error(`   ❌ Failed to import message from "${attrs.name}":`, error.message);
            }
        }
        console.log(`✅ Imported ${imported.messages} messages`);

        // Summary
        console.log('\n✨ Import complete!\n');
        console.log('📊 Summary:');
        console.log(`   ✅ Global Settings: ${imported.settings}`);
        console.log(`   ✅ Articles: ${imported.articles}`);
        console.log(`   ✅ Article Images: ${imported.images}`);
        console.log(`   ✅ Legal Pages: ${imported.legalPages}`);
        console.log(`   ✅ Messages: ${imported.messages}`);
        console.log(`   📈 Total: ${imported.settings + imported.articles + imported.legalPages + imported.messages} records`);

    } catch (error: any) {
        console.error('\n❌ Import failed:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

// Run import
importData()
    .then(() => {
        console.log('\n🎉 Data import completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Import failed:', error);
        process.exit(1);
    });
