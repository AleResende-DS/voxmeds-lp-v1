"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Mic,
  RefreshCw,
  Sparkles,
  Waves,
} from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// Helper — fade a layer in/out as scroll progress crosses 3 thresholds.
// in/peak/out are all scrollYProgress values (0 → 1).
function useLayerOpacity(
  progress: MotionValue<number>,
  ranges: [number, number, number, number],
) {
  // ranges: [fade-in-start, fully-visible, start-fade-out, fully-hidden]
  return useTransform(
    progress,
    ranges,
    [0, 1, 1, 0],
  );
}

// Per-beat headline content on the side panel.
const HEADLINES = [
  {
    eyebrow: "01 · Você fala",
    title: "O médico começa a falar.",
    body: "A IA entra em silêncio, ouvindo em tempo real. Nenhum campo para preencher.",
  },
  {
    eyebrow: "02 · A IA escuta",
    title: "Cada palavra vira dado clínico.",
    body: "O áudio é processado ao vivo. Você continua olhando para o paciente.",
  },
  {
    eyebrow: "03 · A IA transcreve",
    title: "A consulta vira texto — automaticamente.",
    body: "Terminologia médica correta, sem digitação, sem ditado manual.",
  },
  {
    eyebrow: "04 · A IA estrutura",
    title: "Anamnese, SOAP, evolução — prontos.",
    body: "O texto se reorganiza no formato do seu prontuário em segundos.",
  },
  {
    eyebrow: "05 · A IA analisa",
    title: "Exames ganham uma segunda leitura.",
    body: "A IA cruza laudos, histórico e achados para destacar o que importa.",
  },
  {
    eyebrow: "06 · A IA alerta",
    title: "Você não deixa passar nada.",
    body: "Alertas inteligentes em tempo real para achados críticos.",
  },
  {
    eyebrow: "07 · A IA atualiza",
    title: "O prontuário se atualiza sozinho.",
    body: "Nova alergia? Medicação trocada? A IA revisa a consulta e mantém o perfil do paciente sempre atual.",
  },
  {
    eyebrow: "08 · Consulta documentada",
    title: "A consulta termina. Tudo pronto.",
    body: "Prontuário, alertas e perfil — tudo atualizado sem você digitar uma linha.",
  },
  {
    eyebrow: "09 · Você cuida de você",
    title: "Seu dia termina no último paciente.",
    body: "Você vai jantar em casa hoje. Sua família agradece.",
  },
] as const;

export function ConsultationStory() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 9 beats mapped to scroll ranges (~0.11 each).
  // Each beat has a crossfade overlap with the next (~3%) which we mask with opacity.
  const beat1 = useLayerOpacity(scrollYProgress, [0.00, 0.03, 0.09, 0.12]);
  const beat2 = useLayerOpacity(scrollYProgress, [0.10, 0.13, 0.20, 0.23]);
  const beat3 = useLayerOpacity(scrollYProgress, [0.21, 0.24, 0.31, 0.34]);
  const beat4 = useLayerOpacity(scrollYProgress, [0.32, 0.35, 0.42, 0.45]);
  const beat5 = useLayerOpacity(scrollYProgress, [0.43, 0.46, 0.53, 0.56]);
  const beat6 = useLayerOpacity(scrollYProgress, [0.54, 0.57, 0.64, 0.67]);
  const beat7 = useLayerOpacity(scrollYProgress, [0.65, 0.68, 0.75, 0.78]); // auto-fill
  const beat8 = useLayerOpacity(scrollYProgress, [0.76, 0.80, 0.87, 0.90]);
  const beat9 = useTransform(scrollYProgress, [0.88, 0.92, 1.0], [0, 1, 1]);

  // Headline index, derived from scroll position (9 steps).
  const headlineIndex = useTransform(scrollYProgress, (v): number => {
    if (v < 0.10) return 0;
    if (v < 0.21) return 1;
    if (v < 0.32) return 2;
    if (v < 0.43) return 3;
    if (v < 0.54) return 4;
    if (v < 0.65) return 5;
    if (v < 0.76) return 6;
    if (v < 0.88) return 7;
    return 8;
  });

  // "AO VIVO" indicator opacity — only visible during recording beats (1-3)
  const liveOpacity = useTransform(scrollYProgress, [0, 0.03, 0.32, 0.35], [0.4, 1, 1, 0]);

  // Subtle scale pulse for the full mockup, driven by scroll (tech feel)
  const mockupScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.96, 1, 1.02],
  );

  // Waveform path length — drives an SVG stroke reveal
  const waveProgress = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);

  // Transcription text reveal — driven by scroll, word by word
  const transcriptionReveal = useTransform(
    scrollYProgress,
    [0.21, 0.32],
    [0, 1],
  );

  // SOAP card stagger — each card fades in sequentially within beat4's range
  const soapS = useTransform(scrollYProgress, [0.32, 0.36], [0, 1]);
  const soapO = useTransform(scrollYProgress, [0.34, 0.38], [0, 1]);
  const soapA = useTransform(scrollYProgress, [0.36, 0.40], [0, 1]);
  const soapP = useTransform(scrollYProgress, [0.38, 0.42], [0, 1]);

  // Alert card slide — from the right
  const alertX = useTransform(scrollYProgress, [0.54, 0.64], [60, 0]);
  const alertOpacity = useTransform(
    scrollYProgress,
    [0.54, 0.60, 0.67, 0.67],
    [0, 1, 1, 0],
  );

  // Auto-fill stagger — patient profile fields animate in sequence
  const fillField1 = useTransform(scrollYProgress, [0.65, 0.69], [0, 1]);
  const fillField2 = useTransform(scrollYProgress, [0.67, 0.71], [0, 1]);
  const fillField3 = useTransform(scrollYProgress, [0.69, 0.73], [0, 1]);
  const fillField4 = useTransform(scrollYProgress, [0.71, 0.75], [0, 1]);

  if (reduceMotion) {
    return <StaticConsultationStory />;
  }

  return (
    <section
      ref={ref}
      id="solucao"
      aria-label="Como a MedWiser transforma uma consulta"
      data-dark-header
      className="dark section relative bg-background text-foreground h-[300vh] lg:h-[360vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Background: grid + orbs + noise */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-primary/20 blur-[100px] drift-slow" />
          <div className="absolute bottom-0 right-1/4 h-[480px] w-[480px] rounded-full bg-primary/10 blur-[100px] drift-slow-reverse" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 80%)",
            }}
          />
          <div className="absolute inset-0 bg-noise opacity-30" />
        </div>

        {/* Progress dots — vertical step indicator */}
        <ProgressDots index={headlineIndex} total={HEADLINES.length} sectionRef={ref} />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT — Headlines */}
          <div className="order-2 lg:order-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
              <Sparkles className="h-3 w-3" />
              Plataforma agêntica
            </div>
            <HeadlineSwitcher index={headlineIndex} />
            <p className="mt-8 hidden text-xs uppercase tracking-[0.2em] text-foreground/40 sm:block">
              Role a página para ver →
            </p>
            <button
              type="button"
              onClick={() => {
                const section = ref.current;
                if (!section) return;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.scrollHeight;
                const targetScroll = sectionTop + (7 / HEADLINES.length) * sectionHeight;
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
              className="mt-3 hidden text-xs text-primary underline-offset-4 hover:underline sm:block"
            >
              Pular para o resultado
            </button>
          </div>

          {/* RIGHT — Mockup */}
          <motion.div
            className="order-1 lg:order-2"
            style={{ scale: mockupScale }}
          >
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm">
              {/* Mockup chrome */}
              <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400/80" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <div className="h-2 w-2 rounded-full bg-green-400/80" />
                  <span className="ml-3 text-[10px] text-foreground/40">
                    MedWiser · Consulta
                  </span>
                </div>
                <motion.div
                  className="flex items-center gap-1.5 text-[10px] text-primary-light"
                  style={{ opacity: liveOpacity }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-light" />
                  AO VIVO
                </motion.div>
              </div>

              {/* Stage — absolute layers, each driven by a scroll range */}
              <div className="relative h-[calc(100%-44px)] p-6">
                {/* BEAT 1 — Microphone silent + invite */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ opacity: beat1 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Mic className="h-10 w-10 text-primary-light" />
                    </div>
                  </div>
                  <p className="text-sm text-foreground/50">
                    Aguardando áudio...
                  </p>
                </motion.div>

                {/* BEAT 2 — Waveform forming */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                  style={{ opacity: beat2 }}
                >
                  <div className="flex items-center gap-2 text-xs text-primary-light">
                    <Waves className="h-4 w-4" />
                    Capturando áudio
                  </div>
                  <svg
                    viewBox="0 0 400 80"
                    className="h-20 w-full max-w-md"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M 0 40 Q 20 10, 40 40 T 80 40 T 120 40 Q 140 -5, 160 40 T 200 40 Q 220 5, 240 40 T 280 40 T 320 40 Q 340 10, 360 40 T 400 40"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{ pathLength: waveProgress, opacity: beat2 }}
                    />
                    <motion.path
                      d="M 0 40 Q 20 70, 40 40 T 80 40 T 120 40 Q 140 85, 160 40 T 200 40 Q 220 75, 240 40 T 280 40 T 320 40 Q 340 70, 360 40 T 400 40"
                      fill="none"
                      stroke="#0f766e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{ pathLength: waveProgress, opacity: 0.6 }}
                    />
                  </svg>
                  <p className="text-[11px] text-foreground/40">
                    00:00:42 · gravando
                  </p>
                </motion.div>

                {/* BEAT 3 — Transcription flowing */}
                <motion.div
                  className="absolute inset-0 flex flex-col gap-3 overflow-hidden p-2"
                  style={{ opacity: beat3 }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-primary-light">
                    Transcrição ao vivo
                  </p>
                  <TranscriptionStream progress={transcriptionReveal} />
                </motion.div>

                {/* BEAT 4 — Structured SOAP (staggered entry) */}
                <motion.div
                  className="absolute inset-0 flex flex-col gap-2 p-2"
                  style={{ opacity: beat4 }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-primary-light">
                    Prontuário estruturado
                  </p>
                  <div className="grid gap-2 text-[11px]">
                    <motion.div className="rounded-lg border border-border/60 bg-muted/40 p-3" style={{ opacity: soapS }}>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light">
                        S · Subjetivo
                      </p>
                      <p className="mt-1 text-foreground/75">
                        Paciente refere tosse seca há 2 semanas, sem febre.
                      </p>
                    </motion.div>
                    <motion.div className="rounded-lg border border-border/60 bg-muted/40 p-3" style={{ opacity: soapO }}>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light">
                        O · Objetivo
                      </p>
                      <p className="mt-1 text-foreground/75">
                        PA 140/90, FC 78, ausculta pulmonar sem alterações.
                      </p>
                    </motion.div>
                    <motion.div className="rounded-lg border border-border/60 bg-muted/40 p-3" style={{ opacity: soapA }}>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light">
                        A · Avaliação
                      </p>
                      <p className="mt-1 text-foreground/75">
                        Suspeita de tosse medicamentosa por IECA. HAS descompensada.
                      </p>
                    </motion.div>
                    <motion.div className="rounded-lg border border-border/60 bg-muted/40 p-3" style={{ opacity: soapP }}>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-primary-light">
                        P · Plano
                      </p>
                      <p className="mt-1 text-foreground/75">
                        Trocar losartana por valsartana. Retorno em 15 dias.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* BEAT 5 — Exam PDF sliding in */}
                <motion.div
                  className="absolute inset-0 flex flex-col gap-3 p-2"
                  style={{ opacity: beat5 }}
                >
                  <p className="text-[10px] uppercase tracking-widest text-primary-light">
                    Análise automática de exame
                  </p>
                  <div className="flex gap-3">
                    <div className="flex h-28 w-20 shrink-0 flex-col gap-1 rounded-lg border border-border/60 bg-muted/40 p-2">
                      <FileText className="h-4 w-4 text-primary-light" />
                      <p className="text-[8px] text-foreground/60">
                        hemograma.pdf
                      </p>
                      <div className="mt-1 flex flex-col gap-0.5">
                        <div className="h-0.5 w-full rounded-full bg-foreground/20" />
                        <div className="h-0.5 w-3/4 rounded-full bg-foreground/20" />
                        <div className="h-0.5 w-full rounded-full bg-yellow-400/80" />
                        <div className="h-0.5 w-5/6 rounded-full bg-foreground/20" />
                        <div className="h-0.5 w-full rounded-full bg-yellow-400/80" />
                      </div>
                    </div>
                    <div className="flex-1 rounded-lg border border-border/60 bg-muted/40 p-3">
                      <p className="text-[10px] text-foreground/60">
                        Achados processados
                      </p>
                      <div className="mt-2 space-y-1 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Hemoglobina</span>
                          <span className="text-yellow-400">
                            10.2 g/dL ↓
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Ferritina</span>
                          <span className="text-yellow-400">12 ng/mL ↓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">VCM</span>
                          <span className="text-yellow-400">76 fL ↓</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Leucócitos</span>
                          <span className="text-foreground/75">6.800</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* BEAT 6 — Alert card */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center p-4"
                  style={{ opacity: beat6 }}
                >
                  <motion.div
                    className="relative w-full max-w-sm rounded-xl border border-yellow-400/40 bg-gradient-to-br from-yellow-500/15 to-primary/10 p-5 shadow-[0_20px_60px_-20px_rgba(250,204,21,0.35)]"
                    style={{ x: alertX, opacity: alertOpacity }}
                  >
                    <div className="absolute -inset-px rounded-xl border border-yellow-400/20" />
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-300">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-yellow-300">
                          Alerta da IA
                        </p>
                        <p className="mt-2 text-sm font-medium text-foreground">
                          Hemograma sugere anemia ferropriva.
                        </p>
                        <p className="mt-1 text-xs text-foreground/60">
                          VCM baixo, ferritina baixa. Considerar investigação
                          de perda sanguínea oculta.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* BEAT 7 — Auto-fill patient profile */}
                <motion.div
                  className="absolute inset-0 flex flex-col gap-2.5 p-2"
                  style={{ opacity: beat7 }}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-primary-light">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Perfil atualizado automaticamente
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/40 p-3">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-foreground/50">
                      Paciente · João M. Santos
                    </p>
                    <div className="mt-2.5 space-y-2 text-[11px]">
                      <motion.div className="flex items-center gap-2" style={{ opacity: fillField1 }}>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-green-400">
                          + novo
                        </span>
                        <span className="text-foreground/60">Alergia:</span>
                        <span className="font-medium text-foreground/90">Dipirona</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2" style={{ opacity: fillField2 }}>
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-400">
                          atualizado
                        </span>
                        <span className="text-foreground/60">Medicação:</span>
                        <span className="font-medium text-foreground/90">
                          <span className="text-foreground/40 line-through">Losartana 50mg</span>
                          {" → "}Valsartana 80mg
                        </span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2" style={{ opacity: fillField3 }}>
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-green-400">
                          + novo
                        </span>
                        <span className="text-foreground/60">Condição:</span>
                        <span className="font-medium text-foreground/90">Anemia ferropriva (suspeita)</span>
                      </motion.div>
                      <motion.div className="flex items-center gap-2" style={{ opacity: fillField4 }}>
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-400">
                          atualizado
                        </span>
                        <span className="text-foreground/60">PA ref.:</span>
                        <span className="font-medium text-foreground/90">
                          <span className="text-foreground/40 line-through">130/85</span>
                          {" → "}140/90 mmHg
                        </span>
                      </motion.div>
                    </div>
                    <motion.p
                      className="mt-3 text-[10px] text-primary-light/70"
                      style={{ opacity: fillField4 }}
                    >
                      ✓ 4 campos atualizados automaticamente
                    </motion.p>
                  </div>
                </motion.div>

                {/* BEAT 8 — Documented summary */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4"
                  style={{ opacity: beat8 }}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 text-primary-light">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-semibold text-foreground">
                    Consulta documentada
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-foreground/50">
                    <span>03m 47s</span>
                    <span className="h-3 w-px bg-foreground/20" />
                    <span>SOAP + alerta</span>
                    <span className="h-3 w-px bg-foreground/20" />
                    <span>4 campos atualizados</span>
                    <span className="h-3 w-px bg-foreground/20" />
                    <span>0 digitação</span>
                  </div>
                </motion.div>

                {/* BEAT 9 — Final: go home */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
                  style={{ opacity: beat9 }}
                >
                  <p className="text-2xl">🏠</p>
                  <p className="text-lg font-semibold text-foreground">
                    Seu dia termina no último paciente.
                  </p>
                  <p className="max-w-xs text-center text-sm text-foreground/60">
                    Você vai jantar em casa hoje. Sua família agradece.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Headline switcher — subscribes to the scroll-driven index MotionValue,
 * renders the active headline with a crossfade.
 */
function HeadlineSwitcher({ index }: { index: MotionValue<number> }) {
  // Initialize from the current MotionValue so SSR and first render match
  // the scroll position without a cascading update.
  const [current, setCurrent] = useState(() =>
    Math.max(0, Math.min(HEADLINES.length - 1, Math.round(index.get()))),
  );

  useEffect(() => {
    const unsubscribe = index.on("change", (v) => {
      const snapped = Math.max(
        0,
        Math.min(HEADLINES.length - 1, Math.round(v)),
      );
      setCurrent((prev) => (prev === snapped ? prev : snapped));
    });
    return unsubscribe;
  }, [index]);

  const item = HEADLINES[current];

  return (
    <div className="relative min-h-[240px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14, transition: { duration: 0.18, ease: EASE_OUT } }}
          transition={{ duration: 0.32, ease: EASE_OUT }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-light">
            {item.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
            {item.title}
          </h2>
          <p className="mt-5 max-w-md text-base text-foreground/65">{item.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const TRANSCRIPTION_LINES = [
  "Paciente João, 45 anos, hipertenso em uso de losartana.",
  "Queixa principal: tosse seca há aproximadamente 2 semanas.",
  "Nega febre, dispneia ou dor torácica.",
  "Ausculta pulmonar sem alterações significativas.",
  "Pressão arterial aferida: 140 por 90 mmHg.",
  "Possível tosse medicamentosa por uso de IECA prévio.",
] as const;

/**
 * One transcription line — each line uses its own hooks, no hooks-in-loop.
 */
function TranscriptionLine({
  progress,
  start,
  end,
  text,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  text: string;
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const x = useTransform(progress, [start, end], [-6, 0]);

  return (
    <motion.p style={{ opacity, x }}>
      <span className="mr-2 text-primary-light/60">▸</span>
      {text}
    </motion.p>
  );
}

/**
 * Transcription stream — reveals text lines progressively based on scroll.
 */
function TranscriptionStream({ progress }: { progress: MotionValue<number> }) {
  const total = TRANSCRIPTION_LINES.length;
  return (
    <div className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-foreground/75">
      {TRANSCRIPTION_LINES.map((line, i) => (
        <TranscriptionLine
          key={i}
          progress={progress}
          start={i / total}
          end={(i + 1) / total}
          text={line}
        />
      ))}
    </div>
  );
}

/**
 * Vertical progress dots — shows which beat is active in the scroll story.
 * Dots are clickable and scroll to the corresponding beat.
 */
function ProgressDots({
  index,
  total,
  sectionRef,
}: {
  index: MotionValue<number>;
  total: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const unsubscribe = index.on("change", (v) => {
      setCurrent(Math.max(0, Math.min(total - 1, Math.round(v))));
    });
    return unsubscribe;
  }, [index, total]);

  const scrollToBeat = (beatIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.scrollHeight;
    const targetScroll = sectionTop + (beatIndex / total) * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const BEAT_LABELS = [
    "Você fala",
    "A IA escuta",
    "A IA transcreve",
    "A IA estrutura",
    "A IA analisa",
    "A IA alerta",
    "A IA atualiza",
    "Consulta documentada",
    "Você cuida de você",
  ];

  return (
    <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Ir para etapa ${i + 1} — ${BEAT_LABELS[i]}`}
          onClick={() => scrollToBeat(i)}
          className={`cursor-pointer rounded-full transition-[width,background-color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-100 ${
            i === current
              ? "h-1.5 w-6 bg-primary opacity-100"
              : "h-1.5 w-1.5 bg-foreground/25 opacity-60 hover:bg-foreground/50"
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Reduced-motion fallback — shows the final frame statically with descriptive text.
 */
function StaticConsultationStory() {
  return (
    <section
      id="solucao"
      aria-label="Como a MedWiser transforma uma consulta"
      className="dark section relative bg-background py-16 text-foreground sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[160px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light">
          <Sparkles className="h-3 w-3" />
          Plataforma agêntica
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl lg:text-5xl">
          Você fala. A IA documenta. Você vai para casa.
        </h2>
        <p className="mt-5 max-w-2xl text-base text-foreground/65 mx-auto">
          Áudio vira transcrição, transcrição vira prontuário, prontuário vira
          alerta — e o perfil do paciente se atualiza sozinho. Tudo em segundos.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4 text-xs text-foreground/50">
          <span>03m 47s por consulta</span>
          <span className="h-3 w-px bg-foreground/20" />
          <span>SOAP + alerta</span>
          <span className="h-3 w-px bg-foreground/20" />
          <span>0 digitação</span>
        </div>
      </div>
    </section>
  );
}
