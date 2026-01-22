'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { submitContactForm } from '@/app/actions';

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        sector: '',
        region: '',
        message: '',
        termsAccepted: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await submitContactForm(formData);
            setIsSuccess(true);
            setFormData({
                name: '', email: '', phone: '', sector: '', region: '', message: '', termsAccepted: false
            });
        } catch (err) {
            console.error(err);
            setError('Er is een fout opgetreden. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-[#1E293B]/60 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-slate-700/50 text-center">
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                    <Check className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Uw bericht is ontvangen!</h3>
                <p className="text-slate-300 mb-8">
                    Bedankt voor uw bericht. Ons team neemt zo spoedig mogelijk contact met u op.
                </p>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                >
                    Nieuw Formulier Invullen
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#1E293B]/60 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-700/50">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2 font-serif">
                    Plan een Kennismakingsgesprek
                </h2>
                <p className="text-slate-400 text-sm">
                    Vul het formulier in voor een online gesprek of om uw plannen te bespreken onder het genot van een kop koffie.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Naam & Achternaam</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Uw naam en achternaam"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-white placeholder:text-slate-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">E-mailadres</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="voorbeeld@bedrijf.nl"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-white placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Telefoonnummer</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            placeholder="+31 6 1234 5678"
                            required
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-white placeholder:text-slate-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Voorkeurssector</label>
                        <div className="relative">
                            <select
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-white appearance-none"
                            >
                                <option value="" className="bg-slate-800 text-slate-400">Maak een keuze</option>
                                <option value="WLZ" className="bg-slate-800">WLZ (Langdurige Zorg)</option>
                                <option value="WMO" className="bg-slate-800">WMO (Maatschappelijke Ondersteuning)</option>
                                <option value="Zvw" className="bg-slate-800">Zvw (Zorgverzekeringswet)</option>
                                <option value="GGZ" className="bg-slate-800">GGZ (Geestelijke Gezondheidszorg)</option>
                                <option value="Gehandicaptenzorg" className="bg-slate-800">Gehandicaptenzorg</option>
                                <option value="Jeugdzorg" className="bg-slate-800">Jeugdzorg</option>
                                <option value="Overig" className="bg-slate-800">Overig</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Regio (Optioneel)</label>
                    <input
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        type="text"
                        placeholder="Bijv. Amsterdam, Rotterdam"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-white placeholder:text-slate-500"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Uw Bericht</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Korte toelichting op uw plannen..."
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-white placeholder:text-slate-500 resize-none"
                    ></textarea>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                    <div className="flex items-center h-5">
                        <input
                            id="kvkk"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleCheckboxChange}
                            type="checkbox"
                            required
                            className="h-4 w-4 text-blue-500 border-slate-600 rounded focus:ring-blue-500 bg-slate-800"
                        />
                    </div>
                    <label htmlFor="kvkk" className="text-sm text-slate-400">
                        Ik ga akkoord met de verwerking van mijn persoonsgegevens. <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">Privacybeleid</a>
                    </label>
                </div>

                {error && <div className="text-red-400 text-sm font-medium bg-red-900/20 p-3 rounded-lg border border-red-900/50">{error}</div>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                    {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                        <>
                            Afspraak Maken <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
