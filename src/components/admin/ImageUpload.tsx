'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
    label?: string;
}

import { MediaSelector } from '@/components/admin/MediaSelector';

export function ImageUpload({ value, onChange, onRemove, label = "Afbeelding" }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate type
        if (!file.type.startsWith('image/')) {
            toast.error('Alleen afbeeldingsbestanden zijn toegestaan');
            return;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Afbeelding mag maximaal 5MB zijn');
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/admin/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            onChange(response.data.file.url);
            toast.success('Afbeelding geüpload');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Uploaden mislukt');
        } finally {
            setIsUploading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            // Create a fake event to reuse handleUpload
            const fakeEvent = {
                target: { files: [file] }
            } as any;
            handleUpload(fakeEvent);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    return (
        <div className="w-full">
            <MediaSelector
                isOpen={isMediaOpen}
                onClose={() => setIsMediaOpen(false)}
                onSelect={(url) => {
                    onChange(url);
                    setIsMediaOpen(false);
                }}
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>

            {value ? (
                <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                    <Image
                        src={value}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={onRemove}
                        className="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Verwijderen"
                    >
                        <X className="h-4 w-4" />
                    </button>
                    {/* Switch button while image is present */}
                    <button
                        type="button"
                        onClick={() => setIsMediaOpen(true)}
                        className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-gray-700 text-xs px-2 py-1 rounded shadow-sm border transition-colors"
                    >
                        Wijzigen
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <div
                        onClick={handleClick}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={clsx(
                            "flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-all cursor-pointer",
                            isDragging
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        )}
                    >
                        {isUploading ? (
                            <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
                        ) : (
                            <div className="text-center pointer-events-none">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-300" />
                                <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                                    <span className="font-semibold text-blue-600">
                                        Uploaden
                                    </span>
                                    <p className="pl-1">of slepen</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF tot 5MB</p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <span className="text-xs text-gray-400 font-medium uppercase">OF</span>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMediaOpen(true)}
                        className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                        <ImageIcon className="h-4 w-4" />
                        Kies uit mediabibliotheek
                    </button>
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                disabled={isUploading}
            />
        </div>
    );
}
