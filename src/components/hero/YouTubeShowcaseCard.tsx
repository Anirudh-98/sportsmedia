'use client';

import React, { useState } from 'react';
import { FaPlay, FaYoutube, FaBell } from 'react-icons/fa';

interface YouTubeShowcaseCardProps {
  onOpenVideo?: (videoTitle?: string) => void;
  onSubscribe?: () => void;
}

const VIDEOS = [
  { id: 'QB-C2UAgdVw', label: 'Live Now' },
  { id: '_e8qZ-O1cjY', label: 'Live Stream' },
  { id: 'UYq5mkYQT4c', label: 'Live Stream' },
  { id: 'UV7Ctiy2K5w', label: 'Live Stream' },
  { id: '5YBgpu2IE2E', label: 'Live Stream' },
];

export const YouTubeShowcaseCard: React.FC<YouTubeShowcaseCardProps> = ({
  onSubscribe,
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(VIDEOS[0].id);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSubscribed(!subscribed);
    if (onSubscribe) onSubscribe();
  };

  const handleSelectVideo = (id: string) => {
    setActiveVideoId(id);
  };

  const activeVideoUrl = `https://www.youtube.com/watch?v=${activeVideoId}`;

  return (
    <div className="bg-white rounded-lg border border-[#D8E0E7] p-2 sm:p-2.5 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Channel branding row */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-xs bg-[#E5232E] text-white">
              <FaYoutube size={20} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-black text-[#17212B]">SPORTSMEDIA.WORLD</span>
              <span className="text-[9px] font-semibold text-[#586572]">Official YouTube Channel</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSubscribe}
              aria-label="Notifications"
              className="text-[#586572] hover:text-[#17212B]"
            >
              <FaBell size={13} />
            </button>
            <button
              type="button"
              onClick={handleSubscribe}
              className={`rounded-sm px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-2xs transition-all cursor-pointer ${subscribed ? 'bg-slate-700 text-slate-100' : 'bg-[#E5232E] hover:bg-[#CC0000] text-white'
                }`}
            >
              {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
            </button>
          </div>
        </div>

        {/* 1. Main Featured Video - increased height a bit as requested */}
        <div className="relative w-full h-[220px] sm:h-[240px] md:h-[255px] rounded-md overflow-hidden bg-slate-900 border border-slate-300 shadow-xs">
          <iframe
            key={activeVideoId}
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${activeVideoId}`}
            title="SportsMedia.World YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* 2. Video Thumbnails Row - click to play in the main player above */}
        <div className="mt-2.5 w-full">
          <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
            {VIDEOS.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelectVideo(video.id)}
                title={video.label}
                aria-pressed={activeVideoId === video.id}
                className={`relative aspect-[96/55] rounded-md overflow-hidden border-2 hover:scale-105 transition-all duration-200 group cursor-pointer shadow-2xs ${activeVideoId === video.id ? 'border-[#0B5FA5]' : 'border-slate-300 hover:border-[#0B5FA5]/60'
                  }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                  <FaPlay size={14} className="text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Full-width Red Button - links out to the currently playing YouTube video */}
      <a
        href={activeVideoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-2.5 py-2.5 px-3 bg-[#E5232E] hover:bg-[#CC0000] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider rounded-md shadow-xs flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
      >
        <FaPlay size={11} className="text-white shrink-0" />
        <span>WATCH MORE ON OUR YOUTUBE CHANNEL</span>
      </a>
    </div>
  );
};
