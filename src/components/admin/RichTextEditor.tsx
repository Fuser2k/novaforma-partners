'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Image as ImageIcon,
    Heading1,
    Heading2,
    Quote,
    Undo,
    Redo
} from 'lucide-react';
import clsx from 'clsx';
import { MediaPickerModal } from './MediaPickerModal';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            Placeholder.configure({
                placeholder: placeholder || 'Begin met typen...',
            }),
        ],
        content: content || '', // Initialize with empty string if null
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[300px]',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        // Important: Only set content on mount, not on every render to avoid loop
        // We rely on internal editor state after mount
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const addImage = () => {
        setIsMediaPickerOpen(true);
    };

    const handleImageSelect = (url: string) => {
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="rounded-lg border border-gray-300 bg-white overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 px-3 py-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('bold') ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <Bold className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('italic') ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <Italic className="h-4 w-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <Heading1 className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <Heading2 className="h-4 w-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('bulletList') ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <List className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('orderedList') ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <ListOrdered className="h-4 w-4" />
                </button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <button
                    type="button"
                    onClick={setLink}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('link') ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-600"
                >
                    <ImageIcon className="h-4 w-4" />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={clsx(
                        'p-2 rounded hover:bg-gray-200 transition-colors',
                        editor.isActive('blockquote') ? 'bg-gray-200 text-black' : 'text-gray-600'
                    )}
                >
                    <Quote className="h-4 w-4" />
                </button>

            </div>


            {/* Editor Content */}
            <EditorContent editor={editor} />

            {/* Media Picker Modal */}
            <MediaPickerModal
                isOpen={isMediaPickerOpen}
                onClose={() => setIsMediaPickerOpen(false)}
                onSelect={handleImageSelect}
            />
        </div>
    );
}
