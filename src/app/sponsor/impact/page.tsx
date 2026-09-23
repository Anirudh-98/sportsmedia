'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Download,
  FileCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SPONSOR_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth } from '@/context/AuthContext';

export default function SponsorImpactPage() {
  const { user } = useAuth();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
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
            <TrendingUp size={12} />
            CSR Impact Audit
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Impact Metrics & CSR Compliance
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Verifiable social ROI, podium medals enabled through your grants, and tax compliance certificates.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('CSR Impact Report (PDF) downloaded successfully.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Download size={14} />
          Download 2026 CSR Audit
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="text-xs font-black uppercase text-slate-400 mb-1">Medals Enabled</div>
          <div className="text-3xl font-black text-purple-700">14</div>
          <p className="text-[11px] text-slate-500 mt-1">
            District & State medals won by athletes under your sponsorship fellowship.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="text-xs font-black uppercase text-slate-400 mb-1">Kits Distributed</div>
          <div className="text-3xl font-black text-emerald-600">85 Kits</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Professional running spikes and equipment bags delivered to rural student athletes.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="text-xs font-black uppercase text-slate-400 mb-1">Audit Status</div>
          <div className="text-3xl font-black text-blue-600">100%</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Section 135 Companies Act & 80G Tax Deductible certified by SportsMedia Foundation.
          </p>
        </div>
      </div>

      {/* Compliance & Impact Details */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
        <h2 className="text-base font-black text-slate-900 uppercase pb-3 border-b border-slate-100">
          Sponsorship Audit Log & Fund Flow
        </h2>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-900">Decathlon South Zone Talent Grant</h4>
              <p className="text-[11px] text-slate-500">Beneficiary: Hyderabad District Under-16 Athletics Camp</p>
            </div>
            <span className="text-xs font-black text-emerald-700">₹3,50,000 Disbursed</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-900">Individual Athlete Fellowship - Rohit Kumar</h4>
              <p className="text-[11px] text-slate-500">Beneficiary: 100m Sprint Athlete &bull; DPS Hyderabad</p>
            </div>
            <span className="text-xs font-black text-emerald-700">₹1,00,000 Disbursed</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-black text-slate-900">Badminton Grassroots Equipment Fellowship</h4>
              <p className="text-[11px] text-slate-500">Beneficiary: 12 Rural Badminton Talents &bull; Kotla Arena</p>
            </div>
            <span className="text-xs font-black text-emerald-700">₹2,00,000 Disbursed</span>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
