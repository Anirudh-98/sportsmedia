'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LogOut,
  Home,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { BlueZoneTreeLogo } from '@/components/brand/BrandLogos';
import { NotFoundView } from '@/components/common/NotFoundView';
import { NavItem } from './dashboardNav';

export type { NavItem };

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
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [navQuery, setNavQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayRoleTitle = role === 'student' ? 'Trainee Journalist' : roleTitle;

  const filteredNavItems = useMemo(() => {
    if (!navQuery.trim()) return navItems;
    const q = navQuery.trim().toLowerCase();
    return navItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [navQuery, navItems]);

  if (!isClient) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F7F8FB]">
        <div
          className="w-8 h-8 border-[3px] border-t-transparent rounded-full animate-spin mb-3"
          style={{ borderColor: `${themeColor} transparent ${themeColor} ${themeColor}` }}
        />
        <p className="text-sm font-medium text-slate-500">
          Authenticating {displayRoleTitle} session
        </p>
      </div>
    );
  }

  const isAuthorized = user && user.role === role;

  if (!isAuthorized) {
    return (
      <NotFoundView
        title="404 - Page Not Found"
        message="The requested route was not found on this server or you do not have permission to access it under strict zero-trust role isolation."
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] flex flex-col antialiased text-slate-800">
      {/* TOP APP BAR */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-100 h-16 flex items-center justify-between px-3 sm:px-6 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <Link href="/" className="hidden lg:flex items-center gap-2 shrink-0">
            <BlueZoneTreeLogo size={26} />
            <span className="text-base font-bold text-slate-900 leading-none">
              SportsMedia.World
            </span>
          </Link>

          <div className="hidden md:flex items-center relative w-full max-w-xs ml-1">
            <Search size={14} className="absolute left-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              placeholder="Search or type a command"
              className="w-full pl-9 pr-12 py-2.5 text-sm bg-slate-50 border border-slate-100 rounded-xl text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:bg-white focus:border-slate-200"
            />
            <kbd className="absolute right-2.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded-md px-1.5 py-0.5">
              ⌘F
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div
            className="hidden lg:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${themeColor}14`, color: themeColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
            <span>{displayRoleTitle}</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-50 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 border-2 border-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg border border-slate-100 p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="text-sm font-semibold text-slate-900">Notifications</span>
                  <span className="text-xs font-medium text-blue-600">3 new</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 rounded-lg bg-slate-50">
                    <p className="font-medium text-slate-800">Cloud sync complete</p>
                    <p className="text-xs text-slate-500 mt-0.5">All submissions auto-sync to the live database.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50">
                    <p className="font-medium text-slate-800">District finals live</p>
                    <p className="text-xs text-slate-500 mt-0.5">Scores and event coverage ready for reporting.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
              style={{ backgroundColor: themeColor }}
            >
              {user?.name?.[0] || role[0]}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-slate-900">
                {user?.name || 'Authorized User'}
              </span>
              <span className="text-xs text-slate-500 truncate max-w-[130px]">
                {user?.institution || user?.email}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            title="Sign out"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={17} />
          </button>
        </div>
      </header>

      {/* BODY: SIDEBAR + MAIN */}
      <div className="flex-1 flex w-full">
        <aside
          className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-100 flex flex-col justify-between p-3 transition-transform duration-200 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="space-y-0.5 overflow-y-auto">
            <div className="text-xs font-medium text-slate-400 px-3 py-2">
              {displayRoleTitle} &middot; {roleBadge}
            </div>

            {filteredNavItems.map((item, idx) => {
              const Icon = item.icon;
              const isExact = pathname === item.href;
              const isSubpath = item.href !== `/${role}/dashboard` && pathname.startsWith(item.href);
              const isDashboardFallback = idx === 0 && (pathname === `/${role}` || pathname === `/${role}/dashboard`);
              const isActive = isExact || isSubpath || isDashboardFallback;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  style={isActive ? { backgroundColor: themeColor } : {}}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={
                        isActive
                          ? { backgroundColor: 'rgba(255,255,255,0.25)', color: '#FFFFFF' }
                          : { backgroundColor: '#F1F5F9', color: '#64748B' }
                      }
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {filteredNavItems.length === 0 && (
              <p className="px-3 py-2 text-sm text-slate-400">No matching pages.</p>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-0.5">
            <Link
              href="/"
              className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Home size={16} />
              <span>Public website</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/30 backdrop-blur-xs lg:hidden"
          />
        )}

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
