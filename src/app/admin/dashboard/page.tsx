'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Newspaper,
  Users,
  ShieldCheck,
  Check,
  X,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ADMIN_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribePendingApprovals,
  updateApprovalStatus,
  subscribeArticles,
  subscribeUsers,
  PendingApproval,
  Article,
  AppUser,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';
import { getTodayLabel } from '@/lib/utils';

const ACCENT = '#032D59';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const todayLabel = getTodayLabel();
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubApprovals = subscribePendingApprovals(setApprovals);
    const unsubArticles = subscribeArticles(setArticles);
    const unsubUsers = subscribeUsers(setUsers);

    return () => {
      unsubApprovals();
      unsubArticles();
      unsubUsers();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAction = (id: string, action: 'approved' | 'rejected', title: string) => {
    updateApprovalStatus(id, action);
    showToast(`Request "${title}" marked as ${action} in real-time.`);
  };

  const pendingQueue = approvals.filter((a) => a.status === 'pending');

  return (
    <DashboardShell
      role="admin"
      roleTitle="Super Admin"
      roleBadge="Platform Oversight"
      themeColor={ACCENT}
      navItems={ADMIN_NAV_ITEMS}
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
            SportsMedia master admin
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/moderation"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Newspaper size={15} />
            Content moderation
          </Link>
          <Link
            href="/admin/approvals"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Clock size={15} />
            Review approvals ({pendingQueue.length})
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-wrap items-center gap-y-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 mb-6 shadow-sm">
        {[
          { icon: Clock, value: pendingQueue.length, label: 'Pending queue', color: '#D97706' },
          { icon: Newspaper, value: articles.length, label: 'Articles synced', color: '#0B5FA5' },
          { icon: Users, value: `${users.length} users`, label: 'Database live accounts', color: '#059669' },
          { icon: ShieldCheck, value: '100%', label: 'Strict RBAC isolation', color: '#7C3AED' },
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

      {/* APPROVALS & CONTROL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Pending approvals queue</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live verifications awaiting admin authorization</p>
            </div>
            <Link
              href="/admin/approvals"
              className="text-xs font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0"
            >
              All requests ({pendingQueue.length}) <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {pendingQueue.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-100 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                    <h3 className="text-sm font-medium text-slate-900 mt-1">{item.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{item.details}</p>
                    <div className="text-xs text-slate-400 mt-1">
                      Submitted by: {item.submittedBy} &bull; {item.timestamp}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, 'approved', item.title)}
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                      title="Approve"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(item.id, 'rejected', item.title)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                      title="Reject"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Platform control</h2>
            </div>

            <div className="space-y-2">
              <Link
                href="/admin/moderation"
                className="p-3 rounded-xl border border-slate-100 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Newspaper size={16} className="text-blue-700" />
                  <span className="text-sm font-medium text-slate-900">Content moderation</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>

              <Link
                href="/admin/users"
                className="p-3 rounded-xl border border-slate-100 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-blue-700" />
                  <span className="text-sm font-medium text-slate-900">User directory</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>

              <Link
                href="/admin/settings"
                className="p-3 rounded-xl border border-slate-100 hover:bg-blue-50/40 hover:border-blue-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-blue-700" />
                  <span className="text-sm font-medium text-slate-900">Platform settings & matrix</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-center">
            <Link href="/admin/approvals" className="text-sm font-medium text-blue-700 hover:underline">
              Open full moderation desk &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* REALTIME USERS DIRECTORY SECTION */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Database Live Users Directory</h2>
              <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Realtime
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Live accounts synced with Hostinger Cloud Database. Strict role-based isolation enforces zero cross-portal access.
            </p>
          </div>
          <Link
            href="/admin/users"
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 shrink-0"
          >
            Manage all ({users.length}) users <ArrowRight size={12} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-2.5 px-3">Account</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Affiliation</th>
                <th className="py-2.5 px-3">Joined</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {users.slice(0, 5).map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900">{u.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-slate-900 text-white'
                          : u.role === 'student'
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : u.role === 'coach'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : u.role === 'school'
                          ? 'bg-purple-50 text-purple-700 border border-purple-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}
                    >
                      {u.role === 'student' ? 'Trainee Journalist' : u.role}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{u.institution || 'Individual'}</td>
                  <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">{u.joinedDate || 'Recent'}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-100">
                      {u.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
}
