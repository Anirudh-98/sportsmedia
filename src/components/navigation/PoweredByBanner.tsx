import React from 'react';

export const PoweredByBanner: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-1">
      <div className="relative inline-flex items-center justify-center bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] text-white py-1.5 px-6 sm:px-10 rounded-xs shadow-md">
        {/* Ribbon Fold decorative cuts on sides */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center">
          <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest text-white uppercase drop-shadow-xs">
            OFFICIAL DIGITAL PLATFORM POWERED BY
          </span>
          
          {/* Black rounded pill badge with yellow .WORLD */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-black/90 rounded-full border border-amber-400/80 shadow-xs">
            <svg
              className="w-3.5 h-3.5 text-amber-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span className="text-xs sm:text-sm font-black tracking-wider text-white">
              SPORTSMEDIA<span className="text-amber-400">.WORLD</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

