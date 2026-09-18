'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaTrophy,
  FaSchool,
  FaFemale,
  FaHeartbeat,
  FaArrowLeft,
  FaCheckCircle,
} from 'react-icons/fa';

export default function InitiativesPage() {
  const initiatives = [
    {
      title: 'School Sports Information Centres (SSIC)',
      desc: 'Transforming school sports rooms into active sports media bureaus where student reporters document school champions, upload tournament videos, and curate digital athlete portfolios.',
      icon: FaSchool,
      color: 'bg-blue-600',
    },
    {
      title: 'Rural Sports Talent Discovery',
      desc: 'Mobile scouting units traveling to mandals and rural government schools to conduct standardized athletic testing (30m flying sprint, vertical jump, beep test) to uncover hidden Olympic potential.',
      icon: FaTrophy,
      color: 'bg-emerald-600',
    },
    {
      title: 'Nurturing Girls in Athletics (Women in Sports)',
      desc: 'Dedicated mentorship and free specialized gear kits for underprivileged girl athletes to break social barriers and prepare for national junior ranking championships.',
      icon: FaFemale,
      color: 'bg-rose-600',
    },
    {
      title: 'Sports Science & Injury Prevention Camps',
      desc: 'Free health screenings, physiotherapy sessions, posture correction, and diet counseling for student athletes to prevent burnout and ACL tears.',
      icon: FaHeartbeat,
      color: 'bg-amber-600',
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center py-6 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-[#0B5FA5] flex items-center gap-1">
            <FaArrowLeft size={12} />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#032D59] font-black">Our Initiatives</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          Grassroots Programs
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          OUR GRASSROOTS INITIATIVES
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Flagship community campaigns driven by SportsMedia Blue Zone to build a healthier, stronger, and united sporting nation.
        </p>
      </div>

      {/* Initiatives Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {initiatives.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-lg ${item.color} text-white flex items-center justify-center shadow-xs`}>
                    <Icon size={22} />
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-[#032D59] uppercase">
                    {item.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
