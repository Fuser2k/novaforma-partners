'use client';

import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface ArticleActionsProps {
    id: string;
    slug: string;
}

export function ArticleActions({ id, slug }: ArticleActionsProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Weet u zeker dat u dit artikel wilt verwijderen?')) return;

        try {
            console.log('Attempting to delete article:', id);
            const response = await axios.delete(`/api/admin/articles/${id}`);
            console.log('Delete response:', response.data);
            toast.success('Artikel verwijderd');
            // Force hard refresh
            window.location.reload();
        } catch (error: any) {
            console.error('Delete error:', error.response?.data || error.message);
            toast.error(error.response?.data?.error || 'Verwijderen mislukt');
        }
    };

    return (
        <div className="flex justify-end gap-2">
            <a
                href={`/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                title="Bekijk op website"
            >
                <Eye className="h-4 w-4" />
            </a>
            <Link
                href={`/admin/articles/${id}`}
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
