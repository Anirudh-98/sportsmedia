'use client';

import React from 'react';
import { Trophy, School, Users, Video, Award, Target } from 'lucide-react';

const STATS = [
  {
    value: '100+',
    label: 'SPORTS COVERED',
    color: 'text-[#0B5FA5]',
    circleBg: 'bg-[#0B5FA5]',
    icon: Trophy,
  },
  {
    value: '500+',
    label: 'SCHOOLS & COLLEGES',
    color: 'text-[#168C45]',
    circleBg: 'bg-[#168C45]',
    icon: School,
  },
  {
    value: '5000+',
    label: 'ATHLETES ENGAGED',
    color: 'text-[#F28C28]',
    circleBg: 'bg-[#F28C28]',
    icon: Users,
  },
  {
    value: '200+',
    label: 'EVENTS',
    color: 'text-[#9333EA]',
    circleBg: 'bg-[#9333EA]',
    icon: Video,
  },
  {
    value: '100+',
    label: 'COACHES',
    color: 'text-[#0D9488]',
    circleBg: 'bg-[#0D9488]',
    icon: Award,
  },
  {
    value: '1 Goal',
    label: 'A STRONGER SPORTS ECOSYSTEM',
    color: 'text-[#032D59]',
    circleBg: 'bg-[#032D59]',
    icon: Target,
  },
];

export const ImpactSection: React.FC = () => {
  return (
    <section className="w-full bg-white rounded-md border border-[#D8E0E7] p-3 sm:p-4 shadow-2xs">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-3 pb-1.5 border-b border-[#E7EDF2]">
        <div className="h-3.5 w-1 bg-[#0B5FA5] rounded-full" />
        <h3 className="text-xs sm:text-sm font-black text-[#032D59] tracking-wider uppercase">
          OUR IMPACT AT A GLANCE
        </h3>
      </div>

      {/* 6 Stats Circles Grid */}
      <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-between text-center p-2.5 sm:p-3 py-3.5 sm:py-4.5 min-h-[145px] sm:min-h-[165px] rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 group cursor-pointer transition-all"
            >
              {/* Solid Circular Icon Badge */}
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform duration-300 ${stat.circleBg}`}
              >
                <Icon size={22} strokeWidth={2.4} />
              </div>

              {/* Stat Value */}
              <span className={`text-base sm:text-lg font-black tracking-tight leading-none mt-2 ${stat.color}`}>
                {stat.value}
              </span>

              {/* Stat Label */}
              <span className="text-[11px] sm:text-xs font-black text-slate-800 uppercase tracking-tight mt-1 leading-tight max-w-[120px]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
