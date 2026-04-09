"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackLeadEvent } from "@/lib/tracking";

const whatsappUrl =
  "https://wa.me/554499751916?text=Ol%C3%A1!%20Vim%20do%20site%20da%20MedWiser%20e%20gostaria%20de%20saber%20mais.";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackLeadEvent}
      aria-label="Fale com a gente no WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.5)] transition-[opacity,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.95] motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-[0_24px_48px_-12px_rgba(37,211,102,0.7)] sm:h-14 sm:w-14 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="relative z-10 h-6 w-6" />
      <span
        className="pointer-events-none absolute inset-0 rounded-full bg-[#25d366] pulse-ring"
        aria-hidden="true"
      />
    </a>
  );
}
