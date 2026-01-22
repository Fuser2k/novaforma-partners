
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const articles = await prisma.article.findMany({
            select: {
                id: true,
                title: true,
                isDraft: true,
                images: true
            }
        });
        articles.forEach(a => {
            console.log(`Title: ${a.title} | Draft: ${a.isDraft} | Images count: ${a.images.length}`);
        });
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
