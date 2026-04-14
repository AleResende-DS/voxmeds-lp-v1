import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Clock,
  FileText,
  HelpCircle,
  Home as HomeIcon,
  Lightbulb,
  MessageSquare,
  MonitorSmartphone,
  RefreshCw,
  Sparkles,
  Stethoscope,
  Wand2,
} from "lucide-react";
import { BeliefBreak } from "@/components/landing/BeliefBreak";
import { ConsultationStory } from "@/components/landing/ConsultationStory";
import { CopilotChat } from "@/components/landing/CopilotChat";
import { Faq } from "@/components/landing/Faq";
import { Header } from "@/components/landing/Header";
import { LeadLink } from "@/components/landing/LeadLink";
import { PricingSection } from "@/components/landing/PricingSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/landing/Reveal";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { Typewriter } from "@/components/landing/Typewriter";
import { HeroLoopV2 } from "@/components/landing/HeroLoopV2";
import { LeadCapturePopup } from "@/components/landing/LeadCapturePopup";

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
    alt: "Aplicativo MedWiser no celular — telas de login, lista de consultas, gravação e sincronização",
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

const heroPhrases = [
  "Não digitação.",
  "Não burocracia.",
  "Não trabalho em casa.",
];

const faqs = [
  {
    question: "Como funciona o teste grátis?",
    answer:
      "Você ganha 7 dias grátis para testar tudo, sem compromisso. Depois, escolhe entre o plano mensal ou anual. Cancela em 1 clique pelo próprio painel.",
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
                  7 dias grátis
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Wand2 className="h-4 w-4 text-primary" />
                  Cancele em 1 clique
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} variant="fade-up-scale">
            <HeroLoopV2 />
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
                recém-formado enfrentando o primeiro plantão, o peso da
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

          {/* Featured cards — full width */}
          <RevealGroup
            className="mt-8 flex flex-col gap-4 sm:gap-6"
            stagger={0.07}
            delay={0.1}
          >
            {features
              .filter((f) => f.featured)
              .map((feature) => (
                <RevealItem key={feature.title} variant="fade-up">
                  <div className="hover-lift flex flex-col overflow-hidden rounded-card border border-border/60 bg-card shadow-card lg:flex-row">
                    <div className="flex flex-col justify-center p-5 sm:p-6 lg:w-3/5">
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
                      <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                    {feature.image && (
                      <div className="flex items-center justify-center border-t border-border/60 bg-surface p-3 lg:w-2/5 lg:border-l lg:border-t-0">
                        <div className="flex items-center justify-center overflow-hidden rounded-xl">
                          <Image
                            src={feature.image}
                            alt={feature.alt ?? `${feature.title} — MedWiser`}
                            width={800}
                            height={533}
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className={`mx-auto max-h-[200px] w-auto ${feature.imageClass ?? "object-contain"}`}
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
                <RevealItem>
                  <div className="hover-lift flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <RefreshCw className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        Perfil atualizado automaticamente
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Depois de cada consulta, a IA revisa o histórico e
                        atualiza alergias, cirurgias, medicações e condições
                        do paciente — sem você tocar em nada.
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

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* SECURITY */}
      <SecuritySection />

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
                Ainda ficou com dúvida?{" "}
                <strong className="font-semibold text-foreground">
                  Teste por 7 dias sem compromisso.
                </strong>
              </p>
            </div>
          </Reveal>

          <Faq items={faqs} />
        </div>
      </section>

      {/* FOOTER — sempre-dark (usa o tema dark da shadcn mesmo quando a LP está em light) */}
      <footer className="dark bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-card border border-primary/20 bg-gradient-to-br from-primary/15 to-primary/0 p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-semibold text-balance sm:text-4xl">
              Pronto para recuperar seu tempo?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-foreground/70 sm:text-base">
              7 dias grátis. Sem compromisso.
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

      <LeadCapturePopup />
    </div>
  );
}
