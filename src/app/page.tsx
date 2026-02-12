import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Hourglass,
  FileText,
  Home as HomeIcon,
  MonitorSmartphone,
  Repeat,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/landing/Header";
import { PricingSection } from "@/components/landing/PricingSection";
import { Reveal } from "@/components/landing/Reveal";
import { Typewriter } from "@/components/landing/Typewriter";

const registerUrl = "https://app.voxmeds.com/register";

const painPoints = [
  {
    title: "Horas digitando",
    description: "Documentar consome mais tempo do que atender.",
    icon: Clock,
  },
  {
    title: "Sistemas fragmentados",
    description: "Agenda em um lugar, prontuário em outro.",
    icon: Repeat,
  },
  {
    title: "Trabalho em casa",
    description: "A burocracia te acompanha para fora do consultório.",
    icon: HomeIcon,
  },
  {
    title: "Retrabalho constante",
    description: "Copiar, colar e reformatar o mesmo conteúdo.",
    icon: FileText,
  },
  {
    title: "Olho na tela, não no paciente",
    description:
      "A consulta vira digitação e o contato humano fica em segundo plano.",
    icon: MonitorSmartphone,
  },
  {
    title: "Insegurança jurídica",
    description:
      "Registros incompletos aumentam riscos e geram medo de processos.",
    icon: ShieldCheck,
  },
];

const features = [
  {
    title: "IA que documenta por você",
    description:
      "Transcrição automática que gera prontuários, anamnese e documentos em segundos.",
    image: "/landing/screenshots/consulta-vox.webp",
    tag: "Transcrição com IA",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Histórico completo e organizado",
    description:
      "Prontuário eletrônico com evolução clínica, exames e documentos em um só lugar.",
    image: "/landing/screenshots/historico-vox.webp",
    tag: "Prontuário",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Agenda inteligente",
    description:
      "Acesso de secretário, agendamento automático pelo Agente de WhatsApp e 100% customizável.",
    image: "/landing/screenshots/agenda-vox.webp",
    tag: "Agenda",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Relatórios automáticos",
    description:
      "Visão financeira e clínica sem planilhas ou retrabalho.",
    image: "/landing/screenshots/analytics-vox.webp",
    tag: "Analytics",
    imageWrapperClass: "aspect-[2037/1397]",
  },
  {
    title: "Agente de IA",
    description:
      "Assistente virtual que agenda consultas, confirma horários e responde dúvidas 24h por dia.",
    image: "/landing/mockups/whatsapp-mock.svg",
    tag: "WhatsApp IA",
    imageWrapperClass: "h-[280px] sm:h-[320px] lg:h-[340px]",
  },
  {
    title: "Seu consultório no bolso",
    description:
      "Já pensou uma consulta sem mouse e teclado? Aguarde...",
    image: "/landing/mockups/mobile-app.svg",
    tag: "App mobile",
    badge: "Em breve",
    imageClass: "object-contain",
    imageWrapperClass: "h-[280px] sm:h-[320px] lg:h-[340px]",
  },
];

const comparisonRows = [
  {
    id: "digitacao",
    before: "Digitação",
    after: (
      <>
        <span className="font-semibold text-primary">IA</span> faz{" "}
        <span className="font-semibold text-primary">quase tudo</span> por você
      </>
    ),
  },
  {
    id: "juridica",
    before: "Insegurança jurídica",
    after: (
      <span className="font-semibold text-primary">
        Segurança total dos documentos
      </span>
    ),
  },
  {
    id: "agendamento",
    before: "Agendamento 100% manual",
    after: (
      <>
        <span className="font-semibold text-primary">Agendamento automático</span>{" "}
        pelo Agente de IA
      </>
    ),
  },
  {
    id: "relacao",
    before: "Péssima relação médico x paciente",
    after: (
      <span className="font-semibold text-primary">
        100% presente onde importa, na consulta.
      </span>
    ),
  },
  {
    id: "vida",
    before: "Leva trabalho para casa.",
    after: (
      <>
        <span className="font-semibold text-primary">
          Finaliza o dia no último paciente.
        </span>
        <span className="mt-2 block text-muted">
          Mais descanso, mais lazer, mais família com a VoxMeds.
        </span>
      </>
    ),
  },
];

const securityItems = [
  {
    title: "Anonimização dos dados",
    description: "Conforme descrito pela LGPD.",
    icon: ShieldCheck,
  },
  {
    title: "Uso simplificado",
    description: "Nosso modelo não requer autorização do paciente.",
    icon: Check,
  },
  {
    title: "Áudios descartados",
    description: "Nenhum registro de voz fica armazenado.",
    icon: Sparkles,
  },
  {
    title: "Compartilhamento auditado",
    description:
      "Compartilhamento auditado pelo médico responsável.",
    icon: ShieldCheck,
  },
];

const heroPhrases = [
  "Em uma única plataforma",
  "Mais inteligente",
  "Mais organizado",
  "Automatizado por IA",
  "Na palma da sua mão",
];

const transcriptionPhrases = [
  "Ditado clínico em segundos",
  "Anamnese pronta automaticamente",
  "Evolução sem digitação",
];

const faqs = [
  {
    question: "O que preciso para usar o VoxMeds?",
    answer:
      "Basta um computador ou celular com internet e microfone. Você pode usar pelo navegador ou pelo app iOS/Android.",
  },
  {
    question: "O VoxMeds substitui meu prontuário atual?",
    answer:
      "Sim. O VoxMeds é um prontuário completo, com histórico, documentos e evolução clínica em um só lugar.",
  },
  {
    question: "Posso personalizar os documentos gerados?",
    answer:
      "Sim, todos os documentos são editáveis, a IA é apenas um suporte para você. Além disso, você pode criar templates personalizados dos documentos.",
  },
  {
    question: "Como funciona o agente no WhatsApp?",
    answer:
      "Você conecta o WhatsApp da clínica e um assistente de IA responde mensagens, tira dúvidas, realiza agendamentos e confirma horários. Tudo com as informações diretamente do app.",
  },
  {
    question: "Posso testar antes de assinar?",
    answer:
      "Sim, oferecemos 20 consultas gratuitas sem cartão de crédito. Além de 30 dias com acesso grátis completo.",
  },
  {
    question: "A IA vai prescrever por mim?",
    answer:
      "Não, a IA atua apenas como apoio e cria no máximo sugestões e alertas, mas você, médico, é quem decide tudo.",
  },
  {
    question: "Gera prescrição digital válida?",
    answer:
      "Ainda não, estamos trabalhando para entregar um documento válido. Em breve você poderá gerar prescrições digitais válidas.",
  },
  {
    question: "Posso começar com o plano individual e aumentar para Equipe?",
    answer:
      "Sim, você pode aumentar ou diminuir o seu plano a qualquer momento.",
  },
  {
    question: "A cobrança é por médico?",
    answer:
      "Sim, o valor é por médico, mas é gerada uma única fatura com o valor total.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim. Sem fidelidade. Você pode cancelar quando quiser diretamente pelo app.",
  },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden bg-surface pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[-120px] h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute right-[-120px] top-[60px] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute inset-0 bg-noise" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-24 pt-12 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
                A transcrição com IA mais precisa em contexto médico.
              </span>
              <h1 className="mt-6 text-3xl font-semibold text-balance sm:text-5xl">
                Seu consultório inteiro.
                <br />
                <span className="text-primary">
                  <Typewriter
                    phrases={heroPhrases}
                    className="inline-block min-w-0 sm:min-w-[22ch] font-semibold"
                    cursorClassName="text-primary"
                    typeSpeed={64}
                    deleteSpeed={34}
                    pause={1500}
                  />
                </span>
              </h1>
              <p className="mt-5 text-lg text-muted">
                Prontuário, agenda, transcrição, relatórios, atendimento no
                WhatsApp — tudo integrado e{" "}
                <span className="font-semibold text-primary">INTELIGENTE</span>,
                para você focar no que importa: seu paciente.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={registerUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-24px_rgba(13,148,136,0.9)] transition hover:bg-primary-dark"
                >
                  Começar teste grátis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#solucao"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white px-6 py-3 text-sm font-medium text-foreground transition hover:border-primary/50"
                >
                  Ver como funciona
                  <ArrowDown className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
                <span>✓ 30 dias grátis</span>
                <span>✓ Sem cartão</span>
                <span>✓ Cancele quando quiser</span>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-muted">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MonitorSmartphone className="h-4 w-4" />
                </span>
                Disponível para Web. iOS e Android em breve.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -right-8 top-8 h-24 w-24 rounded-full bg-primary/20 blur-[65px] sm:-right-10 sm:top-10 sm:h-32 sm:w-32 sm:blur-[80px]" />
              <div className="relative aspect-[2036/1394] overflow-hidden rounded-2xl border border-white/70 bg-white/45 p-1 shadow-[0_22px_54px_-30px_rgba(15,23,42,0.45)] backdrop-blur-[2px] sm:rounded-[28px] sm:p-1.5">
                <video
                  className="h-full w-full rounded-xl object-cover pointer-events-none sm:rounded-[22px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  poster="/landing/mockups/hero-screenshot.png"
                  aria-label="Demonstração do app VoxMeds"
                >
                  <source src="/landing/mockups/hero-loop-v2.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeo HTML5.
                </video>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  O problema
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                  Expediente longo ou é a burocracia que está roubando o seu
                  tempo?
                </h2>
                <p className="mt-4 text-muted">
                  Você estudou para{" "}
                  <span className="font-semibold text-foreground">
                    cuidar de pessoas
                  </span>
                  , não para preencher formulários. Você sabe que se não fosse a{" "}
                  <span className="font-semibold text-primary">“papelada”</span>{" "}
                  poderia atender mais, ou ter{" "}
                  <span className="font-semibold text-foreground">
                    mais tempo livre
                  </span>
                  . Mas ainda assim, você é obrigado a{" "}
                  <span className="font-semibold text-foreground">
                    levar serviço pra casa
                  </span>{" "}
                  e trocar{" "}
                  <span className="font-semibold text-foreground">
                    tempo com a família
                  </span>
                  ,{" "}
                  <span className="font-semibold text-foreground">
                    descanso
                  </span>{" "}
                  e{" "}
                  <span className="font-semibold text-foreground">lazer</span>{" "}
                  pela{" "}
                  <span className="font-semibold text-foreground">
                    documentação clínica
                  </span>
                  .
                </p>
              </div>

              <div className="flex items-center justify-start lg:justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-white/70 shadow-card">
                  <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" />
                  <Hourglass className="relative h-9 w-9 text-primary animate-[spin_10s_linear_infinite]" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {painPoints.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} className="h-full">
                  <div className="flex h-full flex-col rounded-[24px] border border-border/60 bg-white p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-surface py-24" id="crenca">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Quebra de crença
            </p>
            <p className="mt-4 text-lg text-muted">
              A maioria dos médicos acha que burocracia faz parte do trabalho. Que
              crescer na carreira significa abrir mão da vida pessoal.
            </p>
            <div className="mx-auto mt-8 h-px w-24 bg-primary/40" />
            <h2 className="mt-8 text-4xl font-semibold text-primary">
              Mas isso não é verdade.
            </h2>
            <p className="mt-4 text-muted">
              A tecnologia já permite que você documente sem digitar, organize sem
              planilhas e cresça sem se esgotar. Você só precisa das ferramentas
              certas.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="solucao" className="section py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Conheça a VoxMeds
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                O sistema médico 100% com IA, que realmente entende sua rotina.
              </h2>
              <p className="mt-4 text-muted">
                Um sistema pensado do zero para médicos brasileiros: você fala, a
                IA documenta; você atende, tudo se organiza automaticamente; você
                consulta, os dados viram insights.
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span>Você fala, a IA documenta em tempo real.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <span>Você atende, o sistema organiza agenda e pacientes.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </span>
                  <span>
                    Presença total na consulta, você exerce a medicina, a IA cuida
                    da burocracia.
                  </span>
                </div>
              </div>

              <p className="mt-8 text-lg font-semibold text-primary">
                Simples. Seguro. Integrado.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute right-8 top-6 h-24 w-24 rounded-full bg-primary/20 blur-[60px]" />
              <div className="rounded-[32px] border border-border/60 bg-white p-8 shadow-card">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted">
                  <span>Demo VoxMeds</span>
                  <span className="inline-flex items-center gap-2 text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary pulse-soft" />
                    Ao vivo
                  </span>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl border border-border/60 bg-surface p-4 float-slow">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Transcrição
                    </p>
                    <p className="mt-3 text-sm">
                      <span className="sr-only">
                        Transcrição automática em segundos.
                      </span>
                      <span className="text-muted">"</span>
                      <Typewriter
                        phrases={transcriptionPhrases}
                        className="inline-block font-medium text-foreground"
                        cursorClassName="text-primary"
                      />
                      <span className="text-muted">"</span>
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-white p-4 shadow">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Prontuário
                    </p>
                    <p className="mt-3 text-sm">
                      Documentos estruturados e gerados automaticamente.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-surface p-4 float-delayed">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Alertas Auxiliares
                    </p>
                    <p className="mt-3 text-sm">
                      Leitura dos documentos gerados e sugestões inteligentes de
                      exames, consultas ou erros críticos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="funcionalidades" className="section bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Funcionalidades
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                Tudo que você precisa em um só lugar
              </h2>
              <p className="mt-4 text-muted">
                Cada módulo foi criado para aliviar sua carga administrativa sem
                atrapalhar o fluxo da consulta.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {features.map((feature) => (
              <Reveal key={feature.title}>
                <div className="flex h-full min-h-[560px] flex-col rounded-[32px] border border-border/60 bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                        {feature.tag}
                      </span>
                      {feature.badge && (
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted">VoxMeds</span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    {feature.badge && (
                      <span className="sr-only">{feature.badge}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted">{feature.description}</p>
                  <div className={`mt-auto overflow-hidden rounded-2xl border border-border/60 bg-surface ${
                    feature.imageWrapperClass ?? "h-[280px] sm:h-[320px] lg:h-[340px]"
                  }`}>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={2037}
                      height={1397}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={`h-full w-full ${
                        feature.imageClass ?? "object-cover"
                      }`}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="comparativo" className="section py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Comparativo
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                  A diferença de usar tecnologia de verdade
                </h2>
                <p className="mt-4 text-muted">
                  Veja a diferença real de usar a melhor plataforma médica com IA.
                </p>
                <Link
                  href={registerUrl}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
                >
                  Quero GANHAR tempo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 rounded-[32px] border border-border/60 bg-white p-6 shadow-card">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-error">
                    Sem VoxMeds
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Com VoxMeds
                  </p>
                </div>
                <div className="grid gap-4">
                  {comparisonRows.map((row) => (
                    <div
                      key={row.id}
                      className="grid items-start gap-4 text-sm text-muted sm:grid-cols-2 sm:gap-10"
                    >
                      <div>✕ {row.before}</div>
                      <div>✓ {row.after}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="app" className="section bg-surface py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                App mobile
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                Seu consultório no bolso
              </h2>
              <p className="mt-4 text-muted">
                Acesse prontuários, agenda e notificações em qualquer lugar. E o
                principal: faça consultas apenas utilizando o celular. Você
                consulta, a IA faz o resto.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li>✓ Agenda e prontuários sempre sincronizados</li>
                <li>✓ Sincronização entre os dispositivos</li>
                <li>✓ Liberdade real: da agenda à prescrição, tudo pelo celular.</li>
                <li>✓ Segurança Biométrica</li>
                <li>✓ Transcrição usando o microfone do celular.</li>
              </ul>
              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary">
                <span className="rounded-full border border-primary/30 px-4 py-2">
                  Em breve
                </span>
                <span className="text-muted">App Store · Google Play</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto w-[240px] sm:w-[280px] lg:w-[320px]">
              <div className="absolute right-4 top-8 h-14 w-14 rounded-full bg-primary/20 blur-[45px]" />
              <div className="rounded-[22px] border border-border/60 bg-white p-1.5 shadow-card">
                <Image
                  src="/landing/mockups/mobile-app.svg"
                  alt="Mockup app VoxMeds"
                  width={460}
                  height={720}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="whatsapp" className="section py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                WhatsApp IA
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                Atendimento 24h - Sem CLT
              </h2>
              <p className="mt-4 text-muted">
                Seu paciente envia mensagem no WhatsApp da clínica e recebe
                resposta automática: pode agendar consultas, confirmar horários,
                reagendar e tirar dúvidas comuns. Tudo integrado com sua agenda.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted">
                <li>✓ Agenda consultas automaticamente</li>
                <li>✓ Confirma e lembra pacientes</li>
                <li>✓ Responde dúvidas frequentes</li>
                <li>✓ Funciona 24 horas por dia</li>
                <li>
                  ✓ Lembrete para pacientes com receitas controladas, lembrando-o
                  de agendar uma consulta ANTES do término do medicamento.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[32px] border border-border/60 bg-white p-6 shadow-card">
              <Image
                src="/landing/mockups/whatsapp-mock.svg"
                alt="Mockup WhatsApp VoxMeds"
                width={800}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="seguranca" className="section bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                Segurança
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                Todos os dados protegidos
              </h2>
              <p className="mt-4 text-muted">
                Conformidade, criptografia e infraestrutura de nível clínico.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {securityItems.map((item) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} className="h-full">
                  <div className="flex h-full flex-col rounded-[24px] border border-border/60 bg-white p-6 shadow-card">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="section py-24 hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  Depoimentos
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                  O que médicos estão dizendo
                </h2>
              </div>
              <span className="text-sm text-muted">
                Espaço reservado para depoimentos reais.
              </span>
            </div>
          </Reveal>

          <div className="mt-10 flex gap-6 overflow-x-auto pb-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="min-w-[280px] flex-1 rounded-[28px] border border-border/60 bg-white p-6 shadow-card"
              >
                <p className="text-sm text-muted">
                  "Economizo pelo menos 2 horas por dia. Antes ficava até tarde
                  digitando, agora saio no horário e com tudo documentado."
                </p>
                <div className="mt-5 text-sm font-semibold">Dr(a). [Nome]</div>
                <div className="text-xs text-muted">Especialidade · Cidade</div>
                <div className="mt-4 text-xs text-primary">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingSection />

      <section id="faq" className="section bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                FAQ
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
                Perguntas frequentes
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question}>
                <details
                  className="group rounded-[24px] border border-border/60 bg-white p-6 shadow-card"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold">
                    <span>{faq.question}</span>
                    <ChevronDown
                      className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-3 text-sm text-muted">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#0b1514] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-[32px] bg-primary/10 p-10 text-center">
            <h2 className="text-3xl font-semibold text-balance">
              Pronto para transformar sua rotina?
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Experimente o consultório mais leve da sua vida.
            </p>
            <Link
              href={registerUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Começar teste grátis de 30 dias
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-10 text-sm md:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <Image
                src="/logo-footer.png"
                alt="VoxMeds"
                width={1080}
                height={1080}
                sizes="(max-width: 640px) 96px, 112px"
                className="h-auto w-24 sm:w-28"
              />
              <p className="mt-4 text-white/60">
                Inteligência clínica em cada palavra.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Produto
              </p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>
                  <Link href="#funcionalidades">Funcionalidades</Link>
                </li>
                <li>
                  <Link href="#planos">Planos</Link>
                </li>
                <li>
                  <Link href="#faq">FAQ</Link>
                </li>
              </ul>
            </div>
            <div className="hidden">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Empresa
              </p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>Sobre</li>
                <li>Contato</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Legal
              </p>
              <ul className="mt-4 space-y-2 text-white/70">
                <li>
                  <Link
                    href="https://app.voxmeds.com/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Termos de uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://app.voxmeds.com/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
            <span>
              © 2026 VoxMeds — Desenvolvido por{" "}
              <Link
                href="https://www.zennex.com.br"
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                Zennex
              </Link>
            </span>
            <Link
              href="https://instagram.com/voxmeds.ia"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white"
            >
              Instagram /voxmeds.ia
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
