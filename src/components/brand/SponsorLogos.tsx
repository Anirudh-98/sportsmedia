import React from 'react';

interface SponsorLogoProps {
  type: 'sbi' | 'decathlon' | 'amul' | 'q1' | 'lic' | 'fitindia' | 'sai' | 'pnb' | 'tatamotors';
  className?: string;
}

export const SponsorLogo: React.FC<SponsorLogoProps> = ({ type, className = 'h-8' }) => {
  switch (type) {
    case 'sbi':
      return (
        <div className={`flex items-center gap-2 px-2 py-1 ${className}`}>
          {/* SBI Keyhole Circle */}
          <div className="w-7 h-7 rounded-full bg-[#0082ca] flex items-center justify-center relative shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-white mb-1" />
            <div className="w-1 h-3 bg-white absolute bottom-1" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#0082ca] font-black text-sm tracking-tight leading-none">SBI</span>
            <span className="text-[7.5px] text-slate-500 font-semibold tracking-tighter leading-none mt-0.5">
              The banker to every indian
            </span>
          </div>
        </div>
      );

    case 'decathlon':
      return (
        <div className={`flex flex-col items-center justify-center px-2 py-0.5 ${className}`}>
          <div className="bg-[#0082c3] text-white px-2.5 py-0.5 rounded font-black text-xs tracking-wider shadow-sm">
            DECATHLON
          </div>
          <span className="text-[7.5px] font-bold text-slate-600 tracking-tight mt-0.5 uppercase">
            YOUR SPORTS PARTNER
          </span>
        </div>
      );

    case 'amul':
      return (
        <div className={`flex flex-col items-center justify-center px-2.5 py-0.5 ${className}`}>
          <span
            className="text-[#d32f2f] font-black text-base italic tracking-tight leading-none"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Amul
          </span>
          <span className="text-[8px] font-bold text-[#2e7d32] tracking-tight leading-none mt-0.5">
            The Taste of India
          </span>
        </div>
      );

    case 'q1':
      return (
        <div className={`flex items-center gap-1.5 px-2 py-1 ${className}`}>
          <div className="bg-black text-white px-1.5 py-0.5 rounded text-[11px] font-black leading-none">
            Q1
          </div>
          <span className="text-black font-black text-xs tracking-wider leading-none">
            SPORTS
          </span>
        </div>
      );

    case 'lic':
      return (
        <div className={`flex items-center gap-1.5 px-2 py-0.5 ${className}`}>
          {/* LIC Hands & Lamp Emblem */}
          <div className="w-6 h-6 rounded-full bg-[#004b91] flex items-center justify-center text-amber-300">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[#004b91] font-black text-xs leading-none">LIC</span>
            <span className="text-[6.5px] text-slate-500 font-bold leading-none mt-0.5">
              भारतीय जीवन बीमा निगम / LIC
            </span>
          </div>
        </div>
      );

    case 'fitindia':
      return (
        <div className={`flex items-center gap-1 px-2 py-0.5 ${className}`}>
          <div className="w-5 h-5 flex items-center justify-center text-emerald-600">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <circle cx="12" cy="4" r="2.5" fill="#e65100" />
              <path d="M15 8.5c-.8-.4-1.8-.5-2.7-.2l-2.5 1-1.3-.8c-.4-.3-.9-.2-1.2.2-.3.4-.2.9.2 1.2l2 1.2c.3.2.7.2 1 .1l1.8-.7v3.5l-2.2 3.8c-.3.5-.1 1.1.4 1.4.5.3 1.1.1 1.4-.4l2-3.4 2 3.4c.3.5.9.7 1.4.4.5-.3.7-.9.4-1.4L16 14.5V9.8c0-.5-.4-.9-.9-.9-.1-.2-.1-.4-.1-.4z" fill="#2e7d32" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[#e65100] font-black text-xs tracking-tight leading-none">FIT</span>
            <span className="text-[#2e7d32] font-black text-[10px] tracking-tight leading-none">INDIA</span>
          </div>
        </div>
      );

    case 'sai':
      return (
        <div className={`flex items-center gap-1.5 px-2 py-0.5 ${className}`}>
          {/* SAI Emblem Arch */}
          <div className="w-7 h-7 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-amber-500 rounded-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 via-white to-green-600 p-0.5">
              <span className="text-[8px] font-black text-navy-950">SAI</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[#0d2240] font-black text-xs tracking-wider leading-none">SAI</span>
            <span className="text-[6.5px] text-slate-500 font-bold leading-none mt-0.5">
              SPORTS AUTHORITY OF INDIA
            </span>
          </div>
        </div>
      );

    case 'pnb':
      return (
        <div className={`flex items-center gap-1.5 px-2 py-0.5 ${className}`}>
          <div className="w-6 h-6 bg-[#931a25] rounded flex items-center justify-center text-amber-300 font-black text-[9px]">
            pnb
          </div>
          <div className="flex flex-col">
            <span className="text-[#931a25] font-black text-xs leading-none">pnb</span>
            <span className="text-[7px] text-slate-500 font-semibold leading-none mt-0.5">
              punjab national bank
            </span>
          </div>
        </div>
      );

    case 'tatamotors':
      return (
        <div className={`flex items-center gap-1.5 px-2 py-0.5 ${className}`}>
          {/* TATA Motors Oval */}
          <div className="w-6 h-6 rounded-full border border-blue-900 flex items-center justify-center">
            <span className="text-[8px] font-black text-blue-900">TATA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#002d62] font-black text-[11px] tracking-wider leading-none">
              TATA MOTORS
            </span>
            <span className="text-[6.5px] text-slate-500 font-bold tracking-tight leading-none mt-0.5">
              Connecting Aspirations
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
