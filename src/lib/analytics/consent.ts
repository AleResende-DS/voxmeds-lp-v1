import { ConsentState, CONSENT_VERSION, DEFAULT_DENIED_CONSENT } from './types';
import { readConsent, writeConsent } from './consent-storage';
import { getOrCreateAnonymousId } from './identity';

type ConsentChoice = Pick<ConsentState, 'analytics' | 'marketing'>;

export function toGoogleConsentSignals(state: ConsentState) {
  const m = state.marketing === 'granted' ? 'granted' : 'denied';
  const a = state.analytics === 'granted' ? 'granted' : 'denied';
  return {
    ad_storage: m,
    ad_user_data: m,
    ad_personalization: m,
    analytics_storage: a,
    functionality_storage: 'granted',
    security_storage: 'granted',
    personalization_storage: a,
  } as const;
}

export function applyConsent(choice: ConsentChoice, source: 'banner' | 'dialog' | 'footer'): ConsentState {
  const state: ConsentState = {
    necessary: 'granted',
    analytics: choice.analytics,
    marketing: choice.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.dataLayer as any[]).push(['consent', 'update', toGoogleConsentSignals(state)]);
  }

  writeConsent(state);

  if (typeof window !== 'undefined') {
    const anonymousId = getOrCreateAnonymousId();
    void fetch('/api/consent/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state, source, anonymousId }),
      keepalive: true,
    }).catch(() => { /* fire-and-forget */ });
  }

  return state;
}

export function getConsentOrDefault(): ConsentState {
  return readConsent() ?? { ...DEFAULT_DENIED_CONSENT, timestamp: new Date().toISOString() };
}

export function hasMarketingConsent(): boolean {
  return getConsentOrDefault().marketing === 'granted';
}

export function hasAnalyticsConsent(): boolean {
  return getConsentOrDefault().analytics === 'granted';
}

