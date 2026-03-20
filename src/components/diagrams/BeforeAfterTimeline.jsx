import React from 'react';

export default function BeforeAfterTimeline({ lang, variant }) {
  const isRtl = lang === 'ar';
  
  const labels = variant === 'whatsapp' 
    ? { before: '24-48 Hours Response Time', after: 'Instant (< 1s) Response' }
    : { before: '3 Days Manual Compilation', after: '2 Minutes Automated generation' };

  const labelsAr = variant === 'whatsapp'
    ? { before: '٢٤-٤٨ ساعة وقت استجابة', after: 'استجابة فورية (< ١ ثانية)' }
    : { before: '٣ أيام تجميع يدوي', after: 'دقيقتان توليد تلقائي' };

  const activeLabels = isRtl ? labelsAr : labels;

  return (
    <div className="bg-[#111111] border border-[#222] rounded-xl p-6 sm:p-10 my-8 overflow-x-auto min-w-[300px]" dir={isRtl ? 'rtl' : 'ltr'}>
       <h4 className="text-white text-xl font-bold mb-8 text-center">{isRtl ? 'تأثير الوقت' : 'Time Impact'}</h4>
       
       <div className="space-y-8">
         <div className="relative">
           <div className="text-red-400 text-sm font-bold mb-2 uppercase tracking-wider">{isRtl ? 'قبل الأتمتة' : 'Before Automation'}</div>
           <div className="h-10 bg-[#1a1a1a] rounded-lg border border-red-900 overflow-hidden outline outline-1 outline-red-500/20">
             <div className="h-full bg-red-500/30 w-full rounded-r-none relative group">
                <div className="absolute inset-0 bg-red-500 animate-[pulse_3s_ease-in-out_infinite] opacity-10"></div>
             </div>
           </div>
           <div className={`text-gray-400 text-xs mt-2 ${isRtl ? 'text-left' : 'text-right'}`}>{activeLabels.before}</div>
         </div>

         <div className="relative">
           <div className="text-accent text-sm font-bold mb-2 uppercase tracking-wider">{isRtl ? 'بعد الأتمتة' : 'After Automation'}</div>
           <div className="h-10 bg-[#1a1a1a] rounded-lg border border-accent/20 overflow-hidden outline outline-1 outline-accent/20">
             <div className="h-full bg-accent/80 w-[5%] rounded-r-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
             </div>
           </div>
           <div className={`text-accent text-xs mt-2 ${isRtl ? 'text-left' : 'text-right'} font-bold`}>{activeLabels.after}</div>
         </div>
       </div>
    </div>
  );
}
