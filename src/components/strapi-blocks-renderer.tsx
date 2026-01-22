import React from 'react';
import Link from 'next/link';

// Simple renderer for Strapi Blocks (v5 / Blocks Editor)
// You can expand this as needed for more block types (image, code, etc.)

interface TextNode {
    type: 'text';
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}

interface LinkNode {
    type: 'link';
    url: string;
    children: Node[];
}

interface ElementNode {
    type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code';
    level?: number; // for headings
    format?: 'ordered' | 'unordered'; // for lists
    children: Node[];
}

type Node = TextNode | LinkNode | ElementNode;

export const BlocksRenderer = ({ content }: { content: Node[] }) => {
    if (!content || !Array.isArray(content)) return null;

    return (
        <>
            {content.map((block, index) => (
                <Block key={index} node={block} />
            ))}
        </>
    );
};

const Block = ({ node }: { node: Node }) => {
    if (!node) return null;

    switch (node.type) {
        case 'text':
            let textFn = <>{node.text}</>;
            if (node.bold) textFn = <strong>{textFn}</strong>;
            if (node.italic) textFn = <em>{textFn}</em>;
            if (node.underline) textFn = <u>{textFn}</u>;
            if (node.strikethrough) textFn = <s>{textFn}</s>;
            if (node.code) textFn = <code>{textFn}</code>;
            return textFn;

        case 'link':
            return (
                <Link href={node.url} className="text-blue-600 hover:underline">
                    {node.children.map((child, i) => <Block key={i} node={child} />)}
                </Link>
            );

        case 'paragraph':
            return (
                <p className="mb-4 leading-relaxed text-slate-700">
                    {node.children.map((child, i) => <Block key={i} node={child} />)}
                </p>
            );

        case 'heading':
            const level = node.level || 2;
            const sizeClass = {
                1: 'text-3xl font-bold mt-8 mb-4',
                2: 'text-2xl font-bold mt-6 mb-3',
                3: 'text-xl font-bold mt-4 mb-2',
                4: 'text-lg font-bold mt-4 mb-2',
                5: 'text-base font-bold mt-2 mb-1',
                6: 'text-sm font-bold mt-2 mb-1',
            }[level];

            switch (level) {
                case 1: return <h1 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h1>;
                case 2: return <h2 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h2>;
                case 3: return <h3 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h3>;
                case 4: return <h4 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h4>;
                case 5: return <h5 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h5>;
                case 6: return <h6 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h6>;
                default: return <h2 className={`${sizeClass} text-slate-900 font-serif`}>{node.children.map((child, i) => <Block key={i} node={child} />)}</h2>;
            }

        case 'list':
            const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
            return (
                <ListTag className={`mb-4 pl-6 space-y-2 ${node.format === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
                    {node.children.map((child, i) => <Block key={i} node={child} />)}
                </ListTag>
            );

        case 'list-item':
            return (
                <li>
                    {node.children.map((child, i) => <Block key={i} node={child} />)}
                </li>
            );

        case 'quote':
            return (
                <blockquote className="border-l-4 border-slate-300 pl-4 italic my-4 text-slate-600 bg-slate-50 py-2 pr-4 rounded-r">
                    {node.children.map((child, i) => <Block key={i} node={child} />)}
                </blockquote>
            );

        default:
            console.warn('Unknown block type:', node.type);
            // Provide a fallback that tries to render children if possible
            if ('children' in node && Array.isArray(node.children)) {
                return <>{node.children.map((child, i) => <Block key={i} node={child} />)}</>;
            }
            return null;
    }
};
