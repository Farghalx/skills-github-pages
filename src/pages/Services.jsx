import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
    const cardsRef = useRef([]);
    const containerRef = useRef(null);
    const { t } = useLanguage();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.stagger-card', {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const services = t('services.services_list');
    const industries = t('services.industries');

    return (
        <div ref={containerRef} className="pt-40 pb-32 px-4 md:px-20 max-w-7xl mx-auto min-h-screen">

            {/* Header */}
            <div className="text-center mb-20 relative z-10 stagger-card">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse mx-auto mb-6 shadow-[0_0_15px_rgba(249,115,22,0.6)]"></div>
                <h1 className="font-drama italic text-5xl md:text-7xl text-white mb-4">{t('services.page_title')}</h1>
                <p className="font-mono text-sm font-bold text-gray-400 uppercase tracking-widest">{t('services.page_subtitle')}</p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {Array.isArray(services) && services.map((svc, i) => (
                    <div key={i} className="stagger-card glass-panel rounded-[2rem] p-10 shadow-none hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-4xl mb-6 opacity-80">{svc.icon}</div>
                        <h3 className="font-sans font-bold text-2xl text-white mb-4 uppercase tracking-wide">{svc.title}</h3>
                        <p className="font-mono text-sm text-gray-400 leading-relaxed">{svc.desc}</p>
                    </div>
                ))}
            </div>

            {/* Industry Explorer (Dark Edition) */}
            <div className="stagger-card bg-[#050505] border border-white/10 rounded-[3rem] p-12 md:p-20 text-center mb-20 relative overflow-hidden shadow-none">
                <div className="relative z-10">
                    <h2 className="font-drama italic text-4xl md:text-5xl text-accent mb-6">{t('services.industry_title')}</h2>
                    <p className="font-mono text-sm text-gray-400 max-w-2xl mx-auto mb-12">{t('services.industry_desc')}</p>

                    <div className="flex flex-wrap justify-center gap-4 font-mono font-bold text-sm">
                        {Array.isArray(industries) && industries.map((ind, i) => (
                            <span key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 shadow-sm">{ind}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="stagger-card text-center bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-16 shadow-none">
                <h2 className="font-sans font-bold text-3xl text-white mb-4 uppercase">{t('services.cta_title')}</h2>
                <p className="font-mono text-gray-400 mb-10 max-w-xl mx-auto">{t('services.cta_desc')}</p>
                <div className="flex justify-center gap-6 flex-wrap">
                    <MagneticButton
                        className="bg-accent text-white font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm shadow-none hover:bg-opacity-80 transition-opacity"
                        data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                    >
                        {t('services.cta_book')}
                    </MagneticButton>
                    <a href="mailto:ahmed@farghalx.org" className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">
                        {t('services.cta_email')}
                    </a>
                </div>
            </div>

        </div>
    );
}
