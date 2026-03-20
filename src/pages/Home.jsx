import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const philosophyTextRef = useRef(null);
    const protocolCardsRef = useRef([]);
    const { t, isRTL } = useLanguage();

    useEffect(() => {
        let ctx = gsap.context(() => {
            // 2. Hero Stagger Reveal
            gsap.from('.hero-anim', {
                y: 40,
                opacity: 0,
                stagger: 0.08,
                duration: 1,
                ease: 'power3.out',
                delay: 0.2
            });

            // 4. Philosophy Word-by-Word Reveal
            if (philosophyTextRef.current) {
                const words = philosophyTextRef.current.querySelectorAll('.word');
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: philosophyTextRef.current,
                        start: 'top 80%',
                        end: 'bottom 50%',
                        scrub: 1,
                    },
                    opacity: 0.1,
                    stagger: 0.1,
                    ease: 'none',
                });
            }

            // 5. Protocol Sticky Cards
            protocolCardsRef.current.forEach((card, index) => {
                if (!card) return;
                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 15%',
                    endTrigger: '.protocol-wrapper',
                    end: 'bottom bottom',
                    pin: true,
                    pinSpacing: false,
                });

                if (index < protocolCardsRef.current.length - 1) {
                    gsap.to(card, {
                        scrollTrigger: {
                            trigger: protocolCardsRef.current[index + 1],
                            start: 'top 60%',
                            end: 'top 20%',
                            scrub: true,
                        },
                        scale: 0.9,
                        filter: 'blur(20px)',
                        opacity: 0.5,
                    });
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const highlightWord = t('home.philosophy_highlight');
    const protocol = t('home.protocol');
    const days = t('home.feature3_days');

    return (
        <div ref={containerRef} className="pb-20"> {/* pb-20 prevents content hiding under footer */}

            {/* 2. HERO */}
            <section ref={heroRef} onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })} className="relative h-[100dvh] w-full flex items-end pb-20 px-4 md:px-20 pt-32">
                <div className="absolute inset-0 z-0 overflow-hidden bg-transparent">
                    <div className="absolute w-[200vw] h-[200vw] md:w-[100vw] md:h-[100vw] -top-[50vw] -left-[50vw] md:-top-[25vw] md:-left-[25vw] opacity-20 animate-[spin_60s_linear_infinite]"
                        style={{
                            background: 'conic-gradient(from 90deg at 50% 50%, #000000 0%, #000000 30%, #F97316 45%, #ea580c 55%, #000000 70%, #000000 100%)',
                            filter: 'blur(100px)'
                        }}></div>
                    <div
                        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none mix-blend-screen hidden md:block opacity-60"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            WebkitMaskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`,
                            maskImage: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, black 0%, transparent 100%)`
                        }}
                    ></div>
                    <div
                        className="absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none mix-blend-screen"
                        style={{
                            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249,115,22,0.15), transparent 80%)`
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full md:w-2/3">
                    <p className="hero-anim font-mono text-gray-400 text-sm md:text-base mb-6 tracking-widest uppercase font-bold">
                        {t('home.hero_subtitle')}
                    </p>
                    <h1 className="hero-anim font-dot text-5xl md:text-8xl leading-none mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{t('home.hero_h1')}</h1>
                    <h2 className="hero-anim font-dot text-6xl md:text-[10rem] text-gray-300 leading-none mb-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{t('home.hero_h2')}</h2>
                    <div className="hero-anim">
                        <MagneticButton
                            className="bg-white text-black font-sans font-bold px-8 py-4 rounded-full text-lg md:text-xl flex items-center gap-2 hover:bg-gray-200 transition-colors whitespace-nowrap"
                            data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                        >
                            <span className="flex items-center gap-2">{t('home.hero_cta')} <ArrowRight size={24} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} /></span>
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* 3. FEATURES (LIGHT THEME) */}
            <section className="py-32 px-4 md:px-20 relative z-10 bg-gray-200 text-gray-900">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-gray-100 border border-gray-300 rounded-[2rem] p-8 h-[400px] flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-sans text-2xl font-bold text-gray-900">{t('home.feature1_title')}<span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/30">{t('home.feature1_highlight')}</span></h3>
                        <div className="relative h-48 w-full mt-8">
                            <div className="absolute w-[80%] h-32 bg-gray-50 border border-gray-200 rounded-2xl p-4 top-0 left-[10%] shadow-xl transition-transform group-hover:-translate-y-4 duration-500 ease-out z-30 font-bold text-sm text-gray-800">{t('home.feature1_card1')}</div>
                            <div className="absolute w-[80%] h-32 bg-gray-100 border border-gray-200 rounded-2xl p-4 top-6 left-[10%] scale-95 opacity-80 z-20 font-bold text-sm text-gray-700">{t('home.feature1_card2')}</div>
                            <div className="absolute w-[80%] h-32 bg-gray-300 border border-gray-400 rounded-2xl p-4 top-12 left-[10%] scale-90 opacity-40 z-10 font-bold text-sm text-gray-600">{t('home.feature1_card3')}</div>
                        </div>
                    </div>

                    <div className="bg-gray-100 border border-gray-300 rounded-[2rem] p-8 h-[400px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-sans text-2xl font-bold text-gray-900">{t('home.feature2_title')}</h3>
                        <div className="bg-gray-200 rounded-2xl p-6 font-mono text-sm text-gray-800 relative h-48 flex flex-col justify-end overflow-hidden border border-gray-300 shadow-inner">
                            <div className="absolute top-4 end-4 flex items-center gap-2 text-xs text-gray-600 font-bold">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> {t('home.feature2_live')}
                            </div>
                            <p className="text-gray-700">{t('home.feature2_line1')}</p>
                            <p className="text-gray-700 mt-2">{t('home.feature2_line2')}</p>
                            <p className="mt-2 text-gray-900 font-bold">{t('home.feature2_line3')}<span className="inline-block w-2 h-4 bg-accent ms-1 animate-pulse align-middle"></span></p>
                        </div>
                    </div>

                    <div className="bg-gray-100 border border-gray-300 rounded-[2rem] p-8 h-[400px] flex flex-col justify-between overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-sans text-2xl font-bold text-gray-900">{t('home.feature3_title')}</h3>
                        <div className="mt-8">
                            <div className="flex justify-between font-mono text-xs text-gray-600 font-bold mb-4 px-2">
                                {Array.isArray(days) && days.map((d, i) => (
                                    <span key={i} className={i === 3 ? 'text-accent' : ''}>{d}</span>
                                ))}
                            </div>
                            <div className="h-24 border border-dashed border-gray-400 rounded-xl flex items-center justify-center relative bg-gray-200">
                                <span className="font-drama italic text-2xl text-gray-500 group-hover:text-accent transition-colors duration-500">{t('home.feature3_scheduled')}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. PHILOSOPHY */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32 px-4 md:px-20 text-center">
                <div className="absolute inset-0 z-0 opacity-10 mix-blend-screen">
                    <img src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1920&q=80" alt="Texture" className="w-full h-full object-cover grayscale invert" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <p className="font-mono text-sm text-gray-400 font-bold mb-8 uppercase tracking-widest">{t('home.philosophy_pre')}</p>
                    <div ref={philosophyTextRef} className="font-drama italic text-5xl md:text-8xl leading-tight text-white">
                        {t('home.philosophy_text').split(' ').map((word, i) => (
                            <span key={i} className={`word inline-block me-4 ${word === highlightWord ? 'text-accent font-sans not-italic font-bold text-6xl md:text-9xl uppercase mx-4 drop-shadow-sm' : ''}`}>
                                {word}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PROTOCOL (LIGHT THEME) */}
            <section className="protocol-wrapper py-32 relative bg-gray-200 overflow-hidden border-t border-gray-300">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-300/50 to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 md:px-0 relative z-10">
                    {Array.isArray(protocol) && protocol.map((item, i) => (
                        <div
                            key={i}
                            ref={el => protocolCardsRef.current[i] = el}
                            className="h-[60vh] md:h-[80vh] w-full bg-gray-100 border border-gray-300 rounded-[3rem] p-12 flex flex-col justify-center relative mb-10 shadow-sm origin-bottom"
                        >
                            <span className="font-mono text-accent font-bold text-xl mb-4">{item.step}</span>
                            <h3 className="font-sans font-bold text-6xl md:text-8xl mb-6 text-gray-900">{item.title}</h3>
                            <p className="font-drama italic text-3xl md:text-5xl text-gray-700 max-w-2xl">{item.desc}</p>

                            <div className="absolute top-12 right-12 text-[10rem] opacity-[0.03] text-black font-sans">
                                {['⭕', '⚡', '〰'][i]}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. BRANDS MARQUEE */}
            <section className="py-20 bg-transparent relative z-10 border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-20 mb-10 text-center">
                    <p className="font-mono text-sm font-bold text-gray-500 uppercase tracking-widest">{t('home.marquee_trust')}</p>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full flex overflow-hidden">
                    {/* Fading Gradients for smooth edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

                    {/* Sliding Track (duplicated content to loop smoothly) */}
                    <div className="flex animate-marquee gap-16 md:gap-32 min-w-[200%] w-max items-center font-drama italic text-3xl md:text-5xl text-gray-700 opacity-50">
                        {/* First Set */}
                        <span>OpenAI</span>
                        <span>Stripe</span>
                        <span>ClickUp</span>
                        <span>Make</span>
                        <span>Tailwind</span>
                        <span>Vercel</span>
                        <span>Supabase</span>

                        {/* Second Set (identical for infinite loop) */}
                        <span>OpenAI</span>
                        <span>Stripe</span>
                        <span>ClickUp</span>
                        <span>Make</span>
                        <span>Tailwind</span>
                        <span>Vercel</span>
                        <span>Supabase</span>
                    </div>
                </div>
            </section>
            <section className="py-32 px-4 md:px-20 bg-transparent relative z-10 border-t border-white/5 flex flex-col justify-center items-center">
                <h2 className="font-drama italic text-6xl text-center mb-12 text-white">{t('home.cta_title')}</h2>
                <MagneticButton
                    className="bg-accent text-white font-sans font-bold px-12 py-6 rounded-full text-2xl shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-opacity-90 transition-all flex items-center gap-4 hover:scale-105 whitespace-nowrap"
                    data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                >
                    <span className="flex items-center gap-4">{t('home.cta_button')} <ArrowRight size={28} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} /></span>
                </MagneticButton>
            </section>

        </div>
    );
}
