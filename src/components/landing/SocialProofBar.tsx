"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { FileText, Clock, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Stat = {
  icon: typeof FileText;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "integer" | "decimal" | "thousands";
  label: string;
};

const stats: Stat[] = [
  {
    icon: FileText,
    value: 1500,
    prefix: "+",
    format: "thousands",
    label: "consultas documentadas por IA",
  },
  {
    icon: Clock,
    value: 400,
    prefix: "+",
    suffix: "h",
    format: "integer",
    label: "economizadas por ano",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    format: "decimal",
    label: "em satisfação dos médicos",
  },
];

function formatValue(
  value: number,
  format: Stat["format"] = "integer",
): string {
  if (format === "decimal") {
    return value.toFixed(1).replace(".", ",");
  }
  if (format === "thousands") {
    return Math.round(value).toLocaleString("pt-BR");
  }
  return Math.round(value).toString();
}

function AnimatedStatValue({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) =>
    formatValue(v, stat.format),
  );

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(motionValue, stat.value, {
      duration: 1.2,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [inView, motionValue, stat.value, reduceMotion]);

  // SSR / pre-hydration: show the final value so crawlers and first paint see real numbers
  const staticValue = formatValue(stat.value, stat.format);

  return (
    <span ref={ref} className="tabular-nums">
      {stat.prefix}
      {hydrated ? <motion.span>{display}</motion.span> : <span>{staticValue}</span>}
      {stat.suffix}
    </span>
  );
}

export function SocialProofBar() {
  return (
    <section
      aria-label="Números da MedWiser"
      className="border-y border-border/60 bg-card py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-3 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                      <AnimatedStatValue stat={stat} />
                    </div>
                    <div className="text-xs text-muted-foreground sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
