import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';

// --- Types (Kept similar to preserve compatibility with components) ---

export interface Step {
    id: string;
    number: number;
    title: string;
    summary: string;
    description?: string | null;
}

export interface Audience {
    id: string;
    title: string;
    description: string;
    benefits: string[];
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon?: string;
}

export interface Article {
    id: string;
    title: string;
    summary: string;
    category: string;
    slug: string;
    publishedAt: string;
    content?: string;
    image?: string;
}

export interface GlobalSettings {
    socials: {
        facebook: string;
        instagram: string;
        twitter: string;
        linkedin: string;
    };
    contact: {
        phone: string;
        email: string;
        address: string;
    };
    siteName?: string;
    siteDescription?: string;
}

export interface LegalPage {
    id: string;
    title: string;
    slug: string;
    content: string;
    updatedAt: string;
}

export interface LandingPage {
    id: string;
    slug: string;
    heroVideoUrl?: string | null;
    heroImageUrl?: string | null;
    title?: string | null;
    subtitle?: string | null;
}

// --- Data Fetchers with Caching ---

export const getSteps = unstable_cache(
    async (): Promise<Step[]> => {
        try {
            const steps = await prisma.step.findMany({
                orderBy: { number: 'asc' },
                where: { isActive: true }
            });
            return steps.map(s => ({
                id: s.id,
                number: s.number,
                title: s.title,
                summary: s.summary,
                description: s.description
            }));
        } catch (error) {
            console.error('Error fetching steps:', error);
            return [];
        }
    },
    ['steps-list'],
    { revalidate: 60, tags: ['steps'] }
);

export const getAudiences = unstable_cache(
    async (): Promise<Audience[]> => {
        try {
            const audiences = await prisma.audience.findMany({
                orderBy: { order: 'asc' },
                where: { isActive: true }
            });

            return audiences.map(a => {
                let benefits: string[] = [];
                try {
                    if (typeof a.benefits === 'string') {
                        benefits = JSON.parse(a.benefits);
                    } else if (Array.isArray(a.benefits)) {
                        benefits = a.benefits;
                    }
                } catch (e) {
                    benefits = [];
                }

                return {
                    id: a.id,
                    title: a.title,
                    description: a.description,
                    benefits
                };
            });
        } catch (error) {
            console.error('Error fetching audiences:', error);
            return [];
        }
    },
    ['audiences-list'],
    { revalidate: 60, tags: ['audiences'] }
);

export const getGlobalSettings = unstable_cache(
    async (): Promise<GlobalSettings> => {
        try {
            const settings = await prisma.globalSettings.findFirst();

            if (!settings) {
                return {
                    socials: { facebook: '', instagram: '', twitter: '', linkedin: '' },
                    contact: { phone: '', email: '', address: '' }
                };
            }

            return {
                socials: {
                    facebook: settings.facebookUrl || '',
                    instagram: settings.instagramUrl || '',
                    twitter: settings.twitterUrl || '',
                    linkedin: settings.linkedinUrl || ''
                },
                contact: {
                    phone: settings.phone || '',
                    email: settings.email || '',
                    address: settings.address || ''
                },
                siteName: settings.siteName || '',
                siteDescription: settings.siteDescription || ''
            };
        } catch (error) {
            console.error('Error fetching settings:', error);
            return {
                socials: { facebook: '', instagram: '', twitter: '', linkedin: '' },
                contact: { phone: '', email: '', address: '' }
            };
        }
    },
    ['global-settings'],
    { revalidate: 60, tags: ['settings'] }
);

export const getArticles = unstable_cache(
    async (): Promise<Article[]> => {
        try {
            const articles = await prisma.article.findMany({
                where: {
                    deletedAt: null,
                    isDraft: false,
                },
                orderBy: {
                    publishDate: 'desc'
                },
                include: {
                    images: {
                        where: { order: 0 },
                        take: 1
                    }
                }
            });

            console.log(`[getArticles] Found ${articles.length} published articles`);

            return articles.map(a => ({
                id: a.id,
                title: a.title,
                summary: a.summary,
                category: a.category,
                slug: a.slug,
                publishedAt: (a.publishDate || a.createdAt).toISOString(),
                content: a.content,
                image: a.images[0]?.url || ''
            }));
        } catch (error) {
            console.error('Error fetching articles:', error);
            return [];
        }
    },
    ['articles-list'],
    { revalidate: 1, tags: ['articles'] } // Cache valid for only 1 second during debug
);


// Note: Dynamic routes with params need the slug in the cache key
export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    return unstable_cache(
        async (slug: string) => {
            try {
                const article = await prisma.article.findUnique({
                    where: { slug },
                    include: {
                        images: {
                            orderBy: { order: 'asc' }
                        }
                    }
                });

                if (!article || article.deletedAt || article.isDraft) return null;

                return {
                    id: article.id,
                    title: article.title,
                    summary: article.summary,
                    category: article.category,
                    slug: article.slug,
                    publishedAt: article.publishDate?.toISOString() || article.createdAt.toISOString(),
                    content: article.content,
                    image: article.images[0]?.url || ''
                };
            } catch (error) {
                console.error('Error fetching article:', error);
                return null;
            }
        },
        [`article-${slug}`],
        { revalidate: 60, tags: [`article-${slug}`] }
    )(slug);
};

export const getLegalPageBySlug = async (slug: string): Promise<LegalPage | null> => {
    return unstable_cache(
        async (slug: string) => {
            try {
                const page = await prisma.legalPage.findUnique({
                    where: { slug }
                });

                if (!page || page.deletedAt) return null;

                return {
                    id: page.id,
                    title: page.title,
                    slug: page.slug,
                    content: page.content,
                    updatedAt: page.updatedAt.toISOString()
                };
            } catch (error) {
                return null;
            }
        },
        [`legal-${slug}`],
        { revalidate: 60, tags: [`legal-${slug}`] }
    )(slug);
};

export const getLandingPageBySlug = async (slug: string): Promise<LandingPage | null> => {
    return unstable_cache(
        async (slug: string) => {
            try {
                const page = await prisma.landingPage.findUnique({
                    where: { slug }
                });

                if (!page || !page.isActive) return null;

                return {
                    id: page.id,
                    slug: page.slug,
                    title: page.title,
                    subtitle: page.subtitle,
                    heroVideoUrl: page.heroVideoUrl,
                    heroImageUrl: page.heroImageUrl
                };
            } catch (error) {
                return null;
            }
        },
        [`landing-${slug}`],
        { revalidate: 60, tags: [`landing-${slug}`] }
    )(slug);
};

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    sector: string;
    region?: string;
    message: string;
    termsAccepted: boolean;
}

export const submitMessage = async (data: ContactFormData) => {
    try {
        await prisma.message.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                sector: data.sector,
                region: data.region,
                message: data.message,
                termsAccepted: data.termsAccepted
            }
        });
        return { success: true };
    } catch (error) {
        console.error('Error submitting message:', error);
        throw error;
    }
};
