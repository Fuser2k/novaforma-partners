'use server';

import { submitMessage, ContactFormData } from '@/lib/strapi';

export async function submitContactForm(data: ContactFormData) {
    return await submitMessage(data);
}
