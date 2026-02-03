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

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`backdrop-blur-sm transition-colors duration-300 ${
          scrolled
            ? "border-b border-border/60 bg-white/[0.01] shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]"
            : "border-b border-transparent bg-white/10"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-light.svg"
              alt="VoxMeds"
              width={84}
              height={18}
              priority
            />
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
            className="inline-flex items-center justify-center rounded-full border border-border/60 p-1.5 text-foreground md:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-border/60 bg-white/95 px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-muted transition hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <Link href={loginUrl} className="text-muted">
                Entrar
              </Link>
              <Link
                href={registerUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-white"
              >
                Começar grátis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
