'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';

export const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT US', href: '/about' },
  { label: 'SPORTS & GAMES', href: '/sports' },
  { label: 'SPORTS JOURNALISM SCHOOL', href: '/journalism' },
  { label: 'EVENTS', href: '/events' },
  { label: 'LIVE STREAM', href: '/livestream' },
  { label: 'YOUTUBE', href: '/youtube' },
  { label: 'SCHOLARSHIP', href: '/scholarship' },
  { label: 'JOB PORTAL', href: '/jobs' },
  { label: 'OUR INITIATIVES', href: '/initiatives' },
  { label: 'CLUBS/INITIATIVES', href: '/clubs' },
  { label: 'NEWS & UPDATES', href: '/news' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT US', href: '/contact' },
];

export const MainNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full bg-gradient-to-r from-[#032042] via-[#053266] to-[#032042] text-white sticky top-0 z-40 shadow-xs border-y border-[#0B4F8A]">
      <div className="w-full px-2 sm:px-3">
        <div className="flex items-center justify-between h-9 sm:h-10">
          
          {/* Home Button with Blue Gradient Pill */}
          <Link
            href="/"
            aria-label="Home"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-1.5 justify-center h-7 sm:h-8 px-3 rounded-xs font-black text-xs sm:text-[13px] uppercase tracking-wider transition-all shadow-xs ${
              isActive('/')
                ? 'bg-gradient-to-b from-[#1877D2] to-[#0B5FA5] text-white border border-blue-400/40'
                : 'text-white/90 hover:bg-[#0B5FA5]'
            }`}
          >
            <FaHome size={14} className="text-white shrink-0" />
            <span>HOME</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center h-full flex-1 justify-between ml-1">
            {NAV_ITEMS.slice(1).map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-center h-full px-2 xl:px-2.5 text-xs xl:text-[12.5px] font-extrabold tracking-wide uppercase transition-colors whitespace-nowrap hover:bg-[#0B5FA5]/70 hover:text-white ${
                    active
                      ? 'bg-[#0B5FA5] text-white font-black shadow-inner border-b-2 border-amber-400'
                      : 'text-white/95 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-slate-200 hover:text-white hover:bg-slate-800 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#032D59] border-t border-slate-800 px-3 pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider ${
                  active ? 'bg-[#0B5FA5] text-white' : 'text-slate-200 hover:bg-[#0B5FA5]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};
