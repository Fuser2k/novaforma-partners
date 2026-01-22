import { prisma } from '@/lib/db';
import SettingsForm from '@/components/admin/SettingsForm';

async function getSettings() {
    const settings = await prisma.globalSettings.findFirst();
    return settings || {};
}

export default async function SettingsPage() {
    const settings = await getSettings();

    return <SettingsForm initialData={settings} />;
}
