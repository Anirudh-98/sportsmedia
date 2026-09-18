'use client';

import React from 'react';
import { Globe2, Building2, HandHeart, CalendarDays } from 'lucide-react';

const STATS = [
  { value: '100+', label: 'Sports', icon: Globe2, color: '#149447', bg: '#EAF7EF' },
  { value: '500+', label: 'Schools & Colleges', icon: Building2, color: '#F28C28', bg: '#FDF1E4' },
  { value: '5,000+', label: 'Student Athletes', icon: HandHeart, color: '#7255A8', bg: '#F1EDF8' },
  { value: '200+', label: 'Live Events', icon: CalendarDays, color: '#0A67B2', bg: '#EAF5FC' },
];

export const ImpactCard: React.FC = () => {
  return (
    <div className="flex h-full flex-col rounded-md border border-[#D8E0E7] bg-white p-3.5 shadow-2xs">
      <div className="mb-2.5 flex items-center gap-2 border-b border-[#E7EDF2] pb-1.5">
        <div className="h-3.5 w-1 rounded-full bg-[#0A67B2]" />
        <h3 className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#032D59]">
          Our Impact
        </h3>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2.5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1.5 rounded-md py-3 text-center"
              style={{ backgroundColor: stat.bg }}
            >
              <Icon size={20} style={{ color: stat.color }} />
              <span className="text-base font-black leading-none text-[#032D59]">
                {stat.value}
              </span>
              <span className="text-[9.5px] font-bold uppercase leading-tight text-[#586572]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
