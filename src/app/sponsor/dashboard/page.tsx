'use client';

import React, { useState, useEffect } from 'react';
import {
  FaHandsHelping,
  FaUsers,
  FaTrophy,
  FaRupeeSign,
  FaSearch,
  FaFilter,
  FaHeart,
  FaCheckCircle,
  FaTimes,
  FaExternalLinkAlt,
  FaMedal,
  FaMapMarkerAlt,
  FaChartLine,
} from 'react-icons/fa';
import { DashboardShell, NavItem } from '@/components/dashboard/DashboardShell';
import {
  subscribeCoachAthletes,
  subscribeSponsorshipPrograms,
  sponsorAthleteOrProgram,
  CoachAthlete,
  SponsorshipProgram,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/sponsor/dashboard', icon: FaHandsHelping },
  { label: 'Athlete Directory', href: '/sponsor/dashboard#directory', icon: FaUsers },
  { label: 'Sports Programs', href: '/sponsor/dashboard#programs', icon: FaTrophy },
  { label: 'My Sponsorships', href: '/sponsor/dashboard#sponsorships', icon: FaHeart },
  { label: 'Impact & Analytics', href: '/sponsor/dashboard#impact', icon: FaChartLine },
];

export default function SponsorDashboardPage() {
  const { user } = useAuth();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [programs, setPrograms] = useState<SponsorshipProgram[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('All');

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

    sponsorAthleteOrProgram({
      programId: selectedProgram?.id,
      athleteName: selectedAthlete?.name,
      sponsorName: user?.name || 'BlueZone Sports Fund',
      amount: sponsorAmount,
    });

    setShowSponsorModal(false);
    setSelectedAthlete(null);
    setSelectedProgram(null);
    showToast(`Sponsorship pledge of ${sponsorAmount} committed and synced in real-time!`);
  };

  // Filtered athletes
  const filteredAthletes = athletes.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.sport.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSport = selectedSport === 'All' || a.sport.toLowerCase().includes(selectedSport.toLowerCase());
    return matchesSearch && matchesSport;
  });

  return (
    <DashboardShell
      role="sponsor"
      roleTitle="Sponsor"
      roleBadge="Talent Discovery"
      themeColor="#F28C28"
      navItems={NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-2.5 rounded-lg shadow-2xl border border-blue-400/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <FaCheckCircle className="text-emerald-400" size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. WELCOME HEADER (PRD Specification) */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#F28C28] uppercase tracking-wider mb-1">
            <FaHandsHelping size={14} />
            CSR &amp; Grassroots Sports Impact Foundation
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#032D59] uppercase tracking-tight">
            Welcome, {user?.name || 'BlueZone Sports Fund'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
            Discover verified student talent &bull; Sponsor grassroots sports programs &bull; Track social ROI in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="#directory"
            className="px-4 py-2.5 bg-[#F28C28] hover:bg-[#D9771A] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98"
          >
            Discover Talent
          </a>
          <a
            href="#programs"
            className="px-4 py-2.5 bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98"
          >
            Browse Programs
          </a>
        </div>
      </div>

      {/* 2. KPI CARDS (PRD: ACTIVE SPONSORSHIPS 08, ATHLETES SUPPORTED 24, PROGRAMS 05, CONTRIBUTION ₹12.5L) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F28C28] flex items-center justify-center shrink-0">
            <FaHeart size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">08</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Active Sponsorships
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168C45] flex items-center justify-center shrink-0">
            <FaUsers size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">24</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Athletes Supported
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B5FA5] flex items-center justify-center shrink-0">
            <FaTrophy size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">05</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Programs Supported
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7E378B] flex items-center justify-center shrink-0">
            <FaRupeeSign size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">₹12.5L</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Total Contribution
            </div>
          </div>
        </div>
      </div>

      {/* 3. ATHLETE DISCOVERY ENGINE (PRD Specification) */}
      <section id="directory" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
              DISCOVER TALENT &amp; MEDAL PROSPECTS
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Filter by sport, location, and school to direct your sponsorship funds
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <FaSearch size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athlete, school..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#F28C28] focus:outline-hidden font-bold w-48 sm:w-60"
              />
            </div>

            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-700"
            >
              <option value="All">All Sports</option>
              <option value="Athletics">Athletics</option>
              <option value="Badminton">Badminton</option>
              <option value="Cricket">Cricket</option>
              <option value="Swimming">Swimming</option>
            </select>
          </div>
        </div>

        {/* Athlete Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAthletes.map((ath) => (
            <div
              key={ath.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0 border-2 border-white shadow-xs">
                    {ath.photo ? (
                      <Image src={ath.photo} alt={ath.name} fill className="object-cover" />
                    ) : (
                      <span className="flex items-center justify-center h-full text-slate-500 font-black">
                        {ath.name[0]}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">{ath.name}</h4>
                    <span className="text-[11px] font-bold text-[#0B5FA5] block mt-0.5">{ath.sport}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{ath.school}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 mb-3 text-xs">
                  <div className="flex items-center justify-between font-black mb-1">
                    <span className="text-slate-500 text-[10.5px]">Performance Index</span>
                    <span className="text-emerald-700">{ath.performance}%</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium leading-tight">
                    {ath.recentAchievement}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-slate-500">
                  {ath.sponsorName ? (
                    <span className="text-purple-700 font-black">Funded by {ath.sponsorName}</span>
                  ) : (
                    <span className="text-emerald-700 font-black">Needs Sponsor</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAthlete(ath);
                    setShowSponsorModal(true);
                  }}
                  className="px-3 py-1.5 bg-[#F28C28] hover:bg-[#D9771A] text-white text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  Sponsor
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SPONSORSHIP PROGRAMS (PRD Specification) */}
      <section id="programs" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
              GRASSROOTS SPONSORSHIP PROGRAMS
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Co-funded equipment drives, tournament travel, and coaching camps
            </p>
          </div>
          <span className="text-xs font-black text-[#0B5FA5]">{programs.length} Active Campaigns</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded">
                    {prog.sport} &bull; {prog.location}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      prog.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {prog.status === 'active' ? 'Active Program' : 'Open for Co-Sponsors'}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug mb-1">
                  {prog.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium mb-3">
                  Requirement: {prog.requirement} &bull; {prog.athletesCount} Student Athletes
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs font-black text-slate-700 mb-1">
                    <span>Funded: {prog.raisedAmount}</span>
                    <span className="text-slate-500">Goal: {prog.targetAmount}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full w-[85%]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  Lead Sponsor: {prog.sponsorName || 'Open Campaign'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProgram(prog);
                    setShowSponsorModal(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider rounded transition-all cursor-pointer"
                >
                  Fund Program
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MEASURABLE SOCIAL IMPACT (PRD Specification) */}
      <section id="impact" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
              MEASURABLE SOCIAL IMPACT &amp; CSR AUDIT
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Verified metric breakdowns backed by official competition results
            </p>
          </div>
          <span className="text-xs font-black text-emerald-700">96% Utilization Rate</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xl font-black text-slate-900">24</div>
            <div className="text-[10.5px] font-black uppercase text-slate-500 mt-0.5">Athletes Supported</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xl font-black text-[#0B5FA5]">4</div>
            <div className="text-[10.5px] font-black uppercase text-slate-500 mt-0.5">Sports Disciplines</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xl font-black text-emerald-600">8</div>
            <div className="text-[10.5px] font-black uppercase text-slate-500 mt-0.5">Events Co-Sponsored</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xl font-black text-purple-600">12</div>
            <div className="text-[10.5px] font-black uppercase text-slate-500 mt-0.5">Schools Covered</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xl font-black text-orange-600">5</div>
            <div className="text-[10.5px] font-black uppercase text-slate-500 mt-0.5">Districts Reached</div>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xl font-black text-amber-600">38</div>
            <div className="text-[10.5px] font-black uppercase text-slate-500 mt-0.5">Podium Medals</div>
          </div>
        </div>
      </section>

      {/* SPONSOR MODAL */}
      {showSponsorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FaHandsHelping size={16} className="text-[#F28C28]" />
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase">
                  Commit Sponsorship Contribution
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSponsorModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleConfirmSponsorship} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Recipient
                </label>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
                  {selectedAthlete
                    ? `Athlete: ${selectedAthlete.name} (${selectedAthlete.sport})`
                    : selectedProgram
                    ? `Program: ${selectedProgram.title}`
                    : 'General Grassroots Sports Grant Fund'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Sponsorship Amount
                </label>
                <select
                  value={sponsorAmount}
                  onChange={(e) => setSponsorAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F28C28] focus:outline-hidden font-bold"
                >
                  <option value="₹25,000">₹25,000 (Kit Grant)</option>
                  <option value="₹50,000">₹50,000 (Annual Training Grant)</option>
                  <option value="₹1,00,000">₹1,00,000 (National Championship Grant)</option>
                  <option value="₹2,50,000">₹2,50,000 (Program Sponsorship)</option>
                </select>
              </div>

              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Your sponsorship is registered in real-time and alerts the SportsMedia Blue Zone Admin queue for disbursement and compliance certification.
              </p>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSponsorModal(false)}
                  className="px-3.5 py-2 text-xs font-black text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F28C28] hover:bg-[#D9771A] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm Sponsorship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
