import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '../utils/blog';
import { useLanguage } from '../i18n/LanguageContext';

import ProcessFlowLead from '../components/diagrams/ProcessFlowLead';
import ProcessFlowWhatsApp from '../components/diagrams/ProcessFlowWhatsApp';
import ProcessFlowOutreach from '../components/diagrams/ProcessFlowOutreach';
import ProcessFlowReporting from '../components/diagrams/ProcessFlowReporting';
import ScoringSystem from '../components/diagrams/ScoringSystem';
import CostComparison from '../components/diagrams/CostComparison';
import ROIComparison from '../components/diagrams/ROIComparison';
import BeforeAfterTimeline from '../components/diagrams/BeforeAfterTimeline';
import ValueLadder from '../components/diagrams/ValueLadder';

const DIAGRAM_MAP = {
    'flow-lead': ProcessFlowLead,
    'flow-whatsapp': ProcessFlowWhatsApp,
    'flow-outreach': ProcessFlowOutreach,
    'flow-reporting': ProcessFlowReporting,
    'score-breakdown': ScoringSystem,
    'cost-dubai': (props) => <CostComparison {...props} currency="AED" amounts={[12000, 150]} labels={["Employee", "AI System"]} />,
    'cost-sa': (props) => <CostComparison {...props} currency="SAR" amounts={[15000, 150]} labels={["Employee", "AI System"]} />,
    'cost-eg': (props) => <CostComparison {...props} currency="EGP" amounts={[20000, 7500]} labels={["Employee", "AI System"]} />,
    'cost-sg': (props) => <CostComparison {...props} currency="SGD" amounts={[4500, 200]} labels={["Employee", "AI System"]} />,
    'cost-au': (props) => <CostComparison {...props} currency="AUD" amounts={[6000, 250]} labels={["Employee", "AI System"]} />,
    'roi-dubai': (props) => <ROIComparison {...props} variant="dubai" />,
    'roi-saudi': (props) => <ROIComparison {...props} variant="saudi" />,
    'roi-egypt': (props) => <ROIComparison {...props} variant="egypt" />,
    'roi-leadgen': (props) => <ROIComparison {...props} variant="leadgen" />,
    'roi-sg': (props) => <ROIComparison {...props} variant="sg" />,
    'roi-au': (props) => <ROIComparison {...props} variant="au" />,
    'time-whatsapp': (props) => <BeforeAfterTimeline {...props} variant="whatsapp" />,
    'time-report': (props) => <BeforeAfterTimeline {...props} variant="report" />,
    'value-ladder': ValueLadder,
};

export default function BlogPost() {
    const { slug } = useParams();
    const { language } = useLanguage();
    const post = getPostBySlug(slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="pt-40 pb-20 px-4 min-h-screen flex flex-col items-center justify-center bg-background text-white text-center">
                <h1 className="font-drama text-6xl mb-4">Post Not Found</h1>
                <Link to="/blog" className="text-accent underline hover:text-white transition-colors">Return to Blog</Link>
            </div>
        );
    }

    const canonicalUrl = `https://farghalx.org/blog/${slug}`;
    const isRtl = post.lang === 'ar';

    const schemaJSON = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.thumbnail ? `https://farghalx.org${post.thumbnail}` : undefined,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Farghal X",
            "logo": {
                "@type": "ImageObject",
                "url": "https://farghalx.org/favicon.svg"
            }
        },
        "datePublished": post.date,
        "description": post.description,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        }
    };

    return (
        <div className="pt-32 pb-32 px-4 md:px-20 min-h-screen bg-background">
            <Helmet>
                <title>{post.title} — Farghal X</title>
                <meta name="description" content={post.description} />
                <link rel="canonical" href={canonicalUrl} />
                
                {/* Open Graph */}
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                {post.thumbnail && <meta property="og:image" content={`https://farghalx.org${post.thumbnail}`} />}
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.title} />
                <meta name="twitter:description" content={post.description} />
                {post.thumbnail && <meta name="twitter:image" content={`https://farghalx.org${post.thumbnail}`} />}
                
                <script type="application/ld+json">{JSON.stringify(schemaJSON)}</script>
            </Helmet>

            <div className="max-w-4xl mx-auto z-10 relative">
                <Link to="/blog" className={`inline-flex items-center gap-2 font-mono text-sm font-bold text-gray-400 hover:text-accent transition-colors mb-12 uppercase tracking-widest ${isRtl && language === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <ArrowLeft size={16} className={isRtl && language === 'ar' ? 'rotate-180' : ''} /> {isRtl && language === 'ar' ? 'العودة للمدونة' : 'Back to Blog'}
                </Link>

                <header className={`mb-16 border-b border-white/10 pb-12 ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {post.tags && post.tags.map(tag => (
                            <span key={tag} className="font-mono text-xs font-bold px-3 py-1 rounded-full border border-white/20 text-gray-300 bg-white/5 uppercase tracking-wider">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className={`text-4xl md:text-6xl font-bold text-white leading-tight mb-6 ${isRtl ? 'font-sans' : 'font-sans'}`}>
                        {post.title}
                    </h1>
                    <div className={`flex items-center text-sm font-mono font-bold text-gray-400 capitalize ${isRtl ? 'justify-end' : ''}`}>
                        <span>{new Date(post.date).toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <span className="mx-3">•</span>
                        <span>{post.author}</span>
                        <span className="mx-3">•</span>
                        <span>{post.readingTime} min read</span>
                    </div>
                </header>

                <article 
                    dir={isRtl ? 'rtl' : 'ltr'}
                    className="blog-content"
                >
                    {post.content.split(/(<!--DIAGRAM:[a-zA-Z0-9_-]+-->)/g).map((part, index) => {
                        const diagramMatch = part.match(/^<!--DIAGRAM:([a-zA-Z0-9_-]+)-->$/);
                        if (diagramMatch) {
                            const name = diagramMatch[1];
                            const DiagramComponent = DIAGRAM_MAP[name];
                            if (DiagramComponent) {
                                return <DiagramComponent key={index} lang={post.lang} />;
                            }
                            return null;
                        }
                        return <div key={index} dangerouslySetInnerHTML={{ __html: part }} className="inline-block w-full" />;
                    })}
                </article>

                <div className={`mt-24 pt-12 border-t border-white/10 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <Link to="/blog" className={`inline-flex items-center gap-3 font-bold px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-colors ${isRtl && language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <ArrowLeft size={20} className={isRtl && language === 'ar' ? 'rotate-180' : ''} /> {isRtl && language === 'ar' ? 'العودة لجميع المقالات' : 'Back to all posts'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
