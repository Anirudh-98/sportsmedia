'use client';

import React from 'react';
import { InitiativesCard } from './InitiativesCard';
import { SupportMissionCard } from './SupportMissionCard';
import { JobAndLearningCard } from './JobAndLearningCard';
import { YouTubeHighlightsCard } from './YouTubeHighlightsCard';
import { LiveEventsCard } from './LiveEventsCard';
import { TopAthletesCard } from './TopAthletesCard';
import { CoachesBanner } from '@/components/coaches/CoachesBanner';
import { SportsEvent } from '@/data/events';
import { Athlete } from '@/data/athletes';
import { AdPackage } from '@/data/pricing';

interface MiddleGridSectionProps {
  onSelectInitiative: (id: string) => void;
  onOpenAdvertiseModal: (pkg?: AdPackage) => void;
  onOpenJobs: () => void;
  onOpenLearning: () => void;
  onOpenVideo: () => void;
  onSelectEvent: (event: SportsEvent) => void;
  onViewAllEvents: () => void;
  onSelectAthlete: (athlete: Athlete) => void;
  onJoinCoachNetwork: () => void;
}

export const MiddleGridSection: React.FC<MiddleGridSectionProps> = ({
  onSelectInitiative,
  onOpenAdvertiseModal,
  onOpenJobs,
  onOpenLearning,
  onOpenVideo,
  onSelectEvent,
  onViewAllEvents,
  onSelectAthlete,
  onJoinCoachNetwork,
}) => {
  return (
    <section className="w-full py-2 px-3 sm:px-4 lg:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

        {/* Main Left/Center Columns: 8 cols on desktop */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* 1. OUR INITIATIVES (4 cols of 12) */}
          <div className="md:col-span-4 flex flex-col">
            <InitiativesCard onSelectInitiative={onSelectInitiative} />
          </div>

          {/* 2. SUPPORT OUR MISSION (5 cols of 12) */}
          <div className="md:col-span-5 flex flex-col">
            <SupportMissionCard onOpenAdvertiseModal={onOpenAdvertiseModal} />
          </div>

          {/* 3. JOB PORTAL & E-LEARNING (3 cols of 12) */}
          <div className="md:col-span-3 flex flex-col">
            <JobAndLearningCard onOpenJobs={onOpenJobs} onOpenLearning={onOpenLearning} />
          </div>
        </div>

        {/* Right Sidebar Column: 4 cols on desktop */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* 4. YOUTUBE HIGHLIGHTS */}
          <YouTubeHighlightsCard onOpenVideo={onOpenVideo} />

          {/* 5. LIVE & UPCOMING EVENTS */}
          <LiveEventsCard
            onSelectEvent={onSelectEvent}
            onViewAllEvents={onViewAllEvents}
          />
        </div>

        {/* 6. PET MASTERS & COACHES banner, beside Top Ranking Athletes */}
        <div className="lg:col-span-8">
          <CoachesBanner onJoinNetwork={onJoinCoachNetwork} />
        </div>
        <div className="lg:col-span-4">
          <TopAthletesCard onSelectAthlete={onSelectAthlete} />
        </div>

      </div>
    </section>
  );
};
