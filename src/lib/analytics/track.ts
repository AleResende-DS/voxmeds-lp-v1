import { pushDataLayer } from './gtm';
import { captureEvent } from './posthog';
import { getOrCreateAnonymousId, getUserId } from './identity';
import { getAttribution } from './attribution';
import { getConsentOrDefault } from './consent';
import { EventName, EventProperties, TrackOptions, BaseProperties } from './types';

function buildBaseProperties(): BaseProperties {
  const consent = getConsentOrDefault();
  const attr = getAttribution();
  return {
    event_id: '',
    event_time: new Date().toISOString(),
    anonymous_id: getOrCreateAnonymousId(),
    user_id: getUserId() ?? undefined,
    consent_analytics: consent.analytics,
    consent_marketing: consent.marketing,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    utm_source: attr?.utm_source,
    utm_medium: attr?.utm_medium,
    utm_campaign: attr?.utm_campaign,
    utm_term: attr?.utm_term,
    utm_content: attr?.utm_content,
    gclid: attr?.gclid,
    fbclid: attr?.fbclid,
  };
}

export function track<E extends EventName>(
  event: E,
  props: EventProperties<E>,
  options?: TrackOptions,
): void {
  const base = buildBaseProperties();
  const eventId = options?.eventId ?? crypto.randomUUID();
  const fullProps = { ...base, ...(props as Record<string, unknown>), event_id: eventId };

  pushDataLayer(event, fullProps);

  if (!options?.skipPosthog) {
    captureEvent(event, fullProps);
  }
}
