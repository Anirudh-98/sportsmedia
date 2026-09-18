'use client';

import React from 'react';
import Image from 'next/image';
import { SPONSORS } from '@/data/sponsors';

export const SponsorsBar: React.FC = () => {
  // Duplicate array to enable seamless infinite scroll loop
  const duplicatedSponsors = [...SPONSORS, ...SPONSORS];

  return (
    <section className="w-full bg-white border-b border-[#D8E0E7] py-2 px-2 sm:px-4">
      <div className="w-full flex flex-col md:flex-row items-center gap-3 overflow-hidden">
        
        {/* Left Badge: OUR PROUD SPONSORS & PARTNERS */}
        <div className="shrink-0 z-10 bg-white pr-2">
          <div className="bg-[#032D59] text-white px-3.5 py-1.5 rounded-md text-center shadow-2xs border border-[#063B73]">
            <span className="block text-[9.5px] font-black tracking-wider uppercase text-blue-200 leading-tight">
              OUR PROUD
            </span>
            <span className="block text-[11px] font-black tracking-tight uppercase text-white leading-tight">
              SPONSORS &amp; PARTNERS
            </span>
          </div>
        </div>

        {/* Continuous Scrolling Logos Marquee */}
        <div className="w-full flex-1 overflow-hidden relative mask-gradient-x">
          <div className="animate-marquee flex items-center gap-8 md:gap-10 py-1">
            {duplicatedSponsors.map((sponsor, idx) => (
              <a
                key={`${sponsor.id}-${idx}`}
                href={sponsor.url}
                target="_blank"
                rel="noreferrer"
                title={`${sponsor.name} - ${sponsor.category}`}
                className="shrink-0 flex items-center justify-center p-1.5 rounded-md hover:bg-slate-50 transition-all hover:scale-105 group grayscale-0 hover:opacity-90"
              >
                <div className="relative h-7 sm:h-8 w-24 sm:w-28 flex items-center justify-center">
                  <Image
                    src={sponsor.logoSrc}
                    alt={sponsor.name}
                    fill
                    sizes="120px"
                    className="object-contain object-center group-hover:drop-shadow-xs transition-all"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

