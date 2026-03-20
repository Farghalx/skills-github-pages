import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../i18n/LanguageContext';
import { getAllPosts } from '../utils/blog';
import { ArrowLeft } from 'lucide-react';

export default function BlogList() {
    const { t, language } = useLanguage();
    const [filter, setFilter] = useState('all'); // 'all', 'en', 'ar'
    
    const posts = getAllPosts();
    
    const filteredPosts = filter === 'all' 
        ? posts 
        : posts.filter(post => post.lang === filter);

    // Schema for SEO
    const schemaJSON = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog — Farghal X",
        "description": "Insights, guides, and real-talk about AI automation for modern businesses and agencies.",
        "url": "https://farghalx.org/blog"
    };

    return (
        <div className="pt-32 pb-20 px-4 md:px-20 min-h-screen bg-background">
            <Helmet>
                <title>Blog — Farghal X</title>
                <meta name="description" content="Insights, guides, and real-talk about AI automation for modern businesses and agencies." />
                <script type="application/ld+json">{JSON.stringify(schemaJSON)}</script>
            </Helmet>

            <div className="max-w-6xl mx-auto z-10 relative">
                <div className="mb-12">
                    <h1 className="font-drama italic text-5xl md:text-7xl text-white mb-6">Thoughts <span className="text-accent">&</span> Tactics</h1>
                    <p className="font-mono text-gray-400 font-bold max-w-2xl text-sm mb-12 leading-relaxed">
                        Actionable insights on how AI automation is reshaping modern businesses. Discover strategies to save time, scale efficiently, and build automated systems.
                    </p>
                    
                    {/* Filters */}
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setFilter('all')} 
                            className={`font-mono text-sm font-bold px-6 py-2 rounded-full border transition-colors ${filter === 'all' ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-accent hover:text-accent'}`}
                        >
                            All Posts
                        </button>
                        <button 
                            onClick={() => setFilter('en')} 
                            className={`font-mono text-sm font-bold px-6 py-2 rounded-full border transition-colors ${filter === 'en' ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-accent hover:text-accent'}`}
                        >
                            English
                        </button>
                        <button 
                            onClick={() => setFilter('ar')} 
                            className={`font-mono text-sm font-bold px-6 py-2 rounded-full border transition-colors ${filter === 'ar' ? 'bg-white text-black border-white' : 'border-white/20 text-white hover:border-accent hover:text-accent'}`}
                        >
                            عربي
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map(post => (
                        <Link to={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col items-start bg-[#0D0D0D] border border-white/10 rounded-[2rem] overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)]">
                            {post.thumbnail && (
                                <div className="w-full h-48 bg-[#1A1A1A] overflow-hidden relative border-b border-white/5">
                                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105" />
                                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {post.lang === 'ar' ? 'عربي' : 'EN'}
                                    </div>
                                </div>
                            )}
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs font-mono text-gray-400 mb-4 uppercase font-bold tracking-widest">
                                    <span>{new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span>•</span>
                                    <span>{post.readingTime} min read</span>
                                </div>
                                <h3 className={`text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors ${post.lang === 'ar' ? 'font-sans' : 'font-sans'}`} dir={post.lang === 'ar' ? 'rtl' : 'ltr'}>
                                    {post.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-2" dir={post.lang === 'ar' ? 'rtl' : 'ltr'}>
                                    {post.description}
                                </p>
                                <div className="text-accent font-mono text-sm font-bold flex items-center gap-2 tracking-widest mt-auto">
                                    {(post.lang === 'ar' && language === 'ar') ? 'اقرأ المزيد' : 'READ POST'} {language !== 'ar' && <ArrowLeft size={16} className="rotate-180" />}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center border border-white/10 rounded-3xl mt-8">
                        <p className="font-mono text-gray-500">No posts found for this language.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
