import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  Search, 
  Wrench, 
  Clock, 
  MessageCircle, 
  Filter, 
  Mail, 
  BarChart, 
  Bot, 
  ChevronDown, 
  ChevronUp,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [isOpen]);

  return (
    <div className="border border-white/10 rounded-2xl mb-4 overflow-hidden bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-white/5 focus:outline-none"
      >
        <span className="font-sans font-bold text-lg text-white">{question}</span>
        {isOpen ? <ChevronUp className="text-accent flex-shrink-0 ml-4" /> : <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" />}
      </button>
      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden px-6">
        <p className="font-mono text-gray-400 pb-6">{answer}</p>
      </div>
    </div>
  );
};

export default function Services() {
  const containerRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Intro animations
      gsap.from('.stagger-intro', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1
      });

      // Scroll trigger for standard sections
      const sections = gsap.utils.toArray('.scroll-section');
      sections.forEach(section => {
        gsap.from(section, {
          y: 60,
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


    }, containerRef);
    return () => ctx.revert();
  }, [t]);

  const howItWorksSteps = t('services.how_it_works_steps') || [];
  const systems = t('services.systems') || [];
  const ladderSteps = t('services.ladder_steps') || [];
  const whyAutoPoints = t('services.why_auto_points') || [];
  const faqs = t('services.faqs') || [];

  return (
    <div ref={containerRef} className="pt-40 pb-32 px-4 md:px-20 max-w-7xl mx-auto min-h-screen">
      
      {/* 1. Hero Section */}
      <div className="text-center mb-32 relative z-10">
        <div className="w-3 h-3 bg-accent rounded-full animate-pulse mx-auto mb-6 shadow-[0_0_15px_rgba(249,115,22,0.6)] stagger-intro"></div>
        <h1 className="font-drama italic text-5xl md:text-7xl text-white mb-6 stagger-intro">
          {t('services.hero_headline')}
        </h1>
        <p className="font-mono text-lg text-gray-400 max-w-3xl mx-auto mb-10 stagger-intro">
          {t('services.hero_subheadline')}
        </p>
        <div className="stagger-intro flex justify-center">
            <MagneticButton
                className="bg-accent text-white font-bold px-10 py-5 rounded-full uppercase tracking-widest text-sm shadow-none hover:bg-opacity-80 transition-opacity"
                data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
            >
                {t('services.hero_cta')}
            </MagneticButton>
        </div>
      </div>

      {/* 2. How It Works (3 Steps) */}
      <div className="scroll-section mb-32">
        <h2 className="font-sans font-bold text-3xl text-center text-white mb-16 uppercase tracking-wide">
          {t('services.how_it_works_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
          
          {Array.isArray(howItWorksSteps) && howItWorksSteps.map((step, i) => {
            const icons = [<Search className="w-8 h-8 text-accent" />, <Wrench className="w-8 h-8 text-accent" />, <Clock className="w-8 h-8 text-accent" />];
            return (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-8 glass-panel rounded-3xl group hover:scale-105 transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 backdrop-blur-sm"></div>
                  <div className="relative z-10">{icons[i] || <ArrowRight className="w-8 h-8 text-accent" />}</div>
                </div>
                <div className="font-mono text-accent text-xs font-bold mb-4 tracking-[0.2em]">0{i+1}</div>
                <h3 className="font-sans font-bold text-2xl text-white mb-4">{step.title}</h3>
                <p className="font-mono text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Services Grid (5 Cards) */}
      <div className="scroll-section mb-32 cards-container" id="systems">
        <h2 className="font-sans font-bold text-3xl text-center text-white mb-16 uppercase tracking-wide">
          {t('services.grid_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(systems) && systems.map((sys, i) => {
            const sysIcons = [
              <MessageCircle className="w-8 h-8 text-white" />,
              <Filter className="w-8 h-8 text-white" />,
              <Mail className="w-8 h-8 text-white" />,
              <BarChart className="w-8 h-8 text-white" />,
              <Bot className="w-8 h-8 text-white" />
            ];
            const isLast = i === 4;
            
            return (
              <div key={i} className={`glass-panel rounded-3xl p-8 md:p-10 flex flex-col h-full hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group border-white/5`}>
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {sysIcons[i] || <Zap className="w-8 h-8 text-accent" />}
                </div>
                <h3 className="font-sans font-bold text-2xl text-white mb-4 leading-tight group-hover:text-accent transition-colors">{sys.name}</h3>
                <p className="font-mono text-sm text-gray-400 mb-8 leading-relaxed italic border-s-2 border-accent/20 ps-4">{sys.desc}</p>
                
                <div className="mb-8 p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <ul className="space-y-4">
                    {sys.points && sys.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start font-mono text-[11px] text-gray-400">
                        <span className="text-accent/50 mr-3 mt-0.5">▹</span>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Pricing</p>
                    <p className="font-mono text-[10px] text-gray-400 font-bold">{sys.custom_price}</p>
                  </div>
                  <button 
                    data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                    className="w-full py-4 rounded-full bg-white text-black hover:bg-gray-100 transition-all font-mono text-xs font-bold tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:scale-[1.02]"
                  >
                    Book a Free Call
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Value Ladder Section */}
      <div className="scroll-section mb-32 relative overflow-hidden glass-panel rounded-[3rem] p-10 md:p-20 text-center shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#030303] z-0"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <h2 className="font-drama italic text-3xl md:text-4xl text-white mb-6 relative z-10 max-w-3xl mx-auto leading-tight">
          {t('services.value_ladder_title')}
        </h2>
        
        <div className="mt-16 flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 max-w-4xl mx-auto relative z-10">
          {Array.isArray(ladderSteps) && ladderSteps.map((step, i) => (
            <div key={i} className="w-full md:w-1/3 flex flex-col justify-end" style={{ minHeight: window.innerWidth > 768 ? `${200 + (i * 60)}px` : 'auto' }}>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-t-3xl md:rounded-b-none p-6 md:p-8 h-full flex flex-col items-center justify-center gap-4 transition-all hover:-translate-y-2 relative group overflow-hidden shadow-2xl">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t ${i===2 ? 'from-accent/20' : 'from-white/5'} to-transparent`}></div>
                <div className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border z-10 ${i===2 ? 'border-accent/40 text-accent shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'border-white/10 text-gray-500'}`}>{step.badge}</div>
                <div className="font-drama italic text-2xl text-white text-center z-10 group-hover:scale-105 transition-transform">{step.step}</div>
                <div className="font-mono text-xs text-gray-400 text-center z-10">{step.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Why Automation Beats Hiring */}
      <div className="scroll-section mb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans font-bold text-3xl text-white mb-4 uppercase tracking-wide">
            {t('services.why_auto_title')}
          </h2>
          <p className="font-mono text-gray-400 mb-12">{t('services.why_auto_desc')}</p>
        </div>
        <div className="max-w-xl mx-auto flex flex-col gap-4">
          {Array.isArray(whyAutoPoints) && whyAutoPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-5 p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-white/10 transition-all hover:bg-white/[0.04] group shadow-xl">
              <div className="w-10 h-10 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/10 transition-colors">
                <span className="text-accent text-lg font-bold">✓</span>
              </div>
              <span className="font-mono text-gray-200 text-sm leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <button
            data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
            className="bg-accent text-white font-bold px-10 py-5 rounded-full uppercase tracking-widest text-sm hover:bg-opacity-80 transition-opacity"
          >
            Book a Free Call
          </button>
        </div>
      </div>

      {/* 6. Social Proof / Case Studies */}
      <div className="scroll-section mb-32 text-center">
        <h2 className="font-sans font-bold text-3xl text-white mb-8 uppercase tracking-wide">
          {t('services.case_studies_title')}
        </h2>
        <div className="flex justify-center mt-8">
             <Link to="/portfolio" className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full text-white hover:text-accent hover:border-accent/50 font-mono text-sm group transition-all">
                <span>View Real Case Studies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </Link>
        </div>
      </div>

      {/* 7. FAQ Section */}
      <div className="scroll-section mb-32 max-w-3xl mx-auto">
        <h2 className="font-sans font-bold text-3xl text-center text-white mb-16 uppercase tracking-wide">
          {t('services.faq_title')}
        </h2>
        <div className="flex flex-col">
          {Array.isArray(faqs) && faqs.map((faq, i) => (
            <AccordionItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>

      {/* 8. Bottom CTA Section */}
      <div className="scroll-section text-center bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-12 md:p-24 shadow-none relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
        <h2 className="font-drama italic text-4xl md:text-6xl text-white mb-8 leading-tight">{t('services.bottom_cta_title')}</h2>
        <p className="font-mono text-gray-400 mb-12 max-w-2xl mx-auto md:text-lg leading-relaxed">{t('services.bottom_cta_desc')}</p>
        <div className="flex justify-center flex-wrap">
          <MagneticButton
            className="bg-accent text-white font-bold px-10 py-5 rounded-full uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:bg-opacity-80 transition-all hover:scale-105"
            data-tally-open="Pd1MPe" data-tally-width="368" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
          >
             {t('services.bottom_cta_btn')}
          </MagneticButton>
        </div>
      </div>

    </div>
  );
}
