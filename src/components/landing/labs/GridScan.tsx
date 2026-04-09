"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GridScanProps {
  className?: string;
}

/**
 * GridScan — fine dot grid with a periodic "scan line" sweeping across.
 * The scan creates the sense of "AI analyzing" without any specific UI.
 */
export function GridScan({ className }: GridScanProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* Base grid — finer than default to feel more tech */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(15, 118, 110, 0.28) 1px, transparent 1.2px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 70% 85% at center, black 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 85% at center, black 35%, transparent 80%)",
        }}
      />

      {/* Scan line — horizontal band sweeping vertically */}
      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-0 right-0 h-[180px] will-change-transform"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(20, 184, 166, 0.08) 35%, rgba(20, 184, 166, 0.18) 50%, rgba(20, 184, 166, 0.08) 65%, transparent 100%)",
              top: "-180px",
            }}
            animate={{
              y: ["0px", "120vh"],
            }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
          <motion.div
            className="absolute left-0 right-0 h-[2px] will-change-transform"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(20, 184, 166, 0.5) 20%, rgba(20, 184, 166, 0.9) 50%, rgba(20, 184, 166, 0.5) 80%, transparent)",
              top: "-2px",
            }}
            animate={{
              y: ["90px", "calc(120vh + 90px)"],
            }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </>
      )}
    </div>
  );
}
