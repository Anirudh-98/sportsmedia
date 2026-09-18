'use client';

import React, { useState, useEffect } from 'react';
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaNewspaper,
  FaGraduationCap,
  FaPlay,
  FaFeatherAlt,
  FaAward,
  FaPaperPlane,
  FaTimes,
  FaEye,
  FaCamera,
  FaVideo,
  FaMicrophone,
  FaBroadcastTower,
  FaShareAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import { DashboardShell, NavItem } from '@/components/dashboard/DashboardShell';
import {
  subscribeCourses,
  subscribeAssignments,
  subscribeArticles,
  submitArticle,
  submitAssignment,
  Course,
  Assignment,
  Article,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/student/dashboard', icon: FaGraduationCap },
  { label: 'My Learning', href: '/student/dashboard#learning', icon: FaBookOpen },
  { label: 'Courses', href: '/student/dashboard#courses', icon: FaPlay },
  { label: 'Assignments', href: '/student/dashboard#assignments', icon: FaClock, badge: '2 Due' },
  { label: 'My Articles', href: '/student/dashboard#articles', icon: FaNewspaper },
  { label: 'Media Portfolio', href: '/student/dashboard#portfolio', icon: FaCamera },
  { label: 'Certificates', href: '/student/dashboard#certificates', icon: FaAward },
];

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  // Modals
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Form states
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleCategory, setNewArticleCategory] = useState('Athletics');
  const [newArticleExcerpt, setNewArticleExcerpt] = useState('');
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubCourses = subscribeCourses(setCourses);
    const unsubAssignments = subscribeAssignments(setAssignments);
    const unsubArticles = subscribeArticles(setArticles);

    return () => {
      unsubCourses();
      unsubAssignments();
      unsubArticles();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle.trim()) return;

    submitArticle({
      title: newArticleTitle,
      excerpt: newArticleExcerpt || 'Special match report coverage filed by student reporter.',
      category: newArticleCategory,
      authorName: user?.name || 'Anirudh',
      authorRole: 'Student Journalist',
    });

    setNewArticleTitle('');
    setNewArticleExcerpt('');
    setShowArticleModal(false);
    showToast('Article submitted! Sent to Admin moderation queue in real-time.');
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    submitAssignment({
      assignmentId: selectedAssignment.id,
      notes: assignmentNotes,
      studentName: user?.name || 'Anirudh',
    });

    setSelectedAssignment(null);
    setShowAssignmentModal(false);
    setAssignmentNotes('');
    showToast('Assignment submitted for grading! Synced in real-time.');
  };

  // Realtime KPI Calculations
  const enrolledCount = courses.length;
  const completedCount = courses.filter((c) => c.status === 'completed').length;
  const pendingAssignments = assignments.filter((a) => a.status === 'pending').length;
  const publishedArticles = articles.filter((a) => a.status === 'published').length;

  return (
    <DashboardShell
      role="student"
      roleTitle="Student"
      roleBadge="Journalism School"
      themeColor="#0B5FA5"
      navItems={NAV_ITEMS}
    >
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-2.5 rounded-lg shadow-2xl border border-blue-400/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <FaCheckCircle className="text-emerald-400" size={16} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. WELCOME HEADER (PRD Specification) */}
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#0B5FA5] uppercase tracking-wider mb-1">
            <FaGraduationCap size={14} />
            Sports Media Journalism School &bull; Batch 2026
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#032D59] uppercase tracking-tight">
            Good Morning, {user?.name || 'Anirudh'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
            Continue your journalism journey. 4 courses active with real-time assignment grading.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="#learning"
            className="px-4 py-2.5 bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98"
          >
            Continue Learning
          </a>
          <button
            type="button"
            onClick={() => setShowArticleModal(true)}
            className="px-4 py-2.5 bg-[#168C45] hover:bg-[#116E36] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer"
          >
            <FaFeatherAlt size={12} />
            <span>Write Story</span>
          </button>
        </div>
      </div>

      {/* 2. KPI CARDS (PRD: Courses Enrolled, Courses Completed, Assignments Pending, Articles Published) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B5FA5] flex items-center justify-center shrink-0">
            <FaBookOpen size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{enrolledCount}</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Courses Enrolled
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168C45] flex items-center justify-center shrink-0">
            <FaCheckCircle size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{completedCount}</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Courses Completed
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <FaClock size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{pendingAssignments}</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Assignments Pending
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <FaNewspaper size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 leading-none">{publishedArticles}</div>
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-tight mt-1">
              Articles Published
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTINUE LEARNING LARGE CARD (PRD Specification) */}
      <section id="learning" className="mb-8">
        <div className="bg-gradient-to-r from-[#032D59] to-[#0A67B2] rounded-2xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 bg-white/10 px-2.5 py-1 rounded">
              Current Active Module
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide mt-3">
              SPORTS REPORTING &amp; WRITING
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-semibold mt-1">
              Certificate training in match previews, post-game report structures, and press-box ethics.
            </p>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-black mb-1">
                <span>Course Progress</span>
                <span className="text-amber-300">80% Complete (8/10 Modules)</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full w-[80%]" />
              </div>
            </div>

            {/* Next Lesson */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/15">
              <div>
                <span className="text-[11px] text-blue-200 uppercase font-bold">Up Next:</span>
                <p className="text-sm font-black text-white">Writing a Match Report (Under-16 District Finals)</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const asg = assignments[0];
                  setSelectedAssignment(asg);
                  setShowAssignmentModal(true);
                }}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all active:scale-98 cursor-pointer shrink-0"
              >
                Continue Course
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COURSES & ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Left 7 Cols: Journalism Courses */}
        <section id="courses" className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                JOURNALISM COURSES
              </h3>
              <p className="text-xs text-slate-500 font-semibold">Official Sports Media Journalism Curriculum</p>
            </div>
            <span className="text-xs font-black text-[#0B5FA5]">{courses.length} Modules</span>
          </div>

          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#EEF6FC] text-[#0B5FA5] flex items-center justify-center shrink-0 mt-0.5">
                    <FaBookOpen size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
                      {course.title}
                    </h4>
                    <span className="text-[10.5px] font-bold text-slate-500 uppercase mt-0.5 inline-block">
                      {course.category} &bull; Next: {course.nextLesson}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <div className="w-20 sm:w-24">
                    <div className="flex justify-between text-[10px] font-black text-slate-700 mb-0.5">
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          course.progress === 100 ? 'bg-emerald-500' : 'bg-[#0B5FA5]'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                      course.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-[#0B5FA5]'
                    }`}
                  >
                    {course.status === 'completed' ? 'Passed' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right 5 Cols: Assignments */}
        <section id="assignments" className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
                  ASSIGNMENTS
                </h3>
                <p className="text-xs text-slate-500 font-semibold">Practical Field Assignments</p>
              </div>
              <span className="text-xs font-black text-amber-600">{pendingAssignments} Pending</span>
            </div>

            <div className="space-y-3">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-black text-slate-900">{asg.title}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded uppercase shrink-0 ${
                        asg.status === 'graded'
                          ? 'bg-emerald-100 text-emerald-800'
                          : asg.status === 'submitted'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Course: {asg.courseTitle}</span>
                    <span className="font-bold text-slate-700">Due: {asg.dueDate}</span>
                  </div>

                  {asg.score && (
                    <div className="text-[11px] font-black text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-100">
                      Score: {asg.score} &bull; {asg.feedback}
                    </div>
                  )}

                  {asg.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAssignment(asg);
                        setShowAssignmentModal(true);
                      }}
                      className="mt-1 w-full py-1.5 bg-[#0B5FA5] hover:bg-[#032D59] text-white text-[11px] font-black uppercase tracking-wider rounded transition-all cursor-pointer text-center"
                    >
                      Submit Assignment
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 text-center">
            <span className="text-[11px] font-bold text-slate-500">
              All submissions are graded by accredited senior national sports journalists.
            </span>
          </div>
        </section>
      </div>

      {/* 5. MY JOURNALISM PORTFOLIO (PRD Specification) */}
      <section id="articles" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#032D59] uppercase tracking-wide">
              MY JOURNALISM PORTFOLIO
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Articles, athlete profiles, and tournament reviews authored by you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowArticleModal(true)}
            className="px-3.5 py-2 bg-[#168C45] hover:bg-[#116E36] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-98 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <FaFeatherAlt size={12} />
            <span>Create New Story</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((art) => (
            <div
              key={art.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-[#0B5FA5] bg-blue-50 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      art.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {art.status === 'published' ? 'Published' : 'Under Review'}
                  </span>
                </div>

                <h4 className="text-xs sm:text-[13px] font-black text-slate-900 leading-snug mb-1.5 line-clamp-2">
                  {art.title}
                </h4>
                <p className="text-[11.5px] text-slate-600 font-medium leading-relaxed line-clamp-3 mb-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1 text-[#0B5FA5]">
                  <FaEye size={12} />
                  <span>{art.views} Views</span>
                </span>
                <span>{art.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CERTIFICATES SECTION */}
      <section id="certificates" className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-black text-[#032D59] uppercase tracking-wide">
              ACCREDITED CERTIFICATES
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              SportsMedia Blue Zone Certificate of Competence
            </p>
          </div>
          <span className="text-xs font-black text-emerald-600">Verified &bull; ID: SM-JOURN-2026-084</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/60 to-emerald-50/60 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#032D59] text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
              <FaAward size={24} />
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">
                Official Credential
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900">
                Sports Journalism Fundamentals &amp; Match Reporting
              </h4>
              <span className="text-xs text-slate-600 font-bold">Issued by Sports Media Blue Zone Trust &bull; Grade: Distinction</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCertificateModal(true)}
            className="px-4 py-2 bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs cursor-pointer transition-all active:scale-98 shrink-0"
          >
            View Certificate
          </button>
        </div>
      </section>

      {/* MODAL 1: WRITE ARTICLE */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FaFeatherAlt size={16} className="text-[#168C45]" />
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase">
                  Write Sports Story for Publication
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowArticleModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  placeholder="e.g. Hyderabad District Badminton Finals Match Review"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Sport Discipline</label>
                <select
                  value={newArticleCategory}
                  onChange={(e) => setNewArticleCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-bold"
                >
                  <option value="Athletics">Athletics</option>
                  <option value="Badminton">Badminton</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Basketball">Basketball</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">Excerpt / Story Summary</label>
                <textarea
                  rows={4}
                  required
                  value={newArticleExcerpt}
                  onChange={(e) => setNewArticleExcerpt(e.target.value)}
                  placeholder="Write your match report findings, player quotes, or event highlights..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-3.5 py-2 text-xs font-black text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#168C45] hover:bg-[#116E36] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs cursor-pointer"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SUBMIT ASSIGNMENT */}
      {showAssignmentModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-[#0B5FA5]">
                  Course: {selectedAssignment.courseTitle}
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900">
                  {selectedAssignment.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAssignmentModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  Assignment Submission Notes / Link
                </label>
                <textarea
                  rows={4}
                  required
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  placeholder="Paste your 500-word match report draft, Google Drive photo essay folder, or interview notes..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-3.5 py-2 text-xs font-black text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs cursor-pointer"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW CERTIFICATE */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 text-center">
            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 cursor-pointer"
            >
              <FaTimes size={18} />
            </button>

            <FaAward className="text-amber-500 mx-auto mb-2" size={48} />
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Sports Media Blue Zone Certificate
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#032D59] uppercase mt-2">
              Sports Journalism Fundamentals &amp; Match Reporting
            </h2>
            <p className="text-xs text-slate-500 font-bold mt-1">This is to certify that</p>
            <p className="text-2xl font-black text-[#1565C0] my-2">{user?.name || 'Anirudh'}</p>
            <p className="text-xs text-slate-600 font-semibold max-w-md mx-auto leading-relaxed">
              Has successfully fulfilled all practical coursework, tournament match reporting criteria, and ethics requirements under the Sports Media Journalism School.
            </p>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Date: 12 Aug 2026</span>
              <span>Credential ID: SM-JOURN-2026-084</span>
              <span>Distinction (Grade A+)</span>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
