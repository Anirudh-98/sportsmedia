'use client';

import React from 'react';
import { X, Share2, ThumbsUp, Eye } from 'lucide-react';
import { YoutubeIcon } from '../brand/SocialIcons';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden text-white">
        
        {/* Header */}
        <div className="p-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-red-600 rounded">
              <YoutubeIcon size={16} fill="white" />
            </div>
            <span className="text-xs font-black tracking-wider uppercase text-slate-200">
              SportsMedia World TV • Official Stream
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player Container (Mock responsive 16:9 player) */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
            title="SportsMedia World Highlights"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Details underneath player */}
        <div className="p-4 bg-slate-900 space-y-2">
          <h4 className="text-sm md:text-base font-black text-white">
            Inter-School Sports Gala &amp; Grassroots Championship Finals - Highlights &amp; Awards
          </h4>
          
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye size={14} className="text-blue-400" />
                48,520 views
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp size={14} className="text-emerald-400" />
                3.4K Likes
              </span>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5"
            >
              <YoutubeIcon size={14} fill="white" />
              Subscribe on YouTube
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
