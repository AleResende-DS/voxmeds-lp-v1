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
  // Start with the first phrase so the server-rendered HTML contains the full
  // H1 text (critical for SEO) and there's no empty state flash on first paint.
  const [text, setText] = useState(phrases[0] ?? "");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [reduceMotion, startDelay]);

  useEffect(() => {
    if (reduceMotion || !started || phrases.length === 0) return;
    const current = phrases[index % phrases.length];

    if (!isDeleting && text === current) {
      const pauseTimer = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && text === "") {
      const resetTimer = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }, 0);
      return () => clearTimeout(resetTimer);
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
  const displayedText = reduceMotion ? (phrases[0] ?? "") : text;

  // Find the longest phrase to reserve its height and prevent layout jumps
  const longestPhrase = phrases.reduce((a, b) =>
    a.length >= b.length ? a : b,
    "",
  );

  return (
    <span
      className={`${className ?? ""} relative inline-grid max-w-full items-start justify-items-start align-top`}
      aria-hidden={reduceMotion ? undefined : true}
    >
      {/* Invisible spacer — reserves height of the longest phrase */}
      <span
        className="invisible col-start-1 row-start-1 min-w-0 whitespace-normal break-words"
        aria-hidden="true"
      >
        {longestPhrase}|
      </span>
      {/* Visible typed text */}
      <span className="col-start-1 row-start-1 min-w-0 whitespace-normal break-words">
        {displayedText}
        {!reduceMotion && (
          <span
            className={`type-cursor${cursorClassName ? ` ${cursorClassName}` : ""}`}
          >
            |
          </span>
        )}
      </span>
    </span>
  );
}
