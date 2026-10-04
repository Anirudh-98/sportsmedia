'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Newspaper,
  Play,
  Award,
  Send,
  X,
  Camera,
  ArrowRight,
  Download,
  ShieldCheck,
  Sparkles,
  Printer,
} from 'lucide-react';
import { PressIdCardBothSides, PRESET_STUDENTS, StudentIdCardData, printPressIdCard } from '@/components/idcard/PressIdCard';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
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
import { getTodayLabel } from '@/lib/utils';

const ACCENT = '#0B5FA5';

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const todayLabel = getTodayLabel();
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
      excerpt: newArticleExcerpt || 'Special match report coverage filed by trainee journalist.',
      category: newArticleCategory,
      authorName: user?.name || 'Trainee Journalist',
      authorRole: 'Trainee Journalist',
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
      studentName: user?.name || 'Trainee Journalist',
    });

    setShowAssignmentModal(false);
    setAssignmentNotes('');
    setSelectedAssignment(null);
    showToast('Assignment submitted successfully! Sent to instructor for grading.');
  };

  const idCardStudent: StudentIdCardData = {
    ...PRESET_STUDENTS[0],
    name: user?.name || PRESET_STUDENTS[0].name,
    avatar: user?.avatar || PRESET_STUDENTS[0].avatar,
    idNo: user?.id
      ? `SMBZ-TJ-2025-${user.id.replace(/\D/g, '').slice(-3).padStart(3, '0')}`
      : PRESET_STUDENTS[0].idNo,
    institution: user?.institution || PRESET_STUDENTS[0].institution,
  };

  const completedCoursesCount = courses.filter((c) => c.status === 'completed').length;
  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'pending').length;

  return (
    <DashboardShell
      role="student"
      roleTitle="Trainee Journalist"
      roleBadge="Journalism School"
      themeColor={ACCENT}
      navItems={STUDENT_NAV_ITEMS}
      scrollable
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
        <div>
          <p className="text-sm text-slate-400 mb-1">{todayLabel}</p>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {user?.name || 'Trainee Journalist'}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/student/id-card"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-sky-300 bg-sky-50 text-sky-800 text-sm font-semibold hover:bg-sky-100 transition-colors cursor-pointer"
          >
            <ShieldCheck size={16} className="text-sky-700" />
            Press ID Card
          </Link>
          <Link
            href="/student/learning"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <BookOpen size={15} />
            Continue learning
          </Link>
          <button
            type="button"
            onClick={() => setShowArticleModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all cursor-pointer"
            style={{ backgroundColor: ACCENT }}
          >
            <Send size={15} />
            Write story
          </button>
        </div>
      </div>

      {/* HIGHLIGHTED PRESS ID CARD */}
      <section
        id="press-id-card"
        className="rounded-3xl p-[2px] mb-3 bg-gradient-to-r from-sky-400 via-blue-500 to-amber-400 shadow-lg shadow-blue-900/20"
      >
        <div className="rounded-[22px] bg-gradient-to-br from-[#061833] via-[#0A2244] to-[#12327F] p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 text-sky-300 flex items-center justify-center shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Your Official Press ID Card
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-400/15 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Digital Pass
                  </span>
                </div>
                <p className="text-xs text-sky-100/70">
                  Trainee Sports Media Journalist &middot; {idCardStudent.idNo} &middot; Valid till {idCardStudent.validTill}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => printPressIdCard('front')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#0A2244] hover:bg-sky-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Front</span>
              </button>
              <button
                type="button"
                onClick={() => printPressIdCard('back')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-[#0A2244] hover:bg-sky-50 text-xs font-bold transition-colors cursor-pointer"
              >
                <Printer size={14} />
                <span>Print Back</span>
              </button>
              <Link
                href="/student/id-card"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              >
                <span>Full ID Studio</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-[minmax(0,940px)_minmax(0,1fr)] gap-5 items-center">
            {/* Front & back of the card */}
            <div className="flex justify-center">
              <PressIdCardBothSides student={idCardStudent} cardWidth={460} />
            </div>

            {/* Card usage notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-1 gap-3 text-sm text-sky-50/85">
              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 space-y-2.5">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-300" /> What this ID is for
                </h4>
                <p className="leading-relaxed">
                  Identifies you as a trainee on the <strong className="text-white">Sports Journalism Certificate Training Programme</strong> during authorised training and field assignments.
                </p>
                <ul className="space-y-1.5 list-disc pl-4">
                  <li>Interviews, photography and video coverage of sports events.</li>
                  <li>Always take prior permission from the school, organiser and individuals.</li>
                  <li>It is not government accreditation or official press status.</li>
                </ul>
              </div>

              <div className="rounded-2xl p-4 bg-white/5 border border-white/10 grid grid-cols-2 gap-3">
                {[
                  { label: 'Name', value: idCardStudent.name },
                  { label: 'ID No.', value: idCardStudent.idNo },
                  { label: 'Course', value: idCardStudent.course },
                  { label: 'Blood Group', value: idCardStudent.bloodGroup },
                ].map((item) => (
                  <div key={item.label} className="min-w-0">
                    <p className="text-[11px] text-sky-200/60">{item.label}</p>
                    <p className="font-semibold text-white truncate">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="flex flex-wrap items-center gap-y-3 bg-white border border-slate-100 rounded-2xl px-4 py-2 mb-3 shadow-sm">
        {[
          { icon: BookOpen, value: courses.length, label: 'Courses enrolled', color: '#0B5FA5' },
          { icon: CheckCircle2, value: completedCoursesCount, label: 'Completed', color: '#059669' },
          { icon: Clock, value: pendingAssignmentsCount, label: 'Pending tasks', color: '#D97706' },
          { icon: Newspaper, value: articles.length, label: 'My articles', color: '#7C3AED' },
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

      {/* ACTIVE COURSE */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Current active module
            </span>
            <h2 className="text-base font-semibold text-slate-900 mt-1">
              Sports Reporting & Match Writing
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Certificate training in match previews, post-game report structures, and press-box ethics.
            </p>
          </div>
          <Link
            href="/student/learning"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-colors shadow-sm shrink-0"
            style={{ backgroundColor: ACCENT }}
          >
            <Play size={14} />
            Resume module
          </Link>
        </div>

        <div className="pt-2">
          <div className="flex justify-between text-sm text-slate-600 mb-1.5">
            <span>Course progress: 8 of 10 lessons complete</span>
            <span className="text-blue-700 font-semibold">80%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '80%' }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Up next: <strong className="text-slate-800 font-medium">Writing a Match Report (Under-16 District Finals)</strong>
            </span>
            <Link href="/student/learning" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 shrink-0 ml-2">
              View syllabus <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>

      {/* Both card rows sit side by side on wide screens so the dashboard fits one screen */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start mb-3">
      {/* COURSES & ASSIGNMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Enrolled courses</h2>
              <p className="text-xs text-slate-500 mt-0.5">Official Sports Media curriculum modules</p>
            </div>
            <Link
              href="/student/courses"
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              All courses ({courses.length}) <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {courses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="px-3 py-2 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <BookOpen size={17} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-slate-900 truncate">{course.title}</h3>
                    <p className="text-xs text-slate-500">
                      {course.category} &bull; Next: {course.nextLesson}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-semibold text-slate-800">{course.progress}%</div>
                    <div className="text-xs text-slate-400">
                      {course.completedModules}/{course.modulesCount} done
                    </div>
                  </div>
                  {course.status === 'completed' ? (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                      Passed
                    </span>
                  ) : (
                    <Link
                      href="/student/courses"
                      className="px-2.5 py-1 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Assignments due</h2>
                <p className="text-xs text-slate-500 mt-0.5">Practical reporting fieldwork</p>
              </div>
              <Link
                href="/student/assignments"
                className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-2">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="p-2.5 rounded-xl border border-slate-100 space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-slate-900 leading-tight">{asg.title}</h4>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-md shrink-0 ${
                        asg.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : asg.status === 'submitted'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {asg.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>{asg.courseTitle}</span>
                    <span className="font-medium text-slate-600">Due: {asg.dueDate}</span>
                  </div>

                  {asg.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAssignment(asg);
                        setShowAssignmentModal(true);
                      }}
                      className="w-full mt-1 py-1.5 rounded-lg text-white text-xs font-medium transition-colors cursor-pointer"
                      style={{ backgroundColor: ACCENT }}
                    >
                      Submit assignment
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-slate-100 text-center">
            <Link
              href="/student/assignments"
              className="text-sm font-medium text-[#0B5FA5] hover:underline"
            >
              Open full assignment portal &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ARTICLES & MEDIA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">My articles & reports</h2>
              <p className="text-xs text-slate-500 mt-0.5">Live published stories and pending editorial drafts</p>
            </div>
            <Link
              href="/student/articles"
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              Manage <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-2">
            {articles.slice(0, 3).map((art) => (
              <div
                key={art.id}
                className="p-2.5 rounded-xl border border-slate-100 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded ${
                      art.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {art.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-slate-900">{art.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>
                <div className="text-xs text-slate-400 flex justify-between pt-1">
                  <span>Filed by: {art.authorName}</span>
                  <span>{art.views} views &bull; {art.publishedAt}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowArticleModal(true)}
            className="w-full mt-2 py-1.5 rounded-xl border border-dashed border-blue-200 text-blue-700 hover:bg-blue-50 text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={14} />
            Write another match story
          </button>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Official accreditation</h3>
                <p className="text-xs text-slate-500">Sports Media journalism certification</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mb-2 leading-snug">
              Upon completing all 7 modules and practical ground assignments, students receive an authorized, tamper-proof digital certificate accredited by SportsMedia.World.
            </p>
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowCertificateModal(true)}
                className="flex-1 py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Preview certificate
              </button>
              <Link
                href="/student/certificates"
                className="py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
              >
                All accreditations
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Camera size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Journalist portfolio</h3>
                  <p className="text-xs text-slate-500">Match photos, audio & video footage</p>
                </div>
              </div>
              <Link
                href="/student/portfolio"
                className="text-sm font-medium text-purple-700 hover:underline shrink-0"
              >
                Open &rarr;
              </Link>
            </div>
            <p className="text-sm text-slate-500 mb-2 leading-snug">
              Maintain your verified portfolio of match reports, press-box photos, and interview podcasts for scouting and media network opportunities.
            </p>
            <Link
              href="/student/portfolio"
              className="block w-full text-center py-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-medium transition-colors"
            >
              Upload new media asset
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* MODAL: WRITE ARTICLE */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Newspaper size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Write match report</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowArticleModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="p-3.5 space-y-2.5">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Article title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Under-16 Football District Finals Post-Match Recap"
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Sport discipline
                </label>
                <select
                  value={newArticleCategory}
                  onChange={(e) => setNewArticleCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white"
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
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Report excerpt / body
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter the lead paragraph, quotes from coaches, and key match highlights..."
                  value={newArticleExcerpt}
                  onChange={(e) => setNewArticleExcerpt(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Send size={13} />
                  Submit for moderation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SUBMIT ASSIGNMENT */}
      {showAssignmentModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock size={18} className="text-slate-700" />
                <h3 className="text-base font-semibold text-slate-900">Submit assignment</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAssignmentModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitAssignment} className="p-3.5 space-y-2.5">
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-slate-900">{selectedAssignment.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Course: <strong className="font-medium">{selectedAssignment.courseTitle}</strong> &bull; Due: {selectedAssignment.dueDate}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Submission notes / Google Drive or document URL *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Paste your report text or cloud document link here for instructor evaluation..."
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Send size={13} />
                  Turn in assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CERTIFICATE PREVIEW */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-5 text-center">
            <button
              type="button"
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <div className="border border-amber-200 p-4 rounded-xl bg-amber-50/30">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <Award size={28} />
              </div>
              <span className="text-xs font-medium text-slate-500">
                SportsMedia.World Academy of Sports Journalism
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mt-1 mb-2">
                Certificate of Sports Media Excellence
              </h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
                This is to certify that <strong className="text-slate-900 font-medium">{user?.name || 'Trainee Journalist'}</strong> has successfully satisfied all academic requirements, field match report assignments, and editorial standards.
              </p>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded text-xs font-mono text-slate-600 mb-4">
                Credential ID: SMW-JRN-2026-8891 &bull; Verified authentic
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Certificate PDF downloaded successfully.');
                    setShowCertificateModal(false);
                  }}
                  className="px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Download size={15} />
                  Download verified PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
