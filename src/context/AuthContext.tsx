'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'student' | 'coach' | 'school' | 'sponsor' | 'admin';
export type RegistrableRole = Exclude<UserRole, 'admin'>;

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  avatar?: string;
}

export const PRESET_ACCOUNTS: Record<UserRole, UserSession> = {
  student: {
    id: 'usr-student-1',
    name: 'Anirudh',
    email: 'student@sportsmedia.world',
    role: 'student',
    institution: 'Sports Media Journalism School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  coach: {
    id: 'usr-coach-1',
    name: 'Coach Rajesh Sharma',
    email: 'coach@sportsmedia.world',
    role: 'coach',
    institution: 'NIS Athletics Academy & DPS Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  school: {
    id: 'usr-school-1',
    name: 'ABC International School',
    email: 'school@sportsmedia.world',
    role: 'school',
    institution: 'Hyderabad Sports Wing',
    avatar: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80',
  },
  sponsor: {
    id: 'usr-sponsor-1',
    name: 'BlueZone Sports Fund',
    email: 'sponsor@sportsmedia.world',
    role: 'sponsor',
    institution: 'Grassroots Sports Impact Foundation',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Super Administrator',
    email: 'admin@sportsmedia.world',
    role: 'admin',
    institution: 'SportsMedia.World Central HQ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
};

interface AuthContextType {
  user: UserSession | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string, targetRole?: UserRole, rememberMe?: boolean) => Promise<UserRole>;
  register: (data: {
    name: string;
    email: string;
    password?: string;
    role: RegistrableRole;
    institution?: string;
  }) => Promise<UserRole>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getDashboardPath(role: UserRole): string {
  switch (role) {
    case 'student':
      return '/student/dashboard';
    case 'coach':
      return '/coach/dashboard';
    case 'school':
      return '/school/dashboard';
    case 'sponsor':
      return '/sponsor/dashboard';
    case 'admin':
      return '/admin/dashboard';
    default:
      return '/';
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const router = useRouter();

  // On mount: check server session via /api/auth/me
  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) return;

        const data = await res.json();
        if (isMounted && data.success && data.authenticated && data.data?.user) {
          const u = data.data.user;
          setUser({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role as UserRole,
            institution: u.institution || '',
            avatar: u.avatar || PRESET_ACCOUNTS[u.role as UserRole]?.avatar,
          });
        }
      } catch (err) {
        console.warn('Could not verify active session:', err);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(
    async (email: string, password?: string, targetRole?: UserRole, rememberMe: boolean = true): Promise<UserRole> => {
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail) {
        throw new Error('Please enter your registered email address.');
      }
      if (!password || password.length < 6) {
        throw new Error('Please enter a valid password (minimum 6 characters).');
      }

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password,
          targetRole,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Authentication failed. Please check your credentials.');
      }

      const userData = json.data.user;
      const session: UserSession = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole,
        institution: userData.institution || '',
        avatar: userData.avatar || PRESET_ACCOUNTS[userData.role as UserRole]?.avatar,
      };

      setUser(session);
      router.push(getDashboardPath(session.role));
      return session.role;
    },
    [router]
  );

  const register = useCallback(
    async (data: {
      name: string;
      email: string;
      password?: string;
      role: RegistrableRole;
      institution?: string;
    }): Promise<UserRole> => {
      const cleanEmail = data.email.trim().toLowerCase();

      if (!data.name.trim()) {
        throw new Error('Please enter your full name or institution name.');
      }
      if (!cleanEmail) {
        throw new Error('Please enter a valid email address.');
      }
      if (!data.password || data.password.length < 6) {
        throw new Error('Please choose a password with at least 6 characters.');
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: cleanEmail,
          password: data.password,
          role: data.role,
          institution: data.institution,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Could not create account. Please try again.');
      }

      const userData = json.data.user;
      const newSession: UserSession = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role as UserRole,
        institution: userData.institution || '',
        avatar: userData.avatar || PRESET_ACCOUNTS[userData.role as UserRole]?.avatar,
      };

      setUser(newSession);
      router.push(getDashboardPath(newSession.role));
      return newSession.role;
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
