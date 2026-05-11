'use client';

import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { CONSENT_COPY } from './consent-copy';
import { analytics, getConsentOrDefault } from '@/lib/analytics';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: 'banner' | 'dialog' | 'footer';
}

export function ConsentPreferencesDialog({ open, onOpenChange, source }: Props) {
  const [analyticsOn, setAnalyticsOn] = useState(false);
  const [marketingOn, setMarketingOn] = useState(false);

  useEffect(() => {
    if (!open) return;
    const current = getConsentOrDefault();
    setAnalyticsOn(current.analytics === 'granted');
    setMarketingOn(current.marketing === 'granted');
    analytics.track('consent_seen', { source });
  }, [open, source]);

  function rejectAll() {
    analytics.setConsent({ analytics: 'denied', marketing: 'denied' }, source);
    analytics.track('consent_rejected', { source });
    onOpenChange(false);
  }

  function save() {
    analytics.setConsent({
      analytics: analyticsOn ? 'granted' : 'denied',
      marketing: marketingOn ? 'granted' : 'denied',
    }, source);
    analytics.track('consent_customized', { source });
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-zinc-900">
            {CONSENT_COPY.dialog.title}
          </Dialog.Title>

          <div className="mt-6 space-y-4">
            <Row title={CONSENT_COPY.dialog.necessary.title}
                 description={CONSENT_COPY.dialog.necessary.description}
                 checked disabled />
            <Row title={CONSENT_COPY.dialog.analytics.title}
                 description={CONSENT_COPY.dialog.analytics.description}
                 checked={analyticsOn} onCheckedChange={setAnalyticsOn} />
            <Row title={CONSENT_COPY.dialog.marketing.title}
                 description={CONSENT_COPY.dialog.marketing.description}
                 checked={marketingOn} onCheckedChange={setMarketingOn} />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={rejectAll}
              className="rounded-md border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
              {CONSENT_COPY.dialog.rejectAll}
            </button>
            <button type="button" onClick={save}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              {CONSENT_COPY.dialog.save}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface RowProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Row({ title, description, checked, onCheckedChange, disabled }: RowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-zinc-100 pt-4 first:border-t-0 first:pt-0">
      <div>
        <h4 className="text-sm font-medium text-zinc-900">{title}</h4>
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      </div>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="relative h-6 w-10 shrink-0 cursor-pointer rounded-full bg-zinc-200 transition-colors data-[state=checked]:bg-emerald-500 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60">
        <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-[18px]" />
      </Switch.Root>
    </div>
  );
}
