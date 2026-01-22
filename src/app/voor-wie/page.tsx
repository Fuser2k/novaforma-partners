import { Metadata } from 'next';
import { AudienceClient } from './audience-client';

export const metadata: Metadata = {
    title: 'Voor Wie | NovaForma',
    description: 'Voor ondernemers, zorginstellingen en investeerders. Ontdek wat NovaForma voor uw specifieke situatie kan betekenen.',
};

export default function AudiencePage() {
    return <AudienceClient />;
}
