"use client";

import { motion, useReducedMotion } from "framer-motion";

interface WaveformBackgroundProps {
  className?: string;
  barCount?: number;
  tone?: "light" | "dark";
}

/**
 * WaveformBackground — equalizer-style animated waveform.
 * Transform-only (scaleY on origin-bottom elements) for 60fps on any device.
 * Used by A1 (standalone) and B+ (behind the text column).
 */
export function WaveformBackground({
  className,
  barCount = 64,
  tone = "light",
}: WaveformBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const bars = Array.from({ length: barCount }, (_, i) => i);

  // Radial mask fades edges so the waveform feels ambient, not rectangular
  const maskStyle = {
    maskImage:
      "radial-gradient(ellipse 70% 100% at center, black 40%, transparent 85%)",
    WebkitMaskImage:
      "radial-gradient(ellipse 70% 100% at center, black 40%, transparent 85%)",
  } as const;

  const barClass =
    tone === "dark"
      ? "bg-gradient-to-t from-primary-light/0 via-primary-light/40 to-primary-light/80"
      : "bg-gradient-to-t from-primary/0 via-primary/40 to-primary/80";

  return (
    <div
      className={`pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
      style={maskStyle}
    >
      <div className="flex h-full w-full items-end justify-center gap-[4px] px-6">
        {bars.map((i) => {
          // Seed different "amplitudes" per bar from a sine wave
          const seed = Math.sin(i * 0.35) * 0.5 + 0.5; // 0..1
          const seed2 = Math.sin(i * 0.7 + 1.3) * 0.5 + 0.5; // 0..1
          const low = 0.15 + seed * 0.25;
          const high = 0.45 + seed2 * 0.5;

          return (
            <div
              key={i}
              className="relative h-full w-1 flex-shrink"
              style={{ maxWidth: 5 }}
            >
              <motion.div
                className={`absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full ${barClass}`}
                initial={{ scaleY: low }}
                animate={
                  reduceMotion
                    ? { scaleY: low }
                    : { scaleY: [low, high, low * 1.2, high * 0.8, low] }
                }
                transition={{
                  duration: 2.8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: (i / barCount) * 0.6,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
