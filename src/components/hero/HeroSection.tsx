'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Trophy, Heart, ArrowUpRight } from 'lucide-react';
import { BlueZoneTreeLogo } from '../brand/BrandLogos';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onOpenFoundationModal: () => void;
  onOpenAdModal: () => void;
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

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenFoundationModal,
  onOpenAdModal,
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
    <section className="w-full py-4 px-3 sm:px-4 lg:px-6">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          
          {/* ================= COLUMN 1: MAIN HERO SLIDER (approx 6 cols or 52%) ================= */}
          <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden relative flex flex-col justify-between min-h-[380px] lg:min-h-[420px] group">
            {/* Background Image with optimized Next.js Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={HERO_SLIDES[currentSlide].image}
                alt="Young Indian student athletes in action"
                fill
                priority
                className="object-cover object-center transition-all duration-700 ease-out"
              />
              {/* Light translucent gradient overlay so text is crisp while photo shines through */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent lg:via-white/75" />
            </div>

            {/* Slider Content */}
            <div className="relative z-10 p-6 md:p-8 flex flex-col justify-center max-w-xl h-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/90 text-[#0d2240] rounded-full text-[10px] font-black uppercase tracking-wider mb-2 w-max shadow-xs">
                <Trophy size={12} className="text-[#0d2240]" />
                Spotlighting Grassroots Sports
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-black text-[#0d2240] tracking-tight uppercase leading-tight drop-shadow-xs">
                {HERO_SLIDES[currentSlide].title}
              </h2>

              {/* Subtitle */}
              <h3 className="text-xs sm:text-sm font-black text-[#1565c0] tracking-widest uppercase mt-2 mb-2">
                {HERO_SLIDES[currentSlide].subtitle}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed max-w-md drop-shadow-xs">
                {HERO_SLIDES[currentSlide].description}
              </p>

              {/* Button */}
              <div className="mt-5">
                <Button
                  type="button"
                  onClick={onExplore}
                  className="h-auto gap-2 rounded-md bg-[#0d2240] px-6 py-2 text-xs font-black tracking-wider text-white uppercase shadow-md hover:scale-105 hover:bg-[#1565c0] active:scale-95"
                >
                  {HERO_SLIDES[currentSlide].cta}
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            </div>

            {/* Carousel Navigation Arrows & Indicators */}
            <div className="relative z-10 p-4 flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-xs">
                {[0, 1, 2, 3, 4].map((idx) => {
                  const activeIndex = currentSlide % 3;
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx % 3)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all ${
                        activeIndex === idx % 3
                          ? 'w-6 bg-white'
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
                  className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-xs transition-transform active:scale-95"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-7 h-7 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-xs transition-transform active:scale-95"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* ================= COLUMN 2: BLUE ZONE FOUNDATION CARD (~3 cols or 24%) ================= */}
          <div className="lg:col-span-3 xl:col-span-3 bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <h3 className="text-sm font-black text-[#0d2240] tracking-wide uppercase">
                BLUE ZONE FOUNDATION
              </h3>
              <p className="text-[10px] font-bold text-slate-500 tracking-tight mt-0.5">
                Empowering Talent • Enriching Lives
              </p>

              {/* Foundation Tree Logo & Photo */}
              <div className="my-3 relative w-full h-52 rounded-lg overflow-hidden border border-slate-100 shadow-inner group">
                <Image
                  src="/images/foundation_kids.jpg"
                  alt="School children student athletes with sports medals"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 bg-white/95 rounded-full p-1 shadow-sm border border-slate-200">
                  <BlueZoneTreeLogo size={24} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-600 px-2">
                <Heart size={13} className="text-red-500 fill-red-500" />
                <span>Grassroots scholarships for 5,000+ kids</span>
              </div>
            </div>

            {/* Button */}
            <div className="w-full mt-3">
              <Button
                type="button"
                onClick={onOpenFoundationModal}
                className="h-auto w-full rounded-md bg-[#0d2240] py-2 text-xs font-bold tracking-wider text-white uppercase shadow-xs hover:bg-[#1565c0] hover:shadow-md"
              >
                KNOW MORE
              </Button>
            </div>
          </div>

          {/* ================= COLUMN 3: FEATURED ADVERTISEMENT (~3 cols or 24%) ================= */}
          <div className="lg:col-span-3 xl:col-span-3 bg-white rounded-xl shadow-xs border border-slate-200 p-3 flex flex-col justify-between">
            {/* Header Badge */}
            <div className="w-full bg-[#0d2240] text-white py-1 px-3 rounded-t-md text-center">
              <span className="text-[10px] font-black tracking-widest uppercase">
                FEATURED ADVERTISEMENT
              </span>
            </div>

            {/* Ad Box Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-50/50 rounded-b-md border border-t-0 border-slate-100">
              {/* Decathlon Banner */}
              <div className="w-full bg-[#0082c3] text-white py-1.5 px-3 rounded text-center shadow-xs">
                <span className="block font-black text-sm tracking-wider">DECATHLON</span>
              </div>
              <div className="text-[9px] font-bold text-slate-700 tracking-wider uppercase mt-1">
                YOUR SPORTS PARTNER
              </div>

              {/* Buy Now Button */}
              <Button
                type="button"
                onClick={onOpenAdModal}
                className="mt-2 mb-2 h-auto rounded-full bg-[#0d2240] px-5 py-1 text-[10px] font-black tracking-wider text-white uppercase shadow-xs hover:scale-105 hover:bg-slate-900"
              >
                BUY NOW
              </Button>

              {/* Product composite image */}
              <div className="relative w-full h-44 rounded-md overflow-hidden bg-white">
                <Image
                  src="/images/decathlon_ad.jpg"
                  alt="Decathlon Sports Equipment"
                  fill
                  className="object-contain p-1 hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="text-[9px] text-slate-400 text-center mt-1">
                Special 15% discount for verified Blue Zone student athletes
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
