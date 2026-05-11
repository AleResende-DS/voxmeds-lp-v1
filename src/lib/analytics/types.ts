export type EventName =
  | 'page_view'
  | 'lead'
  | 'demo_consultations_completed'
  | 'initiate_checkout'
  | 'start_trial'
  | 'subscribe'
  | 'first_consultation_started'
  | 'document_generated'
  | 'identify'
  | 'consent_seen'
  | 'consent_accepted'
  | 'consent_rejected'
  | 'consent_customized'
  | 'consent_revoked'
  | 'cta_clicked'
  | 'register_started'
  | 'consultation_started'
  | 'feature_used'
  | 'scroll_depth'
  | 'pricing_viewed';

export interface BaseProperties {
  event_id: string;
  event_time: string;
  anonymous_id?: string;
  user_id?: string;
  consent_analytics: 'granted' | 'denied';
  consent_marketing: 'granted' | 'denied';
  page_path?: string;
  page_title?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
}

export type EventProperties<E extends EventName> =
  E extends 'page_view'
    ? { page_path: string; page_title?: string }
    : E extends 'lead'
    ? { signup_method: 'google' | 'apple' | 'email'; value: 150; currency: 'BRL' }
    : E extends 'demo_consultations_completed'
    ? { days_since_signup: number; value: 750; currency: 'BRL' }
    : E extends 'initiate_checkout'
    ? { plan_interval: 'MONTHLY' | 'YEARLY'; value: number; currency: 'BRL' }
    : E extends 'start_trial'
    ? { plan_interval: 'MONTHLY' | 'YEARLY'; value: 2100; currency: 'BRL' }
    : E extends 'subscribe'
    ? { plan_interval: 'MONTHLY' | 'YEARLY'; value: 3000; actual_value: number; currency: 'BRL' }
    : E extends 'cta_clicked'
    ? { cta_name: string; cta_position?: string; cta_destination?: string }
    : E extends 'scroll_depth'
    ? { depth_percent: 25 | 50 | 75 | 100 }
    : E extends 'consent_seen' | 'consent_accepted' | 'consent_rejected' | 'consent_customized' | 'consent_revoked'
    ? { source: 'banner' | 'dialog' | 'footer' }
    : Record<string, unknown>;

export interface ConsentState {
  necessary: 'granted';
  analytics: 'granted' | 'denied';
  marketing: 'granted' | 'denied';
  timestamp: string;
  version: string;
}

export const CONSENT_VERSION = '1.0';

export const DEFAULT_DENIED_CONSENT: ConsentState = {
  necessary: 'granted',
  analytics: 'denied',
  marketing: 'denied',
  timestamp: '',
  version: CONSENT_VERSION,
};

export interface TrackOptions {
  eventId?: string;
  skipPosthog?: boolean;
}
