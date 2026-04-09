"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { AlertTriangle, Waves } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Beat = "waveform" | "transcription" | "alert";
const BEAT_SEQUENCE: Beat[] = ["waveform", "transcription", "alert"];
const BEAT_DURATION_MS = 3600;

/**
 * HeroLoop — compact mockup window that cycles 3 beats in a ~11s loop.
 * Everything is DOM/SVG, zero video. The "AO VIVO" badge pulses and
 * the footer timer ticks up in real time so the mockup feels alive.
 */
export function HeroLoop() {
  const reduceMotion = useReducedMotion();
  const [beatIndex, setBeatIndex] = useState(0);
  const [timer, setTimer] = useState("00:03:12");

  const currentBeat = BEAT_SEQUENCE[beatIndex];

  // Cycle beats
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setBeatIndex((i) => (i + 1) % BEAT_SEQUENCE.length);
    }, BEAT_DURATION_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Live-ish timer (starts at 3:12 for immediate credibility)
  useEffect(() => {
    if (reduceMotion) return;
    let elapsed = 192; // 3:12
    const id = setInterval(() => {
      elapsed += 1;
      const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      setTimer(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <div className="dark relative mx-auto w-full">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-10 top-10 h-32 w-32 rounded-full bg-primary/25 blur-[80px] drift-slow" />

      {/* Mockup window */}
      <div className="relative aspect-[2036/1394] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)]">
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-400/80" />
            <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
            <div className="h-2 w-2 rounded-full bg-green-400/80" />
            <span className="ml-3 font-mono text-[10px] text-foreground/50">
              MedWiser · Consulta em andamento
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-primary-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-light opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary-light" />
            </span>
            AO VIVO
          </div>
        </div>

        {/* Stage */}
        <div className="relative h-[calc(100%-82px)] p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {currentBeat === "waveform" && <WaveformBeat key="waveform" />}
            {currentBeat === "transcription" && (
              <TranscriptionBeat key="transcription" />
            )}
            {currentBeat === "alert" && <AlertBeat key="alert" />}
          </AnimatePresence>
        </div>

        {/* Footer bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-border bg-card px-4 py-3 text-[10px] text-foreground/50">
          <span className="font-mono tabular-nums">{timer}</span>
          <span className="font-mono">MedWiser.app</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Beat 1: Waveform ───────────────────────── */

function WaveformBeat() {
  const bars = Array.from({ length: 48 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="flex h-full flex-col items-center justify-center gap-5"
    >
      <div className="flex items-center gap-2 text-[11px] font-mono text-primary-light">
        <Waves className="h-3.5 w-3.5" />
        Capturando áudio
      </div>
      <div className="flex h-20 items-end justify-center gap-1">
        {bars.map((i) => {
          const seed = Math.sin(i * 0.4) * 0.5 + 0.5;
          const low = 0.18 + seed * 0.25;
          const high = 0.55 + seed * 0.4;
          return (
            <div key={i} className="relative h-full w-1">
              <motion.div
                className="absolute inset-x-0 bottom-0 h-full origin-bottom rounded-full bg-gradient-to-t from-primary/30 to-primary-light"
                initial={{ scaleY: low }}
                animate={{ scaleY: [low, high, low * 1.2, high * 0.8, low] }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: (i / bars.length) * 0.4,
                }}
              />
            </div>
          );
        })}
      </div>
      <p className="font-mono text-[10px] text-foreground/40">
        16kHz · canal único · ao vivo
      </p>
    </motion.div>
  );
}

/* ───────────────────────── Beat 2: Transcription ───────────────────────── */

const TRANSCRIPTION_LINES = [
  "Paciente João, 45 anos, hipertenso.",
  "Queixa: tosse seca há 2 semanas.",
  "Nega febre, dispneia ou dor torácica.",
  "PA 140/90 mmHg. Ausculta limpa.",
];

function TranscriptionBeat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="flex h-full flex-col gap-3"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-light">
        Transcrição ao vivo
      </p>
      <div className="flex flex-col gap-2.5">
        {TRANSCRIPTION_LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.32,
              ease: EASE_OUT,
              delay: 0.15 + i * 0.35,
            }}
            className="font-mono text-xs text-foreground/80"
          >
            <span className="mr-2 text-primary-light/70">▸</span>
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

/* ───────────────────────── Beat 3: Alert ───────────────────────── */

function AlertBeat() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: EASE_OUT }}
      className="flex h-full flex-col gap-3"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-primary-light">
        Análise automática
      </p>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.42, ease: EASE_OUT, delay: 0.15 }}
        className="relative rounded-xl border border-yellow-400/40 bg-gradient-to-br from-yellow-500/15 to-primary/10 p-4 shadow-[0_20px_60px_-20px_rgba(250,204,21,0.4)]"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-300">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-yellow-300">
              Alerta da IA
            </p>
            <p className="mt-1.5 text-xs font-medium text-foreground">
              Hemograma sugere anemia ferropriva.
            </p>
            <p className="mt-1 text-[11px] text-foreground/60">
              VCM 76 fL ↓ · Ferritina 12 ng/mL ↓
            </p>
          </div>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="font-mono text-[10px] text-foreground/40"
      >
        Considerar investigação de perda sanguínea.
      </motion.p>
    </motion.div>
  );
}
