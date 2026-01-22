'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Calendar,
    Archive,
    CheckCircle,
    Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import Link from 'next/link';

interface MessageDetailProps {
    message: {
        id: string;
        name: string;
        email: string;
        phone: string;
        sector: string;
        region?: string | null;
        message: string;
        isRead: boolean;
        isArchived: boolean;
        notes?: string | null;
        createdAt: Date | string;
    };
}

export function MessageDetail({ message }: MessageDetailProps) {
    const router = useRouter();
    const [isArchiving, setIsArchiving] = useState(false);
    const [note, setNote] = useState(message.notes || '');
    const [isSavingNote, setIsSavingNote] = useState(false);

    const handleArchive = async () => {
        setIsArchiving(true);
        try {
            await axios.patch(`/api/admin/messages/${message.id}`, { isArchived: true });
            toast.success('Bericht gearchiveerd');
            router.push('/admin/messages');
            router.refresh();
        } catch (error) {
            toast.error('Archiveren mislukt');
        } finally {
            setIsArchiving(false);
        }
    };

    const saveNote = async () => {
        setIsSavingNote(true);
        try {
            await axios.patch(`/api/admin/messages/${message.id}`, { notes: note });
            toast.success('Notitie opgeslagen');
            router.refresh();
        } catch (error) {
            toast.error('Opslaan mislukt');
        } finally {
            setIsSavingNote(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/admin/messages"
                    className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Terug naar inbox
                </Link>
                <button
                    onClick={handleArchive}
                    disabled={isArchiving}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <Archive className="h-4 w-4" />
                    Archiveren
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{message.name}</h2>
                                <p className="text-gray-500 text-sm">
                                    {format(new Date(message.createdAt), "dd MMMM yyyy 'om' HH:mm", { locale: nl })}
                                </p>
                            </div>
                            {message.isRead ? (
                                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Gelezen
                                </span>
                            ) : (
                                <span className="flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                    <Clock className="h-3 w-3 mr-1" />
                                    Nieuw
                                </span>
                            )}
                        </div>

                        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                            {message.message}
                        </div>
                    </div>

                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Interne Notities</h3>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Voeg interne opmerkingen toe over deze lead..."
                        />
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={saveNote}
                                disabled={isSavingNote}
                                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isSavingNote ? 'Opslaan...' : 'Notitie Opslaan'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-medium text-gray-900 border-b pb-2 mb-4">Contactgegevens</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-500 block">Email</label>
                                <a href={`mailto:${message.email}`} className="flex items-center gap-2 text-blue-600 hover:underline mt-1">
                                    <Mail className="h-4 w-4" />
                                    <span className="truncate">{message.email}</span>
                                </a>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 block">Telefoon</label>
                                <a href={`tel:${message.phone}`} className="flex items-center gap-2 text-gray-900 mt-1">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{message.phone}</span>
                                </a>
                            </div>

                            <div>
                                <label className="text-xs text-gray-500 block">Sector</label>
                                <div className="flex items-center gap-2 text-gray-900 mt-1">
                                    <Briefcase className="h-4 w-4 text-gray-400" />
                                    <span>{message.sector}</span>
                                </div>
                            </div>

                            {message.region && (
                                <div>
                                    <label className="text-xs text-gray-500 block">Regio</label>
                                    <div className="flex items-center gap-2 text-gray-900 mt-1">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{message.region}</span>
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs text-gray-500 block">IP Adres</label>
                                <p className="text-xs text-gray-400 mt-1 font-mono">192.168.1.1 (Simulated)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
