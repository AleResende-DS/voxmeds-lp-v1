"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Planos", href: "#planos" },
  { label: "FAQ", href: "#faq" },
];

const loginUrl = "https://app.voxmeds.com/login";
const registerUrl = "https://app.voxmeds.com/register";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <header className="sticky top-0 z-50">
      <div
        className={`backdrop-blur-sm transition-colors duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-white/[0.01] shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]"
            : "border-b border-transparent bg-white/10"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="tap-target inline-flex items-center">
            <span className="relative h-[56px] w-[56px] overflow-hidden sm:h-[60px] sm:w-[60px]">
              <Image
                src="/logo-light.svg"
                alt="VoxMeds"
                fill
                sizes="(max-width: 640px) 56px, 60px"
                priority
                className="object-contain scale-[1.25]"
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] text-muted md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={loginUrl}
              className="text-[13px] text-muted transition hover:text-foreground"
            >
              Entrar
            </Link>
            <Link
              href={registerUrl}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-white shadow-[0_10px_30px_-20px_rgba(13,148,136,0.8)] transition hover:bg-primary-dark"
            >
              Começar grátis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            type="button"
            className="tap-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-foreground md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-[1px] md:hidden"
            onClick={closeMenu}
          />
          <div
            id="mobile-nav"
            className="relative z-50 border-b border-border/60 bg-white/95 px-4 py-4 shadow-lg md:hidden sm:px-6"
          >
            <div className="flex flex-col gap-1 text-sm">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="tap-target flex items-center rounded-xl px-2 text-muted transition hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <Link
                  href={loginUrl}
                  onClick={closeMenu}
                  className="tap-target inline-flex items-center rounded-xl px-2 text-muted transition hover:bg-surface hover:text-foreground"
                >
                  Entrar
                </Link>
                <Link
                  href={registerUrl}
                  onClick={closeMenu}
                  className="tap-target inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white"
                >
                  Começar grátis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
