'use client';

import React from 'react';
import { X, Award, Medal, School, MapPin, TrendingUp, Star } from 'lucide-react';
import { Athlete } from '@/data/athletes';

interface AthleteModalProps {
  isOpen: boolean;
  athlete: Athlete | null;
  onClose: () => void;
}

export const AthleteModal: React.FC<AthleteModalProps> = ({ isOpen, athlete, onClose }) => {
  if (!isOpen || !athlete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header Profile Cover */}
        <div className={`bg-gradient-to-r ${athlete.avatarBg} p-6 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center font-black text-xl shadow-lg border-2 border-amber-400">
              {athlete.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-black uppercase mb-1">
                <Star size={10} fill="currentColor" />
                Rank #{athlete.rank} National Talent
              </div>
              <h3 className="text-xl font-black text-white leading-tight">{athlete.name}</h3>
              <p className="text-xs text-blue-100 font-medium">{athlete.sport} • Age {athlete.age}</p>
            </div>
          </div>
        </div>

        {/* Details Body */}
        <div className="p-5 space-y-4">
          {/* School & City */}
          <div className="flex flex-col gap-1 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <School size={14} className="text-[#1565c0]" />
              <span className="font-bold text-slate-800">{athlete.school}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-red-500" />
              <span>{athlete.city}, India</span>
            </div>
          </div>

          {/* Medals Counter */}
          <div>
            <h5 className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-2">
              Medal Tally
            </h5>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg">
                <Medal size={16} className="text-amber-500 mx-auto mb-0.5" fill="currentColor" />
                <span className="block text-base font-black text-amber-900">{athlete.medals.gold}</span>
                <span className="text-[10px] text-amber-700 font-bold">Gold</span>
              </div>
              <div className="p-2 bg-slate-100 border border-slate-200 rounded-lg">
                <Medal size={16} className="text-slate-400 mx-auto mb-0.5" fill="currentColor" />
                <span className="block text-base font-black text-slate-800">{athlete.medals.silver}</span>
                <span className="text-[10px] text-slate-600 font-bold">Silver</span>
              </div>
              <div className="p-2 bg-amber-100/50 border border-amber-300 rounded-lg">
                <Medal size={16} className="text-amber-700 mx-auto mb-0.5" fill="currentColor" />
                <span className="block text-base font-black text-amber-900">{athlete.medals.bronze}</span>
                <span className="text-[10px] text-amber-800 font-bold">Bronze</span>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div>
            <h5 className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-1 flex items-center gap-1.5">
              <TrendingUp size={13} className="text-emerald-600" />
              Career Highlight
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 font-medium">
              {athlete.highlight}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 bg-[#0d2240] hover:bg-[#1565c0] text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            CLOSE ATHLETE PROFILE
          </button>
        </div>
      </div>
    </div>
  );
};
