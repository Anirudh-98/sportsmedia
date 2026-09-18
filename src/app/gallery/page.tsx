'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

const GALLERY_IMAGES = [
  '/images/hero_athletes_banner.jpg',
  '/images/foundation_kids.jpg',
  '/images/coaches_banner.jpg',
  '/image/athelete.png',
  '/image/athelete1.png',
  '/image/athelete2.png',
  '/image/athelete3.png',
  '/press.png',
];

export default function GalleryPage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center py-6 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-[#0B5FA5] flex items-center gap-1">
            <FaArrowLeft size={12} />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#032D59] font-black">Gallery</span>
        </div>
      </div>

      {/* Header */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight text-center mb-6">
        SPORTS MEDIA PHOTO GALLERY
      </h1>

      {/* Gallery Grid: images only, 6 per row on desktop */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {GALLERY_IMAGES.map((src, idx) => (
          <div
            key={idx}
            className="relative aspect-square w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-xs group"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
