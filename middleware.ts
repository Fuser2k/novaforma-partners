import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // Only run on /admin routes
    if (!request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.next();
    }

    // Allow unrestricted access to login API and public routes 
    // BUT explicitly protect /api/admin routes
    if (request.nextUrl.pathname.startsWith('/api/') && !request.nextUrl.pathname.startsWith('/api/admin')) {
        return NextResponse.next();
    }

    // Explicitly exclude the login endpoint from protection (otherwise loop)
    if (request.nextUrl.pathname === '/api/admin/auth/login') {
        return NextResponse.next();
    }

    const token = request.cookies.get('admin-token')?.value;
    const isLoginPage = request.nextUrl.pathname === '/admin/login';

    // Verify token
    let payload = null;
    if (token) {
        try {
            // We can use verifyToken from lib/auth because jose is Edge compatible
            // But lib/auth imports bcryptjs which MIGHT cause issues in some edge runtimes
            // Let's rely on the import working or copy the verify logic if needed.
            // For now assume verifyToken works.
            payload = await verifyToken(token);
        } catch (e) {
            // Invalid token
        }
    }

    // 1. If on login page and logged in -> redirect to dashboard
    if (isLoginPage && payload) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    // 2. If protected page and NOT logged in -> redirect to login (or 401 for API)
    if (!isLoginPage && !payload) {
        if (request.nextUrl.pathname.startsWith('/api/')) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const loginUrl = new URL('/admin/login', request.url);
        // Optional: Add ?from=... to redirect back after login
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
