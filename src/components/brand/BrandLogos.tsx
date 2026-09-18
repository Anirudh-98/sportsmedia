import Image from 'next/image';

/**
 * Blue Zone Official Logo using /bluezonelogo.webp
 */
export const BlueZoneTreeLogo: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 64
}) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/bluezonelogo.webp"
        alt="Sports Media Blue Zone Logo"
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
    </div>
  );
};


/**
 * Full Sports Media Blue Zone logo with text
 */
export const SportsMediaBlueZoneLogo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({
  size = 'md'
}) => {
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center p-1 bg-white rounded-lg shadow-sm border border-slate-200">
        <BlueZoneTreeLogo size={isSmall ? 40 : isLarge ? 64 : 52} />
      </div>
      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none text-[#0d2240] uppercase ${
            isSmall ? 'text-xs' : isLarge ? 'text-lg' : 'text-sm'
          }`}
        >
          SPORTS MEDIA
        </span>
        <span
          className={`font-extrabold tracking-wider leading-none text-[#1565c0] ${
            isSmall ? 'text-sm' : isLarge ? 'text-xl' : 'text-base'
          }`}
        >
          BLUE ZONE
        </span>
        <span className="text-[11px] font-bold text-slate-700 tracking-wider uppercase mt-0.5">
          IDENTIFY • NURTURE • PROMOTE • EMPOWER
        </span>
      </div>
    </div>
  );
};

/**
 * The distinctive Center Header Banner: SPORTSMEDIA.WORLD
 */
export const SportsMediaWorldBanner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Dark Navy / Black rounded pill box */}
      <div className="relative flex items-center justify-center gap-2.5 px-6 py-2 bg-gradient-to-r from-[#032D59] via-[#061224] to-[#032D59] border-2 border-slate-800 rounded-2xl shadow-md">
        {/* Globe icon */}
        <div className="relative w-8 h-8 rounded-full bg-slate-900 border border-amber-400 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-amber-400 animate-spin-slow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </div>

        {/* Big SPORTSMEDIA.WORLD */}
        <div className="flex items-baseline">
          <h1 className="text-2xl md:text-3xl font-black tracking-wider text-white">
            SPORTSMEDIA<span className="text-[#F4C430]">.WORLD</span>
          </h1>
        </div>
      </div>

      {/* Yellow subline */}
      <div className="text-xs md:text-sm font-bold text-amber-500 tracking-wide mt-1">
        — The Digital Gateway to Sports Talent —
      </div>

      {/* Second tier title and sub-tagline */}
      <div className="mt-1 flex flex-col items-center">
        <h2 className="text-base md:text-lg font-black tracking-wide text-[#032D59] uppercase">
          SPORTS MEDIA <span className="text-[#0B5FA5]">BLUE ZONE</span>
        </h2>
        <div className="flex items-center gap-2 text-xs md:text-[13px] font-black text-[#032D59] tracking-widest uppercase mt-0.5">
          <span>IDENTIFY</span>
          <span className="text-amber-500">•</span>
          <span>NURTURE</span>
          <span className="text-amber-500">•</span>
          <span>PROMOTE</span>
          <span className="text-amber-500">•</span>
          <span>EMPOWER</span>
        </div>
        {/* Wing line for School - College - Grassroots Sports */}
        <div className="flex items-center gap-2 mt-0.5">
          <div className="h-[2px] w-10 md:w-20 bg-gradient-to-r from-transparent to-[#0B5FA5]" />
          <span className="text-xs md:text-sm font-extrabold text-[#032D59] tracking-wide">
            School • College • Grassroots Sports
          </span>
          <div className="h-[2px] w-10 md:w-20 bg-gradient-to-l from-transparent to-[#0B5FA5]" />
        </div>
      </div>
    </div>
  );
};

