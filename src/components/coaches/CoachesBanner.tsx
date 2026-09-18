'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoachesBannerProps {
  onJoinNetwork: () => void;
}

export const CoachesBanner: React.FC<CoachesBannerProps> = ({ onJoinNetwork }) => {
  return (
    <div className="w-full bg-white rounded-md border border-[#D8E0E7] overflow-hidden shadow-2xs">
      <div className="px-4 pt-3 pb-1.5 text-center">
        <h3 className="text-xs sm:text-sm md:text-[14px] font-black text-[#032D59] tracking-wide uppercase">
          PET MASTERS &amp; COACHES — OUR STRENGTH
        </h3>
        <p className="mt-0.5 text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-wider">
          Guiding • Inspiring • Shaping the Future
        </p>
      </div>

      <div className="group relative h-40 sm:h-52 md:h-56 lg:h-60 w-full overflow-hidden bg-slate-100">
        <Image
          src="/images/coaches_banner.jpg"
          alt="PET Masters & Coaches - Our Strength"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <div className="absolute bottom-2.5 sm:bottom-3.5 left-1/2 z-10 -translate-x-1/2">
          <button
            type="button"
            onClick={onJoinNetwork}
            className="rounded-xs border-2 border-blue-400/80 bg-[#032D59]/90 px-6 sm:px-8 py-1.5 sm:py-2 text-[10.5px] sm:text-[11px] font-black tracking-widest text-white uppercase shadow-lg hover:scale-105 hover:bg-[#0B5FA5] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            JOIN OUR NETWORK
          </button>
        </div>
      </div>
    </div>
  );
};
