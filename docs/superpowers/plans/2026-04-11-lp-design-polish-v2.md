# LP Design Polish V2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 12 design, conversion, and animation improvements to the MedWiser landing page based on a comprehensive frontend/marketing review.

**Architecture:** All changes are to the existing Next.js 16 + Tailwind v4 + Framer Motion landing page. Two new components (SecuritySection, LeadCapturePopup), one deletion (FloatingWhatsApp), and modifications to 7 existing files. No backend changes. No new dependencies.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (OKLCH tokens), Framer Motion, Lucide icons, TypeScript.

**Spec:** `docs/superpowers/specs/2026-04-11-lp-design-polish-v2-design.md`

---

### Task 1: Quick wins — SocialProofBar, FAQ subtitle, SEO title, shimmer, WhatsApp removal

Small independent changes batched together for a fast first commit.

**Files:**
- Modify: `src/components/landing/SocialProofBar.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Delete: `src/components/landing/FloatingWhatsApp.tsx`

- [ ] **Step 1: Update SocialProofBar stats**

In `src/components/landing/SocialProofBar.tsx`, replace the `stats` array (lines 26-55) with:

```tsx
const stats: Stat[] = [
  {
    icon: FileText,
    value: 1500,
    prefix: "+",
    format: "thousands",
    label: "consultas documentadas por IA",
  },
  {
    icon: Clock,
    value: 400,
    prefix: "+",
    suffix: "h",
    format: "integer",
    label: "economizadas por ano",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    format: "decimal",
    label: "em satisfação dos médicos",
  },
];
```

Also remove the `Stethoscope` import from lucide-react (line 12) since it's no longer used.

Update the grid from `lg:grid-cols-4` to `lg:grid-cols-3` (line 114).

- [ ] **Step 2: Update FAQ subtitle in page.tsx**

In `src/app/page.tsx`, find the FAQ section (around line 573) and change:

```tsx
<p className="mt-4 text-muted-foreground">
  Ainda ficou com dúvida? Fale com a gente no WhatsApp.
</p>
```

To:

```tsx
<p className="mt-4 text-muted-foreground">
  Ainda ficou com dúvida?{" "}
  <strong className="font-semibold text-foreground">
    Teste por 7 dias sem compromisso.
  </strong>
</p>
```

- [ ] **Step 3: Update SEO title in layout.tsx**

In `src/app/layout.tsx`, change the metadata (lines 38-98):

```tsx
title: "Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos",
```

Also update openGraph.title (line 75):
```tsx
title: "Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos",
```

And twitter.title (line 93):
```tsx
title: "Prontuário com Transcrição por IA | MedWiser — Plataforma Agêntica para Médicos",
```

- [ ] **Step 4: Cap shimmer animation**

In `src/app/globals.css`, update the `.shimmer` class (around line 239) to add iteration count:

```css
.shimmer {
  background-image: linear-gradient(
    110deg,
    transparent 40%,
    oklch(var(--primary) / 0.08) 47%,
    oklch(var(--primary) / 0.14) 50%,
    oklch(var(--primary) / 0.08) 53%,
    transparent 60%
  );
  background-size: 250% 100%;
  background-position: -150% 0;
  animation: shimmer 4s var(--ease-in-out) 3;
}
```

Change `infinite` to `3` on the animation shorthand.

- [ ] **Step 5: Remove FloatingWhatsApp**

In `src/app/page.tsx`:
1. Remove the import line: `import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";`
2. Remove the `<FloatingWhatsApp />` component usage (line 709, just before closing `</div>`).

Delete the file `src/components/landing/FloatingWhatsApp.tsx`.

- [ ] **Step 6: Fix mobile hero order**

In `src/app/page.tsx`, the hero section grid (around line 222). The current grid:

```tsx
<div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:grid-cols-[0.95fr_1.05fr]">
```

The headline `<Reveal>` is first in DOM, the HeroLoopV2 `<Reveal>` is second. On mobile this is a single column, so headline is already first. Verify there are no `order-*` classes on the children. The current code has no order classes — headline renders first naturally. No code change needed here, just verify during visual check.

- [ ] **Step 7: Run dev server and verify**

Run: `npm run dev`

Check:
- SocialProofBar shows 3 stats (no "+20 médicos"), hours shows "+400h economizadas por ano"
- FAQ subtitle reads "Ainda ficou com dúvida? **Teste por 7 dias sem compromisso.**"
- Browser tab title is the new SEO title
- Shimmer on hero badge stops after 3 cycles
- No floating WhatsApp button
- Mobile: headline appears before mockup in hero

- [ ] **Step 8: Commit**

```bash
git add src/components/landing/SocialProofBar.tsx src/app/page.tsx src/app/layout.tsx src/app/globals.css
git rm src/components/landing/FloatingWhatsApp.tsx
git commit -m "feat: quick wins — social proof, FAQ, SEO title, shimmer cap, remove WhatsApp"
```

---

### Task 2: Feature cards overhaul — new order, content, and layout

**Files:**
- Modify: `src/app/page.tsx`
- Create: `public/landing/screenshots/alertas-clinicos.webp`
- Create: `public/landing/screenshots/mobile-app-recording.webp`

- [ ] **Step 1: Convert screenshots to webp**

```bash
# Install cwebp if not available
brew list webp &>/dev/null || brew install webp

# Convert the screenshots
cwebp -q 85 "Captura de Tela 2026-04-11 às 06.32.15.png" -o public/landing/screenshots/alertas-clinicos.webp
cwebp -q 85 "Simulator Screenshot - iPhone 17 Pro Max - 2026-04-11 at 06.43.54.png" -o public/landing/screenshots/mobile-app-recording.webp
```

- [ ] **Step 2: Update features array and types**

In `src/app/page.tsx`, replace the `Feature` type and `features` array (lines 75-146) with:

```tsx
type Feature = {
  title: string;
  description: string;
  image?: string;
  tag: string;
  badge?: string;
  alt?: string;
  imageClass?: string;
  imageWrapperClass?: string;
  featured?: boolean;
};

const features: Feature[] = [
  {
    title: "A IA não deixa nada passar",
    description:
      "Alertas automáticos em exames e documentos. Dosagem perigosa, interação medicamentosa, sugestão de exames complementares — a IA sinaliza antes que algo escape.",
    image: "/landing/screenshots/alertas-clinicos.webp",
    tag: "Alertas inteligentes",
    badge: "Exclusivo",
    alt: "Painel de alertas clínicos da IA sinalizando achados críticos, interações e dosagens perigosas",
    featured: true,
  },
  {
    title: "MedWiser no seu bolso",
    description:
      "Apps nativos para iOS e Android. Grave e atenda do celular — tudo sincronizado entre dispositivos. Ideal para quem não trabalha com notebook ou atende na rede pública.",
    image: "/landing/screenshots/mobile-app-recording.webp",
    tag: "Apps mobile",
    badge: "Disponível",
    alt: "Aplicativo MedWiser no celular mostrando gravação de consulta na interface mobile",
    imageClass: "object-contain",
    featured: true,
  },
  {
    title: "Seu copiloto em cada consulta",
    description:
      "Converse com uma IA que conhece o histórico completo do paciente. Tire dúvidas, valide condutas e consulte referências em segundos.",
    tag: "Chat clínico",
    badge: "Exclusivo",
  },
  {
    title: "Upload inteligente de exames",
    description:
      "Envie PDF ou utilize o app para enviar fotos dos exames e documentos que o paciente levou impresso para a consulta. A IA lê, interpreta e integra ao prontuário. Você só revisa, dá a palavra final e assina.",
    tag: "Análise por IA",
  },
  {
    title: "Prontuário completo e organizado",
    description:
      "Histórico de consultas, documentos, exames e evolução do paciente em um só lugar — tudo mantido atualizado automaticamente pela IA.",
    tag: "Prontuário",
  },
  {
    title: "IA que documenta por você",
    description:
      "Grave a consulta. A IA transcreve, gera anamnese, SOAP e documentos em segundos. Você só revisa.",
    tag: "Transcrição com IA",
  },
];
```

- [ ] **Step 3: Update feature cards render logic**

In `src/app/page.tsx`, replace the features rendering section (the `<RevealGroup>` with the features map, around lines 372-420) with:

```tsx
{/* Featured cards — full width */}
<RevealGroup
  className="mt-12 flex flex-col gap-6 sm:gap-8"
  stagger={0.07}
  delay={0.1}
>
  {features
    .filter((f) => f.featured)
    .map((feature) => (
      <RevealItem key={feature.title} variant="fade-up">
        <div className="hover-lift flex flex-col overflow-hidden rounded-card border border-border/60 bg-card shadow-card lg:flex-row">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:w-1/2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {feature.tag}
              </span>
              {feature.badge && (
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                  {feature.badge}
                </span>
              )}
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {feature.description}
            </p>
          </div>
          {feature.image && (
            <div className="border-t border-border/60 bg-surface p-4 lg:w-1/2 lg:border-l lg:border-t-0">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={feature.image}
                  alt={feature.alt ?? `${feature.title} — MedWiser`}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`h-auto w-full ${feature.imageClass ?? "object-cover"}`}
                />
              </div>
            </div>
          )}
        </div>
      </RevealItem>
    ))}
</RevealGroup>

{/* Standard cards — 2-column grid, no images */}
<RevealGroup
  className="mt-6 grid gap-6 sm:gap-8 lg:grid-cols-2"
  stagger={0.07}
  delay={0.1}
>
  {features
    .filter((f) => !f.featured)
    .map((feature) => (
      <RevealItem key={feature.title} variant="fade-up">
        <div className="hover-lift flex h-full flex-col rounded-card border border-border/60 bg-card p-5 shadow-card sm:p-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {feature.tag}
            </span>
            {feature.badge && (
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">
                {feature.badge}
              </span>
            )}
          </div>
          <h3 className="mt-4 font-display text-2xl font-semibold">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </RevealItem>
    ))}
</RevealGroup>
```

Also remove the unused imports that were only needed for old feature card images: `MonitorSmartphone` from lucide-react if no longer used elsewhere. Check other unused icon imports.

- [ ] **Step 4: Clean up old screenshot references**

Remove old screenshot files from `public/landing/screenshots/` that are no longer referenced by any feature card. Check which files were in the old features array (`consulta-vox.webp`, `analytics-vox.webp`, `historico-vox.webp`, `agenda-vox.webp`, `whatsapp-agent-iphone.webp`) and `public/landing/mockups/mobile-app.svg`. Only delete files not referenced elsewhere in the codebase (grep first).

- [ ] **Step 5: Verify visually**

Run dev server. Check:
- Alertas Inteligentes and Apps Mobile are full-width cards with real screenshots
- Remaining 4 cards are 2-column, text-only
- Order matches spec: Alertas > Apps > Chat > Análise > Prontuário > Transcrição
- Mobile: featured cards stack vertically, image below text
- Images load and display correctly

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx public/landing/screenshots/alertas-clinicos.webp public/landing/screenshots/mobile-app-recording.webp
# Only if deleting old screenshots:
# git rm public/landing/screenshots/old-file.webp
git commit -m "feat: feature cards overhaul — new order, content, featured layout with real screenshots"
```

---

### Task 3: Testimonials restructure — featured + compact layout

**Files:**
- Modify: `src/components/landing/TestimonialsSection.tsx`

- [ ] **Step 1: Restructure the render logic**

Replace the entire content of `src/components/landing/TestimonialsSection.tsx` with:

```tsx
import Image from "next/image";
import { Reveal } from "./Reveal";

type Testimonial = {
  id: string;
  quote: string;
  shortQuote: string;
  name: string;
  role: string;
  crm: string;
  city: string;
  image: string;
  highlight?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: "rafael",
    quote:
      "Terminei a residência ano passado e tinha um medo enorme de deixar algo importante passar em um laudo. Os alertas automáticos me dão uma segurança que eu não tinha. É quase como ter um R3 olhando meus exames junto comigo.",
    shortQuote:
      "Os alertas automáticos me dão uma segurança que eu não tinha.",
    name: "Dr. Rafael Nogueira",
    role: "Clínico Geral",
    crm: "CRM-PE 24587",
    city: "Recife · PE",
    image: "/landing/testimonials/dr-rafael.svg",
    highlight: true,
  },
  {
    id: "camila",
    quote:
      "Eu atendo 18 pacientes por dia e terminava o expediente digitando até às 23h. Hoje saio do consultório às 19h com tudo documentado.",
    shortQuote:
      "Hoje saio do consultório às 19h com tudo documentado.",
    name: "Dra. Camila Ferreira",
    role: "Pediatra",
    crm: "CRM-SP 178432",
    city: "São Paulo · SP",
    image: "/landing/testimonials/dra-camila.svg",
  },
  {
    id: "mariana",
    quote:
      "Já testei quase todos os sistemas do mercado. A MedWiser é a primeira que realmente entende como eu escrevo.",
    shortQuote:
      "A MedWiser é a primeira que realmente entende como eu escrevo.",
    name: "Dra. Mariana Costa",
    role: "Dermatologista",
    crm: "CRM-RS 38291",
    city: "Porto Alegre · RS",
    image: "/landing/testimonials/dra-mariana.svg",
  },
  {
    id: "eduardo",
    quote:
      "O chat com a IA durante a consulta mudou como eu trabalho. Quando bate uma dúvida, a resposta vem em segundos já levando em conta o histórico do paciente.",
    shortQuote:
      "A resposta vem em segundos já levando em conta o histórico do paciente.",
    name: "Dr. Eduardo Lima",
    role: "Cardiologista",
    crm: "CRM-MG 67104",
    city: "Belo Horizonte · MG",
    image: "/landing/testimonials/dr-eduardo.svg",
  },
];

const featured = testimonials.find((t) => t.highlight)!;
const secondary = testimonials.filter((t) => !t.highlight);

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="section relative overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-[360px] w-[360px] rounded-full bg-primary/5 blur-[120px] drift-slow" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Quem já usa
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
              Médicos que recuperaram suas noites
            </h2>
            <p className="mt-4 text-muted-foreground">
              Do recém-formado ao especialista com décadas de consultório —
              veja como a MedWiser está mudando a rotina clínica no Brasil.
            </p>
          </div>
        </Reveal>

        {/* Featured testimonial */}
        <Reveal delay={0.1}>
          <article className="mx-auto mt-12 max-w-3xl rounded-card border border-primary/40 bg-card p-8 shadow-card ring-1 ring-primary/15 sm:p-10">
            <div className="text-primary" aria-hidden="true">
              {"★".repeat(5)}
            </div>
            <blockquote className="mt-5 text-lg leading-relaxed text-foreground sm:text-xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-6">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border/60 bg-surface">
                <Image
                  src={featured.image}
                  alt={`Foto de ${featured.name}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">
                  {featured.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {featured.role} · {featured.city}
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/80">
                  {featured.crm}
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Secondary testimonials — compact */}
        <Reveal delay={0.2}>
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            {secondary.map((t) => (
              <div
                key={t.id}
                className="hover-lift rounded-card border border-border/60 bg-card p-5 shadow-card"
              >
                <div className="text-xs text-primary" aria-hidden="true">
                  {"★".repeat(5)}
                </div>
                <p className="mt-2 text-sm text-foreground/80">
                  &ldquo;{t.shortQuote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border/60 bg-surface">
                    <Image
                      src={t.image}
                      alt={`Foto de ${t.name}`}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {t.role} · {t.city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify visually**

Check:
- Dr. Rafael is featured large, full-width, with full quote
- 3 secondary testimonials below in a compact 3-column row
- Mobile: secondary cards stack vertically
- Hover-lift works on all cards

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/TestimonialsSection.tsx
git commit -m "feat: testimonials — featured card with compact secondary row"
```

---

### Task 4: Security & Privacy section

**Files:**
- Create: `src/components/landing/SecuritySection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create SecuritySection component**

Create `src/components/landing/SecuritySection.tsx`:

```tsx
import { MicOff, Lock, ShieldCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Conformidade LGPD",
    description:
      "Seus dados e os dos seus pacientes protegidos de acordo com a Lei Geral de Proteção de Dados.",
  },
  {
    icon: Lock,
    title: "Criptografia ponta a ponta",
    description:
      "Toda comunicação entre você e a MedWiser é criptografada de ponta a ponta.",
  },
  {
    icon: MicOff,
    title: "Áudio nunca é salvo",
    description:
      "O áudio da consulta é processado em tempo real e descartado imediatamente. Nenhuma gravação é armazenada.",
  },
];

export function SecuritySection() {
  return (
    <section className="dark section relative overflow-hidden bg-background py-14 text-foreground sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Segurança
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
              Segurança que você pode confiar
            </h2>
          </div>
        </Reveal>

        <RevealGroup
          className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3"
          stagger={0.08}
          delay={0.1}
        >
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <RevealItem key={item.title} variant="fade-up">
                <div className="hover-lift flex flex-col items-center rounded-card border border-border/60 bg-card p-6 text-center shadow-card">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add SecuritySection to page.tsx**

In `src/app/page.tsx`, add the import:

```tsx
import { SecuritySection } from "@/components/landing/SecuritySection";
```

Place `<SecuritySection />` between `<TestimonialsSection />` and `<PricingSection />` (around line 559):

```tsx
{/* TESTIMONIALS */}
<TestimonialsSection />

{/* SECURITY */}
<SecuritySection />

{/* PRICING */}
<PricingSection />
```

- [ ] **Step 3: Verify visually**

Check:
- Dark section appears between testimonials and pricing
- 3 cards with icons, centered, readable
- Noise background and orb visible
- Hover-lift works
- Mobile: cards stack vertically

- [ ] **Step 4: Commit**

```bash
git add src/components/landing/SecuritySection.tsx src/app/page.tsx
git commit -m "feat: add Security & Privacy section — LGPD, encryption, no audio storage"
```

---

### Task 5: ConsultationStory — faster beats, clickable dots, skip link

**Files:**
- Modify: `src/components/landing/ConsultationStory.tsx`

- [ ] **Step 1: Update scroll height and beat ranges**

In `src/components/landing/ConsultationStory.tsx`, change the section height (line 170):

```tsx
className="dark section relative bg-background text-foreground h-[340vh] lg:h-[420vh]"
```

Then update all beat opacity ranges and related transforms. The new ranges compress 9 beats into the same 0-1 progress but the section is shorter, so each beat passes faster. Keep the same proportional spacing:

```tsx
// 9 beats — tighter ranges for faster scrolling
const beat1 = useLayerOpacity(scrollYProgress, [0.00, 0.03, 0.09, 0.12]);
const beat2 = useLayerOpacity(scrollYProgress, [0.10, 0.13, 0.20, 0.23]);
const beat3 = useLayerOpacity(scrollYProgress, [0.21, 0.24, 0.31, 0.34]);
const beat4 = useLayerOpacity(scrollYProgress, [0.32, 0.35, 0.42, 0.45]);
const beat5 = useLayerOpacity(scrollYProgress, [0.43, 0.46, 0.53, 0.56]);
const beat6 = useLayerOpacity(scrollYProgress, [0.54, 0.57, 0.64, 0.67]);
const beat7 = useLayerOpacity(scrollYProgress, [0.65, 0.68, 0.75, 0.78]);
const beat8 = useLayerOpacity(scrollYProgress, [0.76, 0.80, 0.87, 0.90]);
const beat9 = useTransform(scrollYProgress, [0.88, 0.92, 1.0], [0, 1, 1]);
```

Note: The proportional ranges stay the same — the speedup comes entirely from the reduced section height (340vh vs 450vh = ~25% faster).

- [ ] **Step 2: Make ProgressDots clickable**

Replace the `ProgressDots` function (lines 626-650) with:

```tsx
function ProgressDots({
  index,
  total,
  sectionRef,
}: {
  index: MotionValue<number>;
  total: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const unsubscribe = index.on("change", (v) => {
      setCurrent(Math.max(0, Math.min(total - 1, Math.round(v))));
    });
    return unsubscribe;
  }, [index, total]);

  const scrollToBeat = (beatIndex: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.scrollHeight;
    // Each beat occupies ~1/total of the section
    const targetScroll = sectionTop + (beatIndex / total) * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const BEAT_LABELS = [
    "Você fala",
    "A IA escuta",
    "A IA transcreve",
    "A IA estrutura",
    "A IA analisa",
    "A IA alerta",
    "A IA atualiza",
    "Consulta documentada",
    "Você cuida de você",
  ];

  return (
    <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Ir para etapa ${i + 1} — ${BEAT_LABELS[i]}`}
          onClick={() => scrollToBeat(i)}
          className={`cursor-pointer rounded-full transition-[width,background-color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:opacity-100 ${
            i === current
              ? "h-1.5 w-6 bg-primary opacity-100"
              : "h-1.5 w-1.5 bg-foreground/25 opacity-60 hover:bg-foreground/50"
          }`}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Pass sectionRef to ProgressDots**

In the `ConsultationStory` component, update the `<ProgressDots>` usage (around line 191):

```tsx
<ProgressDots index={headlineIndex} total={HEADLINES.length} sectionRef={ref} />
```

- [ ] **Step 4: Add skip link**

In the `ConsultationStory` component, add a skip link below the "Role a página para ver →" text (around line 203):

```tsx
<p className="mt-8 hidden text-xs uppercase tracking-[0.2em] text-foreground/40 sm:block">
  Role a página para ver →
</p>
<button
  type="button"
  onClick={() => {
    const section = ref.current;
    if (!section) return;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.scrollHeight;
    // Jump to beat 8 (index 7, "Consulta documentada")
    const targetScroll = sectionTop + (7 / HEADLINES.length) * sectionHeight;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }}
  className="mt-3 hidden text-xs text-primary underline-offset-4 hover:underline sm:block"
>
  Pular para o resultado
</button>
```

- [ ] **Step 5: Verify visually**

Check:
- Scroll through the entire ConsultationStory — beats advance ~25% faster
- Clicking a progress dot scrolls to the corresponding beat
- Dots have hover state (more opaque)
- "Pular para o resultado" link jumps to beat 8
- All 9 beats still render correctly

- [ ] **Step 6: Commit**

```bash
git add src/components/landing/ConsultationStory.tsx
git commit -m "feat: consultation story — faster scroll, clickable dots, skip link"
```

---

### Task 6: CopilotChat — new conversations, purple AI identity, cycling

**Files:**
- Modify: `src/components/landing/CopilotChat.tsx`

- [ ] **Step 1: Replace CopilotChat with multi-conversation version**

Replace the entire content of `src/components/landing/CopilotChat.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Sparkles } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type Conversation = {
  userMessage: string;
  aiResponse: string[];
  aiContext: string;
};

const CONVERSATIONS: Conversation[] = [
  {
    userMessage:
      "Paciente hipertenso em uso de losartana 50mg, apresentou tosse seca persistente há 2 semanas. Posso trocar por qual?",
    aiResponse: [
      "A tosse seca com losartana é incomum (ela é BRA, não IECA). Vale",
      "investigar outras causas antes de trocar. Mas se for necessário",
      "substituir, as opções de mesma classe com boa tolerância seriam",
      "valsartana ou olmesartana.",
    ],
    aiContext:
      "Baseado no histórico: última consulta em 12/02 registrou PA 140/90 mmHg.",
  },
  {
    userMessage:
      "Quais foram os últimos resultados de hemograma da paciente?",
    aiResponse: [
      "Último hemograma (08/03/2026): Hemoglobina 11,8 g/dL,",
      "Hematócrito 35%, Leucócitos 6.200/mm³, Plaquetas 245.000/mm³.",
      "VCM 82 fL — valores dentro da normalidade.",
      "Hemograma anterior (15/12/2025) mostrava Hb 10,2 g/dL.",
    ],
    aiContext:
      "Nota: melhora de 1,6 g/dL na hemoglobina após suplementação de ferro iniciada em 20/12.",
  },
  {
    userMessage:
      "Posso prescrever ibuprofeno junto com a varfarina?",
    aiResponse: [
      "Interação de alto risco. AINEs como ibuprofeno aumentam",
      "significativamente o risco de sangramento GI quando combinados",
      "com varfarina. Alternativas mais seguras: paracetamol para dor",
      "leve/moderada, ou dipirona se não houver contraindicação.",
    ],
    aiContext:
      "Paciente em uso de varfarina 5mg/dia desde 03/2025. Último INR (01/03): 2,4.",
  },
  {
    userMessage:
      "Paciente com DM2 e ClCr de 35. Posso manter metformina?",
    aiResponse: [
      "Com ClCr de 35 mL/min (estágio 3b), a metformina deve ser",
      "reduzida para dose máxima de 1000mg/dia, com monitoramento",
      "frequente da função renal. Abaixo de 30 mL/min, a metformina",
      "é contraindicada. Considerar trocar para inibidor de SGLT2.",
    ],
    aiContext:
      "Última creatinina (05/03): 1,8 mg/dL. HbA1c 7,9% — controle subótimo.",
  },
];

type Phase = "idle" | "user" | "typing" | "ai-words" | "ai-context" | "pause";

export function CopilotChat() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4, once: false });
  const reduceMotion = useReducedMotion();

  const [convIndex, setConvIndex] = useState(0);
  const conversation = CONVERSATIONS[convIndex];
  const totalWords = conversation.aiResponse.join(" ").split(" ").length;

  const [phase, setPhase] = useState<Phase>(
    reduceMotion ? "ai-context" : "idle",
  );
  const [visibleWords, setVisibleWords] = useState(
    reduceMotion ? totalWords : 0,
  );

  useEffect(() => {
    if (reduceMotion) return;
    if (!inView) return;

    if (phase === "idle") {
      const t = setTimeout(() => setPhase("user"), 300);
      return () => clearTimeout(t);
    }

    if (phase === "user") {
      const t = setTimeout(() => setPhase("typing"), 900);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      const t = setTimeout(() => {
        setVisibleWords(0);
        setPhase("ai-words");
      }, 1200);
      return () => clearTimeout(t);
    }

    if (phase === "ai-words") {
      if (visibleWords < totalWords) {
        const t = setTimeout(() => setVisibleWords((n) => n + 1), 70);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("ai-context"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "ai-context") {
      const t = setTimeout(() => setPhase("pause"), 3500);
      return () => clearTimeout(t);
    }

    if (phase === "pause") {
      const t = setTimeout(() => {
        setConvIndex((i) => (i + 1) % CONVERSATIONS.length);
        setVisibleWords(0);
        setPhase("idle");
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [phase, visibleWords, inView, reduceMotion, totalWords]);

  // Reset word count when conversation changes
  useEffect(() => {
    if (phase === "idle") {
      setVisibleWords(0);
    }
  }, [convIndex, phase]);

  const allWords = conversation.aiResponse.join(" ").split(" ");
  const shownText = allWords.slice(0, visibleWords).join(" ");

  const showUser = phase !== "idle";
  const showTyping = phase === "typing";
  const showAiBubble =
    phase === "ai-words" || phase === "ai-context" || phase === "pause";
  const showContext = phase === "ai-context" || phase === "pause";

  return (
    <div ref={rootRef} className="relative">
      <div className="absolute -right-6 top-6 h-32 w-32 rounded-full bg-primary/20 blur-[80px] drift-slow" />
      <div className="relative rounded-card border border-border/60 bg-card p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Chat clínico · Paciente J.M.S.</span>
          <span className="inline-flex items-center gap-2 text-violet-400">
            <Sparkles className="h-3.5 w-3.5" />
            IA
          </span>
        </div>

        <div className="mt-6 min-h-[260px] space-y-4">
          <AnimatePresence mode="wait">
            {showUser && (
              <motion.div
                key={`user-${convIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-primary/10 p-4 text-sm"
              >
                {conversation.userMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-violet-400/20 bg-gradient-to-br from-violet-500/5 via-purple-500/8 to-violet-600/10 px-4 py-3 shadow-[0_8px_32px_-8px_rgba(139,92,246,0.15)]"
              >
                <TypingDot delay={0} />
                <TypingDot delay={0.15} />
                <TypingDot delay={0.3} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showAiBubble && (
              <motion.div
                key={`ai-${convIndex}`}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="mr-auto max-w-[92%] rounded-2xl rounded-tl-md border border-violet-400/20 bg-gradient-to-br from-violet-500/5 via-purple-500/8 to-violet-600/10 p-4 text-sm shadow-[0_8px_32px_-8px_rgba(139,92,246,0.15)]"
              >
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet-400">
                  <Sparkles className="h-3 w-3" />
                  MedWiser IA
                </p>
                <p className="mt-2 text-foreground/90">
                  {shownText}
                  {phase === "ai-words" && visibleWords < totalWords && (
                    <span className="ml-0.5 inline-block h-4 w-[2px] -mb-0.5 bg-violet-400/80 align-middle animate-pulse" />
                  )}
                </p>
                <AnimatePresence>
                  {showContext && (
                    <motion.p
                      key="context"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: EASE_OUT }}
                      className="mt-3 text-xs text-muted-foreground"
                    >
                      {conversation.aiContext}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1.5 w-1.5 rounded-full bg-violet-400/60"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{
        duration: 0.65,
        ease: [0.77, 0, 0.175, 1],
        repeat: Infinity,
        delay,
      }}
    />
  );
}
```

- [ ] **Step 2: Verify visually**

Check:
- Chat cycles through 4 different conversations infinitely
- AI bubbles have purple gradient background, subtle violet glow shadow
- "MedWiser IA" label is violet with sparkle icon
- User bubbles remain teal (`bg-primary/10`)
- Typing dots are violet-colored
- Cursor blink during AI typing is violet
- Transitions between conversations are smooth (fade out → fade in)
- Reduced motion: shows final state of first conversation statically

- [ ] **Step 3: Commit**

```bash
git add src/components/landing/CopilotChat.tsx
git commit -m "feat: copilot chat — 4 conversations, purple AI identity, infinite cycle"
```

---

### Task 7: Lead Capture Popup

**Files:**
- Create: `src/components/landing/LeadCapturePopup.tsx`
- Modify: `src/lib/tracking.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add lead click flag to tracking.ts**

In `src/lib/tracking.ts`, update the global declaration and function:

```tsx
const LEAD_EVENT_NAME = process.env.NEXT_PUBLIC_LEAD_EVENT_NAME ?? "lead";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __leadClicked?: boolean;
  }
}

export function trackLeadEvent(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.__leadClicked = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: LEAD_EVENT_NAME });
}
```

- [ ] **Step 2: Create LeadCapturePopup component**

Create `src/components/landing/LeadCapturePopup.tsx`:

```tsx
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
    // Don't show if already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      // Don't show if user already clicked a CTA
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
```

- [ ] **Step 3: Add LeadCapturePopup to page.tsx**

In `src/app/page.tsx`, add import and usage:

```tsx
import { LeadCapturePopup } from "@/components/landing/LeadCapturePopup";
```

Place `<LeadCapturePopup />` just before the closing `</div>` of the page (where `<FloatingWhatsApp />` used to be):

```tsx
      <LeadCapturePopup />
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Check:
- Wait 25 seconds on page — popup appears
- Fill in name and phone, submit — success message shows, auto-closes after 2s
- Close button works
- Clicking backdrop closes popup
- Refresh page — popup doesn't show again (sessionStorage)
- Click any CTA before 25s, then wait — popup should NOT appear
- Check browser console for `lead_capture_popup` event in dataLayer

- [ ] **Step 5: Commit**

```bash
git add src/components/landing/LeadCapturePopup.tsx src/lib/tracking.ts src/app/page.tsx
git commit -m "feat: lead capture popup — name + WhatsApp, 25s trigger, GTM event"
```

---

### Task 8: Animation polish — TypingDot easing, HeroLoopV2 mode

**Files:**
- Modify: `src/components/landing/HeroLoopV2.tsx`

- [ ] **Step 1: Evaluate HeroLoopV2 AnimatePresence mode**

In `src/components/landing/HeroLoopV2.tsx`, the main content area uses `<AnimatePresence mode="wait">` (around line 146). Try changing to `mode="popLayout"`:

```tsx
<AnimatePresence mode="popLayout">
```

Run the dev server and watch the beat transitions. If the crossfade looks good (no layout jumps, smooth overlap), keep it. If there are visual glitches (overlapping content, layout shift), revert to `mode="wait"`.

- [ ] **Step 2: Verify and commit**

```bash
git add src/components/landing/HeroLoopV2.tsx
git commit -m "polish: evaluate HeroLoopV2 AnimatePresence mode for smoother transitions"
```

If reverted, amend the commit message to note that `mode="wait"` was kept.

---

### Task 9: Final cleanup and verification

**Files:**
- Modify: `src/app/page.tsx` (cleanup unused imports)

- [ ] **Step 1: Remove unused imports from page.tsx**

Check `src/app/page.tsx` for any lucide-react icons that are no longer used after the features overhaul. The old features referenced images but the icons in the pain points section should still be used. Verify each import is still referenced.

Remove any unused imports (e.g., `MonitorSmartphone` was used in painPoints and should be kept; check others).

- [ ] **Step 2: Clean up source screenshots**

Remove the raw screenshot files from the repo root (they've been converted to webp in `public/landing/screenshots/`):

```bash
rm "Captura de Tela 2026-04-11 às 06.32.15.png"
rm "Simulator Screenshot - iPhone 17 Pro Max - 2026-04-11 at 06.43.54.png"
```

- [ ] **Step 3: Full page walkthrough**

Run dev server and scroll through the entire page, checking:

1. Header — logo, nav links, CTA button
2. Hero — headline first on mobile, typewriter, shimmer stops after 3 cycles
3. SocialProofBar — 3 stats, animated count-up
4. Pain points — 6 cards in grid
5. BeliefBreak — mouse-tracking orb
6. ConsultationStory — faster beats, clickable dots, skip link
7. Features — 2 featured full-width + 4 compact grid
8. Copilot section — 4 cycling conversations, purple AI bubbles
9. Testimonials — 1 featured + 3 compact
10. Security — 3 cards, dark section
11. Pricing — toggle, price animation
12. FAQ — updated subtitle
13. Footer — CTA, links
14. Lead popup — appears at 25s

- [ ] **Step 4: Commit cleanup**

```bash
git add -A
git commit -m "chore: cleanup unused imports and source screenshots"
```
