'use client';

import React, { useState } from 'react';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { STUDENT_NAV_ITEMS } from '@/components/dashboard/dashboardNav';
import { useAuth } from '@/context/AuthContext';

export default function StudentCertificatesPage() {
  const { user } = useAuth();
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const certificates = [
    {
      id: 'cert-1',
      title: 'Certificate of Excellence in Sports Journalism',
      category: 'Print & Digital Media',
      issuedDate: '15 Aug 2026',
      credentialId: 'SMW-JRN-2026-8891',
      status: 'Verified Authentic',
      instructor: 'Senior Sports Editor & Board',
      grade: 'Distinction (92%)',
    },
    {
      id: 'cert-2',
      title: 'Sports Photography & DSLR Camera Handling',
      category: 'Visual Photojournalism',
      issuedDate: '02 Sep 2026',
      credentialId: 'SMW-PHT-2026-4420',
      status: 'Verified Authentic',
      instructor: 'Chief Visual Media Producer',
      grade: 'First Class (88%)',
    },
    {
      id: 'cert-3',
      title: 'Press Ethics & Field Interview Accreditation',
      category: 'Broadcast & Law',
      issuedDate: '10 Sep 2026',
      credentialId: 'SMW-ETH-2026-1193',
      status: 'Verified Authentic',
      instructor: 'Academy Ethics Committee',
      grade: 'High Honors (96%)',
    },
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
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

      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-2">
            <Award size={12} />
            Verified Accreditations
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
            Certificates & Credentials
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Tamper-proof verifiable credentials issued by SportsMedia.World Academy.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
          <ShieldCheck size={16} />
          <span>Blockchain Verified Credentials</span>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-amber-50 text-amber-800">
                  {cert.category}
                </span>
                <span className="text-[9.5px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 size={10} />
                  {cert.status}
                </span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <Award size={26} />
              </div>

              <h3 className="text-sm font-black text-slate-900 leading-snug mb-2">
                {cert.title}
              </h3>

              <div className="space-y-1 text-xs text-slate-500">
                <p>Grade: <strong className="text-slate-800">{cert.grade}</strong></p>
                <p>Issued: <strong className="text-slate-700">{cert.issuedDate}</strong></p>
                <p className="font-mono text-[10px] text-slate-400">ID: {cert.credentialId}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2 px-3 rounded-lg bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Certificate
              </button>
              <button
                type="button"
                onClick={() => showToast('Certificate PDF downloaded.')}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                title="Download PDF"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW CERTIFICATE MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-4 border-[#032D59] p-6 sm:p-8 text-center">
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <div className="border-2 border-amber-400 p-6 rounded-xl bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <Award size={32} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#032D59]">
                SPORTSMEDIA.WORLD ACADEMY OF SPORTS JOURNALISM
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mt-1 mb-2">
                {selectedCert.title}
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
                This is to certify that <strong className="text-slate-900">{user?.name || 'Trainee Journalist'}</strong> has successfully satisfied all academic requirements, field match report assignments, and editorial standards with <strong className="text-slate-900">{selectedCert.grade}</strong>.
              </p>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-600 mb-4">
                Credential ID: {selectedCert.credentialId} &bull; {selectedCert.status}
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Verified Certificate PDF downloaded successfully.');
                    setSelectedCert(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#032D59] hover:bg-[#0B5FA5] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} />
                  Download Official PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
