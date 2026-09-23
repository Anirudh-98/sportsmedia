'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Trophy,
  Heart,
  CheckCircle2,
  X,
  Medal,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SPONSOR_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribeCoachAthletes,
  subscribeSponsorshipPrograms,
  sponsorAthleteOrProgram,
  CoachAthlete,
  SponsorshipProgram,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';
import { getTodayLabel } from '@/lib/utils';

const ACCENT = '#7C3AED';

export default function SponsorDashboardPage() {
  const { user } = useAuth();
  const todayLabel = getTodayLabel();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [programs, setPrograms] = useState<SponsorshipProgram[]>([]);

  // Modals
  const [selectedAthlete, setSelectedAthlete] = useState<CoachAthlete | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<SponsorshipProgram | null>(null);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [sponsorAmount, setSponsorAmount] = useState('₹50,000');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubAthletes = subscribeCoachAthletes(setAthletes);
    const unsubPrograms = subscribeSponsorshipPrograms(setPrograms);

    return () => {
      unsubAthletes();
      unsubPrograms();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleConfirmSponsorship = (e: React.FormEvent) => {
    e.preventDefault();
    const sponsorName = user?.institution || user?.name || 'Corporate Sponsor';

    sponsorAthleteOrProgram({
      programId: selectedProgram?.id,
      athleteName: selectedAthlete?.name,
      sponsorName,
      amount: sponsorAmount,
    });

    setShowSponsorModal(false);
    showToast(`Pledged ${sponsorAmount} sponsorship to ${selectedAthlete?.name || selectedProgram?.title}!`);
    setSelectedAthlete(null);
    setSelectedProgram(null);
  };

  const sponsoredAthletes = athletes.filter((a) => a.sponsorName);
  const totalFunded = '₹18,50,000';

  return (
    <DashboardShell
      role="sponsor"
      roleTitle="Sponsor"
      roleBadge="CSR & Talent Fund"
      themeColor={ACCENT}
      navItems={SPONSOR_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-slate-400 mb-1">{todayLabel}</p>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome, {user?.name || 'Sponsor Partner'}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/sponsor/directory"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Users size={15} />
            Discover talents
          </Link>
          <Link
            href="/sponsor/impact"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <TrendingUp size={15} />
            Impact analytics
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-wrap items-center gap-y-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 mb-6 shadow-sm">
        {[
          { icon: Heart, value: sponsoredAthletes.length || 4, label: 'Athletes backed', color: '#7C3AED' },
          { icon: TrendingUp, value: totalFunded, label: 'CSR capital pledged', color: '#059669' },
          { icon: Trophy, value: programs.length, label: 'Grassroots drives', color: '#D97706' },
          { icon: ShieldCheck, value: '100%', label: 'Tax compliant (80G)', color: '#0B5FA5' },
        ].map((s, i, arr) => (
          <React.Fragment key={s.label}>
            <div className="flex items-center gap-2.5 pr-5">
              <s.icon size={18} style={{ color: s.color }} />
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-900">{s.value}</span> {s.label}
              </p>
            </div>
            {i < arr.length - 1 && <div className="hidden sm:block w-px h-6 bg-slate-100 mr-5" />}
          </React.Fragment>
        ))}
      </div>

      {/* TALENT & PROGRAMS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Talent spotlight</h2>
              <p className="text-xs text-slate-500 mt-0.5">Promising athletes requiring financial support for equipment & travel</p>
            </div>
            <Link
              href="/sponsor/directory"
              className="text-xs font-medium hover:opacity-80 flex items-center gap-1 shrink-0"
              style={{ color: ACCENT }}
            >
              All athletes ({athletes.length}) <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {athletes.slice(0, 3).map((ath) => (
              <div
                key={ath.id}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={ath.photo || '/image/athelete.png'}
                      alt={ath.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 truncate">{ath.name}</h3>
                    <p className="text-xs text-slate-500">
                      {ath.sport} &bull; {ath.school}
                    </p>
                    <span className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-0.5">
                      <Medal size={11} /> {ath.recentAchievement}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-sm font-semibold text-emerald-700">{ath.performance}%</span>
                    <span className="text-xs text-slate-400 block">Readiness</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAthlete(ath);
                      setSelectedProgram(null);
                      setShowSponsorModal(true);
                    }}
                    className="px-3 py-1.5 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Sponsor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Grassroots drives</h2>
                <p className="text-xs text-slate-500 mt-0.5">Equipment & conditioning grants</p>
              </div>
              <Link
                href="/sponsor/programs"
                className="text-xs font-medium hover:opacity-80 flex items-center gap-1 shrink-0"
                style={{ color: ACCENT }}
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-2">
              {programs.slice(0, 2).map((prog) => (
                <div
                  key={prog.id}
                  className="p-3 rounded-xl border border-slate-100 space-y-2"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {prog.sport}
                    </span>
                    <span className="text-xs text-slate-500">{prog.location}</span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{prog.title}</h4>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Target: {prog.targetAmount}</span>
                    <span className="font-medium text-emerald-700">Raised: {prog.raisedAmount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-center">
            <Link href="/sponsor/sponsorships" className="text-sm font-medium hover:underline" style={{ color: ACCENT }}>
              View active sponsorships portfolio &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* MODAL: SPONSOR CONFIRMATION */}
      {showSponsorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Pledge sponsorship support</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSponsorModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmSponsorship} className="p-5 space-y-4">
              <div className="bg-purple-50 p-3.5 rounded-xl">
                <h4 className="text-sm font-medium text-purple-950">
                  Target beneficiary: {selectedAthlete ? selectedAthlete.name : selectedProgram?.title}
                </h4>
                <p className="text-xs text-purple-700 mt-0.5">
                  Direct transfer toward athlete training kits, competition fees, and nutritional support.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Sponsorship grant amount
                </label>
                <select
                  value={sponsorAmount}
                  onChange={(e) => setSponsorAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 bg-white"
                >
                  <option value="₹25,000">₹25,000 &bull; Equipment & Running Spikes Kit</option>
                  <option value="₹50,000">₹50,000 &bull; 6-Month Coaching & Nutrition Grant</option>
                  <option value="₹1,00,000">₹1,00,000 &bull; Full Year Annual Talent Fellowship</option>
                  <option value="₹2,50,000">₹2,50,000 &bull; National Championship Travel & Gear Grant</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSponsorModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Heart size={13} />
                  Confirm sponsorship pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
