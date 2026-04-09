import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Clock,
  FileText,
  FileUp,
  HelpCircle,
  Home as HomeIcon,
  Lightbulb,
  MessageSquare,
  Mic,
  MonitorSmartphone,
  Sparkles,
  Stethoscope,
  Wand2,
} from "lucide-react";
import { BeliefBreak } from "@/components/landing/BeliefBreak";
import { ConsultationStory } from "@/components/landing/ConsultationStory";
import { CopilotChat } from "@/components/landing/CopilotChat";
import { Faq } from "@/components/landing/Faq";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";
import { Header } from "@/components/landing/Header";
import { LeadLink } from "@/components/landing/LeadLink";
import { PricingSection } from "@/components/landing/PricingSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/Reveal";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { Typewriter } from "@/components/landing/Typewriter";

const registerUrl = "https://portal.medwiser.app/register";

const painPoints = [
  {
    title: "Horas digitando",
    description:
      "Você termina a consulta e ainda passa mais 10 minutos documentando tudo.",
    icon: Clock,
  },
  {
    title: "Trabalho em casa",
    description:
      "A burocracia te acompanha para fora do consultório — e rouba seu tempo com a família.",
    icon: HomeIcon,
  },
  {
    title: "Retrabalho constante",
    description:
      "Copiar, colar e reformatar o mesmo conteúdo em cada sistema, todo dia.",
    icon: FileText,
  },
  {
    title: "Olho na tela, não no paciente",
    description:
      "A consulta vira digitação e o contato humano fica em segundo plano.",
    icon: MonitorSmartphone,
  },
  {
    title: "Medo de deixar passar algo",
    description:
      "Exame chega, você bate o olho correndo — e a insegurança de esquecer um achado importante vem junto.",
    icon: HelpCircle,
  },
  {
    title: "A insegurança do início da carreira",
    description:
      "Recém-formado? A responsabilidade pesa. Validar cada conduta sozinho, sem um colega por perto, é exaustivo.",
    icon: Lightbulb,
  },
];

type Feature = {
  title: string;
  description: string;
  image: string;
  tag: string;
  badge?: string;
  imageClass?: string;
  imageWrapperClass?: string;
};

const features: Feature[] = [
  {
    title: "IA que documenta por você",
    description:
      "Grave a consulta. A IA transcreve, gera anamnese, SOAP e documentos em segundos. Você só revisa.",
    image: "/landing/screenshots/consulta-vox.webp",
    tag: "Transcrição com IA",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "A IA não deixa nada passar",
    description:
      "Alertas automáticos em exames e documentos. A MedWiser analisa cada arquivo e sinaliza achados que podem ser clinicamente relevantes — antes que algo escape.",
    image: "/landing/screenshots/analytics-vox.webp",
    tag: "Alertas inteligentes",
    badge: "Exclusivo",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Seu copiloto em cada consulta",
    description:
      "Converse com uma IA que conhece o histórico completo do paciente. Tire dúvidas, valide condutas e consulte referências em segundos.",
    image: "/landing/screenshots/historico-vox.webp",
    tag: "Chat clínico",
    badge: "Exclusivo",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Prontuário completo e organizado",
    description:
      "Histórico de consultas, documentos, exames e evolução do paciente em um só lugar — tudo mantido atualizado automaticamente pela IA.",
    image: "/landing/screenshots/agenda-vox.webp",
    tag: "Prontuário",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Upload inteligente de exames",
    description:
      "Envie PDF, foto ou laudo de até 50MB. A IA lê, interpreta e integra automaticamente ao prontuário do paciente.",
    image: "/landing/screenshots/whatsapp-agent-iphone.webp",
    tag: "Análise por IA",
    imageClass: "object-contain",
    imageWrapperClass: "h-[280px] sm:h-[320px] lg:h-[340px]",
  },
  {
    title: "MedWiser no seu bolso",
    description:
      "Apps nativos para iOS e Android já disponíveis. Grave e atenda do celular — tudo sincronizado entre dispositivos.",
    image: "/landing/mockups/mobile-app.svg",
    tag: "Apps mobile",
    badge: "Disponível",
    imageClass: "object-contain",
    imageWrapperClass: "h-[280px] sm:h-[320px] lg:h-[340px]",
  },
];

const comparisonRows = [
  {
    id: "digitacao",
    before: "Horas digitando anamneses, SOAP e documentos",
    after: (
      <>
        <span className="font-semibold text-primary">A IA escreve</span> enquanto
        você conversa com o paciente
      </>
    ),
  },
  {
    id: "alertas",
    before: "Medo de deixar passar um achado importante no exame",
    after: (
      <>
        Alertas automáticos em cada documento —{" "}
        <span className="font-semibold text-primary">uma segunda leitura</span>{" "}
        sempre ativa
      </>
    ),
  },
  {
    id: "seguranca",
    before: "Decisões clínicas difíceis sem um colega por perto",
    after: (
      <>
        Um{" "}
        <span className="font-semibold text-primary">copiloto de IA</span> que
        conhece o histórico do paciente e responde em segundos
      </>
    ),
  },
  {
    id: "relacao",
    before: "Atendimento com o olho grudado na tela",
    after: (
      <span className="font-semibold text-primary">
        100% presente onde importa: na consulta
      </span>
    ),
  },
  {
    id: "vida",
    before: "Leva trabalho para casa. Todo santo dia.",
    after: (
      <>
        <span className="font-semibold text-primary">
          Finaliza o dia no último paciente.
        </span>
        <span className="mt-2 block text-muted-foreground">
          Mais descanso, mais lazer, mais família.
        </span>
      </>
    ),
  },
];

const heroPhrases = [
  "Não digitação.",
  "Não burocracia.",
  "Não trabalho em casa.",
];

const faqs = [
  {
    question: "Como funciona o teste grátis?",
    answer:
      "Você começa sem cartão de crédito e ganha 5 consultas grátis para testar tudo. Se quiser experimentar com acesso completo por mais tempo, basta cadastrar um cartão e ganhar 7 dias adicionais de acesso total. Sem pegadinha, sem compromisso.",
  },
  {
    question: "O que preciso para usar a MedWiser?",
    answer:
      "Apenas um computador, tablet ou celular com internet e microfone. A MedWiser roda no navegador e também tem apps nativos para iOS e Android, tudo sincronizado.",
  },
  {
    question: "A MedWiser substitui meu prontuário atual?",
    answer:
      "Sim. A MedWiser é um prontuário eletrônico completo — você tem histórico do paciente, evolução, documentos, exames e anotações em um só lugar. Não precisa de mais nenhum sistema.",
  },
  {
    question: "O que são os alertas automáticos da IA?",
    answer:
      "Sempre que você faz upload de um exame ou gera um documento, a IA analisa o conteúdo e sinaliza achados que podem ser clinicamente relevantes. Funciona como uma segunda leitura — especialmente valiosa para médicos recém-formados ou em casos complexos. Você continua sendo quem decide.",
  },
  {
    question: "Posso conversar com a IA durante a consulta?",
    answer:
      "Sim. Cada consulta tem um chat com uma IA que conhece o histórico completo daquele paciente. Você pode tirar dúvidas sobre interações medicamentosas, validar condutas ou consultar referências — antes, durante ou depois do atendimento.",
  },
  {
    question: "A IA vai prescrever ou diagnosticar por mim?",
    answer:
      "Não. A IA documenta, organiza e analisa — mas toda decisão clínica, prescrição e diagnóstico continuam sendo 100% do médico. Você tem controle total sobre tudo que é salvo no prontuário.",
  },
  {
    question: "Posso personalizar os documentos gerados?",
    answer:
      "Sim. Todos os documentos são editáveis e você pode criar templates ilimitados de anamnese, SOAP, laudos e qualquer outro tipo de documento que use na sua rotina.",
  },
  {
    question: "A transcrição funciona com qualquer sotaque?",
    answer:
      "Sim. Nossa IA foi treinada para entender a fala de médicos brasileiros de todas as regiões — sotaques regionais, terminologia técnica e variações de velocidade de fala.",
  },
  {
    question: "Como funciona a cobrança anual?",
    answer:
      "No plano anual, o valor total de R$ 2.388 é cobrado uma única vez no início, equivalendo a R$ 199 por mês (economia de 13% em relação ao mensal). No plano mensal, a cobrança é recorrente de R$ 229 por mês.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim. Sem fidelidade, sem burocracia e sem precisar falar com ninguém. Você cancela em 1 clique pelo próprio painel da MedWiser.",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <ScrollProgress />
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-surface pt-14 sm:pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[-120px] h-[420px] w-[420px] rounded-full bg-primary/15 blur-[120px] drift-slow" />
          <div className="absolute right-[-120px] top-[60px] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[120px] drift-slow-reverse" />
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-noise" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <div>
              <span
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-background/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-primary backdrop-blur-sm"
                title="Plataforma agêntica significa que a IA não só responde perguntas — ela executa tarefas de verdade por você: documenta consultas, analisa exames e te avisa sobre achados críticos."
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Primeira plataforma médica Agêntica do Brasil</span>
                <HelpCircle className="h-3.5 w-3.5 opacity-70" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 shimmer"
                />
              </span>
              <h1 className="mt-6 font-display text-[2.25rem] font-semibold leading-[1.05] text-balance sm:text-[3.25rem] lg:text-[3.75rem]">
                Você estudou medicina.
                <br />
                <span className="text-primary">
                  <Typewriter
                    phrases={heroPhrases}
                    className="inline-block font-semibold"
                    cursorClassName="text-primary"
                    typeSpeed={38}
                    deleteSpeed={22}
                    pause={1400}
                  />
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                A MedWiser transcreve suas consultas, gera prontuários
                completos, analisa exames e te alerta sobre achados críticos.
                Você cuida do paciente. A IA cuida do resto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <LeadLink
                  href={registerUrl}
                  className="tap-target inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(15,118,110,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97] sm:w-auto"
                >
                  Quero meu tempo de volta
                  <ArrowRight className="h-4 w-4" />
                </LeadLink>
                <Link
                  href="#copiloto"
                  className="tap-target inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-[border-color,transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/50 active:scale-[0.97] sm:w-auto"
                >
                  Ver como funciona
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                  5 consultas grátis sem cartão
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wand2 className="h-4 w-4 text-primary" />
                  Cancele em 1 clique
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} variant="fade-up-scale">
            <div className="relative">
              <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-primary/20 blur-[80px] drift-slow" />
              <div className="relative aspect-[2036/1394] overflow-hidden rounded-card border border-border bg-card/60 p-1.5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.55)] backdrop-blur-[2px]">
                <video
                  className="pointer-events-none h-full w-full rounded-[20px] object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  poster="/landing/mockups/hero-screenshot.png"
                  aria-label="Demonstração da plataforma MedWiser"
                >
                  <source
                    src="/landing/mockups/hero-loop-v2.mp4"
                    type="video/mp4"
                  />
                  Seu navegador não suporta vídeo HTML5.
                </video>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <SocialProofBar />

      {/* PROBLEM */}
      <section className="section py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                O problema
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Você estudou anos para salvar vidas —
                <br />
                <span className="text-primary">
                  e está gastando seu dia digitando.
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Seja você um especialista com décadas de consultório ou um
                recém-formado enfrentando a primeira plantão, o peso da
                burocracia é o mesmo. A MedWiser existe para tirar isso dos
                seus ombros.
              </p>
            </div>
          </Reveal>

          <RevealGroup
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
            delay={0.1}
          >
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem key={item.title} className="h-full" variant="fade-up">
                  <div className="hover-lift flex h-full flex-col rounded-card border border-border/60 bg-card p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* BELIEF BREAK */}
      <BeliefBreak />

      {/* SOLUTION — scroll-driven consultation story */}
      <ConsultationStory />

      {/* FEATURES */}
      <section
        id="funcionalidades"
        className="section bg-surface py-14 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Funcionalidades
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Tudo que você precisa. Nada que você não precisa.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Cada funcionalidade foi construída com um único objetivo:
                devolver seu tempo e dar mais segurança nas suas decisões.
              </p>
            </div>
          </Reveal>

          <RevealGroup
            className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-2"
            stagger={0.07}
            delay={0.1}
          >
            {features.map((feature) => (
              <RevealItem key={feature.title} variant="fade-up">
                <div className="hover-lift flex h-full flex-col rounded-card border border-border/60 bg-card p-5 shadow-card sm:p-6">
                  <div className="flex items-center justify-between">
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
                    <span className="text-xs text-muted-foreground">MedWiser</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-display text-2xl font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                  <div
                    className={`mt-6 overflow-hidden rounded-2xl border border-border/60 bg-surface ${
                      feature.imageWrapperClass ??
                      "h-[280px] sm:h-[320px] lg:h-[340px]"
                    }`}
                  >
                    <Image
                      src={feature.image}
                      alt={`${feature.title} — MedWiser`}
                      width={2037}
                      height={1397}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`h-full w-full ${
                        feature.imageClass ?? "object-cover"
                      }`}
                    />
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-12 flex justify-center">
            <LeadLink
              href={registerUrl}
              className="tap-target inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(15,118,110,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
            >
              Testar todas as funcionalidades grátis
              <ArrowRight className="h-4 w-4" />
            </LeadLink>
          </div>
        </div>
      </section>

      {/* COPILOT — recém-formado angle */}
      <section
        id="copiloto"
        className="section relative overflow-hidden py-14 sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[360px] w-[360px] rounded-full bg-primary/10 blur-[120px] drift-slow" />
          <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-primary/10 blur-[120px] drift-slow-reverse" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal variant="fade-left">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Para quem começa e para quem nunca quer parar
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Você nunca mais
                <br />
                <span className="text-primary">decide sozinho.</span>
              </h2>
              <p className="mt-6 text-muted-foreground">
                O início da carreira médica é solitário. A responsabilidade de
                cada decisão pesa. E mesmo para quem já tem décadas de
                experiência, uma segunda leitura sempre vale ouro.
              </p>
              <p className="mt-4 text-muted-foreground">
                A MedWiser é o copiloto que não dorme, não esquece e sempre
                conhece o paciente — funcionando como aquele colega experiente
                que você gostaria de ter do lado em cada consulta.
              </p>

              <RevealGroup className="mt-8 space-y-4" stagger={0.06}>
                <RevealItem>
                  <div className="hover-lift flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BellRing className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        Alertas em cada exame
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        A IA faz uma segunda leitura de cada laudo que você
                        sobe e sinaliza achados que podem exigir atenção. Não
                        deixa nada escapar.
                      </p>
                    </div>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="hover-lift flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        Chat clínico contextual
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Uma IA que conhece o histórico completo do paciente e
                        responde dúvidas sobre condutas, interações
                        medicamentosas e referências — em segundos.
                      </p>
                    </div>
                  </div>
                </RevealItem>
                <RevealItem>
                  <div className="hover-lift flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        Resumo automático do paciente
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Cada consulta atualiza automaticamente o resumo do
                        paciente. Na próxima visita, você tem o contexto
                        inteiro em 10 segundos de leitura.
                      </p>
                    </div>
                  </div>
                </RevealItem>
              </RevealGroup>

              <div className="mt-8">
                <LeadLink
                  href={registerUrl}
                  className="tap-target inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(15,118,110,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
                >
                  Quero um copiloto clínico
                  <ArrowRight className="h-4 w-4" />
                </LeadLink>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-right" delay={0.1}>
            <CopilotChat />
          </Reveal>
        </div>
      </section>

      {/* COMPARISON */}
      <section
        id="comparativo"
        className="section bg-surface py-14 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.45fr_0.55fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Antes e depois
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                  A diferença de
                  <br />
                  ter uma IA do seu lado.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Veja a transformação real no dia a dia de médicos que
                  começaram a usar a MedWiser.
                </p>
                <LeadLink
                  href={registerUrl}
                  className="tap-target mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(15,118,110,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
                >
                  Quero GANHAR tempo
                  <ArrowRight className="h-4 w-4" />
                </LeadLink>
              </div>

              <div className="grid gap-6 rounded-card border border-border/60 bg-card p-5 shadow-card sm:p-6">
                <div className="hidden gap-4 sm:grid sm:grid-cols-2 sm:gap-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-error">
                    Sem MedWiser
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Com MedWiser
                  </p>
                </div>
                <RevealGroup className="grid gap-4" stagger={0.07}>
                  {comparisonRows.map((row) => (
                    <RevealItem
                      key={row.id}
                      variant="fade-up"
                      className="grid items-start gap-3 rounded-2xl border border-border/60 bg-surface/40 p-4 text-sm text-foreground/80 sm:grid-cols-2 sm:gap-10 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
                    >
                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-error sm:hidden">
                          Sem MedWiser
                        </p>
                        <div className="text-muted-foreground">✕ {row.before}</div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:hidden">
                          Com MedWiser
                        </p>
                        <div>✓ {row.after}</div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APP MOBILE */}
      <section id="app" className="section py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:gap-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Apps nativos
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Seu consultório
                <br />
                <span className="text-primary">no seu bolso.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Apps nativos para iOS e Android — disponíveis agora. Grave
                consultas, consulte prontuários e acesse tudo do seu celular,
                com tudo sincronizado entre dispositivos.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mic className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/80">
                    Grave consultas direto do celular ou tablet
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FileUp className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/80">
                    Upload de exames pela câmera do celular
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MonitorSmartphone className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/80">
                    Sincronização em tempo real entre web, iOS e Android
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/80">
                    Live Activity no iPhone durante gravações
                  </span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
                <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-semibold text-primary">
                  Disponível agora
                </span>
                <span className="text-muted-foreground">App Store · Google Play</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} variant="fade-up-scale">
            <div className="relative mx-auto w-[240px] sm:w-[300px] lg:w-[340px]">
              <div className="absolute right-4 top-8 h-16 w-16 rounded-full bg-primary/20 blur-[50px] drift-slow" />
              <div className="hover-lift rounded-[22px] border border-border/60 bg-card p-1.5 shadow-card float-slow">
                <Image
                  src="/landing/mockups/mobile-app.svg"
                  alt="MedWiser no celular — apps iOS e Android"
                  width={460}
                  height={720}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <section id="faq" className="section bg-surface py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                FAQ
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold text-balance sm:text-4xl">
                Perguntas frequentes
              </h2>
              <p className="mt-4 text-muted-foreground">
                Ainda ficou com dúvida? Fale com a gente no WhatsApp.
              </p>
            </div>
          </Reveal>

          <Faq items={faqs} />
        </div>
      </section>

      {/* FOOTER — sempre-dark (usa o tema dark da shadcn mesmo quando a LP está em light) */}
      <footer className="dark bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-card border border-primary/20 bg-gradient-to-br from-primary/15 to-transparent p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
              Pronto para recuperar seu tempo?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70 sm:text-base">
              5 consultas grátis sem cartão. Sem pegadinha, sem compromisso.
              Seu consultório mais leve começa agora.
            </p>
            <LeadLink
              href={registerUrl}
              className="tap-target mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_40px_-20px_rgba(15,118,110,0.9)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-dark active:scale-[0.97]"
            >
              Testar MedWiser grátis
              <ArrowRight className="h-4 w-4" />
            </LeadLink>
          </div>

          <div className="mt-14 grid gap-8 text-sm sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
            <div className="flex flex-col items-center text-center sm:col-span-2 md:col-span-1 md:items-start md:text-left">
              <Image
                src="/logo-footer.svg"
                alt="MedWiser"
                width={1080}
                height={1080}
                sizes="(max-width: 640px) 96px, 112px"
                className="h-auto w-24 sm:w-28"
              />
              <p className="mt-4 text-foreground/60">
                Primeira plataforma médica Agêntica do Brasil.
              </p>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Produto
              </p>
              <ul className="mt-4 flex flex-col items-center gap-1 text-foreground/70 md:items-start">
                <li>
                  <Link
                    href="#funcionalidades"
                    className="tap-target inline-flex items-center"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link
                    href="#copiloto"
                    className="tap-target inline-flex items-center"
                  >
                    Copiloto clínico
                  </Link>
                </li>
                <li>
                  <Link
                    href="#planos"
                    className="tap-target inline-flex items-center"
                  >
                    Planos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="tap-target inline-flex items-center"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Legal
              </p>
              <ul className="mt-4 flex flex-col items-center gap-1 text-foreground/70 md:items-start">
                <li>
                  <Link
                    href="https://portal.medwiser.app/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target inline-flex items-center"
                  >
                    Termos de uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://portal.medwiser.app/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tap-target inline-flex items-center"
                  >
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-foreground/10 pt-6 text-center text-xs text-foreground/50 md:flex-row md:items-start md:text-left">
            <span className="flex flex-wrap items-center justify-center gap-1 md:justify-start">
              © 2026 MedWiser — Desenvolvido por{" "}
              <Link
                href="https://www.zennex.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center px-1 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
              >
                Zennex
              </Link>
            </span>
            <Link
              href="https://instagram.com/medwiser.app"
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target inline-flex items-center px-1 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground"
            >
              Instagram @medwiser.app
            </Link>
          </div>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
