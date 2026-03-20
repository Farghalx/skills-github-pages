import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const projectMeta = [
    { category: 'ai-agent', tools: ['Refelence AI', 'ChatGPT', 'Notion API', 'Custom Prompts'] },
    { category: 'automation', tools: ['n8n', 'Airtable', 'Telegram Bot API', 'OpenAI GPT-4', 'Google Calendar'] },
    { category: 'business-intelligence', tools: ['Google Sheets', 'Apps Script', 'Conditional Formatting', 'Data Validation'] }
];

export default function Portfolio() {
    const containerRef = useRef(null);
    const [filter, setFilter] = useState('all');
    const [activeProject, setActiveProject] = useState(null);
    const { t } = useLanguage();

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.stagger-item', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
                clearProps: 'all',
            });
        }, containerRef);
        return () => ctx.revert();
    }, [filter]);

    const translatedProjects = t('portfolio.projects');
    const projects = Array.isArray(translatedProjects)
        ? translatedProjects.map((p, i) => ({ ...p, ...projectMeta[i] }))
        : [];

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    const filters = [
        { id: 'all', label: t('portfolio.filter_all') },
        { id: 'ai-agent', label: t('portfolio.filter_ai') },
        { id: 'automation', label: t('portfolio.filter_auto') },
        { id: 'business-intelligence', label: t('portfolio.filter_bi') }
    ];

    return (
        <div ref={containerRef} className="pt-40 pb-32 px-4 md:px-20 max-w-7xl mx-auto min-h-screen">

            {/* Header */}
            <div className="text-center mb-16 stagger-item">
                <h1 className="font-drama italic text-5xl md:text-7xl text-white mb-6">{t('portfolio.page_title')}</h1>
                <p className="font-mono text-gray-400 max-w-2xl mx-auto">{t('portfolio.page_desc')}</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-20 stagger-item">
                {filters.map(btn => (
                    <button
                        key={btn.id}
                        onClick={() => setFilter(btn.id)}
                        className={`font-mono text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-full border transition-all ${filter === btn.id ? 'bg-white text-black border-white shadow-md' : 'bg-[#0A0A0A] border-white/20 text-gray-400 hover:border-white/50 hover:text-white'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* Projects Accordion List */}
            <div className="flex flex-col gap-4">
                {filteredProjects.map((project, i) => (
                    <div
                        key={i}
                        className={`stagger-item group border-b border-white/10 pb-4 transition-all duration-300 overflow-hidden cursor-pointer ${activeProject === i ? 'bg-zinc-900 rounded-3xl p-8 border border-zinc-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] mt-4 mb-8 !opacity-100' : 'hover:bg-white/5 hover:px-4 px-0 py-4'}`}
                        onClick={() => setActiveProject(activeProject === i ? null : i)}
                    >
                        {/* Always visible header */}
                        <div className="flex justify-between items-center w-full">
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-xl font-bold group-hover:text-white transition-colors" style={{ color: '#d1d5db' }}>0{i + 1}</span>
                                <h2 className="font-sans font-bold text-3xl md:text-5xl transition-colors group-hover:text-accent" style={{ color: 'white', opacity: 1 }}>{project.title}</h2>
                            </div>
                            <span className="hidden md:block font-mono text-sm tracking-widest uppercase transition-colors" style={{ color: '#9ca3af' }}>{project.type}</span>
                        </div>

                        {/* Expandable Content */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 transition-all duration-500 ease-in-out ${activeProject === i ? 'mt-12 max-h-[1500px]' : 'max-h-0 overflow-hidden'}`}>
                            {/* Left Side: Image/Visual */}
                            <div className="w-full h-64 md:h-full min-h-[300px] bg-black rounded-xl border border-zinc-700 overflow-hidden relative group-hover/image">
                                <img
                                    src={`https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80&auto=format&fit=crop`}
                                    alt="System Preview"
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <span className="font-mono !text-white bg-black/80 backdrop-blur border border-zinc-600 px-4 py-2 rounded-full text-xs tracking-widest z-20 shadow-xl">{t('portfolio.system_badge')}</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-zinc-900 to-transparent z-10 pointer-events-none"></div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="flex flex-col justify-center">
                                <div className="flex gap-2 mb-8 flex-wrap">
                                    {project.stats.map((stat, j) => (
                                        <span key={j} className="text-xs font-mono font-bold text-black bg-gray-100 px-3 py-1 rounded-sm">{stat}</span>
                                    ))}
                                </div>

                                <div className="mb-8 ps-4 border-s-2 border-accent/50">
                                    <h4 className="font-bold text-sm !text-white uppercase mb-2">{t('portfolio.problem_label')}</h4>
                                    <p className="!text-gray-100 text-base leading-relaxed">{project.problem}</p>
                                </div>

                                <div className="mb-8 ps-4 border-s-2 border-accent">
                                    <h4 className="font-bold text-sm !text-white uppercase mb-2">{t('portfolio.solution_label')}</h4>
                                    <p className="!text-white text-base leading-relaxed font-bold">{project.solution}</p>
                                </div>

                                <div>
                                    <h4 className="font-mono font-bold text-xs !text-gray-300 uppercase mb-3 tracking-widest">{t('portfolio.arch_label')}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tools.map((tool, k) => (
                                            <span key={k} className="text-xs font-mono font-bold !text-white bg-zinc-800 px-3 py-1 rounded-full border border-zinc-600">{tool}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}
