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
    <footer className="w-full bg-gradient-to-r from-[#031C38] via-[#052F5F] to-[#031C38] text-white py-6 sm:py-7 px-4 sm:px-6 lg:px-8 border-t border-slate-700">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">

        {/* Left: Logo & Brand Name & 4 Pillars */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
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
              <span className="text-lg sm:text-xl font-black tracking-tight uppercase text-white">
                SPORTS MEDIA
              </span>
              <span className="text-lg sm:text-xl font-black tracking-wide uppercase text-[#3FA9E8]">
                BLUE ZONE
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-200 mt-1">
              IDENTIFY &bull; NURTURE &bull; PROMOTE &bull; EMPOWER
            </span>
          </div>
        </div>

        {/* Center: SPORTSMEDIA.WORLD & Tagline */}
        <div className="flex flex-col items-center text-center">
          <div className="text-lg sm:text-xl font-black tracking-wider text-white">
            SPORTSMEDIA<span className="text-[#F4C430]">.WORLD</span>
          </div>
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-blue-200 mt-1">
            A PLATFORM FOR GRASSROOTS SPORTS
          </span>
        </div>

        {/* Right-Center Quote & Social Icons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <p className="text-sm sm:text-base text-blue-100 font-semibold italic text-center md:text-right">
            &ldquo;Sports Media for a Healthier, Stronger and United Society&rdquo;
          </p>

          <div className="hidden lg:block h-9 w-px bg-white/20 shrink-0" />

          {/* 5 Social Media Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-xs bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <YoutubeIcon size={17} fill="white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xs bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 rounded-xs bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <FacebookIcon size={17} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="w-9 h-9 rounded-xs bg-[#0F1419] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <TwitterIcon size={17} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xs bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 shadow-2xs"
            >
              <LinkedInIcon size={17} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
