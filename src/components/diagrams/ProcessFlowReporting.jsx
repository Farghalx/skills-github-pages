import React from 'react';

export default function ProcessFlowReporting({ lang }) {
  const isRtl = lang === 'ar';
  
  const steps = isRtl 
    ? ['تقرير (Doc)', 'تحليل (AI Analyze)', 'معالجة (n8n)', 'ربط (APIs)']
    : ['Pull APIs', 'n8n', 'AI Analyze', 'Doc/PDF'];

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-8 my-8 max-w-full overflow-x-auto" dir={isRtl ? 'rtl' : 'ltr'}>
      <svg viewBox="0 0 650 120" className="w-full h-auto min-w-[500px]">
        {steps.map((step, i) => (
          <g key={i} transform={`translate(${i * 150 + 75}, 60)`}>
            <circle cx="0" cy="0" r="45" fill={i === 2 ? '#2a1a11' : '#1a1a1a'} stroke={i === 2 ? '#F97316' : '#444'} strokeWidth="2" />
            <text x="0" y="5" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily={isRtl ? 'IBM Plex Sans Arabic' : 'Space Grotesk'}>
              {step}
            </text>
            {i < steps.length - 1 && (
              <path 
                d={isRtl ? "M -45 0 L -105 0" : "M 45 0 L 105 0"} 
                stroke="#666" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                markerEnd="url(#arrow-reporting)" 
              />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrow-reporting" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#666" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
