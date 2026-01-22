'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Save, ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { format } from 'date-fns';

const articleSchema = z.object({
    title: z.string().min(1, 'Titel is verplicht'),
    slug: z.string().min(1, 'Slug is verplicht'),
    summary: z.string().min(1, 'Samenvatting is verplicht'),
    content: z.string().min(1, 'Inhoud is verplicht'),
    category: z.string().min(1, 'Categorie is verplicht'),
    isDraft: z.boolean().default(true),
    publishDate: z.string().optional(), // Date string from input type="date"
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    keywords: z.string().optional(),
    mainImage: z.string().optional(), // Helper field for UI
});


type ArticleFormValues = {
    title: string;
    slug: string;
    summary: string;
    content: string;
    category: string;
    isDraft: boolean;
    publishDate?: string;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string;
    mainImage?: string;
};

interface ArticleFormProps {
    initialData?: any; // strict typing would be better but keeping it flexible for now
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

    // Extract main image from initialData relation if exists
    const initialMainImage = initialData?.images?.find((img: any) => img.order === 0)?.url || '';

    const form = useForm<ArticleFormValues>({
        defaultValues: {
            title: initialData?.title || '',
            slug: initialData?.slug || '',
            summary: initialData?.summary || '',
            content: initialData?.content || '',
            category: initialData?.category || '',
            isDraft: initialData?.isDraft ?? true,
            publishDate: initialData?.publishDate ? format(new Date(initialData.publishDate), 'yyyy-MM-dd') : '',
            seoTitle: initialData?.seoTitle || '',
            seoDescription: initialData?.seoDescription || '',
            keywords: initialData?.keywords || '',
            mainImage: initialMainImage,
        },
    });

    const { watch, setValue } = form;
    const title = watch('title');

    // Auto-generate slug from title if slug is empty
    useEffect(() => {
        if (!initialData && title && !form.getValues('slug')) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setValue('slug', slug);
        }
    }, [title, initialData, setValue, form]);

    const onSubmit = async (data: ArticleFormValues) => {
        setIsLoading(true);
        try {
            // Format payload for API
            const payload = {
                ...data,
                publishDate: data.publishDate ? new Date(data.publishDate).toISOString() : null,
                // Convert helper mainImage field back to images array relation
                images: data.mainImage ? [{ url: data.mainImage, order: 0, alt: data.title }] : [],
            };

            if (initialData) {
                await axios.patch(`/api/admin/articles/${initialData.id}`, payload);
                toast.success('Artikel bijgewerkt');
            } else {
                await axios.post('/api/admin/articles', payload);
                toast.success('Artikel aangemaakt');
            }

            router.push('/admin/articles');
            router.refresh();
        } catch (error) {
            console.error('Save error:', error);
            toast.error('Opslaan mislukt');
        } finally {
            setIsLoading(false);
        }
    };

    const categories = [
        'Nieuws',
        'Blog',
        'Case Study',
        'Tutorial',
        'Update',
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/admin/articles"
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Terug naar overzicht
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {form.watch('isDraft') ? 'Concept' : 'Wordt gepubliceerd'}
                    </span>
                    <button
                        onClick={form.handleSubmit(onSubmit)}
                        disabled={isLoading}
                        className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        {initialData ? 'Wijzigingen opslaan' : 'Publiceren'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Title & Slug */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Titel
                            </label>
                            <input
                                {...form.register('title')}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Voer een pakkende titel in..."
                            />
                            {form.formState.errors.title && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug (URL)
                            </label>
                            <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                                    website.nl/artikelen/
                                </span>
                                <input
                                    {...form.register('slug')}
                                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rich Text Content */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Inhoud
                        </label>
                        <RichTextEditor
                            content={form.watch('content')}
                            onChange={(html) => setValue('content', html, { shouldValidate: true })}
                        />
                        {form.formState.errors.content && (
                            <p className="mt-1 text-sm text-red-600">{form.formState.errors.content.message}</p>
                        )}
                    </div>

                    {/* SEO Settings */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
                        <h3 className="text-lg font-medium text-gray-900 border-b pb-2">SEO Instellingen</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SEO Titel
                            </label>
                            <div className="flex justify-between">
                                <input
                                    {...form.register('seoTitle')}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Titel voor zoekmachines (max 60 karakters)"
                                />
                                <span className="ml-2 flex items-center text-xs text-gray-500">
                                    {watch('seoTitle')?.length || 0}/60
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meta Omschrijving
                            </label>
                            <textarea
                                {...form.register('seoDescription')}
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Korte omschrijving voor in de zoekresultaten (max 160 karakters)"
                            />
                            <div className="flex justify-end">
                                <span className="text-xs text-gray-500">
                                    {watch('seoDescription')?.length || 0}/160
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">

                    {/* Status & Date */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                {...form.register('isDraft', {
                                    setValueAs: (v) => v === 'true' || v === true
                                })}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="true">Concept</option>
                                <option value="false">Gepubliceerd</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categorie
                            </label>
                            <select
                                {...form.register('category')}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Selecteer categorie...</option>
                                {categories.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            {form.formState.errors.category && (
                                <p className="mt-1 text-sm text-red-600">{form.formState.errors.category.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Publicatiedatum
                            </label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    {...form.register('publishDate')}
                                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <ImageUpload
                            label="Hoofdafbeelding"
                            value={watch('mainImage')}
                            onChange={(url) => setValue('mainImage', url)}
                            onRemove={() => setValue('mainImage', '')}
                        />
                    </div>

                    {/* Summary */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Samenvatting
                        </label>
                        <textarea
                            {...form.register('summary')}
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Korte introductie of samenvatting..."
                        />
                        {form.formState.errors.summary && (
                            <p className="mt-1 text-sm text-red-600">{form.formState.errors.summary.message}</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
