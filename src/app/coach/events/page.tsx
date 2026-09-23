'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Trophy,
  CheckCircle2,
  Users,
  Plus,
  Search,
  Filter,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { COACH_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { UPCOMING_EVENTS } from '@/data/events';
import { useAuth } from '@/context/AuthContext';

export default function CoachEventsPage() {
  const { user } = useAuth();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <DashboardShell
      role="coach"
      roleTitle="Coach"
      roleBadge="Athletic Director"
      themeColor="#059669"
      navItems={COACH_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Calendar size={12} />
            Tournament Calendar
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Events, Matches & Trials
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Register your squad for upcoming district trials, state championships, and inter-school fixtures.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast('New match entry form initiated.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Register Athlete for Meet
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {UPCOMING_EVENTS.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-emerald-300 transition-all"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {event.category}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800">
                  {event.status}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{event.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Venue: {event.venue}, {event.location}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <Calendar size={13} className="text-emerald-600" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {event.venue}
                </span>
                <span className="flex items-center gap-1 font-bold text-emerald-700">
                  <Users size={13} />
                  {event.participantsCount} Athletes Enrolled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => showToast(`Squad entry submitted for ${event.title}.`)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Register Athletes
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
