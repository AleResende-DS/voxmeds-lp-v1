'use client';

import { useState } from 'react';
import { CONSENT_COPY } from './consent-copy';
import { ConsentPreferencesDialog } from './ConsentPreferencesDialog';

export function ConsentSummary() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        className="text-sm text-zinc-500 underline hover:text-zinc-700">
        {CONSENT_COPY.footer.manage}
      </button>
      <ConsentPreferencesDialog open={open} onOpenChange={setOpen} source="footer" />
    </>
  );
}
