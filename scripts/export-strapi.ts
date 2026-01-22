import axios from 'axios';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const STRAPI_URL = process.env.STRAPI_URL_INTERNAL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

interface ExportData {
    articles: any[];
    globalSettings: any[];
    legalPages: any[];
    messages: any[];
    exportedAt: string;
}

async function exportStrapiData() {
    console.log('🔍 Starting Strapi data export...\n');
    console.log('Strapi URL:', STRAPI_URL);

    if (!STRAPI_TOKEN) {
        console.warn('⚠️  STRAPI_TOKEN not set. Will try public access.\n');
    }

    const headers = STRAPI_TOKEN ? {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
    } : {};

    const exportData: ExportData = {
        articles: [],
        globalSettings: [],
        legalPages: [],
        messages: [],
        exportedAt: new Date().toISOString(),
    };

    try {
        // Export Articles
        console.log('📝 Exporting articles...');
        try {
            const articlesRes = await axios.get(`${STRAPI_URL}/api/articles?populate=*&pagination[limit]=1000`, { headers });
            exportData.articles = articlesRes.data.data || [];
            console.log(`✅ Exported ${exportData.articles.length} articles`);
        } catch (error: any) {
            console.error('❌ Failed to export articles:', error.message);
        }

        // Export Global Settings
        console.log('\n⚙️  Exporting global settings...');
        try {
            const settingsRes = await axios.get(`${STRAPI_URL}/api/globals?populate=*`, { headers });
            exportData.globalSettings = Array.isArray(settingsRes.data.data)
                ? settingsRes.data.data
                : [settingsRes.data.data];
            console.log(`✅ Exported ${exportData.globalSettings.length} global settings`);
        } catch (error: any) {
            console.error('❌ Failed to export global settings:', error.message);
        }

        // Export Legal Pages
        console.log('\n📄 Exporting legal pages...');
        try {
            const legalRes = await axios.get(`${STRAPI_URL}/api/legal-pages?populate=*&pagination[limit]=100`, { headers });
            exportData.legalPages = legalRes.data.data || [];
            console.log(`✅ Exported ${exportData.legalPages.length} legal pages`);
        } catch (error: any) {
            console.error('❌ Failed to export legal pages:', error.message);
        }

        // Export Messages
        console.log('\n✉️  Exporting messages...');
        try {
            const messagesRes = await axios.get(`${STRAPI_URL}/api/messages?populate=*&pagination[limit]=5000`, { headers });
            exportData.messages = messagesRes.data.data || [];
            console.log(`✅ Exported ${exportData.messages.length} messages`);
        } catch (error: any) {
            console.error('❌ Failed to export messages:', error.message);
        }

        // Save to file
        const exportDir = join(process.cwd(), 'data', 'exports');
        await mkdir(exportDir, { recursive: true });

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `strapi-export-${timestamp}.json`;
        const filepath = join(exportDir, filename);

        await writeFile(filepath, JSON.stringify(exportData, null, 2));

        console.log('\n✨ Export complete!');
        console.log('📁 File saved to:', filepath);
        console.log('\n📊 Summary:');
        console.log(`   Articles: ${exportData.articles.length}`);
        console.log(`   Global Settings: ${exportData.globalSettings.length}`);
        console.log(`   Legal Pages: ${exportData.legalPages.length}`);
        console.log(`   Messages: ${exportData.messages.length}`);
        console.log(`   Total items: ${exportData.articles.length + exportData.globalSettings.length + exportData.legalPages.length + exportData.messages.length}`);

        // Also save latest.json for easy access
        const latestPath = join(exportDir, 'latest.json');
        await writeFile(latestPath, JSON.stringify(exportData, null, 2));
        console.log('\n💾 Also saved as: latest.json');

        return exportData;
    } catch (error: any) {
        console.error('\n❌ Export failed:', error.message);
        process.exit(1);
    }
}

// Run export
exportStrapiData()
    .then(() => {
        console.log('\n🎉 Export completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Export failed:', error);
        process.exit(1);
    });
