'use client';

import { ReactNode } from 'react';
import { analytics, getOrCreateAnonymousId, getAttribution } from '@/lib/analytics';

interface Props {
  ctaName: string;
  href: string;
  position?: string;
  className?: string;
  children: ReactNode;
}

function appendAttributionToUrl(href: string): string {
  try {
    const url = new URL(href);
    const anonId = getOrCreateAnonymousId();
    url.searchParams.set('mw_anon_id', anonId);

    const attr = getAttribution();
    if (attr) {
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const) {
        const v = attr[key];
        if (v && !url.searchParams.has(key)) url.searchParams.set(key, v);
      }
    }

    return url.toString();
  } catch {
    return href;
  }
}

export function CtaButton({ ctaName, href, position, className, children }: Props) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    analytics.track('cta_clicked', {
      cta_name: ctaName,
      cta_position: position,
      cta_destination: href,
    });
    const finalHref = appendAttributionToUrl(href);
    window.location.href = finalHref;
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
