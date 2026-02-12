"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, TrendingDown, Users, Calculator, ChevronDown } from "lucide-react";

const registerUrl = "https://app.voxmeds.com/register";

type BillingCycle = "monthly" | "yearly";
type Segment = "individual" | "equipe";

const individualFeatures = [
  "Prontuário eletrônico completo",
  "Agenda integrada (em breve no app mobile)",
  "Transcrição com IA ilimitada",
  "Documentos ilimitados",
  "Relatórios clínicos e financeiros",
  "Criação de templates ilimitados",
  "Impressão personalizada",
  "App mobile (iOS + Android) — em breve",
  "Agente WhatsApp para agendamentos",
  "IA para ADM e relatórios",
  "Dashboard de gestão completo",
  "Onboarding dedicado",
];

const clinicFeatures = [
  "Tudo do plano Individual",
  "Gestão de equipe e permissões",
];

const individualPlan = {
  id: "individual",
  name: "Individual",
  description: "Plano individual",
  icon: "👨‍⚕️",
  monthlyPrice: 299,
  yearlyPrice: 269,
  savings: 10,
  highlight: true,
  hasTrial: true,
  features: individualFeatures,
  cta: "Começar teste grátis",
  ctaVariant: "primary" as const,
};

const clinicPlans = [
  {
    id: "consultorio",
    name: "Consultório",
    description: "2-10 médicos",
    icon: "🏥",
    monthlyPrice: 289,
    yearlyPrice: 259,
    adminMonthly: 199,
    adminYearly: 149,
    savings: 10,
    highlight: false,
    hasTrial: false,
    features: clinicFeatures,
    cta: "Selecionar",
    ctaVariant: "secondary" as const,
  },
  {
    id: "clinica",
    name: "Clínica",
    description: "11-25 médicos",
    icon: "🏢",
    monthlyPrice: 279,
    yearlyPrice: 249,
    adminMonthly: 199,
    adminYearly: 149,
    savings: 11,
    highlight: false,
    hasTrial: false,
    features: clinicFeatures,
    cta: "Selecionar",
    ctaVariant: "secondary" as const,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "25+ médicos",
    icon: "⚕️",
    monthlyPrice: 269,
    yearlyPrice: 239,
    adminMonthly: 199,
    adminYearly: 149,
    savings: 11,
    highlight: false,
    hasTrial: false,
    features: clinicFeatures,
    cta: "Selecionar",
    ctaVariant: "secondary" as const,
  },
];

export function PricingSection() {
  const [segment, setSegment] = useState<Segment>("individual");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [doctorCount, setDoctorCount] = useState(5);
  const [showComparison, setShowComparison] = useState(false);

  const plans = segment === "individual" ? [individualPlan] : clinicPlans;

  const formatCurrency = (value: number) =>
    `R$ ${value.toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;

  const calculateTotal = (plan: typeof plans[0]) => {
    if (plan.id === "individual") {
      return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    }

    const pricePerDoctor =
      billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    const adminPrice =
      billingCycle === "monthly" ? plan.adminMonthly! : plan.adminYearly!;

    return pricePerDoctor * doctorCount + adminPrice;
  };

  const calculateYearlySavings = (plan: typeof plans[0]) => {
    if (plan.id === "individual") {
      return (plan.monthlyPrice - plan.yearlyPrice) * 12;
    }
    const monthlyTotal =
      plan.monthlyPrice * doctorCount + (plan.adminMonthly || 0);
    const yearlyTotal =
      plan.yearlyPrice * doctorCount + (plan.adminYearly || 0);
    return (monthlyTotal - yearlyTotal) * 12;
  };

  return (
    <section id="planos" className="section relative overflow-hidden py-14 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Planos e Preços
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-balance sm:text-5xl">
            Escolha o plano ideal para
            <br />
            <span className="text-primary">sua rotina médica</span>
          </h2>

          <p className="mt-4 text-lg text-muted">
            30 dias grátis para testar tudo. Sem cartão. Cancele quando quiser.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span
              className={`text-sm font-medium transition ${
                billingCycle === "monthly"
                  ? "text-foreground"
                  : "text-muted"
              }`}
            >
              Mensal
            </span>
            <button
              type="button"
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
              }
              className="tap-target relative h-11 w-20 rounded-full bg-surface-strong transition-colors hover:bg-border"
              aria-label="Alternar entre mensal e anual"
            >
              <span
                className={`absolute top-1.5 h-8 w-8 rounded-full bg-primary shadow-md transition-all duration-300 ${
                  billingCycle === "yearly" ? "left-[42px]" : "left-1.5"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition ${
                billingCycle === "yearly"
                  ? "text-foreground"
                  : "text-muted"
              }`}
            >
              Anual
            </span>
            {billingCycle === "yearly" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success animate-[fadeIn_0.3s_ease-in-out]">
                <TrendingDown className="h-3 w-3" />
                Economize até 11%
              </span>
            )}
          </div>
        </div>

        {/* Segment toggle */}
        <div className="mt-12 text-center">
          <div className="inline-flex w-full max-w-xs items-center rounded-full border border-border/60 bg-surface p-1.5 text-sm sm:w-auto sm:max-w-none">
            {(["individual", "equipe"] as Segment[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSegment(option)}
                className={`tap-target inline-flex flex-1 items-center justify-center rounded-full px-4 py-2 transition sm:px-6 ${
                  segment === option
                    ? "bg-primary text-white shadow"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {option === "individual" ? "Individual" : "Equipe"}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className={`mt-8 grid gap-5 sm:gap-6 ${
          segment === "individual"
            ? "lg:grid-cols-1 max-w-md mx-auto"
            : "lg:grid-cols-3"
        }`}>
          {plans.map((plan, index) => {
            const totalPrice = calculateTotal(plan);
            const yearlySavings = calculateYearlySavings(plan);
            const isClinicPlan = plan.id !== "individual";

            return (
              <div
                key={plan.id}
                className={`group relative flex flex-col rounded-[28px] border bg-white p-5 shadow-card transition-all duration-300 sm:p-7 ${
                  plan.highlight && segment === "individual"
                    ? "border-primary/40 ring-2 ring-primary/20"
                    : "border-border/60 hover:border-primary/30 hover:shadow-[0_32px_80px_-48px_rgba(13,148,136,0.25)]"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Badge */}
                {plan.highlight && plan.id === "individual" && (
                  <div className="absolute -top-3 right-6">
                    <div className="rounded-full border border-primary/30 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                      Mais escolhido
                    </div>
                  </div>
                )}

                {/* Plan header */}
                <div className="text-center">
                  <div className="text-4xl">{plan.icon}</div>
                  <h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted">{plan.description}</p>
                </div>

                {/* Trial badge */}
                {plan.hasTrial && (
                  <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      30 dias grátis
                    </div>
                    <div className="mt-1 text-2xl font-bold text-primary">
                      R$ 0,00
                    </div>
                  </div>
                )}

                {/* Price */}
                <div className="mt-6 text-center">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted">
                    Depois do trial
                  </div>
                  <div className="mt-2 flex items-baseline justify-center gap-2">
                    <span className="text-3xl font-bold text-foreground sm:text-4xl">
                      {formatCurrency(
                        billingCycle === "monthly"
                          ? plan.monthlyPrice
                          : plan.yearlyPrice
                      )}
                    </span>
                    <span className="text-sm text-muted">/mês</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="mt-1 text-xs text-muted">cobrado anualmente</p>
                  )}

                  {isClinicPlan && (
                    <div className="mt-2 text-xs text-muted">
                      por médico +{" "}
                      {formatCurrency(
                        billingCycle === "monthly"
                          ? plan.adminMonthly!
                          : plan.adminYearly!
                      )}{" "}
                      Módulo de equipes
                    </div>
                  )}

                  {billingCycle === "yearly" && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                      <TrendingDown className="h-3 w-3" />
                      {plan.savings}% de economia
                    </div>
                  )}
                </div>

                {/* Calculator for clinic plans */}
                {isClinicPlan && (
                  <div className="mt-6 rounded-2xl border border-border/60 bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor={`doctors-${plan.id}`}
                        className="flex items-center gap-2 text-xs font-medium text-muted"
                      >
                        <Users className="h-4 w-4" />
                        Nº de médicos
                      </label>
                      <input
                        id={`doctors-${plan.id}`}
                        type="number"
                        min="2"
                        max="100"
                        value={doctorCount}
                        onChange={(e) =>
                          setDoctorCount(Math.max(2, parseInt(e.target.value) || 2))
                        }
                        className="tap-target h-11 w-16 rounded-lg border border-border/60 bg-white px-2 py-1 text-center text-sm font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="text-xs font-medium text-muted">
                        Total estimado:
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {formatCurrency(totalPrice)}
                        <span className="text-xs font-medium text-muted">/mês</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Features preview */}
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-xs text-primary">
                      + {plan.features.length - 4} funcionalidades
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <Link
                  href={registerUrl}
                  className={`tap-target mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 ${
                    plan.ctaVariant === "primary"
                      ? "bg-primary text-white shadow-[0_8px_24px_-8px_rgba(13,148,136,0.4)] hover:bg-primary-dark hover:shadow-[0_12px_32px_-8px_rgba(13,148,136,0.5)] hover:scale-[1.02]"
                      : "border border-border/60 text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {plan.cta}
                </Link>

                {billingCycle === "yearly" && (
                  <div className="mt-4 text-center text-xs text-muted">
                    💰 Economize{" "}
                    <span className="font-semibold text-success">
                      {formatCurrency(yearlySavings)}
                    </span>{" "}
                    por ano
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feature comparison table */}
        <div className="mt-12 sm:mt-16">
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="tap-target mx-auto flex items-center gap-2 rounded-full border border-border/60 bg-white px-6 py-3 text-sm font-medium shadow-card transition-all hover:border-primary/30 hover:shadow-[0_8px_24px_-8px_rgba(13,148,136,0.2)]"
          >
            <span>
              {showComparison ? "Ocultar" : "Ver"} comparação completa
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showComparison ? "rotate-180" : ""
              }`}
            />
          </button>

          {showComparison && (
            <div className="mt-8 overflow-hidden rounded-[28px] border border-border/60 bg-white shadow-card animate-[fadeIn_0.3s_ease-in-out]">
              <p className="px-4 pt-4 text-xs font-medium text-muted sm:hidden">
                Arraste para o lado para comparar todos os planos.
              </p>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-white to-transparent sm:hidden" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-white to-transparent sm:hidden" />
                <div className="overflow-x-auto">
                  <table className="min-w-[664px] w-full">
                    <thead>
                      <tr className="border-b border-border/60 bg-surface">
                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:px-6">
                          Funcionalidade
                        </th>
                        <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:px-6">
                          <div className="text-lg">{individualPlan.icon}</div>
                          <div className="mt-1">{individualPlan.name}</div>
                        </th>
                        {clinicPlans.map((plan) => (
                          <th
                            key={plan.id}
                            className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:px-6"
                          >
                            <div className="text-lg">{plan.icon}</div>
                            <div className="mt-1">{plan.name}</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(
                        new Set([...individualFeatures, ...clinicFeatures])
                      ).map((feature, index) => {
                        const allPlans = [individualPlan, ...clinicPlans];
                        return (
                          <tr
                            key={feature}
                            className={`border-b border-border/30 last:border-0 ${
                              index % 2 === 0 ? "bg-white" : "bg-surface/30"
                            }`}
                          >
                            <td className="px-4 py-4 text-sm text-muted sm:px-6">
                              {feature}
                            </td>
                            {allPlans.map((plan) => (
                              <td key={plan.id} className="px-4 py-4 text-center sm:px-6">
                                {plan.features.includes(feature) ||
                                (plan.id !== "individual" &&
                                  individualFeatures.includes(feature)) ? (
                                  <Check className="mx-auto h-5 w-5 text-primary" />
                                ) : (
                                  <span className="text-muted/30">—</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-[28px] border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 sm:p-8">
            <h3 className="text-2xl font-semibold">Precisa de mais?</h3>
            <a
              href="https://wa.me/5544997362973"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target mt-6 inline-flex items-center gap-2 rounded-full border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              Falar com especialista
            </a>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-xs text-muted sm:gap-8">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span>30 dias grátis no Individual</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span>Cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <span>Suporte em português</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
