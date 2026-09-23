'use client';

import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  X,
  CheckCircle2,
  Trophy,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth } from '@/context/AuthContext';

export default function SchoolEventsPage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventSport, setEventSport] = useState('Athletics');
  const [eventDate, setEventDate] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const schoolEvents = [
    {
      id: 'sev-1',
      title: 'St. Andrews 14th Annual Invitational Athletics Meet',
      sport: 'Athletics',
      date: '10 Oct 2026',
      venue: 'St. Andrews 400m Track Campus',
      participatingSchools: 24,
      status: 'Registration Open',
    },
    {
      id: 'sev-2',
      title: 'Hyderabad Inter-School Football Derby (U-17)',
      sport: 'Football',
      date: '18 Oct 2026',
      venue: 'Main Grass Pitch Stadium',
      participatingSchools: 16,
      status: 'Fixture Finalized',
    },
    {
      id: 'sev-3',
      title: 'District Under-15 Badminton Open',
      sport: 'Badminton',
      date: '28 Oct 2026',
      venue: 'Indoor Badminton Arena',
      participatingSchools: 18,
      status: 'Upcoming',
    },
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    showToast(`Inter-school event "${eventTitle}" scheduled successfully.`);
    setShowModal(false);
    setEventTitle('');
  };

  return (
    <DashboardShell
      role="school"
      roleTitle="School"
      roleBadge="Institutional Portal"
      themeColor="#D97706"
      navItems={SCHOOL_NAV_ITEMS}
    >
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#032D59] text-white px-4 py-3 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Calendar size={12} />
            Institutional Tournaments
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            School Hosted Events & Meets
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Schedule and oversee invitationals, regional meets, and inter-school fixtures hosted at your campus.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          Schedule New Event
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {schoolEvents.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-300 transition-all"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded">
                  {ev.sport}
                </span>
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {ev.status}
                </span>
              </div>

              <h3 className="text-base font-black text-slate-900">{ev.title}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <Calendar size={13} className="text-amber-600" />
                  {ev.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {ev.venue}
                </span>
                <span className="flex items-center gap-1 font-bold text-amber-700">
                  <Users size={13} />
                  {ev.participatingSchools} Schools Participating
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => showToast(`Participant sheet opened for ${ev.title}.`)}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
              >
                Manage Entries
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SCHEDULE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#D97706] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Schedule Inter-School Event</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15th Annual Inter-School Invitational Athletics Meet"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Sport
                  </label>
                  <select
                    value={eventSport}
                    onChange={(e) => setEventSport(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600 bg-white"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Football">Football</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Badminton">Badminton</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Calendar size={12} />
                  Host Meet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
