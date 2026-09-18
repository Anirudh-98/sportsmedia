'use client';

import React, { useState } from 'react';
import { X, Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { SPORTS_JOBS, SportsJob } from '@/data/portalExtra';

interface JobsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JobsModal: React.FC<JobsModalProps> = ({ isOpen, onClose }) => {
  const [appliedId, setAppliedId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#881337] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <Briefcase size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">Sports Career &amp; Job Portal</h3>
              <p className="text-[10px] text-rose-200">Opportunities for PETs, Coaches &amp; Staff</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-rose-200 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3">
          {SPORTS_JOBS.map((job) => (
            <div
              key={job.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50/20 transition-all flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#0d2240] leading-tight">
                    {job.title}
                  </span>
                  <span className="px-2 py-0.5 bg-rose-100 text-[#881337] rounded text-[10px] font-black uppercase">
                    {job.salary}
                  </span>
                </div>
                <span className="block text-[11px] font-bold text-slate-600 mt-0.5">
                  {job.institution}
                </span>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1.5">
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-red-500" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-slate-400" />
                    Deadline: {job.deadline}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                {appliedId === job.id ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={14} /> Application Sent!
                  </span>
                ) : (
                  <button
                    onClick={() => setAppliedId(job.id)}
                    className="px-4 py-1 bg-[#881337] hover:bg-[#70102d] text-white text-[11px] font-black uppercase rounded-md shadow-2xs transition-colors cursor-pointer"
                  >
                    APPLY NOW
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
