'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, PersonStanding, Whistle, Building2, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginStatsPanelProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const STATS = [
  { label: 'Students', sub: 'Show Your Talent', icon: PersonStanding, color: '#149447', bg: '#EAF7EF' },
  { label: 'Coaches', sub: 'Share Your Expertise', icon: Whistle, color: '#F28C28', bg: '#FDF1E4' },
  { label: 'Schools & Colleges', sub: 'Join Our Network', icon: Building2, color: '#7255A8', bg: '#F1EDF8' },
];

export const LoginStatsPanel: React.FC<LoginStatsPanelProps> = ({ onOpenAuth }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenAuth('login');
  };

  return (
    <div className="flex h-full flex-col gap-3 rounded-md border border-[#D8E0E7] bg-white p-3.5 shadow-2xs">
      <div className="flex items-center gap-2.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0A67B2]">
          <Users2 size={20} />
        </span>
        <div>
          <h3 className="text-sm font-black leading-tight text-[#032D59]">
            Welcome to
            <br />
            SPORTSMEDIA.WORLD
          </h3>
          <p className="mt-0.5 text-[10.5px] font-semibold text-[#586572]">
            Be a Part of the Sports Revolution
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="flex flex-col gap-1">
          <span className="sr-only">Email or Mobile Number</span>
          <div className="flex items-center gap-2 rounded-sm border border-[#D8E0E7] bg-slate-50 px-2.5 py-1.5">
            <Mail size={13} className="shrink-0 text-[#586572]" />
            <input
              type="text"
              placeholder="Email / Mobile Number"
              className="w-full bg-transparent text-xs text-[#17212B] placeholder-[#8592A0] outline-none"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span className="sr-only">Password</span>
          <div className="flex items-center gap-2 rounded-sm border border-[#D8E0E7] bg-slate-50 px-2.5 py-1.5">
            <Lock size={13} className="shrink-0 text-[#586572]" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full bg-transparent text-xs text-[#17212B] placeholder-[#8592A0] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="shrink-0 text-[#586572] hover:text-[#0A67B2]"
            >
              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
        </label>

        <div className="flex items-center justify-between text-[10px] font-semibold text-[#586572]">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" className="h-3 w-3 accent-[#0A67B2]" />
            Remember Me
          </label>
          <button type="button" className="text-[#0A67B2] hover:underline">
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className="h-auto w-full rounded-sm bg-[#0765AD] py-2 text-[11px] font-black uppercase tracking-wider text-white hover:bg-[#054E85]"
        >
          Login
        </Button>
      </form>

      <div className="text-center text-[11px] font-semibold text-[#586572]">
        New User?{' '}
        <button
          type="button"
          onClick={() => onOpenAuth('register')}
          className="font-black text-[#149447] hover:underline"
        >
          Create an Account
        </button>
      </div>

      <div className="grid grid-cols-3 gap-1.5 border-t border-[#E7EDF2] pt-3">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-2xs"
                style={{ backgroundColor: stat.color }}
              >
                <Icon size={17} />
              </span>
              <span className="text-[10px] font-black uppercase leading-tight text-[#17212B]">{stat.label}</span>
              <span className="text-[9px] font-semibold leading-tight text-[#586572]">{stat.sub}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-auto rounded-sm bg-[#EAF5FC] px-2.5 py-2 text-center text-[11px] font-semibold italic leading-snug text-[#032D59]">
        &ldquo;Every School Can Become a Sports Information Centre.&rdquo;
      </p>
    </div>
  );
};
