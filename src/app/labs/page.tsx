import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const variants = [
  {
    slug: "a1",
    title: "A1 — Waveform horizonte",
    description:
      "Hero centralizado (só texto) com equalizer de áudio animado no fundo. Voz é o core do produto, waveform vira símbolo evergreen.",
    tag: "Text-only + bg",
  },
  {
    slug: "a2",
    title: "A2 — Gradient mesh",
    description:
      "Hero centralizado com 4 orbs teal fazendo drift lento. Atmosférico, estilo Stripe/Linear. Puro ambient.",
    tag: "Text-only + bg",
  },
  {
    slug: "a3",
    title: "A3 — Grid com scan",
    description:
      "Hero centralizado com dot grid e linha de scan horizontal atravessando a cada ~10s. Sensação de 'IA escaneando'.",
    tag: "Text-only + bg",
  },
  {
    slug: "b",
    title: "B — Mini mockup em código",
    description:
      "Texto à esquerda + janela de mockup à direita (dark chrome) rodando loop de 3 beats: waveform → transcrição → alerta. 100% DOM.",
    tag: "Demonstra o app",
  },
  {
    slug: "b-plus",
    title: "B+ — Mockup + waveform bg",
    description:
      "Path B com waveform A1 discreta atrás do texto. Mostra o produto E tem background animado ambient. Minha recomendação.",
    tag: "Recomendação",
    highlight: true,
  },
];

export default function LabsIndex() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3 w-3" />
            Labs
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Hero Variants
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Protótipos isolados para comparar direções de hero. Cada variant
            renderiza só o hero + SocialProofBar pra foco visual — sem o resto
            da LP. Abra várias abas para comparar lado a lado.
          </p>
        </div>

        <div className="grid gap-3">
          {variants.map((v) => (
            <Link
              key={v.slug}
              href={`/labs/hero/${v.slug}`}
              className={`group flex items-start justify-between gap-4 rounded-card border bg-white p-5 shadow-card transition-[border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/40 active:scale-[0.99] ${
                v.highlight
                  ? "border-primary/40 ring-1 ring-primary/15"
                  : "border-border/60"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-semibold">
                    {v.title}
                  </h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest ${
                      v.highlight
                        ? "bg-primary text-white"
                        : "bg-surface text-muted"
                    }`}
                  >
                    {v.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{v.description}</p>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-border/60 bg-white/60 p-4 text-xs text-muted">
          <p className="font-semibold text-foreground">Como comparar:</p>
          <ul className="mt-2 space-y-1">
            <li>• Abra cada variant em uma aba separada</li>
            <li>
              • Tecla <kbd className="rounded bg-surface px-1.5 py-0.5 font-mono">⌘⌥→</kbd> no Chrome alterna entre abas
            </li>
            <li>• Observe: ambiência, legibilidade do texto, foco do olho, peso visual</li>
            <li>• Teste mobile: os heroes foram pensados pra funcionar nas duas larguras</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
