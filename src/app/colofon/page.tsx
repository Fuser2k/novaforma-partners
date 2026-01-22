import { BlocksRenderer } from '@/components/strapi-blocks-renderer';
import type { Metadata } from 'next';
import { getLegalPageBySlug } from '@/lib/strapi';
import { Mail, MapPin, Phone } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Colofon | NovaForma',
    description: 'NovaForma bedrijfsgegevens en wettelijke vermeldingen.',
};

export default async function ImpressumPage() {
    const page = await getLegalPageBySlug('colofon');

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">{page?.title || 'Colofon'}</h1>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-slate-800">
                    {page?.content ? (
                        Array.isArray(page.content) ? (
                            <div className="prose prose-slate max-w-none">
                                <BlocksRenderer content={page.content} />
                            </div>
                        ) : (
                            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
                        )
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 font-serif">Bedrijfsgegevens</h3>
                                    <p className="font-medium text-lg mb-2">NovaForma Partners B.V.</p>
                                    <div className="space-y-3 text-slate-600">
                                        <div className="flex items-start">
                                            <MapPin className="w-5 h-5 mr-3 mt-1 text-primary flex-shrink-0" />
                                            <span>
                                                Keizersgracht 123<br />
                                                1015 CJ Amsterdam<br />
                                                Nederland
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 mr-3 text-primary" />
                                            <span>+31 (0) 20 123 4567</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Mail className="w-5 h-5 mr-3 text-primary" />
                                            <span>info@novaforma.nl</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-4 font-serif">Wettelijke Registraties</h3>
                                    <ul className="space-y-3 text-slate-600">
                                        <li className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="font-semibold">KvK-nummer:</span>
                                            <span>87654321</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="font-semibold">BTW-nummer:</span>
                                            <span>NL87654321B01</span>
                                        </li>
                                        <li className="flex justify-between border-b border-slate-100 pb-2">
                                            <span className="font-semibold">Algemeen Directeur:</span>
                                            <span>Ahmet Yılmaz</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-slate-100 prose prose-slate max-w-none">
                                <h3>Auteursrecht en Aansprakelijkheid</h3>
                                <p>
                                    De inhoud van deze website is auteursrechtelijk beschermd. Ongeautoriseerd gebruik is verboden.
                                    Wij zijn niet verantwoordelijk voor de inhoud van externe links.
                                </p>
                                <p>
                                    Platform voor onlinegeschillenbeslechting (ODR) van de Europese Commissie: <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/consumers/odr</a>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
