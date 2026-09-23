'use client';

import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  CheckCircle2,
  Eye,
  Check,
  X,
  Search,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ADMIN_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeArticles, Article } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function AdminModerationPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'pending_approval' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeArticles(setArticles);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleStatusChange = (id: string, newStatus: 'published' | 'pending_approval' | 'draft') => {
    showToast(`Story status changed to ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const filteredArticles = articles.filter((art) => {
    const matchesStatus = statusFilter === 'all' || art.status === statusFilter;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Newspaper size={12} />
            Editorial Gatekeeper
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Content Moderation Desk
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Supervise all grassroots journalism stories, match coverage reports, and media press releases across the platform.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search stories by headline, reporter, or sport discipline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 bg-slate-50/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {(['all', 'published', 'pending_approval', 'draft'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#032D59] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.replace('_', ' ')} (
              {st === 'all'
                ? articles.length
                : articles.filter((a) => a.status === st).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Articles Moderation List */}
      <div className="space-y-4">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-blue-300 transition-all"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded">
                  {art.category}
                </span>
                <span
                  className={`text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    art.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : art.status === 'pending_approval'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {art.status.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{art.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{art.excerpt}</p>

              <div className="text-[11px] text-slate-400 font-bold flex flex-wrap gap-3 pt-1">
                <span>Reporter: <strong className="text-slate-700">{art.authorName}</strong> ({art.authorRole})</span>
                <span>&bull;</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {art.views} Views</span>
                <span>&bull;</span>
                <span>{art.publishedAt}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {art.status === 'pending_approval' ? (
                <button
                  type="button"
                  onClick={() => handleStatusChange(art.id, 'published')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check size={14} />
                  Approve & Publish
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStatusChange(art.id, 'pending_approval')}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black uppercase transition-colors"
                >
                  Unpublish / Flag
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
