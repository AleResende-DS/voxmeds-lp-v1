"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterProps = {
  phrases: string[];
  className?: string;
  cursorClassName?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pause?: number;
  startDelay?: number;
};

export function Typewriter({
  phrases,
  className,
  cursorClassName,
  typeSpeed = 42,
  deleteSpeed = 28,
  pause = 1200,
  startDelay = 300,
}: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setText(phrases[0] ?? "");
      return;
    }

    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [reduceMotion, phrases, startDelay]);

  useEffect(() => {
    if (reduceMotion || !started || phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    if (!isDeleting && text === current) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const nextText = isDeleting
      ? current.slice(0, Math.max(0, text.length - 1))
      : current.slice(0, text.length + 1);

    const timer = setTimeout(
      () => setText(nextText),
      isDeleting ? deleteSpeed : typeSpeed,
    );
    return () => clearTimeout(timer);
  }, [
    reduceMotion,
    started,
    phrases,
    index,
    isDeleting,
    text,
    typeSpeed,
    deleteSpeed,
    pause,
  ]);

  if (phrases.length === 0) return null;

  return (
    <span className={className} aria-hidden={reduceMotion ? undefined : true}>
      {text}
      {!reduceMotion && (
        <span
          className={`type-cursor${cursorClassName ? ` ${cursorClassName}` : ""}`}
        >
          |
        </span>
      )}
    </span>
  );
}
