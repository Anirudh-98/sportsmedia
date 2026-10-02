'use client';

import React, { useLayoutEffect, useRef } from 'react';

interface FitToScreenProps {
  children: React.ReactNode;
  /** Classes for the outer frame (the box the content must fit inside). */
  className?: string;
  /** Classes for the scaled content wrapper. */
  contentClassName?: string;
}

const DESKTOP_QUERY = '(min-width: 1024px)';
const MIN_ZOOM = 0.3;

/**
 * Keeps a page inside the viewport on desktop without scrolling.
 * If the content is taller than the frame it is scaled down (CSS zoom, so it
 * reflows to use the extra width) by just enough to fit. Below the `lg`
 * breakpoint the page scrolls normally.
 */
export const FitToScreen: React.FC<FitToScreenProps> = ({
  children,
  className = '',
  contentClassName = '',
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!frame || !content) return;

    const desktop = window.matchMedia(DESKTOP_QUERY);
    let raf = 0;

    const fits = () => frame.scrollHeight <= frame.clientHeight + 1;

    const fit = () => {
      content.style.zoom = '';
      frame.style.overflowY = '';
      if (!desktop.matches || fits()) return;

      let lo = MIN_ZOOM;
      let hi = 1;
      for (let i = 0; i < 8; i++) {
        const mid = (lo + hi) / 2;
        content.style.zoom = String(mid);
        if (fits()) lo = mid;
        else hi = mid;
      }
      content.style.zoom = String(lo);

      // Safety net: content that cannot be scaled to fit stays reachable by scrolling
      if (!fits()) {
        content.style.zoom = '';
        frame.style.overflowY = 'auto';
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    fit();

    const observer = new ResizeObserver(schedule);
    observer.observe(frame);
    observer.observe(content);
    desktop.addEventListener('change', schedule);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      desktop.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <div ref={frameRef} className={`lg:min-h-0 lg:overflow-hidden ${className}`}>
      <div ref={contentRef} className={`flex flex-col lg:min-h-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};
