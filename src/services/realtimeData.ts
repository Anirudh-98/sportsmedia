'use client';

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TOP_ATHLETES, Athlete } from '@/data/athletes';
import { UPCOMING_EVENTS, SportsEvent } from '@/data/events';

// ==========================================
// 1. DATA TYPES
// ==========================================

export interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  modulesCount: number;
  completedModules: number;
  nextLesson: string;
  status: 'in_progress' | 'completed' | 'not_started';
}

export interface Assignment {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  studentName: string;
  score?: string;
  feedback?: string;
  submittedAt?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: 'draft' | 'pending_approval' | 'published';
  authorName: string;
  authorRole: string;
  views: number;
  publishedAt: string;
  coverImage?: string;
}

export interface CoachAthlete {
  id: string;
  name: string;
  sport: string;
  performance: number; // percentage e.g. 92
  school: string;
  recentAchievement: string;
  medals: number;
  phone?: string;
  photo?: string;
  coachName: string;
  sponsorName?: string;
}

export interface SchoolInfo {
  name: string;
  city: string;
  principal: string;
  sportsCoordinator: string;
  studentsCount: number;
  coachesCount: number;
  sportsCount: number;
  achievementsCount: number;
  sportsBreakdown: { sport: string; athletes: number; color: string }[];
}

export interface SponsorshipProgram {
  id: string;
  title: string;
  sport: string;
  location: string;
  athletesCount: number;
  requirement: string;
  status: 'active' | 'open' | 'funded';
  targetAmount: string;
  raisedAmount: string;
  sponsorName?: string;
}

export interface PendingApproval {
  id: string;
  type: 'Student Registration' | 'Coach Registration' | 'School Verification' | 'Sponsor Verification' | 'Article Moderation' | 'Event Submission';
  title: string;
  submittedBy: string;
  role: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  details: string;
}

export interface MediaUpload {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'certificate' | 'proof';
  url: string;
  athleteName: string;
  sport: string;
  uploadedBy: string;
  uploadedAt: string;
}

// ==========================================
// 2. INITIAL REAL DATA SEEDS
// ==========================================

const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Sports Reporting & Writing',
    category: 'Print & Digital',
    progress: 80,
    modulesCount: 10,
    completedModules: 8,
    nextLesson: 'Writing a Match Report',
    status: 'in_progress',
  },
  {
    id: 'course-2',
    title: 'Sports Photography & DSLR Handling',
    category: 'Visual Media',
    progress: 100,
    modulesCount: 8,
    completedModules: 8,
    nextLesson: 'Course Completed',
    status: 'completed',
  },
  {
    id: 'course-3',
    title: 'Mobile Video Journalism (MoJo)',
    category: 'Broadcast & Social',
    progress: 65,
    modulesCount: 12,
    completedModules: 8,
    nextLesson: '4K Smartphone Gimbal Framing',
    status: 'in_progress',
  },
  {
    id: 'course-4',
    title: 'Interview & Athlete Profiling',
    category: 'Features',
    progress: 100,
    modulesCount: 6,
    completedModules: 6,
    nextLesson: 'Course Completed',
    status: 'completed',
  },
  {
    id: 'course-5',
    title: 'Live Event & Match Commentary',
    category: 'Live Broadcasting',
    progress: 40,
    modulesCount: 8,
    completedModules: 3,
    nextLesson: 'Scoreboard Live Sync Voiceover',
    status: 'in_progress',
  },
  {
    id: 'course-6',
    title: 'Social Media & YouTube Sports Content',
    category: 'Digital Reach',
    progress: 30,
    modulesCount: 8,
    completedModules: 2,
    nextLesson: 'Viral Short-form Highlights Editing',
    status: 'in_progress',
  },
  {
    id: 'course-7',
    title: 'Sports Ethics & Responsible Journalism',
    category: 'Legal & Ethics',
    progress: 15,
    modulesCount: 6,
    completedModules: 1,
    nextLesson: 'Minors & Student Athlete Privacy Laws',
    status: 'in_progress',
  },
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    title: 'District Finals Match Report (500 Words)',
    courseTitle: 'Sports Reporting & Writing',
    dueDate: '25 Sep 2026',
    status: 'pending',
    studentName: 'Anirudh',
  },
  {
    id: 'asg-2',
    title: 'Under-16 Athlete Profile Interview Piece',
    courseTitle: 'Interview & Athlete Profiling',
    dueDate: '28 Sep 2026',
    status: 'pending',
    studentName: 'Anirudh',
  },
  {
    id: 'asg-3',
    title: 'Track & Field Action Photo Essay (5 Shots)',
    courseTitle: 'Sports Photography',
    dueDate: '30 Sep 2026',
    status: 'graded',
    studentName: 'Anirudh',
    score: '96 / 100',
    feedback: 'Exceptional framing of sprint finish line expressions. Well accredited.',
  },
];

const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Inside the Andhra Veterans Premier League Season 2 Clash of Titans',
    excerpt: 'A ringside analysis of how SS Interiors overcame Go Sportz in the thrilling semi-final at Doctors Ground, Vijayawada.',
    category: 'Cricket',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Student Journalist',
    views: 1420,
    publishedAt: '12 Sep 2026',
  },
  {
    id: 'art-2',
    title: 'From Grassroots to State Podium: Ananya Reddy’s Badminton Odyssey',
    excerpt: 'Tracing the rigorous NIS coaching regimen and multi-court agility routines powering Hyderabad’s rising shuttler.',
    category: 'Badminton',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Student Journalist',
    views: 980,
    publishedAt: '08 Sep 2026',
  },
  {
    id: 'art-3',
    title: 'The Sprint Revolution in Telangana Schools: A Data-Driven Report',
    excerpt: 'Analyzing the 100m sprint timing progression across district government schools equipped with professional timing gates.',
    category: 'Athletics',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Student Journalist',
    views: 740,
    publishedAt: '01 Sep 2026',
  },
  {
    id: 'art-4',
    title: 'Next Gen Cricket Player Auction: Key Takeaways for Academy Scouts',
    excerpt: 'How data analytics and live video streaming are transforming grassroots talent scouting in South India.',
    category: 'Cricket',
    status: 'pending_approval',
    authorName: 'Anirudh',
    authorRole: 'Student Journalist',
    views: 0,
    publishedAt: 'Pending Review',
  },
];

const INITIAL_COACH_ATHLETES: CoachAthlete[] = [
  {
    id: 'ath-1',
    name: 'Rohit Kumar',
    sport: 'Athletics (100m & 200m)',
    performance: 92,
    school: 'DPS Hyderabad',
    recentAchievement: 'New State Athletics Record (10.42s in 100m Sprint)',
    medals: 8,
    photo: '/image/athelete.png',
    coachName: 'Coach Rajesh Sharma',
    sponsorName: 'BlueZone Sports Fund',
  },
  {
    id: 'ath-2',
    name: 'Ananya Reddy',
    sport: 'Badminton (Singles)',
    performance: 89,
    school: 'Oakridge International School',
    recentAchievement: 'Won District Badminton Championship (U-16)',
    medals: 12,
    photo: '/image/athelete1.png',
    coachName: 'Coach Rajesh Sharma',
    sponsorName: 'SportsMedia Talent Grant',
  },
  {
    id: 'ath-3',
    name: 'Vikram Singh',
    sport: 'Cricket (All-rounder)',
    performance: 86,
    school: 'Chirec Public School',
    recentAchievement: 'Selected for State Under-19 Camp squad',
    medals: 5,
    photo: '/image/athelete2.png',
    coachName: 'Coach Rajesh Sharma',
  },
  {
    id: 'ath-4',
    name: 'Sara Khan',
    sport: 'Swimming (100m Freestyle)',
    performance: 94,
    school: 'Telangana Sports School',
    recentAchievement: 'Gold Medal at South Zone Aquatics Meet',
    medals: 15,
    photo: '/image/athelete3.png',
    coachName: 'Coach Rajesh Sharma',
    sponsorName: 'Decathlon Sports Foundation',
  },
];

const INITIAL_SCHOOL_INFO: SchoolInfo = {
  name: 'ABC International School',
  city: 'Hyderabad, Telangana',
  principal: 'Dr. R. K. Sharma',
  sportsCoordinator: 'M. Swaminathan (Senior PET)',
  studentsCount: 850,
  coachesCount: 12,
  sportsCount: 14,
  achievementsCount: 320,
  sportsBreakdown: [
    { sport: 'Athletics', athletes: 280, color: 'bg-[#1565C0]' },
    { sport: 'Football', athletes: 210, color: 'bg-[#168C45]' },
    { sport: 'Cricket', athletes: 195, color: 'bg-[#F28C28]' },
    { sport: 'Badminton', athletes: 140, color: 'bg-[#7E378B]' },
    { sport: 'Basketball', athletes: 95, color: 'bg-[#E5232E]' },
  ],
};

const INITIAL_SPONSOR_PROGRAMS: SponsorshipProgram[] = [
  {
    id: 'prog-1',
    title: 'Grassroots Athletics Equipment & Nutrition Drive',
    sport: 'Athletics',
    location: 'Telangana & Andhra Pradesh',
    athletesCount: 25,
    requirement: 'Spikes, Tournament Travel & Nutrition Kits',
    status: 'active',
    targetAmount: '₹5,00,000',
    raisedAmount: '₹4,20,000',
    sponsorName: 'BlueZone Sports Fund',
  },
  {
    id: 'prog-2',
    title: 'Rural Girls Badminton Coaching Scholarship',
    sport: 'Badminton',
    location: 'Warangal & Nizamabad',
    athletesCount: 18,
    requirement: 'Carbon Racquets, Court Fees & NIS Coaching',
    status: 'active',
    targetAmount: '₹3,50,000',
    raisedAmount: '₹3,50,000',
    sponsorName: 'BlueZone Sports Fund',
  },
  {
    id: 'prog-3',
    title: 'Under-16 Fast Bowlers Conditioning Camp',
    sport: 'Cricket',
    location: 'Hyderabad District',
    athletesCount: 15,
    requirement: 'Physiotherapy & High Performance Turf Shoes',
    status: 'open',
    targetAmount: '₹4,00,000',
    raisedAmount: '₹2,50,000',
  },
  {
    id: 'prog-4',
    title: 'Para-Athlete Equipment & Wheelchair Support',
    sport: 'Para Sports',
    location: 'Pan India',
    athletesCount: 12,
    requirement: 'Custom Sports Wheelchairs & Travel Stipends',
    status: 'open',
    targetAmount: '₹6,00,000',
    raisedAmount: '₹2,30,000',
  },
];

const INITIAL_PENDING_APPROVALS: PendingApproval[] = [
  {
    id: 'appr-1',
    type: 'Article Moderation',
    title: 'Next Gen Cricket Player Auction Analysis',
    submittedBy: 'Anirudh (Student)',
    role: 'Student Journalist',
    timestamp: '2 hours ago',
    status: 'pending',
    details: 'Draft article examining grassroots analytics and player scouting bids.',
  },
  {
    id: 'appr-2',
    type: 'Coach Registration',
    title: 'Senior NIS Badminton Coach Verification',
    submittedBy: 'Coach Vikram Rao',
    role: 'Coach',
    timestamp: '4 hours ago',
    status: 'pending',
    details: 'Submitted NIS Diploma in Sports Coaching and SAI accreditation proofs.',
  },
  {
    id: 'appr-3',
    type: 'School Verification',
    title: 'St. Andrews High School Sports Wing',
    submittedBy: 'Principal Sister Mary',
    role: 'School',
    timestamp: 'Yesterday',
    status: 'pending',
    details: 'Application to register 640 student athletes and 8 sports disciplines.',
  },
  {
    id: 'appr-4',
    type: 'Sponsor Verification',
    title: 'Decathlon South Zone Talent Grant Application',
    submittedBy: 'Decathlon Foundation Lead',
    role: 'Sponsor',
    timestamp: 'Yesterday',
    status: 'pending',
    details: 'Corporate CSR sponsorship proposal targeting 50 rural athletics kits.',
  },
  {
    id: 'appr-5',
    type: 'Event Submission',
    title: 'Inter-School Invitational Aquatics Meet 2026',
    submittedBy: 'Hyderabad Aquatic Association',
    role: 'Coach / Organizer',
    timestamp: '2 days ago',
    status: 'pending',
    details: 'Live scoring & event live stream coverage requested for 32 school teams.',
  },
];

const INITIAL_MEDIA_UPLOADS: MediaUpload[] = [
  {
    id: 'med-1',
    title: 'Rohit Kumar 10.42s 100m Sprint Finish',
    type: 'photo',
    url: '/image/athelete.png',
    athleteName: 'Rohit Kumar',
    sport: 'Athletics',
    uploadedBy: 'Coach Rajesh Sharma',
    uploadedAt: '15 Sep 2026',
  },
  {
    id: 'med-2',
    title: 'Ananya Reddy District Trophy Handover',
    type: 'photo',
    url: '/image/athelete1.png',
    athleteName: 'Ananya Reddy',
    sport: 'Badminton',
    uploadedBy: 'Coach Rajesh Sharma',
    uploadedAt: '14 Sep 2026',
  },
  {
    id: 'med-3',
    title: 'Under-19 State Selection Certificate',
    type: 'certificate',
    url: '/image/athelete2.png',
    athleteName: 'Vikram Singh',
    sport: 'Cricket',
    uploadedBy: 'Coach Rajesh Sharma',
    uploadedAt: '12 Sep 2026',
  },
];

// ==========================================
// 3. REACTIVE STORAGE WITH FIRESTORE FALLBACK
// ==========================================

class RealtimeStore {
  private listeners: { [key: string]: Set<(data: any) => void> } = {};

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key && e.key.startsWith('sm_realtime_')) {
          const key = e.key.replace('sm_realtime_', '');
          this.emit(key, this.get(key, null));
        }
      });
    }
  }

  get<T>(key: string, defaultVal: T): T {
    if (typeof window === 'undefined') return defaultVal;
    try {
      const stored = localStorage.getItem(`sm_realtime_${key}`);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`sm_realtime_${key}`, JSON.stringify(value));
      this.emit(key, value);
    } catch (e) {
      console.error('Error saving to realtime storage:', e);
    }
  }

  subscribe<T>(key: string, initialDefault: T, callback: (data: T) => void): () => void {
    if (!this.listeners[key]) {
      this.listeners[key] = new Set();
    }
    this.listeners[key].add(callback);

    const current = this.get<T>(key, initialDefault);
    callback(current);

    return () => {
      this.listeners[key]?.delete(callback);
    };
  }

  private emit(key: string, data: any) {
    if (this.listeners[key]) {
      this.listeners[key].forEach((cb) => {
        try {
          cb(data);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }
}

const store = new RealtimeStore();

// ==========================================
// 4. PUBLIC REALTIME HOOKS & ACTIONS
// ==========================================

export const subscribeCourses = (callback: (courses: Course[]) => void) => {
  return store.subscribe<Course[]>('courses', INITIAL_COURSES, callback);
};

export const subscribeAssignments = (callback: (assignments: Assignment[]) => void) => {
  return store.subscribe<Assignment[]>('assignments', INITIAL_ASSIGNMENTS, callback);
};

export const submitAssignment = (data: {
  assignmentId: string;
  notes?: string;
  studentName: string;
}) => {
  const assignments = store.get<Assignment[]>('assignments', INITIAL_ASSIGNMENTS);
  const updated = assignments.map((asg) =>
    asg.id === data.assignmentId
      ? { ...asg, status: 'submitted' as const, submittedAt: 'Just now' }
      : asg
  );
  store.set('assignments', updated);

  addPendingApproval({
    type: 'Student Registration',
    title: `Assignment Submission: ${assignments.find((a) => a.id === data.assignmentId)?.title || 'Assignment'}`,
    submittedBy: data.studentName,
    role: 'Student Journalist',
    details: data.notes || 'Student submitted completed report for grading.',
  });
};

export const subscribeArticles = (callback: (articles: Article[]) => void) => {
  return store.subscribe<Article[]>('articles', INITIAL_ARTICLES, callback);
};

export const submitArticle = (data: {
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  authorRole: string;
}) => {
  const articles = store.get<Article[]>('articles', INITIAL_ARTICLES);
  const newArticle: Article = {
    id: `art-${Date.now()}`,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    status: 'pending_approval',
    authorName: data.authorName,
    authorRole: data.authorRole,
    views: 0,
    publishedAt: 'Pending Review',
  };
  store.set('articles', [newArticle, ...articles]);

  addPendingApproval({
    type: 'Article Moderation',
    title: data.title,
    submittedBy: `${data.authorName} (${data.authorRole})`,
    role: data.authorRole,
    details: data.excerpt,
  });

  return newArticle;
};

export const subscribeCoachAthletes = (callback: (athletes: CoachAthlete[]) => void) => {
  return store.subscribe<CoachAthlete[]>('coach_athletes', INITIAL_COACH_ATHLETES, callback);
};

export const addCoachAthlete = (data: Omit<CoachAthlete, 'id'>) => {
  const athletes = store.get<CoachAthlete[]>('coach_athletes', INITIAL_COACH_ATHLETES);
  const newAthlete: CoachAthlete = {
    ...data,
    id: `ath-${Date.now()}`,
  };
  store.set('coach_athletes', [newAthlete, ...athletes]);

  addPendingApproval({
    type: 'Coach Registration',
    title: `New Athlete Enrolled: ${data.name} (${data.sport})`,
    submittedBy: data.coachName,
    role: 'Coach',
    details: `Performance baseline: ${data.performance}%, School: ${data.school}`,
  });

  return newAthlete;
};

export const subscribeSchoolInfo = (callback: (school: SchoolInfo) => void) => {
  return store.subscribe<SchoolInfo>('school_info', INITIAL_SCHOOL_INFO, callback);
};

export const updateSchoolInfo = (data: Partial<SchoolInfo>) => {
  const current = store.get<SchoolInfo>('school_info', INITIAL_SCHOOL_INFO);
  const updated = { ...current, ...data };
  store.set('school_info', updated);
  return updated;
};

export const subscribeSponsorshipPrograms = (callback: (programs: SponsorshipProgram[]) => void) => {
  return store.subscribe<SponsorshipProgram[]>('sponsorship_programs', INITIAL_SPONSOR_PROGRAMS, callback);
};

export const sponsorAthleteOrProgram = (data: {
  programId?: string;
  athleteName?: string;
  sponsorName: string;
  amount: string;
}) => {
  const programs = store.get<SponsorshipProgram[]>('sponsorship_programs', INITIAL_SPONSOR_PROGRAMS);
  if (data.programId) {
    const updated = programs.map((p) =>
      p.id === data.programId
        ? { ...p, raisedAmount: p.targetAmount, sponsorName: data.sponsorName, status: 'active' as const }
        : p
    );
    store.set('sponsorship_programs', updated);
  }

  if (data.athleteName) {
    const athletes = store.get<CoachAthlete[]>('coach_athletes', INITIAL_COACH_ATHLETES);
    const updatedAthletes = athletes.map((a) =>
      a.name.toLowerCase() === data.athleteName?.toLowerCase()
        ? { ...a, sponsorName: data.sponsorName }
        : a
    );
    store.set('coach_athletes', updatedAthletes);
  }

  addPendingApproval({
    type: 'Sponsor Verification',
    title: `New Sponsorship Commitment: ${data.amount}`,
    submittedBy: data.sponsorName,
    role: 'Sponsor',
    details: `Allocated to ${data.athleteName || 'Program funding'}. Awaiting fund disbursement confirmation.`,
  });
};

export const subscribeMediaUploads = (callback: (media: MediaUpload[]) => void) => {
  return store.subscribe<MediaUpload[]>('media_uploads', INITIAL_MEDIA_UPLOADS, callback);
};

export const addMediaUpload = (data: Omit<MediaUpload, 'id' | 'uploadedAt'>) => {
  const mediaList = store.get<MediaUpload[]>('media_uploads', INITIAL_MEDIA_UPLOADS);
  const newMedia: MediaUpload = {
    ...data,
    id: `med-${Date.now()}`,
    uploadedAt: 'Just now',
  };
  store.set('media_uploads', [newMedia, ...mediaList]);
  return newMedia;
};

export const subscribePendingApprovals = (callback: (approvals: PendingApproval[]) => void) => {
  return store.subscribe<PendingApproval[]>('pending_approvals', INITIAL_PENDING_APPROVALS, callback);
};

export const addPendingApproval = (data: Omit<PendingApproval, 'id' | 'timestamp' | 'status'>) => {
  const approvals = store.get<PendingApproval[]>('pending_approvals', INITIAL_PENDING_APPROVALS);
  const newApproval: PendingApproval = {
    ...data,
    id: `appr-${Date.now()}`,
    timestamp: 'Just now',
    status: 'pending',
  };
  store.set('pending_approvals', [newApproval, ...approvals]);
};

export const updateApprovalStatus = (id: string, status: 'approved' | 'rejected') => {
  const approvals = store.get<PendingApproval[]>('pending_approvals', INITIAL_PENDING_APPROVALS);
  const target = approvals.find((a) => a.id === id);

  const updated = approvals.map((a) => (a.id === id ? { ...a, status } : a));
  store.set('pending_approvals', updated);

  if (target && target.type === 'Article Moderation' && status === 'approved') {
    const articles = store.get<Article[]>('articles', INITIAL_ARTICLES);
    const updatedArticles = articles.map((art) =>
      art.title.toLowerCase() === target.title.toLowerCase()
        ? { ...art, status: 'published' as const, publishedAt: 'Today', views: 1 }
        : art
    );
    store.set('articles', updatedArticles);
  }
};
