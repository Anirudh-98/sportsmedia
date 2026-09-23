'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Download,
  Sparkles,
  Flame,
  ArrowRight,
  CheckCircle,
  Bookmark,
  Share2,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeCourses, Course } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function StudentLearningPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0, 1, 2, 3]);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeCourses(setCourses);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const currentModuleLessons = [
    {
      title: 'Module 1: The Modern Sports Reporter Mindset',
      duration: '18 mins',
      summary: 'Understanding journalistic objectivity, sports beat assignments, and sideline interview etiquette.',
    },
    {
      title: 'Module 2: Anatomy of a Breaking Match Report',
      duration: '24 mins',
      summary: 'Inverted pyramid structure for rapid post-whistle recaps, headline formulations, and scorebox tables.',
    },
    {
      title: 'Module 3: Pre-Match Preview & Scouting Angles',
      duration: '22 mins',
      summary: 'Tactical lineup predictions, head-to-head records, and player fatigue monitoring analysis.',
    },
    {
      title: 'Module 4: Quoting Athletes & Press Conference Ethics',
      duration: '30 mins',
      summary: 'Direct quotes vs paraphrasing, recording audio permissions, and handling contentious post-game emotions.',
    },
    {
      title: 'Module 5: Practical Assignment: Writing a Match Report',
      duration: '45 mins',
      summary: 'Live trial writing exercise on the Under-16 District Football finals. File for teacher evaluation.',
    },
  ];

  const handleToggleComplete = (idx: number) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(completedLessons.filter((i) => i !== idx));
      showToast('Marked as pending review.');
    } else {
      setCompletedLessons([...completedLessons, idx]);
      showToast('Module lesson completed! Progress updated.');
    }
  };

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

      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider mb-2">
            <BookOpen size={12} />
            My Active Learning Hub
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Learning Roadmap & Syllabus
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Track video lectures, interactive modules, and practical ground reporting coursework.
          </p>
        </div>

        {/* Study Streak Card */}
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <Flame size={20} className="fill-amber-500 text-amber-500" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">12 Days</div>
              <div className="text-[10px] font-extrabold uppercase text-slate-400">Study Streak</div>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <div className="text-sm font-black text-blue-700">6.5 Hours</div>
            <div className="text-[10px] font-extrabold uppercase text-slate-400">This Week</div>
          </div>
        </div>
      </div>

      {/* Active Lecture Player / Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden mb-6">
        <div className="aspect-video sm:aspect-21/9 bg-slate-900 text-white relative flex flex-col justify-between p-6 sm:p-8">
          <div className="flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-xs text-xs font-black uppercase tracking-wider">
              Lesson {activeLessonIndex + 1} of {currentModuleLessons.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast('Lesson bookmarked to quick access.')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Bookmark Lesson"
              >
                <Bookmark size={15} />
              </button>
              <button
                type="button"
                onClick={() => showToast('Lesson link copied to clipboard.')}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Share"
              >
                <Share2 size={15} />
              </button>
            </div>
          </div>

          <div className="max-w-xl z-10">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2">
              {currentModuleLessons[activeLessonIndex].title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
              {currentModuleLessons[activeLessonIndex].summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 z-10 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Clock size={14} className="text-amber-400" />
              <span>Duration: {currentModuleLessons[activeLessonIndex].duration}</span>
            </div>

            <button
              type="button"
              onClick={() => handleToggleComplete(activeLessonIndex)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                completedLessons.includes(activeLessonIndex)
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-white text-slate-900 hover:bg-blue-50'
              }`}
            >
              <CheckCircle size={14} />
              {completedLessons.includes(activeLessonIndex) ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        {/* Syllabus Lessons List */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-black uppercase text-slate-900">
              Syllabus Modules: Sports Reporting & Writing
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {completedLessons.length}/{currentModuleLessons.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {currentModuleLessons.map((lesson, idx) => {
              const isSelected = activeLessonIndex === idx;
              const isDone = completedLessons.includes(idx);

              return (
                <div
                  key={idx}
                  onClick={() => setActiveLessonIndex(idx)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                      : 'border-slate-100 hover:border-slate-200 bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleComplete(idx);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isDone
                          ? 'bg-emerald-500 text-white'
                          : 'border-2 border-slate-300 text-transparent hover:border-blue-500'
                      }`}
                    >
                      <CheckCircle2 size={15} className="text-white" />
                    </button>
                    <div>
                      <h4 className={`text-xs font-black ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                        {lesson.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{lesson.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 font-bold">{lesson.duration}</span>
                    <Play size={14} className={isSelected ? 'text-blue-600' : 'text-slate-400'} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enrolled Courses Progress Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase">My Enrolled Courses</h2>
            <p className="text-xs text-slate-500">Overall academic standing in journalism school</p>
          </div>
          <Link
            href="/student/courses"
            className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Explore Catalogue &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {course.category}
                  </span>
                  <span className="text-xs font-black text-slate-800">{course.progress}%</span>
                </div>
                <h4 className="text-xs font-black text-slate-900 mb-1">{course.title}</h4>
                <p className="text-[11px] text-slate-500 mb-3">Up next: {course.nextLesson}</p>
              </div>

              <div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>{course.completedModules} / {course.modulesCount} modules passed</span>
                  <Link
                    href="/student/courses"
                    className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                  >
                    Details <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
