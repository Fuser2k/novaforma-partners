import { prisma } from '@/lib/db';
import { headers } from 'next/headers';

// --- Sanitization ---

export function sanitizeContent(content: string): string {
    if (!content) return '';

    // Lightweight sanitization without JSDOM/isomorphic-dompurify
    // This avoids build issues primarily
    return content
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
        .replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim, "")
        .replace(/<object\b[^>]*>([\s\S]*?)<\/object>/gim, "")
        .replace(/ on\w+="[^"]*"/g, "")
        .replace(/javascript:/gi, "");
}


// --- Rate Limiting ---

const MAX_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function checkLoginRateLimit(email: string): Promise<{ allowed: boolean; waitTimeMinutes?: number }> {
    const ip = (await headers()).get('x-forwarded-for') || 'unknown';

    // Clean up old attempts first (optional optimization)
    // await prisma.loginAttempt.deleteMany({ where: { lastAttempt: { lt: new Date(Date.now() - LOCKOUT_WINDOW_MS) } } });

    const attempt = await prisma.loginAttempt.findUnique({
        where: {
            ipAddress_email: {
                ipAddress: ip,
                email: email
            }
        }
    });

    if (!attempt) return { allowed: true };

    const timeSinceLast = Date.now() - attempt.lastAttempt.getTime();

    if (timeSinceLast > LOCKOUT_WINDOW_MS) {
        // Reset if window passed
        await prisma.loginAttempt.update({
            where: { id: attempt.id },
            data: { attempts: 0, lastAttempt: new Date() }
        });
        return { allowed: true };
    }

    if (attempt.attempts >= MAX_ATTEMPTS) {
        const remaining = Math.ceil((LOCKOUT_WINDOW_MS - timeSinceLast) / 60000);
        return { allowed: false, waitTimeMinutes: remaining };
    }

    return { allowed: true };
}

export async function registerLoginAttempt(email: string, success: boolean) {
    const ip = (await headers()).get('x-forwarded-for') || 'unknown';

    const attempt = await prisma.loginAttempt.findUnique({
        where: { ipAddress_email: { ipAddress: ip, email } }
    });

    if (success) {
        // Reset on success
        if (attempt) {
            await prisma.loginAttempt.delete({ where: { id: attempt.id } });
        }

        // Log security event
        await logSecurityEvent(email, 'LOGIN', 'Success', ip);
    } else {
        // Increment failure
        if (attempt) {
            await prisma.loginAttempt.update({
                where: { id: attempt.id },
                data: {
                    attempts: { increment: 1 },
                    lastAttempt: new Date()
                }
            });
        } else {
            await prisma.loginAttempt.create({
                data: {
                    ipAddress: ip,
                    email,
                    attempts: 1,
                    lastAttempt: new Date()
                }
            });
        }

        // Log failure
        await logSecurityEvent(email, 'FAILED_LOGIN', 'Invalid credentials or locked out', ip);
    }
}

// --- Audit Logging ---

export async function logSecurityEvent(email: string | null, event: string, details: string, ip?: string) {
    try {
        const userIp = ip || (await headers()).get('x-forwarded-for') || 'unknown';
        const userAgent = (await headers()).get('user-agent') || 'unknown';

        // Find user ID if email provided
        let userId = null;
        if (email) {
            const user = await prisma.admin.findUnique({ where: { email } });
            if (user) userId = user.id;
        }

        await prisma.securityEvent.create({
            data: {
                userId,
                event,
                details,
                ipAddress: userIp,
                userAgent
            }
        });
    } catch (e) {
        console.error('Failed to log security event:', e);
    }
}

export async function logAudit(adminId: string, action: string, entity: string, entityId: string, changes?: any) {
    try {
        const ip = (await headers()).get('x-forwarded-for') || 'unknown';
        const userAgent = (await headers()).get('user-agent') || 'unknown';

        await prisma.auditLog.create({
            data: {
                adminId,
                action,
                entity,
                entityId,
                changes: changes ? JSON.stringify(changes) : null,
                ipAddress: ip,
                userAgent
            }
        });
    } catch (e) {
        console.error('Failed to audit log:', e);
    }
}

// --- Password Validation ---

export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
    if (password.length < 12) return { valid: false, message: 'Password must be at least 12 characters' };
    if (!/[A-Z]/.test(password)) return { valid: false, message: 'Password must contain an uppercase letter' };
    if (!/[a-z]/.test(password)) return { valid: false, message: 'Password must contain a lowercase letter' };
    if (!/[0-9]/.test(password)) return { valid: false, message: 'Password must contain a number' };
    if (!/[^A-Za-z0-9]/.test(password)) return { valid: false, message: 'Password must contain a special character' };

    return { valid: true };
}

// --- Generic Rate Limiting (Reusing LoginAttempt table) ---

export async function checkRateLimit(actionKey: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000) {
    const ip = (await headers()).get('x-forwarded-for') || 'unknown';

    // We reuse the LoginAttempt table, mapping 'email' to 'actionKey'
    const attempt = await prisma.loginAttempt.findUnique({
        where: {
            ipAddress_email: {
                ipAddress: ip,
                email: actionKey
            }
        }
    });

    if (!attempt) return { allowed: true };

    const timeSinceLast = Date.now() - attempt.lastAttempt.getTime();

    if (timeSinceLast > windowMs) {
        // Reset if window passed
        await prisma.loginAttempt.update({
            where: { id: attempt.id },
            data: { attempts: 0, lastAttempt: new Date() }
        });
        return { allowed: true };
    }

    if (attempt.attempts >= maxAttempts) {
        const remaining = Math.ceil((windowMs - timeSinceLast) / 60000);
        return { allowed: false, waitTimeMinutes: remaining };
    }

    return { allowed: true };
}

export async function incrementRateLimit(actionKey: string) {
    const ip = (await headers()).get('x-forwarded-for') || 'unknown';

    const attempt = await prisma.loginAttempt.findUnique({
        where: { ipAddress_email: { ipAddress: ip, email: actionKey } }
    });

    if (attempt) {
        await prisma.loginAttempt.update({
            where: { id: attempt.id },
            data: {
                attempts: { increment: 1 },
                lastAttempt: new Date()
            }
        });
    } else {
        await prisma.loginAttempt.create({
            data: {
                ipAddress: ip,
                email: actionKey,
                attempts: 1,
                lastAttempt: new Date()
            }
        });
    }
}
