'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaTrophy,
  FaMedal,
  FaArrowLeft,
  FaSearch,
  FaSchool,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { TOP_ATHLETES } from '@/data/athletes';

const REF_IMAGES: Record<string, string> = {
  'rohit-kumar': '/image/athelete3.png',
  'ananya-reddy': '/image/athelete2.png',
  'vikram-singh': '/image/athelete1.png',
  'sara-khan': '/image/athelete.png',
};

export default function AthletesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');

  const athletesWithRef = TOP_ATHLETES.map((a) => ({
    ...a,
    image: REF_IMAGES[a.id] || a.image,
  }));

  const filteredAthletes = athletesWithRef.filter((a) => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'All' || a.sport.toLowerCase() === selectedSport.toLowerCase();
    return matchesSearch && matchesSport;
  });

  return (
    <div className="w-full flex-1 flex flex-col items-center py-6 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-[#0B5FA5] flex items-center gap-1">
            <FaArrowLeft size={12} />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#032D59] font-black">Top Athletes</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          Verified Talent Registry
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          TOP STUDENT ATHLETES DIRECTORY
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Recognizing the most promising school and college sports achievers across India with verified tournament records.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-2.5 mb-6">
        <div className="relative w-full">
          <FaSearch size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search athlete name or school..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-md text-xs font-medium focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden"
          />
        </div>

        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="w-full sm:w-44 py-2 px-3 bg-white border border-slate-300 rounded-md text-xs font-black uppercase text-slate-800 focus:outline-hidden"
        >
          <option value="All">All Sports</option>
          <option value="Athletics">Athletics</option>
          <option value="Badminton">Badminton</option>
          <option value="Cricket">Cricket</option>
          <option value="Swimming">Swimming</option>
        </select>
      </div>

      {/* Athletes Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {filteredAthletes.map((athlete) => (
          <div
            key={athlete.id}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Photo Banner with Sky Background */}
              <div className="relative w-full aspect-[4/3] bg-[#DDF0FD] overflow-hidden border-b border-slate-100 flex items-center justify-center">
                <Image
                  src={athlete.image}
                  alt={athlete.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-2.5 right-2.5 bg-[#032D59] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase">
                  Rank #{athlete.nationalRank || 1}
                </div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2">
                <div>
                  <span className="text-[11px] font-black text-[#0B5FA5] uppercase tracking-wider">
                    {athlete.sport}
                  </span>
                  <h3 className="text-base font-black text-[#032D59] uppercase tracking-tight">
                    {athlete.name}
                  </h3>
                </div>

                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5 truncate">
                    <FaSchool className="text-slate-400 shrink-0" />
                    <span className="truncate">{athlete.school}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-slate-400 shrink-0" />
                    <span>{athlete.city} &bull; Age {athlete.age}</span>
                  </div>
                </div>

                {/* Medals */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-black text-amber-600 flex items-center gap-1">
                    <FaMedal /> {athlete.medals.gold} Gold
                  </span>
                  <span className="text-xs font-black text-slate-500 flex items-center gap-1">
                    <FaMedal /> {athlete.medals.silver} Silver
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Link
                href={`/contact?nominate=${encodeURIComponent(athlete.name)}`}
                className="w-full block py-2 text-center bg-slate-50 hover:bg-[#0B5FA5] hover:text-white border border-slate-200 text-xs font-black text-[#032D59] rounded-md transition-colors uppercase tracking-wider"
              >
                Sponsor / Nominate
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
