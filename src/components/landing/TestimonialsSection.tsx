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
