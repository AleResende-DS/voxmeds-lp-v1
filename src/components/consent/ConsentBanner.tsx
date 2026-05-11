'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CONSENT_COPY } from './consent-copy';
import { ConsentPreferencesDialog } from './ConsentPreferencesDialog';
import { analytics } from '@/lib/analytics';
import { readConsent } from '@/lib/analytics/consent-storage';

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      setOpen(true);
      analytics.track('consent_seen', { source: 'banner' });
    }
  }, []);

  function acceptAll() {
    analytics.setConsent({ analytics: 'granted', marketing: 'granted' }, 'banner');
    analytics.track('consent_accepted', { source: 'banner' });
    setOpen(false);
  }

  function customize() {
    setDialogOpen(true);
  }

  function handleDialogChange(isOpen: boolean) {
    setDialogOpen(isOpen);
    if (!isOpen && readConsent()) setOpen(false);
  }

  if (!open && !dialogOpen) return null;

  return (
    <>
      {open && (
        <div role="region" aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[min(480px,calc(100vw-32px))] flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 shadow-lg animate__animated animate__slideInUp animate__faster">
          <div className="flex items-start gap-3">
            <span aria-hidden className="text-lg">🍪</span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900">{CONSENT_COPY.banner.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{CONSENT_COPY.banner.body}</p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={customize}
              className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
              {CONSENT_COPY.banner.customize}
            </button>
            <button type="button" onClick={acceptAll}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              {CONSENT_COPY.banner.acceptAll}
            </button>
          </div>

          <p className="text-xs text-zinc-500">
            {CONSENT_COPY.banner.privacyPolicyText}{' '}
            <Link href={CONSENT_COPY.banner.privacyPolicyHref} className="underline">
              {CONSENT_COPY.banner.privacyPolicyLinkText}
            </Link>
            .
          </p>
        </div>
      )}

      <ConsentPreferencesDialog open={dialogOpen} onOpenChange={handleDialogChange} source="dialog" />
    </>
  );
}
