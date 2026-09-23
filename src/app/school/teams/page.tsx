'use client';

import React, { useState } from 'react';
import {
  Shield,
  Trophy,
  Users,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth } from '@/context/AuthContext';

export default function SchoolTeamsPage() {
  const { user } = useAuth();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const teams = [
    {
      id: 'tm-1',
      sport: 'Athletics & Track Squad',
      category: 'Senior & Junior Boys/Girls',
      captain: 'Rohit Kumar',
      coach: 'Coach Rajesh Sharma',
      athletesCount: 65,
      activeLeague: 'District Interschool Championship',
      record: '3 Golds & 2 Silvers',
    },
    {
      id: 'tm-2',
      sport: 'Varsity Football Squad',
      category: 'Under-17 Boys',
      captain: 'Arjun Verma',
      coach: 'Coach David D’Souza',
      athletesCount: 22,
      activeLeague: 'Hyderabad Schools Cup',
      record: 'Current Champions',
    },
    {
      id: 'tm-3',
      sport: 'Varsity Badminton Team',
      category: 'Open Singles & Doubles',
      captain: 'Ananya Reddy',
      coach: 'Coach Vikram Rao',
      athletesCount: 16,
      activeLeague: 'State Junior Circuit',
      record: 'Ranked #1 in Zone',
    },
    {
      id: 'tm-4',
      sport: 'Cricket XI Team',
      category: 'Under-19 Boys',
      captain: 'Vikram Singh',
      coach: 'Coach Rajesh Sharma',
      athletesCount: 18,
      activeLeague: 'HCA Inter-School Shield',
      record: 'Semi-Finalists',
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
            <Shield size={12} />
            Varsity Sports Squads
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Sports & Varsity Teams
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your competitive inter-school teams, squad captains, and active tournament rosters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('New sports team created.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Create Team Squad
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {teams.map((tm) => (
          <div
            key={tm.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-amber-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  {tm.category}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {tm.athletesCount} Athletes
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{tm.sport}</h3>
              <p className="text-xs text-slate-500 mb-3">
                Captain: <strong className="text-slate-800">{tm.captain}</strong> &bull; Coach: {tm.coach}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="text-slate-500">
                  <span>Active League:</span> <strong className="text-slate-800">{tm.activeLeague}</strong>
                </div>
                <div className="text-slate-500">
                  <span>Season Standing:</span> <strong className="text-amber-700">{tm.record}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold">St. Andrews Varsity</span>
              <button
                type="button"
                onClick={() => showToast(`Roster details opened for ${tm.sport}.`)}
                className="text-amber-700 font-black hover:underline"
              >
                View Roster &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
