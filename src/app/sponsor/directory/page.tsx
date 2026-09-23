'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Search,
  Filter,
  Heart,
  Medal,
  CheckCircle2,
  X,
  School,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SPONSOR_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribeCoachAthletes,
  sponsorAthleteOrProgram,
  CoachAthlete,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function SponsorDirectoryPage() {
  const { user } = useAuth();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [selectedAthlete, setSelectedAthlete] = useState<CoachAthlete | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [sponsorAmount, setSponsorAmount] = useState('₹50,000');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCoachAthletes(setAthletes);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAthlete) return;

    sponsorAthleteOrProgram({
      athleteName: selectedAthlete.name,
      sponsorName: user?.institution || user?.name || 'CSR Sponsor',
      amount: sponsorAmount,
    });

    setShowModal(false);
    showToast(`Successfully sponsored ${selectedAthlete.name} with ${sponsorAmount}.`);
    setSelectedAthlete(null);
  };

  const sports = ['All', 'Athletics', 'Badminton', 'Cricket', 'Football', 'Swimming'];

  const filteredAthletes = athletes.filter((ath) => {
    const matchesSport = selectedSport === 'All' || ath.sport.toLowerCase().includes(selectedSport.toLowerCase());
    const matchesSearch =
      ath.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ath.school.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

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
            <Users size={12} />
            Talent Discovery
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Athlete Scouting & Directory
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Discover verified grassroots athletes across India, review their records, and provide direct sponsorship grants.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by athlete name, sport, or school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {sports.map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSelectedSport(sp)}
              className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedSport === sp
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Athletes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAthletes.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-purple-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-purple-50 text-purple-800">
                  {a.sport}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {a.performance}% Ready
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-purple-100">
                  <Image
                    src={a.photo || '/image/athelete.png'}
                    alt={a.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{a.name}</h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <School size={12} className="text-slate-400" />
                    {a.school}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Recent Mark:</span>
                  <span className="font-bold text-slate-800">{a.recentAchievement}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Medals Count:</span>
                  <span className="font-black text-amber-600 flex items-center gap-1">
                    <Medal size={12} /> {a.medals} Medals
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              {a.sponsorName ? (
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Sponsored by {a.sponsorName}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAthlete(a);
                    setShowModal(true);
                  }}
                  className="w-full py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Heart size={13} />
                  Sponsor Athlete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SPONSOR MODAL */}
      {showModal && selectedAthlete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#7C3AED] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Sponsor Athlete</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSponsor} className="p-5 space-y-4">
              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-100">
                <h4 className="text-xs font-black text-purple-950">
                  Athlete: {selectedAthlete.name} ({selectedAthlete.sport})
                </h4>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Institution: {selectedAthlete.school} &bull; Recent: {selectedAthlete.recentAchievement}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Grant Amount
                </label>
                <select
                  value={sponsorAmount}
                  onChange={(e) => setSponsorAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-purple-600 bg-white"
                >
                  <option value="₹25,000">₹25,000 &bull; Running Spikes & Gear Grant</option>
                  <option value="₹50,000">₹50,000 &bull; 6-Month Training & Physiotherapy</option>
                  <option value="₹1,00,000">₹1,00,000 &bull; Full Year Sports Fellowship</option>
                  <option value="₹2,50,000">₹2,50,000 &bull; National Championship Travel & Diet</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Heart size={12} />
                  Confirm Direct Grant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
