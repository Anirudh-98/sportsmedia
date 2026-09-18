'use client';

import React from 'react';
import { UPCOMING_EVENTS, SportsEvent } from '@/data/events';
import { MapPin } from 'lucide-react';

interface LiveEventsCardProps {
  onSelectEvent: (event: SportsEvent) => void;
  onViewAllEvents: () => void;
}

const splitDate = (date: string) => {
  const [day, rest] = date.split('-');
  const month = (rest || '').split(' ')[0];
  return { day, month: month?.slice(0, 3).toUpperCase() };
};

export const LiveEventsCard: React.FC<LiveEventsCardProps> = ({
  onSelectEvent,
  onViewAllEvents,
}) => {
  const displayEvents = UPCOMING_EVENTS.slice(0, 3);

  return (
    <div className="bg-white rounded-md border border-[#D8E0E7] p-3 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#E7EDF2]">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-1 bg-[#0B5FA5] rounded-full" />
          <h3 className="text-xs sm:text-[13px] font-black text-[#032D59] tracking-wider uppercase">
            Upcoming Events
          </h3>
        </div>
        <button
          type="button"
          onClick={onViewAllEvents}
          className="text-[10px] font-bold text-[#0A67B2] uppercase tracking-wide hover:underline"
        >
          View All
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-2">
        {displayEvents.map((evt) => {
          const { day, month } = splitDate(evt.date);
          return (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="p-2 rounded-sm border border-slate-200 hover:border-[#0B5FA5]/40 hover:bg-[#EAF5FC]/50 transition-all flex items-center gap-2.5 cursor-pointer group"
            >
              {/* Date Block */}
              <div className="flex w-10 shrink-0 flex-col items-center justify-center rounded bg-[#EAF5FC] py-1 text-[#0B5FA5] group-hover:bg-[#0B5FA5] group-hover:text-white transition-colors">
                <span className="text-sm font-black leading-none">{day}</span>
                <span className="text-[8px] font-bold uppercase leading-none mt-0.5">{month}</span>
              </div>

              {/* Event Info */}
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-[13px] font-black text-[#032D59] group-hover:text-[#0B5FA5] leading-tight truncate">
                  {evt.title}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-700 font-semibold mt-1">
                  <MapPin size={11} className="text-slate-500 shrink-0" />
                  {evt.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
