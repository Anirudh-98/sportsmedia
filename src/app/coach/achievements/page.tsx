'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { COACH_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeCoachAthletes, CoachAthlete } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function CoachAchievementsPage() {
  const { user } = useAuth();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [athleteSelect, setAthleteSelect] = useState('');
  const [achievementTitle, setAchievementTitle] = useState('');
  const [medalType, setMedalType] = useState('Gold');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCoachAthletes(setAthletes);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achievementTitle.trim()) return;

    showToast(`Achievement recorded for ${athleteSelect || 'Squad'}: ${achievementTitle}`);
    setShowAddModal(false);
    setAchievementTitle('');
  };

  const totalMedals = athletes.reduce((acc, a) => acc + a.medals, 0);

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Trophy size={12} />
            Podiums & Medals
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Squad Achievements & Honors
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Verified tournament medals, state championship trophies, and record marks.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Record Achievement
        </button>
      </div>

      {/* Trophy KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Trophy size={26} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{totalMedals}</div>
            <div className="text-xs font-bold text-slate-400 uppercase">Total Medals Won</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shrink-0">
            <Medal size={26} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">4 Gold</div>
            <div className="text-xs font-bold text-slate-400 uppercase">State Championships</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Award size={26} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">100%</div>
            <div className="text-xs font-bold text-slate-400 uppercase">SAI / NIS Verified</div>
          </div>
        </div>
      </div>

      {/* Achievements Roster Cards */}
      <div className="space-y-4">
        {athletes.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Trophy size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {a.sport}
                </span>
                <h3 className="text-sm font-black text-slate-900 mt-1">{a.name}</h3>
                <p className="text-xs text-slate-600">{a.recentAchievement}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{a.school}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <span className="text-xs font-black text-amber-600 flex items-center gap-1 justify-end">
                  <Medal size={14} /> {a.medals} Medals
                </span>
                <span className="text-[10px] font-bold text-slate-400">Verified Record</span>
              </div>
              <button
                type="button"
                onClick={() => showToast(`Verified achievement certificate sent for ${a.name}.`)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase transition-colors"
              >
                Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RECORD ACHIEVEMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#059669] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Record New Achievement</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAchievement} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Select Athlete
                </label>
                <select
                  value={athleteSelect}
                  onChange={(e) => setAthleteSelect(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="">Select Athlete from Roster</option>
                  {athletes.map((ath) => (
                    <option key={ath.id} value={ath.name}>
                      {ath.name} ({ath.sport})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Medal / Podium Standing
                </label>
                <select
                  value={medalType}
                  onChange={(e) => setMedalType(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="Gold">Gold Medal (1st Place)</option>
                  <option value="Silver">Silver Medal (2nd Place)</option>
                  <option value="Bronze">Bronze Medal (3rd Place)</option>
                  <option value="State Record">State / District Record</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Achievement Details / Tournament Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Telangana State Junior Athletics Championship - 100m Gold (10.42s)"
                  value={achievementTitle}
                  onChange={(e) => setAchievementTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Trophy size={12} />
                  Save Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
