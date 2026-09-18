export interface Athlete {
  id: string;
  rank: string;
  name: string;
  sport: string;
  school: string;
  city: string;
  age: number;
  image: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
  highlight: string;
  avatarBg: string;
  nationalRank: number;
  recentScore: string;
}

export const TOP_ATHLETES: Athlete[] = [
  {
    id: 'rohit-kumar',
    rank: '01',
    name: 'Rohit Kumar',
    sport: 'Athletics',
    school: 'Delhi Public School, Nacharam',
    city: 'Hyderabad',
    age: 16,
    image: '/image/athelete3.png',
    medals: { gold: 7, silver: 3, bronze: 1 },
    highlight: '100m Sprint Gold Medalist (10.62s) at State Athletics Championship 2024',
    avatarBg: 'from-blue-600 to-indigo-800',
    nationalRank: 1,
    recentScore: '10.62s in 100m Sprint'
  },
  {
    id: 'ananya-reddy',
    rank: '02',
    name: 'Ananya Reddy',
    sport: 'Badminton',
    school: 'Oakridge International School',
    city: 'Hyderabad',
    age: 15,
    image: '/image/athelete2.png',
    medals: { gold: 9, silver: 2, bronze: 2 },
    highlight: 'Junior National Champion U-17 Singles, Top Seed at All India Ranking Meet',
    avatarBg: 'from-emerald-600 to-teal-800',
    nationalRank: 2,
    recentScore: 'Won Finals 21-18, 21-14'
  },
  {
    id: 'vikram-singh',
    rank: '03',
    name: 'Vikram Singh',
    sport: 'Cricket',
    school: 'Bhavans Sri Ramakrishna Vidyalaya',
    city: 'Hyderabad',
    age: 17,
    image: '/image/athelete1.png',
    medals: { gold: 5, silver: 4, bronze: 0 },
    highlight: 'Captain of State U-19 Squad; 486 runs in 5 matches with a 138* best score',
    avatarBg: 'from-amber-600 to-orange-800',
    nationalRank: 3,
    recentScore: '138* (94 balls) vs Central Zone'
  },
  {
    id: 'sara-khan',
    rank: '04',
    name: 'Sara Khan',
    sport: 'Swimming',
    school: 'St. Ann\'s High School',
    city: 'Hyderabad',
    age: 16,
    image: '/image/athelete.png',
    medals: { gold: 6, silver: 2, bronze: 1 },
    highlight: 'State Champion in 100m Freestyle, qualified for Junior Nationals 2025',
    avatarBg: 'from-sky-600 to-cyan-800',
    nationalRank: 4,
    recentScore: '58.4s in 100m Freestyle'
  }
];
