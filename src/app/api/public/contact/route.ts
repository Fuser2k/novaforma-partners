import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { messageSchema } from '@/lib/validation';
import { checkRateLimit, incrementRateLimit } from '@/lib/security';

export async function POST(request: NextRequest) {
    try {
        // 1. Rate Limit Check (5 requests per 15 mins)
        const limit = await checkRateLimit('CONTACT_FORM', 5);
        if (!limit.allowed) {
            return NextResponse.json(
                { error: `Te veel verzoeken. Probeer het opnieuw over ${limit.waitTimeMinutes} minuten.` },
                { status: 429 }
            );
        }

        // Increment usage count for this IP
        await incrementRateLimit('CONTACT_FORM');

        const body = await request.json();

        // Validate input
        const validation = messageSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validation.error.issues },
                { status: 400 }
            );
        }

        const data = validation.data;

        // Save message to database
        const message = await prisma.message.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                sector: data.sector,
                region: data.region,
                message: data.message,
                termsAccepted: data.termsAccepted,
                isRead: false,
                isArchived: false,
            },
        });

        // NOTE: No email sending as per requirements

        return NextResponse.json({
            success: true,
            message: 'Bericht succesvol verzonden',
            id: message.id,
        });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Er is iets misgegaan. Probeer het later opnieuw.' },
            { status: 500 }
        );
    }
}
