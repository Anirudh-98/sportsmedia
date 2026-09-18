'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaYoutube,
  FaPlay,
  FaBell,
  FaArrowLeft,
  FaEye,
  FaClock,
  FaCheckCircle,
} from 'react-icons/fa';

export default function YouTubePage() {
  const [subscribed, setSubscribed] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const playlist = [
    {
      id: 'cricket',
      title: 'Rising Cricket Star: 16-Year-Old All-Rounder from Hyderabad',
      sport: 'Cricket',
      duration: '6:15',
      views: '24.5K views',
      img: '/images/yt_thumb_1.png',
      desc: 'Exclusive interview with Vikram Singh, discussing his preparation for the Ranji trophy under-19 state trials.',
    },
    {
      id: 'football',
      title: 'School Football Finals: Extra Time Thriller Highlights',
      sport: 'Football',
      duration: '8:28',
      views: '41.2K views',
      img: '/images/yt_thumb_2.png',
      desc: 'Top goals, penalty saves, and winning moments from the Hyderabad Inter-School Football Championship final match.',
    },
    {
      id: 'coach',
      title: 'Interview With a Coach: What NIS Selectors Look for in Young Athletes',
      sport: 'Coaching',
      duration: '10:12',
      views: '18.9K views',
      img: '/images/yt_thumb_3.png',
      desc: 'Senior athletics coach sharing golden advice for school PET masters, training schedules, and nutrition for sprinters.',
    },
    {
      id: 'athlete',
      title: 'Young Athlete Story: Breaking State Records in 100m Sprint',
      sport: 'Athletics',
      duration: '7:48',
      views: '35.1K views',
      img: '/images/yt_thumb_4.png',
      desc: 'Rohit Kumar clocks 10.62 seconds to set a new state meet record. Hear his journey from school sports day to gold.',
    },
    {
      id: 'fitness',
      title: 'Fitness Tips for Students: Warmup & Injury Prevention Routine',
      sport: 'Fitness',
      duration: '5:30',
      views: '15.7K views',
      img: '/images/yt_thumb_5.png',
      desc: 'Crucial dynamic stretching drills and core workouts designed specifically for high school and college student athletes.',
    },
  ];

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
          <span className="text-[#032D59] font-black">YouTube Channel</span>
        </div>
        <span className="text-xs font-black uppercase text-red-600 tracking-widest bg-red-50 px-2.5 py-1 rounded-sm border border-red-200 flex items-center gap-1.5">
          <FaYoutube size={14} />
          <span>Official Channel</span>
        </span>
      </div>

      {/* Channel Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827] text-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-700 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#E5232E] text-white flex items-center justify-center shadow-md shrink-0">
            <FaYoutube size={28} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
              SPORTSMEDIA.WORLD
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-semibold">
              Official YouTube Channel &bull; Real Stories &bull; Real People &bull; Real Sports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSubscribed(!subscribed)}
            className={`px-5 py-2.5 rounded-md text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              subscribed
                ? 'bg-slate-700 text-slate-200'
                : 'bg-[#E5232E] hover:bg-[#CC0000] text-white shadow-xs'
            }`}
          >
            {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
          </button>
          <button
            type="button"
            onClick={() => setSubscribed(!subscribed)}
            className="p-2.5 rounded-md bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Notification bell"
          >
            <FaBell size={16} />
          </button>
        </div>
      </div>

      {/* Featured Video Player Display */}
      <div className="w-full max-w-4xl bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-8">
        <div
          onClick={() => setActiveVideo('Young Talents Bigger Tomorrow')}
          className="relative w-full aspect-[508/201] rounded-lg overflow-hidden bg-slate-950 shadow-md group cursor-pointer"
        >
          <Image
            src="/images/youtube_player_exact.png"
            alt="Young Talents Bigger Tomorrow"
            fill
            className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
            priority
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div>
            <span className="text-xs font-black uppercase text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded">
              Featured Premiere
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#032D59] uppercase mt-1">
              Young Talents Bigger Tomorrow &mdash; Grassroots Sports Revolution
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Documenting the grit, passion, and daily perseverance of school and college athletes across India.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.open('https://youtube.com', '_blank')}
            className="py-2 px-5 bg-[#E5232E] hover:bg-[#CC0000] text-white font-black text-xs uppercase tracking-wider rounded-md shadow-xs flex items-center justify-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <FaPlay size={10} />
            <span>Watch on YouTube</span>
          </button>
        </div>
      </div>

      {/* Video Playlist Grid */}
      <div className="w-full mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-black text-[#032D59] uppercase tracking-wide">
            POPULAR EPISODES &amp; HIGHLIGHTS
          </h2>
          <p className="text-xs text-slate-600 font-semibold mt-0.5">
            Watch athlete spotlights, finals coverage, and training tips
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {playlist.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video.title)}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={video.img}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#E5232E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <FaPlay size={14} className="ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/85 text-white text-[10px] font-mono font-bold rounded">
                    {video.duration}
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <span className="text-[#0B5FA5] uppercase font-black">{video.sport}</span>
                    <span>{video.views}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-[#032D59] leading-snug group-hover:text-[#0B5FA5] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
