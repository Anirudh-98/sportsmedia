'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Printer,
  RotateCw,
  QrCode,
  Download,
  CheckCircle2,
  FileCheck2,
  AlertCircle,
  Users,
  Camera,
  Award,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { PressIdCard, PRESET_STUDENTS, StudentIdCardData, printPressIdCard } from '@/components/idcard/PressIdCard';
import { useAuth } from '@/context/AuthContext';

const ACCENT = '#0B5FA5';

export default function StudentIdCardPage() {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<StudentIdCardData>({
    ...PRESET_STUDENTS[0],
    name: user?.name || PRESET_STUDENTS[0].name,
    avatar: user?.avatar || PRESET_STUDENTS[0].avatar,
  });

  return (
    <DashboardShell
      role="student"
      roleTitle="Trainee Journalist"
      roleBadge="Official Press Credential"
      themeColor={ACCENT}
      navItems={STUDENT_NAV_ITEMS}
    >
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <ShieldCheck size={13} className="text-blue-600" /> Official Accreditation
            </span>
            <span className="text-xs text-slate-400">Sports Journalism Certificate Programme</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trainee Press ID Card
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Digital and printable field press pass for match day reporting, video recording, and interview authorizations at school, district, and grassroots sports events.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => printPressIdCard('front')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Printer size={16} />
            <span>Print Front</span>
          </button>
          <button
            type="button"
            onClick={() => printPressIdCard('back')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-all cursor-pointer"
          >
            <Printer size={16} />
            <span>Print Back</span>
          </button>
        </div>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: 3D INTERACTIVE ID CARD */}
        <div className="lg:col-span-6 xl:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Live 3D Press Badge</h2>
              <p className="text-xs text-slate-400">Click card or use button to flip Front & Back</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <CheckCircle2 size={13} /> Active & Verified
            </span>
          </div>

          {/* THE 3D FLIPPABLE ID CARD */}
          <PressIdCard
            initialStudent={selectedStudent}
            allowStudentSwitch={true}
          />
        </div>

        {/* RIGHT COLUMN: GUIDELINES, VERIFICATION & STUDENT GENERATOR */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-5">
          {/* STUDENT GENERATOR CARD */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Student Directory & Generator</h3>
                  <p className="text-xs text-slate-500">Generate ID cards for each enrolled student journalist</p>
                </div>
              </div>
            </div>

            {/* Quick Switcher Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {PRESET_STUDENTS.map((std) => (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => setSelectedStudent(std)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedStudent.id === std.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/20'
                      : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <img
                    src={std.avatar}
                    alt={std.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{std.name}</p>
                    <p className="text-[11px] text-sky-700 font-mono font-medium">{std.idNo}</p>
                    <p className="text-[10px] text-slate-400">Blood: {std.bloodGroup}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Editable Form for Custom Student Generation */}
            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles size={13} className="text-blue-600" /> Customize Card Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    value={selectedStudent.name}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Accreditation ID No.</label>
                  <input
                    type="text"
                    value={selectedStudent.idNo}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, idNo: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Course Title</label>
                  <input
                    type="text"
                    value={selectedStudent.course}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, course: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Blood Group</label>
                  <select
                    value={selectedStudent.bloodGroup}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, bloodGroup: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* CODE OF CONDUCT & PERMISSIONS INFO */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileCheck2 size={18} className="text-blue-600" />
              Press ID Usage & Guidelines
            </h3>
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-blue-50/50 border border-blue-100">
                <Camera size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Pitch-side & Event Access:</strong> Show this card to match coordinators and school authorities to gain entry into authorized media enclosures, photography bays, and post-match interview zones.
                </p>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/50 border border-amber-100">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Student Ethics:</strong> Always obtain parental and institutional consent when photographing minor athletes. All match report material is subject to SportsMedia editorial oversight before public broadcast.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
