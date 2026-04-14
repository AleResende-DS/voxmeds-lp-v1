"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Conversation = {
  userMessage: string;
  aiResponse: string[];
  aiContext: string;
};

const CONVERSATIONS: Conversation[] = [
  {
    userMessage:
      "Paciente hipertenso em uso de losartana 50mg, apresentou tosse seca persistente há 2 semanas. Posso trocar por qual?",
    aiResponse: [
      "A tosse seca com losartana é incomum (ela é BRA, não IECA). Vale",
      "investigar outras causas antes de trocar. Mas se for necessário",
      "substituir, as opções de mesma classe com boa tolerância seriam",
      "valsartana ou olmesartana.",
    ],
    aiContext:
      "Baseado no histórico: última consulta em 12/02 registrou PA 140/90 mmHg.",
  },
  {
    userMessage:
      "Quais foram os últimos resultados de hemograma da paciente?",
    aiResponse: [
      "Último hemograma (08/03/2026): Hemoglobina 11,8 g/dL,",
      "Hematócrito 35%, Leucócitos 6.200/mm³, Plaquetas 245.000/mm³.",
      "VCM 82 fL — valores dentro da normalidade.",
      "Hemograma anterior (15/12/2025) mostrava Hb 10,2 g/dL.",
    ],
    aiContext:
      "Nota: melhora de 1,6 g/dL na hemoglobina após suplementação de ferro iniciada em 20/12.",
  },
  {
    userMessage:
      "Posso prescrever ibuprofeno junto com a varfarina?",
    aiResponse: [
      "Interação de alto risco. AINEs como ibuprofeno aumentam",
      "significativamente o risco de sangramento GI quando combinados",
      "com varfarina. Alternativas mais seguras: paracetamol para dor",
      "leve/moderada, ou dipirona se não houver contraindicação.",
    ],
    aiContext:
      "Paciente em uso de varfarina 5mg/dia desde 03/2025. Último INR (01/03): 2,4.",
  },
  {
    userMessage:
      "Paciente com DM2 e ClCr de 35. Posso manter metformina?",
    aiResponse: [
      "Com ClCr de 35 mL/min (estágio 3b), a metformina deve ser",
      "reduzida para dose máxima de 1000mg/dia, com monitoramento",
      "frequente da função renal. Abaixo de 30 mL/min, a metformina",
      "é contraindicada. Considerar trocar para inibidor de SGLT2.",
    ],
    aiContext:
      "Última creatinina (05/03): 1,8 mg/dL. HbA1c 7,9% — controle subótimo.",
  },
];

type Phase = "idle" | "user" | "typing" | "ai-words" | "ai-context" | "pause";

export function CopilotChat() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4, once: false });
  const reduceMotion = useReducedMotion();

  const [convIndex, setConvIndex] = useState(0);
  const conversation = CONVERSATIONS[convIndex];
  const totalWords = conversation.aiResponse.join(" ").split(" ").length;

  const [phase, setPhase] = useState<Phase>(
    reduceMotion ? "ai-context" : "idle",
  );
  const [visibleWords, setVisibleWords] = useState(
    reduceMotion ? totalWords : 0,
  );

  useEffect(() => {
    if (reduceMotion) return;
    if (!inView) return;

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
        setConvIndex((i) => (i + 1) % CONVERSATIONS.length);
        setVisibleWords(0);
        setPhase("idle");
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, visibleWords, inView, reduceMotion, totalWords]);

  const allWords = conversation.aiResponse.join(" ").split(" ");
  const shownText = allWords.slice(0, visibleWords).join(" ");

  const showUser = phase !== "idle";
  const showTyping = phase === "typing";
  const showAiBubble =
    phase === "ai-words" || phase === "ai-context" || phase === "pause";
  const showContext = phase === "ai-context" || phase === "pause";

  return (
    <div ref={rootRef} className="relative">
      <div className="absolute -right-6 top-6 h-32 w-32 rounded-full bg-primary/20 blur-[80px] drift-slow" />
      <div className="relative rounded-card border border-border/60 bg-card p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Chat clínico · Paciente J.M.S.</span>
          <span className="inline-flex items-center gap-2 text-violet-400">
            <Sparkles className="h-3.5 w-3.5" />
            IA
          </span>
        </div>

        <div className="mt-6 min-h-[260px] space-y-4">
          <AnimatePresence mode="wait">
            {showUser && (
              <motion.div
                key={`user-${convIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary/10 p-4 text-sm"
              >
                {conversation.userMessage}
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
                className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-violet-400/20 bg-gradient-to-br from-violet-500/5 via-purple-500/8 to-violet-600/10 px-4 py-3 shadow-[0_8px_32px_-8px_rgba(139,92,246,0.15)]"
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
                key={`ai-${convIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mr-auto max-w-[92%] rounded-2xl rounded-tl-md border border-violet-400/20 bg-gradient-to-br from-violet-500/5 via-purple-500/8 to-violet-600/10 p-4 text-sm shadow-[0_8px_32px_-8px_rgba(139,92,246,0.15)]"
              >
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
                  <Sparkles className="h-3 w-3" />
                  MedWiser IA
                </p>
                <p className="mt-2 text-foreground/90">
                  {shownText}
                  {phase === "ai-words" && visibleWords < totalWords && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 bg-violet-400/80 align-middle animate-pulse" />
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
                      {conversation.aiContext}
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
      className="h-1.5 w-1.5 rounded-full bg-violet-400/60"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{
        duration: 0.65,
        ease: [0.77, 0, 0.175, 1],
        repeat: Infinity,
        delay,
      }}
    />
  );
}
