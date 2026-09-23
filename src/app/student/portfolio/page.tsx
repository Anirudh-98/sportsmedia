'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Camera,
  Video,
  Mic,
  Plus,
  X,
  Upload,
  CheckCircle2,
  Share2,
  Download,
  Filter,
  Eye,
  FileText,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { subscribeMediaUploads, addMediaUpload, MediaUpload } from '@/services/realtimeData';
import { useAuth } from '@/context/AuthContext';

export default function StudentPortfolioPage() {
  const { user } = useAuth();
  const [mediaList, setMediaList] = useState<MediaUpload[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'photo' | 'video' | 'certificate' | 'proof'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video' | 'certificate' | 'proof'>('photo');
  const [mediaAthlete, setMediaAthlete] = useState('');
  const [mediaSport, setMediaSport] = useState('Athletics');
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
      athleteName: mediaAthlete || 'Varsity Squad',
      sport: mediaSport,
      uploadedBy: user?.name || 'Trainee Journalist',
    });

    setMediaTitle('');
    setMediaAthlete('');
    setShowUploadModal(false);
    showToast('Media asset uploaded and added to your public portfolio.');
  };

  const filteredMedia = mediaList.filter((m) => {
    if (typeFilter === 'all') return true;
    return m.type === typeFilter;
  });

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

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Camera size={12} />
            Visual & Multimedia Assets
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Journalism Media Portfolio
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Showcase your sideline photography, athlete interviews, and MoJo smartphone footage.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <Upload size={14} />
          Upload Media Asset
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
                ? 'bg-[#0B5FA5] text-white shadow-xs'
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
        {filteredMedia.map((media) => (
          <div
            key={media.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-blue-300 transition-all group"
          >
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <Image
                src={media.url || '/image/athelete.png'}
                alt={media.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {media.type}
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-bold text-blue-700">{media.sport}</span>
                <span>{media.uploadedAt}</span>
              </div>
              <h3 className="text-xs font-black text-slate-900 leading-snug line-clamp-2">
                {media.title}
              </h3>
              <p className="text-[11px] text-slate-500">
                Subject: <strong className="text-slate-700">{media.athleteName}</strong>
              </p>
            </div>

            <div className="px-4 pb-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[10px]">Uploaded by: {media.uploadedBy}</span>
              <button
                type="button"
                onClick={() => showToast('Media asset link copied.')}
                className="text-blue-600 hover:text-blue-800 p-1"
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
            <div className="bg-[#0B5FA5] p-4 sm:p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload size={20} />
                <h3 className="text-base font-black uppercase tracking-wide">Upload Media Asset</h3>
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
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Under-16 100m Finals Podium Finish Photo"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Media Format
                  </label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="photo">Match Photo</option>
                    <option value="video">MoJo Video</option>
                    <option value="certificate">Press Pass / Cert</option>
                    <option value="proof">Audio Podcast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Sport Discipline
                  </label>
                  <select
                    value={mediaSport}
                    onChange={(e) => setMediaSport(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="Athletics">Athletics</option>
                    <option value="Football">Football</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Athlete / Team Tagged
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rohit Kumar (100m Sprinter)"
                  value={mediaAthlete}
                  onChange={(e) => setMediaAthlete(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
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
                  Upload to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
