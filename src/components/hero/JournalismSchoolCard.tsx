'use client';

import React from 'react';
import Image from 'next/image';
import {
  FaGraduationCap,
  FaEdit,
  FaCamera,
  FaMicrophone,
  FaVideo,
  FaYoutube,
  FaShieldAlt,
} from 'react-icons/fa';

interface JournalismSchoolCardProps {
  onKnowMore?: () => void;
  onEnrollNow?: () => void;
}

const CURRICULUM = [
  {
    title: 'Sports Reporting & Writing',
    icon: FaEdit,
    color: 'text-[#1868B7]',
  },
  {
    title: 'Photography & Mobile Video Journalism',
    icon: FaCamera,
    color: 'text-[#0B5FA5]',
  },
  {
    title: 'Interviews & Athlete Profiling',
    icon: FaMicrophone,
    color: 'text-[#0D9488]',
  },
  {
    title: 'Live Event Coverage',
    icon: FaVideo,
    color: 'text-[#168C45]',
  },
  {
    title: 'Social Media & YouTube Content',
    icon: FaYoutube,
    color: 'text-[#E5232E]',
  },
  {
    title: 'Ethics, Law, Privacy & Responsible Journalism',
    icon: FaShieldAlt,
    color: 'text-[#881337]',
  },
];

export const JournalismSchoolCard: React.FC<JournalismSchoolCardProps> = ({
  onKnowMore,
  onEnrollNow,
}) => {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg border border-[#D8E0E7] p-3 flex flex-col justify-between h-full shadow-2xs">
      {/* Full-card background photo */}
      <Image
        src="/press.png"
        alt="Sports press photographer covering a football match"
        fill
        sizes="(max-width: 1024px) 100vw, 24vw"
        className="object-cover pointer-events-none z-0"
      />
      {/* Soft gradient wash for flawless text legibility */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Section: Header & Description */}
        <div>
          {/* Header with blue gradient accent */}
          <div className="flex items-center gap-2 p-1.5 mt-4 rounded-md bg-white/95 border border-[#D8E5F2] shadow-2xs">
            <div className="w-8 h-8 rounded bg-[#032D59] flex items-center justify-center text-white shrink-0 shadow-xs">
              <FaGraduationCap size={18} />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xs sm:text-[13px] font-black text-[#032D59] tracking-tight leading-tight uppercase">
                SPORTS MEDIA JOURNALISM SCHOOL
              </h3>
              <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-black text-slate-800 tracking-tight leading-none mt-0.5">
                <span>Learn</span>
                <span className="text-amber-500">&bull;</span>
                <span>Report</span>
                <span className="text-amber-500">&bull;</span>
                <span>Share</span>
                <span className="text-amber-500">&bull;</span>
                <span className="text-[#0B5FA5]">Make an Impact</span>
              </div>
            </div>
          </div>

          {/* Programme Description */}
          <p className="text-xs sm:text-[12.5px] text-slate-800 font-semibold leading-relaxed mt-4 sm:mt-4 px-0.5">
            A unique certificate training programme to create a new generation of
            sports journalists, campus reporters and digital content creators.
          </p>

          {/* 6 Curriculum Bullet Points */}
          <div className="max-w-[65%] space-y-1.5 mt-3.5 sm:mt-4 py-0.5">
            {CURRICULUM.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs mt-4 sm:text-[12.5px] font-extrabold text-slate-900 leading-snug py-0.5"
                >
                  <div className={`shrink-0 ${item.color}`}>
                    <Icon size={15} />
                  </div>
                  <span className="truncate">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-200/80">
          <button
            type="button"
            onClick={onKnowMore}
            className="py-2.5 px-3 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider rounded-md shadow-xs text-center transition-all active:scale-98 cursor-pointer"
          >
            KNOW MORE
          </button>
          <button
            type="button"
            onClick={onEnrollNow}
            className="py-2.5 px-3 bg-gradient-to-r from-[#168C45] to-[#116E36] hover:from-[#116E36] hover:to-[#0D5429] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider rounded-md shadow-xs text-center transition-all active:scale-98 cursor-pointer"
          >
            ENROLL NOW
          </button>
        </div>
      </div>
    </div>
  );
};
