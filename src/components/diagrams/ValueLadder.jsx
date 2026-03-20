import React from 'react';

export default function ValueLadder({ lang }) {
  const isRtl = lang === 'ar';
  
  const steps = isRtl
    ? [
        { name: 'أساسي', price: '$500', height: 80, delay: '0s' },
        { name: 'احترافي', price: '$2,000', height: 140, delay: '0.2s' },
        { name: 'مؤسسي', price: '$5,000+', height: 200, delay: '0.4s' }
      ]
    : [
        { name: 'Basic', price: '$500', height: 80, delay: '0s' },
        { name: 'Pro', price: '$2,000', height: 140, delay: '0.2s' },
        { name: 'Enterprise', price: '$5,000+', height: 200, delay: '0.4s' }
      ];

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-8 my-8 max-w-[600px] mx-auto flex items-end justify-center gap-4 h-[300px]" dir={isRtl ? 'rtl' : 'ltr'}>
      {steps.map((step, i) => (
        <div 
          key={i} 
          className="w-24 sm:w-32 bg-accent/10 border border-accent/30 rounded-t-xl flex flex-col justify-end items-center pb-6 hover:bg-accent/20 transition-all cursor-default"
          style={{ height: `${step.height}px`, animationDelay: step.delay }}
        >
          <div className="text-white font-bold mb-1 text-sm sm:text-base">{step.name}</div>
          <div className="text-accent font-mono text-xs sm:text-sm">{step.price}</div>
        </div>
      ))}
    </div>
  );
}
