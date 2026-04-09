"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Brain } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const USER_MESSAGE =
  "Paciente hipertenso em uso de losartana 50mg, apresentou tosse seca persistente há 2 semanas. Posso trocar por qual?";

const AI_RESPONSE = [
  "A tosse seca com losartana é incomum (ela é BRA, não IECA). Vale",
  "investigar outras causas antes de trocar. Mas se for necessário",
  "substituir, as opções de mesma classe com boa tolerância seriam",
  "valsartana ou olmesartana.",
];

const AI_CONTEXT =
  "Baseado no histórico: última consulta em 12/02 registrou PA 140/90 mmHg.";

type Phase = "idle" | "user" | "typing" | "ai-words" | "ai-context" | "pause";

/**
 * CopilotChat — animated chat mock that only plays when in view.
 * Cycles: user message slides in → "typing" dots → AI response streams in word by word → context footnote → pause → reset
 */
const TOTAL_WORDS = AI_RESPONSE.join(" ").split(" ").length;

export function CopilotChat() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4, once: false });
  const reduceMotion = useReducedMotion();

  // If reduced motion is active, jump straight to the fully-shown context state.
  // Initializing here avoids cascading setState calls inside useEffect.
  const [phase, setPhase] = useState<Phase>(
    reduceMotion ? "ai-context" : "idle",
  );
  const [visibleWords, setVisibleWords] = useState(
    reduceMotion ? TOTAL_WORDS : 0,
  );
  const totalWords = TOTAL_WORDS;

  // Drive the sequence only while in view and not reduced-motion
  useEffect(() => {
    if (reduceMotion) return; // Already in final state from initial useState
    if (!inView) {
      // Pause the animation when scrolled away
      return;
    }

    if (phase === "idle") {
      const t = setTimeout(() => setPhase("user"), 300);
      return () => clearTimeout(t);
    }

    if (phase === "user") {
      const t = setTimeout(() => setPhase("typing"), 900);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      const t = setTimeout(() => {
        setVisibleWords(0);
        setPhase("ai-words");
      }, 1200);
      return () => clearTimeout(t);
    }

    if (phase === "ai-words") {
      if (visibleWords < totalWords) {
        const t = setTimeout(() => setVisibleWords((n) => n + 1), 70);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("ai-context"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "ai-context") {
      const t = setTimeout(() => setPhase("pause"), 3500);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => {
        setVisibleWords(0);
        setPhase("idle");
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, visibleWords, inView, reduceMotion, totalWords]);

  const allWords = AI_RESPONSE.join(" ").split(" ");
  const shownText = allWords.slice(0, visibleWords).join(" ");

  const showUser = phase !== "idle";
  const showTyping = phase === "typing";
  const showAiBubble = phase === "ai-words" || phase === "ai-context" || phase === "pause";
  const showContext = phase === "ai-context" || phase === "pause";

  return (
    <div ref={rootRef} className="relative">
      <div className="absolute -right-6 top-6 h-32 w-32 rounded-full bg-primary/20 blur-[80px] drift-slow" />
      <div className="relative rounded-card border border-border/60 bg-card p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Chat clínico · Paciente J.M.S.</span>
          <span className="inline-flex items-center gap-2 text-primary">
            <Brain className="h-3.5 w-3.5" />
            IA
          </span>
        </div>

        <div className="mt-6 min-h-[240px] space-y-4">
          <AnimatePresence>
            {showUser && (
              <motion.div
                key="user"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary/10 p-4 text-sm"
              >
                {USER_MESSAGE}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border/60 bg-surface px-4 py-3"
              >
                <TypingDot delay={0} />
                <TypingDot delay={0.15} />
                <TypingDot delay={0.3} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showAiBubble && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mr-auto max-w-[92%] rounded-2xl rounded-tl-md border border-border/60 bg-surface p-4 text-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  MedWiser IA
                </p>
                <p className="mt-2 text-foreground/90">
                  {shownText}
                  {phase === "ai-words" && visibleWords < totalWords && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 bg-primary/80 align-middle animate-pulse" />
                  )}
                </p>
                <AnimatePresence>
                  {showContext && (
                    <motion.p
                      key="context"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE_OUT }}
                      className="mt-3 text-xs text-muted-foreground"
                    >
                      {AI_CONTEXT}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-muted"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{
        duration: 0.9,
        ease: "easeInOut",
        repeat: Infinity,
        delay,
      }}
    />
  );
}
