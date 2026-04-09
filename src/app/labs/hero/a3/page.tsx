import { SocialProofBar } from "@/components/landing/SocialProofBar";
import { GridScan } from "@/components/landing/labs/GridScan";
import { HeroText } from "@/components/landing/labs/HeroText";
import { LabShell } from "@/components/landing/labs/LabShell";

export default function HeroA3() {
  return (
    <LabShell title="A3" description="Grid com scan">
      <section className="relative min-h-[88vh] overflow-hidden bg-surface pt-24 sm:pt-28">
        <GridScan className="absolute inset-0 -z-10" />

        <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-12 text-center sm:px-6 sm:pb-40 sm:pt-16">
          <HeroText align="center" />
        </div>
      </section>
      <SocialProofBar />
    </LabShell>
  );
}
