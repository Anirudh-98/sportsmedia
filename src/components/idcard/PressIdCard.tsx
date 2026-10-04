'use client';

import React, { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Caveat, Roboto } from 'next/font/google';
import { RotateCw, Printer, Eye } from 'lucide-react';
import { FaEnvelope, FaGlobe, FaYoutube } from 'react-icons/fa';

const scriptFont = Caveat({ subsets: ['latin'], weight: ['600', '700'] });
/* Roboto: the clean sans-serif commonly used on printed ID badges */
const cardFont = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
});

/* The card faces are drawn at a fixed design size and scaled to fit their container.
   The design size has the proportions of the printed badge: 54 mm x 86 mm (portrait). */
const CARD_W = 396;
const CARD_H = 631;
const PRINT_W_MM = 54;
const PRINT_H_MM = 86;
/* 54 mm at 96 CSS px per inch, divided by the design width. The extra 0.5% lets the
   artwork run just past the page edge so no unprinted hairline is left around it. */
const PRINT_SCALE = (((PRINT_W_MM / 25.4) * 96) / CARD_W) * 1.005;

export type PressIdCardSide = 'front' | 'back';

/** Prints one face of the mounted press ID on its own 54 mm x 86 mm page. */
export function printPressIdCard(side: PressIdCardSide) {
  const { body } = document;
  body.dataset.idCardPrint = side;
  window.addEventListener('afterprint', () => delete body.dataset.idCardPrint, { once: true });
  window.print();
}

const NAVY = '#0B2265';
const DEEP_NAVY = '#0A1E4E';
const BLUE = '#1565C0';

export interface StudentIdCardData {
  id: string;
  name: string;
  idNo: string;
  course: string;
  validTill: string;
  bloodGroup: string;
  avatar: string;
  role: string;
  institution?: string;
  issueDate?: string;
}

export const PRESET_STUDENTS: StudentIdCardData[] = [
  {
    id: 'std-1',
    name: 'Rahul Verma',
    idNo: 'SMBZ-TJ-2025-001',
    course: 'Sports Media & Journalism',
    validTill: '31 Dec 2026',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80',
    role: 'Trainee Sports Media Journalist',
    institution: 'Sports Media Journalism School',
    issueDate: '01 Jan 2025',
  },
  {
    id: 'std-2',
    name: 'Anirudh',
    idNo: 'SMBZ-TJ-2025-002',
    course: 'Sports Media & Journalism',
    validTill: '31 Dec 2026',
    bloodGroup: 'B+',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    role: 'Trainee Sports Media Journalist',
    institution: 'Sports Media Journalism School',
    issueDate: '01 Jan 2025',
  },
  {
    id: 'std-3',
    name: 'Priya Sundaram',
    idNo: 'SMBZ-TJ-2025-003',
    course: 'Sports Broadcasting & Photography',
    validTill: '31 Dec 2026',
    bloodGroup: 'A+',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    role: 'Trainee Sports Media Journalist',
    institution: 'Hyderabad Sports Academy',
    issueDate: '15 Jan 2025',
  },
  {
    id: 'std-4',
    name: 'Vikram Rao',
    idNo: 'SMBZ-TJ-2025-004',
    course: 'Grassroots Match Reporting',
    validTill: '31 Dec 2026',
    bloodGroup: 'AB+',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    role: 'Trainee Sports Media Journalist',
    institution: 'DPS Athletics Wing',
    issueDate: '20 Jan 2025',
  },
  {
    id: 'std-5',
    name: 'Sneha Reddy',
    idNo: 'SMBZ-TJ-2025-005',
    course: 'Digital Sports Media & Video',
    validTill: '31 Dec 2026',
    bloodGroup: 'O-',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    role: 'Trainee Sports Media Journalist',
    institution: 'Sports Media Central Institute',
    issueDate: '01 Feb 2025',
  },
];


/* -------------------------------------------------------------------------- */
/* Scales a fixed-size card face down to the width of its container           */
/* -------------------------------------------------------------------------- */
function CardScaler({
  children,
  maxWidth = CARD_W,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(maxWidth / CARD_W);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const update = () => setScale(frame.clientWidth / CARD_W);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      className="relative w-full"
      style={{ maxWidth, aspectRatio: `${CARD_W} / ${CARD_H}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ width: CARD_W, height: CARD_H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SVG QR Code Component (decorative pattern seeded from the value)           */
/* -------------------------------------------------------------------------- */
const QR_SIZE = 25;

function buildQrPath(value: string): string {
  let seed = 2166136261;
  for (let i = 0; i < value.length; i++) {
    seed ^= value.charCodeAt(i);
    seed = Math.imul(seed, 16777619);
  }
  const next = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };

  const last = QR_SIZE - 7;
  const finders: [number, number][] = [[0, 0], [0, last], [last, 0]];
  let path = '';

  for (let row = 0; row < QR_SIZE; row++) {
    for (let col = 0; col < QR_SIZE; col++) {
      const filled = next() > 0.5;
      const finder = finders.find(
        ([r, c]) => row >= r - 1 && row <= r + 7 && col >= c - 1 && col <= c + 7
      );

      let on = filled;
      if (finder) {
        const i = row - finder[0];
        const j = col - finder[1];
        const inside = i >= 0 && i <= 6 && j >= 0 && j <= 6;
        const ring = i === 0 || i === 6 || j === 0 || j === 6;
        const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        on = inside && (ring || core);
      }
      if (on) path += `M${col} ${row}h1v1h-1z`;
    }
  }
  return path;
}

function DynamicQrCodeSvg({ value, size = 68 }: { value: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`-1 -1 ${QR_SIZE + 2} ${QR_SIZE + 2}`}
      shapeRendering="crispEdges"
      className="bg-white"
      aria-label={`QR Code for ${value}`}
    >
      <path d={buildQrPath(value)} fill="#0B1020" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Official Seal Stamp SVG (Back Side)                                        */
/* -------------------------------------------------------------------------- */
function OfficialStampSvg({ size = 78 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="select-none">
      <circle cx="50" cy="50" r="47" fill="none" stroke={NAVY} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="43" fill="none" stroke={NAVY} strokeWidth="0.8" />
      <circle cx="50" cy="50" r="28" fill="none" stroke={NAVY} strokeWidth="1.6" />

      <path id="stampArcTop" d="M 15.5,50 A 34.5,34.5 0 1,1 84.5,50" fill="none" />
      <text fill={NAVY} fontSize="8.4" fontWeight="900" letterSpacing="0.6">
        <textPath href="#stampArcTop" startOffset="50%" textAnchor="middle">
          SPORTS MEDIA BLUE ZONE
        </textPath>
      </text>

      <g fill={NAVY} fontSize="7" textAnchor="middle">
        <text x="36" y="88">★</text>
        <text x="50" y="91">★</text>
        <text x="64" y="88">★</text>
      </g>

      <g textAnchor="middle" fill={NAVY} fontWeight="900" fontSize="8.6">
        <text x="50" y="43">SPORTS</text>
        <text x="50" y="53">PEOPLE</text>
        <text x="50" y="63">SOCIETY</text>
      </g>
    </svg>
  );
}

/* Lanyard slot punched through the top of both faces */
function LanyardSlot() {
  return (
    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 z-30 w-[100px] h-[22px] rounded-full bg-[#EEF2F7] shadow-[inset_0_2px_4px_rgba(2,12,40,0.45)]" />
  );
}

/* -------------------------------------------------------------------------- */
/* FRONT OF THE ID CARD                                                       */
/* -------------------------------------------------------------------------- */
export function PressIdCardFront({ student }: { student: StudentIdCardData }) {
  const details: { label: string; value: string }[] = [
    { label: 'Name', value: student.name },
    { label: 'ID No.', value: student.idNo },
    { label: 'Course', value: student.course },
    { label: 'Valid Till', value: student.validTill },
    { label: 'Blood Group', value: student.bloodGroup },
  ];

  return (
    <div className={`${cardFont.className} relative w-full h-full rounded-[22px] overflow-hidden select-none bg-gradient-to-b from-white via-white to-[#E4EEFB] shadow-xl ring-1 ring-slate-300/70`}>
      {/* TOP NAVY WAVE BAND */}
      <svg viewBox="0 0 380 100" className="absolute top-0 left-0 w-full" aria-hidden="true">
        <path d="M0 0H380V64C300 88 200 66 110 74C60 78 25 86 0 96Z" fill="#2F7BE0" />
        <path d="M0 0H380V56C300 80 200 59 110 66C60 70 25 77 0 86Z" fill={DEEP_NAVY} />
        <path d="M0 0H380V18C250 58 110 12 0 44Z" fill="#17378A" opacity="0.55" />
      </svg>
      <LanyardSlot />

      <div className="absolute top-[11px] left-[24px] text-white font-bold uppercase text-[9.5px] leading-[1.32] tracking-wide">
        <p>Sports</p>
        <p>Education</p>
        <p>People</p>
        <p className="text-[7.5px]">A Brighter Tomorrow</p>
      </div>
      <div className="absolute top-[11px] right-[24px] text-right text-white font-bold uppercase text-[9.5px] leading-[1.32] tracking-wide">
        <p>Identify</p>
        <p>Nurture</p>
        <p>Promote</p>
        <p>Empower</p>
      </div>

      {/* BRAND LOGO COLUMN */}
      <div className="absolute top-[86px] left-[18px] w-[112px] flex flex-col items-center text-center">
        <div className="relative w-[92px] h-[82px]">
          <Image
            src="/bluezonelogo.webp"
            alt="Sports Media Blue Zone Logo"
            fill
            sizes="92px"
            className="object-contain"
            priority
          />
        </div>
        <p className="mt-[5px] text-[11.5px] font-black leading-none tracking-tight" style={{ color: NAVY }}>
          SPORTS MEDIA
        </p>
        <p className="mt-[2px] text-[11.5px] font-black leading-none tracking-wide" style={{ color: BLUE }}>
          BLUE ZONE
        </p>
        <p className="mt-[5px] text-[7.5px] font-bold italic leading-none whitespace-nowrap" style={{ color: NAVY }}>
          Sports for a Better Society
        </p>
      </div>

      {/* BRAND TITLE */}
      <div className="absolute top-[88px] left-[132px] right-[16px] text-center whitespace-nowrap">
        <h1 className="text-[31px] font-black leading-[1.05] tracking-tight" style={{ color: NAVY }}>
          SPORTS MEDIA
        </h1>
        <p className="text-[31px] font-black leading-[1.05] tracking-wide" style={{ color: BLUE }}>
          BLUE ZONE
        </p>
        <p className="mt-[4px] text-[7.6px] font-bold tracking-wide" style={{ color: NAVY }}>
          SPORTS | EDUCATION | FITNESS | STUDENT DEVELOPMENT
        </p>
      </div>

      {/* PHOTO */}
      <div
        className="absolute top-[171px] left-[140px] w-[130px] h-[140px] rounded-[10px] overflow-hidden bg-slate-100 border-[2.5px]"
        style={{ borderColor: BLUE }}
      >
        <Image
          src={student.avatar || '/press.png'}
          alt={student.name}
          fill
          sizes="134px"
          className="object-cover object-top"
          unoptimized
        />
      </div>

      {/* SCRIPT SLOGAN & VALUES */}
      <p
        className={`${scriptFont.className} absolute top-[176px] left-[272px] w-[114px] text-center text-[16.5px] font-bold leading-[1.0] whitespace-nowrap -rotate-[9deg]`}
        style={{ color: NAVY }}
      >
        Voices
        <br />
        for a Stronger
        <br />
        Sports Tomorrow
      </p>
      <div
        className="absolute top-[238px] left-[272px] w-[114px] text-center text-[12.5px] font-black leading-[1.42] tracking-wide"
        style={{ color: NAVY }}
      >
        <p>PLAY</p>
        <p>LEARN</p>
        <p>GROW</p>
        <p>ACHIEVE</p>
      </div>

      {/* RED PRESS ID BAR & ROLE TITLE */}
      <div className="absolute top-[318px] left-[58px] right-[38px] h-[29px] rounded-[7px] bg-gradient-to-b from-[#F0323C] to-[#D5141F] shadow-sm flex items-center justify-center">
        <span className="text-white text-[21px] font-black tracking-wide leading-none whitespace-nowrap">
          SPORTS MEDIA PRESS ID
        </span>
      </div>
      <div className="absolute top-[351px] inset-x-0 text-center whitespace-nowrap">
        <h2 className="text-[18px] font-black leading-tight tracking-wide" style={{ color: NAVY }}>
          TRAINEE SPORTS MEDIA JOURNALIST
        </h2>
        <p className="text-[12.5px] font-bold leading-tight" style={{ color: BLUE }}>
          Sports Journalism Certificate Training Programme
        </p>
      </div>

      {/* HOLDER DETAILS */}
      <div className="absolute top-[392px] left-[36px] w-[264px] text-[12.5px] leading-[20px] text-black">
        {details.map((row) => (
          <div key={row.label} className="flex">
            <span className="w-[78px] shrink-0 font-bold">{row.label}</span>
            <span className="w-[14px] shrink-0 font-bold">:</span>
            <span className="font-medium truncate">{row.value}</span>
          </div>
        ))}
      </div>

      {/* QR CODE */}
      <div className="absolute top-[394px] right-[20px] w-[72px] flex flex-col items-center">
        <DynamicQrCodeSvg value={`https://sportsmedia.world/verify?id=${student.idNo}`} size={68} />
        <p className="mt-[3px] text-[8.5px] font-black leading-none tracking-wide text-black whitespace-nowrap">
          SCAN TO VERIFY
        </p>
        <p className="mt-[2px] text-[7.5px] font-bold leading-none text-slate-800">(Internal Use)</p>
      </div>

      {/* SILHOUETTES OF JOURNALISTS, CAMERAS & STADIUM */}
      <Image
        src="/images/idcard-footer-silhouette.png"
        alt=""
        width={1188}
        height={329}
        className="absolute bottom-[50px] left-0 w-full h-auto"
        unoptimized
      />

      {/* BOTTOM NAVY FOOTER */}
      <svg viewBox="0 0 380 64" className="absolute bottom-0 left-0 w-full" aria-hidden="true">
        <path d="M0 6C110 1 260 10 380 4V64H0Z" fill="#2F7BE0" />
        <path d="M0 12C110 7 260 16 380 10V64H0Z" fill={DEEP_NAVY} />
      </svg>
      <div className="absolute bottom-[7px] inset-x-0 text-center text-white whitespace-nowrap">
        <p className="text-[20px] font-black leading-none tracking-wide">SPORTSMEDIA.WORLD</p>
        <p className="mt-[4px] text-[10px] font-bold leading-none tracking-[0.08em]">
          A PLATFORM FOR GRASSROOTS SPORTS
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* BACK OF THE ID CARD                                                        */
/* -------------------------------------------------------------------------- */
const ID_TERMS = [
  'Used for interviews, photography and video coverage of sports activities, events and related educational initiatives.',
  'Does not represent government accreditation or official press status.',
  'Holders must take prior permission from concerned schools, colleges, institutions, event organisers and individuals before recording, interviewing or publishing content.',
  'All content collected is for training, educational and non-commercial/public-interest purposes, subject to editorial review and applicable laws.',
  'Misuse of this ID is prohibited.',
];

function Signature({ path, title }: { path: string; title: string }) {
  return (
    <div className="flex-1 flex flex-col items-center text-center">
      <svg width="74" height="30" viewBox="0 0 100 40" aria-hidden="true">
        <path d={path} fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="w-[84px] h-px bg-slate-400 mb-[3px]" />
      <p className="text-[9px] font-bold leading-tight text-black">{title}</p>
      <p className="text-[9px] font-bold leading-tight text-black">Sports Media Blue Zone</p>
    </div>
  );
}

export function PressIdCardBack({ student }: { student: StudentIdCardData }) {
  return (
    <div
      className={`${cardFont.className} relative w-full h-full rounded-[22px] overflow-hidden select-none bg-gradient-to-b from-white to-[#E4EEFB] shadow-xl ring-1 ring-slate-300/70`}
      aria-label={`Back of press ID ${student.idNo}`}
    >
      {/* TOP NAVY BAND */}
      <svg viewBox="0 0 380 150" className="absolute top-0 left-0 w-full" aria-hidden="true">
        <rect width="380" height="150" fill="#12327F" />
        <path d="M0 0H380V30C260 70 120 10 0 60Z" fill="#1D49A8" opacity="0.7" />
        <path d="M0 150V84C110 50 250 110 380 62V150Z" fill={DEEP_NAVY} opacity="0.6" />
      </svg>
      <LanyardSlot />

      <p
        className={`${scriptFont.className} absolute top-[12px] left-[30px] text-white text-[18px] font-bold leading-[1.0] -rotate-[9deg]`}
      >
        More Sports
        <br />
        Brighter Lives
      </p>
      <p
        className={`${scriptFont.className} absolute top-[10px] right-[26px] text-right text-white text-[17px] font-bold leading-[1.0] -rotate-[4deg]`}
      >
        Students Today
        <br />
        Stronger Nation
        <br />
        Tomorrow
      </p>

      {/* TITLE PANEL */}
      <div
        className="absolute top-[74px] left-[10px] right-[10px] h-[70px] rounded-t-[16px] border border-b-0 border-sky-400/50 pt-[7px] text-center text-white whitespace-nowrap"
        style={{ backgroundColor: DEEP_NAVY }}
      >
        <h2 className="text-[24px] font-black leading-none tracking-wide">SPORTS MEDIA BLUE ZONE</h2>
        <p className="mt-[5px] text-[11.5px] font-medium leading-none">
          An Independent Sports Media &amp; Educational Initiative
        </p>
      </div>

      {/* PURPOSE PANEL */}
      <div className="absolute top-[124px] left-[10px] right-[10px] h-[382px] rounded-[12px] bg-white border border-sky-700/40 shadow-sm px-[13px] pt-[7px] pb-[6px] flex flex-col justify-between">
        <div>
          <h3 className="text-center text-[16px] font-black leading-tight tracking-wide" style={{ color: BLUE }}>
            PURPOSE OF THIS ID
          </h3>
          <p className="mt-[2px] text-[10.6px] leading-[1.3] text-black">
            This ID is issued to a Trainee Sports Media Journalist for identification during authorised
            training, field assignments and sports journalism activities under the Sports Media Blue Zone
            programme.
          </p>
          <ul className="mt-[5px] space-y-[2.5px] text-[10.6px] leading-[1.3] text-black">
            {ID_TERMS.map((term) => (
              <li key={term} className="flex gap-[6px]">
                <span className="mt-[4px] w-[5px] h-[5px] rounded-full shrink-0" style={{ backgroundColor: NAVY }} />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="h-px" style={{ backgroundColor: BLUE }} />
          <p className="mt-[5px] text-center text-[11.2px] font-bold italic leading-[1.22]" style={{ color: BLUE }}>
            “Responsible Sports Communication
            <br />
            for a Healthier, Stronger and United Society”
          </p>

          <div className="mt-[3px] flex items-end justify-between">
            <Signature
              title="Programme Director"
              path="M 12 30 C 22 8, 30 4, 30 16 C 30 28, 22 34, 34 24 C 42 17, 44 26, 50 22 C 56 18, 58 26, 64 21 C 70 16, 78 24, 92 18"
            />
            <div className="shrink-0 px-[2px]">
              <OfficialStampSvg size={78} />
            </div>
            <Signature
              title="Authorised Signatory"
              path="M 10 28 C 16 6, 26 2, 24 18 C 22 32, 34 10, 38 22 C 41 30, 48 12, 52 22 C 55 29, 62 14, 66 22 C 70 28, 80 8, 76 20 C 74 28, 86 22, 94 14"
            />
          </div>
        </div>
      </div>

      {/* CONTACT & TRICOLOUR */}
      <div className="absolute top-[513px] left-[26px] space-y-[5px] text-[11.5px] font-medium text-black">
        <p className="flex items-center gap-[8px] leading-none">
          <span className="w-[17px] h-[17px] rounded-full flex items-center justify-center text-white" style={{ backgroundColor: NAVY }}>
            <FaGlobe size={10} />
          </span>
          www.sportsmedia.world
        </p>
        <p className="flex items-center gap-[8px] leading-none">
          <span className="w-[17px] h-[17px] rounded-[4px] flex items-center justify-center text-white bg-[#E11D2A]">
            <FaYoutube size={11} />
          </span>
          Sports Media Blue Zone
        </p>
        <p className="flex items-center gap-[8px] leading-none">
          <span className="w-[17px] h-[17px] rounded-full flex items-center justify-center text-white" style={{ backgroundColor: NAVY }}>
            <FaEnvelope size={9} />
          </span>
          info@sportsmedia.world
        </p>
      </div>

      <div className="absolute top-[508px] right-[20px] w-[168px]">
        <p
          className={`${scriptFont.className} text-center text-[19px] font-bold leading-[0.95] -rotate-[7deg]`}
          style={{ color: NAVY }}
        >
          Together for,
          <br />
          Grassroots Sports
        </p>
        <svg viewBox="0 0 170 40" className="w-full -mt-[4px]" aria-hidden="true">
          <path d="M6 30C50 10 100 34 164 8C120 34 60 18 6 30Z" fill="#FF8A1F" />
          <path d="M10 34C56 16 104 38 162 15C116 38 62 23 10 34Z" fill="#E5E7EB" />
          <path d="M16 38C62 22 108 42 158 22C112 42 66 28 16 38Z" fill="#138808" />
        </svg>
      </div>

      {/* BOTTOM NAVY FOOTER */}
      <div
        className="absolute bottom-0 inset-x-0 h-[42px] flex items-center justify-center text-white text-[12px] font-bold tracking-[0.05em] whitespace-nowrap"
        style={{ backgroundColor: DEEP_NAVY }}
      >
        SPORTS BUILDS CHARACTER
        <span className="mx-[10px] font-normal opacity-80">|</span>
        MEDIA BRINGS CHANGE
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FRONT & BACK SHOWN SIDE BY SIDE                                            */
/* -------------------------------------------------------------------------- */
export function PressIdCardBothSides({
  student,
  cardWidth = CARD_W,
  printable = true,
}: {
  student: StudentIdCardData;
  cardWidth?: number;
  /** Also mount the 54 mm x 86 mm print sheet used by window.print(). */
  printable?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-5 justify-items-center w-full"
      style={{ maxWidth: cardWidth * 2 + 20 }}
    >
      <CardScaler maxWidth={cardWidth}>
        <PressIdCardFront student={student} />
      </CardScaler>
      <CardScaler maxWidth={cardWidth}>
        <PressIdCardBack student={student} />
      </CardScaler>
      {printable && <PressIdCardPrintSheet student={student} />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PRINT SHEET: each face on its own 54 mm x 86 mm page, nothing else on it   */
/* -------------------------------------------------------------------------- */
const subscribeNoop = () => () => {};

export function PressIdCardPrintSheet({ student }: { student: StudentIdCardData }) {
  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);
  if (!isClient) return null;

  const faces: { side: PressIdCardSide; face: React.ReactNode }[] = [
    { side: 'front', face: <PressIdCardFront student={student} /> },
    { side: 'back', face: <PressIdCardBack student={student} /> },
  ];

  // Mounted on <body> so the dashboard layout cannot clip or scale the printed card
  return createPortal(
    <div id="id-card-print-root">
      <style>{`@page { size: ${PRINT_W_MM}mm ${PRINT_H_MM}mm; margin: 0; }`}</style>
      {faces.map(({ side, face }) => (
        <div
          key={side}
          data-side={side}
          className="id-card-print-page"
          style={{ width: `${PRINT_W_MM}mm`, height: `${PRINT_H_MM}mm` }}
        >
          <div
            className="origin-center"
            style={{ width: CARD_W, height: CARD_H, transform: `scale(${PRINT_SCALE})` }}
          >
            {face}
          </div>
        </div>
      ))}
    </div>,
    document.body
  );
}

/* -------------------------------------------------------------------------- */
/* FULL FLIPPABLE ID CARD CONTAINER WITH ACTIONS                              */
/* -------------------------------------------------------------------------- */
export function PressIdCard({
  initialStudent,
  allowStudentSwitch = true,
}: {
  initialStudent?: Partial<StudentIdCardData>;
  allowStudentSwitch?: boolean;
}) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudent?.id || PRESET_STUDENTS[0].id
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Find active student or construct from initial
  const activeStudent: StudentIdCardData = {
    ...(PRESET_STUDENTS.find((s) => s.id === selectedStudentId) || PRESET_STUDENTS[0]),
    ...(initialStudent || {}),
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* CARD TOP CONTROLS BAR */}
      <div className="w-full max-w-[420px] mb-3 flex items-center justify-between gap-2 px-1">
        {/* Student Switcher Dropdown */}
        {allowStudentSwitch && (
          <div className="relative">
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="bg-white border border-slate-200 text-slate-800 text-xs font-semibold py-1.5 px-3 pr-7 rounded-xl shadow-xs hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {PRESET_STUDENTS.map((std) => (
                <option key={std.id} value={std.id}>
                  {std.name} ({std.idNo})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Flip Side Toggle Pill */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setIsFlipped(false)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !isFlipped
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Front
          </button>
          <button
            type="button"
            onClick={() => setIsFlipped(true)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              isFlipped
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Back
          </button>
        </div>
      </div>

      {/* 3D FLIPPABLE CARD COMPONENT */}
      <CardScaler>
        <div
          className="w-full h-full perspective-1000 cursor-pointer group select-none"
          onClick={() => setIsFlipped((prev) => !prev)}
          title="Click to Flip Card"
        >
          {/* Flippable Card Body */}
          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ease-in-out ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <PressIdCardFront student={activeStudent} />
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <PressIdCardBack student={activeStudent} />
            </div>
          </div>
        </div>
      </CardScaler>

      {/* INTERACTIVE ACTIONS ROW */}
      <div className="w-full max-w-[420px] mt-4 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
        >
          <RotateCw size={14} className={isFlipped ? 'rotate-180 transition-transform' : ''} />
          <span>Flip to {isFlipped ? 'Front' : 'Back'}</span>
        </button>

        <button
          type="button"
          onClick={() => setShowPrintModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Eye size={14} className="text-blue-600" />
          <span>View Both Sides</span>
        </button>

        <button
          type="button"
          onClick={() => printPressIdCard('front')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Printer size={14} className="text-emerald-600" />
          <span>Print Front</span>
        </button>

        <button
          type="button"
          onClick={() => printPressIdCard('back')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <Printer size={14} className="text-emerald-600" />
          <span>Print Back</span>
        </button>
      </div>

      <PressIdCardPrintSheet student={activeStudent} />

      {/* QUICK STATUS BADGE */}
      <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Verified Digital Press Card • Valid through {activeStudent.validTill}</span>
      </div>

      {/* PRINT & PREVIEW MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Trainee Press ID Card - Print Preview
                </h3>
                <p className="text-xs text-slate-500">
                  Each side prints separately at 54 mm × 86 mm
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => printPressIdCard('front')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Front</span>
                </button>
                <button
                  type="button"
                  onClick={() => printPressIdCard('back')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Printer size={14} />
                  <span>Print Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* DUAL SIDE PREVIEW GRID */}
            <div className="flex justify-center py-2">
              <PressIdCardBothSides student={activeStudent} cardWidth={350} printable={false} />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
              Tip: In the print dialog keep <strong>Scale 100%</strong> and <strong>Margins: None</strong>, and turn on <strong>Background graphics</strong>. The page size is already 54 mm × 86 mm.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
