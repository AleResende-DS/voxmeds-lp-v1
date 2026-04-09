"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackLeadEvent } from "@/lib/tracking";

const whatsappUrl = "https://wa.me/554499751916?text=Ol%C3%A1!%20Vim%20do%20site%20da%20MedWiser%20e%20gostaria%20de%20saber%20mais.";

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
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.5)] transition-all duration-500 hover:scale-110 hover:shadow-[0_24px_48px_-12px_rgba(37,211,102,0.7)] sm:h-16 sm:w-16 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25d366] opacity-40 motion-safe:animate-ping" />
    </a>
  );
}
