import { prisma } from '../src/lib/db';
import { hashPassword } from '../src/lib/auth';

async function main() {
    const email = 'admin@zorgforma.nl';
    const password = process.env.ADMIN_INIT_PASSWORD;

    if (!password) {
        console.error('❌ Error: ADMIN_INIT_PASSWORD environment variable is not set.');
        console.error('   Please run: $env:ADMIN_INIT_PASSWORD="YourStrongPassword"; npm run admin:create');
        process.exit(1);
    }
    const firstName = 'Super';
    const lastName = 'Admin';

    try {
        console.log('🔐 Creating initial admin user...\n');

        const passwordHash = await hashPassword(password);

        const admin = await prisma.admin.upsert({
            where: { email },
            update: {},
            create: {
                email,
                passwordHash,
                firstName,
                lastName,
                role: 'SUPER_ADMIN',
                isActive: true,
            },
        });

        console.log('✅ Admin user created successfully!\n');
        console.log('📧 Email:', email);
        console.log('🔑 Password:', password);
        console.log('👤 Name:', firstName, lastName);
        console.log('🎯 Role:', admin.role);
        console.log('\n⚠️  IMPORTANT: Change password after first login!\n');
    } catch (error) {
        console.error('❌ Failed to create admin user:');
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
