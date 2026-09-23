'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaHandsHelping,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
  FaShieldAlt,
  FaArrowRight,
  FaSignOutAlt,
  FaExclamationCircle,
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

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
  const router = useRouter();
  const { user, login, logout, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, show personalized dashboard quick-access card
  if (user) {
    return (
      <div className="bg-gradient-to-b from-[#EEF6FC] via-[#E8F3FD] to-[#EEF6FC] rounded-lg border border-[#BCD7EF] p-4 flex flex-col justify-between h-full shadow-2xs">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#D4E6F6]">
            <div className="w-10 h-10 rounded-full bg-[#0B5FA5] flex items-center justify-center text-white shrink-0 shadow-xs">
              <FaShieldAlt size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black text-[#032D59] tracking-tight leading-tight">
                Welcome Back,
              </span>
              <span className="text-sm sm:text-base font-black text-[#0B5FA5] tracking-tight leading-tight mt-0.5 truncate max-w-[200px]">
                {user.name}
              </span>
              <span className="text-[11px] font-bold text-slate-600 leading-tight mt-0.5">
                Role: <span className="font-black text-emerald-700 uppercase">{user.role === 'student' ? 'Trainee Journalist' : user.role}</span>
              </span>
            </div>
          </div>

          {/* Active Status Box */}
          <div className="mt-4 p-3 bg-white/80 rounded-lg border border-[#BCD7EF] text-xs space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold">Account:</span>
              <span className="font-black text-slate-800 truncate max-w-[160px]">{user.email}</span>
            </div>
            {user.institution && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-bold">Institution:</span>
                <span className="font-bold text-slate-700 truncate max-w-[160px]">{user.institution}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-1 border-t border-slate-100">
              <span className="text-slate-500 font-bold">Security Status:</span>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Authorized
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mt-4">
          <button
            type="button"
            onClick={() => router.push(`/${user.role}/dashboard`)}
            className="w-full py-2.5 bg-[#0B5FA5] hover:bg-[#032D59] text-white font-black text-xs sm:text-[13px] uppercase tracking-wider rounded-md shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Open {(user.role === 'student' ? 'Trainee Journalist' : user.role).toUpperCase()} Dashboard</span>
            <FaArrowRight size={12} />
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full py-1.5 text-xs font-black text-rose-600 hover:bg-rose-50 rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FaSignOutAlt size={12} />
            <span>Sign Out Account</span>
          </button>
        </div>
      </div>
    );
  }

  // Handle Form Submission with Real Role Authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (!email.trim()) {
        throw new Error('Please enter your email or mobile number.');
      }
      if (!password) {
        throw new Error('Please enter your password.');
      }

      // Authenticate credentials against Database and verify role
      await login(email, password);
      // login() automatically routes directly to the verified role dashboard
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleNavigation = (roleName: string) => {
    if (onRoleClick) {
      onRoleClick(roleName);
    } else {
      const r = (roleName.toLowerCase().startsWith('student') || roleName.toLowerCase().startsWith('trainee'))
        ? 'student'
        : roleName.toLowerCase().startsWith('coach')
        ? 'coach'
        : 'school';
      router.push(`/login?role=${r}`);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#EEF6FC] via-[#E8F3FD] to-[#EEF6FC] rounded-lg border border-[#BCD7EF] p-3 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Header with emblem & title */}
        <div className="flex items-center gap-2.5 mt-2 sm:mt-2 pb-2 border-b border-[#D4E6F6]">
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

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-2 p-2 bg-rose-50 border border-rose-200 rounded-md text-rose-700 text-[11px] font-bold flex items-start gap-1.5 animate-in fade-in">
            <FaExclamationCircle size={14} className="shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

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
            <Link
              href="/login"
              className="text-[#0B5FA5] hover:text-[#032D59] font-black hover:underline cursor-pointer"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#0B5FA5] hover:bg-[#032D59] disabled:opacity-60 text-white font-black text-xs sm:text-[13px] uppercase tracking-wider rounded-md shadow-xs transition-all active:scale-98 cursor-pointer mt-1 flex items-center justify-center gap-1.5"
          >
            {loading ? <span>Verifying...</span> : <span>LOGIN</span>}
          </button>

          {/* New User Link */}
          <div className="text-center text-xs text-slate-800 font-bold pt-1">
            <span>New User? </span>
            <Link
              href="/login?mode=register"
              className="text-[#0B5FA5] font-black hover:underline cursor-pointer"
            >
              Create an Account
            </Link>
          </div>
        </form>

        {/* 3 Circular Action Icons */}
        <div className="grid grid-cols-3 gap-1.5 pt-2.5 mt-4 border-t border-[#D4E6F6] text-center">
          {/* TRAINEE JOURNALIST */}
          <div
            onClick={() => handleRoleNavigation('TRAINEE JOURNALIST')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#168C45] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FaUserGraduate size={16} />
            </div>
            <span className="text-[10.5px] font-black text-[#032D59] uppercase tracking-tight mt-1 leading-tight text-center">
              TRAINEE JOURNALIST
            </span>
            <span className="text-[10px] text-slate-700 font-extrabold leading-tight">
              Show Your Talent
            </span>
          </div>

          {/* COACHES */}
          <div
            onClick={() => handleRoleNavigation('COACHES')}
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
            onClick={() => handleRoleNavigation('SCHOOLS')}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#7E378B] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <FaUniversity size={15} />
            </div>
            <span className="text-[11px] font-black text-[#032D59] uppercase tracking-tight mt-1 leading-tight">
              SCHOOLS
            </span>
            <span className="text-[10px] text-slate-700 font-extrabold leading-tight">
              Build Sports Wing
            </span>
          </div>
        </div>
      </div>

      {/* Blue Zone Foundation Quote Box */}
      <div className="mt-3 p-2 bg-[#E1EEF8] rounded-md border border-[#BCD7EF] text-[11px] font-bold text-[#032D59] text-center leading-snug">
        “Empowering India’s next generation of athletes from grassroots to the global podium.”
      </div>
    </div>
  );
};
