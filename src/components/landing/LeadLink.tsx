"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackLeadEvent } from "@/lib/tracking";
import { analytics } from "@/lib/analytics";

type LeadLinkProps = ComponentProps<typeof Link> & {
  ctaName?: string;
  position?: string;
};

export function LeadLink({ onClick, ctaName, position, ...props }: LeadLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackLeadEvent();
        if (ctaName) {
          analytics.track('cta_clicked', {
            cta_name: ctaName,
            cta_position: position,
            cta_destination: typeof props.href === 'string' ? props.href : String(props.href),
          });
        }
        onClick?.(event);
      }}
    />
  );
}
