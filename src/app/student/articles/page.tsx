'use client';

import React, { useState, useEffect } from 'react';
import {
  Newspaper,
  CheckCircle2,
  Send,
  Plus,
  X,
  Eye,
  Clock,
  Check,
  Search,
  Filter,
  Sparkles,
  Share2,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeArticles, submitArticle, Article } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function StudentArticlesPage() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'pending_approval' | 'draft'>('all');
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Athletics');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeArticles(setArticles);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    submitArticle({
      title: newTitle,
      excerpt: newExcerpt || 'Special investigative sports report filed by trainee journalist.',
      category: newCategory,
      authorName: user?.name || 'Trainee Journalist',
      authorRole: 'Trainee Journalist',
    });

    setNewTitle('');
    setNewExcerpt('');
    setShowArticleModal(false);
    showToast('Story successfully submitted! Dispatched to Admin editorial queue.');
  };

  const filteredArticles = articles.filter((art) => {
    if (statusFilter === 'all') return true;
    return art.status === statusFilter;
  });

  return (
    <DashboardShell
      role="student"
      roleTitle="Trainee Journalist"
      roleBadge="Journalism School"
      themeColor="#0B5FA5"
      navItems={STUDENT_NAV_ITEMS}
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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Newspaper size={12} />
            Editorial Room
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            My Articles & Media Reports
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Draft, publish, and track views on your published grassroots sports journalism stories.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowArticleModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Write New Story
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 mb-6 flex items-center gap-2 text-xs overflow-x-auto">
        {(['all', 'published', 'pending_approval', 'draft'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 rounded-xl font-black uppercase text-[11px] tracking-wider transition-all cursor-pointer ${
              statusFilter === tab
                ? 'bg-[#0B5FA5] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.replace('_', ' ')} (
            {tab === 'all'
              ? articles.length
              : articles.filter((a) => a.status === tab).length}
            )
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-blue-300 transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700">
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

              <h3 className="text-base font-black text-slate-900 leading-snug mb-2">
                {art.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-bold text-slate-600">
                <Eye size={13} />
                <span>{art.views} Views</span>
              </div>
              <span className="text-[11px] font-medium">{art.publishedAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* WRITE ARTICLE MODAL */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#032D59] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Write New Match Story</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowArticleModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Article Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Under-16 Athletics State Trial Winners Announced in Hyderabad"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sport Discipline
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="Athletics">Athletics</option>
                  <option value="Football">Football</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Special Feature">Special Feature</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Story Excerpt & Match Details *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Write your match lead paragraph, quotes from coaches and winners, and game stats..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Send size={12} />
                  Submit to Moderation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
