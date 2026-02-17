"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackLeadEvent } from "@/lib/tracking";

type LeadLinkProps = ComponentProps<typeof Link>;

export function LeadLink({ onClick, ...props }: LeadLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackLeadEvent();
        onClick?.(event);
      }}
    />
  );
}
