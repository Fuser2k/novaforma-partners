import { getSession } from '@/lib/auth';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { redirect } from 'next/navigation';

export default async function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar userRole={session.role} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header user={{ email: session.email, role: session.role }} />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
