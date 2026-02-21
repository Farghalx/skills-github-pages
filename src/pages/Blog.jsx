import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Blog() {
    const containerRef = useRef(null);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.blog-card', {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const posts = [
        {
            id: 1,
            title: "AI Agents: Transforming Business Operations",
            preview: "Discover how AI agents are revolutionizing business automation and decision-making.",
            meta: "8 min read • Featured",
            tags: ["AI Automation", "Operations", "Strategy"],
            points: [
                "Learn about autonomous decision-making systems",
                "Discover real-time data processing capabilities",
                "Explore business integration strategies"
            ],
            content: "AI agents represent the next evolution in business automation and decision-making support. Unlike static scripts, they can perceive their environment, make decisions, and take actions to achieve specific goals, adapting to new data autonomously."
        },
        {
            id: 2,
            title: "Mastering AI Collaboration",
            preview: "Learn essential strategies and best practices for effective collaboration with AI systems.",
            meta: "6 min read • Essential",
            tags: ["Prompt Engineering", "Best Practices"],
            points: [
                "Master effective prompt engineering",
                "Understand AI limitations",
                "Learn best interaction patterns"
            ],
            content: "Working effectively with AI requires understanding its strengths and limitations. Modern AI systems excel at pattern recognition and generation, but require clear architectural constraints to produce reliable business outputs."
        }
    ];

    return (
        <div ref={containerRef} className="pt-40 pb-32 px-4 md:px-20 max-w-5xl mx-auto min-h-screen">

            <div className="text-center mb-16 blog-card">
                <h1 className="font-drama italic text-5xl md:text-7xl text-white mb-6">The Signal.</h1>
                <p className="font-mono text-gray-400 max-w-2xl mx-auto">Dispatches on AI automation, system architecture, and replacing busywork.</p>
            </div>

            <div className="flex flex-col gap-8">
                {posts.map(post => {
                    const isExpanded = expandedId === post.id;
                    return (
                        <div
                            key={post.id}
                            onClick={() => setExpandedId(isExpanded ? null : post.id)}
                            className="blog-card glass-panel rounded-[2.5rem] p-8 md:p-12 cursor-pointer shadow-none hover:border-white transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

                                <div className="flex-1">
                                    <div className="flex gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                    <h2 className="font-sans font-bold text-3xl md:text-4xl text-white leading-tight mb-4">{post.title}</h2>
                                    <p className="font-sans text-gray-400 text-lg leading-relaxed mb-6">{post.preview}</p>

                                    <div className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest">{post.meta}</div>
                                </div>

                                <button className={`hidden md:flex w-12 h-12 rounded-full border border-white/20 items-center justify-center text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-45 bg-white/10 text-white' : ''}`}>
                                    <span className="text-2xl leading-none">+</span>
                                </button>
                            </div>

                            {/* Expanded Content */}
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-10 pt-10 border-t border-white/10' : 'max-h-0 opacity-0'}`}>
                                <h3 className="font-bold text-white mb-4 uppercase tracking-wide text-sm">Key Takeaways</h3>
                                <ul className="mb-8 space-y-3">
                                    {post.points.map((pt, i) => (
                                        <li key={i} className="flex items-start gap-3 flex-1 font-mono text-sm text-gray-300">
                                            <span className="text-accent mt-0.5">→</span> {pt}
                                        </li>
                                    ))}
                                </ul>
                                <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed">
                                    <p>{post.content}</p>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>

        </div>
    );
}
