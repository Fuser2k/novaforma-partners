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

const schema = z.object({
    title: z.string().min(1, 'Titel verplicht'),
    description: z.string().min(1, 'Beschrijving verplicht'),
    icon: z.string().optional(),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

export default function ServiceForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({

        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            icon: initialData?.icon || '',
            order: initialData?.order ?? 0,
            isActive: initialData?.isActive ?? true,
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        try {
            if (initialData) {
                await axios.patch(`/api/admin/services/${initialData.id}`, data);
                toast.success('Dienst bijgewerkt');
            } else {
                await axios.post('/api/admin/services', data);
                toast.success('Dienst aangemaakt');
            }
            router.push('/admin/services');
            router.refresh();
        } catch (error) {
            toast.error('Opslaan mislukt');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/admin/services"
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

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dienst Titel</label>
                    <input
                        {...form.register('title')}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Beschrijving</label>
                    <textarea
                        {...form.register('description')}
                        rows={4}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {form.formState.errors.description && <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icoon (Lucide Name)</label>
                        <input
                            {...form.register('icon')}
                            placeholder="bijv. Briefcase"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Volgorde</label>
                        <input
                            type="number"
                            {...form.register('order', { valueAsNumber: true })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isActive"
                        {...form.register('isActive')}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                        Actief zichtbaar op website
                    </label>
                </div>

            </div>
        </div>
    );
}
