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
    { title: 'Sponsor a Trainee Journalist', icon: FaUserGraduate, color: 'text-[#168C45]' },
    { title: 'Advertise With Us', icon: FaBullhorn, color: 'text-[#168C45]' },
    { title: 'Sports Gallery', icon: FaImages, color: 'text-[#0B5FA5]' },
    { title: 'Contact Us', icon: FaPhoneAlt, color: 'text-[#168C45]' },
  ];

  // Interleaved so each left link shares a grid row (and height) with its right neighbour
  const links = leftLinks.flatMap((link, idx) => [link, rightLinks[idx]]);

  return (
    <div className="bg-white rounded-lg border border-[#D8E0E7] p-2 flex flex-col justify-between h-full shadow-2xs">
      <div className="flex-1 flex flex-col">
        {/* Header with blue gradient */}
        <div className="flex items-center gap-2 px-1.5 py-1 rounded-xs bg-gradient-to-r from-[#EEF6FC] via-[#F6FAFE] to-white border border-[#D8E5F2] mb-1.5">
          <FaLink size={14} className="text-[#0B5FA5]" />
          <h3 className="text-xs sm:text-[13.5px] font-black text-[#032D59] uppercase tracking-wider">
            QUICK LINKS
          </h3>
        </div>

        {/* 2 Columns of Links */}
        <div className="flex-1 grid grid-cols-2 auto-rows-fr gap-1.5">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={() => onSelectLink && onSelectLink(item.title)}
                className="w-full flex items-center gap-2 px-2 py-1 rounded-xs bg-[#F8FAFC] hover:bg-[#EEF6FC] border border-slate-200 hover:border-[#0B5FA5]/40 text-left group transition-colors cursor-pointer"
              >
                <Icon size={14} className={`${item.color} shrink-0`} />
                <span className="text-xs sm:text-[12.5px] font-black leading-tight text-slate-900 group-hover:text-[#0B5FA5]">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
