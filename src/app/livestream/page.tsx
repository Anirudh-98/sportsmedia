'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaVideo,
  FaPlay,
  FaArrowLeft,
  FaCircle,
  FaCalendarAlt,
} from 'react-icons/fa';

export default function LiveStreamPage() {
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
          <span className="text-[#032D59] font-black">Live Stream</span>
        </div>
        <span className="text-xs font-black uppercase text-red-600 tracking-widest bg-red-50 px-2.5 py-1 rounded-sm border border-red-200 flex items-center gap-1.5">
          <FaCircle className="text-red-500 animate-pulse" size={8} />
          <span>Live Match Center</span>
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          LIVE MATCH STREAMS &amp; BROADCASTS
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Watch grassroots inter-school tournaments, state selection finals, and live athlete interviews streamed directly from stadiums across India.
        </p>
      </div>

      {/* Main Broadcast Screen */}
      <div className="w-full max-w-4xl bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 mb-8">
        <div className="relative aspect-video w-full flex items-center justify-center">
          <Image
            src="/images/youtube_player_exact.png"
            alt="Live Stream Stream Screen"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
              <FaPlay size={22} className="ml-1 text-white" />
            </div>
            <span className="mt-4 text-xs sm:text-sm font-black uppercase tracking-wider bg-red-600 px-3 py-1 rounded">
              ● LIVE BROADCAST &bull; GACHIBOWLI STADIUM
            </span>
          </div>
        </div>

        {/* Live Match Info Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black rounded uppercase">
                LIVE NOW
              </span>
              <span className="text-xs text-slate-400 font-bold">Inter-School Football Finals 2024</span>
            </div>
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wide mt-1">
              DPS Nacharam vs. Oakridge International (2nd Half: 1 - 1)
            </h2>
          </div>

          <button
            type="button"
            onClick={() => window.open('https://youtube.com', '_blank')}
            className="py-2 px-5 bg-[#E5232E] hover:bg-[#CC0000] text-white font-black text-xs uppercase tracking-wider rounded shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <FaVideo size={13} />
            <span>Open in YouTube</span>
          </button>
        </div>
      </div>
    </div>
  );
}
