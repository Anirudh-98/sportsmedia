'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PlayCircle,
  BookOpen,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Award,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeCourses, Course } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const unsub = subscribeCourses(setCourses);
    return () => unsub();
  }, []);

  const categories = [
    'All',
    'Print & Digital',
    'Visual Media',
    'Broadcast & Social',
    'Features',
    'Live Broadcasting',
    'Digital Reach',
    'Legal & Ethics',
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.nextLesson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardShell
      role="student"
      roleTitle="Trainee Journalist"
      roleBadge="Journalism School"
      themeColor="#0B5FA5"
      navItems={STUDENT_NAV_ITEMS}
    >
      {/* Page Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider mb-2">
          <PlayCircle size={12} />
          Academic Curriculum
        </div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
          Journalism Courses & Certifications
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Comprehensive curriculum crafted by veteran sports broadcasters, print editors, and field photojournalists.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses by title, topic, or lesson..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold px-2">
            <Filter size={13} />
            <span>Filter:</span>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-black text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B5FA5] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                  {course.category}
                </span>
                <span
                  className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded ${
                    course.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {course.status === 'completed' ? 'Passed' : `${course.progress}% Completed`}
                </span>
              </div>

              <h3 className="text-sm font-black text-slate-900 leading-snug mb-2">
                {course.title}
              </h3>

              <p className="text-[11px] text-slate-500 line-clamp-2 mb-4">
                Next lesson: <strong className="text-slate-700">{course.nextLesson}</strong>
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full transition-all ${
                    course.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-400">
                  {course.completedModules}/{course.modulesCount} Modules Done
                </span>
                <Link
                  href="/student/learning"
                  className="inline-flex items-center gap-1 font-black text-blue-600 hover:text-blue-800"
                >
                  {course.status === 'completed' ? 'Review' : 'Open Class'}
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
