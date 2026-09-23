'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Medal,
  Activity,
  CheckCircle2,
  X,
  Phone,
  School,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { COACH_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeCoachAthletes, addCoachAthlete, CoachAthlete } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function CoachAthletesPage() {
  const { user } = useAuth();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form states
  const [athleteName, setAthleteName] = useState('');
  const [athleteSport, setAthleteSport] = useState('Athletics (100m)');
  const [athleteSchool, setAthleteSchool] = useState('DPS Hyderabad');
  const [athletePerformance, setAthletePerformance] = useState(88);
  const [athleteAchievement, setAthleteAchievement] = useState('');

  useEffect(() => {
    const unsub = subscribeCoachAthletes(setAthletes);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName.trim()) return;

    addCoachAthlete({
      name: athleteName,
      sport: athleteSport,
      school: athleteSchool,
      performance: Number(athletePerformance) || 85,
      recentAchievement: athleteAchievement || 'District Silver Medalist',
      medals: 2,
      coachName: user?.name || 'Coach Rajesh Sharma',
      photo: '/image/athelete.png',
    });

    setAthleteName('');
    setAthleteAchievement('');
    setShowAddModal(false);
    showToast('New athlete successfully enrolled & verified.');
  };

  const sports = ['All', 'Athletics', 'Badminton', 'Cricket', 'Football', 'Swimming'];

  const filteredAthletes = athletes.filter((a) => {
    const matchesSport = selectedSport === 'All' || a.sport.toLowerCase().includes(selectedSport.toLowerCase());
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.school.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

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
            <Users size={12} />
            Talent Squad Management
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            My Athletes Roster
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your registered squad athletes, baseline fitness metrics, and school affiliations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <UserPlus size={14} />
          Enroll New Athlete
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search athlete by name or affiliated school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 bg-slate-50/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {sports.map((sp) => (
            <button
              key={sp}
              type="button"
              onClick={() => setSelectedSport(sp)}
              className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedSport === sp
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Athletes Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAthletes.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-emerald-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800">
                  {a.sport}
                </span>
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {a.performance}% Ready
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-emerald-100">
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

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-bold">Coach: {a.coachName}</span>
              {a.sponsorName ? (
                <span className="text-[10px] font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Sponsored
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">Unsponsored</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD ATHLETE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#059669] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Enroll Athlete</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Athlete Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Reddy"
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Sport
                  </label>
                  <select
                    value={athleteSport}
                    onChange={(e) => setAthleteSport(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="Athletics (100m)">Athletics (100m)</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Swimming">Swimming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    value={athleteSchool}
                    onChange={(e) => setAthleteSchool(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Baseline Readiness ({athletePerformance}%)
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={athletePerformance}
                  onChange={(e) => setAthletePerformance(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Medal or Best Record
                </label>
                <input
                  type="text"
                  placeholder="e.g. Under-17 State Champion"
                  value={athleteAchievement}
                  onChange={(e) => setAthleteAchievement(e.target.value)}
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
                  <UserPlus size={12} />
                  Register Athlete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
