import { Metadata } from 'next';
import { AboutClient } from './about-client';

export const metadata: Metadata = {
    title: 'Over Ons | NovaForma',
    description: 'Ontdek wie NovaForma is: een samenwerkingsverband van ervaren zorgondernemers en experts, gericht op het realiseren van toekomstbestendige zorgexploitaties.',
};

export default function AboutPage() {
    return <AboutClient />;
}
