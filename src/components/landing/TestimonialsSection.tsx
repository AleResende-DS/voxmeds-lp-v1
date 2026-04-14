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
    id: "matheus",
    quote:
      "Como médico, sempre busquei soluções que reduzissem a burocracia da nossa rotina, sem abrir mão de qualidade e confiabilidade. A MedWiser nasceu justamente dessa lacuna: a falta de ferramentas realmente eficazes para apoiar o dia a dia clínico. Tenho orgulho de fazer parte de um projeto que contribui diretamente para melhorar a qualidade de vida de nós, médicos, e elevar o padrão do cuidado oferecido aos pacientes.",
    name: "Dr. Matheus Guelssi",
    role: "Ultrassonografista, cofundador e sócio",
    crm: "CRM 47.009 PR",
    city: "Campo Mourão - PR",
    image: "/landing/testimonials/perfil-matheus.webp",
    highlight: true,
  },
  {
    id: "gabriella",
    quote:
      "Já testei outras ferramentas, mas nenhuma chega perto da MedWiser em qualidade. E o melhor: meus pacientes perceberam um atendimento mais humano e próximo. Hoje uso em 100% das consultas e recomendo muito!",
    name: "Dra. Gabriella Cappelletti",
    role: "Dermatologista",
    crm: "CRM 47.008 PR",
    city: "Campo Mourão - PR",
    image: "/landing/testimonials/perfil-gabriella.webp",
  },
];

const featured = testimonials.find((t) => t.highlight)!;
const secondary = testimonials.filter((t) => !t.highlight);
const secondaryGridClass =
  secondary.length === 1 ? "max-w-2xl" : "max-w-3xl sm:grid-cols-3";

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

        {/* Secondary testimonials */}
        <Reveal delay={0.2}>
          <div className={`mx-auto mt-8 grid gap-4 ${secondaryGridClass}`}>
            {secondary.map((t) => (
              <div
                key={t.id}
                className="hover-lift rounded-card border border-border/60 bg-card p-6 shadow-card"
              >
                <div className="text-xs text-primary" aria-hidden="true">
                  {"★".repeat(5)}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border/60 bg-surface">
                    <Image
                      src={t.image}
                      alt={`Foto de ${t.name}`}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.city}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground/80">
                      {t.crm}
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
