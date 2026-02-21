import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
    const containerRef = useRef(null);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.stagger-item', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, [filter]);

    const projects = [
        {
            title: "AI Sales Research Agent",
            type: "B2B Sales Automation",
            category: "ai-agent",
            stats: ["70% Faster", "3x More Calls", "35% More Meetings"],
            problem: "Sales teams waste hours researching clients manually. B2B SaaS company's 5-person sales team spent 2-3 hours per prospect researching company websites, LinkedIn profiles, and recent news.",
            solution: "Built an AI agent that summarizes LinkedIn + website insights in seconds with automated scraping, profile extraction, and personalized opening lines.",
            tools: ["Refelence AI", "ChatGPT", "Notion API", "Custom Prompts"]
        },
        {
            title: "WhatsApp CRM System",
            type: "Lead Automation",
            category: "automation",
            stats: ["RM2,400/Month Saved", "65% Faster Response", "24/7 Coverage"],
            problem: "Car dealership overwhelmed with 80+ daily WhatsApp inquiries asking repetitive questions about availability, pricing, and test drives. 4+ hour response times caused lost leads.",
            solution: "Designed end-to-end WhatsApp CRM automation with AI intent recognition, automatic loan calculations, live inventory checks, and 24/7 instant responses.",
            tools: ["n8n", "Airtable", "Telegram Bot API", "OpenAI GPT-4", "Google Calendar"]
        },
        {
            title: "Balqiso Trade Inventory Tracker",
            type: "Business Intelligence",
            category: "business-intelligence",
            stats: ["RM3,200/Month Saved", "80% Less Admin", "30% Better Turnover"],
            problem: "Wholesale clothing business owner spent 15 hours/week manually tracking inventory across 3 supplier spreadsheets, leading to frequent stockouts and over-ordering.",
            solution: "Created all-in-one Google Sheets system with centralized dashboard, automatic profit calculations, reorder alerts, and real-time analytics.",
            tools: ["Google Sheets", "Apps Script", "Conditional Formatting", "Data Validation"]
        }
    ];

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div ref={containerRef} className="pt-40 pb-32 px-4 md:px-20 max-w-7xl mx-auto min-h-screen">

            {/* Header */}
            <div className="text-center mb-16 stagger-item">
                <h1 className="font-drama italic text-5xl md:text-7xl text-white mb-6">Systems I've Built.</h1>
                <p className="font-mono text-gray-400 max-w-2xl mx-auto">Detailed showcase of AI automation systems that transformed businesses and saved thousands in operational costs.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-20 stagger-item">
                {[
                    { id: 'all', label: 'All Projects' },
                    { id: 'ai-agent', label: 'AI Agents' },
                    { id: 'automation', label: 'Automation' },
                    { id: 'business-intelligence', label: 'Business Intelligence' }
                ].map(btn => (
                    <button
                        key={btn.id}
                        onClick={() => setFilter(btn.id)}
                        className={`font-mono text-xs uppercase font-bold tracking-widest px-6 py-3 rounded-full border transition-all ${filter === btn.id ? 'bg-white text-black border-white shadow-md' : 'bg-[#0A0A0A] border-white/20 text-gray-400 hover:border-white/50 hover:text-white'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, i) => (
                    <div key={i} className="stagger-item glass-panel rounded-3xl p-8 flex flex-col shadow-none hover:-translate-y-2 transition-transform duration-300">
                        <div className="mb-6">
                            <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold font-mono text-xs uppercase tracking-wider rounded-lg mb-4">{project.type}</span>
                            <h2 className="font-sans font-bold text-2xl text-white leading-tight">{project.title}</h2>
                        </div>

                        <div className="flex gap-2 mb-6 flex-wrap">
                            {project.stats.map((stat, j) => (
                                <span key={j} className="text-xs font-mono font-bold text-gray-300 bg-white/5 px-2 py-1 border border-white/10 rounded-md">{stat}</span>
                            ))}
                        </div>

                        <div className="mb-6 flex-1">
                            <h4 className="font-bold text-sm text-white uppercase mb-2">Problem</h4>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.problem}</p>

                            <h4 className="font-bold text-sm text-white uppercase mb-2">Solution</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                        </div>

                        <div className="border-t border-white/10 pt-6 mt-auto">
                            <h4 className="font-bold text-xs text-gray-500 uppercase mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tools.map((tool, k) => (
                                    <span key={k} className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/5">{tool}</span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}
