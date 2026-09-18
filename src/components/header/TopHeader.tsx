'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaGlobe, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedInIcon,
} from '../brand/SocialIcons';

interface TopHeaderProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onSearch?: (query: string) => void;
}

const PILLARS = ['IDENTIFY', 'NURTURE', 'PROMOTE', 'EMPOWER'];

const SOCIALS = [
  { Icon: YoutubeIcon, href: 'https://youtube.com', bg: '#FF0000', label: 'YouTube', fill: true },
  { Icon: InstagramIcon, href: 'https://instagram.com', bg: 'linear-gradient(135deg,#fd5949,#d6249f,#285AEB)', label: 'Instagram' },
  { Icon: FacebookIcon, href: 'https://facebook.com', bg: '#1877F2', label: 'Facebook' },
  { Icon: TwitterIcon, href: 'https://twitter.com', bg: '#0F1419', label: 'X' },
  { Icon: LinkedInIcon, href: 'https://linkedin.com', bg: '#0A66C2', label: 'LinkedIn' },
];

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenAuth, onSearch }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="relative z-30 w-full overflow-hidden border-b border-slate-200 shadow-2xs">
      {/* Background with Blue Stadium & Athlete Banner Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white via-25% to-[#1565C0]/20" />
        <div
          className="absolute right-0 top-0 bottom-0 w-3/4 opacity-35 bg-cover bg-right"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-[#04336A]/60" />
      </div>

      <div className="relative z-10 w-full px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">

          {/* LEFT: Logo, brand name, pillars */}
          <div className="flex w-full items-center justify-between lg:justify-start gap-2.5 lg:w-auto">
            <div className="flex items-center gap-2">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                <Image
                  src="/bluezonelogo.webp"
                  alt="Sports Media Blue Zone Logo"
                  fill
                  sizes="64px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm sm:text-base font-black uppercase tracking-tight text-[#032D59]">
                  SPORTS MEDIA
                </span>
                <span className="text-base sm:text-lg font-black uppercase tracking-wide text-[#0B5FA5] leading-none">
                  BLUE ZONE
                </span>
                <span className="mt-0.5 text-[10px] sm:text-[10.5px] font-black text-[#032D59] tracking-tight">
                  Sports for a Better Society
                </span>
              </div>
            </div>

            {/* Vertical separator & 4 Pillars stacked */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#B8D5ED]">
              <div className="flex flex-col text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0B5FA5] leading-snug">
                {PILLARS.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: SPORTSMEDIA.WORLD Pill Banner */}
          <div className="flex w-full flex-col items-center justify-center lg:w-auto my-0.5 lg:my-0">
            <div className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-slate-900 bg-gradient-to-r from-[#032D59] via-[#051A36] to-[#032D59] px-5 sm:px-7 py-2 shadow-md">
              <div className="flex items-center gap-2.5">
                <FaGlobe className="h-6 w-6 shrink-0 text-white" />
                <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white">
                  SPORTSMEDIA<span className="text-[#F4C430]">.WORLD</span>
                </h1>
              </div>
              <span className="text-xs sm:text-[13px] font-bold tracking-wide text-slate-200">
                The Digital Gateway to Sports Talent
              </span>
            </div>
          </div>

          {/* RIGHT: More Sports Brighter Lives, Follow Us, Search, Auth */}
          <div className="flex w-full flex-col items-center lg:items-end gap-1.5 lg:w-auto">
            {/* Top row: More Sports Brighter Lives & Follow Us */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-3">
              <span className="text-xs sm:text-sm font-black italic tracking-wide text-[#0B5FA5]">
                More Sports Brighter Lives
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-slate-800">Follow Us :</span>
                <div className="flex items-center gap-1">
                  {SOCIALS.map(({ Icon, href, bg, label, fill }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      style={{ background: bg }}
                      className="flex h-5.5 w-5.5 items-center justify-center rounded-xs text-white shadow-2xs transition-transform hover:scale-105"
                    >
                      <Icon size={12} {...(fill ? { fill: 'white' } : {})} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom row: Search Bar and Login / Register Buttons */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-68">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Sports, Athletes, Events, Videos..."
                  className="w-full rounded-full border border-slate-300 bg-slate-50 py-1.5 pl-3.5 pr-8 text-xs font-semibold text-slate-900 shadow-inner placeholder-slate-500 outline-none transition-all focus:border-[#0B5FA5] focus:bg-white"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full p-1.5 bg-[#032D59] text-white hover:bg-[#0B5FA5] transition-colors"
                >
                  <FaSearch size={11} />
                </button>
              </form>

              <div className="flex items-center gap-2 shrink-0">
                {user ? (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/${user.role}/dashboard`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#032D59] px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-white hover:bg-[#0B5FA5] shadow-xs cursor-pointer active:scale-95 transition-all"
                    >
                      <FaUserShield size={12} className="text-[#F4C430]" />
                      <span>{user.role} Dashboard</span>
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      title="Sign Out"
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                    >
                      <FaSignOutAlt size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="rounded-md bg-[#0765AD] px-5 py-2 text-sm font-black uppercase tracking-wider text-white hover:bg-[#054E85] shadow-2xs cursor-pointer active:scale-95 transition-all"
                    >
                      LOGIN
                    </Link>
                    <Link
                      href="/login?mode=register"
                      className="rounded-md bg-[#159447] px-5 py-2 text-sm font-black uppercase tracking-wider text-white hover:bg-[#0F7538] shadow-2xs cursor-pointer active:scale-95 transition-all"
                    >
                      REGISTER
                    </Link>
                  </>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
