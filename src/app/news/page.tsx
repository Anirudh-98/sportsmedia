'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaRegNewspaper,
  FaCalendarAlt,
  FaArrowLeft,
  FaTag,
} from 'react-icons/fa';

const NEWS_ARTICLES = [
  {
    id: 'state-record-100m',
    title: 'Hyderabad Sprinter Rohit Kumar Shatters 100m School State Record at Gachibowli',
    category: 'Athletics',
    date: 'May 16, 2024',
    summary: 'In an electrifying sprint final, 16-year-old Rohit Kumar of DPS clocked 10.62 seconds, securing qualification for the National Junior Athletics Trials in Bhopal.',
  },
  {
    id: 'school-sports-bureau-initiative',
    title: '50 Schools in Telangana Adopt Sports Information Centres under Blue Zone Mission',
    category: 'Initiative',
    date: 'May 12, 2024',
    summary: 'The digital bureau model trains student reporters and PET teachers to publish match reports and document every sports day directly to the state talent database.',
  },
  {
    id: 'junior-badminton-nationals',
    title: 'Ananya Reddy Reaches Finals of All-India Junior Ranking Badminton Tournament',
    category: 'Badminton',
    date: 'May 08, 2024',
    summary: 'Top seed Ananya Reddy displayed clinical baseline play, defeating national competitors in straight sets (21-18, 21-14) to reach the championship match.',
  },
  {
    id: 'sports-scholarships-2024',
    title: 'Annual Grassroots Sports Scholarship Fund Announced for 500 Deserving Athletes',
    category: 'Scholarships',
    date: 'April 28, 2024',
    summary: 'Applications now open for financial grants up to ₹1,50,000 for student medalists from government and private schools across Telangana and Andhra Pradesh.',
  },
];

export default function NewsPage() {
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
          <span className="text-[#032D59] font-black">News &amp; Updates</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          Grassroots Press
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          LATEST SPORTS NEWS &amp; UPDATES
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Daily tournament reports, record-breaking student achievements, and grassroots sports policy updates.
        </p>
      </div>

      {/* News Articles Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {NEWS_ARTICLES.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-[#0B5FA5] bg-blue-50 px-2.5 py-0.5 rounded font-black uppercase">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt size={11} /> {article.date}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#032D59] leading-snug mt-2 mb-2 hover:text-[#0B5FA5] transition-colors cursor-pointer">
                {article.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link
                href="/journalism"
                className="text-xs font-black text-[#0B5FA5] hover:underline"
              >
                Read Full Story on Journalism Desk &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
