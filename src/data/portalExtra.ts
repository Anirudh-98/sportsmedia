export interface Coach {
  id: string;
  name: string;
  role: string;
  sport: string;
  experience: string;
  institution: string;
  athletesTrained: number;
}

export const COACHES_LIST: Coach[] = [
  {
    id: 'coach-1',
    name: 'Coach R. Srinivas Rao',
    role: 'Senior Athletics Director & PET Master',
    sport: 'Track & Field / Athletics',
    experience: '18+ Years',
    institution: 'DPS Sports Academy, Hyderabad',
    athletesTrained: 650
  },
  {
    id: 'coach-2',
    name: 'Sumanth Varma',
    role: 'NIS Certified Football Head Coach',
    sport: 'Football',
    experience: '12 Years',
    institution: 'State Youth Development League',
    athletesTrained: 420
  },
  {
    id: 'coach-3',
    name: 'Lakshmi Priya Devi',
    role: 'Badminton High Performance Coach',
    sport: 'Badminton',
    experience: '14 Years',
    institution: 'Gopichand Sports Center',
    athletesTrained: 380
  },
  {
    id: 'coach-4',
    name: 'K. Venkatesh',
    role: 'Cricket Head Coach & BCCI Level 2',
    sport: 'Cricket',
    experience: '16 Years',
    institution: 'Hyderabad Junior Cricket Association',
    athletesTrained: 800
  }
];

export interface SportsJob {
  id: string;
  title: string;
  institution: string;
  location: string;
  type: string;
  salary: string;
  deadline: string;
}

export const SPORTS_JOBS: SportsJob[] = [
  {
    id: 'job-1',
    title: 'Physical Education Teacher (PET) - Senior School',
    institution: 'Silver Oaks International School',
    location: 'Hyderabad, Telangana',
    type: 'Full Time',
    salary: '₹4.5 - ₹6.5 LPA',
    deadline: '15-June 2025'
  },
  {
    id: 'job-2',
    title: 'Assistant Football Coach (Youth Academy)',
    institution: 'Blue Zone Sports Academy',
    location: 'Hyderabad, Telangana',
    type: 'Full Time',
    salary: '₹3.6 - ₹5.0 LPA',
    deadline: '20-June 2025'
  },
  {
    id: 'job-3',
    title: 'Sports Physiotherapist & Injury Rehabilitation',
    institution: 'Gachibowli Sports Complex',
    location: 'Hyderabad, Telangana',
    type: 'Contract / Full Time',
    salary: '₹6.0 - ₹9.0 LPA',
    deadline: '28-June 2025'
  },
  {
    id: 'job-4',
    title: 'Swimming Coach (Fina Certified)',
    institution: 'Oakridge International Campus',
    location: 'Gachibowli, Hyderabad',
    type: 'Full Time',
    salary: '₹4.0 - ₹5.5 LPA',
    deadline: '10-July 2025'
  }
];

export interface SportsCourse {
  id: string;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  level: string;
  rating: number;
}

export const SPORTS_COURSES: SportsCourse[] = [
  {
    id: 'course-1',
    title: 'Modern Sports Conditioning & Fitness Drills for PET Masters',
    instructor: 'Dr. A. K. Sharma (Sports Scientist)',
    category: 'Coaching Education',
    duration: '6 Weeks (Self-paced)',
    level: 'Intermediate',
    rating: 4.9
  },
  {
    id: 'course-2',
    title: 'Youth Athletic Nutrition & Injury Prevention Fundamentals',
    instructor: 'Pooja Bhatt (Olympic Nutritionist)',
    category: 'Athlete Health',
    duration: '4 Weeks',
    level: 'Beginner to Advanced',
    rating: 4.8
  },
  {
    id: 'course-3',
    title: 'Tactical Game Analysis & Video Tagging for Football & Cricket',
    instructor: 'Naveen Reddy (Lead Performance Analyst)',
    category: 'Sports Analytics',
    duration: '5 Weeks',
    level: 'Professional',
    rating: 4.9
  }
];
