"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  TrendingDown,
  ChevronDown,
  Sparkles,
  CreditCard,
  Shield,
} from "lucide-react";
import { trackLeadEvent } from "@/lib/tracking";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const registerUrl = "https://portal.medwiser.app/register";

type BillingCycle = "monthly" | "yearly";

const features = [
  "Transcrição clínica com IA ilimitada",
  "Prontuário eletrônico completo",
  "Anamneses, SOAP e documentos gerados por IA",
  "Alertas de IA em exames e documentos",
  "Chat com IA em cada consulta",
  "Upload de exames com análise por IA",
  "Templates personalizados ilimitados",
  "Documentos e consultas sem limite",
  "Resumo automático do paciente por IA",
  "Histórico completo do paciente",
  "Apps nativos iOS e Android",
  "Suporte em português",
];

const monthlyPrice = 229;
const yearlyPrice = 199;
const yearlyTotal = yearlyPrice * 12;
const savingsPercent = Math.round(
  ((monthlyPrice - yearlyPrice) / monthlyPrice) * 100,
);

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const price = billingCycle === "monthly" ? monthlyPrice : yearlyPrice;
  const yearlySavings = (monthlyPrice - yearlyPrice) * 12;

  const handleToggle = (cycle: BillingCycle) => setBillingCycle(cycle);

  return (
    <section
      id="planos"
      className="section relative overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Planos e preços
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-balance sm:text-5xl">
            Um único plano.
            <br />
            <span className="text-primary">Tudo incluso.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Comece grátis em segundos — sem cartão de crédito. Cadastre um
            cartão depois e ganhe 7 dias de acesso completo.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleToggle("monthly")}
              className={`tap-target press rounded-full px-5 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                billingCycle === "monthly"
                  ? "bg-foreground text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              type="button"
              onClick={() => handleToggle("yearly")}
              className={`tap-target press inline-flex items-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                billingCycle === "yearly"
                  ? "bg-foreground text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  billingCycle === "yearly"
                    ? "bg-primary text-white"
                    : "bg-success/15 text-success"
                }`}
              >
                -{savingsPercent}%
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-lg">
          <div className="relative flex flex-col rounded-2xl border border-primary/40 bg-card p-6 shadow-card ring-2 ring-primary/15 sm:p-8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="rounded-full border border-primary/40 bg-card px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                Plano completo
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Comece grátis agora
              </div>
              <div className="mt-1 text-2xl font-bold text-primary">
                R$ 0,00
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                5 consultas grátis sem cartão
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Depois
              </div>
              <div className="mt-2 flex items-baseline justify-center gap-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={price}
                    className="font-display text-4xl font-bold text-foreground sm:text-5xl"
                    initial={{ opacity: 0, filter: "blur(3px)", y: 4 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(3px)", y: -4 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                  >
                    R$ {price}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm text-muted-foreground">/mês</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={billingCycle}
                  className="mt-2 text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                >
                  {billingCycle === "yearly"
                    ? `R$ ${yearlyTotal.toLocaleString("pt-BR")} cobrados uma vez por ano`
                    : "Cobrado mensalmente"}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence initial={false}>
                {billingCycle === "yearly" && (
                  <motion.div
                    key="yearly-savings"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                  >
                    <TrendingDown className="h-3 w-3" />
                    Economize R$ {yearlySavings} por ano
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {(showAllFeatures ? features : features.slice(0, 6)).map(
                (feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ),
              )}
              {!showAllFeatures && features.length > 6 && (
                <li>
                  <button
                    type="button"
                    onClick={() => setShowAllFeatures(true)}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    + {features.length - 6} funcionalidades
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </li>
              )}
            </ul>

            <Link
              href={registerUrl}
              onClick={trackLeadEvent}
              className="tap-target mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(15,118,110,0.5)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark hover:shadow-[0_12px_32px_-8px_rgba(15,118,110,0.6)] active:scale-[0.97] motion-safe:hover:scale-[1.02]"
            >
              Começar agora grátis
            </Link>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Cadastro em menos de 30 segundos. Sem cartão.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground sm:text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>5 consultas grátis sem cartão</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>+7 dias grátis com cartão</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Cancele em 1 clique</span>
          </div>
        </div>
      </div>
    </section>
  );
}
