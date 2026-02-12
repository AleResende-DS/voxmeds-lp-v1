# 🎥 Guia Completo de Assets - VoxMeds v2

## 📋 Visão Geral

Este documento contém todas as especificações técnicas e instruções para gravar/criar os assets necessários para o redesign v2 do site VoxMeds.

**Total de assets necessários:** 7 vídeos + alternativas em GIF

---

## 🎬 Vídeos Necessários

### Especificações Técnicas Gerais

```
Formato: MP4 (H.264) + WebM (VP9)
Resolução: 1920x1080 (Full HD)
Frame Rate: 30 FPS
Bitrate: 3-5 Mbps (otimizado para web)
Duração: 10-15 segundos cada
Peso máximo: 2MB por vídeo (usar compressão)
Loop: Sim (sem cortes bruscos no final)
Som: Não necessário (mudo)
```

### Ferramentas Recomendadas

**Gravação:**
- OBS Studio (gratuito)
- ScreenFlow (Mac)
- Camtasia

**Edição/Compressão:**
- HandBrake (compressão)
- FFmpeg (conversão)
- Adobe Premiere / DaVinci Resolve

---

## 1️⃣ Hero Dashboard (Landing Page Principal)

**Arquivo:** `hero-screenshot.mp4` ou `hero-dashboard-loop.mp4`

### O que gravar:
Navegação natural pelo dashboard do VoxMeds mostrando:
- Tela inicial (Dashboard)
- Transição suave para Lista de Pacientes
- Abrir um prontuário
- Visualizar agenda
- Voltar para dashboard

### Instruções de Gravação:

1. **Setup:**
   - Resolução da tela: 1920x1080
   - Zoom do navegador: 100%
   - Cursor visível (mouse pointer ativado)
   - Limpar notificações/pop-ups

2. **Roteiro (15 segundos):**
   ```
   0-3s:  Dashboard home com dados carregados
   3-5s:  Scroll suave mostrando cards/métricas
   5-8s:  Hover no card de "Próximas Consultas"
   8-11s: Clicar e transição para Agenda
   11-13s: Hover em consulta agendada
   13-15s: Fade out suave (voltar início)
   ```

3. **Dicas:**
   - Movimentos de mouse suaves e naturais
   - Sem cliques desnecessários
   - Transições lentas entre telas
   - Loop perfeito (último frame = primeiro frame)

4. **Pós-Produção:**
   - Adicionar blur leve nas bordas (vignette)
   - Aumentar saturação em 10-15%
   - Adicionar motion blur sutil
   - Exportar em 30fps

---

## 2️⃣ Transcrição com IA

**Arquivo:** `feature-transcription.mp4`

### O que gravar:
Demonstração da transcrição em tempo real:
- Médico (você) falando no microfone
- Texto aparecendo em tempo real na interface
- Documento sendo estruturado automaticamente

### Instruções:

1. **Texto para ditar (exemplo):**
   ```
   "Paciente masculino, 45 anos, queixa principal de dor
   abdominal há 3 dias. Dor em região epigástrica, com
   irradiação para quadrante superior direito. Nega febre.
   Ao exame físico apresenta abdome levemente distendido."
   ```

2. **Roteiro (12 segundos):**
   ```
   0-2s:  Interface vazia, botão "Iniciar transcrição"
   2-4s:  Clicar e ativar microfone (onda sonora aparece)
   4-10s: Texto aparecendo linha por linha conforme fala
   10-12s: Documento estruturado sendo gerado (fade in)
   ```

3. **Dicas:**
   - Falar de forma clara e pausada
   - Mostrar indicador visual de microfone ativo
   - Highlight em palavras-chave técnicas
   - Efeito de "typing" no texto

4. **Efeitos Visuais:**
   - Onda sonora animada (verde/teal)
   - Text fade-in suave (não instantâneo)
   - Cursor blinking ao final de cada linha
   - Ícone IA pulsando no canto

---

## 3️⃣ Prontuário Eletrônico

**Arquivo:** `feature-prontuario.mp4`

### O que gravar:
Navegação completa pelo prontuário de um paciente:
- Visualizar histórico
- Abrir documentos anteriores
- Timeline de consultas
- Exames anexados

### Roteiro (15 segundos):
```
0-3s:  Lista de pacientes, buscar por nome
3-5s:  Clicar no paciente "João Silva"
5-8s:  Prontuário abre, scroll pelo histórico
8-11s: Abrir documento (anamnese)
11-13s: Visualizar exames em grid
13-15s: Voltar para timeline
```

### Dicas:
- Dados fictícios completos (nome, idade, etc)
- Timeline com pelo menos 5 consultas
- 2-3 documentos diferentes (anamnese, receita, atestado)
- Transições suaves entre seções

---

## 4️⃣ Agenda Inteligente

**Arquivo:** `feature-agenda.mp4`

### O que gravar:
Criação de um novo agendamento com drag & drop:
- Visualizar calendário semanal
- Drag & drop de paciente para horário
- Editar detalhes da consulta
- Salvar com animação de sucesso

### Roteiro (12 segundos):
```
0-2s:  Calendário semanal visível
2-4s:  Hover em slot vazio (destaque visual)
4-7s:  Drag paciente da sidebar para horário 14:00
7-9s:  Modal de detalhes aparece
9-11s: Salvar (checkmark verde + notificação)
11-12s: Consulta aparece no calendário
```

### Dicas:
- Mostrar pelo menos 3 dias da semana
- Consultas já agendadas em cores diferentes
- Drag & drop fluido
- Notificação de sucesso animada

---

## 5️⃣ Relatórios e Analytics

**Arquivo:** `feature-relatorios.mp4`

### O que gravar:
Geração e visualização de relatórios:
- Dashboard de métricas
- Gráficos animados
- Filtros sendo aplicados
- Export de dados

### Roteiro (13 segundos):
```
0-2s:  Página de relatórios (gráficos estáticos)
2-5s:  Aplicar filtro "Últimos 30 dias"
5-8s:  Gráficos animando (barras crescendo)
8-10s: Scroll mostrando métricas financeiras
10-12s: Hover em "Exportar PDF" (highlight)
12-13s: Fade out
```

### Dicas:
- Usar dados realistas (mas fictícios)
- Gráficos com cores do brand (teal)
- Animação de loading ao aplicar filtro
- Tooltip ao hover nos gráficos

---

## 6️⃣ Agente de WhatsApp IA

**Arquivo:** `feature-whatsapp.mp4`

### O que gravar:
Conversa simulada entre paciente e assistente IA:
- Paciente pergunta sobre agendamento
- IA responde e oferece horários
- Paciente confirma
- Agendamento criado automaticamente

### Roteiro (15 segundos):
```
0-3s:  Tela do WhatsApp vazia
3-5s:  Mensagem do paciente aparece ("Olá, gostaria de agendar")
5-7s:  Bolhas de "digitando..."
7-10s: IA responde com horários disponíveis
10-12s: Paciente seleciona horário
12-14s: Confirmação automática
14-15s: Checkmark verde "Agendado"
```

### Dicas:
- Usar mockup do WhatsApp (interface oficial)
- Bolhas de mensagem com timing natural
- Indicador "digitando..." animado
- Avatar da clínica visível
- Horários em formato de botões

---

## 7️⃣ App Mobile

**Arquivo:** `feature-app-mobile.mp4`

### O que gravar:
Navegação no app mobile mostrando:
- Login/Home
- Lista de pacientes
- Transcrição por voz (mobile)
- Sincronização em tempo real

### Roteiro (13 segundos):
```
0-2s:  Tela inicial do app (splash/home)
2-4s:  Swipe para lista de pacientes
4-7s:  Abrir prontuário (transição nativa)
7-9s:  Botão de transcrição por voz
9-11s: Transcrever uma frase rápida
11-13s: Texto aparece e sincroniza (ícone cloud)
```

### Dicas:
- Usar emulador iOS ou Android
- Gestos nativos (swipe, tap)
- Animações de transição mobile
- Indicador de sync no header
- Design responsivo em tela vertical

---

## 🎨 Alternativas em GIF

Caso vídeos sejam muito pesados, criar versões GIF:

### Especificações GIF:
```
Formato: GIF otimizado
Resolução: 1200x800 (menor que vídeos)
Frame Rate: 24 FPS
Cores: 256 (dithering otimizado)
Peso máximo: 500KB
Duração: 8-10 segundos
Loop: Infinito
```

### Ferramenta Recomendada:
- **Gifski** (melhor qualidade)
- **ezgif.com** (online)
- **Photoshop** (Save for Web)

### Processo de Conversão:
```bash
# Usando FFmpeg para converter MP4 → GIF
ffmpeg -i input.mp4 -vf "fps=24,scale=1200:-1:flags=lanczos" -loop 0 output.gif

# Otimizar GIF com Gifsicle
gifsicle -O3 --colors 256 output.gif -o output-optimized.gif
```

---

## 📁 Estrutura de Arquivos Final

```
public/landing/
├── videos/
│   ├── hero-dashboard.mp4
│   ├── hero-dashboard.webm
│   ├── feature-transcription.mp4
│   ├── feature-transcription.webm
│   ├── feature-prontuario.mp4
│   ├── feature-prontuario.webm
│   ├── feature-agenda.mp4
│   ├── feature-agenda.webm
│   ├── feature-relatorios.mp4
│   ├── feature-relatorios.webm
│   ├── feature-whatsapp.mp4
│   ├── feature-whatsapp.webm
│   ├── feature-app-mobile.mp4
│   └── feature-app-mobile.webm
├── gifs/ (alternativo)
│   ├── hero-dashboard.gif
│   ├── feature-transcription.gif
│   ├── feature-prontuario.gif
│   ├── feature-agenda.gif
│   ├── feature-relatorios.gif
│   ├── feature-whatsapp.gif
│   └── feature-app-mobile.gif
└── posters/ (imagens de preview)
    ├── hero-dashboard.jpg
    ├── feature-transcription.jpg
    └── ...
```

---

## 🛠️ Comandos de Compressão

### Comprimir MP4 (manter qualidade):
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a copy output.mp4
```

### Converter para WebM:
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 output.webm
```

### Gerar poster (thumbnail):
```bash
ffmpeg -i input.mp4 -ss 00:00:02 -vframes 1 output.jpg
```

### Reduzir tamanho agressivamente:
```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 28 -preset fast output-small.mp4
```

---

## ✅ Checklist de Qualidade

Antes de usar cada vídeo, verificar:

- [ ] Peso < 2MB
- [ ] Resolução 1920x1080 (ou 1280:720 se necessário)
- [ ] FPS consistente (30fps)
- [ ] Loop perfeito (sem pulo visual)
- [ ] Sem ruído/artefatos
- [ ] Cores consistentes com brand
- [ ] Cursor visível quando necessário
- [ ] Transições suaves
- [ ] Formato MP4 + WebM disponíveis
- [ ] Poster image gerada

---

## 🎯 Implementação no Código

### Como usar vídeos no site:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  poster="/landing/posters/hero-dashboard.jpg"
  className="w-full h-full object-cover"
>
  <source src="/landing/videos/hero-dashboard.webm" type="video/webm" />
  <source src="/landing/videos/hero-dashboard.mp4" type="video/mp4" />
  {/* Fallback para GIF */}
  <img src="/landing/gifs/hero-dashboard.gif" alt="Dashboard VoxMeds" />
</video>
```

### Lazy loading:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  loading="lazy"
  preload="none"
>
  ...
</video>
```

---

## 📞 Dúvidas?

Se tiver dúvidas sobre:
- Qualidade dos vídeos
- Formato específico
- Problemas técnicos
- Otimização adicional

**Me envie os assets** e posso ajudar com:
- Compressão adicional
- Conversão de formatos
- Otimização para web
- Ajustes de qualidade

---

## 🚀 Próximos Passos

1. ✅ Gravar os 7 vídeos seguindo este guia
2. ✅ Comprimir usando ffmpeg
3. ✅ Gerar versões WebM
4. ✅ Criar GIFs de fallback
5. ✅ Gerar posters (thumbnails)
6. ✅ Colocar na pasta `/public/landing/videos/`
7. ✅ Testar no site local
8. ✅ Verificar performance (Lighthouse)
9. ✅ Deploy!

---

**Documento criado por:** Claude Code v2
**Data:** 2026-02-03
**Versão:** 1.0
