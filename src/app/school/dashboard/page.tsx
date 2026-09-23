'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  UserCheck,
  Shield,
  Trophy,
  Calendar,
  Newspaper,
  CheckCircle2,
  X,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribeSchoolInfo,
  submitArticle,
  SchoolInfo,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';
import { getTodayLabel } from '@/lib/utils';

const ACCENT = '#D97706';

export default function SchoolDashboardPage() {
  const { user } = useAuth();
  const todayLabel = getTodayLabel();
  const [school, setSchool] = useState<SchoolInfo | null>(null);

  // Modals
  const [showEventModal, setShowEventModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventSport, setEventSport] = useState('Athletics');

  const [storyTitle, setStoryTitle] = useState('');
  const [storyExcerpt, setStoryExcerpt] = useState('');

  useEffect(() => {
    const unsub = subscribeSchoolInfo(setSchool);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    showToast(`Inter-School Event "${eventTitle}" scheduled & registered.`);
    setShowEventModal(false);
    setEventTitle('');
    setEventDate('');
  };

  const handlePublishStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim()) return;

    submitArticle({
      title: storyTitle,
      excerpt: storyExcerpt || 'Official press release from school athletic department.',
      category: 'School Sports',
      authorName: user?.institution || school?.name || 'School Principal',
      authorRole: 'School Administration',
    });

    setShowStoryModal(false);
    setStoryTitle('');
    setStoryExcerpt('');
    showToast('School sports press release submitted for moderation.');
  };

  return (
    <DashboardShell
      role="school"
      roleTitle="School"
      roleBadge="Institutional Portal"
      themeColor={ACCENT}
      navItems={SCHOOL_NAV_ITEMS}
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
            {school?.name || 'St. Andrews High School'}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/school/profile"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <MapPin size={15} />
            School profile
          </Link>
          <button
            type="button"
            onClick={() => setShowEventModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Calendar size={15} />
            Schedule event
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-wrap items-center gap-y-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 mb-6 shadow-sm">
        {[
          { icon: Users, value: school?.studentsCount || 480, label: 'Student athletes', color: '#0B5FA5' },
          { icon: UserCheck, value: school?.coachesCount || 8, label: 'Sports coaches', color: '#059669' },
          { icon: Shield, value: school?.sportsCount || 6, label: 'Varsity disciplines', color: '#D97706' },
          { icon: Trophy, value: school?.achievementsCount || 19, label: 'Trophies won', color: '#7C3AED' },
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

      {/* SPORTS BREAKDOWN & ADMIN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Sports participation breakdown</h2>
              <p className="text-xs text-slate-500 mt-0.5">Student enrollment across competitive disciplines</p>
            </div>
            <Link
              href="/school/teams"
              className="text-xs font-medium hover:opacity-80 flex items-center gap-1 shrink-0"
              style={{ color: ACCENT }}
            >
              Manage teams <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-3.5">
            {school?.sportsBreakdown?.map((sp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700 font-medium">{sp.sport}</span>
                  <span className="text-slate-500">{sp.athletes} student athletes</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(sp.athletes / (school.studentsCount || 480)) * 100}%`,
                      backgroundColor: sp.color || ACCENT,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Administration</h2>
            </div>

            <div className="space-y-2">
              <Link
                href="/school/students"
                className="p-3 rounded-xl border border-slate-100 hover:bg-amber-50/40 hover:border-amber-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Users size={16} className="text-amber-700" />
                  <span className="text-sm font-medium text-slate-900">Student athlete roster</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>

              <Link
                href="/school/coaches"
                className="p-3 rounded-xl border border-slate-100 hover:bg-amber-50/40 hover:border-amber-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck size={16} className="text-amber-700" />
                  <span className="text-sm font-medium text-slate-900">Coaching staff & faculty</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>

              <Link
                href="/school/events"
                className="p-3 rounded-xl border border-slate-100 hover:bg-amber-50/40 hover:border-amber-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar size={16} className="text-amber-700" />
                  <span className="text-sm font-medium text-slate-900">Inter-school events</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>

              <Link
                href="/school/achievements"
                className="p-3 rounded-xl border border-slate-100 hover:bg-amber-50/40 hover:border-amber-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy size={16} className="text-amber-700" />
                  <span className="text-sm font-medium text-slate-900">Trophies & press releases</span>
                </div>
                <ArrowRight size={13} className="text-slate-400" />
              </Link>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowStoryModal(true)}
              className="block w-full text-center py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-sm font-medium transition-colors cursor-pointer"
            >
              Publish press release &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: SCHEDULE EVENT */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Schedule inter-school event</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Event title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14th Annual Inter-School Invitational Athletics Meet"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Sport discipline
                  </label>
                  <select
                    value={eventSport}
                    onChange={(e) => setEventSport(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 bg-white"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Calendar size={13} />
                  Host event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PUBLISH STORY */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Publish school press release</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handlePublishStory} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Press release headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. St. Andrews Wins Hyderabad Inter-School Football Cup"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Story content *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Official announcement, key player performances, and quotes from Principal..."
                  value={storyExcerpt}
                  onChange={(e) => setStoryExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Newspaper size={13} />
                  Submit press release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
