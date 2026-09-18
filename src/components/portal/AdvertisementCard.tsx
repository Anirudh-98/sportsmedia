'use client';

import React from 'react';
import Image from 'next/image';

interface AdvertisementCardProps {
  onOpenAdModal: () => void;
}

export const AdvertisementCard: React.FC<AdvertisementCardProps> = ({ onOpenAdModal }) => {
  return (
    <div className="bg-white rounded-md border border-[#D8E0E7] shadow-2xs overflow-hidden flex flex-col">
      {/* Header Bar */}
      <div className="w-full bg-[#032D59] text-white py-1.5 px-3 text-center">
        <span className="text-xs font-black tracking-widest uppercase">
          FEATURED ADVERTISEMENT
        </span>
      </div>

      {/* Ad Card Content */}
      <div className="p-3 bg-slate-50/80 flex flex-col items-center text-center">
        {/* Decathlon Banner */}
        <div className="w-full bg-[#0082c3] text-white py-1.5 px-3 rounded text-center shadow-xs">
          <span className="block font-black text-sm tracking-wider">DECATHLON</span>
        </div>
        
        <div className="text-xs font-black text-slate-800 tracking-wider uppercase mt-1.5">
          YOUR SPORTS PARTNER
        </div>

        {/* Buy Now Button */}
        <button
          type="button"
          onClick={onOpenAdModal}
          className="mt-2 mb-2.5 px-6 py-1 bg-[#032D59] hover:bg-[#0B5FA5] text-white font-black text-xs tracking-wider uppercase rounded-full shadow-2xs cursor-pointer transition-transform hover:scale-105"
        >
          BUY NOW
        </button>

        {/* Product Composite Image */}
        <div className="relative w-full h-36 rounded-md overflow-hidden bg-white border border-slate-200 shadow-2xs">
          <Image
            src="/images/decathlon_ad.jpg"
            alt="Decathlon Sports Partner Equipment"
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain p-1 hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="text-[10px] text-slate-700 font-semibold text-center mt-1.5">
          Special discount for verified Blue Zone student athletes
        </div>
      </div>
    </div>
  );
};
