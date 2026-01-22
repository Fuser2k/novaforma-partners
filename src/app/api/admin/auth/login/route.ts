import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, createToken } from '@/lib/auth';
import { checkLoginRateLimit, registerLoginAttempt } from '@/lib/security';
import { loginSchema } from '@/lib/validation';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // 1. Check Rate Limit
        const limitCheck = await checkLoginRateLimit(email);
        if (!limitCheck.allowed) {
            return NextResponse.json(
                { error: `Too many login attempts. Please try again in ${limitCheck.waitTimeMinutes} minutes.` },
                { status: 429 }
            );
        }

        // Find admin user
        const admin = await prisma.admin.findUnique({
            where: { email },
        });

        const invalidCredentialsResponse = async () => {
            await registerLoginAttempt(email, false);
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        };

        if (!admin) {
            return await invalidCredentialsResponse();
        }

        // Check if account is active
        if (!admin.isActive) {
            // We treat inactive account usually as a policy reject, logging it is good
            await registerLoginAttempt(email, false); // Or separate log? Treating as fail for now to rate limit retry
            return NextResponse.json(
                { error: 'Account is deactivated' },
                { status: 403 }
            );
        }

        // Verify password
        const isValid = await verifyPassword(password, admin.passwordHash);
        if (!isValid) {
            return await invalidCredentialsResponse();
        }

        // 2. Success: Reset rate limit & Log
        await registerLoginAttempt(email, true);

        // Create JWT token
        const token = await createToken({
            adminId: admin.id,
            email: admin.email,
            role: admin.role,
        });

        // Create session in database
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        await prisma.session.create({
            data: {
                adminId: admin.id,
                token,
                expiresAt,
            },
        });

        // Update last login
        await prisma.admin.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() },
        });

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        // Return user info (without sensitive data)
        return NextResponse.json({
            success: true,
            admin: {
                id: admin.id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
