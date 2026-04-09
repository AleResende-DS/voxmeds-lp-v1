import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { GradientMesh } from "@/components/landing/labs/GradientMesh";
import { HeroText } from "@/components/landing/labs/HeroText";
import { LabShell } from "@/components/landing/labs/LabShell";

export default function HeroA2() {
  return (
    <LabShell title="A2" description="Gradient mesh">
      <section className="relative min-h-[88vh] overflow-hidden bg-surface pt-24 sm:pt-28">
        <GradientMesh className="absolute inset-0 -z-10" />

        <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-12 text-center sm:px-6 sm:pb-40 sm:pt-16">
          <HeroText align="center" />
        </div>
      </section>
      <SocialProofBar />
    </LabShell>
  );
}
