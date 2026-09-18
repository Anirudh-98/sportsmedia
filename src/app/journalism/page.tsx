'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaGraduationCap,
  FaEdit,
  FaCamera,
  FaMicrophone,
  FaVideo,
  FaYoutube,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaFileAlt,
  FaUserCheck,
} from 'react-icons/fa';

export default function JournalismSchoolPage() {
  const [enrolled, setEnrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    courseLevel: 'Certificate in Sports Journalism',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrolled(true);
  };

  const modules = [
    {
      title: 'Module 1: Sports Reporting & Match Analysis',
      icon: FaEdit,
      color: 'text-blue-600',
      topics: [
        'Writing compelling headlines, leads, and match match reports',
        'Live score tracking, statistics interpretation, and press conferences',
        'Feature writing: human-interest athlete journeys from rural India',
      ],
    },
    {
      title: 'Module 2: Photography & Mobile Video Journalism (MoJo)',
      icon: FaCamera,
      color: 'text-[#0B5FA5]',
      topics: [
        'DSLR camera essentials: shutter speed, ISO, tracking fast-paced athletes',
        'Pitchside photography ethics, positioning, and framing action shots',
        'Smartphone 4K video recording, stabilization, and mic setup',
      ],
    },
    {
      title: 'Module 3: Interviews & Athlete Profiling',
      icon: FaMicrophone,
      color: 'text-teal-600',
      topics: [
        'Techniques for questioning school champions, PET teachers, and coaches',
        'Conducting pre-match and post-match video interviews',
        'Spotting emerging talent before they reach national headlines',
      ],
    },
    {
      title: 'Module 4: Live Event Coverage & Commentary',
      icon: FaVideo,
      color: 'text-emerald-600',
      topics: [
        'Multi-camera setup for annual sports meets and tournament finals',
        'Live streaming workflows on YouTube and social channels',
        'Play-by-play commentary, graphics overlay, and scoreboard control',
      ],
    },
    {
      title: 'Module 5: Social Media & YouTube Content Creation',
      icon: FaYoutube,
      color: 'text-red-600',
      topics: [
        'Short-form reels, TikTok/Shorts editing, and sports engagement',
        'YouTube thumbnail design, SEO optimization, and channel growth',
        'Audience building for school sports teams and local athletes',
      ],
    },
    {
      title: 'Module 6: Sports Law, Ethics, Privacy & Governance',
      icon: FaShieldAlt,
      color: 'text-rose-700',
      topics: [
        'Minors in sports media: privacy laws and parental consent',
        'Anti-doping awareness (WADA/NADA) and age-fraud reporting',
        'Responsible journalism, defamation laws, and factual verification',
      ],
    },
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
          <span className="text-[#032D59] font-black">Sports Media Journalism School</span>
        </div>
        <span className="text-xs font-black uppercase text-[#168C45] tracking-widest bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
          Admissions Open 2024-25
        </span>
      </div>

      {/* Hero Banner with the Master Photographer Image */}
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-[#032042] via-[#053266] to-[#032042] rounded-xl text-white p-6 sm:p-8 shadow-md border border-[#0B4F8A] mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3 z-10">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#0B5FA5] rounded text-white shadow-xs">
                <FaGraduationCap size={20} />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Official Certification Programme
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight">
              SPORTS MEDIA JOURNALISM SCHOOL
            </h1>
            <p className="text-xs sm:text-sm font-extrabold text-blue-200 uppercase tracking-widest">
              Learn &bull; Report &bull; Share &bull; Make an Impact
            </p>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              A unique certificate training programme designed to train students, campus sports
              reporters, aspiring photojournalists, and digital creators to document grassroots sports
              with professional broadcast standards.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded border border-white/20">
                Official Press Accreditation
              </span>
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded border border-white/20">
                DSLR & MoJo Kit Training
              </span>
              <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded border border-white/20">
                Mentorship from National Journalists
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 relative h-64 sm:h-72 rounded-lg overflow-hidden border border-white/20 shadow-lg">
            <Image
              src="/press.png"
              alt="Sports Media Journalism Photographer with Camera"
              fill
              className="object-cover object-right"
              priority
            />
            <div className="absolute bottom-2 left-2 bg-[#032D59]/90 text-white text-[11px] font-black px-2 py-1 rounded shadow-md">
              PRESS ACCREDITED
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Breakdown */}
      <div className="w-full mb-8">
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-[#032D59] uppercase tracking-wide">
            CERTIFICATE COURSE SYLLABUS & MODULES
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            Comprehensive 6-month hands-on curriculum with practical tournament reporting
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className={`p-2 rounded-md bg-slate-100 ${m.color}`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-black text-[#032D59] uppercase leading-tight">
                      {m.title}
                    </h3>
                  </div>
                  <ul className="space-y-1.5 mt-3">
                    {m.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                        <span className="text-[#0B5FA5] mt-0.5 font-black">&bull;</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Enrollment Form */}
      <div className="w-full bg-slate-50 rounded-xl border border-slate-200 p-6 sm:p-8 max-w-2xl mb-8 shadow-xs">
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-[#032D59] uppercase">
            ENROLL NOW IN JOURNALISM SCHOOL
          </h2>
          <p className="text-xs text-slate-600 font-semibold mt-1">
            Begin your journey as a certified grassroots sports reporter and content creator
          </p>
        </div>

        {enrolled ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <FaCheckCircle className="text-[#168C45] mx-auto mb-2" size={36} />
            <h3 className="text-base font-black text-slate-900">Application Submitted!</h3>
            <p className="text-xs text-slate-700 mt-1">
              Thank you, {formData.name}. Our admissions counselor will contact you at {formData.phone} with batch timings and registration details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ananya Sharma"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ananya@gmail.com"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                School / College / Institution
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g. Hyderabad Central University / DPS"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#168C45] to-[#116E36] hover:from-[#116E36] hover:to-[#0D5429] text-white font-black text-xs uppercase tracking-wider rounded-md shadow-xs transition-all cursor-pointer"
            >
              SUBMIT APPLICATION FOR ENROLLMENT
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
