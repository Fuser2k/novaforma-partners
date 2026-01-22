'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Trash2, Copy, Upload, Image as ImageIcon, Search, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface MediaFile {
    id: string;
    url: string;
    thumbnailUrl: string | null;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    createdAt: string;
}

export function MediaLibrary() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const response = await axios.get('/api/admin/media');
            setFiles(response.data.media);
        } catch (error) {
            toast.error('Kan mediabestanden niet laden');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        setIsUploading(true);
        try {
            const response = await axios.post('/api/admin/media/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setFiles([response.data.file, ...files]);
            toast.success('Bestand geüpload');
        } catch (error: any) {
            console.error('Upload Error', error);
            const msg = error.response?.data?.error || 'Upload mislukt';
            toast.error(msg);
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Weet je zeker dat je dit bestand wilt verwijderen?')) return;

        try {
            await axios.delete(`/api/admin/media?id=${id}`);
            setFiles(files.filter(f => f.id !== id));
            toast.success('Bestand verwijderd');
        } catch (error) {
            toast.error('Verwijderen mislukt');
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success('URL gekopieerd');
    };

    const filteredFiles = files.filter(f =>
        f.originalName.toLowerCase().includes(search.toLowerCase()) ||
        f.filename.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Zoek bestand..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="relative">
                    <input
                        type="file"
                        id="media-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={isUploading}
                    />
                    <label
                        htmlFor="media-upload"
                        className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {isUploading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="h-4 w-4" />
                        )}
                        <span>Uploaden</span>
                    </label>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
            ) : filteredFiles.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500">Geen mediabestanden gevonden</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredFiles.map((file) => (
                        <div key={file.id} className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="aspect-square relative bg-gray-100">
                                <Image
                                    src={file.thumbnailUrl || file.url}
                                    alt={file.originalName}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                                    <button
                                        onClick={() => copyToClipboard(file.url)}
                                        className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition"
                                        title="Kopieer URL"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600 transition"
                                        title="Verwijder"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium text-gray-900 truncate" title={file.originalName}>
                                    {file.originalName}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">
                                        {(file.size / 1024).toFixed(0)} KB
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {format(new Date(file.createdAt), 'dd MMM', { locale: nl })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
