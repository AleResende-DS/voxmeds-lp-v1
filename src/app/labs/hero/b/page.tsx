import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { HeroLoop } from "@/components/landing/labs/HeroLoop";
import { HeroText } from "@/components/landing/labs/HeroText";
import { LabShell } from "@/components/landing/labs/LabShell";

export default function HeroB() {
  return (
    <LabShell title="B" description="Mini mockup em código">
      <section className="relative min-h-[88vh] overflow-hidden bg-surface pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[-120px] h-[420px] w-[420px] rounded-full bg-primary/15 blur-[120px] drift-slow" />
          <div className="absolute right-[-120px] top-[60px] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[120px] drift-slow-reverse" />
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-noise" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12 lg:grid-cols-[0.95fr_1.05fr]">
          <HeroText />
          <HeroLoop />
        </div>
      </section>
      <SocialProofBar />
    </LabShell>
  );
}
