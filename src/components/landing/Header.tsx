"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { trackLeadEvent } from "@/lib/tracking";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Como ajuda", href: "#copiloto" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

const loginUrl = "https://portal.medwiser.app/login";
const registerUrl = "https://portal.medwiser.app/register";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [forceDark, setForceDark] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Force dark mode on header while it overlaps a [data-dark-header] section
  useEffect(() => {
    const targets = document.querySelectorAll("[data-dark-header]");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const any = entries.some((e) => e.isIntersecting);
        setForceDark(any);
      },
      { rootMargin: "0px 0px -95% 0px", threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`sticky top-0 z-50${forceDark ? " dark" : ""}`}>
      <div
        className={`backdrop-blur-sm transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          scrolled
            ? "border-b border-border/60 bg-background/70 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]"
            : "border-b border-transparent bg-background/30"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="tap-target press inline-flex items-center"
          >
            <span className="relative h-[56px] w-[56px] overflow-hidden sm:h-[60px] sm:w-[60px]">
              <Image
                src="/logo-light.svg"
                alt="MedWiser"
                fill
                sizes="(max-width: 640px) 56px, 60px"
                priority
                className="object-contain scale-[1.25] dark:hidden"
              />
              <Image
                src="/logo-footer.svg"
                alt="MedWiser"
                fill
                sizes="(max-width: 640px) 56px, 60px"
                className="hidden object-contain scale-[1.25] dark:block"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] text-muted-foreground md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={loginUrl}
              className="text-[13px] text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
            >
              Entrar
            </Link>
            <ThemeToggle />
            <Link
              href={registerUrl}
              onClick={trackLeadEvent}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-white shadow-[0_10px_30px_-20px_rgba(13,148,136,0.8)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
            >
              Testar grátis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="tap-target press inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted"
              aria-label="Abrir menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="mobile-backdrop"
              type="button"
              aria-label="Fechar menu"
              className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-[1px] md:hidden"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
            />
            <motion.div
              key="mobile-nav"
              id="mobile-nav"
              className="relative z-50 overflow-hidden border-b border-border/60 bg-background/95 px-4 shadow-lg md:hidden sm:px-6"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, height: 0 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, height: "auto" }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, height: 0 }
              }
              transition={{
                duration: 0.22,
                ease: EASE_OUT,
              }}
            >
              <div className="flex flex-col gap-1 py-4 text-sm">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="tap-target press flex items-center rounded-xl px-2 text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-3">
                  <Link
                    href={loginUrl}
                    onClick={closeMenu}
                    className="tap-target press inline-flex items-center rounded-xl px-2 text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted hover:text-foreground"
                  >
                    Entrar
                  </Link>
                  <Link
                    href={registerUrl}
                    onClick={() => {
                      trackLeadEvent();
                      closeMenu();
                    }}
                    className="tap-target press inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white shadow-[0_10px_30px_-20px_rgba(13,148,136,0.8)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
                  >
                    Começar grátis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
