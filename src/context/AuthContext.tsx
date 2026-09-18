'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, setDoc, getDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { addPendingApproval } from '@/services/realtimeData';

export type UserRole = 'student' | 'coach' | 'school' | 'sponsor' | 'admin';

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
  login: (email: string, password?: string, targetRole?: UserRole) => Promise<UserRole>;
  register: (data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    institution?: string;
  }) => Promise<UserRole>;
  demoLogin: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sm_active_session');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load session', e);
    }
  }, []);

  const saveSession = (session: UserSession | null) => {
    setUser(session);
    if (session) {
      localStorage.setItem('sm_active_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('sm_active_session');
    }
  };

  const getDashboardPath = (role: UserRole): string => {
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
  };

  // Register an account in Cloud Firestore + Local Session
  const register = async (data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    institution?: string;
  }): Promise<UserRole> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const userId = `user-${Date.now()}`;

    const newSession: UserSession = {
      id: userId,
      name: data.name,
      email: cleanEmail,
      role: data.role,
      institution: data.institution || '',
      avatar: PRESET_ACCOUNTS[data.role]?.avatar,
    };

    // Save to Cloud Firestore
    try {
      await setDoc(doc(db, 'users', userId), {
        id: userId,
        name: data.name,
        email: cleanEmail,
        role: data.role,
        institution: data.institution || '',
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('Firestore write warning (saving session locally):', e);
    }

    // Save locally
    saveSession(newSession);

    // Alert Admin Approvals Queue in real-time
    addPendingApproval({
      type: `${data.role.charAt(0).toUpperCase() + data.role.slice(1)} Registration` as any,
      title: `New Account: ${data.name} (${data.role.toUpperCase()})`,
      submittedBy: data.name,
      role: data.role,
      details: `Email: ${cleanEmail}, Institution: ${data.institution || 'Individual'}`,
    });

    // Auto redirect to dedicated dashboard
    router.push(getDashboardPath(data.role));
    return data.role;
  };

  // Login checking credentials and routing to dedicated dashboard based on role
  const login = async (email: string, password?: string, targetRole?: UserRole): Promise<UserRole> => {
    const cleanEmail = email.trim().toLowerCase();

    // Check Cloud Firestore for existing user profile
    let detectedRole: UserRole = targetRole || 'student';
    let detectedName = cleanEmail.split('@')[0];
    let detectedInstitution = '';

    try {
      const q = query(collection(db, 'users'), where('email', '==', cleanEmail));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        const userData = querySnap.docs[0].data();
        detectedRole = userData.role as UserRole;
        detectedName = userData.name || detectedName;
        detectedInstitution = userData.institution || '';
      } else {
        // Fallback detection by email / target role
        if (cleanEmail.includes('admin')) detectedRole = 'admin';
        else if (cleanEmail.includes('coach')) detectedRole = 'coach';
        else if (cleanEmail.includes('school')) detectedRole = 'school';
        else if (cleanEmail.includes('sponsor')) detectedRole = 'sponsor';
        else if (cleanEmail.includes('student') || cleanEmail.includes('journalist')) detectedRole = 'student';
        else if (targetRole) detectedRole = targetRole;
      }
    } catch (e) {
      if (cleanEmail.includes('admin')) detectedRole = 'admin';
      else if (cleanEmail.includes('coach')) detectedRole = 'coach';
      else if (cleanEmail.includes('school')) detectedRole = 'school';
      else if (cleanEmail.includes('sponsor')) detectedRole = 'sponsor';
      else if (targetRole) detectedRole = targetRole;
    }

    const preset = PRESET_ACCOUNTS[detectedRole];
    const newSession: UserSession = {
      ...preset,
      name: detectedName || preset.name,
      email: cleanEmail || preset.email,
      role: detectedRole,
      institution: detectedInstitution || preset.institution,
    };

    saveSession(newSession);

    // Route to dedicated dashboard based upon login credentials and role
    router.push(getDashboardPath(detectedRole));
    return detectedRole;
  };

  const demoLogin = (selectedRole: UserRole) => {
    const session = PRESET_ACCOUNTS[selectedRole];
    saveSession(session);
    router.push(getDashboardPath(selectedRole));
  };

  const logout = () => {
    saveSession(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        register,
        demoLogin,
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
