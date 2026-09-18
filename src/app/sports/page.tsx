'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaRunning,
  FaFutbol,
  FaVolleyballBall,
  FaBasketballBall,
  FaTableTennis,
  FaSwimmer,
  FaChessKnight,
  FaBicycle,
  FaSearch,
  FaArrowLeft,
  FaMedal,
} from 'react-icons/fa';
import {
  MdSportsCricket,
  MdSportsKabaddi,
  MdSportsMartialArts,
} from 'react-icons/md';
import {
  GiShuttlecock,
  GiBoxingGlove,
  GiTennisRacket,
  GiSprint,
  GiHockey,
} from 'react-icons/gi';
import { GrYoga } from 'react-icons/gr';

const ALL_SPORTS = [
  { name: 'ATHLETICS', category: 'Track & Field', icon: FaRunning, color: 'bg-[#1565C0]', desc: '100m sprint, relays, high jump, shot put, long jump.' },
  { name: 'FOOTBALL', category: 'Team Sports', icon: FaFutbol, color: 'bg-[#168C45]', desc: 'Inter-school leagues, Subroto Cup trials, state cups.' },
  { name: 'CRICKET', category: 'Team Sports', icon: MdSportsCricket, color: 'bg-[#E5232E]', desc: 'Under-14, Under-16, and Under-19 school tournaments.' },
  { name: 'BADMINTON', category: 'Racket Sports', icon: GiShuttlecock, color: 'bg-[#10B981]', desc: 'Singles, doubles, and national junior ranking circuits.' },
  { name: 'VOLLEYBALL', category: 'Team Sports', icon: FaVolleyballBall, color: 'bg-[#F59E0B]', desc: 'Spikers, setters, and inter-district school championships.' },
  { name: 'BASKETBALL', category: 'Team Sports', icon: FaBasketballBall, color: 'bg-[#B45309]', desc: '5x5 and 3x3 youth tournaments across CBSE and ICSE circuits.' },
  { name: 'HOCKEY', category: 'Team Sports', icon: GiHockey, color: 'bg-[#032D59]', desc: 'National junior championships and school astro-turf cups.' },
  { name: 'WRESTLING', category: 'Combat Sports', icon: MdSportsMartialArts, color: 'bg-[#EA580C]', desc: 'Freestyle and Greco-Roman youth weight categories.' },
  { name: 'BOXING', category: 'Combat Sports', icon: GiBoxingGlove, color: 'bg-[#DC2626]', desc: 'Youth Olympic weight divisions and state gold cups.' },
  { name: 'TABLE TENNIS', category: 'Racket Sports', icon: FaTableTennis, color: 'bg-[#0284C7]', desc: 'Cadet, sub-junior, and national youth ranking meets.' },
  { name: 'TENNIS', category: 'Racket Sports', icon: GiTennisRacket, color: 'bg-[#84CC16]', desc: 'AITA junior talent series and inter-academy leagues.' },
  { name: 'SWIMMING', category: 'Aquatics', icon: FaSwimmer, color: 'bg-[#06B6D4]', desc: 'Freestyle, breaststroke, butterfly, and medley relays.' },
  { name: 'YOGA', category: 'Wellness & Mind', icon: GrYoga, color: 'bg-[#9333EA]', desc: 'Asanas, pranayama, and school yogasana championships.' },
  { name: 'CHESS', category: 'Wellness & Mind', icon: FaChessKnight, color: 'bg-[#1E293B]', desc: 'FIDE rated junior chess and inter-school rapid meets.' },
  { name: 'KHO-KHO', category: 'Traditional Indian Sports', icon: GiSprint, color: 'bg-[#16A34A]', desc: 'Traditional chasing sport with national school leagues.' },
  { name: 'KABADDI', category: 'Traditional Indian Sports', icon: MdSportsKabaddi, color: 'bg-[#F97316]', desc: 'Raids, tackles, and grassroots school kabaddi series.' },
  { name: 'CYCLING', category: 'Track & Field', icon: FaBicycle, color: 'bg-[#2563EB]', desc: 'Road races, time trials, and velodrome youth sprints.' },
];

export default function SportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Track & Field',
    'Team Sports',
    'Racket Sports',
    'Combat Sports',
    'Traditional Indian Sports',
    'Aquatics',
    'Wellness & Mind',
  ];

  const filteredSports = ALL_SPORTS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
          <span className="text-[#032D59] font-black">Sports &amp; Games</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          100+ Sports Directory
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          EXPLORE SPORTS &amp; GAMES
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          From Olympic disciplines to traditional Indian heritage sports, discover rules, school tournament calendars, and athlete pathways.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="w-full max-w-2xl flex flex-col gap-3 mb-6">
        <div className="relative w-full">
          <FaSearch size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sports by name, rules, or keywords..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-medium focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-black whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#032D59] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sports Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredSports.map((sport) => {
          const Icon = sport.icon;
          return (
            <div
              key={sport.name}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-full ${sport.color} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-[10.5px] font-bold text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded">
                    {sport.category}
                  </span>
                </div>
                <h3 className="text-sm font-black text-[#032D59] uppercase tracking-wide">
                  {sport.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                  {sport.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/events?sport=${encodeURIComponent(sport.name)}`}
                  className="text-xs font-black text-[#0B5FA5] hover:underline"
                >
                  View Events &rarr;
                </Link>
                <Link
                  href={`/athletes?sport=${encodeURIComponent(sport.name)}`}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Top Athletes
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
