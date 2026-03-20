import React from 'react';

export default function ProcessFlowLead({ lang }) {
  const isRtl = lang === 'ar';
  
  const steps = isRtl 
    ? ['تصدير (Export)', 'تصنيف (Tier)', 'تقييم (Score)', 'تحقق (Validate)', 'استخراج (Scrape)']
    : ['Scrape', 'Validate', 'Score', 'Tier', 'Export'];

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-8 my-8 max-w-full overflow-x-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <svg viewBox="0 0 800 120" className="w-full h-auto min-w-[600px]">
        {steps.map((step, i) => (
          <g key={i} transform={`translate(${i * 150 + 50}, 60)`}>
            <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#1a1a1a" stroke="#F97316" strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily={isRtl ? 'IBM Plex Sans Arabic' : 'Space Grotesk'}>
              {step}
            </text>
            {i < steps.length - 1 && (
              <path 
                d={isRtl ? "M -60 0 L -90 0" : "M 60 0 L 90 0"} 
                stroke="#666" 
                strokeWidth="2" 
                markerEnd="url(#arrow)" 
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
