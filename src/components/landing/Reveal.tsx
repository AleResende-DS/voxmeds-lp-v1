"use client";

import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

// Strong ease-out curve (Emil Kowalski's recommended UI curve).
// Stronger than framer-motion's default "easeOut".
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type RevealVariant =
  | "fade-up"
  | "fade-left"
  | "fade-right"
  | "fade-up-scale";

type VariantPair = {
  hidden: TargetAndTransition;
  visible: TargetAndTransition;
};

const VARIANTS: Record<RevealVariant, VariantPair> = {
  "fade-up": {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-up-scale": {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
}

/**
 * Reveal — reveals a single element once it scrolls into view.
 * Default: fade-up with custom strong ease-out curve at 0.5s.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  variant = "fade-up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const v = VARIANTS[variant];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={v.hidden}
      whileInView={v.visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

/**
 * RevealGroup — container that staggers its RevealItem children.
 * Each direct RevealItem child inherits the container's trigger
 * and animates with a delay of `stagger` seconds between siblings.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delay = 0,
}: RevealGroupProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  duration?: number;
}

/**
 * RevealItem — child of RevealGroup, animates when its parent does.
 */
export function RevealItem({
  children,
  className,
  variant = "fade-up",
  duration = 0.5,
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const v = VARIANTS[variant];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants: Variants = {
    hidden: v.hidden,
    visible: {
      ...v.visible,
      transition: { duration, ease: EASE_OUT },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
