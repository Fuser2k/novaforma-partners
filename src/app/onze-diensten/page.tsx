import { Metadata } from 'next';
import { ServicesClient } from './services-client';

export const metadata: Metadata = {
    title: 'Onze Diensten | NovaForma',
    description: 'Ontdek onze diensten: van zorginstellingen realiseren en exploiteren tot ons exclusieve digitale portaal voor zorgondernemers.',
};

export default function ServicesPage() {
    return <ServicesClient />;
}
