import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Phone, FileText, Settings, TrendingUp } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

function HangingBadge({ t, isRTL }) {
    return (
        <div className="flex flex-col items-center w-full md:w-auto">
            {/* Lanyard clip at top */}
            <div className="flex flex-col items-center">
                {/* Metal clip */}
                <div className="w-10 h-5 rounded-t-full bg-gradient-to-b from-gray-400 to-gray-600 border border-gray-500 shadow-inner relative z-10">
                    <div className="absolute inset-x-1 top-1 bottom-0.5 rounded-t-full bg-gradient-to-b from-gray-300 to-gray-500 opacity-60"></div>
                </div>
                {/* Lanyard strings */}
                <svg width="80" height="48" viewBox="0 0 80 48" className="overflow-visible" style={{ marginTop: '-2px' }}>
                    <path
                        d="M 40 0 Q 12 24 14 48"
                        stroke="rgba(249,115,22,0.5)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 40 0 Q 68 24 66 48"
                        stroke="rgba(249,115,22,0.5)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            <div
                className="badge-swing w-[240px] md:w-[260px] glass-panel rounded-2xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.8)] relative transition-transform duration-500 hover:scale-[1.02]"
                style={{
                    background: 'linear-gradient(155deg, #111111 0%, #080808 100%)',
                    rotate: '1.5deg',
                }}
            >
                {/* Top accent stripe */}
                <div className="h-1.5 w-full bg-gradient-to-r from-accent via-orange-400 to-accent"></div>

                {/* Card content */}
                <div className="p-6 flex flex-col items-center gap-4">
                    {/* Org name at top */}
                    <div className="self-stretch flex justify-between items-center">
                        <span className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase">FARGHAL X</span>
                        <span className="font-mono text-[9px] text-gray-600 tracking-widest">ID · FX-001</span>
                    </div>

                    {/* Photo */}
                    <div
                        className="w-full h-auto rounded-xl overflow-hidden border border-white/10 shadow-lg bg-[#0d0d0d] relative"
                    >
                        <img
                            src="/images/portfolio/AhmedPhoto copy.png"
                            alt="Ahmed Farghal"
                            className="w-full h-auto block"
                            style={{ objectPosition: 'center' }}
                            onError={e => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback placeholder */}
                        <div className="absolute inset-0 bg-accent/10 hidden items-center justify-center">
                            <span className="font-drama italic text-4xl text-accent">AF</span>
                        </div>
                    </div>

                    {/* Name & title */}
                    <div className="text-center">
                        <h3 className="font-sans font-bold text-lg text-white leading-tight">
                            {isRTL ? 'أحمد فرغل' : 'Ahmed Farghal'}
                        </h3>
                        <p className="font-mono text-xs text-accent mt-1">
                            {isRTL ? 'مهندس أنظمة ذكاء اصطناعي' : 'AI Systems Builder'}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/8"></div>

                    {/* Footer */}
                    <p className="font-mono text-[10px] text-gray-500 tracking-widest">
                        {isRTL ? 'مؤسس — فرغل إكس' : 'Founder — Farghal X'}
                    </p>
                </div>

                {/* Subtle inner glow */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ boxShadow: 'inset 0 0 40px rgba(249,115,22,0.03)' }}>
                </div>
            </div>
        </div>
    );
}

export default function About() {
    const containerRef = useRef(null);
    const { t, isRTL } = useLanguage();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.intro-elem', {
                y: 40,
                opacity: 0,
                stagger: 0.12,
                duration: 0.9,
                ease: 'power3.out',
                delay: 0.1
            });

            const sections = gsap.utils.toArray('.scroll-reveal');
            sections.forEach(section => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });

            gsap.from('.story-para', {
                y: 20,
                opacity: 0,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.story-container',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, [t]);

    const storyParagraphs = t('about.story_paragraphs') || [];
    const howSteps = t('about.how_steps') || [];
    const beliefs = t('about.beliefs') || [];
    const stepIcons = [Phone, FileText, Settings, TrendingUp];

    return (
        <div ref={containerRef} className="pt-36 pb-32 px-4 md:px-20 max-w-5xl mx-auto min-h-screen">

            {/* 1. Hero — badge on left, headline on right */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start mb-28">

                {/* Hanging Badge */}
                <div className="intro-elem w-full md:w-auto flex justify-center md:justify-start flex-shrink-0 md:-mt-8 md:-ml-6">
                    <HangingBadge t={t} isRTL={isRTL} />
                </div>

                {/* Headline text */}
                <div className="flex-1 flex flex-col justify-center pt-4">
                    <div className="w-3 h-3 bg-accent rounded-full animate-pulse mb-8 shadow-[0_0_15px_rgba(249,115,22,0.6)] intro-elem"></div>
                    <h1 className="intro-elem font-drama italic text-5xl md:text-6xl text-white leading-tight mb-6">
                        {t('about.hero_headline')}
                    </h1>
                    <p className="intro-elem font-mono text-gray-400 text-base leading-relaxed max-w-md">
                        {storyParagraphs[0]}
                    </p>
                </div>
            </div>

            {/* 2. Story — rest of paragraphs */}
            <div className="story-container mb-28">
                <div className="max-w-2xl space-y-6">
                    {Array.isArray(storyParagraphs) && storyParagraphs.slice(1).map((para, i) => (
                        <p
                            key={i}
                            className={`story-para font-sans text-xl leading-relaxed ${i === storyParagraphs.length - 2 ? 'text-white font-bold' : 'text-gray-300'}`}
                        >
                            {para}
                        </p>
                    ))}
                </div>
            </div>

            {/* 3. How I Work */}
            <div className="scroll-reveal mb-28">
                <h2 className="font-sans font-bold text-3xl text-white mb-2 uppercase tracking-wide">
                    {t('about.how_title')}
                </h2>
                <div className="w-12 h-1 bg-accent mb-12 rounded-full"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {Array.isArray(howSteps) && howSteps.map((step, i) => {
                        const Icon = stepIcons[i] || Phone;
                        return (
                            <div key={i} className="relative flex flex-col">
                                {i < howSteps.length - 1 && (
                                    <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent z-0 -translate-y-1/2"></div>
                                )}
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-5 relative z-10">
                                    <Icon className="w-7 h-7 text-accent" />
                                </div>
                                <div className="font-mono text-[10px] text-accent tracking-widest uppercase mb-2">0{i + 1}</div>
                                <h3 className="font-sans font-bold text-lg text-white mb-2">{step.title}</h3>
                                <p className="font-mono text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <p className="font-mono text-sm text-gray-500 mt-10 italic border-t border-white/5 pt-6">
                    {t('about.how_caption')}
                </p>
            </div>

            {/* 4. What I Believe */}
            <div className="scroll-reveal mb-28">
                <h2 className="font-sans font-bold text-3xl text-white mb-2 uppercase tracking-wide">
                    {t('about.beliefs_title')}
                </h2>
                <div className="w-12 h-1 bg-accent mb-12 rounded-full"></div>

                <div className="flex flex-col gap-6">
                    {Array.isArray(beliefs) && beliefs.map((belief, i) => (
                        <div key={i} className="flex items-start gap-5 group">
                            <div className="w-7 h-7 rounded-full bg-accent/5 border border-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-accent/30 transition-colors">
                                <span className="text-accent text-xs font-bold">{i + 1}</span>
                            </div>
                            <p className="font-sans text-xl text-gray-200 leading-relaxed">{belief}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Bottom CTA */}
            <div className="scroll-reveal glass-panel rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#030303] z-0"></div>
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="relative z-10">
                    <h2 className="font-drama italic text-4xl md:text-5xl text-white mb-6 leading-tight">
                        {t('about.cta_title')}
                    </h2>
                    <p className="font-mono text-gray-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed">
                        {t('about.cta_desc')}
                    </p>
                    <MagneticButton
                        className="bg-white text-black font-bold px-10 py-5 rounded-full uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:bg-gray-100 transition-all hover:scale-105 inline-flex items-center gap-3"
                        data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                    >
                        {t('about.cta_button')}
                        <ArrowRight size={18} className={`shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                    </MagneticButton>
                </div>
            </div>

        </div>
    );
}
