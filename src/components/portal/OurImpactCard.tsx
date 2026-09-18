'use client';

import React from 'react';
import { FaChartBar, FaGlobe, FaUniversity, FaUsers, FaCalendarAlt } from 'react-icons/fa';

export const OurImpactCard: React.FC = () => {
  const stats = [
    {
      value: '100+',
      line1: 'SPORTS',
      line2: '',
      icon: FaGlobe,
      cardBg: 'bg-[#DDF4E4]',
      borderColor: 'border-[#B8EBD0]',
      textColor: 'text-[#0F7638]',
    },
    {
      value: '500+',
      line1: 'SCHOOLS &',
      line2: 'COLLEGES',
      icon: FaUniversity,
      cardBg: 'bg-[#FEEFD9]',
      borderColor: 'border-[#FCDDB5]',
      textColor: 'text-[#B84E0B]',
    },
    {
      value: '5,000+',
      line1: 'STUDENT',
      line2: 'ATHLETES',
      icon: FaUsers,
      cardBg: 'bg-[#EFE4FA]',
      borderColor: 'border-[#E2C7F3]',
      textColor: 'text-[#5B21B6]',
    },
    {
      value: '200+',
      line1: 'LIVE EVENTS',
      line2: '',
      icon: FaCalendarAlt,
      cardBg: 'bg-[#DBF1FD]',
      borderColor: 'border-[#BDDFF4]',
      textColor: 'text-[#026AA7]',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#D8E0E7] p-2.5 sm:p-3 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Header with blue gradient */}
        <div className="flex items-center gap-2 p-1.5 rounded-xs bg-gradient-to-r from-[#EEF6FC] via-[#F6FAFE] to-white border border-[#D8E5F2] mb-2.5">
          <FaChartBar size={16} className="text-[#0B5FA5]" />
          <h3 className="text-xs sm:text-[13.5px] font-black text-[#032D59] uppercase tracking-wider">
            OUR IMPACT
          </h3>
        </div>

        {/* 4 Vertical Metric Cards matching reference image exactly */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`${stat.cardBg} ${stat.borderColor} border rounded-md p-2 sm:p-2.5 py-4 sm:py-5 flex flex-col items-center justify-between text-center min-h-[155px] sm:min-h-[175px] shadow-2xs group hover:scale-105 transition-transform duration-200`}
              >
                {/* Icon row */}
                <div className={`h-8 flex items-center justify-center ${stat.textColor}`}>
                  <Icon size={24} />
                </div>

                {/* Number row - strictly aligned */}
                <div className="h-8 flex items-center justify-center my-auto">
                  <span className={`text-lg sm:text-xl font-black leading-none ${stat.textColor}`}>
                    {stat.value}
                  </span>
                </div>

                {/* Label row - fixed 2-line height for identical baseline */}
                <div className={`h-9 flex flex-col items-center justify-start text-[10.5px] sm:text-xs font-black uppercase tracking-tight leading-tight ${stat.textColor}`}>
                  <div>{stat.line1}</div>
                  {stat.line2 ? (
                    <div>{stat.line2}</div>
                  ) : (
                    <div className="invisible select-none" aria-hidden="true">&nbsp;</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
