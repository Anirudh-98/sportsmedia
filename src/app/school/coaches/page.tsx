'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Mail,
  Phone,
  Award,
  CheckCircle2,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth } from '@/context/AuthContext';

export default function SchoolCoachesPage() {
  const { user } = useAuth();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const coaches = [
    {
      id: 'c-1',
      name: 'Coach Rajesh Sharma',
      role: 'Head Athletics Coach & PET Master',
      sports: ['Athletics', 'Track & Field', 'Fitness'],
      experience: '12 Years',
      certification: 'NIS Diploma & SAI Certified',
      email: 'rajesh.sharma@standrews.edu',
      phone: '+91 98490 12345',
      squadSize: '65 Athletes',
    },
    {
      id: 'c-2',
      name: 'Coach Vikram Rao',
      role: 'Head Badminton Coach',
      sports: ['Badminton'],
      experience: '8 Years',
      certification: 'BWF Level 2 Accredited',
      email: 'vikram.rao@standrews.edu',
      phone: '+91 98490 23456',
      squadSize: '32 Athletes',
    },
    {
      id: 'c-3',
      name: 'Coach Sunita Menon',
      role: 'Aquatic Director & Swimming Coach',
      sports: ['Swimming', 'Water Polo'],
      experience: '10 Years',
      certification: 'FINA Swimming Instructor',
      email: 'sunita.menon@standrews.edu',
      phone: '+91 98490 34567',
      squadSize: '45 Athletes',
    },
    {
      id: 'c-4',
      name: 'Coach David D’Souza',
      role: 'Varsity Football Coach',
      sports: ['Football'],
      experience: '9 Years',
      certification: 'AFC B-License',
      email: 'david.dsouza@standrews.edu',
      phone: '+91 98490 45678',
      squadSize: '40 Athletes',
    },
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

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
            <UserCheck size={12} />
            Faculty & Directors
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Coaching Faculty & PET Masters
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Accredited physical education staff, specialized sports discipline trainers, and certification credentials.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('Faculty onboarding form initiated.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Add Faculty Member
        </button>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {coaches.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-amber-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded">
                  {c.experience} Experience
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck size={11} />
                  Verified
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{c.name}</h3>
              <p className="text-xs text-slate-600 font-bold mb-3">{c.role}</p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="text-slate-500">
                  <span>Certification:</span> <strong className="text-slate-800">{c.certification}</strong>
                </div>
                <div className="text-slate-500">
                  <span>Squad Size:</span> <strong className="text-slate-800">{c.squadSize}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Mail size={12} className="text-slate-400" />
                {c.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={12} className="text-slate-400" />
                {c.phone}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
