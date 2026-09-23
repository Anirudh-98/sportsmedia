'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users,
  Activity,
  Trophy,
  Film,
  UserPlus,
  Upload,
  CheckCircle2,
  X,
  Medal,
  ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { COACH_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribeCoachAthletes,
  addCoachAthlete,
  subscribeMediaUploads,
  addMediaUpload,
  CoachAthlete,
  MediaUpload,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';
import { getTodayLabel } from '@/lib/utils';

const ACCENT = '#059669';

export default function CoachDashboardPage() {
  const { user } = useAuth();
  const todayLabel = getTodayLabel();
  const [athletes, setAthletes] = useState<CoachAthlete[]>([]);
  const [mediaList, setMediaList] = useState<MediaUpload[]>([]);

  // Modals
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form states
  const [athleteName, setAthleteName] = useState('');
  const [athleteSport, setAthleteSport] = useState('Athletics (100m)');
  const [athleteSchool, setAthleteSchool] = useState('DPS Hyderabad');
  const [athletePerformance, setAthletePerformance] = useState(88);
  const [athleteAchievement, setAthleteAchievement] = useState('');

  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'certificate' | 'proof'>('photo');
  const [mediaAthlete, setMediaAthlete] = useState('');

  useEffect(() => {
    const unsubAthletes = subscribeCoachAthletes(setAthletes);
    const unsubMedia = subscribeMediaUploads(setMediaList);

    return () => {
      unsubAthletes();
      unsubMedia();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAddAthlete = (e: React.FormEvent) => {
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
    setShowAddAthleteModal(false);
    showToast('Athlete registered & submitted to admin verification queue.');
  };

  const handleUploadMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim()) return;

    addMediaUpload({
      title: mediaTitle,
      type: mediaType,
      url: mediaType === 'video' ? '/image/athelete2.png' : '/image/athelete1.png',
      athleteName: mediaAthlete || 'Varsity Squad',
      sport: 'Multi-Sport',
      uploadedBy: user?.name || 'Coach Rajesh Sharma',
    });

    setMediaTitle('');
    setMediaAthlete('');
    setShowUploadModal(false);
    showToast('Media proof uploaded successfully to talent registry.');
  };

  const avgPerformance = athletes.length
    ? Math.round(athletes.reduce((acc, a) => acc + a.performance, 0) / athletes.length)
    : 85;

  const totalMedals = athletes.reduce((acc, a) => acc + a.medals, 0);

  return (
    <DashboardShell
      role="coach"
      roleTitle="Coach"
      roleBadge="Athletic Director"
      themeColor={ACCENT}
      navItems={COACH_NAV_ITEMS}
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
            Welcome back, {user?.name || 'Coach'}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowAddAthleteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <UserPlus size={15} />
            Enroll athlete
          </button>
          <button
            type="button"
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Upload size={15} />
            Upload match media
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="flex flex-wrap items-center gap-y-3 bg-white border border-slate-100 rounded-2xl px-5 py-4 mb-6 shadow-sm">
        {[
          { icon: Users, value: athletes.length, label: 'Active athletes', color: '#059669' },
          { icon: Trophy, value: totalMedals, label: 'Medals won', color: '#D97706' },
          { icon: Activity, value: `${avgPerformance}%`, label: 'Squad readiness', color: '#0B5FA5' },
          { icon: Film, value: mediaList.length, label: 'Media uploads', color: '#7C3AED' },
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

      {/* ROSTER & TRIALS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">My athletes roster</h2>
              <p className="text-xs text-slate-500 mt-0.5">Grassroots talents enrolled under your training program</p>
            </div>
            <Link
              href="/coach/athletes"
              className="text-xs font-medium text-emerald-600 hover:text-emerald-800 flex items-center gap-1 shrink-0"
              style={{ color: ACCENT }}
            >
              Full roster ({athletes.length}) <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {athletes.slice(0, 4).map((athlete) => (
              <div
                key={athlete.id}
                className="p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={athlete.photo || '/image/athelete.png'}
                      alt={athlete.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 truncate">{athlete.name}</h3>
                    <p className="text-xs text-slate-500">
                      {athlete.sport} &bull; {athlete.school}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm font-semibold" style={{ color: ACCENT }}>{athlete.performance}%</div>
                    <div className="text-xs text-slate-400">{athlete.medals} medals</div>
                  </div>
                  <Link
                    href="/coach/performance"
                    className="px-2.5 py-1 rounded-md text-white text-xs font-medium transition-colors"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Metrics
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Upcoming trials</h2>
                <p className="text-xs text-slate-500 mt-0.5">Championship selection meets</p>
              </div>
              <Link
                href="/coach/events"
                className="text-xs font-medium flex items-center gap-1 shrink-0"
                style={{ color: ACCENT }}
              >
                Calendar <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Athletics
                </span>
                <h4 className="text-sm font-medium text-slate-900">District Sprint Trials (100m / 200m)</h4>
                <p className="text-xs text-slate-500">25 Sep 2026 &bull; Gachibowli Stadium</p>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  Badminton
                </span>
                <h4 className="text-sm font-medium text-slate-900">State Under-19 Ranking Tournament</h4>
                <p className="text-xs text-slate-500">28 Sep 2026 &bull; Kotla Vijaya Stadium</p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-center">
            <Link href="/coach/events" className="text-sm font-medium hover:underline" style={{ color: ACCENT }}>
              Open complete match calendar &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS & MEDIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Recent achievements</h2>
              <p className="text-xs text-slate-500 mt-0.5">Honors logged by your athletes</p>
            </div>
            <Link
              href="/coach/achievements"
              className="text-xs font-medium flex items-center gap-1 shrink-0"
              style={{ color: ACCENT }}
            >
              Medal cabinet <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {athletes.slice(0, 3).map((a) => (
              <div key={a.id} className="p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Medal size={20} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 truncate">{a.name}</h4>
                  <p className="text-xs text-slate-600 truncate">{a.recentAchievement}</p>
                  <span className="text-xs text-slate-400">{a.sport}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Match footage & proofs</h2>
              <p className="text-xs text-slate-500 mt-0.5">Verified action photos and timing videos</p>
            </div>
            <Link
              href="/coach/media"
              className="text-xs font-medium flex items-center gap-1 shrink-0"
              style={{ color: ACCENT }}
            >
              All media <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {mediaList.slice(0, 3).map((m) => (
              <div key={m.id} className="p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Film size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 line-clamp-1">{m.title}</h4>
                    <p className="text-xs text-slate-500">Athlete: {m.athleteName} &bull; {m.uploadedAt}</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                  {m.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL: ADD ATHLETE */}
      {showAddAthleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Enroll new athlete</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAthleteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAthlete} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Athlete full name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Singh"
                  value={athleteName}
                  onChange={(e) => setAthleteName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Sport discipline
                  </label>
                  <select
                    value={athleteSport}
                    onChange={(e) => setAthleteSport(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white"
                  >
                    <option value="Athletics (100m)">Athletics (100m)</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Football">Football</option>
                    <option value="Swimming">Swimming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    School / academy
                  </label>
                  <input
                    type="text"
                    value={athleteSchool}
                    onChange={(e) => setAthleteSchool(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Baseline readiness score ({athletePerformance}%)
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
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Recent medal or best mark
                </label>
                <input
                  type="text"
                  placeholder="e.g. District U-16 Gold (10.65s)"
                  value={athleteAchievement}
                  onChange={(e) => setAthleteAchievement(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddAthleteModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <UserPlus size={13} />
                  Save & register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD MEDIA */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Upload media proof</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadMedia} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Media title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100m Sprint Finish Laser Timing Proof"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Proof format
                  </label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white"
                  >
                    <option value="photo">Photo proof</option>
                    <option value="video">Video footage</option>
                    <option value="certificate">Medal certificate</option>
                    <option value="proof">Medical / trial proof</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Athlete name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohit Kumar"
                    value={mediaAthlete}
                    onChange={(e) => setMediaAthlete(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Upload size={13} />
                  Upload proof
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
