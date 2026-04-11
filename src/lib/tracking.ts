const LEAD_EVENT_NAME = process.env.NEXT_PUBLIC_LEAD_EVENT_NAME ?? "lead";

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
  window.dataLayer.push({ event: LEAD_EVENT_NAME });
}
