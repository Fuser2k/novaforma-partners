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
    summary: z.string().min(1, 'Samenvatting verplicht'),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

export default function StepForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({

        defaultValues: {
            title: initialData.title || '',
            summary: initialData.summary || '',
            description: initialData.description || '',
            isActive: initialData.isActive ?? true,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        try {
            await axios.patch(`/api/admin/steps/${initialData.id}`, data);
            toast.success('Stap bijgewerkt');
            router.push('/admin/steps');
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
                    href="/admin/steps"
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                            <input
                                {...form.register('title')}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium"
                            />
                            {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Korte Samenvatting</label>
                            <textarea
                                {...form.register('summary')}
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {form.formState.errors.summary && <p className="text-red-500 text-xs mt-1">{form.formState.errors.summary.message}</p>}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Uitgebreide Beschrijving</label>
                        <RichTextEditor
                            content={form.watch('description') || ''}
                            onChange={(html) => form.setValue('description', html)}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <div className="text-center mb-6">
                            <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                                {initialData.number}
                            </span>
                            <p className="mt-2 text-sm text-gray-500">Stap Nummer</p>
                        </div>

                        <div className="flex items-center border-t pt-4">
                            <input
                                type="checkbox"
                                id="isActive"
                                {...form.register('isActive')}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                                Zichtbaar op website
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
