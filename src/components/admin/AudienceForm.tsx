'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

const schema = z.object({
    title: z.string().min(1, 'Titel verplicht'),
    description: z.string().min(1, 'Beschrijving verplicht'),
    benefits: z.array(z.object({
        value: z.string().min(1, 'Voordeel mag niet leeg zijn')
    })),
    order: z.number().default(0),
    isActive: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

export default function AudienceForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Parse benefits if it comes from DB (SQLite JSON string)
    let parsedBenefits = [];
    try {
        if (initialData?.benefits) {
            if (typeof initialData.benefits === 'string') {
                const parsed = JSON.parse(initialData.benefits);
                parsedBenefits = parsed.map((b: string) => ({ value: b }));
            } else if (Array.isArray(initialData.benefits)) {
                // PostgreSQL handling
                parsedBenefits = initialData.benefits.map((b: string) => ({ value: b }));
            }
        }
    } catch (e) {
        console.error("Failed to parse benefits", e);
    }

    const form = useForm<FormValues>({

        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            benefits: parsedBenefits.length > 0 ? parsedBenefits : [{ value: '' }],
            order: initialData?.order ?? 0,
            isActive: initialData?.isActive ?? true,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "benefits"
    });

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        try {
            // Transform benefits back to flat array for API
            // The API route handles the JSON.stringify for SQLite
            const payload = {
                ...data,
                benefits: data.benefits.map(b => b.value)
            };

            if (initialData) {
                await axios.patch(`/api/admin/audiences/${initialData.id}`, payload);
                toast.success('Doelgroep bijgewerkt');
            } else {
                await axios.post('/api/admin/audiences', payload);
                toast.success('Doelgroep aangemaakt');
            }
            router.push('/admin/audiences');
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
                    href="/admin/audiences"
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
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                        <input
                            {...form.register('title')}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
                    </div>

                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Beschrijving</label>
                        <RichTextEditor
                            content={form.watch('description')}
                            onChange={(html) => form.setValue('description', html)}
                        />
                    </div>

                    {/* Benefits List Editor */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-700">Voordelen / Kenmerken</label>
                            <button
                                type="button"
                                onClick={() => append({ value: '' })}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                            >
                                <Plus className="h-4 w-4 mr-1" /> Toevoegen
                            </button>
                        </div>
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <input
                                        {...form.register(`benefits.${index}.value` as const)}
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                        placeholder={`Voordeel ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Volgorde</label>
                            <input
                                type="number"
                                {...form.register('order', { valueAsNumber: true })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                        </div>

                        <div className="flex items-center pt-2">
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
