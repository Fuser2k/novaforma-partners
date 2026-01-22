import { prisma } from '@/lib/db';
import { MessageDetail } from '@/components/admin/MessageDetail';
import { notFound } from 'next/navigation';

async function getMessage(id: string) {
    const message = await prisma.message.findUnique({
        where: { id },
    });

    if (!message) return null;

    // Mark as read if not already
    if (!message.isRead) {
        await prisma.message.update({
            where: { id },
            data: { isRead: true },
        });
    }

    return message;
}

export default async function MessagePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const message = await getMessage(resolvedParams.id);

    if (!message) {
        notFound();
    }

    return <MessageDetail message={message} />;
}
