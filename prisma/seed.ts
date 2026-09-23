import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const PRESET_DEMO_USERS = [
  {
    name: 'Anirudh',
    email: 'student@sportsmedia.world',
    role: 'student',
    institution: 'Sports Media Journalism School',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Coach Rajesh Sharma',
    email: 'coach@sportsmedia.world',
    role: 'coach',
    institution: 'NIS Athletics Academy & DPS Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'ABC International School',
    email: 'school@sportsmedia.world',
    role: 'school',
    institution: 'Hyderabad Sports Wing',
    avatar: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'BlueZone Sports Fund',
    email: 'sponsor@sportsmedia.world',
    role: 'sponsor',
    institution: 'Grassroots Sports Impact Foundation',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
  },
  {
    name: 'Super Administrator',
    email: 'admin@sportsmedia.world',
    role: 'admin',
    institution: 'SportsMedia.World Central HQ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
];

const DEMO_PASSWORD = 'sports123';

const INITIAL_COURSES = [
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

const INITIAL_ASSIGNMENTS = [
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

const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'Inside the Andhra Veterans Premier League Season 2 Clash of Titans',
    excerpt: 'A ringside analysis of how SS Interiors overcame Go Sportz in the thrilling semi-final at Doctors Ground, Vijayawada.',
    category: 'Cricket',
    status: 'published',
    authorName: 'Anirudh',
    authorRole: 'Trainee Journalist',
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
    authorRole: 'Trainee Journalist',
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
    authorRole: 'Trainee Journalist',
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
    authorRole: 'Trainee Journalist',
    views: 0,
    publishedAt: 'Pending Review',
  },
];

const INITIAL_COACH_ATHLETES = [
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

const INITIAL_SCHOOL_INFO = {
  id: 'default-school',
  name: 'ABC International School',
  city: 'Hyderabad, Telangana',
  principal: 'Dr. R. K. Sharma',
  sportsCoordinator: 'M. Swaminathan (Senior PET)',
  studentsCount: 850,
  coachesCount: 12,
  sportsCount: 14,
  achievementsCount: 320,
  sportsBreakdown: JSON.stringify([
    { sport: 'Athletics', athletes: 280, color: 'bg-[#1565C0]' },
    { sport: 'Football', athletes: 210, color: 'bg-[#168C45]' },
    { sport: 'Cricket', athletes: 195, color: 'bg-[#F28C28]' },
    { sport: 'Badminton', athletes: 140, color: 'bg-[#7E378B]' },
    { sport: 'Basketball', athletes: 95, color: 'bg-[#E5232E]' },
  ]),
};

const INITIAL_SPONSOR_PROGRAMS = [
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

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  // 1. Seed demo users
  for (const user of PRESET_DEMO_USERS) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        institution: user.institution,
        avatar: user.avatar,
        status: 'Active',
      },
      create: {
        name: user.name,
        email: user.email,
        passwordHash,
        role: user.role,
        institution: user.institution,
        avatar: user.avatar,
        status: 'Active',
        isVerified: true,
        joinedDate: '01 Jan 2026',
      },
    });
  }
  console.log('✅ Demo users seeded.');

  // 2. Seed courses
  for (const course of INITIAL_COURSES) {
    await prisma.course.upsert({
      where: { id: course.id },
      update: course,
      create: course,
    });
  }
  console.log('✅ Courses seeded.');

  // 3. Seed assignments
  for (const asg of INITIAL_ASSIGNMENTS) {
    await prisma.assignment.upsert({
      where: { id: asg.id },
      update: asg,
      create: asg,
    });
  }
  console.log('✅ Assignments seeded.');

  // 4. Seed articles
  for (const art of INITIAL_ARTICLES) {
    await prisma.article.upsert({
      where: { id: art.id },
      update: art,
      create: art,
    });
  }
  console.log('✅ Articles seeded.');

  // 5. Seed coach athletes
  for (const ath of INITIAL_COACH_ATHLETES) {
    await prisma.coachAthlete.upsert({
      where: { id: ath.id },
      update: ath,
      create: ath,
    });
  }
  console.log('✅ Athletes seeded.');

  // 6. Seed school info
  await prisma.schoolInfo.upsert({
    where: { id: 'default-school' },
    update: INITIAL_SCHOOL_INFO,
    create: INITIAL_SCHOOL_INFO,
  });
  console.log('✅ School info seeded.');

  // 7. Seed sponsorship programs
  for (const prog of INITIAL_SPONSOR_PROGRAMS) {
    await prisma.sponsorshipProgram.upsert({
      where: { id: prog.id },
      update: prog,
      create: prog,
    });
  }
  console.log('✅ Sponsorship programs seeded.');

  console.log('🎉 Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
