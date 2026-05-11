import { readCookie, writeCookie } from './cookie-utils';

const ANON_ID_COOKIE = 'mw_anon_id';
const ANON_ID_TTL_DAYS = 365;
const USER_ID_KEY = 'mw_user_id';
const COOKIE_DOMAIN = '.medwiser.app';

function getCookieDomain(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  // Use document.location (reflects actual cookie jar origin) rather than
  // window.location, which may be overridden in tests while the cookie jar
  // still operates on the original document origin.
  const host = document.location.hostname;
  return host === 'localhost' || host === '127.0.0.1' ? undefined : COOKIE_DOMAIN;
}

export function getOrCreateAnonymousId(): string {
  let id = readCookie(ANON_ID_COOKIE);
  if (!id) {
    id = crypto.randomUUID();
    writeCookie(ANON_ID_COOKIE, id, {
      domain: getCookieDomain(),
      maxAge: ANON_ID_TTL_DAYS * 86400,
      sameSite: 'Lax',
      secure: true,
    });
  }
  return id;
}

export function setUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(USER_ID_KEY, userId);
}

export function getUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(USER_ID_KEY);
}

export function clearIdentity(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(USER_ID_KEY);
}
