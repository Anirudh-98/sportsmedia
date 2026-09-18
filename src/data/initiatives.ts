export interface Initiative {
  id: string;
  title: string;
  description: string;
  iconName: 'trophy' | 'gallery' | 'target' | 'fitness' | 'education' | 'scholarship';
  link: string;
  badge?: string;
}

export const INITIATIVES: Initiative[] = [
  {
    id: 'events',
    title: 'SPORTS EVENTS',
    description: 'Competitions & Tournaments',
    iconName: 'trophy',
    link: '#events',
    badge: 'Live & Upcoming'
  },
  {
    id: 'gallery',
    title: 'SPORTS GALLERY',
    description: 'Photos & Videos',
    iconName: 'gallery',
    link: '#gallery',
    badge: '10K+ Media'
  },
  {
    id: 'talent-hunt',
    title: 'TALENT HUNT',
    description: 'Find the Next Champion',
    iconName: 'target',
    link: '#talent-hunt',
    badge: 'Open Now'
  },
  {
    id: 'fitness-zone',
    title: 'FITNESS ZONE',
    description: 'Health & Fitness Tips',
    iconName: 'fitness',
    link: '#fitness',
    badge: 'Daily Drills'
  },
  {
    id: 'education-career',
    title: 'EDUCATION & CAREER',
    description: 'Guidance for Athletes',
    iconName: 'education',
    link: '#education',
    badge: 'Counseling'
  },
  {
    id: 'scholarships',
    title: 'SPORTS SCHOLARSHIPS',
    description: 'Opportunities & Support',
    iconName: 'scholarship',
    link: '#scholarship',
    badge: '₹50 Lakhs Pool'
  }
];
