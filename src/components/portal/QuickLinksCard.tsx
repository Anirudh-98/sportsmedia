'use client';

import React from 'react';
import {
  FaLink,
  FaGraduationCap,
  FaBriefcase,
  FaUpload,
  FaHandsHelping,
  FaBullhorn,
  FaImages,
  FaPhoneAlt,
  FaUserGraduate,
} from 'react-icons/fa';

interface QuickLinksCardProps {
  onSelectLink?: (link: string) => void;
}

export const QuickLinksCard: React.FC<QuickLinksCardProps> = ({ onSelectLink }) => {
  const leftLinks = [
    { title: 'Scholarship & Support', icon: FaGraduationCap, color: 'text-[#168C45]' },
    { title: 'Job Portal', icon: FaBriefcase, color: 'text-[#0B5FA5]' },
    { title: 'Upload Your Story', icon: FaUpload, color: 'text-[#168C45]' },
    { title: 'Become a Volunteer', icon: FaHandsHelping, color: 'text-[#F59E0B]' },
  ];

  const rightLinks = [
    { title: 'Sponsor a Student', icon: FaUserGraduate, color: 'text-[#168C45]' },
    { title: 'Advertise With Us', icon: FaBullhorn, color: 'text-[#168C45]' },
    { title: 'Sports Gallery', icon: FaImages, color: 'text-[#0B5FA5]' },
    { title: 'Contact Us', icon: FaPhoneAlt, color: 'text-[#168C45]' },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#D8E0E7] p-3.5 sm:p-4 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Header with blue gradient */}
        <div className="flex items-center gap-2.5 p-2 rounded-xs bg-gradient-to-r from-[#EEF6FC] via-[#F6FAFE] to-white border border-[#D8E5F2] mb-3">
          <FaLink size={17} className="text-[#0B5FA5]" />
          <h3 className="text-sm sm:text-base font-black text-[#032D59] uppercase tracking-wider">
            QUICK LINKS
          </h3>
        </div>

        {/* 2 Columns of Links */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Left Column */}
          <div className="space-y-2">
            {leftLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectLink && onSelectLink(item.title)}
                  className="w-full flex items-center gap-2 p-2 rounded-xs bg-[#F8FAFC] hover:bg-[#EEF6FC] border border-slate-200 hover:border-[#0B5FA5]/40 text-left group transition-colors cursor-pointer"
                >
                  <Icon size={15} className={`${item.color} shrink-0`} />
                  <span className="text-xs sm:text-sm font-black leading-snug text-slate-900 group-hover:text-[#0B5FA5]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            {rightLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectLink && onSelectLink(item.title)}
                  className="w-full flex items-center gap-2 p-2 rounded-xs bg-[#F8FAFC] hover:bg-[#EEF6FC] border border-slate-200 hover:border-[#0B5FA5]/40 text-left group transition-colors cursor-pointer"
                >
                  <Icon size={15} className={`${item.color} shrink-0`} />
                  <span className="text-xs sm:text-sm font-black leading-snug text-slate-900 group-hover:text-[#0B5FA5]">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
