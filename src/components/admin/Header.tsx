'use client';

import { LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface HeaderProps {
    user: {
        email: string;
        role: string;
    };
}

export function Header({ user }: HeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await axios.post('/api/admin/auth/logout');
            toast.success('Uitgelogd');
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Uitloggen mislukt');
        }
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <User className="h-4 w-4" />
                    </div>
                    <div className="hidden md:block">
                        <p className="font-medium">{user.email}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
                    title="Uitloggen"
                >
                    <LogOut className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}
