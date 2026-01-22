import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { getGlobalSettings } from "@/lib/strapi";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaForma Nederland | WLZ Bakım Kuruluşu Danışmanlığı",
  description: "6 ay içinde kendi WLZ bakım kuruluşunuzu kurun. 7 adımlı model ile faal, denetime hazır ve sürdürülebilir bir yapı.",
  icons: {
    icon: '/nova-icon.png',
    shortcut: '/nova-icon.png',
    apple: '/nova-icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings();

  return (
    <html lang="tr">
      <body className={`${outfit.variable} ${playfair.variable} min-h-screen bg-background text-foreground antialiased flex flex-col`}>
        <Providers>
          <Header socials={settings.socials} />
          <main className="flex-1">
            {children}
          </main>
          <Footer socials={settings.socials} contact={settings.contact} />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
