import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { HeroV3 } from "@/components/sections/v3/HeroV3";
import { FinalCtaV3 } from "@/components/sections/v3/FinalCtaV3";
import { KpiV4 } from "@/components/sections/v4/KpiV4";
import { ThreeRefsFlowV4 } from "@/components/sections/v4/ThreeRefsFlowV4";
import { CinemaReelV4 } from "@/components/sections/v4/CinemaReelV4";
import { LearnHowV4 } from "@/components/sections/v4/LearnHowV4";
import { SixToolsV4 } from "@/components/sections/v4/SixToolsV4";
import { AssetLibraryV4 } from "@/components/sections/v4/AssetLibraryV4";
import { PricingV4 } from "@/components/sections/v4/PricingV4";
import { TrustedByV4 } from "@/components/sections/v4/TrustedByV4";

/*
 * v4 — Higgsfield-grade visual punch + reference-first thesis proof.
 *
 * Reveal wrappers intentionally removed: the translate-y caused a flash
 * of the page background between dark sections during scroll. Sections
 * now render at their final position; content-level animations live
 * inside each section (animate-rise-in, ray-border, etc.).
 */

export default function V4Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <HeroV3 />
        <KpiV4 />
        <ThreeRefsFlowV4 />
        <CinemaReelV4 />
        <SixToolsV4 />
        <LearnHowV4 />
        <AssetLibraryV4 />
        <PricingV4 />
        <FinalCtaV3 />
        <TrustedByV4 />
      </main>
      <Footer />
    </>
  );
}
