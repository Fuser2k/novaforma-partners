
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const articles = await prisma.article.findMany({
            include: {
                images: true
            }
        });
        console.log(JSON.stringify(articles, null, 2));
    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
