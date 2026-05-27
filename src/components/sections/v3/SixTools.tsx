import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";

type Tool = {
  name: string;
  pitch: string;
  models: string[];
  src: string;
};

const TOOLS: Tool[] = [
  { name: "VideoGen", pitch: "Cinematic 4K shots in your taste range.", models: ["Veo 3.1", "Kling 3.0", "Seedance 2.0"], src: "/v3/tool_01_video.jpg" },
  { name: "ImageGen", pitch: "Editorial stills from three references.", models: ["Flux.2", "Seedream 4.5", "Imagen 4"], src: "/v3/tool_02_image.jpg" },
  { name: "ImageEdit", pitch: "Upscale and refine without losing the soul.", models: ["Magnific", "Nano Banana Pro"], src: "/v3/tool_03_edit.jpg" },
  { name: "MusicGen", pitch: "Score that fits your edit, not the algorithm.", models: ["ElevenLabs Music", "Minimax 2.5", "Mureka v8"], src: "/v3/tool_04_music.jpg" },
  { name: "VoiceGen", pitch: "Studio-grade voiceovers, any tone.", models: ["ElevenLabs"], src: "/v3/tool_05_voice.jpg" },
  { name: "MockupGen", pitch: "Product shots without a shoot.", models: ["Envato Studio"], src: "/v3/tool_06_mockup.jpg" },
];

export function SixTools() {
  return (
    <section className="bg-[var(--hero)] text-white py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-12">
          {/* Left header */}
          <div>
            <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[52px]">
              Six tools.
              <br />
              One canvas.
              <br />
              <em className="italic text-gradient-brand">Infinite combinations.</em>
            </h2>
            <p className="mt-6 text-[14px] lg:text-[15px] leading-[1.55] text-white/65 max-w-[280px]">
              All the creative firepower you need, connected by your references.
            </p>
            <Link
              href="#"
              className="group inline-flex items-center gap-2 mt-6 text-[13px] font-medium text-[var(--envato)] hover:text-white transition-colors"
            >
              <span className="group-hover:underline underline-offset-4">Explore all tools</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Right: 6 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href="#"
      aria-label={`${tool.name}, ${tool.pitch}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-[var(--ink)] rounded-md"
    >
      <Image
        src={tool.src}
        alt={tool.name}
        fill
        sizes="(min-width:1024px) 30vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      {/* Top-right open affordance */}
      <ArrowUpRight className="absolute top-4 right-4 size-4 text-[var(--envato)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />

      {/* Top-left tool name */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5">
        <Sparkles className="size-3 text-[var(--envato)]" />
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/95">
          {tool.name}
        </span>
      </div>

      {/* Bottom: pitch + models */}
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 flex flex-col gap-3">
        <div className="text-white font-display font-medium leading-[1.05] text-[20px] lg:text-[24px]">
          {tool.pitch}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tool.models.map((m) => (
            <span
              key={m}
              className="text-[10px] font-mono uppercase tracking-[0.14em] text-white border border-white/30 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
