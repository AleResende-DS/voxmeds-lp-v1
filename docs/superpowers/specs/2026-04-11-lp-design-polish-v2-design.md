# MedWiser LP — Design Polish V2

**Date:** 2026-04-11
**Scope:** Landing page updates based on frontend-design, animation, and conversion review.

---

## 1. Security & Privacy Section (NEW)

**Position:** Between Testimonials and Pricing.
**Layout:** Dark section (uses `.dark` class like BeliefBreak). Three horizontally-aligned cards with icons.

**Content:**
| Icon | Title | Description |
|------|-------|-------------|
| Shield/Lock | Conformidade LGPD | Seus dados e os dos seus pacientes protegidos de acordo com a Lei Geral de Proteção de Dados. |
| Lock/Encryption | Criptografia ponta a ponta | Toda comunicação entre você e a MedWiser é criptografada de ponta a ponta. |
| MicOff/AudioOff | Áudio nunca é salvo | O áudio da consulta é processado em tempo real e descartado imediatamente. Nenhuma gravação é armazenada. |

**Visual treatment:** Centered heading "Segurança que você pode confiar", muted noise background, subtle primary orb. Cards use `bg-card` with border, icon in a rounded container with `bg-primary/10`.

**Files:** New component `src/components/landing/SecuritySection.tsx`. Add to `src/app/page.tsx` between `<TestimonialsSection />` and `<PricingSection />`.

---

## 2. SocialProofBar Updates

**Remove:** The "+20 médicos testando a MedWiser" stat entirely.
**Update:** Change the hours stat from `{ value: 2, suffix: "h", label: "economizadas em média por dia" }` to `{ value: 400, suffix: "h", format: "integer", label: "economizadas por ano" }`.
**Result:** 3 stats remain: +1.500 consultas documentadas, +400h economizadas por ano, 4.9/5 satisfação.

**File:** `src/components/landing/SocialProofBar.tsx` — modify the `stats` array.

---

## 3. Testimonials Restructure

**Current:** 2x2 uniform card grid, 4 testimonials.
**New layout:**
- **Featured testimonial (Dr. Rafael):** Full-width card, larger text, prominent photo area, highlighted border (`border-primary/40 ring-1 ring-primary/15`). Quote displayed at a larger font size (`text-lg`).
- **Secondary testimonials (Dra. Camila, Dra. Mariana, Dr. Eduardo):** Compact row below. Each shows name, role, city, and a shortened one-line quote. Displayed in a 3-column grid on desktop, stacked on mobile.

**File:** `src/components/landing/TestimonialsSection.tsx` — restructure the render logic. No data changes, just layout.

---

## 4. Feature Cards Overhaul

### New order and content:

| # | Tag | Title | Description | Image | Layout |
|---|-----|-------|-------------|-------|--------|
| 1 | Alertas inteligentes | A IA não deixa nada passar | Alertas automáticos em exames e documentos. Dosagem perigosa, interação medicamentosa, sugestão de exames complementares — a IA sinaliza antes que algo escape. | Real screenshot (`Captura de Tela 2026-04-11...png`, converted to webp, placed in `public/landing/screenshots/`) | **Full-width**, badge "Exclusivo" |
| 2 | Apps mobile | MedWiser no seu bolso | Apps nativos para iOS e Android. Grave e atenda do celular — tudo sincronizado. Ideal para quem não trabalha com notebook ou atende na rede pública. | Real screenshot (`Simulator Screenshot...png`, converted to webp) | **Full-width**, badge "Disponível" |
| 3 | Chat clínico | Seu copiloto em cada consulta | Converse com uma IA que conhece o histórico completo do paciente. Tire dúvidas, valide condutas e consulte referências em segundos. | *No image* | 2-col grid, badge "Exclusivo" |
| 4 | Análise por IA | Upload inteligente de exames | Envie PDF ou utilize o app para enviar fotos dos exames e documentos que o paciente levou impresso para a consulta. A IA lê, interpreta e integra ao prontuário. Você só revisa, dá a palavra final e assina. | *No image* | 2-col grid |
| 5 | Prontuário | Prontuário completo e organizado | Histórico de consultas, documentos, exames e evolução do paciente em um só lugar — tudo mantido atualizado automaticamente pela IA. | *No image* | 2-col grid |
| 6 | Transcrição com IA | IA que documenta por você | Grave a consulta. A IA transcreve, gera anamnese, SOAP e documentos em segundos. Você só revisa. | *No image* | 2-col grid |

### Layout structure:
- Cards 1-2: Full-width, each with screenshot on the right side (or below on mobile). Larger padding, more prominent.
- Cards 3-6: Standard 2-column grid, text-only (no image container). More compact.

### Image processing:
- Copy the two screenshots into `public/landing/screenshots/` as `alertas-clinicos.webp` and `mobile-app-recording.webp` (convert from PNG to webp for performance).
- Remove old unused screenshot references from the features array.

**File:** `src/app/page.tsx` — update the `features` array and the render logic in the features section to differentiate full-width vs grid cards.

---

## 5. ConsultationStory Improvements

### A. Reduce scroll height
- Change from `h-[450vh] lg:h-[540vh]` to `h-[340vh] lg:h-[420vh]`.
- Tighten the scroll ranges for each beat proportionally so beats advance faster.

### B. Clickable progress dots
- Make each dot a `<button>` element.
- On click, use `scrollTo` to scroll the page to the corresponding beat's scroll position within the section.
- Add `cursor-pointer` and hover state (`opacity-100` on hover).
- Proper `aria-label` for each dot (e.g., "Ir para etapa 3 — A IA transcreve").

### C. Skip link
- Add a "Pular para o resultado" text link below the progress dots (or below the headline area on mobile).
- Clicking it scrolls to beat 8 (the "Consulta documentada" summary).
- Style: small text, `text-primary` with underline on hover.

**File:** `src/components/landing/ConsultationStory.tsx` — modify `ProgressDots`, adjust scroll ranges, add skip link.

---

## 6. CopilotChat Enhancements

### A. New conversation examples (4 total, cycling infinitely)

1. **Current:** Drug substitution question (losartana → valsartana). Keep as-is.
2. **New — Patient exam info:** User asks "Quais foram os últimos resultados de hemograma da paciente?" → AI responds with summary of recent lab values from patient history.
3. **New — Drug interaction:** User asks "Posso prescrever ibuprofeno junto com a varfarina?" → AI warns about interaction risk and suggests alternatives.
4. **New — Clinical guidance:** User asks "Paciente com DM2 e ClCr de 35. Posso manter metformina?" → AI responds about renal adjustment.

### B. Cycle logic
- Each conversation plays its full animation cycle, then transitions to the next.
- After all 4 play, loop back to the first.
- Transition between conversations: brief fade-out (200ms) → clear → fade-in next user message.

### C. Purple AI identity
- AI bubble background: subtle violet gradient (`from-violet-500/5 via-purple-500/8 to-violet-600/10`).
- AI bubble shadow: `shadow-[0_8px_32px_-8px_rgba(139,92,246,0.15)]`.
- AI bubble top border: `border-t border-violet-400/20`.
- "MedWiser IA" label: `text-violet-400` with `Sparkles` icon in violet.
- User bubble stays `bg-primary/10` (teal) — clear teal=you, purple=AI distinction.

**File:** `src/components/landing/CopilotChat.tsx` — add conversation data, update cycle logic, update AI bubble styles.

---

## 7. Lead Capture Popup

### Trigger
- 25-second timer starts on page load.
- Timer resets/cancels if user clicks any CTA (LeadLink) before 25s. Use a simple `window.__leadClicked = true` flag set by `trackLeadEvent()` in `src/lib/tracking.ts` — the popup checks this flag before showing.
- If no CTA clicked after 25s, show popup.
- Store a flag in `sessionStorage` (`medwiser_popup_shown`) so the popup only shows once per session.

### Design
- Centered modal with backdrop blur overlay.
- Heading: "Quer conhecer a MedWiser?"
- Subtext: "Deixe seu nome e WhatsApp. Nós entramos em contato."
- Fields: Nome (text input), WhatsApp (tel input with +55 prefix).
- Submit button: "Quero saber mais" (primary style).
- Close button: X in top-right corner.
- On submit: fire a GTM/dataLayer event (`lead_capture_popup`) with the form data, then show a success state ("Pronto! Entraremos em contato.") and auto-close after 2s.

### Animation
- Backdrop: fade in 200ms.
- Modal: scale from 0.95 + opacity 0 → 1, using `ease-out` curve, 250ms.
- Exit: opacity 0 + scale 0.97, 180ms.

**File:** New component `src/components/landing/LeadCapturePopup.tsx`. Add to `src/app/page.tsx` (or layout). Needs to be a client component.

### Data handling
- Push to `dataLayer` for GTM to handle (same pattern as existing `trackLeadEvent`).
- No backend endpoint needed — GTM can forward to a webhook, Google Sheet, or CRM.

---

## 8. Remove Floating WhatsApp

- Delete `src/components/landing/FloatingWhatsApp.tsx`.
- Remove the `<FloatingWhatsApp />` usage from `src/app/page.tsx`.
- Remove the import.

---

## 9. Remove FAQ Subtitle

In the FAQ section of `src/app/page.tsx`, remove the `<p>` tag:
```
"Ainda ficou com dúvida? Fale com a gente no WhatsApp."
```

---

## 10. Mobile Hero Order Fix

In the hero section grid, the HeroLoopV2 currently has `order-1 lg:order-2` making it appear first on mobile.

**Fix:** The headline `<Reveal>` div is first in DOM order (correct). The `<Reveal delay={0.1} variant="fade-up-scale">` wrapping HeroLoopV2 currently has no explicit order class but the grid places it second naturally. The issue is the grid itself — on mobile it's a single column and the mockup visually dominates. Ensure no CSS order overrides exist, and verify that the headline div renders first in the single-column mobile layout. If the grid has any `order-*` utilities on children, remove them and rely on DOM order for mobile.

**File:** `src/app/page.tsx` — hero section grid.

---

## 11. SEO Title Update

**Current:** `"Prontuário Eletrônico com IA para Médicos | MedWiser"`
**New:** `"Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos"`

Also update `og:title` and `twitter:title` to match.

**File:** `src/app/layout.tsx` — metadata object.

---

## 12. Animation Polish (Engineering Fixes)

These are small improvements that don't change UX, just refine quality:

### A. TypingDot easing
In `CopilotChat.tsx`, change the TypingDot animation from `ease: "easeInOut"` to `ease: [0.77, 0, 0.175, 1]` (stronger custom curve).

### B. Hero badge shimmer
In `globals.css`, add `animation-iteration-count: 3` to the `.shimmer` class so it stops after 3 cycles instead of running forever.

### C. HeroLoopV2 AnimatePresence mode
Evaluate switching from `mode="wait"` to `mode="popLayout"` for smoother beat transitions. If the crossfade looks good, keep it; otherwise revert.

---

## Files Changed Summary

| File | Action |
|------|--------|
| `src/components/landing/SecuritySection.tsx` | **NEW** |
| `src/components/landing/LeadCapturePopup.tsx` | **NEW** |
| `src/components/landing/FloatingWhatsApp.tsx` | **DELETE** |
| `src/app/page.tsx` | Modify (section order, features array, hero order, FAQ subtitle, imports) |
| `src/app/layout.tsx` | Modify (SEO title) |
| `src/components/landing/SocialProofBar.tsx` | Modify (remove stat, update stat) |
| `src/components/landing/TestimonialsSection.tsx` | Modify (layout restructure) |
| `src/components/landing/CopilotChat.tsx` | Modify (new conversations, AI styling, cycle logic) |
| `src/components/landing/ConsultationStory.tsx` | Modify (scroll height, dot clicks, skip link) |
| `src/app/globals.css` | Modify (shimmer iteration) |
| `src/components/landing/HeroLoopV2.tsx` | Minor (AnimatePresence mode evaluation) |
| `public/landing/screenshots/alertas-clinicos.webp` | **NEW** (converted from screenshot) |
| `public/landing/screenshots/mobile-app-recording.webp` | **NEW** (converted from screenshot) |
