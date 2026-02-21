import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { Link } from 'react-router-dom';

export default function About() {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.reveal-elem', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.1
            });

            // Floating animation for the badge
            gsap.to('.floating-badge', {
                y: -15,
                rotation: 2,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: 'sine.inOut'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="pt-32 pb-32 px-4 md:px-20 max-w-7xl mx-auto min-h-screen">

            {/* Profile / Badge Section */}
            <div className="flex flex-col md:flex-row gap-16 items-center md:items-start mb-32 reveal-elem">

                {/* Left: Text & Title */}
                <div className="flex-1 text-center md:text-left">
                    <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center text-accent font-drama italic text-4xl mb-8 mx-auto md:mx-0 border border-accent/20">FX</div>
                    <h1 className="font-drama italic text-6xl md:text-8xl text-white mb-4">Farghal X</h1>
                    <p className="font-mono font-bold text-accent uppercase tracking-widest mb-8">Lead AI Architect • System Builder</p>
                    <p className="font-sans text-gray-400 leading-relaxed text-lg max-w-xl">
                        I don't just talk about AI; I build it. Based in Kuala Lumpur, I specialize in architecting n8n workflows that connect your existing tools to custom AI agents. From automated WhatsApp lead responders to deep content generation pipelines, I replace busywork with logic.
                    </p>
                    <div className="mt-10 flex gap-4 justify-center md:justify-start">
                        <a href="mailto:ahmed@farghalx.org" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border border-white/20 text-white rounded-full font-bold shadow-sm hover:bg-white/5 hover:border-accent transition-colors">
                            <span className="text-xl">✉</span> Email
                        </a>
                        <a href="https://github.com/AhmedFarghal25" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border border-white/20 text-white rounded-full font-bold shadow-sm hover:bg-white/5 hover:border-white transition-colors">
                            <span className="text-xl">⌨</span> GitHub
                        </a>
                    </div>
                </div>

                {/* Right: ID Badge */}
                <div className="w-full md:w-80 flex flex-col items-center">
                    <div className="w-3 h-32 bg-accent rounded-t-full shadow-lg z-0 relative top-2"></div>
                    <div className="floating-badge glass-panel rounded-2xl p-6 shadow-none w-full relative z-10">
                        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                            <span className="font-bold text-white text-sm tracking-widest">● FARGHALX</span>
                            <span className="font-mono text-gray-400 text-xs">ID: FX-001</span>
                        </div>
                        <div className="w-full h-48 bg-[#050505] rounded-lg mb-6 flex items-center justify-center border border-white/10 overflow-hidden relative">
                            <img src="https://images.unsplash.com/photo-1555529733-0e3707920804?w=800&q=80" alt="Abstract Code" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay"></div>
                        </div>
                        <div className="text-center">
                            <h3 className="font-drama italic text-2xl text-accent mb-1">Ahmed Farghal</h3>
                            <p className="font-mono text-xs font-bold text-gray-500 uppercase">System Architect</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Skills Grid */}
            <h2 className="reveal-elem font-sans font-bold text-3xl mb-12 text-center text-white uppercase">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-32">
                {['n8n & Make.com', 'OpenAI & Claude APIs', 'React / Tailwind', 'Node.js & Python'].map((skill, i) => (
                    <div key={i} className="reveal-elem glass-panel rounded-2xl p-6 text-center shadow-none hover:border-accent transition-colors">
                        <span className="font-mono font-bold text-sm text-white">{skill}</span>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                {[
                    { num: '30+', label: 'Workflows Built' },
                    { num: '500h', label: 'Saved Monthly' },
                    { num: '100%', label: 'Uptime Systems' },
                    { num: '7d', label: 'Avg Delivery' }
                ].map((stat, i) => (
                    <div key={i} className="reveal-elem text-center">
                        <div className="font-drama italic text-5xl text-accent mb-2">{stat.num}</div>
                        <div className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Call to Action */}
            <div className="reveal-elem glass-panel rounded-[3xl] p-16 text-center shadow-none">
                <h2 className="font-drama italic text-4xl text-white mb-6">Let's build your AI workforce.</h2>
                <p className="font-mono text-gray-400 max-w-2xl mx-auto mb-10">Whether you need a custom knowledge base, a lead qualifying agent, or an entire content engine, I can build the backend to run it seamlessly.</p>
                <Link to="/services">
                    <MagneticButton className="bg-white text-black font-bold px-8 py-4 rounded-full uppercase tracking-widest text-sm inline-flex items-center gap-2 hover:bg-gray-200 transition-colors">
                        View Pricing <ArrowRight size={18} />
                    </MagneticButton>
                </Link>
            </div>

        </div>
    );
}
