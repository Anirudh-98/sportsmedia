'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Plus,
  X,
  Newspaper,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { submitArticle } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function SchoolAchievementsPage() {
  const { user } = useAuth();
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyTitle, setStoryTitle] = useState('');
  const [storyCategory, setStoryCategory] = useState('School Sports');
  const [storyExcerpt, setStoryExcerpt] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const achievements = [
    {
      id: 'ach-1',
      title: 'State Inter-School Athletic Overall Trophy (1st Place)',
      year: '2026',
      sport: 'Athletics & Track',
      venue: 'Gachibowli Stadium',
      medalsCount: '8 Golds, 4 Silvers',
      description: 'St. Andrews crowned overall athletics champions among 48 competing institutions.',
    },
    {
      id: 'ach-2',
      title: 'Hyderabad District Football Schools Cup',
      year: '2025 - 2026',
      sport: 'Football',
      venue: 'Gymkhana Grounds',
      medalsCount: 'Winners Trophy',
      description: 'Under-17 boys team defended their title undefeated through all 6 knockout matches.',
    },
    {
      id: 'ach-3',
      title: 'South Zone Interschool Badminton Championship',
      year: '2026',
      sport: 'Badminton',
      venue: 'Kotla Vijaya Indoor Arena',
      medalsCount: '3 Gold, 2 Bronze',
      description: 'Singles and Doubles team sweep by Ananya Reddy and partner.',
    },
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim()) return;

    submitArticle({
      title: storyTitle,
      excerpt: storyExcerpt || 'Official press release on institutional sports success.',
      category: storyCategory,
      authorName: user?.institution || 'St. Andrews Athletic Dept',
      authorRole: 'School Administration',
    });

    setShowStoryModal(false);
    setStoryTitle('');
    setStoryExcerpt('');
    showToast('School sports press release published and queued for moderation.');
  };

  return (
    <DashboardShell
      role="school"
      roleTitle="School"
      roleBadge="Institutional Portal"
      themeColor="#D97706"
      navItems={SCHOOL_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Trophy size={12} />
            Hall of Fame
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Institutional Honors & Trophies
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Celebrate state championships, inter-school cups, and publish official media press releases.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowStoryModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Newspaper size={14} />
          Publish Press Release
        </button>
      </div>

      {/* Trophy Cards */}
      <div className="space-y-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-300 transition-all"
          >
            <div className="flex items-center gap-4 max-w-2xl">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <Trophy size={28} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                    {ach.sport}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 font-bold">{ach.year}</span>
                </div>
                <h3 className="text-base font-black text-slate-900">{ach.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
                <p className="text-[11px] text-slate-400">
                  Venue: {ach.venue} &bull; Honors: <strong className="text-amber-700">{ach.medalsCount}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => showToast(`Archival document opened for ${ach.title}.`)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase transition-colors"
              >
                View Trophy Log
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PUBLISH STORY MODAL */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#D97706] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Publish School Press Release</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePublish} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. St. Andrews Clinches State Athletics Cup for 3rd Year"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sport Category
                </label>
                <select
                  value={storyCategory}
                  onChange={(e) => setStoryCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 bg-white"
                >
                  <option value="School Sports">School Sports</option>
                  <option value="Athletics">Athletics</option>
                  <option value="Football">Football</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Cricket">Cricket</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Official Statement *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Full press statement, team member names, and quotes from leadership..."
                  value={storyExcerpt}
                  onChange={(e) => setStoryExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Send size={12} />
                  Submit Press Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
