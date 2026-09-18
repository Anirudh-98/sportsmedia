'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUniversity,
  FaHandsHelping,
  FaCog,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheckCircle,
  FaBolt,
  FaShieldAlt,
  FaUserPlus,
  FaSignInAlt,
  FaUser,
  FaBuilding,
} from 'react-icons/fa';
import { useAuth, UserRole, PRESET_ACCOUNTS } from '@/context/AuthContext';
import { BlueZoneTreeLogo } from '@/components/brand/BrandLogos';

interface RoleOption {
  id: UserRole;
  title: string;
  badge: string;
  icon: React.ElementType;
  description: string;
  themeColor: string;
  activeBorder: string;
  activeBg: string;
  pillColor: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'student',
    title: 'STUDENT',
    badge: 'Journalist Education',
    icon: FaUserGraduate,
    description: 'Learn sports reporting, complete journalism assignments, draft and publish sports articles',
    themeColor: '#0B5FA5',
    activeBorder: 'border-[#0B5FA5]',
    activeBg: 'bg-[#EBF3FB]',
    pillColor: 'bg-[#0B5FA5] text-white',
  },
  {
    id: 'coach',
    title: 'COACH',
    badge: 'PET Master & Academy',
    icon: FaChalkboardTeacher,
    description: 'Register athletes, track performance metrics, upload match photos and video proofs',
    themeColor: '#168C45',
    activeBorder: 'border-[#168C45]',
    activeBg: 'bg-[#EDF8F1]',
    pillColor: 'bg-[#168C45] text-white',
  },
  {
    id: 'school',
    title: 'SCHOOL',
    badge: 'Institution Sports Wing',
    icon: FaUniversity,
    description: 'Central institutional sports management, assign coaches, host inter-school competitions',
    themeColor: '#7E378B',
    activeBorder: 'border-[#7E378B]',
    activeBg: 'bg-[#F7EEF9]',
    pillColor: 'bg-[#7E378B] text-white',
  },
  {
    id: 'sponsor',
    title: 'SPONSOR',
    badge: 'CSR & Talent Grants',
    icon: FaHandsHelping,
    description: 'Discover emerging talent, fund grassroots athletics programs, track measurable social impact',
    themeColor: '#F28C28',
    activeBorder: 'border-[#F28C28]',
    activeBg: 'bg-[#FEF5EB]',
    pillColor: 'bg-[#F28C28] text-white',
  },
  {
    id: 'admin',
    title: 'ADMIN',
    badge: 'Super Administrator',
    icon: FaCog,
    description: 'Ecosystem control, pending approvals, user verification & moderation',
    themeColor: '#032D59',
    activeBorder: 'border-[#032D59]',
    activeBg: 'bg-[#E8EFF6]',
    pillColor: 'bg-[#032D59] text-white',
  },
];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, demoLogin } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle URL role parameter
  useEffect(() => {
    const roleParam = searchParams.get('role') as UserRole;
    if (roleParam && ROLES.some((r) => r.id === roleParam)) {
      setSelectedRole(roleParam);
      setEmail(PRESET_ACCOUNTS[roleParam].email);
    } else {
      setEmail(PRESET_ACCOUNTS[selectedRole].email);
    }
  }, [searchParams]);

  const handleRoleSelect = (roleId: UserRole) => {
    setSelectedRole(roleId);
    if (mode === 'login') {
      setEmail(PRESET_ACCOUNTS[roleId].email);
      setPassword('sports123');
    }
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          setErrorMessage('Please enter your full name or institution name.');
          setLoading(false);
          return;
        }

        setSuccessMessage('Creating account and setting role permissions in Cloud Firestore...');
        await register({
          name,
          email,
          password,
          role: selectedRole,
          institution,
        });
      } else {
        await login(email, password, selectedRole);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (roleId: UserRole) => {
    setLoading(true);
    demoLogin(roleId);
  };

  const activeRoleConfig = ROLES.find((r) => r.id === selectedRole) || ROLES[0];
  const ActiveIcon = activeRoleConfig.icon;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F0F5FA] via-[#F8FAFC] to-white flex flex-col justify-between py-6 px-3 sm:px-6">
      {/* Top Header Row with Back Button & Brand */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-slate-200">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#0B5FA5] hover:text-[#032D59] transition-colors"
        >
          <FaArrowLeft size={13} />
          <span>Back to Public Portal</span>
        </Link>
        <div className="flex items-center gap-2">
          <BlueZoneTreeLogo size={28} />
          <span className="text-xs sm:text-sm font-black text-[#032D59] tracking-wider uppercase">
            SportsMedia.World
          </span>
        </div>
      </div>

      {/* Main Authentication Container */}
      <div className="max-w-4xl w-full mx-auto my-6 flex flex-col items-center">
        {/* Portal Title & Subtitle matching PRD */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#0B5FA5] text-[11px] font-black uppercase tracking-wider mb-2">
            <FaShieldAlt size={12} />
            Cloud Firestore Role-Based Authentication
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#032D59] uppercase tracking-tight">
            SPORTS MEDIA.WORLD
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
            Digital Gateway to Sports Talent &bull; Select Your Role to Proceed
          </p>
        </div>

        {/* 5 Clearly Separated Role Selection Tiles */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                className={`flex flex-col items-center text-center p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left relative ${
                  isSelected
                    ? `${role.activeBorder} ${role.activeBg} shadow-md scale-102`
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 text-emerald-600">
                    <FaCheckCircle size={14} />
                  </div>
                )}

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 shadow-xs transition-transform ${
                    isSelected ? 'scale-110' : ''
                  }`}
                  style={{ backgroundColor: role.themeColor }}
                >
                  <Icon size={20} />
                </div>

                <span className="text-xs sm:text-[13px] font-black text-slate-900 tracking-tight leading-none mb-1">
                  {role.title}
                </span>

                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-tight leading-tight">
                  {role.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Login / Create Account Form Box */}
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
          {/* Mode Switcher: Sign In vs Create Account */}
          <div className="flex border-b border-slate-200 mb-5 pb-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setEmail(PRESET_ACCOUNTS[selectedRole].email);
              }}
              className={`flex-1 pb-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'text-[#0B5FA5] border-b-2 border-[#0B5FA5]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <FaSignInAlt size={14} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
                setEmail('');
              }}
              className={`flex-1 pb-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'text-[#168C45] border-b-2 border-[#168C45]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <FaUserPlus size={14} />
              <span>Create Account</span>
            </button>
          </div>

          {/* Active Role Header Strip */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-xs"
                style={{ backgroundColor: activeRoleConfig.themeColor }}
              >
                <ActiveIcon size={18} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight uppercase">
                  {mode === 'login' ? `Sign In as ${activeRoleConfig.title}` : `Register as ${activeRoleConfig.title}`}
                </h3>
                <p className="text-[11px] text-slate-500 font-semibold leading-tight">
                  {activeRoleConfig.description}
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${activeRoleConfig.pillColor}`}
            >
              {activeRoleConfig.title}
            </span>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-md">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-md">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name / Organization (For Registration) */}
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name / Contact Person
                  </label>
                  <div className="relative">
                    <FaUser
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anirudh Jyothula / Principal Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden text-slate-900 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                    School / Academy / Company Name (Optional)
                  </label>
                  <div className="relative">
                    <FaBuilding
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. DPS Hyderabad / Decathlon Foundation"
                      className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden text-slate-900 font-bold"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email / Mobile */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Email / Mobile Number
              </label>
              <div className="relative">
                <FaEnvelope
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@sportsmedia.world or mobile"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden text-slate-900 font-bold"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <FaLock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50/50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-hidden text-slate-900 font-bold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-700 font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0B5FA5] border-slate-300 focus:ring-0 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset instructions will be sent to ' + email)}
                  className="text-[#0B5FA5] hover:text-[#032D59] font-black hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              style={{ backgroundColor: activeRoleConfig.themeColor }}
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === 'register' ? (
                <span>CREATE {activeRoleConfig.title} ACCOUNT</span>
              ) : (
                <span>SIGN IN AS {activeRoleConfig.title}</span>
              )}
            </button>

            {/* One-Click Demo Login Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleQuickDemo(selectedRole)}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <FaBolt size={13} className="animate-pulse" />
                <span>One-Click Realtime Demo ({activeRoleConfig.title})</span>
              </button>
              <p className="text-[10px] text-center text-slate-500 font-semibold mt-1.5">
                Sign in instantly to test the live {activeRoleConfig.title} dashboard with real data and real-time syncing.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-5xl w-full mx-auto text-center pt-4 border-t border-slate-200">
        <p className="text-[11px] text-slate-500 font-semibold">
          &copy; 2026 SportsMedia.World &bull; Blue Zone Ecosystem. Live Cloud Firestore rules enforce role-based permissions across all dashboards.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
          <div className="w-10 h-10 border-4 border-[#0B5FA5] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-black uppercase tracking-wider text-[#032D59]">
            Loading SportsMedia.World Login...
          </p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
