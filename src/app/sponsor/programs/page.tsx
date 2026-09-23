'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  MapPin,
  Users,
  Heart,
  CheckCircle2,
  X,
  Plus,
  IndianRupee,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SPONSOR_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribeSponsorshipPrograms,
  sponsorAthleteOrProgram,
  SponsorshipProgram,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function SponsorProgramsPage() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<SponsorshipProgram[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<SponsorshipProgram | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [fundingAmount, setFundingAmount] = useState('₹50,000');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeSponsorshipPrograms(setPrograms);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleFund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    sponsorAthleteOrProgram({
      programId: selectedProgram.id,
      sponsorName: user?.institution || user?.name || 'Corporate Sponsor',
      amount: fundingAmount,
    });

    setShowModal(false);
    showToast(`Pledged ${fundingAmount} toward ${selectedProgram.title}!`);
    setSelectedProgram(null);
  };

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
            <Trophy size={12} />
            Grassroots Initiatives
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Sports Programs & Equipment Drives
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Deploy your CSR capital toward verified grassroots programs, rural equipment drives, and district training camps.
          </p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {programs.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-purple-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-purple-50 text-purple-800">
                  {p.sport}
                </span>
                <span
                  className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full ${
                    p.status === 'funded'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-slate-400" />
                {p.location} &bull; Benefiting <strong>{p.athletesCount} Athletes</strong>
              </p>

              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Requirement:</span>
                <p className="text-slate-600">{p.requirement}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-500">Target: {p.targetAmount}</span>
                <span className="text-emerald-700">Raised: {p.raisedAmount}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedProgram(p);
                  setShowModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Heart size={13} />
                Fund This Initiative
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FUND MODAL */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#7C3AED] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Fund Grassroots Program</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFund} className="p-5 space-y-4">
              <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-100">
                <h4 className="text-xs font-black text-purple-950">{selectedProgram.title}</h4>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Location: {selectedProgram.location} &bull; Target: {selectedProgram.targetAmount}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Pledge Amount
                </label>
                <select
                  value={fundingAmount}
                  onChange={(e) => setFundingAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-purple-600 bg-white"
                >
                  <option value="₹50,000">₹50,000 &bull; Equipment Drive Grant</option>
                  <option value="₹1,00,000">₹1,00,000 &bull; Turf & Training Kit Support</option>
                  <option value="₹2,50,000">₹2,50,000 &bull; Complete Camp Sponsorship</option>
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
                  Confirm Grant Pledge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
