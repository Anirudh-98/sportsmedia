'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes, FaLock, FaEnvelope, FaUser, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { BlueZoneTreeLogo } from '../brand/BrandLogos';
import { useAuth, UserRole } from '@/context/AuthContext';

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
  const router = useRouter();
  const { login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) throw new Error('Please enter your full name or institution.');
        await register({ name, email, password, role });
      } else {
        await login(email, password, role);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
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
              <p className="text-sm text-blue-200">SportsMedia.World Role Authentication</p>
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
            onClick={() => { setMode('login'); setErrorMessage(''); }}
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
            onClick={() => { setMode('register'); setErrorMessage(''); }}
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
              { id: 'coach', label: 'Coach' },
              { id: 'school', label: 'School' },
              { id: 'sponsor', label: 'Sponsor' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => { setRole(r.id as any); setErrorMessage(''); }}
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
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-bold flex items-start gap-2">
              <FaExclamationCircle size={15} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-lg text-white font-bold text-sm uppercase tracking-wide shadow-sm hover:shadow-md transition-all mt-5 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-[#1565c0] hover:bg-[#0d47a1]'
                  : 'bg-[#2e7d32] hover:bg-[#1b5e20]'
              }`}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : mode === 'login' ? (
                `LOGIN AS ${role.toUpperCase()}`
              ) : (
                'CREATE ACCOUNT'
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
