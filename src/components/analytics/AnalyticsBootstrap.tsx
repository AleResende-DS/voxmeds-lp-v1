'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export function AnalyticsBootstrap() {
  useEffect(() => {
    analytics.init();
    analytics.track('page_view', {
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }, []);
  return null;
}
