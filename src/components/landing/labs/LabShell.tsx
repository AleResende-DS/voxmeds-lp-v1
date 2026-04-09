"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface LabShellProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * LabShell — minimal wrapper for the /labs preview pages.
 * Fixed nav pill top-left linking back to /labs.
 */
export function LabShell({ title, description, children }: LabShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed left-4 top-4 z-[100] flex items-center gap-3 rounded-full border border-border/60 bg-white/90 px-3 py-2 text-xs font-medium shadow-card backdrop-blur-sm">
        <Link
          href="/labs"
          className="press inline-flex items-center gap-1 text-muted transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
        >
          <ChevronLeft className="h-3 w-3" />
          Labs
        </Link>
        <span className="h-3 w-px bg-border" />
        <span className="font-mono text-primary">{title}</span>
        {description && (
          <>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="hidden text-muted sm:block">{description}</span>
          </>
        )}
      </div>
      {children}
    </div>
  );
}
