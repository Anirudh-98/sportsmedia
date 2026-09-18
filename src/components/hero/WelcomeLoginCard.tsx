'use client';

import React, { useState } from 'react';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHandsHelping,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
} from 'react-icons/fa';

interface WelcomeLoginCardProps {
  onLogin?: (email: string) => void;
  onCreateAccount?: () => void;
  onRoleClick?: (role: string) => void;
}

export const WelcomeLoginCard: React.FC<WelcomeLoginCardProps> = ({
  onLogin,
  onCreateAccount,
  onRoleClick,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) onLogin(email);
  };

  return (
    <div className="bg-gradient-to-b from-[#EEF6FC] via-[#E8F3FD] to-[#EEF6FC] rounded-lg border border-[#BCD7EF] p-3 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Header with emblem & title */}
        <div className="flex items-center gap-2.5 mt-4 sm:mt-4 pb-2 border-b border-[#D4E6F6]">
          <div className="w-9 h-9 rounded-full bg-[#0B5FA5] flex items-center justify-center text-white shrink-0 shadow-xs">
            <FaHandsHelping size={17} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-[13px] font-black text-[#032D59] tracking-tight leading-tight">
              Welcome to
            </span>
            <span className="text-sm sm:text-[15px] font-black text-[#0B5FA5] tracking-tight leading-tight mt-0.5">
              SPORTSMEDIA.WORLD
            </span>
            <span className="text-[11px] font-bold text-slate-700 leading-tight mt-0.5">
              Be a Part of the Sports Revolution
            </span>
          </div>
        </div>

        {/* Compact Login Form */}
        <form onSubmit={handleSubmit} className="mt-2.5 space-y-2">
          {/* Email / Mobile Input */}
          <div className="relative">
            <FaEnvelope
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email / Mobile Number"
              className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1.5 focus:ring-[#0B5FA5] focus:border-transparent text-slate-900 placeholder-slate-500 font-bold"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <FaLock
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-8 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-1.5 focus:ring-[#0B5FA5] focus:border-transparent text-slate-900 placeholder-slate-500 font-bold"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-1.5 text-slate-800 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 text-[#0B5FA5] rounded-xs border-slate-400 focus:ring-0 cursor-pointer"
              />
              <span>Remember Me</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Forgot password link will be sent to your email/mobile')}
              className="text-[#0B5FA5] hover:text-[#032D59] font-black hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button with rounded-md corners */}
          <button
            type="submit"
            className="w-full py-2 bg-[#0B5FA5] hover:bg-[#032D59] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider rounded-md shadow-xs transition-all active:scale-98 cursor-pointer mt-1"
          >
            LOGIN
          </button>

          {/* New User Link */}
          <div className="text-center text-xs text-slate-800 font-bold pt-1">
            <span>New User? </span>
            <button
              type="button"
              onClick={onCreateAccount}
              className="text-[#0B5FA5] font-black hover:underline cursor-pointer"
            >
              Create an Account
            </button>
          </div>
        </form>

        {/* 3 Circular Action Icons */}
        <div className="grid grid-cols-3 gap-1.5 pt-2.5 mt-6 border-t border-[#D4E6F6] text-center">
          {/* STUDENTS */}
          <div
            onClick={() => onRoleClick && onRoleClick('STUDENTS')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#168C45] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FaUserGraduate size={16} />
            </div>
            <span className="text-[11px] font-black text-[#032D59] uppercase tracking-tight mt-1 leading-tight">
              STUDENTS
            </span>
            <span className="text-[10px] text-slate-700 font-extrabold leading-tight">
              Show Your Talent
            </span>
          </div>

          {/* COACHES */}
          <div
            onClick={() => onRoleClick && onRoleClick('COACHES')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F28C28] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FaChalkboardTeacher size={16} />
            </div>
            <span className="text-[11px] font-black text-[#032D59] uppercase tracking-tight mt-1 leading-tight">
              COACHES
            </span>
            <span className="text-[10px] text-slate-700 font-extrabold leading-tight">
              Share Your Expertise
            </span>
          </div>

          {/* SCHOOLS & COLLEGES */}
          <div
            onClick={() => onRoleClick && onRoleClick('SCHOOLS')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#7E378B] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FaUniversity size={15} />
            </div>
            <span className="text-[11px] font-black text-[#032D59] uppercase tracking-tight mt-1 leading-tight">
              SCHOOLS &amp; COLLEGES
            </span>
            <span className="text-[10px] text-slate-700 font-extrabold leading-tight">
              Join Our Network
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Quote Box */}
      <div className="mt-2.5 p-2 bg-[#E1EFFC] border border-[#BDDBF7] rounded-md text-center shadow-2xs">
        <p className="text-xs sm:text-[13px] font-black text-[#032D59] leading-tight">
          &ldquo;Every School Can Become a Sports Information Centre.&rdquo;
        </p>
      </div>
    </div>
  );
};
