import { prisma } from '../src/lib/db';
import { hashPassword } from '../src/lib/auth';

async function createAdmin() {
    const email = 'admin@zorgforma.nl';
    const password = 'Admin123!';

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Upsert admin user
    const admin = await prisma.admin.upsert({
        where: { email },
        update: {
            passwordHash: hashedPassword,
        },
        create: {
            email,
            passwordHash: hashedPassword,
            firstName: 'Super',
            lastName: 'Admin',
            role: 'SUPER_ADMIN',
            isActive: true,
        },
    });

    console.log('Admin user created/updated:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${admin.role}`);

    await prisma.$disconnect();
}

createAdmin()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
