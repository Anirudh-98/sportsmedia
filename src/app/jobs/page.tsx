'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';

const JOBS_DATA = [
  {
    id: 'pet-master-hyderabad',
    title: 'Senior Physical Education Teacher (PET)',
    organization: 'Oakridge International School',
    location: 'Hyderabad, Telangana',
    type: 'Full Time',
    salary: '₹45,000 - ₹60,000 / Month',
    posted: '2 days ago',
    requirements: 'B.P.Ed / M.P.Ed with 3+ years school sports coaching experience in Athletics & Football.',
  },
  {
    id: 'athletics-coach-academy',
    title: 'Head Athletics Coach (Sprints & Jumps)',
    organization: 'Deccan Sports Academy',
    location: 'Gachibowli, Hyderabad',
    type: 'Full Time',
    salary: '₹50,000 - ₹75,000 / Month',
    posted: '3 days ago',
    requirements: 'NIS Diploma in Athletics coaching with track record of training state medalists.',
  },
  {
    id: 'sports-journalist-intern',
    title: 'Junior Sports Journalist & Video Reporter',
    organization: 'SportsMedia.World',
    location: 'Hyderabad / Field Reporting',
    type: 'Full Time / Internship',
    salary: '₹25,000 - ₹35,000 / Month',
    posted: 'Just now',
    requirements: 'Graduate with strong writing skills in English/Telugu/Hindi and DSLR video camera handling.',
  },
  {
    id: 'physio-academy',
    title: 'Sports Physiotherapist & Injury Rehabilitation Specialist',
    organization: 'Telangana Youth Sports Foundation',
    location: 'Secunderabad, Telangana',
    type: 'Full Time',
    salary: '₹55,000 - ₹70,000 / Month',
    posted: '5 days ago',
    requirements: 'BPT / MPT (Sports) with experience in taping, muscle recovery, and athlete injury rehab.',
  },
];

export default function JobsPage() {
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

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
          <span className="text-[#032D59] font-black">Job Portal</span>
        </div>
        <span className="text-xs font-black uppercase text-[#0B5FA5] tracking-widest bg-blue-50 px-2.5 py-1 rounded-sm border border-blue-200">
          Sports Careers Hub
        </span>
      </div>

      {/* Header */}
      <div className="w-full text-center max-w-3xl mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#032D59] uppercase tracking-tight">
          SPORTS CAREERS &amp; JOB PORTAL
        </h1>
        <p className="text-sm sm:text-base text-slate-700 font-bold mt-2">
          Connecting qualified PET teachers, NIS coaches, sports physiotherapists, and media professionals with leading schools and academies.
        </p>
      </div>

      {/* Job Listings */}
      <div className="w-full space-y-4 mb-8">
        {JOBS_DATA.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded">
                  {job.type}
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <FaClock size={11} /> {job.posted}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-[#032D59] uppercase">
                {job.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-600 font-medium flex-wrap">
                <span className="flex items-center gap-1 font-bold text-slate-800">
                  <FaBuilding className="text-slate-400" />
                  {job.organization}
                </span>
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-slate-400" />
                  {job.location}
                </span>
                <span className="font-bold text-[#168C45]">{job.salary}</span>
              </div>
              <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                {job.requirements}
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setAppliedJob(job.id)}
                className="w-full md:w-40 py-2 px-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white font-black text-xs uppercase tracking-wider rounded-md text-center shadow-xs transition-all cursor-pointer"
              >
                {appliedJob === job.id ? 'APPLIED ✓' : 'EASY APPLY'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post a Job Banner */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 text-center space-y-3">
        <h2 className="text-lg font-black text-[#032D59] uppercase">
          ARE YOU A SCHOOL OR ACADEMY HIRING SPORTS STAFF?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Post your vacancy on India&apos;s fastest growing grassroots sports network and reach verified PET teachers, NIS coaches, and trainers.
        </p>
        <Link
          href="/contact"
          className="inline-block py-2.5 px-6 bg-[#032D59] hover:bg-[#0B5FA5] text-white font-black text-xs uppercase tracking-wider rounded-md shadow-xs transition-all"
        >
          POST A JOB VACANCY
        </Link>
      </div>
    </div>
  );
}
