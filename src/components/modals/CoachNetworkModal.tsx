'use client';

import React, { useState } from 'react';
import { X, Award, CheckCircle, User, School, Phone, Mail, FileCheck } from 'lucide-react';
import { COACHES_LIST } from '@/data/portalExtra';

interface CoachNetworkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoachNetworkModal: React.FC<CoachNetworkModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0d2240] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#1565c0] rounded-lg">
              <Award size={20} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider">
                PET Masters &amp; Coaches Network
              </h3>
              <p className="text-[10px] text-blue-200">Guiding • Inspiring • Shaping the Future</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-300 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {submitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <CheckCircle size={48} className="text-emerald-500 mb-2" />
              <h4 className="text-base font-black text-slate-800">Registration Submitted!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Your credentials have been submitted to the Blue Zone Coach Verification Board. Welcome to India&apos;s premier grassroots sports network.
              </p>
            </div>
          ) : (
            <>
              <div>
                <h4 className="text-xs font-black uppercase text-slate-700 mb-1">
                  Why Join the Blue Zone Network?
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-1.5 font-medium">
                    <FileCheck size={14} className="text-[#1565c0] shrink-0" />
                    <span>Official SAI / State Recognition</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <FileCheck size={14} className="text-[#1565c0] shrink-0" />
                    <span>Free Certification Workshops</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <FileCheck size={14} className="text-[#1565c0] shrink-0" />
                    <span>Scouting Honorariums</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <FileCheck size={14} className="text-[#1565c0] shrink-0" />
                    <span>School Sports Equipment Grants</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Coach / PET Master Full Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coach Srinivas Rao"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Primary Sport
                    </label>
                    <select className="w-full px-2 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden bg-white">
                      <option>Athletics / Track &amp; Field</option>
                      <option>Cricket</option>
                      <option>Football</option>
                      <option>Badminton</option>
                      <option>Basketball</option>
                      <option>Volleyball</option>
                      <option>Kabaddi / Kho-Kho</option>
                      <option>Swimming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="e.g. 8"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Current Institution / School / Academy
                  </label>
                  <div className="relative">
                    <School size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. DPS Hyderabad / ZP High School"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98000 00000"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="coach@school.edu.in"
                        className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1565c0] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 bg-[#1565c0] hover:bg-[#0d47a1] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  SUBMIT CREDENTIALS TO NETWORK
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
