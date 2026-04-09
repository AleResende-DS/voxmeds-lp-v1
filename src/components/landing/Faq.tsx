"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";

const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

type FaqItem = {
  question: string;
  answer: string;
};

interface FaqProps {
  items: readonly FaqItem[];
}

export function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 grid gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <Reveal key={item.question} delay={index * 0.035}>
            <FaqRow
              question={item.question}
              answer={item.answer}
              isOpen={isOpen}
              onToggle={() => setOpenIndex(isOpen ? null : index)}
            />
          </Reveal>
        );
      })}
    </div>
  );
}

function FaqRow({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-card border bg-white p-5 shadow-card transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:p-6 ${
        isOpen ? "border-primary/30" : "border-border/60"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="tap-target press flex w-full cursor-pointer items-center justify-between gap-4 py-2 text-left text-sm font-semibold"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASE_DRAWER }}
          className="shrink-0 text-muted"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.28, ease: EASE_DRAWER },
              opacity: { duration: 0.22, ease: EASE_DRAWER },
            }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
