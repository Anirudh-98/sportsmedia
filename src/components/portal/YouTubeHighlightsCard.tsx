'use client';

import React from 'react';
import { Play } from 'lucide-react';
import { YoutubeIcon } from '../brand/SocialIcons';

interface YouTubeHighlightsCardProps {
  onOpenVideo: () => void;
}

export const YouTubeHighlightsCard: React.FC<YouTubeHighlightsCardProps> = ({
  onOpenVideo,
}) => {
  return (
    <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#E7EDF2]">
        <div className="h-3.5 w-1 bg-[#E5232E] rounded-full" />
        <h3 className="text-xs sm:text-[13px] font-black text-[#032D59] tracking-wider uppercase">
          YOUTUBE HIGHLIGHTS
        </h3>
      </div>

      {/* Video Preview Box */}
      <div
        onClick={onOpenVideo}
        className="relative h-32 sm:h-36 rounded-sm overflow-hidden bg-slate-900 cursor-pointer group shadow-2xs border border-slate-200"
      >
        {/* Background Visual representation of live match */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Top Channel Badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/80 px-2 py-0.5 rounded-xs text-white">
        <div className="w-4 h-4 bg-[#E5232E] rounded flex items-center justify-center">
          <YoutubeIcon size={11} fill="white" />
        </div>
        <span className="text-[10px] font-bold tracking-tight">SportsMedia World TV</span>
      </div>

      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-[#E5232E] group-hover:bg-[#B5121B] text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
          <Play size={18} fill="white" className="ml-0.5" />
        </div>
      </div>

      {/* Bottom Tag */}
      <div className="absolute bottom-2 left-2.5 right-2.5">
        <span className="text-[11px] text-white font-bold block truncate drop-shadow-md">
          Grand Finale Highlights: Inter-School Athletics &amp; Football
        </span>
      </div>
    </div>

    {/* Subtext */}
    <p className="text-[11px] text-slate-700 font-semibold text-center mt-2">
      Watch Latest Matches, Events &amp; Stories
    </p>

    {/* Red Button */}
    <button
      type="button"
      onClick={onOpenVideo}
      className="w-full mt-2 py-2 px-3 bg-[#E5232E] hover:bg-[#B5121B] text-white font-black text-xs tracking-wider uppercase rounded-xs shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
    >
      <Play size={12} fill="white" />
      <span>VISIT OUR YOUTUBE CHANNEL &gt;</span>
    </button>
  </div>
);
};

