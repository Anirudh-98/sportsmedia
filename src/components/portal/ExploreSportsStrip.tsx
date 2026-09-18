'use client';

import React from 'react';
import {
  FaRunning,
  FaFutbol,
  FaVolleyballBall,
  FaBasketballBall,
  FaTableTennis,
  FaSwimmer,
  FaChessKnight,
  FaBicycle,
  FaChevronRight,
} from 'react-icons/fa';
import {
  MdSportsCricket,
  MdSportsKabaddi,
  MdSportsMartialArts,
} from 'react-icons/md';
import {
  GiShuttlecock,
  GiBoxingGlove,
  GiTennisRacket,
  GiSprint,
  GiHockey,
} from 'react-icons/gi';
import { GrYoga } from 'react-icons/gr';
import { IoMdMore } from 'react-icons/io';

interface ExploreSportsStripProps {
  onSelectSport?: (sport: string) => void;
  onExploreAll?: () => void;
}

// 18 sports matching reference image exactly with specialized react-icons
const SPORTS = [
  { name: 'ATHLETICS', color: 'bg-[#1565C0]', icon: FaRunning },
  { name: 'FOOTBALL', color: 'bg-[#168C45]', icon: FaFutbol },
  { name: 'CRICKET', color: 'bg-[#E5232E]', icon: MdSportsCricket },
  { name: 'BADMINTON', color: 'bg-[#10B981]', icon: GiShuttlecock },
  { name: 'VOLLEYBALL', color: 'bg-[#F59E0B]', icon: FaVolleyballBall },
  { name: 'BASKETBALL', color: 'bg-[#B45309]', icon: FaBasketballBall },
  { name: 'HOCKEY', color: 'bg-[#032D59]', icon: GiHockey },
  { name: 'WRESTLING', color: 'bg-[#EA580C]', icon: MdSportsMartialArts },
  { name: 'BOXING', color: 'bg-[#DC2626]', icon: GiBoxingGlove },
  { name: 'TABLE TENNIS', color: 'bg-[#0284C7]', icon: FaTableTennis },
  { name: 'TENNIS', color: 'bg-[#84CC16]', icon: GiTennisRacket },
  { name: 'SWIMMING', color: 'bg-[#06B6D4]', icon: FaSwimmer },
  { name: 'YOGA', color: 'bg-[#9333EA]', icon: GrYoga },
  { name: 'CHESS', color: 'bg-[#1E293B]', icon: FaChessKnight },
  { name: 'KHO-KHO', color: 'bg-[#16A34A]', icon: GiSprint },
  { name: 'KABADDI', color: 'bg-[#F97316]', icon: MdSportsKabaddi },
  { name: 'CYCLING', color: 'bg-[#2563EB]', icon: FaBicycle },
  { name: 'MORE', color: 'bg-[#64748B]', icon: IoMdMore },
];

export const ExploreSportsStrip: React.FC<ExploreSportsStripProps> = ({
  onSelectSport,
  onExploreAll,
}) => {
  return (
    <section className="w-full bg-gradient-to-r from-[#D8EDFC] via-[#EEF7FD] to-[#D8EDFC] border-y border-[#BCD7EF] py-2 px-2 sm:px-3 shadow-2xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1.5 bg-[#0B5FA5] rounded-full" />
          <h3 className="text-xs sm:text-sm font-black text-[#032D59] uppercase tracking-wider">
            EXPLORE SPORTS &amp; GAMES
          </h3>
        </div>

        <button
          type="button"
          onClick={onExploreAll}
          className="text-xs sm:text-[12.5px] font-black text-[#0B5FA5] hover:text-[#032D59] uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>EXPLORE ALL SPORTS</span>
          <FaChevronRight size={12} />
        </button>
      </div>

      {/* 18 Sports Circular Icons Row */}
      <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-18 gap-1.5 sm:gap-2">
        {SPORTS.map((sport) => {
          const Icon = sport.icon;
          return (
            <button
              key={sport.name}
              type="button"
              onClick={() => onSelectSport && onSelectSport(sport.name)}
              className="flex flex-col items-center text-center group cursor-pointer p-0.5"
            >
              {/* Colored Circular Icon */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${sport.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-200`}
              >
                <Icon size={20} />
              </div>

              {/* Sport Label */}
              <span className="text-[10px] sm:text-[11px] font-black text-[#032D59] group-hover:text-[#0B5FA5] uppercase tracking-tight mt-1 leading-tight truncate w-full">
                {sport.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
