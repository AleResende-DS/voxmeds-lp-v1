import { Stethoscope, FileText, Clock, Star } from "lucide-react";
import { Reveal } from "./Reveal";

const stats = [
  {
    icon: Stethoscope,
    value: "+200",
    label: "médicos testando a MedWiser",
  },
  {
    icon: FileText,
    value: "+1.500",
    label: "consultas documentadas por IA",
  },
  {
    icon: Clock,
    value: "2h",
    label: "economizadas em média por dia",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "em satisfação dos médicos",
  },
];

export function SocialProofBar() {
  return (
    <section
      aria-label="Números da MedWiser"
      className="border-y border-border/60 bg-white py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted sm:text-sm">
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
