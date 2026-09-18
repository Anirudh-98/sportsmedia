'use client';

import React from 'react';
import Image from 'next/image';
import { FaTrophy } from 'react-icons/fa';
import { Athlete, TOP_ATHLETES } from '@/data/athletes';

const REF_IMAGES: Record<string, string> = {
  'rohit-kumar': '/image/athelete3.png',
  'ananya-reddy': '/image/athelete2.png',
  'vikram-singh': '/image/athelete1.png',
  'sara-khan': '/image/athelete.png',
};

interface TopAthletesGridProps {
  onSelectAthlete?: (athlete: Athlete) => void;
  onViewAll?: () => void;
}

export const TopAthletesGrid: React.FC<TopAthletesGridProps> = ({
  onSelectAthlete,
  onViewAll,
}) => {
  const displayAthletes = TOP_ATHLETES.slice(0, 4).map((athlete) => ({
    ...athlete,
    image: REF_IMAGES[athlete.id] || athlete.image,
  }));

  return (
    <div className="bg-white rounded-lg border border-[#D8E0E7] p-2.5 sm:p-3 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Header with blue gradient */}
        <div className="flex items-center justify-between p-1.5 rounded-xs bg-gradient-to-r from-[#EEF6FC] via-[#F6FAFE] to-white border border-[#D8E5F2] mb-2.5">
          <div className="flex items-center gap-2">
            <FaTrophy size={16} className="text-[#0B5FA5]" />
            <h3 className="text-xs sm:text-[13.5px] font-black text-[#032D59] uppercase tracking-wider">
              TOP ATHLETES
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs sm:text-[12.5px] font-black text-[#0B5FA5] hover:text-[#032D59] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* 4 Athletes Horizontal Grid matching Reference Image */}
        <div className="grid grid-cols-4 gap-2">
          {displayAthletes.map((athlete) => (
            <div
              key={athlete.id}
              onClick={() => onSelectAthlete && onSelectAthlete(athlete)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Photo Box with Rounded Corners and Sky Background */}
              <div className="relative w-full aspect-[56/64] rounded-md overflow-hidden bg-[#DDF0FD] border border-slate-200 group-hover:border-[#0B5FA5] group-hover:scale-105 transition-all duration-200 shadow-2xs">
                <Image
                  src={athlete.image}
                  alt={athlete.name}
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Name */}
              <span className="text-xs sm:text-[12.5px] font-black text-[#032D59] group-hover:text-[#0B5FA5] leading-tight mt-1.5 truncate w-full">
                {athlete.name}
              </span>

              {/* Sport */}
              <span className="text-[11px] sm:text-xs text-[#0B5FA5] font-extrabold leading-tight mt-0.5">
                {athlete.sport}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
