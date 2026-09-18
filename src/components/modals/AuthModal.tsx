'use client';

import React, { useState } from 'react';
import { FaTimes, FaLock, FaEnvelope, FaUser, FaCheckCircle } from 'react-icons/fa';
import { BlueZoneTreeLogo } from '../brand/BrandLogos';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'register';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<'student' | 'coach' | 'school' | 'sponsor'>('student');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">

        {/* Header Strip */}
        <div className="bg-[#0d2240] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-white rounded-md shrink-0">
              <BlueZoneTreeLogo size={34} />
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wide">
                {mode === 'login' ? 'Portal Login' : 'Register New Account'}
              </h3>
              <p className="text-sm text-blue-200">SportsMedia Blue Zone Ecosystem</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#1565c0] border-b-2 border-[#1565c0]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#2e7d32] border-b-2 border-[#2e7d32]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Role Selection */}
        <div className="px-7 pt-5">
          <label className="block text-sm font-semibold text-slate-600 uppercase tracking-wide mb-2">
            Select Your Role
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'student', label: 'Student' },
              { id: 'coach', label: 'PET / Coach' },
              { id: 'school', label: 'School' },
              { id: 'sponsor', label: 'Sponsor' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id as any)}
                className={`py-2.5 px-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                  role === r.id
                    ? 'bg-[#0d2240] text-white border-[#0d2240]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-7">
          {submitted ? (
            <div className="py-10 flex flex-col items-center justify-center text-center">
              <FaCheckCircle size={52} className="text-emerald-500 mb-3 animate-bounce" />
              <h4 className="text-lg font-bold text-slate-800">
                {mode === 'login' ? 'Login Successful!' : 'Registration Complete!'}
              </h4>
              <p className="text-sm text-slate-500 mt-1.5">Welcome to SportsMedia Blue Zone.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Full Name / Institution
                  </label>
                  <div className="relative">
                    <FaUser size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohit Kumar / DPS Hyderabad"
                      className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@school.edu.in"
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <FaLock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                  />
                </div>
              </div>

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#1565c0]" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="font-semibold text-[#1565c0] hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3.5 rounded-lg text-white font-bold text-sm uppercase tracking-wide shadow-sm hover:shadow-md transition-all mt-5 cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#1565c0] hover:bg-[#0d47a1]'
                    : 'bg-[#2e7d32] hover:bg-[#1b5e20]'
                }`}
              >
                {mode === 'login' ? `LOGIN AS ${role.toUpperCase()}` : 'CREATE FREE ACCOUNT'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
