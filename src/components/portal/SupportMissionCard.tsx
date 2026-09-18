'use client';

import React from 'react';
import { AD_PACKAGES, AdPackage } from '@/data/pricing';
import { Megaphone, Award, Video, FileText, LayoutTemplate, Layers } from 'lucide-react';

interface SupportMissionCardProps {
  onOpenAdvertiseModal: (pkg?: AdPackage) => void;
}

export const SupportMissionCard: React.FC<SupportMissionCardProps> = ({
  onOpenAdvertiseModal,
}) => {
  const getPackageBadge = (pkg: AdPackage) => {
    switch (pkg.tagColor) {
      case 'green':
        return {
          bg: 'bg-[#E9F7EF] border-emerald-200 text-emerald-900',
          icon: <Megaphone size={13} className="text-[#168C45]" />,
        };
      case 'pink':
        return {
          bg: 'bg-rose-50/80 border-rose-200 text-rose-900',
          icon: <LayoutTemplate size={13} className="text-rose-600" />,
        };
      case 'orange':
        return {
          bg: 'bg-amber-50/80 border-amber-200 text-amber-900',
          icon: <Layers size={13} className="text-[#F28C28]" />,
        };
      case 'teal':
        return {
          bg: 'bg-teal-50/80 border-teal-200 text-teal-900',
          icon: <FileText size={13} className="text-[#0D9488]" />,
        };
      case 'red':
        return {
          bg: 'bg-red-50/80 border-red-200 text-red-900',
          icon: <Video size={13} className="text-[#E5232E]" />,
        };
      case 'gold':
        return {
          bg: 'bg-yellow-50/80 border-yellow-200 text-yellow-900',
          icon: <Award size={13} className="text-amber-600" />,
        };
      default:
        return {
          bg: 'bg-slate-50 border-slate-200 text-slate-900',
          icon: <Megaphone size={13} className="text-slate-600" />,
        };
    }
  };

  return (
    <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#E7EDF2]">
          <div className="h-3.5 w-1 bg-[#0B5FA5] rounded-full" />
          <h3 className="text-xs sm:text-[13px] font-black text-[#032D59] tracking-wider uppercase">
            SUPPORT OUR MISSION
          </h3>
        </div>

        {/* 2x3 Grid */}
        <div className="grid grid-cols-2 gap-1.5">
          {AD_PACKAGES.map((pkg) => {
            const badge = getPackageBadge(pkg);
            return (
              <div
                key={pkg.id}
                onClick={() => onOpenAdvertiseModal(pkg)}
                className={`p-2 rounded-sm border flex items-start gap-2 cursor-pointer hover:shadow-2xs hover:scale-[1.02] transition-all ${badge.bg}`}
              >
                <div className="mt-0.5 p-1 rounded bg-white shadow-2xs shrink-0">
                  {badge.icon}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black text-slate-900 tracking-tight leading-tight truncate">
                    {pkg.name}
                  </span>
                  <span className="text-xs font-extrabold text-slate-950 mt-0.5 leading-none">
                    {pkg.priceDisplay}
                  </span>
                  <span className="text-[10px] text-slate-700 font-semibold leading-tight mt-0.5 truncate">
                    {pkg.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Red Call-to-Action Button */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => onOpenAdvertiseModal()}
          className="w-full py-2.5 px-3 bg-[#E5232E] hover:bg-[#B5121B] text-white font-black text-xs uppercase tracking-wider rounded-xs shadow-2xs hover:shadow-xs transition-all active:scale-98 cursor-pointer text-center flex items-center justify-center gap-1.5"
        >
          <span>CLICK HERE TO ADVERTISE &amp; SUPPORT</span>
        </button>
      </div>
    </div>
  );
};
