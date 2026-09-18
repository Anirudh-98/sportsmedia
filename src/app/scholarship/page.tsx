'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaGraduationCap,
  FaHeart,
  FaCheckCircle,
  FaArrowLeft,
  FaAward,
  FaFileAlt,
  FaHandsHelping,
} from 'react-icons/fa';

export default function ScholarshipPage() {
  const [submitted, setSubmitted] = useState(false);

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
          <span className="text-[#032D59] font-black">Scholarship &amp; Support</span>
        </div>
        <span className="text-xs font-black uppercase text-[#168C45] tracking-widest bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200">
          Grant Applications 2024
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          SPORTS SCHOLARSHIP &amp; STUDENT SUPPORT
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Financial aid, professional equipment kits, travel stipends, and coaching sponsorships for economically challenged school athletes.
        </p>
      </div>

      {/* 3 Grant Tiers */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {[
          {
            tier: 'Tier 1: Rising Star Kit Grant',
            desc: 'Covers branded professional shoes, tournament kits, nutrition support, and local travel reimbursements.',
            target: 'District & State Level Under-14/16 Medalists',
          },
          {
            tier: 'Tier 2: National Championship Grant',
            desc: 'Full sponsorship for national trials, NIS coach training camps, physio assessments, and sports gear.',
            target: 'State Gold Medalists & National Qualifiers',
          },
          {
            tier: 'Tier 3: Elite High Performance',
            desc: 'Comprehensive annual scholarship covering elite academy fees, international tournament travel, and gear.',
            target: 'National Medalists & Junior India Probables',
          },
        ].map((grant, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="mb-3">
                <span className="text-xs font-black uppercase text-[#0B5FA5] bg-blue-50 px-2.5 py-1 rounded">
                  {grant.tier}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
                {grant.desc}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-bold">
              Target: {grant.target}
            </div>
          </div>
        ))}
      </div>

      {/* Application Form */}
      <div className="w-full max-w-2xl bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-8">
        <h2 className="text-xl font-black text-[#032D59] uppercase text-center mb-2">
          APPLY FOR SPORTS SCHOLARSHIP
        </h2>
        <p className="text-xs text-slate-600 font-semibold text-center mb-6">
          Verified applications are reviewed by the SportsMedia Blue Zone Trust panel.
        </p>

        {submitted ? (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <FaCheckCircle className="text-[#168C45] mx-auto mb-2" size={36} />
            <h3 className="text-base font-black text-slate-900">Application Received!</h3>
            <p className="text-xs text-slate-700 mt-1">
              Your application has been registered. Our scholarship committee will review the tournament certificates and contact your school PET department.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Student Athlete Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sara Khan"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Sport Discipline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swimming / 100m Freestyle"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Age / Class
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 Years / Class 10"
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                School Name &amp; City
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Telangana State Sports School, Hakimpet"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                Highest Tournament Achievement
              </label>
              <textarea
                rows={3}
                required
                placeholder="List state/district tournament names, medals won, and official timings/scores..."
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#168C45] hover:bg-[#116E36] text-white font-black text-xs uppercase tracking-wider rounded-md shadow-xs transition-all cursor-pointer"
            >
              SUBMIT SCHOLARSHIP APPLICATION
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
