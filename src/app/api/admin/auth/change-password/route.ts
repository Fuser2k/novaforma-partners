
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getSession, verifyPassword, hashPassword } from '@/lib/auth';
import { validatePasswordStrength, logSecurityEvent } from '@/lib/security';
import { z } from 'zod';

export async function POST(request: NextRequest) {
    try {
        // Schema definition moved inside to avoid build-time execution
        const changePasswordSchema = z.object({
            currentPassword: z.string().min(1, "Current password is required"),
            newPassword: z.string().min(12, "New password must be at least 12 characters"),
            confirmPassword: z.string()
        }).refine((data) => data.newPassword === data.confirmPassword, {
            message: "Passwords don't match",
            path: ["confirmPassword"],
        });

        // 1. Authenticate
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // 2. Validate Input
        const validation = changePasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const { currentPassword, newPassword } = validation.data;

        // 3. Password Strength Check
        const strength = validatePasswordStrength(newPassword);
        if (!strength.valid) {
            return NextResponse.json(
                { error: strength.message },
                { status: 400 }
            );
        }

        // 4. Fetch User
        const admin = await prisma.admin.findUnique({
            where: { id: session.adminId },
        });

        if (!admin) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // 5. Verify Current Password
        const isValid = await verifyPassword(currentPassword, admin.passwordHash);
        if (!isValid) {
            await logSecurityEvent(admin.email, 'FAILED_PASSWORD_CHANGE', 'Incorrect current password');
            return NextResponse.json(
                { error: 'Incorrect current password' },
                { status: 401 }
            );
        }

        // 6. Update Password
        const newHash = await hashPassword(newPassword);
        await prisma.admin.update({
            where: { id: admin.id },
            data: { passwordHash: newHash }
        });

        // 7. Revoke All Sessions
        await prisma.session.deleteMany({
            where: { adminId: admin.id }
        });

        // 8. Log Success
        await logSecurityEvent(admin.email, 'PASSWORD_CHANGE', 'Password changed successfully');

        return NextResponse.json({ success: true, message: 'Password changed. Please log in again.' });

    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

