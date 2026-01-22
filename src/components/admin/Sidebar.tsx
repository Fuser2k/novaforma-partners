'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Scale,
    Settings,
    Image as ImageIcon,
    ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
    userRole?: string;
}

export function Sidebar({ userRole }: SidebarProps) {
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Artikelen', href: '/admin/articles', icon: FileText },
        { name: 'Berichten', href: '/admin/messages', icon: MessageSquare },
        { name: 'Pagina\'s', href: '/admin/legal-pages', icon: Scale },
        { name: 'Media', href: '/admin/media', icon: ImageIcon },
        { name: 'Instellingen', href: '/admin/settings', icon: Settings },
        { name: 'Beveiliging', href: '/admin/settings/security', icon: ShieldCheck },
    ];

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r">
            <div className="flex h-16 items-center px-6 border-b">
                <span className="text-xl font-bold text-gray-900">NovaForma</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors'
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="border-t p-4">
                <div className="text-xs text-gray-500 text-center">
                    NovaForma CMS v1.0
                </div>
            </div>
        </div>
    );
}
