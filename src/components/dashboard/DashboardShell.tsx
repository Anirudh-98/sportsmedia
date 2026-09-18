'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
  FaBell,
  FaCheckCircle,
  FaBroadcastTower,
  FaChevronRight,
  FaShieldAlt,
  FaLock,
  FaCheck,
  FaTimesCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useAuth, UserRole } from '@/context/AuthContext';
import { BlueZoneTreeLogo } from '@/components/brand/BrandLogos';
import { ROLE_PERMISSION_MATRIX, getRolePermissionSummary, PermissionResource } from '@/lib/permissions';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface DashboardShellProps {
  role: UserRole;
  roleTitle: string;
  roleBadge: string;
  themeColor: string;
  navItems: NavItem[];
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  role,
  roleTitle,
  roleBadge,
  themeColor,
  navItems,
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const permissionSummary = getRolePermissionSummary(role);
  const matrix = ROLE_PERMISSION_MATRIX[role];

  // 1. Loading State during SSR hydration / session check
  if (!isClient) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F4F7FB]">
        <div
          className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mb-3"
          style={{ borderColor: `${themeColor} transparent ${themeColor} ${themeColor}` }}
        />
        <p className="text-xs font-black uppercase tracking-wider text-slate-700">
          Authenticating {roleTitle} Session...
        </p>
      </div>
    );
  }

  // 2. Strict Authentication Guard: Unauthenticated users cannot access dashboards
  if (!user) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#F0F5FA] via-[#F8FAFC] to-white flex flex-col justify-between py-12 px-4 antialiased">
        <div className="max-w-md w-full mx-auto my-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center flex flex-col items-center animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-inner">
            <FaLock size={26} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-black uppercase tracking-wider mb-3 border border-rose-200">
            <FaShieldAlt size={12} />
            Strict Access Control
          </div>
          <h2 className="text-xl font-black text-[#032D59] uppercase tracking-tight mb-2">
            Authentication Required
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-6">
            Access to the <span className="font-black text-slate-900">{roleTitle}</span> dashboard is restricted. You must sign in with an authorized account to access this area.
          </p>
          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={() => router.push(`/login?role=${role}`)}
              className="w-full py-3 px-4 rounded-xl text-white text-xs font-black uppercase tracking-wider shadow-md hover:opacity-95 transition-all cursor-pointer"
              style={{ backgroundColor: themeColor }}
            >
              Sign In to {roleTitle}
            </button>
            <Link
              href="/"
              className="block w-full py-2.5 text-xs font-black text-slate-600 hover:text-slate-900 transition-colors"
            >
              Return to Public Portal
            </Link>
          </div>
        </div>
        <div className="text-center text-[11px] text-slate-400 font-semibold">
          &copy; 2026 SportsMedia.World &bull; Zero-Trust Role Security Enforced
        </div>
      </div>
    );
  }

  // 3. Strict Role-Based Authorization Guard:
  // - Admin dashboard strictly requires 'admin' role
  // - Other dashboards strictly require matching role (or admin oversight)
  const isAuthorized = role === 'admin'
    ? user.role === 'admin'
    : (user.role === role || user.role === 'admin');

  if (!isAuthorized) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#F0F5FA] via-[#F8FAFC] to-white flex flex-col justify-between py-12 px-4 antialiased">
        <div className="max-w-lg w-full mx-auto my-auto bg-white rounded-2xl shadow-xl border border-rose-200 p-8 text-center flex flex-col items-center animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4 shadow-inner">
            <FaExclamationTriangle size={28} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-[11px] font-black uppercase tracking-wider mb-3 border border-rose-200">
            <FaShieldAlt size={12} />
            403 Forbidden &bull; Role Isolation
          </div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
            Role Authorization Failed
          </h2>
          <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
            You are currently signed in as <span className="font-black text-slate-900">{user.name}</span> under the <span className="font-black text-blue-700 uppercase">{user.role}</span> role.
          </p>

          <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Authenticated User:</span>
              <span className="font-black text-slate-800">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Your Authorized Role:</span>
              <span className="font-black text-emerald-700 uppercase">{user.role}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Target Dashboard:</span>
              <span className="font-black text-rose-700 uppercase">{role} (RESTRICTED)</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-semibold mb-6 leading-normal">
            SportsMedia.World enforces strict role isolation. In-dashboard role switching is disabled. You can only access your designated role dashboard or sign out to authenticate with a different account.
          </p>

          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={() => router.push(`/${user.role}/dashboard`)}
              className="w-full py-3 px-4 rounded-xl bg-[#032D59] hover:bg-[#0B5FA5] text-white text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Go to My {user.role.toUpperCase()} Dashboard
            </button>
            <button
              type="button"
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-rose-50 hover:border-rose-200 text-rose-600 text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign Out / Switch Account
            </button>
          </div>
        </div>
        <div className="text-center text-[11px] text-slate-400 font-semibold">
          &copy; 2026 SportsMedia.World &bull; Zero-Trust Role Security Enforced
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F4F7FB] flex flex-col antialiased text-slate-800">
      {/* 1. TOP APP BAR */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-2xs h-15 flex items-center justify-between px-3 sm:px-6">
        {/* Left: Mobile Toggle + Logo + Role Tag */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <BlueZoneTreeLogo size={28} />
            <div className="hidden sm:flex flex-col">
              <span className="text-xs font-black text-[#032D59] tracking-wider leading-none uppercase">
                SPORTSMEDIA.WORLD
              </span>
              <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                Dashboard Portal
              </span>
            </div>
          </Link>

          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Active Role Badge */}
          <div
            className="px-2.5 py-1 rounded-md text-white text-[10.5px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-2xs"
            style={{ backgroundColor: themeColor }}
          >
            <span>{roleTitle}</span>
            <span className="opacity-80 text-[10px] hidden md:inline">({roleBadge})</span>
          </div>

          {/* Role Permissions Trigger Button */}
          <button
            type="button"
            onClick={() => setShowPermissionsModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-black text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-2xs transition-all cursor-pointer"
            title="View role-based read, write, update and delete permissions"
          >
            <FaShieldAlt size={11} className="text-emerald-600" />
            <span>Permissions</span>
          </button>

          {/* Realtime Live Pulse */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-black">Realtime Live Sync</span>
          </div>
        </div>

        {/* Right: Notifications + Authenticated User Pill + Sign Out (NO Role Switcher) */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-md text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Notifications"
            >
              <FaBell size={15} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-xs font-black text-slate-800 uppercase">Live Notifications</span>
                  <span className="text-[10px] font-bold text-blue-600">3 New</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded bg-blue-50/70 border border-blue-100">
                    <p className="font-black text-[#032D59]">Cloud Firestore Synced</p>
                    <p className="text-[11px] text-slate-600">All submissions auto-sync to live cloud database.</p>
                  </div>
                  <div className="p-2 rounded bg-emerald-50/70 border border-emerald-100">
                    <p className="font-black text-emerald-900">District Finals Live</p>
                    <p className="text-[11px] text-slate-600">Scores and event coverage ready for reporting.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-2xs uppercase"
              style={{ backgroundColor: themeColor }}
            >
              {user?.name?.[0] || role[0]}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-black text-slate-900 leading-none">
                {user?.name || 'Authorized User'}
              </span>
              <span className="text-[10px] font-bold text-slate-500 leading-none mt-1 truncate max-w-[130px]">
                {user?.institution || user?.email}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={logout}
            title="Sign Out"
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
          >
            <FaSignOutAlt size={16} />
          </button>
        </div>
      </header>

      {/* 2. BODY LAYOUT: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex w-full">
        {/* SIDEBAR (Desktop Fixed, Mobile Drawer) */}
        <aside
          className={`fixed lg:sticky top-15 z-30 h-[calc(100vh-3.75rem)] w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-4 transition-transform duration-200 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Navigation Items */}
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 mb-2">
              {roleTitle} Navigation
            </div>

            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (idx === 0 && pathname === `/${role}/dashboard`);

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-black transition-all ${
                    isActive
                      ? 'text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  style={isActive ? { backgroundColor: themeColor } : {}}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer: Permissions, Public Portal & Logout */}
          <div className="pt-4 border-t border-slate-100 space-y-1.5">
            <button
              type="button"
              onClick={() => setShowPermissionsModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FaShieldAlt size={13} className="text-emerald-600" />
                <span>My Permissions</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 bg-white px-1.5 py-0.5 rounded">
                Matrix
              </span>
            </button>

            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-xs font-black text-[#0B5FA5] hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaHome size={14} />
              <span>Public Website</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-black text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <FaSignOutAlt size={14} />
              <span>Logout Account</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for Mobile Sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/40 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* MAIN DASHBOARD CONTENT */}
        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* ==========================================
          ROLE PERMISSIONS MODAL (PRD MATRIX)
          Enforces and visualizes Read, Write, Update, Delete
         ========================================== */}
      {showPermissionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div
              className="p-4 sm:p-5 text-white flex items-center justify-between"
              style={{ backgroundColor: themeColor }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20">
                  <FaShieldAlt size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black uppercase tracking-wide">
                    {roleTitle} — Permissions Matrix
                  </h3>
                  <p className="text-xs text-white/80">
                    Live role permissions for Read, Write (Create), Update, and Delete
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPermissionsModal(false)}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Quick Summary Pill Row */}
            <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs font-bold">
              <span className="text-slate-600 font-extrabold uppercase text-[11px]">Summary:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[11px] font-black">
                READ: {permissionSummary.canRead.length} resources
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[11px] font-black">
                WRITE: {permissionSummary.canWrite.length} resources
              </span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[11px] font-black">
                UPDATE: {permissionSummary.canUpdate.length} resources
              </span>
              <span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-[11px] font-black">
                DELETE: {permissionSummary.canDelete.length} resources
              </span>
            </div>

            {/* Permissions Table */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-500 uppercase font-black text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Resource</th>
                      <th className="py-2.5 px-2 text-center">Read</th>
                      <th className="py-2.5 px-2 text-center">Write</th>
                      <th className="py-2.5 px-2 text-center">Update</th>
                      <th className="py-2.5 px-2 text-center">Delete</th>
                      <th className="py-2.5 px-3">Scope & Rules</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold">
                    {(Object.keys(matrix) as PermissionResource[]).map((resKey) => {
                      const item = matrix[resKey];
                      const formattedTitle = resKey
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase());

                      return (
                        <tr key={resKey} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3 font-black text-slate-800">
                            {formattedTitle}
                          </td>
                          {/* Read */}
                          <td className="py-2.5 px-2 text-center">
                            {item.read ? (
                              <span className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700">
                                <FaCheck size={11} />
                              </span>
                            ) : (
                              <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                                <FaTimes size={11} />
                              </span>
                            )}
                          </td>
                          {/* Write (Create) */}
                          <td className="py-2.5 px-2 text-center">
                            {item.write ? (
                              <span className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700">
                                <FaCheck size={11} />
                              </span>
                            ) : (
                              <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                                <FaTimes size={11} />
                              </span>
                            )}
                          </td>
                          {/* Update */}
                          <td className="py-2.5 px-2 text-center">
                            {item.update ? (
                              <span className="inline-flex p-1 rounded bg-emerald-100 text-emerald-700">
                                <FaCheck size={11} />
                              </span>
                            ) : (
                              <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                                <FaTimes size={11} />
                              </span>
                            )}
                          </td>
                          {/* Delete */}
                          <td className="py-2.5 px-2 text-center">
                            {item.delete ? (
                              <span className="inline-flex p-1 rounded bg-rose-100 text-rose-700">
                                <FaCheck size={11} />
                              </span>
                            ) : (
                              <span className="inline-flex p-1 rounded bg-slate-100 text-slate-300">
                                <FaTimes size={11} />
                              </span>
                            )}
                          </td>
                          {/* Scope / Description */}
                          <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                            {item.description}
                            {item.scope && (
                              <span className="ml-1.5 px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                                {item.scope}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-4 sm:px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">
                Enforced by Cloud Firestore Security Rules on project <code className="font-mono text-slate-700">sportsworld-5b1f6</code>
              </span>
              <button
                type="button"
                onClick={() => setShowPermissionsModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#032D59] text-white text-xs font-black hover:bg-[#0B5FA5] transition-colors cursor-pointer"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
