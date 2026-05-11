import { readCookie, writeCookie } from './cookie-utils';
import { ConsentState, CONSENT_VERSION } from './types';

const CONSENT_COOKIE = 'mw_consent';
const TTL_DAYS = 365;
const COOKIE_DOMAIN = '.medwiser.app';

function getCookieDomain(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  // Use document.location (reflects actual cookie jar origin) rather than
  // window.location, which may be overridden in tests while the cookie jar
  // still operates on the original document origin.
  const host = document.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' ? undefined : COOKIE_DOMAIN;
}

export function readConsent(): ConsentState | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  writeCookie(CONSENT_COOKIE, JSON.stringify(state), {
    domain: getCookieDomain(),
    maxAge: TTL_DAYS * 86400,
    sameSite: 'Lax',
    secure: true,
  });
}
