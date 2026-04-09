"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

/**
 * ThemeProvider — wraps the app with next-themes.
 * Used in layout.tsx. Default theme is light (per product decision).
 */
export function ThemeProvider(props: ThemeProviderProps) {
  return <NextThemesProvider {...props} />;
}
