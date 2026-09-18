export interface Sponsor {
  id: string;
  name: string;
  tagline?: string;
  category: string;
  logoSrc: string;
  url: string;
}

export const SPONSORS: Sponsor[] = [
  {
    id: 'sbi',
    name: 'State Bank of India',
    tagline: 'The banker to every indian',
    category: 'Banking Partner',
    logoSrc: '/logos/sbi.png',
    url: 'https://sbi.co.in'
  },
  {
    id: 'decathlon',
    name: 'DECATHLON',
    tagline: 'YOUR SPORTS PARTNER',
    category: 'Official Sports Gear Partner',
    logoSrc: '/logos/decathlon.png',
    url: 'https://www.decathlon.in'
  },
  {
    id: 'amul',
    name: 'Amul',
    tagline: 'The Taste of India',
    category: 'Nutrition Partner',
    logoSrc: '/logos/amul.png',
    url: 'https://amul.com'
  },
  {
    id: 'q1',
    name: 'Q1 SPORTS',
    tagline: 'Performance Apparel',
    category: 'Apparel Partner',
    logoSrc: '/logos/q1-sports.png',
    url: '#'
  },
  {
    id: 'lic',
    name: 'LIC',
    tagline: 'LIFE INSURANCE CORPORATION OF INDIA',
    category: 'Insurance Partner',
    logoSrc: '/logos/lic.png',
    url: 'https://licindia.in'
  },
  {
    id: 'fitindia',
    name: 'FIT INDIA',
    tagline: 'National Fitness Movement',
    category: 'National Fitness Partner',
    logoSrc: '/logos/fit-india.png',
    url: 'https://fitindia.gov.in'
  },
  {
    id: 'sai',
    name: 'SAI',
    tagline: 'SPORTS AUTHORITY OF INDIA',
    category: 'Institutional Partner',
    logoSrc: '/logos/sai.png',
    url: 'https://sportsauthorityofindia.nic.in'
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank',
    tagline: 'punjab national bank',
    category: 'Banking Partner',
    logoSrc: '/logos/pnb.png',
    url: 'https://pnbindia.in'
  },
  {
    id: 'tatamotors',
    name: 'TATA MOTORS',
    tagline: 'Connecting Aspirations',
    category: 'Automobile Partner',
    logoSrc: '/logos/tata-motors.png',
    url: 'https://tatamotors.com'
  },
  {
    id: 'kheloindia',
    name: 'KHELO INDIA',
    tagline: 'National Programme for Development of Sports',
    category: 'Sports Development Partner',
    logoSrc: '/logos/khelo-india.png',
    url: 'https://kheloindia.gov.in'
  }
];

