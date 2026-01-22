'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Loader2, Save, Globe, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function SettingsForm({ initialData }: { initialData?: any }) {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: initialData || {},
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            await axios.put('/api/admin/settings', data);
            toast.success('Instellingen opgeslagen');
        } catch (error: any) {
            console.error('Update settings error:', error);
            const errorMessage = error.response?.data?.details?.[0]?.message ||
                error.response?.data?.error ||
                'Opslaan mislukt';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Algemene Instellingen</h1>
                    <p className="text-sm text-gray-500">Beheer contactgegevens en sociale media links</p>
                </div>
                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Wijzigingen Opslaan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Site Info */}
                <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm h-fit">
                    <h3 className="text-lg font-medium flex items-center gap-2 border-b pb-2">
                        <Globe className="h-5 w-5 text-gray-500" />
                        Website Info
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website Naam</label>
                        <input {...register('siteName')} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Omschrijving</label>
                        <textarea {...register('siteDescription')} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2" />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm h-fit">
                    <h3 className="text-lg font-medium flex items-center gap-2 border-b pb-2">
                        <Phone className="h-5 w-5 text-gray-500" />
                        Contactgegevens
                    </h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefoonnummer</label>
                        <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <input {...register('phone')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mailadres</label>
                        <div className="flex items-center">
                            <Mail className="h-4 w-4 text-gray-400 mr-2" />
                            <input {...register('email')} type="email" className="flex-1 rounded-lg border border-gray-300 px-3 py-2" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                        <div className="flex items-start">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-2.5" />
                            <textarea {...register('address')} rows={3} className="flex-1 rounded-lg border border-gray-300 px-3 py-2" />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm md:col-span-2">
                    <h3 className="text-lg font-medium flex items-center gap-2 border-b pb-2">
                        <Facebook className="h-5 w-5 text-gray-500" />
                        Social Media
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                            <div className="flex items-center">
                                <Facebook className="h-4 w-4 text-blue-600 mr-2" />
                                <input {...register('facebookUrl')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2" placeholder="https://facebook.com/..." />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                            <div className="flex items-center">
                                <Instagram className="h-4 w-4 text-pink-600 mr-2" />
                                <input {...register('instagramUrl')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2" placeholder="https://instagram.com/..." />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Twitter (X) URL</label>
                            <div className="flex items-center">
                                <Twitter className="h-4 w-4 text-sky-500 mr-2" />
                                <input {...register('twitterUrl')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2" placeholder="https://twitter.com/..." />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                            <div className="flex items-center">
                                <Linkedin className="h-4 w-4 text-blue-700 mr-2" />
                                <input {...register('linkedinUrl')} className="flex-1 rounded-lg border border-gray-300 px-3 py-2" placeholder="https://linkedin.com/..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
