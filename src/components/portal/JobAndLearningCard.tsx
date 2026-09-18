'use client';

import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

interface JobAndLearningCardProps {
  onOpenJobs: () => void;
  onOpenLearning: () => void;
}

export const JobAndLearningCard: React.FC<JobAndLearningCardProps> = ({
  onOpenJobs,
  onOpenLearning,
}) => {
  return (
    <div className="flex flex-col gap-2.5 h-full">
      {/* 1. JOB PORTAL CARD */}
      <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#032D59] tracking-wider uppercase">
              JOB PORTAL
            </h3>
            <div className="w-7 h-7 rounded bg-[#EAF5FC] flex items-center justify-center text-[#0B5FA5]">
              <Briefcase size={16} />
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-800 font-semibold mt-1 leading-tight">
            Find Sports Jobs &amp; Opportunities
          </p>
          <span className="inline-block mt-1.5 px-2 py-0.5 bg-slate-100 text-slate-800 text-[10px] font-bold rounded-xs border border-slate-200">
            50+ Openings for Coaches &amp; PETs
          </span>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={onOpenJobs}
            className="w-full py-2 bg-[#881337] hover:bg-[#70102d] text-white font-black text-xs uppercase tracking-wider rounded-xs shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            VIEW JOBS
          </button>
        </div>
      </div>

      {/* 2. E-LEARNING CARD */}
      <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-black text-[#032D59] tracking-wider uppercase">
              E-LEARNING
            </h3>
            <div className="w-7 h-7 rounded bg-[#E9F7EF] flex items-center justify-center text-[#168C45]">
              <GraduationCap size={17} />
            </div>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-800 font-semibold mt-1 leading-tight">
            Courses for Athletes Coaches &amp; Students
          </p>
          <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#E9F7EF] text-emerald-900 text-[10px] font-bold rounded-xs border border-emerald-200">
            Sports Courses &amp; Skillsets
          </span>
        </div>

        <div className="mt-3">
          <button
            type="button"
            onClick={onOpenLearning}
            className="w-full py-2 bg-[#168C45] hover:bg-[#116e36] text-white font-black text-xs uppercase tracking-wider rounded-xs shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            START LEARNING
          </button>
        </div>
      </div>
    </div>
  );
};
