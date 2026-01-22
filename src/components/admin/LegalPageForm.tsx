'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

const schema = z.object({
    title: z.string().min(1, 'Titel verplicht'),
    slug: z.string().min(1, 'Slug verplicht'),
    content: z.string().min(1, 'Inhoud verplicht'),
});

type FormValues = z.infer<typeof schema>;

export default function LegalPageForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({

        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            content: initialData?.content || '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        try {
            if (initialData) {
                await axios.patch(`/api/admin/legal-pages/${initialData.id}`, data);
                toast.success('Pagina bijgewerkt');
            } else {
                await axios.post('/api/admin/legal-pages', data);
                toast.success('Pagina aangemaakt');
            }
            router.push('/admin/legal-pages');
            router.refresh();
        } catch (error) {
            toast.error('Opslaan mislukt');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/admin/legal-pages"
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Terug
                </Link>
                <button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Opslaan
                </button>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pagina Titel
                        </label>
                        <input
                            {...form.register('title')}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {form.formState.errors.title && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Slug
                        </label>
                        <input
                            {...form.register('slug')}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="bijv. algemene-voorwaarden"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inhoud
                    </label>
                    <RichTextEditor
                        content={form.watch('content')}
                        onChange={(html) => form.setValue('content', html)}
                    />
                </div>
            </div>
        </div>
    );
}
