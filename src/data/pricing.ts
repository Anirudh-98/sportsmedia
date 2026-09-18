export interface AdPackage {
  id: string;
  name: string;
  priceDisplay: string;
  ratePerDay: number;
  period: string;
  subtitle: string;
  tagColor: 'green' | 'pink' | 'orange' | 'teal' | 'red' | 'gold';
  description: string;
  benefits: string[];
}

export const AD_PACKAGES: AdPackage[] = [
  {
    id: 'classified',
    name: 'CLASSIFIED ADS',
    priceDisplay: 'Custom Rates',
    ratePerDay: 800,
    period: 'Per Day',
    subtitle: 'Promote Your Business',
    tagColor: 'green',
    description: 'High visibility text and banner classifieds across high traffic sports categories.',
    benefits: ['Category targeted', 'Click-to-Call / WhatsApp CTA', 'Portal directory listing']
  },
  {
    id: 'full-page',
    name: 'FULL PAGE SPONSOR',
    priceDisplay: '₹ 20,000/-',
    ratePerDay: 20000,
    period: 'Per Day',
    subtitle: 'Maximum Digital Reach',
    tagColor: 'pink',
    description: 'Prime homepage hero take-over, exclusive digital banner, and featured sponsor badges.',
    benefits: ['Guaranteed 100k+ impressions', 'Newsletter highlight', 'Social media shoutout']
  },
  {
    id: 'half-page',
    name: 'HALF PAGE SPONSOR',
    priceDisplay: '₹ 10,000/-',
    ratePerDay: 10000,
    period: 'Per Day',
    subtitle: 'Mid-tier Prominence',
    tagColor: 'orange',
    description: 'Prominent mid-section placement above live scoreboards and athlete tables.',
    benefits: ['50k+ daily impressions', 'Sidebar placement', 'Live stream intermission display']
  },
  {
    id: 'quarter-page',
    name: 'QUARTER PAGE SPONSOR',
    priceDisplay: '₹ 5,000/-',
    ratePerDay: 5000,
    period: 'Per Day',
    subtitle: 'Affordable Impact',
    tagColor: 'teal',
    description: 'High-converting tile banner in relevant sports tournament feeds and articles.',
    benefits: ['Targeted school/college feeds', 'Weekly performance report', 'Direct link to landing page']
  },
  {
    id: 'video-ad',
    name: '10 SEC VIDEO AD',
    priceDisplay: '₹ 2,000/-',
    ratePerDay: 2000,
    period: 'Per Day',
    subtitle: 'High Impact Video',
    tagColor: 'red',
    description: 'Engaging pre-roll and mid-roll clips during match highlights and YouTube streams.',
    benefits: ['Full sound on', 'Non-skippable 10s brand reel', 'Engaging interactive CTA']
  },
  {
    id: 'title-sponsor',
    name: 'EVENT TITLE SPONSOR',
    priceDisplay: '₹ 25,000/-',
    ratePerDay: 25000,
    period: 'Per Day',
    subtitle: 'Official Tournament Title',
    tagColor: 'gold',
    description: 'Title rights for upcoming district and state school championships with ground banners.',
    benefits: ['Exclusive title naming rights', 'Trophy & certificate branding', 'Press release mentions']
  }
];
