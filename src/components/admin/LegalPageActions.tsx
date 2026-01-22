'use client';

import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface LegalPageActionsProps {
    id: string;
}

export function LegalPageActions({ id }: LegalPageActionsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Weet u zeker dat u deze pagina wilt verwijderen?')) return;

        try {
            await axios.delete(`/api/admin/legal-pages/${id}`);
            toast.success('Pagina verwijderd');
            router.refresh();
        } catch (error) {
            toast.error('Verwijderen mislukt');
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <Link
                href={`/admin/legal-pages/${id}`}
                className="rounded p-2 text-blue-600 hover:bg-blue-50"
                title="Bewerken"
            >
                <Edit className="h-4 w-4" />
            </Link>
            <button
                onClick={handleDelete}
                className="rounded p-2 text-red-600 hover:bg-red-50"
                title="Verwijderen"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}
