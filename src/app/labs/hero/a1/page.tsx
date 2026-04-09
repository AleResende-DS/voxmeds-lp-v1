import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { HeroText } from "@/components/landing/labs/HeroText";
import { LabShell } from "@/components/landing/labs/LabShell";
import { WaveformBackground } from "@/components/landing/labs/WaveformBackground";

export default function HeroA1() {
  return (
    <LabShell title="A1" description="Waveform horizonte">
      <section className="relative min-h-[88vh] overflow-hidden bg-surface pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-[-120px] h-[420px] w-[420px] rounded-full bg-primary/15 blur-[120px] drift-slow" />
          <div className="absolute right-[-120px] top-[60px] h-[380px] w-[380px] rounded-full bg-primary/10 blur-[120px] drift-slow-reverse" />
          <div className="absolute inset-0 bg-noise" />
        </div>

        {/* Waveform horizon — bottom 36% of the hero */}
        <WaveformBackground className="absolute bottom-0 left-0 right-0 h-[36%]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-40 pt-12 text-center sm:px-6 sm:pb-48 sm:pt-16">
          <HeroText align="center" />
        </div>
      </section>
      <SocialProofBar />
    </LabShell>
  );
}
