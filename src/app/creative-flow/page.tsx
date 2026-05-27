import { Nav } from "@/components/sections/Nav";
import { CreativeFlowScrub } from "@/components/sections/CreativeFlowScrub";

export const metadata = {
  title: "Creative Flow: how Envato works | Envato",
  description:
    "Scroll through the eight stages that turn references into a finished, licensed asset.",
};

export default function CreativeFlowPage() {
  return (
    <div className="creative-flow-root bg-[#050505] min-h-screen text-white">
      <Nav />
      <main className="bg-[#050505]">
        <CreativeFlowScrub />
      </main>
    </div>
  );
}
