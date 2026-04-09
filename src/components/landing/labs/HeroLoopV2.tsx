"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  Check,
  FileText,
  Pencil,
  Plus,
  Printer,
} from "lucide-react";

/**
 * HeroLoopV2 — compact reproduction of the real MedWiser consultation view.
 * Reproduces the same layout, typography (Geist), and component patterns
 * used in app.medwiser.app, but rendered entirely in DOM/SVG and looping
 * through 3 narrative beats: recording → transcribing → AI alert.
 *
 * Wrapped in `className="dark"` so it always renders dark regardless of
 * the page theme — matches the premium "product preview" aesthetic.
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Beat = "recording" | "transcribing" | "alert";
const BEAT_SEQUENCE: Beat[] = ["recording", "transcribing", "alert"];
const BEAT_DURATION_MS = 4200;

// Tabs from the real app (trimmed to what fits visually in the mockup)
const TABS = [
  { label: "Informações", active: false },
  { label: "Consulta", active: true },
  { label: "Atestado", active: false, warn: true },
  { label: "Prescrição", active: false },
];

// Transcription that streams in Beat 2 (real medical dialog)
const TRANSCRIPT_LINES = [
  { speaker: "Dr.", text: "Boa tarde, Ana Beatriz. Entre, por favor." },
  { speaker: "Pcte.", text: "Boa tarde, doutor." },
  { speaker: "Dr.", text: "Quanto tempo, né? Faz uns quatro meses." },
  { speaker: "Pcte.", text: "É, as coisas começaram a piorar de novo." },
  { speaker: "Dr.", text: "Me conta o que aconteceu. Desde quando piorou?" },
];

export function HeroLoopV2() {
  const reduceMotion = useReducedMotion();
  const [beatIndex, setBeatIndex] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(662); // 11m 02s

  const currentBeat = BEAT_SEQUENCE[beatIndex];

  // Cycle beats
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setBeatIndex((i) => (i + 1) % BEAT_SEQUENCE.length);
    }, BEAT_DURATION_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Live timer — runs in beats recording and transcribing, freezes in alert
  useEffect(() => {
    if (reduceMotion) return;
    if (currentBeat === "alert") return; // Frozen during alert
    const id = setInterval(() => {
      setElapsedSec((e) => e + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [reduceMotion, currentBeat]);

  const m = String(Math.floor(elapsedSec / 60)).padStart(2, "0");
  const s = String(elapsedSec % 60).padStart(2, "0");
  const timer = `${m}m ${s}s`;

  return (
    <div className="dark relative mx-auto w-full font-[family-name:var(--font-geist)]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-8 top-8 h-32 w-32 rounded-full bg-primary/25 blur-[80px] drift-slow" />

      {/* Mockup window — matches real app rounded-2xl + border + shadow */}
      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
        style={{ aspectRatio: "2036/1420" }}
      >
        <Header />
        <Tabs />

        {/* Main content area — 2 columns, changes per beat */}
        <div className="relative grid min-h-0 flex-1 grid-cols-[0.88fr_1.12fr] divide-x divide-border overflow-hidden">
          {/* LEFT — Informações relevantes */}
          <div className="relative min-w-0 overflow-hidden p-3 sm:p-4">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              Informações relevantes
            </p>
            <AnimatePresence mode="wait">
              {currentBeat === "recording" && <LeftEmpty key="l1" />}
              {currentBeat === "transcribing" && <LeftDocument key="l2" />}
              {currentBeat === "alert" && <LeftAlert key="l3" />}
            </AnimatePresence>
          </div>

          {/* RIGHT — Transcrição */}
          <div className="relative min-w-0 overflow-hidden p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                Transcrição
              </p>
              {currentBeat === "recording" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-[8px] font-semibold text-destructive">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
                  </span>
                  GRAVANDO
                </span>
              )}
            </div>
            <AnimatePresence mode="wait">
              {currentBeat === "recording" && <RightWaveform key="r1" />}
              {currentBeat === "transcribing" && <RightTranscript key="r2" />}
              {currentBeat === "alert" && <RightTranscriptFull key="r3" />}
            </AnimatePresence>
          </div>
        </div>

        <Footer timer={timer} beat={currentBeat} />
      </div>
    </div>
  );
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border bg-card px-3 py-3 sm:px-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-[13px] font-semibold text-foreground sm:text-sm">
            Ana | Surto de doença de Crohn
          </h3>
          <Pencil className="h-3 w-3 shrink-0 text-muted-foreground" />
        </div>
        <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
          Anna Beatriz · 05/04/2026, 00:02
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          className="relative inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2.5 text-[10px] font-medium text-foreground"
          disabled
        >
          <Printer className="h-3 w-3" />
          Imprimir
          <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
          </span>
        </button>
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-md bg-primary px-2.5 text-[10px] font-medium text-primary-foreground shadow-sm"
          disabled
        >
          <Check className="h-3 w-3" />
          Finalizar
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────── Tabs ───────────────────────── */

function Tabs() {
  return (
    <div className="flex items-center gap-0.5 border-b border-border bg-card px-3 sm:px-4">
      {TABS.map((tab) => (
        <div
          key={tab.label}
          className={`relative flex items-center gap-1 px-2 py-2 text-[10px] font-medium transition-colors ${
            tab.active
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {tab.label}
          {tab.warn && (
            <AlertTriangle className="h-2.5 w-2.5 text-warning" />
          )}
          {tab.active && (
            <motion.span
              layoutId="tab-underline"
              className="absolute inset-x-0 -bottom-px h-[2px] bg-primary"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── LEFT column variants ───────────────────────── */

function LeftEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="flex h-full flex-col items-center justify-center gap-2 text-center"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
        <FileText className="h-4 w-4 text-muted-foreground/60" />
      </div>
      <p className="text-[10px] text-muted-foreground">
        Aguardando documentos
      </p>
      <p className="text-[9px] text-muted-foreground/60">
        A IA vai processar ao receber
      </p>
    </motion.div>
  );
}

function LeftDocument() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="space-y-2"
    >
      {/* Document card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.1 }}
        className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2"
      >
        <FileText className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium text-foreground">
            hemograma-anna.pdf
          </p>
          <p className="text-[9px] text-muted-foreground">
            Exame laboratorial
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[8px] font-semibold text-success">
          <Check className="h-2.5 w-2.5" />
          processado
        </span>
      </motion.div>

      {/* Exam data rows */}
      <div className="space-y-1.5">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-foreground">
          HEMOGRAMA
        </p>
        <ExamRow label="Hemácias" value="4,17 milhões/mm³" />
        <ExamRow label="Hemoglobina" value="10,2 g/dL" warning />
        <ExamRow label="Hematócrito" value="32,5 %" warning />
        <ExamRow label="VCM" value="76 fL" warning />
      </div>
    </motion.div>
  );
}

function ExamRow({
  label,
  value,
  warning,
}: {
  label: string;
  value: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-[9px]">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`font-mono ${warning ? "text-warning" : "text-foreground"}`}
      >
        {value}
        {warning && <span className="ml-0.5">↓</span>}
      </span>
    </div>
  );
}

function LeftAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="space-y-2"
    >
      {/* Alert card — styled like shadcn destructive alert */}
      <motion.div
        initial={{ opacity: 0, x: -8, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.36, ease: EASE_OUT, delay: 0.1 }}
        className="relative rounded-md border border-warning/40 bg-warning/10 p-2.5"
      >
        <div className="flex items-start gap-2">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warning/20 text-warning">
            <AlertTriangle className="h-3 w-3" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-warning">
                Alerta da IA
              </p>
              <span className="rounded-sm bg-warning/20 px-1 py-px text-[8px] font-semibold uppercase text-warning">
                Alta
              </span>
            </div>
            <p className="mt-1 text-[10px] font-medium text-foreground leading-tight">
              Hemograma sugere anemia ferropriva
            </p>
            <p className="mt-0.5 text-[9px] text-muted-foreground leading-tight">
              VCM 76 fL ↓ · Ferritina 12 ng/mL ↓ · Considerar investigação de
              perda sanguínea oculta.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Document below alert */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: EASE_OUT, delay: 0.35 }}
        className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2"
      >
        <FileText className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium text-foreground">
            hemograma-anna.pdf
          </p>
          <p className="text-[9px] text-muted-foreground">
            1 alerta · 3 valores alterados
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── RIGHT column variants ───────────────────────── */

function RightWaveform() {
  const bars = Array.from({ length: 44 }, (_, i) => i);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="flex h-full flex-col items-center justify-center gap-4"
    >
      <div className="flex h-16 items-end justify-center gap-[3px]">
        {bars.map((i) => {
          const seed = Math.sin(i * 0.35) * 0.5 + 0.5;
          const low = 0.15 + seed * 0.2;
          const high = 0.55 + seed * 0.4;
          return (
            <div key={i} className="relative h-full w-[3px]">
              <motion.div
                className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-gradient-to-t from-primary/30 to-primary"
                initial={{ scaleY: low }}
                animate={{ scaleY: [low, high, low * 1.1, high * 0.8, low] }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: (i / bars.length) * 0.5,
                }}
              />
            </div>
          );
        })}
      </div>
      <p className="font-[family-name:var(--font-geist-mono)] text-[9px] text-muted-foreground">
        Ouvindo · 16 kHz · mono
      </p>
    </motion.div>
  );
}

function RightTranscript() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="space-y-1.5 overflow-hidden"
    >
      {TRANSCRIPT_LINES.slice(0, 4).map((line, i) => (
        <TranscriptLine key={i} line={line} index={i} />
      ))}
    </motion.div>
  );
}

function RightTranscriptFull() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="space-y-1.5 overflow-hidden"
    >
      {TRANSCRIPT_LINES.map((line, i) => (
        <TranscriptLine key={i} line={line} index={i} />
      ))}
    </motion.div>
  );
}

function TranscriptLine({
  line,
  index,
}: {
  line: { speaker: string; text: string };
  index: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.28,
        ease: EASE_OUT,
        delay: 0.1 + index * 0.28,
      }}
      className="text-[10px] leading-snug text-foreground/85"
    >
      <span className="mr-1 font-semibold text-primary">[{line.speaker}]</span>
      {line.text}
    </motion.p>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer({ timer, beat }: { timer: string; beat: Beat }) {
  const isAlert = beat === "alert";
  return (
    <div className="flex items-center justify-between gap-2 border-t border-border bg-card px-3 py-2.5 sm:px-4">
      <button
        type="button"
        className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[9px] font-medium text-muted-foreground"
        disabled
      >
        <Plus className="h-3 w-3" />
        Adicionar áudio
      </button>
      <div className="flex items-center gap-1.5">
        <div className="flex h-7 items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 font-[family-name:var(--font-geist-mono)] text-[10px] tabular-nums text-foreground">
          {timer}
        </div>
        {isAlert ? (
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-md bg-primary px-2.5 text-[10px] font-medium text-primary-foreground shadow-sm"
            disabled
          >
            <Check className="h-3 w-3" />
            Finalizar
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-md bg-destructive px-2.5 text-[10px] font-medium text-destructive-foreground shadow-sm"
            disabled
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive-foreground opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive-foreground" />
            </span>
            Gravar
          </button>
        )}
        <button
          type="button"
          className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-card px-2 text-[9px] font-medium text-muted-foreground"
          disabled
        >
          <Plus className="h-3 w-3" />
          Novo doc
        </button>
      </div>
    </div>
  );
}
