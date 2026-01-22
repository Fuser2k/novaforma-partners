'use client';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Eye, Archive } from 'lucide-react';
import clsx from 'clsx';
import { MouseEvent } from 'react';

interface MessagesTableProps {
    messages: any[];
}

export function MessagesTable({ messages }: MessagesTableProps) {
    const router = useRouter();

    const handleRowClick = (id: string) => {
        router.push(`/admin/messages/${id}`);
    };

    const handleActionClick = (e: MouseEvent, url: string) => {
        e.stopPropagation(); // Prevent row click
        router.push(url);
    };

    return (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-4 font-medium">Afzender</th>
                        <th className="px-6 py-4 font-medium">E-mail</th>
                        <th className="px-6 py-4 font-medium">Sector</th>
                        <th className="px-6 py-4 font-medium">Datum</th>
                        <th className="px-6 py-4 font-medium text-right">Acties</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {messages.map((message) => {
                        const date = new Date(message.createdAt);
                        return (
                            <tr
                                key={message.id}
                                onClick={() => handleRowClick(message.id)}
                                className={clsx(
                                    "hover:bg-blue-50 transition-colors cursor-pointer",
                                    !message.isRead && "bg-blue-50/30"
                                )}
                            >
                                <td className="px-6 py-4">
                                    <span className={clsx("font-medium", !message.isRead ? "text-blue-900 font-bold" : "text-gray-900")}>
                                        {message.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    <a
                                        href={`mailto:${message.email}`}
                                        className="text-blue-600 hover:underline z-10 relative"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {message.email}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {message.sector}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {format(date, 'd MMM yyyy', { locale: nl })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={(e) => handleActionClick(e, `/admin/messages/${message.id}`)}
                                            className="rounded p-2 text-blue-600 hover:bg-blue-100 transition-colors"
                                            title="Bekijken"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
