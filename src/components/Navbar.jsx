import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef(null);
    const location = useLocation();
    const { t, language, setLanguage } = useLanguage();

    useEffect(() => {
        // ScrollTrigger removed to preserve solid navbar background
    }, [location.pathname]);

    const navLinks = [
        { name: t('nav.home'), path: '/' },
        { name: t('nav.services'), path: '/services' },
        { name: t('nav.portfolio'), path: '/portfolio' },
        { name: t('nav.blog'), path: '/blog' }
    ];

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <nav ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-max rounded-full border border-white/20 bg-[#0A0A0A] px-6 py-4 flex items-center justify-between z-50 transition-all duration-300 shadow-2xl">
            <Link to="/" className="font-drama text-2xl italic tracking-wider text-white">FX</Link>

            <div className="hidden md:flex items-center gap-8 px-8 font-mono text-sm !text-gray-100 font-bold">
                {navLinks.map((item) => (
                    item.external ? (
                        <a
                            key={item.path}
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                        >
                            {item.name}
                        </a>
                    ) : (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`hover:!text-accent transition-colors ${location.pathname === item.path ? '!text-accent font-bold' : '!text-gray-100'}`}
                        >
                            {item.name}
                        </Link>
                    )
                ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
                <button
                    onClick={toggleLanguage}
                    className="font-mono text-sm font-bold px-4 py-1.5 rounded-full border border-white/20 text-white hover:border-accent hover:text-accent transition-colors"
                >
                    {language === 'en' ? 'عربي' : 'EN'}
                </button>
                <MagneticButton
                    className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                >
                    {t('nav.book_cta')}
                </MagneticButton>
            </div>

            <button className="md:hidden text-white relative z-50" onClick={() => setIsNavOpen(!isNavOpen)}>
                {isNavOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Menu */}
            {isNavOpen && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col gap-6 shadow-2xl md:hidden">
                    {navLinks.map((item) => (
                        item.external ? (
                            <a
                                key={item.path}
                                href={item.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white font-mono text-lg hover:text-accent font-bold"
                                onClick={() => setIsNavOpen(false)}
                            >
                                {item.name}
                            </a>
                        ) : (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-white font-mono text-lg hover:text-accent font-bold"
                                onClick={() => setIsNavOpen(false)}
                            >
                                {item.name}
                            </Link>
                        )
                    ))}
                    <button
                        onClick={() => { toggleLanguage(); setIsNavOpen(false); }}
                        className="text-white font-mono text-lg hover:text-accent font-bold text-start"
                    >
                        {language === 'en' ? 'عربي' : 'EN'}
                    </button>
                    <button
                        className="bg-white text-black font-bold text-center px-6 py-4 rounded-full text-sm w-full"
                        data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                        onClick={() => setIsNavOpen(false)}
                    >
                        {t('nav.book_cta')}
                    </button>
                </div>
            )}
        </nav>
    );
}
