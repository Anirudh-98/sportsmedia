import {
  Activity,
  CircleDot,
  Trophy,
  Feather,
  Volleyball,
  Dumbbell,
  Swords,
  Hand,
  Table2,
  Waves,
  Flower2,
  Grid3x3,
  Users,
  Bike,
  MoreHorizontal,
  type LucideIcon,
} from 'lucide-react';

export interface SportCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export const SPORTS_CATEGORIES: SportCategory[] = [
  { id: 'athletics', name: 'Athletics', icon: Activity, color: '#0A67B2' },
  { id: 'football', name: 'Football', icon: CircleDot, color: '#149447' },
  { id: 'cricket', name: 'Cricket', icon: Trophy, color: '#149447' },
  { id: 'badminton', name: 'Badminton', icon: Feather, color: '#F28C28' },
  { id: 'volleyball', name: 'Volleyball', icon: Volleyball, color: '#F4C430' },
  { id: 'basketball', name: 'Basketball', icon: CircleDot, color: '#E5262F' },
  { id: 'hockey', name: 'Hockey', icon: Swords, color: '#7A1F2B' },
  { id: 'wrestling', name: 'Wrestling', icon: Dumbbell, color: '#F28C28' },
  { id: 'boxing', name: 'Boxing', icon: Hand, color: '#0A67B2' },
  { id: 'table-tennis', name: 'Table Tennis', icon: Table2, color: '#0A67B2' },
  { id: 'tennis', name: 'Tennis', icon: CircleDot, color: '#149447' },
  { id: 'swimming', name: 'Swimming', icon: Waves, color: '#3FA9E8' },
  { id: 'yoga', name: 'Yoga', icon: Flower2, color: '#7255A8' },
  { id: 'chess', name: 'Chess', icon: Grid3x3, color: '#063A70' },
  { id: 'kho-kho', name: 'Kho-Kho', icon: Users, color: '#149447' },
  { id: 'kabaddi', name: 'Kabaddi', icon: Swords, color: '#E5262F' },
  { id: 'cycling', name: 'Cycling', icon: Bike, color: '#E5262F' },
  { id: 'more', name: 'More', icon: MoreHorizontal, color: '#586572' },
];
