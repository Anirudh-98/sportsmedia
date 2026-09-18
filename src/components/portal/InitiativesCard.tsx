'use client';

import React from 'react';
import { INITIATIVES } from '@/data/initiatives';
import { Trophy, Image as ImageIcon, Target, Dumbbell, GraduationCap, Award, ChevronRight } from 'lucide-react';

interface InitiativesCardProps {
  onSelectInitiative?: (id: string) => void;
}

export const InitiativesCard: React.FC<InitiativesCardProps> = ({ onSelectInitiative }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'trophy':
        return <Trophy size={15} className="text-[#0B5FA5]" />;
      case 'gallery':
        return <ImageIcon size={15} className="text-[#0B5FA5]" />;
      case 'target':
        return <Target size={15} className="text-[#168C45]" />;
      case 'fitness':
        return <Dumbbell size={15} className="text-[#F28C28]" />;
      case 'education':
        return <GraduationCap size={15} className="text-[#032D59]" />;
      case 'scholarship':
        return <Award size={15} className="text-[#E5232E]" />;
      default:
        return <Trophy size={15} className="text-[#0B5FA5]" />;
    }
  };

  return (
    <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs flex flex-col h-full justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#E7EDF2]">
          <div className="h-3.5 w-1 bg-[#0B5FA5] rounded-full" />
          <h3 className="text-xs sm:text-[13px] font-black text-[#032D59] tracking-wider uppercase">
            OUR INITIATIVES
          </h3>
        </div>

        {/* Initiatives List */}
        <div className="space-y-1.5">
          {INITIATIVES.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectInitiative && onSelectInitiative(item.id)}
              className="w-full text-left p-2 rounded-sm border border-slate-200 hover:border-[#0B5FA5]/40 hover:bg-[#EAF5FC]/60 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-slate-100 group-hover:bg-white group-hover:shadow-xs transition-all border border-slate-200 shrink-0">
                  {getIcon(item.iconName)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-[13px] font-black text-[#032D59] group-hover:text-[#0B5FA5] tracking-tight leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-700 font-semibold leading-tight mt-0.5">
                    {item.description}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={16}
                className="text-slate-400 group-hover:text-[#0B5FA5] group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

