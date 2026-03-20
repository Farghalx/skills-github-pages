import React from 'react';

export default function ProcessFlowWhatsApp({ lang }) {
  const isRtl = lang === 'ar';
  
  const steps = isRtl
    ? [
        { title: 'رسالة', desc: 'استقبال استفسار' },
        { title: 'رد آلي', desc: 'رد فوري 24/7' },
        { title: 'تأهيل', desc: 'طرح أسئلة تفاعلية' },
        { title: 'حجز', desc: 'جدولة موعد' },
        { title: 'تنبيه', desc: 'إشعار فريق المبيعات' }
      ]
    : [
        { title: 'Message', desc: 'Inbound Inquiry' },
        { title: 'Auto-Reply', desc: 'Instant 24/7 Response' },
        { title: 'Qualify', desc: 'Interactive Questions' },
        { title: 'Book', desc: 'Schedule Meeting' },
        { title: 'Notify', desc: 'Alert Sales Team' }
      ];

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-8 my-8 max-w-full flex justify-center" dir={isRtl ? 'rtl' : 'ltr'}>
      <svg viewBox="0 0 300 500" className="w-full max-w-[300px] h-auto">
        {steps.map((step, i) => (
          <g key={i} transform={`translate(150, ${i * 90 + 50})`}>
            <rect x="-100" y="-30" width="200" height="60" rx="12" fill={i === 1 || i === 2 ? '#2a1a11' : '#1a1a1a'} stroke={i === 1 || i === 2 ? '#F97316' : '#333'} strokeWidth="2" />
            <text x="0" y="-5" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily={isRtl ? 'IBM Plex Sans Arabic' : 'Space Grotesk'}>
              {step.title}
            </text>
            <text x="0" y="15" fill="#888888" fontSize="12" textAnchor="middle" fontFamily={isRtl ? 'IBM Plex Sans Arabic' : 'Space Grotesk'}>
              {step.desc}
            </text>
            {i < steps.length - 1 && (
              <path d="M 0 30 L 0 60" stroke="#F97316" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow-down)" />
            )}
          </g>
        ))}
        <defs>
          <marker id="arrow-down" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 0 L 5 10 z" fill="#F97316" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
