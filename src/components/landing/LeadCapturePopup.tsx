"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const DELAY_MS = 25_000;
const SESSION_KEY = "medwiser_popup_shown";

export function LeadCapturePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      if (window.__leadClicked) return;
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_capture_popup",
      lead_name: name.trim(),
      lead_phone: phone.trim(),
    });

    setSubmitted(true);
    setTimeout(() => setOpen(false), 2000);
  };

  const close = () => setOpen(false);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="popup-backdrop"
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            onClick={close}
          />
          <motion.div
            key="popup-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          >
            <motion.div
              className="relative w-full max-w-sm rounded-2xl border border-border/60 bg-card p-6 shadow-lg sm:p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="py-6 text-center">
                  <p className="text-lg font-semibold text-foreground">
                    Pronto!
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Entraremos em contato.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Quer conhecer a MedWiser?
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Deixe seu nome e WhatsApp. Nós entramos em contato.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="lead-name"
                        className="text-xs font-medium text-foreground/70"
                      >
                        Nome
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu nome"
                        className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lead-phone"
                        className="text-xs font-medium text-foreground/70"
                      >
                        WhatsApp
                      </label>
                      <div className="relative mt-1">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          +55
                        </span>
                        <input
                          id="lead-phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(00) 00000-0000"
                          className="w-full rounded-xl border border-border bg-background py-2.5 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="tap-target w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(15,118,110,0.5)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
                    >
                      Quero saber mais
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
