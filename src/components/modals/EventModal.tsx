'use client';

import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Trophy, CheckCircle } from 'lucide-react';
import { SportsEvent, UPCOMING_EVENTS } from '@/data/events';

interface EventModalProps {
  isOpen: boolean;
  event?: SportsEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, event, onClose }) => {
  const [registered, setRegistered] = useState(false);
  const currentEvent = event || UPCOMING_EVENTS[0];

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setRegistered(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0d2240] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#1565c0] flex items-center justify-center text-white font-black text-xs">
              {currentEvent.num}
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">{currentEvent.title}</h3>
              <p className="text-[10px] text-blue-200">{currentEvent.category}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-300 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {registered ? (
            <div className="py-8 text-center flex flex-col items-center">
              <CheckCircle size={44} className="text-emerald-500 mb-2" />
              <h4 className="text-base font-black text-slate-800">Registration Confirmed!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Your entry badge and schedule details have been dispatched to your email.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#1565c0]" />
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">Date</span>
                    <span className="font-bold text-slate-800">{currentEvent.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-red-500" />
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">City</span>
                    <span className="font-bold text-slate-800">{currentEvent.location}</span>
                  </div>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200 flex items-center gap-2">
                  <Trophy size={15} className="text-amber-500" />
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase font-bold">Venue</span>
                    <span className="font-bold text-slate-800">{currentEvent.venue}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                <h5 className="font-black text-slate-800 uppercase mb-1">Tournament Highlights</h5>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>State Ranking Points certified by Sports Authority of India (SAI)</li>
                  <li>Live stream broadcast on SportsMedia.World and YouTube Channel</li>
                  <li>Digital merit certificates and medals for top 3 podium finishers</li>
                  <li>Scouts and physical directors attending from top collegiate sports programs</li>
                </ul>
              </div>

              <form onSubmit={handleRegister} className="pt-2 border-t border-slate-100 space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Athlete or School Team Name"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#1565c0] hover:bg-[#0d47a1] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  CONFIRM EVENT REGISTRATION
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
