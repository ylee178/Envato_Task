import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";
import { HeroV3 } from "@/components/sections/v3/HeroV3";
import { KpiPill } from "@/components/sections/v3/KpiPill";
import { ThreeRefsFlow } from "@/components/sections/v3/ThreeRefsFlow";
import { WorldCreativity } from "@/components/sections/v3/WorldCreativity";
import { RealWork } from "@/components/sections/v3/RealWork";
import { LearnHow } from "@/components/sections/v3/LearnHow";
import { LovedByBrands } from "@/components/sections/v3/LovedByBrands";
import { SixTools } from "@/components/sections/v3/SixTools";
import { PricingV3 } from "@/components/sections/v3/PricingV3";
import { FinalCtaV3 } from "@/components/sections/v3/FinalCtaV3";

export default function V3Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <HeroV3 />
        <KpiPill />
        <Reveal>
          <ThreeRefsFlow />
        </Reveal>
        <Reveal>
          <WorldCreativity />
        </Reveal>
        <Reveal>
          <RealWork />
        </Reveal>
        <Reveal>
          <LearnHow />
        </Reveal>
        <Reveal>
          <LovedByBrands />
        </Reveal>
        <Reveal>
          <SixTools />
        </Reveal>
        <Reveal>
          <PricingV3 />
        </Reveal>
        <Reveal>
          <FinalCtaV3 />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
