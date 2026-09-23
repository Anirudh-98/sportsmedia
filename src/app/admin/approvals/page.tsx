'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  Check,
  X,
  CheckCircle2,
  Filter,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ADMIN_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribePendingApprovals,
  updateApprovalStatus,
  PendingApproval,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function AdminApprovalsPage() {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribePendingApprovals(setApprovals);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAction = (id: string, action: 'approved' | 'rejected', title: string) => {
    updateApprovalStatus(id, action);
    showToast(`Request "${title}" marked as ${action.toUpperCase()}!`);
  };

  const filteredApprovals = approvals.filter((item) => {
    const matchesType = filterType === 'All' || item.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <DashboardShell
      role="admin"
      roleTitle="Super Admin"
      roleBadge="Platform Oversight"
      themeColor="#032D59"
      navItems={ADMIN_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Clock size={12} />
            Moderation Queue
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Pending Approvals & Verification Desk
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Authorize new athlete rosters, moderate trainee journalism match reports, and approve institutional credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(['pending', 'approved', 'rejected', 'all'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#032D59] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Filter by Request Type */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs">
        {['All', 'Article Moderation', 'Coach Registration', 'School Verification', 'Sponsor Verification'].map((tp) => (
          <button
            key={tp}
            type="button"
            onClick={() => setFilterType(tp)}
            className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
              filterType === tp
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tp}
          </button>
        ))}
      </div>

      {/* Approvals List */}
      <div className="space-y-3.5">
        {filteredApprovals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-400 font-bold">
            No requests matching filter criteria in queue.
          </div>
        ) : (
          filteredApprovals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-all"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded">
                    {item.type}
                  </span>
                  <span
                    className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-full ${
                      item.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : item.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.details}</p>

                <div className="text-[11px] text-slate-400 font-bold pt-1">
                  Submitted by: <strong className="text-slate-700">{item.submittedBy}</strong> &bull;{' '}
                  {item.timestamp}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.status === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, 'approved', item.title)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, 'rejected', item.title)}
                      className="px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <X size={14} />
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Action recorded</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardShell>
  );
}
