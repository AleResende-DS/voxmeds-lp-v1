"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Reveal } from "./Reveal";

export function BeliefBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Spring-based mouse tracking for the main orb.
  // Using full spring smoothing so it feels alive, not glued to the cursor.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.8 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Center-relative position, softened to a small range
    const x = (event.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.15;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={sectionRef}
      id="crenca"
      onMouseMove={handleMouseMove}
      className="section relative overflow-hidden bg-[#0b1514] py-16 text-white sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[140px]"
          style={
            reduceMotion
              ? undefined
              : {
                  translateX: smoothX,
                  translateY: smoothY,
                }
          }
        />
        <div className="absolute inset-0 bg-noise opacity-40" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary-light">
            O que ninguém te contou
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-lg text-white/70 sm:text-xl">
            A maioria dos médicos acredita que burocracia é parte inevitável
            da profissão. Que crescer na carreira significa abrir mão da vida
            pessoal. Que decisões difíceis precisam ser tomadas sozinho.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 h-px w-24 bg-primary-light/60" />
        </Reveal>
        <Reveal delay={0.22} variant="fade-up-scale">
          <h2 className="mt-10 font-display text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl">
            Mas isso não é verdade.
          </h2>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
            A tecnologia agêntica já permite que você documente sem digitar,
            analise exames com uma IA copiloto, e cresça sem se esgotar. Só
            precisa das ferramentas certas ao seu lado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
