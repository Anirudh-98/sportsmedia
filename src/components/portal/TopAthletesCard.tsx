'use client';

import React from 'react';
import Image from 'next/image';
import { TOP_ATHLETES, Athlete } from '@/data/athletes';

interface TopAthletesCardProps {
  onSelectAthlete: (athlete: Athlete) => void;
  onViewAll?: () => void;
}

export const TopAthletesCard: React.FC<TopAthletesCardProps> = ({ onSelectAthlete, onViewAll }) => {
  return (
    <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-1.5 border-b border-[#E7EDF2]">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 bg-[#0B5FA5] rounded-full" />
          <h3 className="text-xs sm:text-sm font-black text-[#032D59] tracking-wider uppercase">
            Top Athletes
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="text-[10px] font-bold text-[#0A67B2] uppercase tracking-wide hover:underline"
        >
          View All
        </button>
      </div>

      {/* 4 Athlete Cards Grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {TOP_ATHLETES.map((athlete) => (
          <button
            key={athlete.id}
            type="button"
            onClick={() => onSelectAthlete(athlete)}
            className="flex flex-col items-center text-center group cursor-pointer"
          >
            {/* Circular Athlete Portrait */}
            <div className="relative w-full aspect-square overflow-hidden rounded-full bg-[#e0f2fe] border-2 border-[#EAF5FC] shadow-2xs group-hover:border-[#0A67B2] transition-all duration-300">
              <Image
                src={athlete.image}
                alt={athlete.name}
                fill
                sizes="(max-width: 768px) 22vw, 90px"
                className="object-cover object-top"
              />
            </div>

            {/* Athlete Name */}
            <div className="mt-1.5 w-full truncate text-[10.5px] font-black leading-tight text-[#032D59] group-hover:text-[#0A67B2]">
              {athlete.name}
            </div>

            {/* Sport Name */}
            <div className="text-[9px] font-bold leading-none text-[#586572] mt-0.5">
              {athlete.sport}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
