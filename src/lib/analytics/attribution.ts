import { readCookie, writeCookie } from './cookie-utils';

const ATTRIBUTION_COOKIE = 'mw_attribution';
const TTL_DAYS = 90;
const COOKIE_DOMAIN = '.medwiser.app';

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  referrer: string;
  landing_page: string;
  first_seen_at: string;
}

function getCookieDomain(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  // Use document.location (reflects actual cookie jar origin) rather than
  // window.location, which may be overridden in tests while the cookie jar
  // still operates on the original document origin.
  const host = document.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' ? undefined : COOKIE_DOMAIN;
}

export function captureFirstTouch(): void {
  if (typeof window === 'undefined') return;
  if (readCookie(ATTRIBUTION_COOKIE)) return;

  const url = new URL(window.location.href);
  const attribution: Attribution = {
    utm_source: url.searchParams.get('utm_source') ?? undefined,
    utm_medium: url.searchParams.get('utm_medium') ?? undefined,
    utm_campaign: url.searchParams.get('utm_campaign') ?? undefined,
    utm_term: url.searchParams.get('utm_term') ?? undefined,
    utm_content: url.searchParams.get('utm_content') ?? undefined,
    gclid: url.searchParams.get('gclid') ?? undefined,
    fbclid: url.searchParams.get('fbclid') ?? undefined,
    referrer: document.referrer,
    landing_page: window.location.href,
    first_seen_at: new Date().toISOString(),
  };

  writeCookie(ATTRIBUTION_COOKIE, JSON.stringify(attribution), {
    domain: getCookieDomain(),
    maxAge: TTL_DAYS * 86400,
    sameSite: 'Lax',
    secure: true,
  });
}

export function getAttribution(): Attribution | null {
  const raw = readCookie(ATTRIBUTION_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}
