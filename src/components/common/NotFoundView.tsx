'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Home, ArrowLeft, LogIn, Lock } from 'lucide-react';
import { BlueZoneTreeLogo } from '@/components/brand/BrandLogos';
import { useAuth } from '@/context/AuthContext';

interface NotFoundViewProps {
  title?: string;
  message?: string;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  title = 'Page Not Found',
  message = 'The requested URL was not found on this server or access is restricted under zero-trust role security.',
}) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F0F5FA] via-[#F8FAFC] to-white flex flex-col justify-between py-8 px-4 antialiased text-slate-800">
      {/* Top Brand Header */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2">
          <BlueZoneTreeLogo size={30} />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black text-[#032D59] tracking-wider uppercase leading-none">
              SPORTSMEDIA.WORLD
            </span>
            <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
              Secure Sports Ecosystem
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-black uppercase tracking-wider border border-slate-200">
            <Lock size={12} className="text-slate-400" />
            <span>HTTP 404</span>
          </div>
        </div>
      </div>

      {/* Main 404 Center Box */}
      <div className="max-w-lg w-full mx-auto my-auto bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 sm:p-10 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
        {/* Glowing 404 Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#032D59] to-[#0B5FA5] text-white flex items-center justify-center shadow-lg shadow-blue-950/15">
            <ShieldAlert size={44} className="text-amber-300 animate-pulse" />
          </div>
          <span className="absolute -bottom-2.5 -right-2.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
            404 Error
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-black text-[#032D59] tracking-tight mb-2">
          404
        </h1>
        <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight mb-3">
          {title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mb-6">
          {message}
        </p>

        {/* Zero-Trust Notice */}
        <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 mb-8 text-left space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Protocol:</span>
            <span className="font-black text-[#032D59] font-mono">Zero-Trust Role Isolation</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-bold uppercase tracking-wider">Authorization:</span>
            <span className="font-black text-rose-600 font-mono">Access Restricted (404)</span>
          </div>
          {user && (
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
              <span className="text-slate-500 font-bold uppercase tracking-wider">Signed in as:</span>
              <span className="font-black text-blue-700 font-mono uppercase">{user.role}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-2.5">
          {user ? (
            <button
              type="button"
              onClick={() => router.push(`/${user.role}/dashboard`)}
              className="w-full py-3 px-4 rounded-xl bg-[#032D59] hover:bg-[#0B5FA5] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={14} />
              <span>Go to My Authorized Dashboard ({user.role.toUpperCase()})</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="w-full py-3 px-4 rounded-xl bg-[#0B5FA5] hover:bg-[#032D59] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn size={14} />
              <span>Sign In with Authorized Account</span>
            </Link>
          )}

          <Link
            href="/"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Home size={14} />
            <span>Return to Public Homepage</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-slate-400 font-semibold max-w-5xl mx-auto w-full pt-4 border-t border-slate-200">
        &copy; 2026 SportsMedia.World &bull; Zero-Trust Role-Based Access Enforced
      </div>
    </div>
  );
};
