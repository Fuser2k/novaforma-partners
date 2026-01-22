
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testFetch() {
    try {
        const articles = await prisma.article.findMany({
            where: {
                deletedAt: null,
                isDraft: false,
            },
            orderBy: {
                publishDate: 'desc'
            },
            include: {
                images: {
                    where: { order: 0 },
                    take: 1
                }
            }
        });
        console.log('--- FOUND ARTICLES ---');
        console.log(JSON.stringify(articles, null, 2));

        // Also check total articles regardless of draft status
        const allCount = await prisma.article.count();
        const publishedCount = await prisma.article.count({ where: { isDraft: false, deletedAt: null } });
        console.log(`Total: ${allCount}, Published: ${publishedCount}`);
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testFetch();
