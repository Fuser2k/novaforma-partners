'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consented = localStorage.getItem('cookie-consent');
        if (!consented) {
            // Show banner after a short delay for smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-500 fade-in">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-slate-200/50 relative">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <h4 className="font-serif font-bold text-slate-900 mb-2">Çerez Tercihleri</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    Deneyiminizi iyileştirmek için çerezleri (cookies) kullanıyoruz. Detaylı bilgi için <Link href="/cerez-politikasi" className="text-primary hover:underline font-medium">Çerez Politikası</Link>'nı inceleyebilirsiniz.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={handleAccept}
                        className="flex-1 bg-slate-900 text-white py-2.5 px-4 rounded-xl text-sm font-bold hover:bg-slate-800 transition-transform active:scale-95 shadow-lg shadow-slate-900/20"
                    >
                        Kabul Et
                    </button>
                    <button
                        onClick={handleDecline}
                        className="flex-1 bg-slate-100 text-slate-600 py-2.5 px-4 rounded-xl text-sm font-bold hover:bg-slate-200 transition-colors"
                    >
                        Reddet
                    </button>
                </div>
            </div>
        </div>
    );
}
