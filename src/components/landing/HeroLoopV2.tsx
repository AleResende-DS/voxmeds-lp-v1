"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  Check,
  Clock,
  FileText,
  Hash,
  Heart,
  Link2,
  Pencil,
  Printer,
  Send,
  Sparkles,
  ToggleRight,
  User,
} from "lucide-react";

/**
 * HeroLoopV2 — compact reproduction of the real MedWiser consultation view.
 * Loops through 5 narrative beats:
 *   1. recording   — waveform + gravando
 *   2. info        — tab Informações com ficha da paciente
 *   3. transcribing — tab Consulta + hemograma + transcrição
 *   4. docs        — tab Atestado → Prescrição (com alerta)
 *   5. alert       — alerta da IA + transcrição completa
 */

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Beat = "recording" | "info" | "transcribing" | "docs" | "alert" | "copilot";
const BEAT_SEQUENCE: Beat[] = [
  "info",
  "recording",
  "transcribing",
  "copilot",
  "docs",
  "alert",
];
const BEAT_DURATIONS: Record<Beat, number> = {
  info: 5500,
  recording: 5500,
  transcribing: 5500,
  copilot: 6000,
  docs: 8000,
  alert: 5500,
};

// Which tab is active per beat (docs uses dynamic sub-tab)
const TAB_PER_BEAT: Record<Beat, string> = {
  recording: "Consulta",
  info: "Informações",
  transcribing: "Consulta",
  copilot: "Consulta",
  docs: "Atestado", // overridden dynamically
  alert: "Consulta",
};

// All tabs
const TAB_LABELS = ["Informações", "Consulta", "Atestado", "Prescrição"];

// Transcription lines — Crohn's flare scenario
const TRANSCRIPT_LINES = [
  { speaker: "Dr.", text: "Boa tarde, Maria. Como a senhora está?" },
  { speaker: "Pcte.", text: "Piorei bastante essa semana, doutor." },
  { speaker: "Dr.", text: "Me conta. Dor abdominal? Diarreia?" },
  { speaker: "Pcte.", text: "Muita dor, diarreia com sangue e perdi peso." },
  { speaker: "Dr.", text: "Vamos ver os exames e ajustar o tratamento." },
];

function useCurrentDateTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy}, ${hh}:${min}`;
}

export function HeroLoopV2() {
  const reduceMotion = useReducedMotion();
  const [beatIndex, setBeatIndex] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(662);
  const [docsSubBeat, setDocsSubBeat] = useState<"atestado" | "prescricao">("atestado");
  const dateTime = useCurrentDateTime();

  const currentBeat = BEAT_SEQUENCE[beatIndex];
  const activeTab =
    currentBeat === "docs"
      ? docsSubBeat === "atestado"
        ? "Atestado"
        : "Prescrição"
      : TAB_PER_BEAT[currentBeat];

  // Reset docs sub-beat when entering docs beat
  useEffect(() => {
    if (currentBeat === "docs") {
      setDocsSubBeat("atestado");
      const id = setTimeout(() => setDocsSubBeat("prescricao"), 3000);
      return () => clearTimeout(id);
    }
  }, [currentBeat]);

  // Cycle beats with per-beat durations
  useEffect(() => {
    if (reduceMotion) return;
    const id = setTimeout(() => {
      setBeatIndex((i) => (i + 1) % BEAT_SEQUENCE.length);
    }, BEAT_DURATIONS[currentBeat]);
    return () => clearTimeout(id);
  }, [reduceMotion, currentBeat, beatIndex]);

  // Live timer
  useEffect(() => {
    if (reduceMotion) return;
    if (currentBeat === "alert" || currentBeat === "docs" || currentBeat === "copilot") return;
    const id = setInterval(() => setElapsedSec((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [reduceMotion, currentBeat]);

  const m = String(Math.floor(elapsedSec / 60)).padStart(2, "0");
  const s = String(elapsedSec % 60).padStart(2, "0");
  const timer = `${m}m ${s}s`;

  return (
    <div className="relative mx-auto w-full font-[family-name:var(--font-geist)]">
      <div className="pointer-events-none absolute -right-8 top-8 h-32 w-32 rounded-full bg-primary/25 blur-[80px] drift-slow" />

      <div
        className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]"
        style={{ aspectRatio: "2036/1420" }}
      >
        <Header dateTime={dateTime} />
        <Tabs activeTab={activeTab} beat={currentBeat} />

        {/* Main content area */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {currentBeat === "recording" && (
              <BeatRecording key="beat-recording" />
            )}
            {currentBeat === "info" && <BeatInfo key="beat-info" />}
            {currentBeat === "transcribing" && (
              <BeatTranscribing key="beat-transcribing" />
            )}
            {currentBeat === "copilot" && (
              <BeatCopilot key="beat-copilot" />
            )}
            {currentBeat === "docs" && (
              <BeatDocs key="beat-docs" subBeat={docsSubBeat} />
            )}
            {currentBeat === "alert" && <BeatAlert key="beat-alert" />}
          </AnimatePresence>

          {/* Persistent cloud button — hidden when copilot chat is open */}
          <AnimatePresence>
            {currentBeat !== "copilot" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="absolute bottom-3 right-0 z-10 translate-x-[30%]"
              >
                <CloudButton />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Footer timer={timer} beat={currentBeat} />
      </div>
    </div>
  );
}

/* ───────────────────────── Header ───────────────────────── */

function Header({ dateTime }: { dateTime: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border bg-card px-3 py-3 sm:px-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="truncate text-[13px] font-semibold text-foreground sm:text-sm">
            Maria | Surto agudo — Doença de Crohn
          </h3>
          <Pencil className="h-3 w-3 shrink-0 text-muted-foreground" />
        </div>
        <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
          Maria Aparecida · {dateTime}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <button
          type="button"
          className="inline-flex h-7 items-center justify-center rounded-md border border-border bg-card px-2 text-muted-foreground"
          disabled
        >
          <Printer className="h-3 w-3" />
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

function Tabs({ activeTab, beat }: { activeTab: string; beat: Beat }) {
  return (
    <div className="flex items-center gap-0.5 border-b border-border bg-card px-3 sm:px-4">
      {TAB_LABELS.map((label) => {
        const isActive = label === activeTab;
        const showCritical = label === "Prescrição";
        return (
          <div
            key={label}
            className={`relative flex items-center gap-1 px-2 py-2 text-[10px] font-medium transition-colors ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
            {showCritical && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-50" />
                <AlertTriangle className="relative h-2.5 w-2.5 text-destructive" />
              </span>
            )}
            {isActive && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-0 -bottom-px h-[2px] bg-primary"
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ───────────────────────── Beat: Recording ───────────────────────── */

function BeatRecording() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="grid h-full grid-cols-[0.88fr_1.12fr] divide-x divide-border"
    >
      {/* LEFT — empty */}
      <div className="p-3 sm:p-4">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Informações relevantes
        </p>
        <div className="flex h-[calc(100%-24px)] flex-col items-center justify-center gap-2 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-border">
            <FileText className="h-4 w-4 text-muted-foreground/60" />
          </div>
          <p className="text-[10px] text-muted-foreground">
            Aguardando documentos
          </p>
          <p className="text-[9px] text-muted-foreground/60">
            A IA vai processar ao receber
          </p>
        </div>
      </div>

      {/* RIGHT — waveform */}
      <div className="p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
            Transcrição
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-[8px] font-semibold text-destructive">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
            </span>
            GRAVANDO
          </span>
        </div>
        <Waveform />
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Beat: Info ───────────────────────── */

function BeatInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="h-full overflow-hidden p-3 sm:p-4"
    >
      {/* PACIENTE */}
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Paciente
      </p>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.08 }}
        className="rounded-md border border-border p-2.5"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-foreground">
              Maria Aparecida
            </p>
            <p className="text-[9px] text-muted-foreground">43 anos</p>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          <button
            type="button"
            className="inline-flex h-6 items-center justify-center gap-1 rounded-md border border-border bg-card text-[8px] font-medium text-muted-foreground"
            disabled
          >
            <Sparkles className="h-2.5 w-2.5" />
            Resumo clínico
          </button>
          <button
            type="button"
            className="inline-flex h-6 items-center justify-center gap-1 rounded-md border border-border bg-card text-[8px] font-medium text-muted-foreground"
            disabled
          >
            <Heart className="h-2.5 w-2.5" />
            Dados médicos
          </button>
        </div>
      </motion.div>

      {/* CONSULTA */}
      <p className="mb-1.5 mt-3 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Consulta
      </p>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.18 }}
        className="space-y-0 rounded-md border border-border"
      >
        <InfoRow icon={Calendar} label="Início" value="10/04/2026, 14:30" />
        <InfoRow icon={Clock} label="Duração" value="00h 11m" border />
      </motion.div>

      {/* DOCUMENTOS GERADOS */}
      <p className="mb-1.5 mt-3 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Documentos gerados
      </p>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.28 }}
        className="flex flex-wrap gap-1"
      >
        {["Atestado", "Prescrição/Receita", "Pedido de exames", "Anamnese Geral"].map(
          (doc, i) => (
            <span
              key={doc}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[8px] font-medium text-muted-foreground"
            >
              <FileText className="h-2.5 w-2.5" />
              {doc}
            </span>
          ),
        )}
      </motion.div>

      {/* SISTEMA */}
      <p className="mb-1.5 mt-3 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Sistema
      </p>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.36 }}
        className="rounded-md border border-border"
      >
        <InfoRow icon={Hash} label="ID" value="cmn16f2mz000bt..." />
        <InfoRow icon={Link2} label="Link" value="app.medwiser.app/..." border />
      </motion.div>
    </motion.div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  border,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-1.5 text-[9px] ${border ? "border-t border-border" : ""}`}
    >
      <Icon className="h-3 w-3 shrink-0 text-muted-foreground" />
      <span className="w-12 shrink-0 text-muted-foreground">{label}</span>
      <span className="truncate font-mono text-foreground/80">{value}</span>
    </div>
  );
}

/* ───────────────────────── Beat: Transcribing ───────────────────────── */

function BeatTranscribing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="grid h-full grid-cols-[0.88fr_1.12fr] divide-x divide-border"
    >
      {/* LEFT — document */}
      <div className="p-3 sm:p-4">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Informações relevantes
        </p>
        <LeftDocument />
      </div>

      {/* RIGHT — transcript */}
      <div className="p-3 sm:p-4">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Transcrição
        </p>
        <div className="space-y-1.5 overflow-hidden">
          {TRANSCRIPT_LINES.slice(0, 4).map((line, i) => (
            <TranscriptLine key={i} line={line} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Beat: Docs (Atestado → Prescrição) ───────────────────────── */

function BeatDocs({ subBeat }: { subBeat: "atestado" | "prescricao" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="h-full overflow-hidden p-3 sm:p-4"
    >
      <AnimatePresence mode="wait">
        {subBeat === "atestado" ? (
          <DocAtestado key="doc-atestado" />
        ) : (
          <DocPrescricao key="doc-prescricao" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DocAtestado() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="space-y-3"
    >
      {/* Atestado body */}
      <div className="rounded-md border border-border p-3">
        <p className="text-[10px] leading-relaxed text-foreground/85">
          Atesto para os devidos fins que o(a) paciente{" "}
          <span className="border-b border-primary/40 font-semibold text-foreground">
            Maria Aparecida
          </span>
          , CPF{" "}
          <span className="border-b border-border text-muted-foreground">
            ___.___.___-__
          </span>
          , esteve sob meus cuidados na data de{" "}
          <span className="border-b border-primary/40 font-semibold text-foreground">
            {new Date().toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          , necessitando de afastamento de suas atividades pelo período de{" "}
          <span className="border-b border-primary/40 font-semibold text-foreground">
            07
          </span>{" "}
          <span className="text-muted-foreground">(sete)</span> dia(s).
        </p>
      </div>

      {/* CID toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.24, ease: EASE_OUT }}
        className="flex items-center gap-2"
      >
        <ToggleRight className="h-4 w-4 text-primary" />
        <span className="text-[9px] text-muted-foreground">
          Incluir CID-10 no atestado
        </span>
      </motion.div>

      {/* CID row */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.24, ease: EASE_OUT }}
        className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[10px]"
      >
        <span className="font-semibold text-foreground">CID-10:</span>
        <span className="rounded border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[9px] text-foreground">
          K50
        </span>
        <span className="text-muted-foreground">—</span>
        <span className="text-foreground/80">Doença de Crohn</span>
      </motion.div>
    </motion.div>
  );
}

function DocPrescricao() {
  const meds = [
    {
      n: 1,
      name: "Prednisona",
      detail: "40mg — 1 comprimido ao dia — Oral — 4 semanas",
      expanded: true,
      dose: "40mg",
      duracao: "4 semanas",
      via: "Oral",
      obs: "Reduzir 10mg/semana após 2 semanas. Não suspender abruptamente.",
    },
    {
      n: 2,
      name: "Mesalazina",
      detail: "800mg — 1 comprimido 3x ao dia — Oral — uso contínuo",
    },
    {
      n: 3,
      name: "Omeprazol",
      detail: "20mg — 1 cápsula ao dia em jejum — Oral — uso contínuo",
    },
    {
      n: 4,
      name: "Ibuprofeno",
      detail: "600mg — 1 comprimido a cada 8h — Oral — se dor",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="space-y-1.5"
    >
      {/* CRITICAL alert on prescricao — red, with pulse */}
      <motion.div
        initial={{ opacity: 0, x: -6, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.1 }}
        className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-2"
      >
        <div className="relative mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-40" />
          <AlertTriangle className="relative h-3 w-3 text-destructive" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <p className="text-[9px] font-bold uppercase text-destructive">
              Alerta crítico
            </p>
            <span className="rounded-sm bg-destructive/20 px-1 py-px text-[7px] font-bold uppercase text-destructive">
              AINE contraindicado
            </span>
          </div>
          <p className="mt-0.5 text-[9px] text-foreground/80 leading-tight">
            Ibuprofeno é contraindicado na Doença de Crohn — risco de
            perfuração intestinal e agravamento do surto.
          </p>
        </div>
      </motion.div>

      {/* Expanded first med */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT, delay: 0.15 }}
        className="rounded-md border border-border p-2"
      >
        <p className="text-[9px] text-muted-foreground">
          <span className="mr-1 font-semibold text-foreground">
            1. {meds[0].name}
          </span>
        </p>
        <div className="mt-1.5 grid grid-cols-3 gap-x-2 gap-y-1 text-[8px]">
          <div>
            <p className="text-muted-foreground">Dose</p>
            <p className="font-medium text-foreground">{meds[0].dose}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Duração</p>
            <p className="font-medium text-foreground">{meds[0].duracao}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Via</p>
            <p className="font-medium text-foreground">{meds[0].via}</p>
          </div>
        </div>
        <p className="mt-1.5 text-[8px] text-muted-foreground italic">
          {meds[0].obs}
        </p>
      </motion.div>

      {/* Collapsed meds */}
      {meds.slice(1).map((med, i) => (
        <motion.div
          key={med.n}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.24,
            ease: EASE_OUT,
            delay: 0.2 + i * 0.06,
          }}
          className="flex items-baseline gap-1 px-2 py-1 text-[9px]"
        >
          <span className="font-semibold text-foreground">
            {med.n}. {med.name}
          </span>
          <span className="text-muted-foreground">— {med.detail}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ───────────────────────── Beat: Alert ───────────────────────── */

function BeatAlert() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="grid h-full grid-cols-[0.88fr_1.12fr] divide-x divide-border"
    >
      {/* LEFT — alert */}
      <div className="p-3 sm:p-4">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Informações relevantes
        </p>
        <LeftAlert />
      </div>

      {/* RIGHT — full transcript */}
      <div className="p-3 sm:p-4">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Transcrição
        </p>
        <div className="space-y-1.5 overflow-hidden">
          {TRANSCRIPT_LINES.map((line, i) => (
            <TranscriptLine key={i} line={line} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Shared components ───────────────────────── */

function LeftDocument() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="space-y-2"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, ease: EASE_OUT, delay: 0.1 }}
        className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2"
      >
        <FileText className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium text-foreground">
            hemograma-maria.pdf
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
            <p className="mt-1 text-[10px] font-medium leading-tight text-foreground">
              Anemia ferropriva — compatível com perda sanguínea GI
            </p>
            <p className="mt-0.5 text-[9px] leading-tight text-muted-foreground">
              Hb 10,2 ↓ · VCM 76 fL ↓ · Ferritina 12 ng/mL ↓ · Avaliar
              reposição de ferro e colonoscopia de controle.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: EASE_OUT, delay: 0.35 }}
        className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2"
      >
        <FileText className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-medium text-foreground">
            hemograma-maria.pdf
          </p>
          <p className="text-[9px] text-muted-foreground">
            1 alerta · 3 valores alterados
          </p>
        </div>
      </motion.div>
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

/* ───────────────────────── Waveform (centered, audio-style) ───────────────────────── */

function Waveform() {
  // Pre-compute bar heights to create natural audio-like clusters
  const bars = useMemo(() => {
    const count = 64;
    return Array.from({ length: count }, (_, i) => {
      // Create clustered pattern with varying amplitude groups
      const t = i / count;
      const cluster1 = Math.sin(t * Math.PI * 6) * 0.4;
      const cluster2 = Math.sin(t * Math.PI * 2.5 + 1) * 0.3;
      const noise = Math.sin(i * 1.7) * 0.15 + Math.sin(i * 3.1) * 0.1;
      const base = 0.08 + Math.abs(cluster1 + cluster2 + noise);
      const low = Math.max(0.06, base * 0.3);
      const high = Math.min(1, base * 1.2);
      return { low, high };
    });
  }, []);

  return (
    <div className="flex h-[calc(100%-24px)] flex-col items-center justify-center gap-3">
      <div className="flex h-14 items-center justify-center gap-[2px]">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full bg-foreground/80"
            initial={{ height: `${bar.low * 100}%` }}
            animate={{
              height: [
                `${bar.low * 100}%`,
                `${bar.high * 100}%`,
                `${bar.low * 80}%`,
                `${bar.high * 90}%`,
                `${bar.low * 100}%`,
              ],
            }}
            transition={{
              duration: 1.4 + Math.sin(i * 0.5) * 0.4,
              ease: "easeInOut",
              repeat: Infinity,
              delay: (i / bars.length) * 0.6,
            }}
          />
        ))}
      </div>
      <p className="text-[9px] text-muted-foreground">Ouvindo consulta...</p>
    </div>
  );
}

/* ───────────────────────── Cloud button (exact replica from app) ───────────────────────── */

function CloudButton() {
  return (
    <div className="relative">
      <svg
        width="54"
        height="44"
        viewBox="0 0 120 80"
        className="drop-shadow-[0_2px_8px_rgba(124,58,237,0.25)]"
        style={{ marginRight: "-28px" }}
      >
        <defs>
          <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="40%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <radialGradient id="cloud-glow" cx="35%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Cloud shape */}
        <rect x="22" y="36" rx="16" ry="16" width="76" height="34" fill="url(#cloud-grad)" />
        <circle cx="36" cy="36" r="18" fill="url(#cloud-grad)" />
        <circle cx="58" cy="26" r="22" fill="url(#cloud-grad)" />
        <circle cx="82" cy="32" r="17" fill="url(#cloud-grad)" />
        {/* Glow overlay */}
        <rect x="22" y="36" rx="16" ry="16" width="76" height="34" fill="url(#cloud-glow)" />
        <circle cx="36" cy="36" r="18" fill="url(#cloud-glow)" />
        <circle cx="58" cy="26" r="22" fill="url(#cloud-glow)" />
        <circle cx="82" cy="32" r="17" fill="url(#cloud-glow)" />
        {/* Specular highlights */}
        <ellipse cx="50" cy="22" rx="12" ry="6" fill="white" opacity="0.13" transform="rotate(-8 50 22)" />
        <ellipse cx="34" cy="32" rx="6" ry="4" fill="white" opacity="0.09" />
      </svg>
      {/* Sparkle icon */}
      <div className="absolute left-[10px] top-1/2 -translate-y-1/2">
        <Sparkles className="h-3.5 w-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
      </div>
    </div>
  );
}

/* ───────────────────────── Beat: Copilot (overlay on consultation) ───────────────────────── */

const COPILOT_MESSAGES = [
  {
    role: "user" as const,
    text: "Quais exames devo pedir para acompanhar a anemia dessa paciente?",
  },
  {
    role: "ai" as const,
    text: "Com base no hemograma da Maria (Hb 10,2, VCM 76, Ferritina 12), sugiro:\n\n• Ferritina sérica + Ferro sérico + TIBC\n• Reticulócitos\n• PCR e VHS (atividade do Crohn)\n• Calprotectina fecal\n\nA anemia é compatível com deficiência de ferro por perda GI crônica.",
  },
];

function BeatCopilot() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: EASE_OUT }}
      className="relative h-full"
    >
      {/* Background — normal consultation view (static, dimmed) */}
      <div className="h-full grid grid-cols-[0.88fr_1.12fr] divide-x divide-border opacity-40">
        <div className="p-3 sm:p-4">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
            Informações relevantes
          </p>
          <div className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2">
            <FileText className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-medium text-foreground">hemograma-maria.pdf</p>
              <p className="text-[9px] text-muted-foreground">Exame laboratorial</p>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
            Transcrição
          </p>
          {TRANSCRIPT_LINES.slice(0, 3).map((line, i) => (
            <p key={i} className="text-[10px] leading-snug text-foreground/85 mt-1">
              <span className="mr-1 font-semibold text-primary">[{line.speaker}]</span>
              {line.text}
            </p>
          ))}
        </div>
      </div>

      {/* Chat panel overlay — slides in from right */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.36, ease: EASE_OUT, delay: 0.15 }}
        className="absolute inset-y-0 right-0 z-20 flex w-[55%] flex-col border-l border-border bg-card shadow-[-8px_0_24px_-12px_rgba(0,0,0,0.15)]"
      >
        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8B5CF6]">
              <Sparkles className="h-2 w-2 text-white" />
            </div>
            <p className="text-[9px] font-semibold text-foreground">
              Assistente Medwiser
            </p>
          </div>
          <span className="text-[9px] text-muted-foreground">×</span>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-2 overflow-hidden p-2.5">
          {COPILOT_MESSAGES.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.28,
                ease: EASE_OUT,
                delay: 0.4 + i * 0.7,
              }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-lg px-2 py-1.5 text-[8px] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-muted/50 text-foreground/85"
                }`}
              >
                {msg.text.split("\n").map((line, j) => (
                  <p key={j} className={j > 0 ? "mt-0.5" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className="border-t border-border p-2">
          <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/30 px-2 py-1">
            <p className="flex-1 text-[8px] text-muted-foreground">
              Pergunte algo...
            </p>
            <div className="flex h-4 w-4 items-center justify-center rounded bg-[#8B5CF6]">
              <Send className="h-2 w-2 text-white" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── Footer ───────────────────────── */

function Footer({ timer, beat }: { timer: string; beat: Beat }) {
  const showFinish = beat === "alert" || beat === "docs";
  return (
    <div className="flex items-center justify-end gap-1.5 border-t border-border bg-card px-3 py-2.5 sm:px-4">
      <div className="flex h-7 items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2 font-[family-name:var(--font-geist-mono)] text-[10px] tabular-nums text-foreground">
        {timer}
      </div>
      {showFinish ? (
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
        className="inline-flex h-7 items-center gap-1 rounded-md bg-primary px-2.5 text-[10px] font-medium text-primary-foreground shadow-sm"
        disabled
      >
        <Sparkles className="h-3 w-3" />
        Doc com IA
      </button>
    </div>
  );
}
