'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Bell, Volume2, Captions, Settings, Maximize, PictureInPicture2 } from 'lucide-react';
import { YoutubeIcon } from '@/components/brand/SocialIcons';
import { Button } from '@/components/ui/button';

interface YouTubeHeroPanelProps {
  onOpenVideo: () => void;
}

const THUMBNAILS = [
  { title: 'Rising Cricket Star', image: '/images/athlete_rohit.jpg', duration: '6:15' },
  { title: 'School Football Finals', image: '/images/foundation_kids.jpg', duration: '8:28' },
  { title: 'Interview With a Coach', image: '/images/coaches_banner.jpg', duration: '10:12' },
  { title: 'Young Athlete Story', image: '/images/athlete_ananya.jpg', duration: '7:48' },
  { title: 'Fitness Tips for Students', image: '/images/athlete_vikram.jpg', duration: '5:30' },
];

export const YouTubeHeroPanel: React.FC<YouTubeHeroPanelProps> = ({ onOpenVideo }) => {
  return (
    <div className="flex h-full flex-col rounded-md border border-[#D8E0E7] bg-white p-3 shadow-2xs">
      {/* Channel header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-6 items-center justify-center rounded-xs bg-[#E5232E]">
            <YoutubeIcon size={13} fill="white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[11px] font-black text-[#17212B]">SPORTSMEDIA.WORLD</span>
            <span className="text-[9px] font-semibold text-[#586572]">Official YouTube Channel</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenVideo}
            aria-label="Notifications"
            className="text-[#586572] hover:text-[#17212B]"
          >
            <Bell size={15} />
          </button>
          <Button
            type="button"
            onClick={onOpenVideo}
            className="h-auto rounded-sm bg-[#E5232E] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white hover:bg-[#B5121B]"
          >
            Subscribe
          </Button>
        </div>
      </div>

      {/* Main video hero */}
      <div
        onClick={onOpenVideo}
        role="button"
        tabIndex={0}
        className="group relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-sm bg-slate-900"
      >
        <Image
          src="/images/hero_athletes_banner.jpg"
          alt="Young student athlete training in a stadium"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        <div className="absolute inset-x-0 top-3 px-4 text-center">
          <h2 className="text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-2xl md:text-[28px]">
            Young Talents
            <br />
            Bigger Tomorrow
          </h2>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/85 sm:text-[11px]">
            Real Stories &bull; Real People &bull; Real Sports
          </p>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E5232E]/95 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
            <Play size={22} fill="white" className="ml-0.5" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-1.5 pt-4">
          <div className="mb-1.5 h-1 w-full overflow-hidden rounded-full bg-white/30">
            <div className="h-full w-[6%] rounded-full bg-[#E5232E]" />
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <Play size={14} fill="white" />
              <Volume2 size={14} />
              <span className="text-[9px] font-bold">0:08 / 8:24</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Captions size={13} />
              <Settings size={13} />
              <PictureInPicture2 size={13} />
              <Maximize size={13} />
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails row */}
      <div className="mt-2.5 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
        {THUMBNAILS.map((video) => (
          <button
            key={video.title}
            type="button"
            onClick={onOpenVideo}
            className="group flex flex-col overflow-hidden rounded-sm border border-[#E7EDF2] text-left"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
              <Image
                src={video.image}
                alt={video.title}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                <Play size={14} fill="white" className="text-white" />
              </div>
              <span className="absolute bottom-0.5 right-0.5 rounded-xs bg-black/70 px-1 text-[8px] font-bold text-white">
                {video.duration}
              </span>
            </div>
            <span className="mt-0.5 truncate text-[9px] font-bold text-[#17212B]">
              {video.title}
            </span>
          </button>
        ))}
      </div>

      <Button
        type="button"
        onClick={onOpenVideo}
        className="mt-2.5 h-auto w-full gap-1.5 rounded-sm bg-[#E5232E] py-2 text-[11px] font-black uppercase tracking-wider text-white hover:bg-[#B5121B]"
      >
        <Play size={12} fill="white" />
        Watch More On Our YouTube Channel
      </Button>
    </div>
  );
};
