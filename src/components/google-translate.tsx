'use client';

import { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';

export default function GoogleTranslate() {
    const [isEnglish, setIsEnglish] = useState(false);

    useEffect(() => {
        // Initialize Google Translate Script
        const addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'nl',
                includedLanguages: 'en',
                autoDisplay: false,
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        };

        // Check for existing cookie to set initial state
        if (document.cookie.includes('googtrans=/nl/en') || document.cookie.includes('googtrans=/auto/en')) {
            setIsEnglish(true);
        }

        // Cleanup script on unmount
        return () => {
            if (document.body.contains(addScript)) {
                document.body.removeChild(addScript);
            }
        };
    }, []);

    const toggleLanguage = () => {
        if (isEnglish) {
            // Switch to Dutch
            // Clear all possible Google Translate cookies to ensure a clean reset
            document.cookie = "googtrans=; path=/; domain=" + document.domain + "; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            setIsEnglish(false);
            window.location.reload();
        } else {
            // Switch to English
            document.cookie = "googtrans=/nl/en; path=/; domain=" + document.domain;
            document.cookie = "googtrans=/nl/en; path=/";
            setIsEnglish(true);
            window.location.reload();
        }
    };

    return (
        <div className="flex items-center gap-2">
            {/* The hidden Google widget container is required for the script to work */}
            <div id="google_translate_element" className="hidden" />

            {/* Custom Language Toggle Button */}
            <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-200 border border-slate-200 group"
                aria-label="Switch Language"
            >
                <Globe className={`w-4 h-4 ${isEnglish ? 'text-slate-400' : 'text-primary'}`} />
                <div className="flex items-center text-sm font-medium">
                    <span className={`${!isEnglish ? 'text-primary font-bold' : 'text-slate-400'}`}>NL</span>
                    <span className="mx-1 text-slate-300">/</span>
                    <span className={`${isEnglish ? 'text-primary font-bold' : 'text-slate-400'}`}>EN</span>
                </div>
            </button>

            {/* Minimal styles to just hide the default widget container, 
                letting the banner behave as Google intends (per user request). */}
            <style jsx global>{`
                #google_translate_element {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}

declare global {
    interface Window {
        google: any;
        googleTranslateElementInit: any;
    }
}
