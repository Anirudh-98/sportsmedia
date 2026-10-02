'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';

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

export function getDashboardPath(role: UserRole): string {
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

  // On mount: restore session from localStorage & sync with Firebase Auth
  useEffect(() => {
    let isMounted = true;

    // 1. Immediate restore from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sportsmedia_session');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.email && isMounted) {
            setUser(parsed);
          }
        } catch {
          console.warn('Invalid session in localStorage');
        }
      }
    }

    // 2. Listen to Firebase auth state changes
    if (auth) {
      try {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
          if (!isMounted) return;

          if (fbUser) {
            let role: UserRole = 'student';
            let name = fbUser.displayName || fbUser.email?.split('@')[0] || 'User';
            let institution = '';
            let avatar = fbUser.photoURL || '';

            if (db) {
              try {
                const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
                if (userDoc.exists()) {
                  const d = userDoc.data();
                  role = (d.role as UserRole) || role;
                  name = d.name || name;
                  institution = d.institution || institution;
                  avatar = d.avatar || avatar;
                }
              } catch (e) {
                console.warn('Could not read user profile from Firestore:', e);
              }
            }

            const session: UserSession = {
              id: fbUser.uid,
              name,
              email: fbUser.email || '',
              role,
              institution,
              avatar: avatar || PRESET_ACCOUNTS[role]?.avatar,
            };

            setUser(session);
            if (typeof window !== 'undefined') {
              localStorage.setItem('sportsmedia_session', JSON.stringify(session));
            }
          } else {
            // If logged out from Firebase, check if active session is a preset account
            if (typeof window !== 'undefined') {
              const saved = localStorage.getItem('sportsmedia_session');
              if (saved) {
                try {
                  const parsed = JSON.parse(saved);
                  const isPreset = Object.values(PRESET_ACCOUNTS).some(
                    (p) => p.email.toLowerCase() === parsed.email?.toLowerCase()
                  );
                  if (isPreset) {
                    setUser(parsed);
                    return;
                  }
                } catch {}
              }
            }
          }
        });

        return () => {
          isMounted = false;
          unsubscribe();
        };
      } catch (err) {
        console.warn('Firebase onAuthStateChanged error:', err);
      }
    }

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

      // 1. Check if email matches one of the preset demo accounts
      const matchedPreset = Object.values(PRESET_ACCOUNTS).find(
        (p) => p.email.toLowerCase() === cleanEmail
      );
      if (matchedPreset) {
        const session: UserSession = {
          id: matchedPreset.id,
          name: matchedPreset.name,
          email: matchedPreset.email,
          role: (targetRole || matchedPreset.role) as UserRole,
          institution: matchedPreset.institution || '',
          avatar: matchedPreset.avatar,
        };
        setUser(session);
        if (typeof window !== 'undefined') {
          localStorage.setItem('sportsmedia_session', JSON.stringify(session));
        }
        router.push(getDashboardPath(session.role));
        return session.role;
      }

      // 2. Authenticate with Firebase Auth
      let session: UserSession | null = null;

      if (auth) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
          const fbUser = userCredential.user;

          let role: UserRole = targetRole || 'student';
          let name = fbUser.displayName || cleanEmail.split('@')[0];
          let institution = '';
          let avatar = fbUser.photoURL || PRESET_ACCOUNTS[role]?.avatar;

          // Fetch user profile from Firestore
          if (db) {
            try {
              const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
              if (userDoc.exists()) {
                const data = userDoc.data();
                role = (data.role as UserRole) || role;
                name = data.name || name;
                institution = data.institution || institution;
                avatar = data.avatar || avatar;
              }
            } catch (docErr) {
              console.warn('Could not read user profile from Firestore:', docErr);
            }
          }

          session = {
            id: fbUser.uid,
            name,
            email: cleanEmail,
            role,
            institution,
            avatar,
          };
        } catch (authError: any) {
          const code = authError.code;
          if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
            throw new Error('Incorrect password. Please verify your credentials.');
          } else if (code === 'auth/too-many-requests') {
            throw new Error('Too many failed attempts. Please try again later.');
          }

          // Check registered users in localStorage fallback
          if (typeof window !== 'undefined') {
            const localUsers = JSON.parse(localStorage.getItem('sportsmedia_registered_users') || '[]');
            const found = localUsers.find((u: any) => u.email?.toLowerCase() === cleanEmail);
            if (found) {
              if (found.password && password && found.password !== password) {
                throw new Error('Incorrect password. Please verify your credentials.');
              }
              session = {
                id: found.id,
                name: found.name,
                email: found.email,
                role: found.role,
                institution: found.institution || '',
                avatar: found.avatar || PRESET_ACCOUNTS[found.role as UserRole]?.avatar,
              };
            }
          }

          if (!session) {
            if (code === 'auth/user-not-found') {
              throw new Error('No account found with this email. Please register first.');
            }
            throw new Error(authError.message || 'Authentication failed. Please check credentials.');
          }
        }
      } else {
        // Fallback if Firebase Auth is not active
        if (typeof window !== 'undefined') {
          const localUsers = JSON.parse(localStorage.getItem('sportsmedia_registered_users') || '[]');
          const found = localUsers.find((u: any) => u.email?.toLowerCase() === cleanEmail);
          if (found) {
            if (found.password && password && found.password !== password) {
              throw new Error('Incorrect password. Please verify your credentials.');
            }
            session = {
              id: found.id,
              name: found.name,
              email: found.email,
              role: found.role,
              institution: found.institution || '',
              avatar: found.avatar || PRESET_ACCOUNTS[found.role as UserRole]?.avatar,
            };
          }
        }

        if (!session) {
          throw new Error('No account found with this email. Please register first.');
        }
      }

      if (session) {
        setUser(session);
        if (typeof window !== 'undefined') {
          localStorage.setItem('sportsmedia_session', JSON.stringify(session));
        }
        router.push(getDashboardPath(session.role));
        return session.role;
      }

      throw new Error('Authentication failed. Please try again.');
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
      if ((data.role as any) === 'admin') {
        throw new Error('Administrator accounts cannot be self-registered.');
      }

      let uid = `usr-${Date.now()}`;

      // 1. Create account in Firebase Auth
      if (auth) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, data.password);
          uid = userCredential.user.uid;
          try {
            await updateProfile(userCredential.user, { displayName: data.name });
          } catch {}
        } catch (authError: any) {
          if (authError.code === 'auth/email-already-in-use') {
            throw new Error('An account with this email address already exists. Please log in.');
          }
          if (authError.code === 'auth/weak-password') {
            throw new Error('Password must be at least 6 characters long.');
          }
          console.warn('Firebase Auth user creation warning:', authError.message);
        }
      }

      // 2. Store user profile in Firestore
      const userProfile = {
        id: uid,
        name: data.name.trim(),
        email: cleanEmail,
        role: data.role,
        institution: data.institution || '',
        avatar: PRESET_ACCOUNTS[data.role]?.avatar,
        status: 'Active',
        isVerified: false,
        createdAt: new Date().toISOString(),
      };

      if (db) {
        try {
          await setDoc(doc(db, 'users', uid), userProfile, { merge: true });
        } catch (firestoreErr) {
          console.warn('Could not write user profile to Firestore:', firestoreErr);
        }
      }

      // 3. Cache in local registered users store
      if (typeof window !== 'undefined') {
        const existingUsers = JSON.parse(localStorage.getItem('sportsmedia_registered_users') || '[]');
        const updatedUsers = [
          { ...userProfile, password: data.password },
          ...existingUsers.filter((u: any) => u.email?.toLowerCase() !== cleanEmail),
        ];
        localStorage.setItem('sportsmedia_registered_users', JSON.stringify(updatedUsers));
      }

      // 4. Create active session and redirect
      const newSession: UserSession = {
        id: uid,
        name: data.name.trim(),
        email: cleanEmail,
        role: data.role as UserRole,
        institution: data.institution || '',
        avatar: PRESET_ACCOUNTS[data.role]?.avatar,
      };

      setUser(newSession);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sportsmedia_session', JSON.stringify(newSession));
      }
      router.push(getDashboardPath(newSession.role));
      return newSession.role;
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sportsmedia_session');
    }
    setUser(null);
    router.push('/login');
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
