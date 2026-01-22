import { Metadata } from 'next';
import { ModelClient } from './model-client';

export const metadata: Metadata = {
    title: '7-Stappen Model | NovaForma',
    description: 'Van idee tot realisatie in 7 stappen. Een gegarandeerd proces voor het opzetten van uw WLZ-zorginstelling. Stap voor stap gids.',
};

import { getLandingPageBySlug } from '@/lib/strapi';

export default async function ModelPage() {
    const page = await getLandingPageBySlug('7-stappen-model');

    return (
        <ModelClient
            heroVideoUrl={page?.heroVideoUrl ?? undefined}
            heroImageUrl={page?.heroImageUrl ?? undefined}
            title={page?.title ?? undefined}
            subtitle={page?.subtitle ?? undefined}
        />
    );
}
