'use client';

import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  X,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import {
  subscribeAssignments,
  submitAssignment,
  Assignment,
} from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function StudentAssignmentsPage() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeAssignments(setAssignments);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    submitAssignment({
      assignmentId: selectedAssignment.id,
      notes: submissionNotes,
      studentName: user?.name || 'Trainee Journalist',
    });

    setShowSubmitModal(false);
    setSubmissionNotes('');
    setSelectedAssignment(null);
    showToast('Assignment submitted successfully! Dispatched to instructor review queue.');
  };

  const filteredAssignments = assignments.filter((asg) => {
    if (statusFilter === 'all') return true;
    return asg.status === statusFilter;
  });

  const pendingCount = assignments.filter((a) => a.status === 'pending').length;

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Clock size={12} />
            Ground Fieldwork & Assessment
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Assignments & Fieldwork
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Submit match reports, photographic series, and broadcast audio clips for grading.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-center gap-2.5">
            <AlertCircle size={18} className="text-amber-600" />
            <div className="text-xs">
              <span className="font-black text-amber-900">{pendingCount} Assignments Pending</span>
              <p className="text-[10px] text-amber-700 font-medium">Keep up your turnaround time</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 mb-6 flex items-center gap-2 text-xs overflow-x-auto">
        {(['all', 'pending', 'submitted', 'graded'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStatusFilter(tab)}
            className={`px-4 py-2 rounded-xl font-black uppercase text-[11px] tracking-wider transition-all cursor-pointer ${
              statusFilter === tab
                ? 'bg-[#0B5FA5] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab} (
            {tab === 'all'
              ? assignments.length
              : assignments.filter((a) => a.status === tab).length}
            )
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => (
          <div
            key={asg.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 hover:border-blue-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[9.5px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    asg.status === 'pending'
                      ? 'bg-amber-100 text-amber-800'
                      : asg.status === 'submitted'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {asg.status}
                </span>
                <span className="text-[11px] font-bold text-slate-400">Course: {asg.courseTitle}</span>
              </div>

              <h3 className="text-base font-black text-slate-900">{asg.title}</h3>
              <p className="text-xs text-slate-500">
                Deadline: <strong className="text-slate-800">{asg.dueDate}</strong> &bull; Assigned to:{' '}
                {asg.studentName || user?.name}
              </p>

              {asg.feedback && (
                <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs text-emerald-900">
                  <span className="font-black">Teacher Feedback:</span> {asg.feedback}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {asg.score && (
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400">Score</span>
                  <div className="text-lg font-black text-emerald-600">{asg.score}</div>
                </div>
              )}

              {asg.status === 'pending' ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAssignment(asg);
                    setShowSubmitModal(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send size={13} />
                  Submit Work
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                  <CheckCircle2 size={14} />
                  Submitted
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SUBMISSION MODAL */}
      {showSubmitModal && selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0B5FA5] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Submit Fieldwork Assignment</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                <h4 className="text-xs font-black text-slate-900">{selectedAssignment.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Course: <strong>{selectedAssignment.courseTitle}</strong> &bull; Due: {selectedAssignment.dueDate}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Submission Notes / Google Drive, OneDrive, or Dropbox Link *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Paste your 500-word match report, photographic album link, or audio interview transcription here..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Send size={12} />
                  Turn In For Grading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
