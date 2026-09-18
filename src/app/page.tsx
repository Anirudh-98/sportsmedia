'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { WelcomeLoginCard } from '@/components/hero/WelcomeLoginCard';
import { YouTubeShowcaseCard } from '@/components/hero/YouTubeShowcaseCard';
import { JournalismSchoolCard } from '@/components/hero/JournalismSchoolCard';
import { ExploreSportsStrip } from '@/components/portal/ExploreSportsStrip';
import { UpcomingEventsCard } from '@/components/portal/UpcomingEventsCard';
import { TopAthletesGrid } from '@/components/portal/TopAthletesGrid';
import { OurImpactCard } from '@/components/portal/OurImpactCard';
import { QuickLinksCard } from '@/components/portal/QuickLinksCard';

export default function Home() {
  const router = useRouter();

  const handleQuickLink = (title: string) => {
    switch (title) {
      case 'Job Portal':
        router.push('/jobs');
        break;
      case 'Scholarship & Support':
        router.push('/scholarship');
        break;
      case 'Upload Your Story':
        router.push('/journalism');
        break;
      case 'Become a Volunteer':
      case 'Sponsor a Student':
        router.push('/scholarship');
        break;
      case 'Advertise With Us':
        router.push('/contact');
        break;
      case 'Sports Gallery':
        router.push('/gallery');
        break;
      case 'Contact Us':
        router.push('/contact');
        break;
      default:
        router.push('/about');
        break;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-2 p-2 sm:p-2.5">
      {/* ROW 1: 3-Column Hero Section
           - Col 1 (left): Welcome to SPORTSMEDIA.WORLD + Login Form + 3 Roles + Quote Box (~25%)
           - Col 2 (center): YouTube Video Player + 5 Thumbnails + Red Channel Button (~50%)
           - Col 3 (right): Sports Media Journalism School + Curriculum + Press Photographer (~25%) */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-1 sm:gap-1.5 items-stretch">
        {/* Column 1: Welcome & Login */}
        <div className="lg:col-span-3 flex flex-col">
          <WelcomeLoginCard
            onLogin={() => router.push('/about')}
            onCreateAccount={() => router.push('/contact')}
            onRoleClick={(role) => router.push(role === 'STUDENTS' ? '/athletes' : role === 'COACHES' ? '/jobs' : '/about')}
          />
        </div>

        {/* Column 2: YouTube Video Player Showcase */}
        <div className="lg:col-span-6 flex flex-col">
          <YouTubeShowcaseCard
            onOpenVideo={() => router.push('/youtube')}
            onSubscribe={() => window.open('https://youtube.com', '_blank')}
          />
        </div>

        {/* Column 3: Sports Media Journalism School */}
        <div className="lg:col-span-3 flex flex-col">
          <JournalismSchoolCard
            onKnowMore={() => router.push('/journalism')}
            onEnrollNow={() => router.push('/journalism')}
          />
        </div>
      </section>

      {/* ROW 2: Explore Sports & Games (18 colorful sport badges with icons & labels) */}
      <ExploreSportsStrip
        onSelectSport={(sport) => router.push(`/sports?category=${encodeURIComponent(sport)}`)}
        onExploreAll={() => router.push('/sports')}
      />

      {/* ROW 3: 4-Column Bottom Section
           - Card 1: UPCOMING EVENTS (3 items with blue date badges)
           - Card 2: TOP ATHLETES (4 athlete portrait cards in a row)
           - Card 3: OUR IMPACT (4 vertical colored metric cards)
           - Card 4: QUICK LINKS (2x4 link buttons with icons) */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2.5 items-stretch">
        {/* Card 1: Upcoming Events */}
        <div className="lg:col-span-3 flex flex-col">
          <UpcomingEventsCard
            onSelectEvent={() => router.push('/events')}
            onViewAll={() => router.push('/events')}
          />
        </div>

        {/* Card 2: Top Athletes */}
        <div className="lg:col-span-3 flex flex-col">
          <TopAthletesGrid
            onSelectAthlete={() => router.push('/athletes')}
            onViewAll={() => router.push('/athletes')}
          />
        </div>

        {/* Card 3: Our Impact */}
        <div className="lg:col-span-3 flex flex-col">
          <OurImpactCard />
        </div>

        {/* Card 4: Quick Links */}
        <div className="lg:col-span-3 flex flex-col">
          <QuickLinksCard onSelectLink={handleQuickLink} />
        </div>
      </section>
    </div>
  );
}
