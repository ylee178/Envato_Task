import { Nav } from "@/components/sections/Nav";
import { HeroV2 } from "@/components/sections/HeroV2";
import { KpiBand } from "@/components/sections/KpiBand";
import { ReferenceLayerDemo } from "@/components/sections/ReferenceLayerDemo";
import { MediumGrid } from "@/components/sections/MediumGrid";
import { CreatorGrid } from "@/components/sections/CreatorGrid";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pricing } from "@/components/sections/Pricing";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <HeroV2 />
        <KpiBand />
        <Reveal>
          <ReferenceLayerDemo />
        </Reveal>
        <Reveal>
          <MediumGrid />
        </Reveal>
        <Reveal>
          <CreatorGrid />
        </Reveal>
        <Reveal>
          <SocialProof />
        </Reveal>
        <Reveal>
          <Pricing />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
