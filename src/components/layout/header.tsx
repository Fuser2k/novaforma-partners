'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Facebook, Instagram, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { GlobalSettings } from '@/lib/strapi';
import GoogleTranslate from '@/components/google-translate';

const NAVIGATION = [
    { name: 'Home', href: '/' },
    { name: '7-Stappen Model', href: '/7-stappen-model' },
    { name: 'Voor Wie', href: '/voor-wie' },
    { name: 'Onze Diensten', href: '/onze-diensten' },
    { name: 'Blog', href: '/blog' },
    { name: 'Over Ons', href: '/over-ons' },
];

export function Header({ socials }: { socials?: GlobalSettings['socials'] }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300">
            <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center space-x-2 z-50 group">
                    <span className="text-3xl font-serif font-bold tracking-tight text-[#004e98] group-hover:opacity-90 transition-opacity">
                        NovaForma <span className="text-slate-400 font-sans font-light text-sm ml-1 tracking-widest">PARTNERS</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex flex-1 items-center justify-center space-x-8 text-base font-medium">
                    {NAVIGATION.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary font-semibold" : "text-slate-600"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden lg:flex items-center space-x-4">
                    <div className="flex items-center space-x-3 mr-4 border-r border-slate-200 pr-4">
                        {/* Google Translate Widget */}
                        <div className="mr-4">
                            <GoogleTranslate />
                        </div>

                        {socials?.facebook && (
                            <Link href={socials.facebook} target="_blank" className="text-slate-400 hover:text-[#1877F2] transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        )}
                        {socials?.instagram && (
                            <Link href={socials.instagram} target="_blank" className="text-slate-400 hover:text-[#E4405F] transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        )}
                        {socials?.twitter && (
                            <Link href={socials.twitter} target="_blank" className="text-slate-400 hover:text-black transition-colors">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                            </Link>
                        )}
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Afspraak Maken
                    </Link>
                </div>


                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-600 hover:text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg py-4 px-4 flex flex-col space-y-4 animate-in slide-in-from-top-2">
                    {NAVIGATION.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "block text-base font-medium py-2 px-2 rounded-md hover:bg-slate-50",
                                pathname === item.href ? "text-primary bg-blue-50" : "text-slate-600"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Mobile Translate */}
                    <div className="px-2 py-2">
                        <GoogleTranslate />
                    </div>

                    <div className="pt-4 flex flex-col space-y-3 border-t border-slate-100 mt-2">
                        <Link
                            href="/contact"
                            className="w-full text-center py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Afspraak Maken
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
