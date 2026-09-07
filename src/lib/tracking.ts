declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __leadClicked?: boolean;
  }
}

export function trackLeadEvent(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.__leadClicked = true;
  window.dataLayer = window.dataLayer || [];
  // A CTA click is not a completed account registration.
  window.dataLayer.push({ event: 'cta_clicked', cta_name: 'start_registration' });
}
