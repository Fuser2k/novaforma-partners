import { Metadata } from 'next';
import { ContactClient } from './contact-client';
import { getGlobalSettings } from '@/lib/strapi';

export const metadata: Metadata = {
    title: 'Contact | NovaForma',
    description: 'Neem contact op met NovaForma Partners voor al uw vragen over zorgexploitatie en ons dienstenaanbod.',
};

export default async function ContactPage() {
    const settings = await getGlobalSettings();
    return <ContactClient contact={settings?.contact} />;
}
