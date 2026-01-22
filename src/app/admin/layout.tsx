import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {children}
            <Toaster position="top-right" />
        </div>
    );
}
