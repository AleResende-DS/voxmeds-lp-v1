"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// React 19-friendly "mounted" check via useSyncExternalStore.
// On the server it returns false; on the client it returns true after first render.
// This avoids the setState-in-effect pattern that React 19 flags as a cascade.
const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle — pill button with animated Sun/Moon crossfade.
 * Returns a static placeholder before mount to prevent hydration mismatch.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Trocar para modo claro" : "Trocar para modo escuro";

  // Static placeholder with same dimensions to avoid layout shift
  if (!mounted) {
    return (
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border ${className ?? ""}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={`press relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted active:scale-[0.95] ${className ?? ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -55, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 55, scale: 0.7 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
