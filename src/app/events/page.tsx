'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTrophy,
  FaUsers,
  FaArrowLeft,
  FaCheckCircle,
  FaFilter,
} from 'react-icons/fa';

const EVENTS_DATA = [
  {
    id: 'athletics-meet-2024',
    title: 'Inter-School Annual Athletics Championship 2024',
    sport: 'Athletics (Track & Field)',
    day: '25',
    month: 'MAY',
    year: '2024',
    time: '07:30 AM - 05:00 PM',
    venue: 'Gachibowli Stadium, Hyderabad',
    ageCategories: 'Under-14, Under-16, Under-19 (Boys & Girls)',
    organizer: 'Sports Media Blue Zone & Hyderabad Athletics Association',
    status: 'Registrations Open',
  },
  {
    id: 'state-football-champ',
    title: 'Telangana State Junior Football Championship',
    sport: 'Football',
    day: '30',
    month: 'MAY',
    year: '2024',
    time: '08:00 AM - 06:00 PM',
    venue: 'Gymkhana Grounds, Secunderabad',
    ageCategories: 'Under-17 Boys (Subroto Cup Qualifier)',
    organizer: 'Telangana State Football Association & Blue Zone',
    status: 'Registrations Open',
  },
  {
    id: 'junior-badminton-tourn',
    title: 'Junior Badminton Talent Hunt Cup',
    sport: 'Badminton',
    day: '05',
    month: 'JUN',
    year: '2024',
    time: '09:00 AM - 06:30 PM',
    venue: 'Pullela Gopichand Badminton Academy, Hyderabad',
    ageCategories: 'Under-13, Under-15 Singles & Doubles',
    organizer: 'National Sports Promotion Board',
    status: 'Fast Filling',
  },
  {
    id: 'inter-school-cricket-trophy',
    title: 'Deccan School Cricket Champions Trophy',
    sport: 'Cricket',
    day: '18',
    month: 'JUN',
    year: '2024',
    time: '08:30 AM - 04:30 PM',
    venue: 'Lal Bahadur Shastri Stadium, Hyderabad',
    ageCategories: 'Under-14 & Under-16 (T20 Format)',
    organizer: 'Hyderabad Cricket Board & SportsMedia.World',
    status: 'Upcoming',
  },
];

export default function EventsPage() {
  const [selectedSport, setSelectedSport] = useState('All');
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);

  const filteredEvents = EVENTS_DATA.filter((evt) => {
    if (selectedSport === 'All') return true;
    return evt.sport.toLowerCase().includes(selectedSport.toLowerCase());
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
          <span className="text-[#032D59] font-black">Events</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          2024 Tournament Calendar
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          UPCOMING SPORTS EVENTS &amp; TOURNAMENTS
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Official school championships, state selection trials, and grassroots tournaments powered by SportsMedia Blue Zone.
        </p>
      </div>

      {/* Sport Filter Tabs */}
      <div className="w-full flex items-center justify-center gap-2 flex-wrap mb-6">
        {['All', 'Athletics', 'Football', 'Badminton', 'Cricket'].map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
              selectedSport === sport
                ? 'bg-[#032D59] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="w-full space-y-4 mb-8">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          >
            {/* Left: Date Badge + Details */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-16 rounded-lg bg-[#0B5FA5] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                <span className="text-xl font-black leading-none">{evt.day}</span>
                <span className="text-[11px] font-black tracking-widest uppercase mt-0.5">
                  {evt.month}
                </span>
                <span className="text-[9px] text-blue-200 font-bold">{evt.year}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-black text-[#168C45] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {evt.sport}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {evt.status}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
                  {evt.title}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-600 font-medium flex-wrap pt-1">
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-slate-400" />
                    {evt.venue}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUsers className="text-slate-400" />
                    {evt.ageCategories}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="w-full md:w-auto flex md:flex-col items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setRegisteredEvent(evt.id)}
                className="w-full md:w-44 py-2 px-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-black text-xs uppercase tracking-wider rounded-md text-center shadow-xs transition-all cursor-pointer"
              >
                {registeredEvent === evt.id ? 'REGISTERED ✓' : 'REGISTER TEAM'}
              </button>
              <Link
                href="/contact"
                className="w-full md:w-44 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase tracking-wider rounded-md text-center border border-slate-300 transition-all"
              >
                DOWNLOAD RULES
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Host Tournament Banner */}
      <div className="w-full bg-gradient-to-r from-[#032042] via-[#053266] to-[#032042] text-white rounded-xl p-6 sm:p-8 text-center space-y-3">
        <h2 className="text-lg sm:text-xl font-black uppercase">
          WANT TO HOST AN EVENT OR TOURNAMENT WITH BLUE ZONE?
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
          We provide live streaming production, media coverage, verified athlete registration, timing systems, and press publication for school and inter-college meets.
        </p>
        <Link
          href="/contact"
          className="inline-block py-2.5 px-6 bg-[#168C45] hover:bg-[#116E36] text-white font-black text-xs uppercase tracking-wider rounded-md shadow-xs transition-all"
        >
          SUBMIT HOSTING REQUEST
        </Link>
      </div>
    </div>
  );
}
