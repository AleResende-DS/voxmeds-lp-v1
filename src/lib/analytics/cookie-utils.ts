export interface CookieOptions {
  domain?: string;
  maxAge?: number;
  path?: string;
  sameSite?: 'Lax' | 'Strict' | 'None';
  secure?: boolean;
}

export function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function writeCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return;
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`path=${options.path ?? '/'}`);
  if (options.domain) parts.push(`domain=${options.domain}`);
  if (typeof options.maxAge === 'number') parts.push(`max-age=${options.maxAge}`);
  parts.push(`SameSite=${options.sameSite ?? 'Lax'}`);
  if (options.secure ?? true) parts.push('Secure');
  document.cookie = parts.join('; ');
}

export function clearCookie(name: string, options: Pick<CookieOptions, 'domain' | 'path'> = {}): void {
  writeCookie(name, '', { ...options, maxAge: 0 });
}
