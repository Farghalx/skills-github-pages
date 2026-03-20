import React from 'react';

export default function CostComparison({ lang, currency, amounts, labels }) {
  const isRtl = lang === 'ar';

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-8 my-8 w-full max-w-3xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <h4 className="text-white text-2xl font-bold mb-8 text-center">{isRtl ? 'مقارنة التكلفة' : 'Cost Comparison'}</h4>
      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
        <div className="bg-[#1a1a1a] rounded-2xl p-8 flex-1 text-center border border-red-900/30 relative overflow-hidden group hover:border-red-500/50 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
          <div className="text-gray-400 text-sm mb-4 uppercase tracking-widest font-mono">{isRtl ? labels[0] : labels[0]}</div>
          <div className="text-5xl font-bold text-white mb-2 tracking-tight">
            <span className="text-2xl text-gray-500 mr-1">{currency}</span>
            {amounts[0].toLocaleString()}
            <span className="text-lg text-gray-500 ml-1">/mo</span>
          </div>
          <div className="text-sm text-red-400 font-bold bg-red-500/10 inline-block px-3 py-1 rounded-full mt-4">
            {isRtl ? 'بشر' : 'Human Baseline'}
          </div>
        </div>
        
        <div className="flex items-center justify-center font-bold text-gray-600 italic">VS</div>
        
        <div className="bg-accent/5 rounded-2xl p-8 flex-1 text-center border border-accent/20 relative overflow-hidden group hover:border-accent/60 transition-colors shadow-[0_0_30px_rgba(249,115,22,0.05)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent/60 group-hover:bg-accent transition-colors"></div>
          <div className="text-accent text-sm mb-4 uppercase tracking-widest font-mono font-bold">{isRtl ? labels[1] : labels[1]}</div>
          <div className="text-5xl font-bold text-accent mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">
            <span className="text-2xl opacity-70 mr-1">{currency}</span>
            {amounts[1].toLocaleString()}
            <span className="text-lg opacity-70 ml-1">/mo</span>
          </div>
          <div className="text-sm text-accent font-bold mt-4">
            {isRtl ? 'نظام ذكاء اصطناعي 24/7' : '24/7 AI System'}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500 border-t border-[#222] pt-4">
        {isRtl 
          ? `توفير بنسبة ${Math.round((1 - amounts[1]/amounts[0])*100)}% تقريباً` 
          : `~${Math.round((1 - amounts[1]/amounts[0])*100)}% Cost Reduction`}
      </div>
    </div>
  );
}
