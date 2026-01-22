'use client';

import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { GlobalSettings } from '@/lib/strapi';

export function Footer({ socials, contact }: { socials?: GlobalSettings['socials'], contact?: GlobalSettings['contact'] }) {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight">NovaForma</h3>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Strategisch partner voor zorgondernemers in Nederland. End-to-end ontwikkeling en advies voor WLZ-zorginstellingen.
                        </p>
                        <div className="flex space-x-4 pt-4">
                            {socials?.facebook && (
                                <Link href={socials.facebook} target="_blank" className="hover:text-blue-400 transition-colors"><Facebook className="h-5 w-5" /></Link>
                            )}
                            {socials?.instagram && (
                                <Link href={socials.instagram} target="_blank" className="hover:text-pink-400 transition-colors"><Instagram className="h-5 w-5" /></Link>
                            )}
                            {socials?.twitter && (
                                <Link href={socials.twitter} target="_blank" className="hover:text-white transition-colors">
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Menu Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Bedrijf</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/7-stappen-model" className="hover:text-white transition-colors">7-Stappen Model</Link></li>
                            <li><Link href="/voor-wie" className="hover:text-white transition-colors">Voor Wie</Link></li>
                            <li><Link href="/onze-diensten" className="hover:text-white transition-colors">Onze Diensten</Link></li>
                            <li><Link href="/over-ons" className="hover:text-white transition-colors">Over Ons</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 shrink-0 text-blue-500 mt-0.5" />
                                <span className="text-slate-400">{contact?.address || "Amsterdam, Nederland"}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 shrink-0 text-blue-500" />
                                <span className="text-slate-400">{contact?.phone || "+31 (0) 20 123 4567"}</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 shrink-0 text-blue-500" />
                                <span className="text-slate-400">{contact?.email || "info@novaforma.nl"}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Legal / Disclaimer */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Juridische Informatie</h4>
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                NovaForma is geen zorgverlener, maar biedt ontwikkeling, strategie en implementatiecoördinatie voor zorginitiatieven. Wij bieden geen medische diensten.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} NovaForma Partners. Alle rechten voorbehouden.</p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 mt-4 md:mt-0">
                        <Link href="/privacyverklaring" className="hover:text-white transition-colors">Privacyverklaring</Link>
                        <Link href="/algemene-voorwaarden" className="hover:text-white transition-colors">Algemene Voorwaarden</Link>
                        <Link href="/cookiebeleid" className="hover:text-white transition-colors">Cookiebeleid</Link>
                        <Link href="/colofon" className="hover:text-white transition-colors">Colofon</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
