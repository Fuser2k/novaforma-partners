import { prisma } from '@/lib/db';
import { MessagesTable } from '@/components/admin/MessagesTable';

async function getMessages() {
    return prisma.message.findMany({
        where: {
            isArchived: false,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export default async function MessagesIndex() {
    const messages = await getMessages();

    // We convert dates to strings or pass basic objects to Client Component
    // Prisma Dates are Date objects, which Next.js can pass to Client Components now (Serializable)
    // but to be safe/clean we can just pass them as is.

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Berichten van het contactformulier
                    </p>
                </div>
            </div>

            <MessagesTable messages={messages} />
        </div>
    );
}
