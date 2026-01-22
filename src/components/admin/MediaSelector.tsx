'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { X, Search, Image as ImageIcon, Check } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';

interface MediaFile {
    id: string;
    url: string;
    filename: string;
    mimeType: string;
}

interface MediaSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
}

export function MediaSelector({ isOpen, onClose, onSelect }: MediaSelectorProps) {
    const [media, setMedia] = useState<MediaFile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen]);

    const fetchMedia = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/admin/media');
            // Assuming response.data.media is the array
            setMedia(response.data.media || []);
        } catch (error) {
            console.error('Fetch media error:', error);
            toast.error('Kan mediabibliotheek niet laden');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = () => {
        if (selectedUrl) {
            onSelect(selectedUrl);
            onClose();
        }
    };

    const filteredMedia = media.filter(file =>
        file.filename.toLowerCase().includes(search.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-4xl rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-4 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">Mediabibliotheek</h3>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 hover:bg-gray-200 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                {/* Search & Toolbar */}
                <div className="p-4 border-b flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Zoeken..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-40">
                            <span className="text-gray-500">Laden...</span>
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                            <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
                            <p>Geen bestanden gevonden</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredMedia.map((file) => (
                                <div
                                    key={file.id}
                                    onClick={() => {
                                        setSelectedId(file.id);
                                        setSelectedUrl(file.url);
                                    }}
                                    className={clsx(
                                        "group relative aspect-square cursor-pointer rounded-lg border-2 overflow-hidden bg-white transition-all",
                                        selectedId === file.id
                                            ? "border-blue-500 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-blue-300"
                                    )}
                                >
                                    <Image
                                        src={file.url}
                                        alt={file.filename}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                        unoptimized // Avoid next/image optimization issues with external urls initially
                                    />
                                    {selectedId === file.id && (
                                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                            <div className="bg-blue-500 text-white p-1 rounded-full">
                                                <Check className="h-4 w-4" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 truncate text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        {file.filename}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t p-4 bg-white flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Annuleren
                    </button>
                    <button
                        onClick={handleSelect}
                        disabled={!selectedUrl}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Afbeelding Kiezen
                    </button>
                </div>
            </div>
        </div>
    );
}
