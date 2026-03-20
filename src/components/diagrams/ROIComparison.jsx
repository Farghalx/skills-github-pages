import React from 'react';

export default function ROIComparison({ lang, variant }) {
  const isRtl = lang === 'ar';

  const dataMap = {
    dubai: { title: 'Dubai ROI', manual: '150 hrs', ai: '2 hrs' },
    saudi: { title: 'KSA ROI', manual: '200 hrs', ai: '3 hrs' },
    egypt: { title: 'Egypt ROI', manual: '100 hrs', ai: '1 hr' },
    leadgen: { title: 'Lead Gen ROI', manual: '40 hrs/wk', ai: '10 mins/wk' },
    sg: { title: 'Singapore ROI', manual: '120 hrs', ai: '2 hrs' },
    au: { title: 'Australia ROI', manual: '140 hrs', ai: '2.5 hrs' },
  };

  const data = dataMap[variant] || { title: 'ROI', manual: '100 hrs', ai: '1 hr' };

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-8 my-8 max-w-full" dir={isRtl ? 'rtl' : 'ltr'}>
      <h4 className="text-white text-xl font-bold mb-6 text-center">{data.title}</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333] text-center">
          <div className="text-red-400 font-bold mb-2">{isRtl ? 'يدوي' : 'Manual Work'}</div>
          <div className="text-3xl text-white font-mono">{data.manual}</div>
        </div>
        <div className="bg-accent/10 rounded-lg p-6 border border-accent/30 text-center">
          <div className="text-accent font-bold mb-2">{isRtl ? 'بالذكاء الاصطناعي' : 'AI Automation'}</div>
          <div className="text-3xl text-accent font-mono">{data.ai}</div>
        </div>
      </div>
    </div>
  );
}
