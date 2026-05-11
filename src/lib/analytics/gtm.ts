type DataLayerPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerPayload[];
  }
}

/**
 * Internal helper. Use `analytics.track()` from `index.ts` instead.
 * Pushes a single dataLayer event. No consent gating here — gating is
 * handled by Google Consent Mode v2 + GTM tag-level rules.
 */
export function pushDataLayer(event: string, payload: DataLayerPayload = {}): void {
  if (typeof window === 'undefined' || !event) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

/** @deprecated — kept as compatibility shim during Phase 2 refactor. Will be removed after Tasks 2.14, 2.15, 2.23. */
export function isTrackingEnabled(): boolean {
  return typeof window !== 'undefined';
}
