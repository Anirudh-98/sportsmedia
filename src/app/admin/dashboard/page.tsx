'use client';

import React, { useState, useEffect } from 'react';
import {
  FaCog,
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
  FaHandsHelping,
  FaNewspaper,
  FaCheck,
  FaTimes,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBroadcastTower,
  FaHistory,
} from 'react-icons/fa';
import { DashboardShell, NavItem } from '@/components/dashboard/DashboardShell';
import {
  subscribePendingApprovals,
  updateApprovalStatus,
  subscribeArticles,
  PendingApproval,
  Article,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: FaCog },
  { label: 'Pending Approvals', href: '/admin/dashboard#approvals', icon: FaClock, badge: 'Live' },
  { label: 'Content Moderation', href: '/admin/dashboard#moderation', icon: FaNewspaper },
  { label: 'User Directory', href: '/admin/dashboard#users', icon: FaUsers },
  { label: 'Platform Settings', href: '/admin/dashboard#settings', icon: FaShieldAlt },
];

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState<PendingApproval[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filterType, setFilterType] = useState<string>('All');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubApprovals = subscribePendingApprovals(setApprovals);
    const unsubArticles = subscribeArticles(setArticles);

    return () => {
      unsubApprovals();
      unsubArticles();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    updateApprovalStatus(id, action);
    showToast(`Request ${action.toUpperCase()}! Cloud Firestore synced in real-time.`);
  };

  const pendingCount = approvals.filter((a) => a.status === 'pending').length;
  const filteredApprovals = approvals.filter(
    (a) => filterType === 'All' || a.type.toLowerCase().includes(filterType.toLowerCase())
  );

  return (
    <DashboardShell
      role="admin"
      roleTitle="Admin"
      roleBadge="Super Administrator"
      themeColor="#032D59"
      navItems={NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-2.5 rounded-lg shadow-2xl border border-blue-400/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <FaCheckCircle className="text-emerald-400" size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. ADMIN HEADER */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#0B5FA5] uppercase tracking-wider mb-1">
            <FaShieldAlt size={14} />
            SportsMedia.World Central Management Console
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#032D59] uppercase tracking-tight">
            Super Administrator Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
            Complete ecosystem control: verify user roles, moderate journalism releases &amp; enforce compliance in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Firestore Engine Active</span>
          </span>
        </div>
      </div>

      {/* 2. PLATFORM KPI CARDS (PRD: TOTAL USERS 12540, STUDENTS 1250, COACHES 2840, SCHOOLS 420, SPONSORS 185, ARTICLES 8420) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-[10.5px] font-black uppercase text-slate-500">Total Users</div>
          <div className="text-xl font-black text-slate-900 mt-1">12,540</div>
          <div className="text-[9.5px] font-bold text-emerald-600 mt-0.5">&uarr; 14% This Month</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-[10.5px] font-black uppercase text-[#0B5FA5]">Students</div>
          <div className="text-xl font-black text-slate-900 mt-1">1,250</div>
          <div className="text-[9.5px] font-bold text-slate-500 mt-0.5">Active Learners</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-[10.5px] font-black uppercase text-[#168C45]">Coaches</div>
          <div className="text-xl font-black text-slate-900 mt-1">2,840</div>
          <div className="text-[9.5px] font-bold text-slate-500 mt-0.5">Verified NIS/PET</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-[10.5px] font-black uppercase text-[#7E378B]">Schools</div>
          <div className="text-xl font-black text-slate-900 mt-1">420</div>
          <div className="text-[9.5px] font-bold text-slate-500 mt-0.5">Institutions</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-[10.5px] font-black uppercase text-[#F28C28]">Sponsors</div>
          <div className="text-xl font-black text-slate-900 mt-1">185</div>
          <div className="text-[9.5px] font-bold text-slate-500 mt-0.5">CSR Partners</div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
          <div className="text-[10.5px] font-black uppercase text-purple-600">Articles</div>
          <div className="text-xl font-black text-slate-900 mt-1">8,420</div>
          <div className="text-[9.5px] font-bold text-slate-500 mt-0.5">Stories Filed</div>
        </div>
      </div>

      {/* 3. PENDING APPROVALS ACTION QUEUE (PRD: The most important section!) */}
      <section id="approvals" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
                PENDING APPROVALS QUEUE
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-black">
                {pendingCount} Action Required
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Live moderation queue: student article publishing, coach credentials &amp; school applications.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {['All', 'Article', 'Coach', 'School', 'Sponsor'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                  filterType === cat
                    ? 'bg-[#032D59] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredApprovals.map((appr) => (
            <div
              key={appr.id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                appr.status === 'pending'
                  ? 'border-amber-200 bg-amber-50/20 hover:bg-amber-50/40'
                  : appr.status === 'approved'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-rose-200 bg-rose-50/20 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs ${
                    appr.type.includes('Article')
                      ? 'bg-blue-600'
                      : appr.type.includes('Coach')
                      ? 'bg-emerald-600'
                      : appr.type.includes('School')
                      ? 'bg-purple-600'
                      : 'bg-amber-600'
                  }`}
                >
                  {appr.type.includes('Article') ? (
                    <FaNewspaper size={16} />
                  ) : appr.type.includes('Coach') ? (
                    <FaChalkboardTeacher size={16} />
                  ) : appr.type.includes('School') ? (
                    <FaUniversity size={16} />
                  ) : (
                    <FaHandsHelping size={16} />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-500">
                      {appr.type}
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-xs text-slate-600 font-bold">
                      Submitted by: <strong className="text-slate-900">{appr.submittedBy}</strong>
                    </span>
                    <span className="text-slate-300">&bull;</span>
                    <span className="text-[11px] text-slate-400 font-semibold">{appr.timestamp}</span>
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-slate-900 mt-0.5 leading-snug">
                    {appr.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed max-w-2xl">
                    {appr.details}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {appr.status === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleAction(appr.id, 'rejected')}
                      className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black uppercase tracking-wider rounded-lg border border-rose-200 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <FaTimes size={12} />
                      <span>Reject</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(appr.id, 'approved')}
                      className="px-4 py-2 bg-[#168C45] hover:bg-[#116E36] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer flex items-center gap-1.5"
                    >
                      <FaCheck size={12} />
                      <span>Approve Live</span>
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded text-xs font-black uppercase tracking-wider ${
                      appr.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {appr.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CONTENT MODERATION & LIVE PLATFORM AUDIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Articles Ready for Moderation */}
        <section id="moderation" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                STUDENT JOURNALISM ARTICLES
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Real-time status across portal publications</p>
            </div>
            <span className="text-xs font-black text-[#0B5FA5]">{articles.length} Stories</span>
          </div>

          <div className="space-y-3">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded">
                      {art.category}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">&bull; By {art.authorName}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">{art.title}</h4>
                </div>

                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded uppercase shrink-0 self-end sm:self-center ${
                    art.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {art.status === 'published' ? 'Live on Portal' : 'Pending Review'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Live Platform Activity Logs */}
        <section id="users" className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                LIVE PLATFORM ACTIVITY
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Cloud Firestore audit trail</p>
            </div>
            <FaHistory size={16} className="text-slate-400" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-100">
              <span className="text-[10px] font-black text-[#0B5FA5] uppercase">New Student Story</span>
              <p className="font-black text-slate-900 mt-0.5">District Finals Match Review submitted</p>
              <span className="text-[10px] text-slate-400">Author: Anirudh &bull; 10 mins ago</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
              <span className="text-[10px] font-black text-[#168C45] uppercase">Coach Milestone Logged</span>
              <p className="font-black text-slate-900 mt-0.5">Rohit Kumar set 10.42s 100m Record</p>
              <span className="text-[10px] text-slate-400">Coach: Rajesh Sharma &bull; 1 hour ago</span>
            </div>

            <div className="p-3 rounded-lg bg-purple-50/50 border border-purple-100">
              <span className="text-[10px] font-black text-[#7E378B] uppercase">School Registered</span>
              <p className="font-black text-slate-900 mt-0.5">ABC International School sports roster active</p>
              <span className="text-[10px] text-slate-400">Hyderabad &bull; Today</span>
            </div>

            <div className="p-3 rounded-lg bg-orange-50/50 border border-orange-100">
              <span className="text-[10px] font-black text-[#F28C28] uppercase">CSR Sponsorship Pledged</span>
              <p className="font-black text-slate-900 mt-0.5">₹50,000 committed to Grassroots Athletics</p>
              <span className="text-[10px] text-slate-400">Sponsor: BlueZone Sports Fund &bull; Today</span>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
