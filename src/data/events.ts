export interface SportsEvent {
  id: string;
  num: string;
  title: string;
  date: string;
  location: string;
  category: string;
  venue: string;
  status: 'Registration Open' | 'Live' | 'Upcoming';
  participantsCount: number;
}

export const UPCOMING_EVENTS: SportsEvent[] = [
  {
    id: 'event-01',
    num: '01',
    title: 'Inter School Athletics Meet',
    date: '25-May 2025',
    location: 'Hyderabad',
    category: 'Track & Field / Athletics',
    venue: 'G.M.C. Balayogi Athletic Stadium, Gachibowli',
    status: 'Registration Open',
    participantsCount: 450
  },
  {
    id: 'event-02',
    num: '02',
    title: 'State Level Football Championship',
    date: '30-May 2025',
    location: 'Hyderabad',
    category: 'Football (U-17 & U-19)',
    venue: 'Lal Bahadur Shastri Stadium, Basheerbagh',
    status: 'Upcoming',
    participantsCount: 320
  },
  {
    id: 'event-03',
    num: '03',
    title: 'Junior Badminton Tournament',
    date: '05-June 2025',
    location: 'Hyderabad',
    category: 'Badminton (Singles & Doubles)',
    venue: 'Pullela Gopichand Badminton Academy',
    status: 'Registration Open',
    participantsCount: 180
  },
  {
    id: 'event-04',
    num: '04',
    title: 'All India Inter-College Cricket Cup',
    date: '12-June 2025',
    location: 'Hyderabad',
    category: 'Cricket T20',
    venue: 'Gymkhana Grounds, Secunderabad',
    status: 'Upcoming',
    participantsCount: 240
  },
  {
    id: 'event-05',
    num: '05',
    title: 'South Zone Grassroots Basketball League',
    date: '20-June 2025',
    location: 'Hyderabad',
    category: 'Basketball (Boys & Girls)',
    venue: 'Kotla Vijaya Bhaskara Reddy Indoor Stadium',
    status: 'Upcoming',
    participantsCount: 160
  }
];
