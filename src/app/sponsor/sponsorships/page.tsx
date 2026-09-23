'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Heart,
  CheckCircle2,
  Calendar,
  Medal,
  Users,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SPONSOR_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeCoachAthletes, CoachAthlete } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function SponsorMySponsorshipsPage() {
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

  const sponsoredAthletes = athletes.filter((a) => a.sponsorName);

  return (
    <DashboardShell
      role="sponsor"
      roleTitle="Sponsor"
      roleBadge="CSR & Talent Fund"
      themeColor="#7C3AED"
      navItems={SPONSOR_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-purple-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Heart size={12} />
            My Portfolio
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Active Sponsorships & Beneficiaries
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Monitor the athletes and sports programs backed by your corporate CSR allocation.
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-bold text-slate-700">
          Total Beneficiaries: <span className="font-black text-purple-700">{sponsoredAthletes.length || 4} Talents</span>
        </div>
      </div>

      {/* Sponsored Athletes List */}
      <div className="space-y-4">
        {sponsoredAthletes.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-purple-300 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-purple-100">
                <Image
                  src={a.photo || '/image/athelete.png'}
                  alt={a.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-purple-800 bg-purple-50 px-2 py-0.5 rounded">
                    {a.sport}
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    Active Fellowship
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900">{a.name}</h3>
                <p className="text-xs text-slate-500">
                  Institution: <strong>{a.school}</strong> &bull; Coach in-charge: {a.coachName}
                </p>
                <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
                  <Medal size={12} /> {a.recentAchievement}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400">Sponsor Pledged</span>
                <div className="text-base font-black text-purple-700">₹1,00,000 / yr</div>
              </div>
              <button
                type="button"
                onClick={() => showToast(`Progress audit dossier downloaded for ${a.name}.`)}
                className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                Progress Dossier
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
