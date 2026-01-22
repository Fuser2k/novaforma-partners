import { z } from 'zod';

// ============================================
// AUTHENTICATION SCHEMAS
// ============================================

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const createAdminSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER']),
});

// ============================================
// CONTENT SCHEMAS
// ============================================

export const articleSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    summary: z.string().min(1, 'Summary is required'),
    category: z.string().min(1, 'Category is required').max(100),
    slug: z.string().min(1, 'Slug is required').max(255),
    content: z.any(), // JSON blocks from TipTap
    seoTitle: z.string().max(255).optional().nullable(),
    seoDescription: z.string().optional().nullable(),
    keywords: z.string().optional().nullable(),
    isFeatured: z.boolean().optional().default(false),
    isDraft: z.boolean().optional().default(true),
    publishDate: z.string().optional().nullable(), // ISO date string
    images: z.array(z.object({
        url: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
        order: z.number().optional()
    })).optional(),
});

export const legalPageSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    slug: z.string().min(1, 'Slug is required').max(255),
    content: z.any(), // JSON blocks
});

export const messageSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone is required').max(50),
    sector: z.enum(['WLZ', 'WMO', 'Zvw', 'GGZ', 'Gehandicaptenzorg', 'Jeugdzorg', 'Andere']),
    region: z.string().max(255).optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    termsAccepted: z.boolean().refine(val => val === true, 'You must accept terms'),
});

export const globalSettingsSchema = z.object({
    facebookUrl: z.string().optional().nullable(),
    instagramUrl: z.string().optional().nullable(),
    twitterUrl: z.string().optional().nullable(),
    linkedinUrl: z.string().optional().nullable(),
    phone: z.string().max(50).optional().nullable(),
    email: z.string().email().optional().or(z.literal('')).nullable(),
    address: z.string().optional().nullable(),
    siteName: z.string().max(255).optional().nullable(),
    siteDescription: z.string().optional().nullable(),
});

export const stepSchema = z.object({
    number: z.number().int().min(1).max(100),
    title: z.string().min(1, 'Title is required').max(255),
    summary: z.string().min(1, 'Summary is required'),
    description: z.string().optional(),
    isActive: z.boolean().default(true),
    order: z.number().int().min(0),
});

export const audienceSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
    order: z.number().int().min(0),
    isActive: z.boolean().default(true),
});

export const serviceSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required'),
    icon: z.string().optional(),
    order: z.number().int().min(0),
    isActive: z.boolean().default(true),
});

export const landingPageSchema = z.object({
    slug: z.string().min(1, 'Slug is required').max(255),
    title: z.string().max(255).optional(),
    subtitle: z.string().optional(),
    heroVideoUrl: z.string().url().optional().or(z.literal('')),
    heroImageUrl: z.string().url().optional().or(z.literal('')),
    isActive: z.boolean().default(true),
});

// ============================================
// TYPE EXPORTS
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type ArticleInput = z.infer<typeof articleSchema>;
export type LegalPageInput = z.infer<typeof legalPageSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type GlobalSettingsInput = z.infer<typeof globalSettingsSchema>;
export type StepInput = z.infer<typeof stepSchema>;
export type AudienceInput = z.infer<typeof audienceSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type LandingPageInput = z.infer<typeof landingPageSchema>;
