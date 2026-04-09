"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GradientMeshProps {
  className?: string;
}

type Orb = {
  color: string;
  size: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  xRange: number[];
  yRange: number[];
};

const ORBS: Orb[] = [
  {
    color: "rgba(15, 118, 110, 0.38)",
    size: 620,
    left: "-10%",
    top: "-15%",
    delay: 0,
    duration: 26,
    xRange: [0, 80, -40, 0],
    yRange: [0, -50, 60, 0],
  },
  {
    color: "rgba(20, 184, 166, 0.28)",
    size: 540,
    left: "55%",
    top: "0%",
    delay: 6,
    duration: 30,
    xRange: [0, -70, 50, 0],
    yRange: [0, 60, -30, 0],
  },
  {
    color: "rgba(45, 212, 191, 0.22)",
    size: 500,
    left: "10%",
    top: "55%",
    delay: 12,
    duration: 24,
    xRange: [0, 60, -50, 0],
    yRange: [0, -40, 50, 0],
  },
  {
    color: "rgba(15, 118, 110, 0.18)",
    size: 560,
    left: "50%",
    top: "40%",
    delay: 18,
    duration: 32,
    xRange: [0, -80, 40, 0],
    yRange: [0, 30, -60, 0],
  },
];

/**
 * GradientMesh — 4 slowly drifting teal orbs.
 * Transform-only animation (x/y → translate), will-change on each.
 * Honors prefers-reduced-motion.
 */
export function GradientMesh({ className }: GradientMeshProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px] will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            left: orb.left,
            top: orb.top,
          }}
          initial={{ x: 0, y: 0 }}
          animate={
            reduceMotion
              ? { x: 0, y: 0 }
              : { x: orb.xRange, y: orb.yRange }
          }
          transition={{
            duration: orb.duration,
            ease: "easeInOut",
            repeat: Infinity,
            delay: orb.delay,
          }}
        />
      ))}
      {/* Fine grain to avoid banding on the gradient */}
      <div className="absolute inset-0 bg-noise opacity-40" />
    </div>
  );
}
