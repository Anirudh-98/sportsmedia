import React from 'react';
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  Clock,
  Newspaper,
  Camera,
  Award,
  Users,
  Activity,
  Trophy,
  Film,
  Calendar,
  Building2,
  MapPin,
  UserCheck,
  Shield,
  Handshake,
  Heart,
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
} from 'lucide-react';
import { UserRole } from '@/context/AuthContext';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  badge?: string | number;
}

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/student/dashboard', icon: GraduationCap },
  { label: 'My Learning', href: '/student/learning', icon: BookOpen },
  { label: 'Courses', href: '/student/courses', icon: PlayCircle },
  { label: 'Assignments', href: '/student/assignments', icon: Clock, badge: '2 Due' },
  { label: 'My Articles', href: '/student/articles', icon: Newspaper },
  { label: 'Media Portfolio', href: '/student/portfolio', icon: Camera },
  { label: 'Certificates', href: '/student/certificates', icon: Award },
];

export const COACH_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/coach/dashboard', icon: LayoutDashboard },
  { label: 'My Athletes', href: '/coach/athletes', icon: Users },
  { label: 'Performance', href: '/coach/performance', icon: Activity },
  { label: 'Achievements', href: '/coach/achievements', icon: Trophy },
  { label: 'Media Uploads', href: '/coach/media', icon: Film },
  { label: 'Events & Matches', href: '/coach/events', icon: Calendar },
];

export const SCHOOL_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/school/dashboard', icon: Building2 },
  { label: 'School Profile', href: '/school/profile', icon: MapPin },
  { label: 'Students', href: '/school/students', icon: Users },
  { label: 'Coaches', href: '/school/coaches', icon: UserCheck },
  { label: 'Sports & Teams', href: '/school/teams', icon: Shield },
  { label: 'Events', href: '/school/events', icon: Calendar },
  { label: 'Achievements', href: '/school/achievements', icon: Trophy },
];

export const SPONSOR_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/sponsor/dashboard', icon: Handshake },
  { label: 'Athlete Directory', href: '/sponsor/directory', icon: Users },
  { label: 'Sports Programs', href: '/sponsor/programs', icon: Trophy },
  { label: 'My Sponsorships', href: '/sponsor/sponsorships', icon: Heart },
  { label: 'Impact & Analytics', href: '/sponsor/impact', icon: TrendingUp },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Pending Approvals', href: '/admin/approvals', icon: Clock, badge: 'Live' },
  { label: 'Content Moderation', href: '/admin/moderation', icon: Newspaper },
  { label: 'User Directory', href: '/admin/users', icon: Users },
  { label: 'Platform Settings', href: '/admin/settings', icon: ShieldCheck },
];

export const ROLE_NAV_CONFIG: Record<UserRole, NavItem[]> = {
  student: STUDENT_NAV_ITEMS,
  coach: COACH_NAV_ITEMS,
  school: SCHOOL_NAV_ITEMS,
  sponsor: SPONSOR_NAV_ITEMS,
  admin: ADMIN_NAV_ITEMS,
};
