'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Film,
  Upload,
  Camera,
  CheckCircle2,
  X,
  Share2,
  Filter,
  Eye,
  FileCheck,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { COACH_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeMediaUploads, addMediaUpload, MediaUpload } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function CoachMediaPage() {
  const { user } = useAuth();
  const [mediaList, setMediaList] = useState<MediaUpload[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'photo' | 'video' | 'certificate' | 'proof'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'certificate' | 'proof'>('photo');
  const [mediaAthlete, setMediaAthlete] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeMediaUploads(setMediaList);
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaTitle.trim()) return;

    addMediaUpload({
      title: mediaTitle,
      type: mediaType,
      url: mediaType === 'video' ? '/image/athelete2.png' : '/image/athelete.png',
      athleteName: mediaAthlete || 'Varsity Athlete',
      sport: 'Multi-Sport',
      uploadedBy: user?.name || 'Coach Rajesh Sharma',
    });

    setMediaTitle('');
    setMediaAthlete('');
    setShowUploadModal(false);
    showToast('Match media proof uploaded and synchronized with database.');
  };

  const filteredMedia = mediaList.filter((m) => {
    if (typeFilter === 'all') return true;
    return m.type === typeFilter;
  });

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Film size={12} />
            Proof & Visual Records
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Media Uploads & Proof Archive
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Upload match videos, laser-timing photographic evidence, and certified medal documents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Upload size={14} />
          Upload Media Proof
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-3 mb-6 flex items-center gap-2 text-xs overflow-x-auto">
        {(['all', 'photo', 'video', 'certificate', 'proof'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setTypeFilter(tab)}
            className={`px-4 py-2 rounded-xl font-black uppercase text-[11px] tracking-wider transition-all cursor-pointer ${
              typeFilter === tab
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab} (
            {tab === 'all'
              ? mediaList.length
              : mediaList.filter((m) => m.type === tab).length}
            )
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-all group"
          >
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <Image
                src={m.url || '/image/athelete.png'}
                alt={m.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {m.type}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-emerald-700">{m.sport}</span>
                <span>{m.uploadedAt}</span>
              </div>
              <h3 className="text-xs font-black text-slate-900 leading-snug line-clamp-2">
                {m.title}
              </h3>
              <p className="text-[11px] text-slate-500">
                Athlete: <strong className="text-slate-700">{m.athleteName}</strong>
              </p>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px]">By {m.uploadedBy}</span>
              <button
                type="button"
                onClick={() => showToast('Media link copied to clipboard.')}
                className="text-emerald-600 hover:text-emerald-800 p-1"
                title="Share link"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-[#059669] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Upload Media Proof</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg text-white/80 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Title / Event Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Laser Timing Finish 100m Under-16 District Trials"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Proof Format
                  </label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600 bg-white"
                  >
                    <option value="photo">Match Photo</option>
                    <option value="video">Video Footage</option>
                    <option value="certificate">Medal Certificate</option>
                    <option value="proof">Medical / Trial Proof</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Athlete Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohit Kumar"
                    value={mediaAthlete}
                    onChange={(e) => setMediaAthlete(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <Upload size={12} />
                  Upload Proof
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
