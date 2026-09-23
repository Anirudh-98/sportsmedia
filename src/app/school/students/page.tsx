'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Medal,
  Award,
  GraduationCap,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth } from '@/context/AuthContext';

export default function SchoolStudentsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const students = [
    {
      id: 'st-1',
      name: 'Rohit Kumar',
      grade: 'Grade 11-A',
      sport: 'Athletics (100m)',
      coach: 'Coach Rajesh Sharma',
      attendance: '96%',
      status: 'Active Athlete',
      medals: 3,
    },
    {
      id: 'st-2',
      name: 'Ananya Reddy',
      grade: 'Grade 10-C',
      sport: 'Badminton',
      coach: 'Coach Vikram Rao',
      attendance: '98%',
      status: 'State Selected',
      medals: 4,
    },
    {
      id: 'st-3',
      name: 'Vikram Singh',
      grade: 'Grade 12-B',
      sport: 'Cricket',
      coach: 'Coach Rajesh Sharma',
      attendance: '92%',
      status: 'Active Athlete',
      medals: 2,
    },
    {
      id: 'st-4',
      name: 'Pooja Nair',
      grade: 'Grade 9-A',
      sport: 'Swimming',
      coach: 'Coach Sunita Menon',
      attendance: '94%',
      status: 'District Record',
      medals: 5,
    },
    {
      id: 'st-5',
      name: 'Arjun Verma',
      grade: 'Grade 11-D',
      sport: 'Football',
      coach: 'Coach David D’Souza',
      attendance: '95%',
      status: 'Varsity Captain',
      medals: 1,
    },
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSport = selectedSport === 'All' || s.sport.includes(selectedSport);
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.grade.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  return (
    <DashboardShell
      role="school"
      roleTitle="School"
      roleBadge="Institutional Portal"
      themeColor="#D97706"
      navItems={SCHOOL_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Users size={12} />
            Student Athlete Registry
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Enrolled Student Athletes
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Directory of student competitors, their assigned coaches, attendance records, and sports disciplines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('Student registration form opened.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Register Student
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, grade, or section..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {['All', 'Athletics', 'Badminton', 'Cricket', 'Football', 'Swimming'].map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSelectedSport(sp)}
              className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedSport === sp
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Student Athletes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-black text-[10px] tracking-wider">
                <th className="py-3 px-4">Student Athlete</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-3">Sport</th>
                <th className="py-3 px-3">In-Charge Coach</th>
                <th className="py-3 px-3 text-center">Attendance</th>
                <th className="py-3 px-3 text-center">Medals</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-black text-slate-900">{s.name}</td>
                  <td className="py-3 px-3 text-slate-600">{s.grade}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-black uppercase">
                      {s.sport}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{s.coach}</td>
                  <td className="py-3 px-3 text-center text-emerald-700 font-bold">{s.attendance}</td>
                  <td className="py-3 px-3 text-center font-black text-amber-600">{s.medals}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
