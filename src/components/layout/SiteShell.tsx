'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopHeader } from '../header/TopHeader';
import { MainNavbar } from '../navigation/MainNavbar';
import { Footer } from '../footer/Footer';
import { AuthModal } from '../modals/AuthModal';

interface SiteShellProps {
  children: React.ReactNode;
}

export const SiteShell: React.FC<SiteShellProps> = ({ children }) => {
  const router = useRouter();
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastNotification(message);
    setTimeout(() => setToastNotification(null), 3500);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    router.push(`/sports?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen w-full bg-white text-slate-900 font-sans flex flex-col antialiased">
      {/* Search / Action Toast */}
      {toastNotification && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#032D59] text-white px-3.5 py-2 rounded-md shadow-2xl border border-blue-400/40 text-xs font-bold animate-in fade-in slide-in-from-bottom-3">
          {toastNotification}
        </div>
      )}

      {/* 1. TOP HEADER (Logo, Pillars, SPORTSMEDIA.WORLD, Search, Auth) */}
      <TopHeader
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onSearch={handleSearch}
      />

      {/* 2. MAIN NAVBAR (Home, About Us, Sports & Games, etc.) */}
      <MainNavbar />

      {/* 3. CENTER CONTENT AREA (Renders the current page) */}
      <main className="w-full flex-1 flex flex-col">{children}</main>

      {/* 4. GLOBAL FOOTER */}
      <Footer />

      {/* GLOBAL AUTH MODAL */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
      />
    </div>
  );
};
