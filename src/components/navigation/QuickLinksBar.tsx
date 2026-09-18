'use client';

import React from 'react';
import {
  Info,
  Trophy,
  Calendar,
  Tv,
  Newspaper,
  Image as ImageIcon,
  Users,
  PhoneCall,
} from 'lucide-react';

interface QuickLinksBarProps {
  onSelectLink: (key: string) => void;
}

const QUICK_LINKS = [
  {
    key: 'about',
    title: 'ABOUT US',
    subtitle: 'Know Our Mission',
    icon: Info,
  },
  {
    key: 'sports',
    title: 'SPORTS & GAMES',
    subtitle: 'Explore All Sports',
    icon: Trophy,
  },
  {
    key: 'events',
    title: 'EVENTS',
    subtitle: 'Upcoming & Live Events',
    icon: Calendar,
  },
  {
    key: 'livestream',
    title: 'LIVE STREAM',
    subtitle: 'Watch Live Matches',
    icon: Tv,
  },
  {
    key: 'news',
    title: 'NEWS & UPDATES',
    subtitle: 'Latest Sports News',
    icon: Newspaper,
  },
  {
    key: 'gallery',
    title: 'GALLERY',
    subtitle: 'Photos & Videos',
    icon: ImageIcon,
  },
  {
    key: 'coaches',
    title: 'COACH DIRECTORY',
    subtitle: 'Find Expert Coaches',
    icon: Users,
  },
  {
    key: 'contact',
    title: 'CONTACT US',
    subtitle: 'Get in Touch',
    icon: PhoneCall,
  },
];

export const QuickLinksBar: React.FC<QuickLinksBarProps> = ({ onSelectLink }) => {
  return (
    <section className="w-full bg-[#062F5F] text-white py-2.5 border-t border-[#032D59]">
      <div className="w-full px-2 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 divide-y sm:divide-y-0 lg:divide-x divide-slate-700/50">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onSelectLink(item.key)}
                className="flex items-center gap-2 p-1.5 rounded-xs hover:bg-[#0B5FA5] transition-colors text-left group cursor-pointer"
              >
                <div className="p-1.5 rounded bg-white/10 group-hover:bg-white/20 text-white shrink-0">
                  <Icon size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black uppercase tracking-tight text-white group-hover:text-amber-300 leading-tight truncate">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-200 group-hover:text-white font-medium leading-tight truncate">
                    {item.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

