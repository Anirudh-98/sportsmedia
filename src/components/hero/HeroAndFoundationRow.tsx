'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Trophy, Heart } from 'lucide-react';
import { BlueZoneTreeLogo } from '../brand/BrandLogos';

interface HeroAndFoundationRowProps {
  onOpenFoundationModal: () => void;
  onExplore: () => void;
}

const HERO_SLIDES = [
  {
    title: 'BUILDING CHAMPIONS BEYOND BOUNDARIES',
    subtitle: 'IDENTIFY • DEVELOP • EMPOWER',
    description:
      'Spotlighting young talents, inspiring stories, live sports, expert guidance and a stronger sports community.',
    cta: 'EXPLORE NOW',
    image: '/images/hero_athletes_banner.jpg',
  },
  {
    title: 'GRASSROOTS TO GLOBAL ARENAS',
    subtitle: 'NURTURE • COMPETE • SUCCEED',
    description:
      'Empowering schools and colleges across India with premier tournaments, scouting trials, and digital athlete profiles.',
    cta: 'DISCOVER TALENT',
    image: '/images/hero_athletes_banner.jpg',
  },
  {
    title: 'OFFICIAL DISTRICT & STATE LEAGUES',
    subtitle: 'TRANSPARENT • MERIT-BASED • INCLUSIVE',
    description:
      'Register for upcoming junior championships, track real-time leaderboards, and get scouted by national sports academies.',
    cta: 'VIEW EVENTS',
    image: '/images/hero_athletes_banner.jpg',
  },
];

export const HeroAndFoundationRow: React.FC<HeroAndFoundationRowProps> = ({
  onOpenFoundationModal,
  onExplore,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
      
      {/* ================= HERO CAROUSEL BANNER (~68% width on desktop -> 8 cols) ================= */}
      <div className="md:col-span-8 bg-white rounded-md shadow-2xs border border-[#D8E0E7] overflow-hidden relative flex flex-col justify-between min-h-[260px] sm:min-h-[280px] group">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_SLIDES[currentSlide].image}
            alt="Young Indian student athletes in action"
            fill
            priority
            className="object-cover object-center transition-all duration-700 ease-out"
          />
          {/* Subtle gradient overlay to keep text ultra crisp */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent/40" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 p-4 sm:p-6 flex flex-col justify-center max-w-lg h-full">
          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#032D59] tracking-tight uppercase leading-tight drop-shadow-xs">
            {HERO_SLIDES[currentSlide].title}
          </h2>

          {/* Subtitle */}
          <h3 className="text-sm sm:text-base font-black text-[#0B5FA5] tracking-wider uppercase mt-1.5 mb-1.5">
            {HERO_SLIDES[currentSlide].subtitle}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed max-w-md">
            {HERO_SLIDES[currentSlide].description}
          </p>

          {/* CTA Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={onExplore}
              className="px-6 py-2 bg-[#032D59] hover:bg-[#0B5FA5] text-white font-black text-xs uppercase tracking-wider rounded-xs shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {HERO_SLIDES[currentSlide].cta}
            </button>
          </div>
        </div>

        {/* Carousel Navigation Indicators & Controls */}
        <div className="relative z-10 px-4 py-2 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-2xs">
            {[0, 1, 2, 3, 4].map((idx) => {
              const activeIndex = currentSlide % 3;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx % 3)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === idx % 3
                      ? 'w-5 bg-white'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-xs transition-transform active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-xs transition-transform active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* ================= BLUE ZONE FOUNDATION CARD (~32% width on desktop -> 4 cols) ================= */}
      <div className="md:col-span-4 bg-white rounded-md shadow-2xs border border-[#D8E0E7] p-3.5 flex flex-col justify-between items-center text-center">
        <div className="w-full">
          <h3 className="text-sm sm:text-base font-black text-[#032D59] tracking-wide uppercase">
            BLUE ZONE FOUNDATION
          </h3>
          <p className="text-xs font-bold text-slate-600 tracking-tight mt-0.5">
            Empowering Talent • Enabling Lives
          </p>

          {/* Foundation Photo */}
          <div className="my-2.5 relative w-full h-36 sm:h-40 rounded-md overflow-hidden border border-slate-100 shadow-2xs group">
            <Image
              src="/images/foundation_kids.jpg"
              alt="School children student athletes with sports medals"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-1.5 left-1.5 bg-white rounded-full p-1 shadow-xs border border-slate-200 w-8 h-8 flex items-center justify-center">
              <Image
                src="/bluezonelogo.webp"
                alt="Blue Zone Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-700">
            <Heart size={13} className="text-red-500 fill-red-500" />
            <span>Grassroots scholarships for 5,000+ kids</span>
          </div>
        </div>

        {/* Button */}
        <div className="w-full mt-2.5">
          <button
            type="button"
            onClick={onOpenFoundationModal}
            className="w-full py-2 bg-[#032D59] hover:bg-[#0B5FA5] text-white font-black text-xs uppercase tracking-wider rounded-xs shadow-2xs transition-all cursor-pointer"
          >
            KNOW MORE
          </button>
        </div>
      </div>

    </div>
  );
};
