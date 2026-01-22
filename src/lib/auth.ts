import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = process.env.JWT_SECRET;

if (!secret && process.env.NODE_ENV === 'production') {
    throw new Error('FATAL: JWT_SECRET is not set in production!');
}

const JWT_SECRET = new TextEncoder().encode(
    secret || 'dev-secret-only-unsecure'
);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Hash a plain text password
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Create a JWT token
 */
export async function createToken(payload: { adminId: string; email: string; role: string }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { adminId: string; email: string; role: string };
    } catch {
        return null;
    }
}

/**
 * Get the current session from cookies
 */
export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (!token) return null;

    return verifyToken(token);
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: string, requiredRole: string): boolean {
    const hierarchy = ['VIEWER', 'EDITOR', 'ADMIN', 'SUPER_ADMIN'];
    const userLevel = hierarchy.indexOf(userRole);
    const requiredLevel = hierarchy.indexOf(requiredRole);

    return userLevel >= requiredLevel;
}
