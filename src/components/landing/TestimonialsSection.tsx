import Image from "next/image";
import { Reveal } from "./Reveal";

type Testimonial = {
  id: string;
  quote: string;
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
      "Eu atendo 18 pacientes por dia e terminava o expediente digitando até às 23h. Hoje saio do consultório às 19h com tudo documentado. A diferença na minha rotina e na minha família é surreal.",
    name: "Dra. Camila Ferreira",
    role: "Pediatra",
    crm: "CRM-SP 178432",
    city: "São Paulo · SP",
    image: "/landing/testimonials/dra-camila.svg",
  },
  {
    id: "mariana",
    quote:
      "Já testei quase todos os sistemas do mercado. A MedWiser é a primeira que realmente entende como eu escrevo. Não precisei mudar nada do meu fluxo — ela se adaptou a mim, não o contrário.",
    name: "Dra. Mariana Costa",
    role: "Dermatologista",
    crm: "CRM-RS 38291",
    city: "Porto Alegre · RS",
    image: "/landing/testimonials/dra-mariana.svg",
  },
  {
    id: "eduardo",
    quote:
      "O chat com a IA durante a consulta mudou como eu trabalho. Quando bate uma dúvida sobre interação medicamentosa ou quero validar uma conduta, a resposta vem em segundos já levando em conta o histórico do paciente.",
    name: "Dr. Eduardo Lima",
    role: "Cardiologista",
    crm: "CRM-MG 67104",
    city: "Belo Horizonte · MG",
    image: "/landing/testimonials/dr-eduardo.svg",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="section relative overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-0 h-[360px] w-[360px] rounded-full bg-primary/5 blur-[120px]" />
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
            <p className="mt-4 text-muted">
              Do recém-formado ao especialista com décadas de consultório —
              veja como a MedWiser está mudando a rotina clínica no Brasil.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 0.05}>
              <article
                className={`flex h-full flex-col rounded-[24px] border bg-white p-6 shadow-card sm:p-8 ${
                  testimonial.highlight
                    ? "border-primary/40 ring-1 ring-primary/15"
                    : "border-border/60"
                }`}
              >
                <div className="text-primary" aria-hidden="true">
                  {"★".repeat(5)}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-6">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border/60 bg-surface">
                    <Image
                      src={testimonial.image}
                      alt={`Foto de ${testimonial.name}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="truncate text-xs text-muted">
                      {testimonial.role} · {testimonial.city}
                    </div>
                    <div className="truncate text-[11px] uppercase tracking-[0.12em] text-muted/80">
                      {testimonial.crm}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
