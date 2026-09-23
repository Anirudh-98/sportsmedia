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
}

const ROLES: RoleOption[] = [
  {
    id: 'student',
    title: 'Trainee Journalist',
    badge: 'Journalist Education',
    icon: FaUserGraduate,
    description: 'Learn sports reporting, complete assignments, publish sports articles',
    themeColor: '#0B5FA5',
  },
  {
    id: 'coach',
    title: 'Coach',
    badge: 'PET Master & Academy',
    icon: FaChalkboardTeacher,
    description: 'Register athletes, track performance, upload match media proofs',
    themeColor: '#168C45',
  },
  {
    id: 'school',
    title: 'School',
    badge: 'Institution Sports Wing',
    icon: FaUniversity,
    description: 'Central sports management, assign coaches, host competitions',
    themeColor: '#7E378B',
  },
  {
    id: 'sponsor',
    title: 'Sponsor',
    badge: 'CSR & Talent Grants',
    icon: FaHandsHelping,
    description: 'Discover emerging talent, fund programs, track social impact',
    themeColor: '#F28C28',
  },
  {
    id: 'admin',
    title: 'Admin',
    badge: 'Super Administrator',
    icon: FaCog,
    description: 'Ecosystem control, pending approvals, moderation',
    themeColor: '#032D59',
  },
];

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register } = useAuth();

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
    if (mode === 'register' && roleId === 'admin') {
      setErrorMessage('Admin accounts cannot be self-registered. Please contact an existing administrator.');
      return;
    }
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
        if (selectedRole === 'admin') {
          setErrorMessage('Admin accounts cannot be self-registered. Please contact an existing administrator.');
          setLoading(false);
          return;
        }

        setSuccessMessage('Creating account and setting role permissions...');
        await register({
          name,
          email,
          password,
          role: selectedRole,
          institution,
        });
      } else {
        await login(email, password, selectedRole, rememberMe);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const activeRoleConfig = ROLES.find((r) => r.id === selectedRole) || ROLES[0];
  const ActiveIcon = activeRoleConfig.icon;

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] flex flex-col justify-between py-5 px-3 sm:px-6">
      {/* Top bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 border-b border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <FaArrowLeft size={12} />
          <span>Back to public portal</span>
        </Link>
        <div className="flex items-center gap-2">
          <BlueZoneTreeLogo size={24} />
          <span className="text-sm font-semibold text-slate-900">
            SportsMedia.World
          </span>
        </div>
      </div>

      {/* Main container */}
      <div className="max-w-4xl w-full mx-auto my-6 flex flex-col items-center">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0B5FA5] text-xs font-medium mb-3">
            <FaShieldAlt size={11} />
            Secure zero-trust role authentication
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Sports Media World
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            The digital gateway to sports talent. Select your role to continue.
          </p>
        </div>

        {/* Role tiles */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer relative ${
                  isSelected
                    ? 'border-transparent shadow-sm'
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
                style={isSelected ? { backgroundColor: `${role.themeColor}0D`, borderColor: `${role.themeColor}40` } : {}}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 text-emerald-500">
                    <FaCheckCircle size={13} />
                  </div>
                )}

                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-2 transition-transform"
                  style={{ backgroundColor: `${role.themeColor}17`, color: role.themeColor }}
                >
                  <Icon size={18} />
                </div>

                <span className="text-sm font-semibold text-slate-900 leading-tight mb-0.5">
                  {role.title}
                </span>

                <span className="text-[11px] text-slate-400 leading-tight">
                  {role.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form card */}
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
          <div className="flex border-b border-slate-100 mb-5">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setEmail(PRESET_ACCOUNTS[selectedRole].email);
              }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'text-[#0B5FA5] border-b-2 border-[#0B5FA5]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <FaSignInAlt size={13} />
              <span>Sign in</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setErrorMessage('');
                setEmail('');
                if (selectedRole === 'admin') {
                  setSelectedRole('student');
                }
              }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'text-[#168C45] border-b-2 border-[#168C45]'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <FaUserPlus size={13} />
              <span>Create account</span>
            </button>
          </div>

          {/* Active role header */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${activeRoleConfig.themeColor}17`, color: activeRoleConfig.themeColor }}
            >
              <ActiveIcon size={17} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                {mode === 'login' ? `Sign in as ${activeRoleConfig.title}` : `Register as ${activeRoleConfig.title}`}
              </h3>
              <p className="text-xs text-slate-500 leading-tight mt-0.5">
                {activeRoleConfig.description}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Full name / contact person
                  </label>
                  <div className="relative">
                    <FaUser
                      size={13}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anirudh Jyothula / Principal Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0B5FA5]/25 focus:border-[#0B5FA5] focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    School / academy / company name (optional)
                  </label>
                  <div className="relative">
                    <FaBuilding
                      size={13}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. DPS Hyderabad / Decathlon Foundation"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0B5FA5]/25 focus:border-[#0B5FA5] focus:outline-hidden text-slate-900"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Email / mobile number
              </label>
              <div className="relative">
                <FaEnvelope
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@sportsmedia.world or mobile"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0B5FA5]/25 focus:border-[#0B5FA5] focus:outline-hidden text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <FaLock
                  size={13}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#0B5FA5]/25 focus:border-[#0B5FA5] focus:outline-hidden text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
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
                  className="text-[#0B5FA5] hover:text-[#032D59] font-medium hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              style={{ backgroundColor: activeRoleConfig.themeColor }}
            >
              {loading ? (
                <span>Processing...</span>
              ) : mode === 'register' ? (
                <span>Create {activeRoleConfig.title.toLowerCase()} account</span>
              ) : (
                <span>Sign in as {activeRoleConfig.title.toLowerCase()}</span>
              )}
            </button>

            {mode === 'login' && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setEmail(PRESET_ACCOUNTS[selectedRole].email);
                    setPassword('sports123');
                    setErrorMessage('');
                  }}
                  className="text-sm font-medium text-slate-500 hover:text-[#0B5FA5] hover:underline cursor-pointer inline-flex items-center gap-1.5"
                >
                  <FaBolt size={11} className="text-amber-500" />
                  <span>Fill test credentials for {activeRoleConfig.title.toLowerCase()}</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl w-full mx-auto text-center pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">
          &copy; 2026 SportsMedia.World &bull; Blue Zone Ecosystem. Secure zero-trust role-based permissions enforced across all dashboards.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F8FB]">
          <div className="w-8 h-8 border-[3px] border-[#0B5FA5] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-500">
            Loading SportsMedia.World login...
          </p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
