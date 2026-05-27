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
 * Envato homepage redesign (v4) — promoted to the root route.
 *
 * Narrative (matches the speaking script + decision board):
 *   Hero → Trust strip → Mechanism (once) → Creator floor reel
 *   → Tools (Pinterest grid, filterable by model)
 *   → Tutorials (Tuts+ row) → Asset library → Pricing → Final CTA
 *   → Trusted-by logo band → Footer
 */

export default function Home() {
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
