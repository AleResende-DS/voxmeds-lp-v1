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

/** Google consumes command messages as Arguments objects, not plain arrays. */
export function pushGoogleConsentCommand(
  ..._command: ['consent', 'update', Record<string, string>]
): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // Keep the gtag protocol's Arguments object intact.
  window.dataLayer.push(arguments as unknown as DataLayerPayload);
}

/** @deprecated — kept as compatibility shim during Phase 2 refactor. Will be removed after Tasks 2.14, 2.15, 2.23. */
export function isTrackingEnabled(): boolean {
  return typeof window !== 'undefined';
}
