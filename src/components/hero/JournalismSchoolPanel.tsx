'use client';

import React from 'react';
import Image from 'next/image';
import {
  Newspaper,
  Camera,
  Mic,
  Radio,
  Share2,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JournalismSchoolPanelProps {
  onKnowMore: () => void;
  onEnroll: () => void;
}

const SKILLS = [
  { label: 'Sports Reporting & Writing', icon: Newspaper },
  { label: 'Photography & Mobile Video Journalism', icon: Camera },
  { label: 'Interviews & Athlete Profiling', icon: Mic },
  { label: 'Live Event Coverage', icon: Radio },
  { label: 'Social Media & YouTube Content', icon: Share2 },
  { label: 'Ethics, Law, Privacy & Responsible Journalism', icon: ShieldCheck },
];

export const JournalismSchoolPanel: React.FC<JournalismSchoolPanelProps> = ({
  onKnowMore,
  onEnroll,
}) => {
  return (
    <div className="flex h-full flex-col rounded-md border-2 border-[#EAF5FC] bg-white p-3.5 shadow-2xs">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF5FC] text-[#0A67B2]">
          <GraduationCap size={18} />
        </span>
        <div className="leading-tight">
          <h3 className="text-xs font-black uppercase tracking-wide text-[#032D59] sm:text-sm">
            Sports Media Journalism School
          </h3>
          <p className="text-[10px] font-bold text-[#586572]">
            Learn &bull; Report &bull; Share &bull; Make an Impact
          </p>
        </div>
      </div>

      <p className="text-[11px] font-semibold leading-snug text-[#17212B]">
        A unique certificate training programme to create a new generation of
        sports journalists, campus reporters and digital content creators.
      </p>

      <div className="mt-2.5 flex flex-1 gap-2.5">
        <ul className="flex flex-1 flex-col gap-1.5">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <li key={skill.label} className="flex items-center gap-2">
                <Icon size={13} className="shrink-0 text-[#0A67B2]" />
                <span className="text-[10.5px] font-semibold leading-tight text-[#17212B]">
                  {skill.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="relative w-16 shrink-0 overflow-hidden rounded-sm border border-[#E7EDF2] sm:w-20">
          <Image
            src="/images/foundation_kids.jpg"
            alt="Student sports journalist photographing an athlete"
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          type="button"
          onClick={onKnowMore}
          className="h-auto rounded-sm bg-[#0765AD] py-2 text-[10.5px] font-black uppercase tracking-wider text-white hover:bg-[#054E85]"
        >
          Know More
        </Button>
        <Button
          type="button"
          onClick={onEnroll}
          className="h-auto rounded-sm bg-[#159447] py-2 text-[10.5px] font-black uppercase tracking-wider text-white hover:bg-[#0F7538]"
        >
          Enroll Now
        </Button>
      </div>
    </div>
  );
};
