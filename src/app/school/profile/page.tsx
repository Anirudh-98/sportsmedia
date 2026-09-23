'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Building2,
  User,
  Shield,
  CheckCircle2,
  Save,
  Phone,
  Mail,
  School,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { SCHOOL_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeSchoolInfo, updateSchoolInfo, SchoolInfo } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function SchoolProfilePage() {
  const { user } = useAuth();
  const [school, setSchool] = useState<SchoolInfo | null>(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [principal, setPrincipal] = useState('');
  const [sportsCoordinator, setSportsCoordinator] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeSchoolInfo((data) => {
      setSchool(data);
      setName(data.name);
      setCity(data.city);
      setPrincipal(data.principal);
      setSportsCoordinator(data.sportsCoordinator);
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo({
      name,
      city,
      principal,
      sportsCoordinator,
    });
    showToast('School institutional profile updated successfully.');
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
            <MapPin size={12} />
            Campus & Affiliations
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Institutional School Profile
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage your school accreditation, sports facilities, administrative points of contact, and campus ground details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6">
          <h2 className="text-base font-black text-slate-900 uppercase pb-3 border-b border-slate-100 mb-4">
            Institutional Information
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  City / Location *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Principal / Head of Institution
                </label>
                <input
                  type="text"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Sports Coordinator / Athletic Director
                </label>
                <input
                  type="text"
                  value={sportsCoordinator}
                  onChange={(e) => setSportsCoordinator(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Save size={14} />
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* Infrastructure & Facilities Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
          <h3 className="text-sm font-black uppercase text-slate-900 pb-2 border-b border-slate-100">
            Sports Infrastructure
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-800 block">Athletics Track</span>
              <span className="text-slate-500">400m 8-Lane Synthetic Track & Long Jump Pit</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-800 block">Indoor Complex</span>
              <span className="text-slate-500">4 Wooden Badminton Courts & Table Tennis Arena</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-800 block">Football Turf</span>
              <span className="text-slate-500">FIFA-standard natural grass pitch with floodlights</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-black text-slate-800 block">Aquatic Center</span>
              <span className="text-slate-500">25m Semi-Olympic heated swimming pool</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
