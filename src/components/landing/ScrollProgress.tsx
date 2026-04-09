"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — thin teal bar at the top of the page that reflects
 * scroll position. Spring-smoothed so the motion feels alive.
 *
 * Not a "read progress" bar — it's a calm ambient signal that the
 * page has depth. Fixed 2px height, motion-safe only.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-primary-light to-primary motion-reduce:hidden"
      style={{ scaleX: smooth }}
    />
  );
}
