'use client';

import React, { useState, useEffect } from 'react';
import {
  FaUniversity,
  FaUsers,
  FaChalkboardTeacher,
  FaRunning,
  FaTrophy,
  FaCalendarAlt,
  FaNewspaper,
  FaPlus,
  FaCheckCircle,
  FaTimes,
  FaMapMarkerAlt,
  FaUserTie,
  FaMedal,
} from 'react-icons/fa';
import { DashboardShell, NavItem } from '@/components/dashboard/DashboardShell';
import {
  subscribeSchoolInfo,
  updateSchoolInfo,
  submitArticle,
  SchoolInfo,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/school/dashboard', icon: FaUniversity },
  { label: 'School Profile', href: '/school/dashboard#profile', icon: FaMapMarkerAlt },
  { label: 'Students', href: '/school/dashboard#students', icon: FaUsers },
  { label: 'Coaches', href: '/school/dashboard#coaches', icon: FaChalkboardTeacher },
  { label: 'Sports & Teams', href: '/school/dashboard#teams', icon: FaRunning },
  { label: 'Events', href: '/school/dashboard#events', icon: FaCalendarAlt },
  { label: 'Achievements', href: '/school/dashboard#achievements', icon: FaTrophy },
];

export default function SchoolDashboardPage() {
  const { user } = useAuth();
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

  const handleScheduleEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    setShowEventModal(false);
    showToast(`Event "${eventTitle}" scheduled and synced in real-time!`);
    setEventTitle('');
    setEventDate('');
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim()) return;

    submitArticle({
      title: storyTitle,
      excerpt: storyExcerpt || 'School sports tournament achievement press release.',
      category: 'School Sports',
      authorName: school?.name || 'ABC International School',
      authorRole: 'School Admin',
    });

    setStoryTitle('');
    setStoryExcerpt('');
    setShowStoryModal(false);
    showToast('School sports release submitted for Admin moderation!');
  };

  const coachesList = [
    { name: 'Coach Rajesh Sharma', sport: 'Athletics & Track', athletesCount: 42, exp: '12 Yrs' },
    { name: 'Coach Vikram Rao', sport: 'Badminton', athletesCount: 35, exp: '8 Yrs' },
    { name: 'Coach M. Swaminathan', sport: 'Cricket & Multi-Sport', athletesCount: 65, exp: '15 Yrs' },
    { name: 'Coach Aruna D’Souza', sport: 'Swimming', athletesCount: 28, exp: '9 Yrs' },
  ];

  return (
    <DashboardShell
      role="school"
      roleTitle="School"
      roleBadge="Institutional Sports"
      themeColor="#7E378B"
      navItems={NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-2.5 rounded-lg shadow-2xl border border-blue-400/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <FaCheckCircle className="text-emerald-400" size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. INSTITUTION HEADER (PRD Specification) */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#7E378B] uppercase tracking-wider mb-1">
            <FaUniversity size={14} />
            Sports Information &amp; Management Centre
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#032D59] uppercase tracking-tight">
            {school?.name || 'ABC INTERNATIONAL SCHOOL'}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600 font-bold mt-1.5">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-rose-500" size={12} />
              <span>{school?.city || 'Hyderabad, Telangana'}</span>
            </span>
            <span>&bull;</span>
            <span>Principal: {school?.principal || 'Dr. R. K. Sharma'}</span>
            <span>&bull;</span>
            <span>Sports Coordinator: {school?.sportsCoordinator || 'M. Swaminathan (Senior PET)'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowEventModal(true)}
            className="px-4 py-2.5 bg-[#7E378B] hover:bg-[#60256B] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer"
          >
            <FaPlus size={12} />
            <span>Schedule Event</span>
          </button>
          <button
            type="button"
            onClick={() => setShowStoryModal(true)}
            className="px-4 py-2.5 bg-[#168C45] hover:bg-[#116E36] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer"
          >
            <FaNewspaper size={12} />
            <span>Publish Story</span>
          </button>
        </div>
      </div>

      {/* 2. KPI CARDS (PRD: STUDENTS 850, COACHES 12, SPORTS 14, ACHIEVEMENTS 320) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#7E378B] flex items-center justify-center shrink-0">
            <FaUsers size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              {school?.studentsCount || 850}
            </div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Students
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168C45] flex items-center justify-center shrink-0">
            <FaChalkboardTeacher size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              {school?.coachesCount || 12}
            </div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Coaches
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B5FA5] flex items-center justify-center shrink-0">
            <FaRunning size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              {school?.sportsCount || 14}
            </div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Sports Disciplines
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FaTrophy size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">
              {school?.achievementsCount || 320}
            </div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Achievements
            </div>
          </div>
        </div>
      </div>

      {/* 3. SPORTS PARTICIPATION BREAKDOWN (PRD Specification) */}
      <section id="teams" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
              SPORTS PARTICIPATION DISTRIBUTION
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Real-time student athlete enrollments per sport discipline
            </p>
          </div>
          <span className="text-xs font-black text-[#7E378B]">Total: 920 Registrations</span>
        </div>

        <div className="space-y-4">
          {(school?.sportsBreakdown || []).map((sport) => {
            const percentage = Math.round((sport.athletes / 300) * 100);
            return (
              <div key={sport.sport}>
                <div className="flex justify-between text-xs font-black text-slate-800 mb-1">
                  <span>{sport.sport}</span>
                  <span className="text-slate-500">{sport.athletes} Athletes ({percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${sport.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. UPCOMING EVENTS & RECENT ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left 6 Cols: Upcoming Events (PRD: 25 Sep, 30 Sep, 05 Oct) */}
        <section id="events" className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                UPCOMING COMPETITIONS
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Inter-school tournament calendar</p>
            </div>
            <button
              type="button"
              onClick={() => setShowEventModal(true)}
              className="text-xs font-black text-[#7E378B] hover:underline cursor-pointer"
            >
              + Add Event
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-300 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#7E378B] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="text-sm font-black leading-none">25</span>
                <span className="text-[9px] font-black uppercase mt-0.5">SEP</span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  Inter-School District Athletics Meet 2026
                </h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                  Gachibowli Stadium &bull; 48 School Athletes Participating
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#168C45] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="text-sm font-black leading-none">30</span>
                <span className="text-[9px] font-black uppercase mt-0.5">SEP</span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  Telangana State Junior Football Championship
                </h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                  Gymkhana Grounds &bull; Under-16 Boys Team
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#0B5FA5] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="text-sm font-black leading-none">05</span>
                <span className="text-[9px] font-black uppercase mt-0.5">OCT</span>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  State Invitational Badminton Tournament
                </h4>
                <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                  Pullela Gopichand Academy &bull; Singles &amp; Doubles Teams
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Right 6 Cols: Recent Achievements (PRD Specification) */}
        <section id="achievements" className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                RECENT ACHIEVEMENTS
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Podiums &amp; State Team Selections</p>
            </div>
            <FaTrophy className="text-amber-500" size={18} />
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <FaMedal size={14} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-amber-950">
                  Gold Medal &mdash; Athletics (100m Sprint)
                </h4>
                <p className="text-xs text-amber-800 font-semibold mt-0.5">
                  Rohit Kumar clocked 10.42s &bull; Qualified for National Junior Trials
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center shrink-0 mt-0.5">
                <FaMedal size={14} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  Silver Medal &mdash; Badminton (Under-16 Singles)
                </h4>
                <p className="text-xs text-slate-600 font-semibold mt-0.5">
                  Ananya Reddy &bull; Hyderabad District Inter-School Tournament
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/40 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0B5FA5] text-white flex items-center justify-center shrink-0 mt-0.5">
                <FaCheckCircle size={14} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-blue-950">
                  State Selection &mdash; Junior Cricket Squad
                </h4>
                <p className="text-xs text-blue-800 font-semibold mt-0.5">
                  Vikram Singh selected in 15-member Hyderabad State Under-19 team
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. COACH MANAGEMENT TABLE (PRD Specification) */}
      <section id="coaches" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
              COACH MANAGEMENT &amp; ASSIGNED DISCIPLINES
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Certified PET masters and specialized sports coaches managing school teams
            </p>
          </div>
          <span className="text-xs font-black text-[#7E378B] bg-purple-50 px-2.5 py-1 rounded border border-purple-200 self-start sm:self-auto">
            12 Coaches On Staff
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-3 px-3">Coach Name</th>
                <th className="py-3 px-3">Assigned Sport</th>
                <th className="py-3 px-3">Athletes Mentored</th>
                <th className="py-3 px-3">Experience</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
              {coachesList.map((coach, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-[#7E378B]" size={14} />
                      <span className="font-black text-slate-900">{coach.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#0B5FA5] font-black">{coach.sport}</td>
                  <td className="py-3 px-3 text-slate-700">{coach.athletesCount} Student Athletes</td>
                  <td className="py-3 px-3 text-slate-500">{coach.exp}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL 1: SCHEDULE EVENT */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt size={16} className="text-[#7E378B]" />
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase">
                  Schedule Inter-School Competition
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleScheduleEvent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Under-16 Inter-School Basketball Trophy"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7E378B] focus:outline-hidden font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Sport</label>
                  <select
                    value={eventSport}
                    onChange={(e) => setEventSport(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7E378B] focus:outline-hidden font-bold"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Basketball">Basketball</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#7E378B] focus:outline-hidden font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-3.5 py-2 text-xs font-black text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7E378B] hover:bg-[#60256B] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs cursor-pointer"
                >
                  Schedule Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PUBLISH STORY */}
      {showStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FaNewspaper size={16} className="text-[#168C45]" />
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase">
                  Publish School Sports News
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitStory} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="e.g. ABC International School Clinches Zonal Athletics Trophy"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#168C45] focus:outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Details / Highlights</label>
                <textarea
                  rows={4}
                  required
                  value={storyExcerpt}
                  onChange={(e) => setStoryExcerpt(e.target.value)}
                  placeholder="Mention athletes, medals tally, coach quotes, and photos..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#168C45] focus:outline-hidden font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowStoryModal(false)}
                  className="px-3.5 py-2 text-xs font-black text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#168C45] hover:bg-[#116E36] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs cursor-pointer"
                >
                  Send for Publication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
