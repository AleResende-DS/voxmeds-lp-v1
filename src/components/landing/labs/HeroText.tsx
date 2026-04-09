"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, HelpCircle, Sparkles, Wand2 } from "lucide-react";
import { LeadLink } from "@/components/landing/LeadLink";
import { Typewriter } from "@/components/landing/Typewriter";

const registerUrl = "https://portal.medwiser.app/register";
const heroPhrases = [
  "Não digitação.",
  "Não burocracia.",
  "Não trabalho em casa.",
];

interface HeroTextProps {
  align?: "left" | "center";
  className?: string;
}

/**
 * HeroText — shared hero content for all /labs variants.
 * Keeps copy identical so comparisons are pure visual.
 */
export function HeroText({ align = "left", className }: HeroTextProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto max-w-3xl text-center" : "max-w-xl"} ${
        className ?? ""
      }`}
    >
      <span
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-primary backdrop-blur-sm"
        title="Plataforma agêntica significa que a IA não só responde perguntas — ela executa tarefas de verdade por você."
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Primeira plataforma médica Agêntica do Brasil</span>
        <HelpCircle className="h-3.5 w-3.5 opacity-70" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 shimmer"
        />
      </span>

      <h1 className="mt-6 font-display text-[2.25rem] font-semibold leading-[1.05] text-balance sm:text-[3.25rem] lg:text-[3.75rem]">
        Você estudou medicina.
        <br />
        <span className="text-primary">
          <Typewriter
            phrases={heroPhrases}
            className="inline-block font-semibold"
            cursorClassName="text-primary"
            typeSpeed={38}
            deleteSpeed={22}
            pause={1400}
          />
        </span>
      </h1>

      <p
        className={`mt-5 text-lg text-muted-foreground ${
          centered ? "mx-auto max-w-xl" : "max-w-xl"
        }`}
      >
        A MedWiser transcreve suas consultas, gera prontuários completos,
        analisa exames e te alerta sobre achados críticos. Você cuida do
        paciente. A IA cuida do resto.
      </p>

      <div
        className={`mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${
          centered ? "sm:justify-center" : ""
        }`}
      >
        <LeadLink
          href={registerUrl}
          className="tap-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(15,118,110,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97] sm:w-auto"
        >
          Quero meu tempo de volta
          <ArrowRight className="h-4 w-4" />
        </LeadLink>
        <Link
          href="#copiloto"
          className="tap-target inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-[border-color,transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/50 active:scale-[0.97] sm:w-auto"
        >
          Ver como funciona
          <ArrowDown className="h-4 w-4" />
        </Link>
      </div>

      <div
        className={`mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          5 consultas grátis sem cartão
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Wand2 className="h-4 w-4 text-primary" />
          Cancele em 1 clique
        </span>
      </div>
    </div>
  );
}
