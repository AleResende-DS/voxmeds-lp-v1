import { MicOff, Lock, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Conformidade LGPD",
    description:
      "Seus dados e os dos seus pacientes protegidos de acordo com a Lei Geral de Proteção de Dados.",
  },
  {
    icon: MicOff,
    title: "Áudio nunca é salvo",
    description:
      "O áudio da consulta é processado em tempo real e descartado imediatamente. Nenhuma gravação é armazenada.",
  },
  {
    icon: Lock,
    title: "Criptografia ponta a ponta",
    description:
      "Toda comunicação entre você e a MedWiser é criptografada de ponta a ponta.",
  },
];

export function SecuritySection() {
  return (
    <section className="section relative overflow-hidden bg-surface py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Segurança
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
              Segurança que você pode confiar
            </h2>
          </div>
        </Reveal>

        <RevealGroup
          className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3"
          stagger={0.08}
          delay={0.1}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title} variant="fade-up">
                <div className="hover-lift flex flex-col items-center rounded-card border border-border/60 bg-card p-6 text-center shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
