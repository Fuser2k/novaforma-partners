
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function publishAll() {
    try {
        const result = await prisma.article.updateMany({
            where: {
                isDraft: true,
            },
            data: {
                isDraft: false,
                publishDate: new Date(),
                publishedAt: new Date(),
            }
        });
        console.log(`Successfully published ${result.count} articles.`);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

publishAll();
