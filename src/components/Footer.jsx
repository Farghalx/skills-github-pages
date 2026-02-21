import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white rounded-t-[4rem] px-4 md:px-20 py-20 relative z-20 border-t border-gray-200 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">

                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="font-drama italic text-5xl mb-4 text-textMain hover:text-accent transition-colors block w-max">FARGHAL X</Link>
                    <p className="font-mono text-gray-500 max-w-xs font-bold">The AI operating system for Malaysian SMEs.</p>

                    <div className="mt-12 flex items-center gap-3 font-mono text-sm">
                        <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse border border-green-200"></span>
                        <span className="text-green-600 font-bold tracking-widest">SYSTEM OPERATIONAL</span>
                    </div>
                </div>

                <div>
                    <h4 className="font-sans font-bold mb-6 text-xl text-textMain">Quick Links</h4>
                    <ul className="space-y-3 font-mono text-sm text-gray-500 font-bold">
                        <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
                        <li><Link to="/portfolio" className="hover:text-accent transition-colors">Portfolio</Link></li>
                        <li><Link to="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
                        <li><Link to="/about" className="hover:text-accent transition-colors">About/Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-sans font-bold mb-6 text-xl text-textMain">Connect</h4>
                    <ul className="space-y-3 font-mono text-sm text-gray-500 font-bold">
                        <li>ahmed@farghalx.org</li>
                        <li className="mt-4 text-gray-400">Kuala Lumpur, Malaysia <br /> Remote First</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
