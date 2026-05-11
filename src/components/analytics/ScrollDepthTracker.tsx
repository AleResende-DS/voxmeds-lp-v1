'use client';

import { useEffect, useRef } from 'react';
import { analytics } from '@/lib/analytics';

const MILESTONES = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      for (const m of MILESTONES) {
        if (pct >= m && !fired.current.has(m)) {
          fired.current.add(m);
          analytics.track('scroll_depth', { depth_percent: m });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
