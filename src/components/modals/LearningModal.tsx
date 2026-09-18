'use client';

import React, { useState } from 'react';
import { X, GraduationCap, Clock, Star, BookOpen, CheckCircle } from 'lucide-react';
import { SPORTS_COURSES } from '@/data/portalExtra';

interface LearningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearningModal: React.FC<LearningModalProps> = ({ isOpen, onClose }) => {
  const [enrolledId, setEnrolledId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1b5e20] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">Blue Zone E-Learning Academy</h3>
              <p className="text-[10px] text-emerald-200">Certified Sports Coaching &amp; Athlete Education</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-emerald-200 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3">
          {SPORTS_COURSES.map((course) => (
            <div
              key={course.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/20 transition-all flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-black">
                    <Star size={12} fill="currentColor" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <h4 className="text-xs font-black text-[#0d2240] mt-1.5 leading-snug">
                  {course.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
                  Instructor: {course.instructor}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1.5">
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="text-slate-400" />
                    {course.duration}
                  </span>
                  <span>•</span>
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                {enrolledId === course.id ? (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle size={14} /> Enrolled! Access Sent
                  </span>
                ) : (
                  <button
                    onClick={() => setEnrolledId(course.id)}
                    className="px-4 py-1 bg-[#1b5e20] hover:bg-[#144718] text-white text-[11px] font-black uppercase rounded-md shadow-2xs transition-colors cursor-pointer"
                  >
                    ENROLL NOW (FREE)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
