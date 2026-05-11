import posthog from 'posthog-js';
import { hasAnalyticsConsent } from './consent';
import { getOrCreateAnonymousId } from './identity';

let initialized = false;

export function initPostHog(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  const consent = hasAnalyticsConsent();
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: false,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-sensitive]',
    },
    persistence: consent ? 'localStorage+cookie' : 'memory',
    disable_session_recording: !consent,
    bootstrap: { distinctID: getOrCreateAnonymousId() },
  });

  initialized = true;
}

export function captureEvent(event: string, properties: Record<string, unknown>): void {
  if (!initialized) return;
  posthog.capture(event, properties);
}

export function identifyUser(userId: string, traits: Record<string, unknown>): void {
  if (!initialized) return;
  const anonId = getOrCreateAnonymousId();
  posthog.identify(userId, traits);
  posthog.alias(anonId);
}

export function resetPostHog(): void {
  if (!initialized) return;
  posthog.reset();
}

export function refreshPostHogPersistence(): void {
  if (!initialized) return;
  const consent = hasAnalyticsConsent();
  posthog.set_config({
    persistence: consent ? 'localStorage+cookie' : 'memory',
    disable_session_recording: !consent,
  });
}
