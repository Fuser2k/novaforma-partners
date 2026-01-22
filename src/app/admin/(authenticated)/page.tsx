import { prisma } from '@/lib/db';

import { FileText, MessageSquare, Users, Eye } from 'lucide-react';
import { getSession } from '@/lib/auth';

async function getStats() {
    const [articlesCount, messagesCount, unreadMessages, audiencesCount] = await Promise.all([
        prisma.article.count({ where: { deletedAt: null } }),
        prisma.message.count(),
        prisma.message.count({ where: { isRead: false } }),
        prisma.audience.count(),
    ]);

    return {
        articlesCount,
        messagesCount,
        unreadMessages,
        audiencesCount,
    };
}

export default async function DashboardPage() {
    const session = await getSession();
    const stats = await getStats();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {session?.email.split('@')[0]}!
                </h1>
                <p className="mt-1 text-gray-500">Here's what's happening with your website today.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Stats Cards */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Articles</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.articlesCount}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Messages</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-gray-900">{stats.messagesCount}</p>
                                {stats.unreadMessages > 0 && (
                                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-600">
                                        {stats.unreadMessages} new
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Target Audiences</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.audiencesCount}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                            <Eye className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Site Status</p>
                            <p className="text-2xl font-bold text-gray-900">Active</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity placeholder */}
            <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
                <div className="mt-4">
                    <p className="text-sm text-gray-500 italic">No recent activity (audit log not implemented in view yet)</p>
                </div>
            </div>
        </div>
    );
}
