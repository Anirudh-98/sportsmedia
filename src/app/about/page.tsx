'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaTrophy,
  FaUsers,
  FaGraduationCap,
  FaHandshake,
  FaCheckCircle,
  FaArrowLeft,
  FaGlobe,
} from 'react-icons/fa';

export default function AboutUsPage() {
  const pillars = [
    {
      title: 'IDENTIFY',
      tagline: 'Spotting Raw Talent at Grassroots',
      desc: 'Reaching every school, rural village, and town across India to discover raw athletic ability through standardized physical fitness testing and school sports day documentation.',
      icon: FaTrophy,
      color: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'NURTURE',
      tagline: 'Scientific Coaching & Mentorship',
      desc: 'Connecting talented children with qualified PET teachers, NIS-certified coaches, nutritional advice, sports science, and injury prevention guidelines.',
      icon: FaUsers,
      color: 'from-emerald-600 to-teal-700',
    },
    {
      title: 'PROMOTE',
      tagline: 'Media Coverage & Recognition',
      desc: 'Giving school and college athletes the spotlight they deserve. Publishing news, match videos, athlete profiles, and press coverage on SPORTSMEDIA.WORLD.',
      icon: FaGlobe,
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'EMPOWER',
      tagline: 'Scholarships & Career Pathways',
      desc: 'Securing admissions, financial scholarships, sports quota sponsorships, job opportunities, and national/international representation for meritorious athletes.',
      icon: FaGraduationCap,
      color: 'from-purple-600 to-pink-700',
    },
  ];

  const milestones = [
    { number: '100+', label: 'Olympic & Traditional Sports Covered' },
    { number: '500+', label: 'Affiliated Schools & Colleges' },
    { number: '5,000+', label: 'Registered Student Athletes' },
    { number: '200+', label: 'Live Events & Tournaments Streamed' },
  ];

  return (
    <div className="w-full flex-1 flex flex-col items-center py-6 px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
          <Link href="/" className="hover:text-[#0B5FA5] flex items-center gap-1">
            <FaArrowLeft size={12} />
            <span>Back to Home</span>
          </Link>
          <span>/</span>
          <span className="text-[#032D59] font-black">About Us</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          Sports for a Better Society
        </span>
      </div>

      {/* Main Centered Content Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          ABOUT SPORTS MEDIA BLUE ZONE
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2 leading-relaxed">
          SPORTSMEDIA.WORLD is the digital gateway to sports talent, dedicated to revolutionizing
          grassroots athletics in schools, colleges, and rural sports ecosystems across India.
        </p>
      </div>

      {/* Hero Mission Card */}
      <div className="w-full bg-gradient-to-r from-[#032042] via-[#053266] to-[#032042] text-white rounded-xl p-6 sm:p-8 shadow-md border border-[#0B4F8A] mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-sm border border-amber-400/30">
              Our Vision
            </span>
            <h2 className="text-xl sm:text-2xl font-black leading-snug">
              Every School Can Become a Sports Information Centre.
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              We believe that sports is not an extracurricular sideline; it is the heartbeat of youth
              character, physical health, nation building, and social harmony. By giving every school
              the media platform, certified sports journalism tools, and talent registry, we ensure no
              gifted child goes unnoticed.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white/10 rounded-lg border border-white/15 text-center">
            <div className="relative w-20 h-20 mb-2">
              <Image
                src="/bluezonelogo.webp"
                alt="Blue Zone Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-black tracking-wide uppercase text-white">
              SPORTS MEDIA BLUE ZONE
            </span>
            <span className="text-xs text-blue-200 mt-0.5">Grassroots Sports Foundation</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Section */}
      <div className="w-full mb-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#032D59] uppercase tracking-wide">
            THE FOUR PILLARS OF OUR MOVEMENT
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            Our comprehensive 360-degree approach to grassroots sports transformation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-xs mb-3`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-bold text-[#0B5FA5] block mt-0.5 mb-2">
                    {pillar.tagline}
                  </span>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grassroots Impact Metrics Strip */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {milestones.map((m, i) => (
            <div key={i} className="p-3">
              <span className="text-2xl sm:text-3xl font-black text-[#0B5FA5] block leading-none mb-1">
                {m.number}
              </span>
              <span className="text-xs sm:text-[13px] font-bold text-slate-800 uppercase tracking-tight">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* What We Offer to Schools & Colleges */}
      <div className="w-full bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <h2 className="text-xl font-black text-[#032D59] uppercase tracking-wide mb-4 text-center sm:text-left">
          WHAT WE EMPOWER INSTITUTIONS WITH
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'School Sports Media Bureau setup with student reporter certification',
            'Digital Athlete Profiles and National Grassroots Ranking verified registry',
            'Live streaming and broadcast support for annual sports days and inter-school meets',
            'Sports scholarships, equipment kits, and nutritional counseling for needy champions',
            'Direct access to NIS coaches, physical education workshops, and scouting scouts',
            'Dedicated school sports webpage and video archive on SPORTSMEDIA.WORLD',
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2.5">
              <FaCheckCircle className="text-[#168C45] shrink-0 mt-0.5" size={16} />
              <span className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Action Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/journalism"
          className="w-full sm:w-auto py-2.5 px-6 bg-[#0B5FA5] hover:bg-[#08487D] text-white font-black text-xs uppercase tracking-wider rounded-md text-center shadow-xs transition-all"
        >
          JOIN JOURNALISM SCHOOL
        </Link>
        <Link
          href="/sports"
          className="w-full sm:w-auto py-2.5 px-6 bg-[#168C45] hover:bg-[#116E36] text-white font-black text-xs uppercase tracking-wider rounded-md text-center shadow-xs transition-all"
        >
          EXPLORE 100+ SPORTS
        </Link>
        <Link
          href="/contact"
          className="w-full sm:w-auto py-2.5 px-6 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-md text-center shadow-xs transition-all"
        >
          CONTACT US
        </Link>
      </div>
    </div>
  );
}
