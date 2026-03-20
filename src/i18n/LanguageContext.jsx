import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from './en.json';
import ar from './ar.json';

const translations = { en, ar };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(() => {
        return localStorage.getItem('lang') || 'en';
    });

    const dir = language === 'ar' ? 'rtl' : 'ltr';
    const isRTL = language === 'ar';

    const setLanguage = useCallback((lang) => {
        setLanguageState(lang);
        localStorage.setItem('lang', lang);
    }, []);

    useEffect(() => {
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
    }, [language, dir]);

    const t = useCallback((key) => {
        const keys = key.split('.');
        let result = translations[language];
        for (const k of keys) {
            result = result?.[k];
        }
        return result ?? key;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
}
