import { track } from './track';
import { setUserId, clearIdentity, getOrCreateAnonymousId, getUserId } from './identity';
import { applyConsent, getConsentOrDefault, hasAnalyticsConsent, hasMarketingConsent } from './consent';
import { initPostHog, identifyUser, resetPostHog, refreshPostHogPersistence } from './posthog';
import { captureFirstTouch, getAttribution } from './attribution';

export const analytics = {
  track,
  identify(userId: string, traits: { email?: string; phone?: string; name?: string } = {}): void {
    setUserId(userId);
    identifyUser(userId, traits);
  },
  reset(): void {
    clearIdentity();
    resetPostHog();
  },
  setConsent(choice: { analytics: 'granted' | 'denied'; marketing: 'granted' | 'denied' }, source: 'banner' | 'dialog' | 'footer'): void {
    applyConsent(choice, source);
    refreshPostHogPersistence();
  },
  init(): void {
    captureFirstTouch();
    initPostHog();
  },
};

export {
  getOrCreateAnonymousId,
  getUserId,
  getConsentOrDefault,
  hasAnalyticsConsent,
  hasMarketingConsent,
  getAttribution,
};

export type { EventName, EventProperties, ConsentState } from './types';
