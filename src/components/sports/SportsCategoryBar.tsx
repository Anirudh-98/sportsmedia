'use client';

import React from 'react';
import { SPORTS_CATEGORIES } from '@/data/sports';

interface SportsCategoryBarProps {
  onSelectSport?: (id: string) => void;
  onExploreAll?: () => void;
}

export const SportsCategoryBar: React.FC<SportsCategoryBarProps> = ({
  onSelectSport,
  onExploreAll,
}) => {
  return (
    <section className="w-full bg-white border border-[#D8E0E7] rounded-md shadow-2xs px-3 py-2.5">
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#E7EDF2]">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 bg-[#0A67B2] rounded-full" />
          <h2 className="text-xs sm:text-[13px] font-black text-[#063A70] tracking-wider uppercase">
            Explore Sports &amp; Games
          </h2>
        </div>
        <button
          type="button"
          onClick={onExploreAll}
          className="text-[10px] sm:text-[11px] font-bold text-[#0A67B2] uppercase tracking-wide hover:underline"
        >
          Explore All Sports &gt;
        </button>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-1 sm:justify-between sm:gap-2">
        {SPORTS_CATEGORIES.map((sport) => {
          const Icon = sport.icon;
          return (
            <button
              key={sport.id}
              type="button"
              onClick={() => onSelectSport?.(sport.id)}
              className="group flex shrink-0 flex-col items-center gap-1 rounded-md px-1.5 py-1 transition-colors hover:bg-slate-50"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-2xs transition-transform group-hover:scale-110 sm:h-9 sm:w-9"
                style={{ backgroundColor: sport.color }}
              >
                <Icon size={16} strokeWidth={2} />
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#17212B] tracking-tight whitespace-nowrap">
                {sport.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
