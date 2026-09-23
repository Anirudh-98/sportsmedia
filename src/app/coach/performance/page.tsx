'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Zap,
  TrendingUp,
  HeartPulse,
  Timer,
  CheckCircle2,
  Medal,
  Sparkles,
  ArrowUpRight,
  Shield,
  Scale,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { COACH_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeCoachAthletes, CoachAthlete } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function CoachPerformancePage() {
  const { user } = useAuth();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCoachAthletes(setAthletes);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const avgPerformance = athletes.length
    ? Math.round(athletes.reduce((acc, a) => acc + a.performance, 0) / athletes.length)
    : 88;

  return (
    <DashboardShell
      role="coach"
      roleTitle="Coach"
      roleBadge="Athletic Director"
      themeColor="#059669"
      navItems={COACH_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Activity size={12} />
            Biomechanics & Readiness
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Performance Analytics & Benchmarks
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Monitor sprint speed, aerobic endurance, match readiness, and competitive fitness indices.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-sm font-black text-emerald-700">{avgPerformance}% Overall</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Squad Readiness Index</div>
          </div>
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Timer size={18} />
            </div>
            <h3 className="text-xs font-black uppercase text-slate-900">Sprint Acceleration</h3>
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">10.42s</div>
          <p className="text-[11px] text-slate-500">
            Squad 100m benchmark record set by Rohit Kumar. +4.2% faster than regional baseline.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <HeartPulse size={18} />
            </div>
            <h3 className="text-xs font-black uppercase text-slate-900">VO2 Max & Stamina</h3>
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">58.4 ml/kg</div>
          <p className="text-[11px] text-slate-500">
            Cardiovascular endurance rating across varsity squad. Rated Excellent for U-19 standards.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Zap size={18} />
            </div>
            <h3 className="text-xs font-black uppercase text-slate-900">Match Load & Recovery</h3>
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">94.8%</div>
          <p className="text-[11px] text-slate-500">
            Current squad injury-free rate. 14 athletes cleared for full competition intensity.
          </p>
        </div>
      </div>

      {/* Individual Athlete Readiness Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase">Individual Athlete Readiness</h2>
            <p className="text-xs text-slate-500">Physical evaluation breakdown and readiness score per athlete</p>
          </div>
          <button
            type="button"
            onClick={() => showToast('Performance benchmark report generated.')}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            Export Logs
          </button>
        </div>

        <div className="space-y-4">
          {athletes.map((a) => (
            <div
              key={a.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black text-slate-900">{a.name}</h4>
                  <span className="text-[11px] text-slate-500">
                    {a.sport} &bull; {a.school}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-emerald-700">{a.performance}%</span>
                  <span className="text-[10px] text-slate-400 block font-bold">Readiness Score</span>
                </div>
              </div>

              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all"
                  style={{ width: `${a.performance}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Recent mark: <strong className="text-slate-800">{a.recentAchievement}</strong></span>
                <button
                  type="button"
                  onClick={() => showToast(`Logged new performance metrics for ${a.name}.`)}
                  className="text-emerald-700 hover:underline font-bold text-[11px]"
                >
                  Log Test &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
