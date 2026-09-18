'use client';

import React from 'react';
import Image from 'next/image';
import { X, Heart, Award, Users, BookOpen } from 'lucide-react';
import { BlueZoneTreeLogo } from '../brand/BrandLogos';

interface FoundationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoundationModal: React.FC<FoundationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0d2240] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-white rounded-md">
              <BlueZoneTreeLogo size={24} />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">Blue Zone Foundation</h3>
              <p className="text-[10px] text-blue-200">Empowering Talent • Enriching Lives</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-300 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner">
            <Image
              src="/images/foundation_kids.jpg"
              alt="Blue Zone Foundation Kids"
              fill
              className="object-cover object-top"
            />
          </div>

          <div>
            <h4 className="text-sm font-black text-[#0d2240] uppercase">
              Our Grassroots Sports Mission
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-1">
              Blue Zone Foundation is committed to identifying talented young athletes from rural, suburban, and underprivileged schools, providing them with sports kits, nutritional supplements, certified coaching, and competitive exposure.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg">
              <Users size={16} className="text-[#1565c0] mx-auto mb-1" />
              <span className="block text-sm font-black text-[#0d2240]">5,000+</span>
              <span className="text-[10px] text-slate-500 font-bold">Kids Supported</span>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg">
              <Award size={16} className="text-emerald-600 mx-auto mb-1" />
              <span className="block text-sm font-black text-emerald-800">120+</span>
              <span className="text-[10px] text-slate-500 font-bold">National Medals</span>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg">
              <BookOpen size={16} className="text-amber-600 mx-auto mb-1" />
              <span className="block text-sm font-black text-amber-800">100%</span>
              <span className="text-[10px] text-slate-500 font-bold">Free Equipment</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <h5 className="text-[11px] font-black text-slate-800 uppercase mb-1 flex items-center gap-1.5">
              <Heart size={14} className="text-red-500 fill-red-500" />
              Support a Student Athlete Scholarship
            </h5>
            <p className="text-[11px] text-slate-600">
              ₹1,500/month covers complete training, shoes, and dietary protein for an aspiring district champion.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-[#0d2240] hover:bg-[#1565c0] text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
          >
            CONTRIBUTE &amp; PARTNER WITH FOUNDATION
          </button>
        </div>
      </div>
    </div>
  );
};
