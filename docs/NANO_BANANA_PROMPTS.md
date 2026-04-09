# Prompts para Nano Banana (Gemini 2.5 Flash Image)

Guia de geração de imagens e vídeos para a nova landing page MedWiser.

**Direção visual:** Combinação de "Cinematic Tech" (Hero, dark accents, moderno) + "Editorial Médico Brasileiro" (depoimentos, fotos realistas) + "Calm Productivity" (seções emocionais).

**Paleta:**
- Primary teal: `#0f766e`
- Accent: `#14b8a6`
- Dark surface: `#0b1514`
- Warm neutral: `#f5f0e8`

**Regras gerais:**
- Sempre mencionar "Brazilian doctor", "hospital in Brazil" para garantir identidade local
- Diversidade étnica real do Brasil (não "americano latino")
- Evitar clichês de stock photography
- Sempre pedir "shot on medium format film camera" ou "cinematic still" para qualidade editorial
- Para vídeos: pedir "cinematic, 24fps, shallow depth of field"

---

## 1. Hero — Vídeo cinematográfico de fundo (prioridade máxima)

### Prompt 1.1 — Vídeo hero principal
```
A cinematic slow-motion shot of a Brazilian doctor in a modern, minimalist
consultation room, softly backlit by warm natural window light. Mid-30s,
professional medical attire (white coat over light shirt), relaxed and
focused expression. Looking at the patient (out of frame) and smiling gently
while speaking — NOT typing or looking at screen. Warm color grade with
subtle teal shadows. Shallow depth of field, bokeh background. Medium format
film aesthetic. 24fps, 8 seconds loop-ready. Mood: calm, confident, present.
Style reference: Apple iPhone commercials, Stripe product films.
```
**Uso:** Vídeo de fundo do Hero (substituir `hero-loop-v2.mp4`)
**Especificação:** 1920x1080, MP4, ~8s loop, sem áudio

### Prompt 1.2 — Alternativa estática para poster
```
Cinematic portrait of a Brazilian woman doctor in her 30s, wearing a clean
white lab coat, standing in a bright modern clinic with soft morning light
filtering through large windows. She's looking slightly off-camera with a
warm, confident smile — not posed. Background: out-of-focus modern consultation
room with plants and soft teal accents. Shot on medium format film, natural
grain. Editorial magazine aesthetic. Warm tones, shadows with slight teal tint.
```
**Uso:** Poster image do vídeo, fallback estático
**Especificação:** 1920x1080, WebP

---

## 2. Problem section — Fotos editoriais emocionais

### Prompt 2.1 — Médico exausto (tom emocional, NÃO dramático)
```
Editorial photograph: Brazilian male doctor in his late 30s, sitting alone
at a cluttered desk in a dimly lit office late at night. Stacks of patient
charts and an open laptop. He's rubbing his temples, looking tired but not
theatrical — realistic exhaustion. Warm tungsten desk lamp creates moody
low-key lighting. Muted color palette, slight desaturation. Shot on 35mm film,
natural grain, documentary style. Mood: quiet frustration, not despair.
Reference: photojournalism, New York Times Sunday Magazine.
```
**Uso:** Background ou ilustração da seção Problem
**Especificação:** 1600x1200, WebP

### Prompt 2.2 — Recém-formado inseguro
```
Editorial photograph: young Brazilian doctor in her late 20s, wearing a
white coat, standing alone in an empty hospital corridor at night. She's
holding a tablet, looking at it with a concerned, thoughtful expression —
not scared, just contemplative. Cool blue-green hospital lighting with one
warm practical light in the distance. Cinematic, moody, realistic. Shot on
medium format. Mood: doubt, weight of responsibility, but also resolve.
Reference: Grey's Anatomy cinematography, but more realistic.
```
**Uso:** Card específico do recém-formado na seção Problem
**Especificação:** 1200x1200, WebP

---

## 3. Solution section — Produto + humano

### Prompt 3.1 — Médico com smartphone MedWiser
```
Close-up editorial shot: Brazilian doctor's hands holding a modern smartphone
displaying a clean medical app interface (abstract, not readable text). Warm
natural window light from the side. Sleeve of white lab coat visible. Soft
out-of-focus consultation room in background with teal accent. Shot on medium
format. Warm, inviting, professional. Mood: effortless technology, confidence.
```
**Uso:** Seção Solution ou Features — mobile
**Especificação:** 1200x1500, WebP

### Prompt 3.2 — Consulta humana (médico + paciente, sem tela)
```
Editorial photograph: Brazilian doctor (40s, neutral gender) leaning forward,
engaged in conversation with an elderly patient. They're making eye contact,
the doctor is listening attentively with both hands visible — NO computer,
NO clipboard, NO phone. Soft natural light from large window. Modern minimalist
consultation room with warm neutrals and one teal accent (chair, painting,
etc). Shot on medium format film. Documentary style. Mood: presence, trust,
old-school medicine meets modern calm.
```
**Uso:** Hero alternativo OU seção "Nunca sozinho" OU depoimentos
**Especificação:** 1600x1200, WebP

---

## 4. Depoimentos — 4 retratos editoriais

Estilo unificado: meio busto, fundo neutro desfocado, luz natural suave, filme médio formato, cara de editorial de revista médica brasileira (não stock photo).

### Prompt 4.1 — Dra. Camila (Pediatra, 34 anos, São Paulo)
```
Editorial portrait photograph: Brazilian woman in her mid-30s, short dark
wavy hair, wearing a white lab coat over a soft blue shirt. Warm skin tone,
subtle smile, looking directly at camera with confidence but warmth. Shot
against a soft out-of-focus modern clinic background with warm neutral tones.
Natural window light from left. Shot on Hasselblad medium format, realistic
skin texture with natural imperfections, NO smoothing. Documentary portrait
style, like a New Yorker profile shot. Absolutely not AI-looking.
```

### Prompt 4.2 — Dr. Rafael (Clínico geral recém-formado, 27 anos, Recife)
```
Editorial portrait photograph: young Brazilian man, late 20s, light brown
skin, short curly hair, wearing a white lab coat over a simple t-shirt.
Slight beard stubble, thoughtful and kind expression, small smile. Shot
against warm out-of-focus hospital corridor background. Soft natural
window light. Shot on medium format film, natural grain, realistic skin
with texture and slight imperfections. Documentary style. Authentic, real,
not polished. Not AI-looking. Reference: NYT obituaries portraits.
```

### Prompt 4.3 — Dra. Mariana (Dermatologista, 42 anos, Porto Alegre)
```
Editorial portrait photograph: Brazilian woman in her early 40s, straight
dark brown hair with subtle gray strands, reading glasses pushed up on her
head, wearing a tailored white lab coat. Confident, slightly serious
expression with small knowing smile. Shot against soft out-of-focus modern
office background with plants. Natural window light. Medium format film
aesthetic, realistic skin with natural lines and texture around the eyes.
Documentary editorial style, NOT stock photo, NOT AI-generated aesthetic.
```

### Prompt 4.4 — Dr. Eduardo (Cardiologista, 48 anos, Belo Horizonte)
```
Editorial portrait photograph: Brazilian man in his late 40s, salt-and-pepper
hair, neat beard, warm skin tone, wearing a white lab coat over a collared
shirt. Relaxed, approachable expression, genuine smile. Shot against warm
out-of-focus consultation room with wooden elements. Soft warm window light.
Shot on medium format film, natural skin texture with realistic lines and
imperfections. Documentary style. Authentic and grounded, NOT stock photo,
NOT AI-generated aesthetic. Reference: Wall Street Journal profile portraits.
```

**Uso:** Seção de depoimentos
**Especificação:** 800x800, WebP quadrado

---

## 5. Seção "Nunca sozinho na decisão" (copiloto)

### Prompt 5.1 — Médico analisando exame com serenidade
```
Editorial photograph: Brazilian doctor in their 30s, sitting calmly in a
modern consultation office, looking at a tablet that displays an abstract
medical interface. Their expression is focused but NOT stressed — almost
meditative. Warm natural afternoon light. Shallow depth of field. Plants
in the background softly out of focus. Muted warm palette with subtle
teal accent in clothing or background element. Shot on medium format film.
Mood: quiet confidence, supported, calm. Style reference: Calm app visuals,
Headspace marketing, but with medical context.
```
**Uso:** Background ou ilustração da nova seção "Nunca sozinho"
**Especificação:** 1600x1000, WebP

---

## 6. Mobile section — Apps disponíveis

### Prompt 6.1 — Médico usando app no corredor
```
Editorial photograph: Brazilian doctor walking through a softly lit hospital
corridor, casually holding a smartphone displaying a medical app (abstract,
no readable text). Motion blur suggests he's walking. Natural lighting,
warm tones. Shallow depth of field. White lab coat slightly unbuttoned.
Relaxed, multitasking confidently. Shot on medium format, documentary style.
Mood: freedom, mobility, modern medicine on the go.
```
**Uso:** Seção "Seu consultório no bolso"
**Especificação:** 1600x1200, WebP

---

## 7. Background / decorative

### Prompt 7.1 — Textura abstrata teal (para bg de seções)
```
Abstract cinematic close-up of soft watercolor ink flowing in water, deep
teal and emerald green tones with subtle hints of warm amber. Slow motion,
fluid, organic movement. Dark background. Minimalist, elegant, premium.
Style reference: Linear.app homepage background, Stripe gradient animations.
```
**Uso:** Background decorativo para seção Solution ou Belief Break
**Especificação:** 1920x1080, MP4 ou WebP estático

### Prompt 7.2 — Ondas sonoras abstratas (para seção transcrição)
```
Abstract cinematic macro shot of soft audio waveforms visualized as flowing
teal and cyan light, moving elegantly against a deep dark background. Subtle
particles, dreamlike. Minimalist, premium, tech-forward but warm. Style
reference: Apple Siri interface, Arc Browser loading animations.
```
**Uso:** Background da seção IA/transcrição
**Especificação:** 1920x800, MP4 ou PNG

---

## 8. Ícones customizados (opcional)

### Prompt 8.1 — Ícones abstratos de features
```
Set of 6 minimalist abstract icons on warm cream background. Each icon
represents: 1) microphone with soundwave, 2) shield with checkmark, 3) chat
bubble with neural pattern, 4) document with AI sparkle, 5) file upload
with arrow, 6) mobile phone. Style: thin linework, teal and dark green,
soft shadows, premium editorial feel. NOT flat, NOT generic iconography.
Reference: Linear.app icon system, Stripe Press.
```
**Uso:** Ícones customizados para os 6 Features cards
**Especificação:** 256x256, SVG ou PNG

---

## Workflow recomendado

**Fase 1 — Hero (prioridade máxima):**
1. Gerar Prompt 1.1 (vídeo hero) — fazer 3-5 variações, escolher a melhor
2. Gerar Prompt 1.2 (poster fallback)
3. Substituir `public/landing/mockups/hero-loop-v2.mp4` e `hero-screenshot.png`

**Fase 2 — Depoimentos (alto impacto de credibilidade):**
4. Gerar os 4 retratos (4.1 a 4.4) — IMPORTANTE: nem parecer AI-generated nem stock photo. Se parecer fake, gerar de novo.
5. Salvar como `public/landing/testimonials/dra-camila.webp`, etc.

**Fase 3 — Problem section (emocional):**
6. Gerar Prompt 2.1 e 2.2
7. Decidir se usa como background ou como card específico

**Fase 4 — Complementar:**
8. Gerar restantes (3.1, 3.2, 5.1, 6.1, 7.1, 7.2)

**Fase 5 — Opcional:**
9. Ícones customizados (8.1)

---

## Nota importante sobre depoimentos

Como os depoimentos são fictícios mas precisam parecer reais, os retratos são o **ponto mais crítico**. Se 1 dos 4 retratos parecer AI-generated, o site inteiro perde credibilidade.

**Teste de qualidade:** Mostre o retrato gerado para alguém que não sabe que é IA. Se a primeira reação for "hmm, parece IA", descarte e regere.

**Fallback:** Se não conseguir retratos realistas o suficiente, usar fotografias licenciadas de stock brasileiros específicos (Unsplash tem fotógrafos brasileiros, evitar Shutterstock genérico).
