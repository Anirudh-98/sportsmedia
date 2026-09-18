'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaShieldAlt,
  FaSchool,
  FaUsers,
  FaArrowLeft,
  FaCheckCircle,
  FaMapMarkerAlt,
} from 'react-icons/fa';

export default function ClubsPage() {
  const clubs = [
    {
      name: 'Deccan Junior Athletics Club',
      city: 'Hyderabad',
      sport: 'Athletics & Track',
      members: '180+ Student Athletes',
      school: 'Affiliated with 12 Schools in Ranga Reddy District',
    },
    {
      name: 'Twin Cities School Football Alliance',
      city: 'Hyderabad & Secunderabad',
      sport: 'Football',
      members: '320+ Youth Players',
      school: 'Organizes annual Sub-Junior League across 24 Schools',
    },
    {
      name: 'Pullela Gopichand Grassroots Badminton Club',
      city: 'Hyderabad',
      sport: 'Badminton',
      members: '140+ Shuttlers',
      school: 'Feeder academy for junior national ranking champions',
    },
    {
      name: 'Secunderabad Youth Aquatic Society',
      city: 'Secunderabad',
      sport: 'Swimming & Water Polo',
      members: '95+ Swimmers',
      school: 'Trains district medalists in olympic swimming styles',
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
          <span className="text-[#032D59] font-black">Clubs &amp; Initiatives</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          Affiliated Network
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          SPORTS CLUBS &amp; INITIATIVE NETWORK
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Recognized school sports clubs and training academies building competitive sports culture at the district and state levels.
        </p>
      </div>

      {/* Clubs Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {clubs.map((club, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded uppercase">
                  {club.sport}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <FaMapMarkerAlt /> {club.city}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#032D59] uppercase mb-1">
                {club.name}
              </h2>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                {club.school}
              </p>
              <div className="text-xs font-bold text-[#168C45] flex items-center gap-1">
                <FaUsers /> {club.members}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/contact"
                className="text-xs font-black text-[#0B5FA5] hover:underline"
              >
                Affiliate Your School Club &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
