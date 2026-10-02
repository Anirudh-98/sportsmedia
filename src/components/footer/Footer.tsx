'use client';

import React from 'react';
import Image from 'next/image';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedInIcon,
} from '../brand/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#031C38] via-[#052F5F] to-[#031C38] text-white py-1.5 px-3 sm:px-4 border-t border-slate-700">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">

        {/* Left: Logo & Brand Name & 4 Pillars */}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <Image
              src="/bluezonelogo.webp"
              alt="Sports Media Blue Zone Logo"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black tracking-tight uppercase text-white">
                SPORTS MEDIA
              </span>
              <span className="text-sm font-black tracking-wide uppercase text-[#3FA9E8]">
                BLUE ZONE
              </span>
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-200 whitespace-nowrap">
              IDENTIFY &bull; NURTURE &bull; PROMOTE &bull; EMPOWER
            </span>
          </div>
        </div>

        {/* Center: SPORTSMEDIA.WORLD & Tagline */}
        <div className="flex flex-col items-center text-center">
          <div className="text-sm font-black tracking-wider text-white leading-tight">
            SPORTSMEDIA<span className="text-[#F4C430]">.WORLD</span>
          </div>
          <span className="text-[10px] font-black tracking-wider uppercase text-blue-200 leading-tight whitespace-nowrap">
            A PLATFORM FOR GRASSROOTS SPORTS
          </span>
        </div>

        {/* Right-Center Quote & Social Icons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <p className="md:max-xl:hidden text-xs text-blue-100 font-semibold italic text-center md:text-right">
            &ldquo;Sports Media for a Healthier, Stronger and United Society&rdquo;
          </p>

          <div className="hidden lg:block h-6 w-px bg-white/20 shrink-0" />

          {/* 5 Social Media Icons */}
          <div className="flex items-center gap-1.5">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-6 h-6 rounded-xs bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <YoutubeIcon size={12} fill="white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-6 h-6 rounded-xs bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <InstagramIcon size={12} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-6 h-6 rounded-xs bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <FacebookIcon size={12} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-6 h-6 rounded-xs bg-[#0F1419] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <TwitterIcon size={12} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-6 h-6 rounded-xs bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <LinkedInIcon size={12} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
