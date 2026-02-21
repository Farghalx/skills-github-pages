import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const philosophyTextRef = useRef(null);
    const protocolCardsRef = useRef([]);

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

    return (
        <div ref={containerRef} className="pb-20"> {/* pb-20 prevents content hiding under footer */}

            {/* 2. HERO */}
            <section ref={heroRef} className="relative h-[100dvh] w-full flex items-end pb-20 px-4 md:px-20 pt-32">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1920&q=80" alt="Dark Starry Background" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full md:w-2/3">
                    <p className="hero-anim font-mono text-gray-400 text-sm md:text-base mb-6 tracking-widest uppercase font-bold">
                        108.1 FM · ENTREPRENEUR SIGNAL · ON AIR
                    </p>
                    <h1 className="hero-anim font-dot text-5xl md:text-8xl leading-none mb-2 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Automate the</h1>
                    <h2 className="hero-anim font-dot text-6xl md:text-[10rem] text-gray-300 leading-none mb-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">Busywork.</h2>
                    <div className="hero-anim">
                        <MagneticButton
                            className="bg-white text-black font-sans font-bold px-8 py-4 rounded-full text-lg md:text-xl flex items-center gap-3 hover:bg-gray-200 transition-colors"
                            data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                        >
                            Book an AI Systems Diagnostic <ArrowRight size={24} />
                        </MagneticButton>
                    </div>
                </div>
            </section>

            {/* 3. FEATURES */}
            <section className="py-32 px-4 md:px-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="glass-panel rounded-[2rem] p-8 h-[400px] flex flex-col justify-between relative overflow-hidden group shadow-none">
                        <h3 className="font-sans text-2xl font-bold text-white">AI Systems Built in <span className="text-accent underline decoration-4 underline-offset-4 decoration-accent/30">7–14 Days</span></h3>
                        <div className="relative h-48 w-full mt-8">
                            <div className="absolute w-[80%] h-32 bg-[#050505] border border-white/10 rounded-2xl p-4 top-0 left-[10%] shadow-2xl transition-transform group-hover:-translate-y-4 duration-500 ease-out z-30 font-bold text-sm text-gray-300">WhatsApp Lead Responder</div>
                            <div className="absolute w-[80%] h-32 bg-white/5 border border-white/10 rounded-2xl p-4 top-6 left-[10%] scale-95 opacity-80 z-20 font-bold text-sm text-gray-400">Lead Qualification Bot</div>
                            <div className="absolute w-[80%] h-32 bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 top-12 left-[10%] scale-90 opacity-40 z-10 font-bold text-sm text-gray-500">AI Content System</div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-[2rem] p-8 h-[400px] flex flex-col justify-between shadow-none">
                        <h3 className="font-sans text-2xl font-bold text-white">Save 10–30 Hours Per Week</h3>
                        <div className="bg-[#050505]/50 rounded-2xl p-6 font-mono text-sm text-gray-300 relative h-48 flex flex-col justify-end overflow-hidden border border-white/5 shadow-inner">
                            <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-gray-500 font-bold">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> Live Feed
                            </div>
                            <p className="text-gray-400">[SYSTEM] Lead response: 4hr → 60sec</p>
                            <p className="text-gray-400 mt-2">[SYSTEM] Report generation: automated</p>
                            <p className="mt-2 text-white font-bold">[SYSTEM] Follow-up sequences: running<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse align-middle"></span></p>
                        </div>
                    </div>

                    <div className="glass-panel rounded-[2rem] p-8 h-[400px] flex flex-col justify-between overflow-hidden relative group shadow-none">
                        <h3 className="font-sans text-2xl font-bold text-white">One System, One Price, No Scope Creep</h3>
                        <div className="mt-8">
                            <div className="flex justify-between font-mono text-xs text-gray-500 font-bold mb-4 px-2">
                                <span>S</span><span>M</span><span>T</span><span className="text-accent">W</span><span>T</span><span>F</span><span>S</span>
                            </div>
                            <div className="h-24 border border-dashed border-white/20 rounded-xl flex items-center justify-center relative bg-white/5">
                                <span className="font-drama italic text-2xl text-gray-600 group-hover:text-accent transition-colors duration-500">Scheduled.</span>
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
                    <p className="font-mono text-sm text-gray-400 font-bold mb-8 uppercase tracking-widest">Most agencies focus on: adding tools.</p>
                    <div ref={philosophyTextRef} className="font-drama italic text-5xl md:text-8xl leading-tight text-white">
                        {"We focus on: replacing work.".split(' ').map((word, i) => (
                            <span key={i} className={`word inline-block mr-4 ${word.includes('replacing') ? 'text-accent font-sans not-italic font-bold text-6xl md:text-9xl uppercase mx-4 drop-shadow-sm' : ''}`}>
                                {word}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PROTOCOL */}
            <section className="protocol-wrapper py-32 relative bg-background overflow-hidden border-t border-white/5">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-4 md:px-0 relative z-10">
                    {[
                        { step: '01', title: 'DIAGNOSE', desc: 'We map every repetitive process costing you time.', icon: '⭕' },
                        { step: '02', title: 'BUILD', desc: 'One focused n8n system. WhatsApp + AI + your tools.', icon: '⚡' },
                        { step: '03', title: 'DELIVER', desc: 'Live in 7–14 days. You save 10–30 hours a week.', icon: '〰' }
                    ].map((item, i) => (
                        <div
                            key={i}
                            ref={el => protocolCardsRef.current[i] = el}
                            className="h-[60vh] md:h-[80vh] w-full glass-panel rounded-[3rem] p-12 flex flex-col justify-center relative mb-10 shadow-none origin-bottom"
                        >
                            <span className="font-mono text-accent font-bold text-xl mb-4">{item.step}</span>
                            <h3 className="font-sans font-bold text-6xl md:text-8xl mb-6 text-white">{item.title}</h3>
                            <p className="font-drama italic text-3xl md:text-5xl text-gray-400 max-w-2xl">{item.desc}</p>

                            <div className="absolute top-12 right-12 text-[10rem] opacity-[0.03] text-white font-sans">
                                {item.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. PRICING */}
            <section className="py-32 px-4 md:px-20 bg-background relative z-10 border-t border-white/5">
                <h2 className="font-drama italic text-6xl text-center mb-20 text-accent">Transparent Pricing.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    <div className="p-8 rounded-[2rem] glass-panel flex flex-col shadow-none">
                        <h3 className="font-mono text-sm uppercase text-gray-500 font-bold mb-2">Essential</h3>
                        <div className="font-sans font-bold text-4xl mb-6 text-white">RM 3k-5k</div>
                        <ul className="space-y-4 mb-8 flex-1 font-mono text-sm text-gray-400 text-center md:text-left">
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> WhatsApp Lead Responder</li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> 7-day delivery</li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> 1 integrated system</li>
                        </ul>
                        <button
                            className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white transition-colors font-bold uppercase tracking-widest text-sm"
                            data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                        >
                            Select
                        </button>
                    </div>

                    <div className="p-10 rounded-[2rem] border-2 border-accent/50 bg-accent/5 backdrop-blur-xl flex flex-col relative transform md:-translate-y-4 shadow-none">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white font-bold uppercase tracking-widest text-xs px-4 py-1 rounded-full shadow-md">Most Popular</div>
                        <h3 className="font-mono text-sm uppercase text-accent font-bold mb-2">Performance</h3>
                        <div className="font-sans font-bold text-5xl mb-6 text-white">RM 5k-8k</div>
                        <ul className="space-y-4 mb-8 flex-1 font-mono text-sm text-gray-300">
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> AI Content or Lead Qual Bot</li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> 14-day delivery</li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> Priority support</li>
                        </ul>
                        <MagneticButton
                            className="w-full bg-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-none hover:bg-opacity-80 transition-opacity"
                            data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                        >
                            Select Protocol
                        </MagneticButton>
                    </div>

                    <div className="p-8 rounded-[2rem] glass-panel flex flex-col shadow-none">
                        <h3 className="font-mono text-sm uppercase text-gray-500 font-bold mb-2">Enterprise</h3>
                        <div className="font-sans font-bold text-4xl mb-6 text-white">RM 10k+</div>
                        <ul className="space-y-4 mb-8 flex-1 font-mono text-sm text-gray-400">
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> Full Custom Ops Suite</li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> 14-21 day delivery</li>
                            <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-accent" /> Monthly retainer available</li>
                        </ul>
                        <Link to="/about">
                            <button className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white transition-colors font-bold uppercase tracking-widest text-sm">Contact Us</button>
                        </Link>
                    </div>

                </div>
            </section>

        </div>
    );
}
