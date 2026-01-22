export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        // Get first (and only) global settings record
        const settings = await prisma.globalSettings.findFirst();

        if (!settings) {
            // Return default settings if none exist
            return NextResponse.json({
                settings: {
                    facebookUrl: '',
                    instagramUrl: '',
                    twitterUrl: '',
                    linkedinUrl: '',
                    phone: '',
                    email: '',
                    address: '',
                    siteName: 'Zorgforma',
                    siteDescription: '',
                },
            });
        }

        return NextResponse.json({ settings });
    } catch (error) {
        console.error('Get settings error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
