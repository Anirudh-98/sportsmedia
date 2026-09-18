'use client';

import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { SportsEvent, UPCOMING_EVENTS } from '@/data/events';

interface UpcomingEventsCardProps {
  onSelectEvent?: (event: SportsEvent) => void;
  onViewAll?: () => void;
}

export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({
  onSelectEvent,
  onViewAll,
}) => {
  const events = [
    {
      id: 'athletics-meet',
      day: '25',
      month: 'MAY',
      title: 'Inter School Athletics Meet',
      location: 'Hyderabad',
      rawEvent: UPCOMING_EVENTS[0],
    },
    {
      id: 'football-champ',
      day: '30',
      month: 'MAY',
      title: 'State Level Football Championship',
      location: 'Hyderabad',
      rawEvent: UPCOMING_EVENTS[1] || UPCOMING_EVENTS[0],
    },
    {
      id: 'badminton-tourn',
      day: '05',
      month: 'JUN',
      title: 'Junior Badminton Tournament',
      location: 'Hyderabad',
      rawEvent: UPCOMING_EVENTS[2] || UPCOMING_EVENTS[0],
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-[#D8E0E7] p-2.5 sm:p-3 flex flex-col justify-between h-full shadow-2xs">
      <div>
        {/* Header with blue gradient */}
        <div className="flex items-center justify-between p-1.5 rounded-xs bg-gradient-to-r from-[#EEF6FC] via-[#F6FAFE] to-white border border-[#D8E5F2] mb-2.5">
          <div className="flex items-center gap-2">
            <FaCalendarAlt size={16} className="text-[#0B5FA5]" />
            <h3 className="text-xs sm:text-[13.5px] font-black text-[#032D59] uppercase tracking-wider">
              UPCOMING EVENTS
            </h3>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="text-xs sm:text-[12.5px] font-black text-[#0B5FA5] hover:text-[#032D59] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* 3 Events List with Blue Date Badges */}
        <div className="space-y-2">
          {events.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent && onSelectEvent(evt.rawEvent)}
              className="flex items-center gap-2.5 p-1 rounded-sm hover:bg-[#EEF6FC] transition-colors cursor-pointer group"
            >
              {/* Blue Date Badge */}
              <div className="w-10 h-10 rounded-sm bg-[#0B5FA5] group-hover:bg-[#074780] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs transition-colors">
                <span className="text-sm sm:text-[15px] font-black leading-none">{evt.day}</span>
                <span className="text-[9.5px] sm:text-[10px] font-black tracking-wider leading-none mt-0.5">
                  {evt.month}
                </span>
              </div>

              {/* Event Title & Location */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-[13px] font-black text-[#032D59] group-hover:text-[#0B5FA5] leading-tight truncate">
                  {evt.title}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-700 font-bold leading-tight mt-0.5">
                  {evt.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
