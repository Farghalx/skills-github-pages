import React from 'react';

export default function ScoringSystem({ lang }) {
  const isRtl = lang === 'ar';
  
  const scores = isRtl
    ? [
        { label: 'حجم الشركة', points: 30, color: '#3b82f6', percent: '100%' },
        { label: 'المسمى الوظيفي', points: 25, color: '#10b981', percent: '100%' },
        { label: 'تطابق المجال', points: 25, color: '#8b5cf6', percent: '80%' },
        { label: 'بريد إلكتروني صالح', points: 20, color: '#f59e0b', percent: '100%' }
      ]
    : [
        { label: 'Company Size Match', points: 30, color: '#3b82f6', percent: '100%' },
        { label: 'Decision Maker Title', points: 25, color: '#10b981', percent: '100%' },
        { label: 'Industry Match', points: 25, color: '#8b5cf6', percent: '80%' },
        { label: 'Valid Email', points: 20, color: '#f59e0b', percent: '100%' }
      ];

  const tiers = ['A (90-100)', 'B (70-89)', 'C (50-69)', 'D (<50)'];

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-6 sm:p-10 my-8 w-full font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <h4 className="text-white text-xl font-bold mb-8 text-center">{isRtl ? 'نظام التقييم التلقائي' : 'Automated Scoring Engine'}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          {scores.map((score, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">{score.label}</span>
                <span className="text-gray-400 font-mono">{score.points} pts</span>
              </div>
              <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000" 
                  style={{ width: score.percent, backgroundColor: score.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
            <h5 className="text-gray-400 text-sm mb-4 text-center tracking-widest uppercase">{isRtl ? 'تصنيف العملاء المحتملين' : 'Lead Tier Output'}</h5>
            <div className="flex justify-center gap-3 flex-wrap">
              {tiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`px-4 py-2 rounded-lg font-bold flex flex-col items-center ${
                    idx === 0 ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                    idx === 1 ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 
                    idx === 2 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  <span className="text-2xl">{tier.charAt(0)}</span>
                  <span className="text-[10px] opacity-80">{tier.slice(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
