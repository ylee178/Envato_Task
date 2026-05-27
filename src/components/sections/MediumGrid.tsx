"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight } from "lucide-react";

/*
 * Section 03 — Envato AI capabilities. Higgsfield-competitive visual cards.
 * Each card shows: (1) a big sample output as background, (2) the Envato AI
 * tool name as the anchor, (3) the frontier model(s) the tool routes to as
 * pill badges. Bottom strip features Claude/ChatGPT/Gemini MCP integration —
 * the bridge that makes Envato usable inside the AI assistants the audience
 * already uses.
 */

type Tool = {
  /** Envato tool name (real product per Nov 2025 launch) */
  name: string;
  /** Frontier models the tool routes to or wraps */
  models: string[];
  /** Single-line value statement */
  pitch: string;
  /** Background sample image */
  src: string;
  /** Grid emphasis. `wide` makes the card take 2 cols on lg. */
  span?: "wide" | "tall" | "normal";
};

const TOOLS: Tool[] = [
  {
    name: "VideoGen",
    models: ["Veo 3.1", "Sora 2", "Kling 3.0"],
    pitch: "Cinematic 4K shots in your taste range.",
    src: "/hero_silhouette.jpg",
  },
  {
    name: "ImageGen",
    models: ["Nano Banana Pro", "Imagen 3", "Flux Pro"],
    pitch: "Editorial stills from three references.",
    src: "/hero_purple.jpg",
  },
  {
    name: "ImageEdit",
    models: ["Magnific"],
    pitch: "Upscale and refine without losing the soul.",
    src: "/hero_eye.jpg",
  },
  {
    name: "MusicGen",
    models: ["Suno", "Udio"],
    pitch: "Score that fits your edit, not the algorithm.",
    src: "/hero_wave.jpg",
  },
  {
    name: "VoiceGen",
    models: ["ElevenLabs"],
    pitch: "Studio-grade voiceovers, any tone.",
    src: "/hero_frame_opening.jpg",
  },
  {
    name: "MockupGen",
    models: ["Envato Studio"],
    pitch: "Product shots without a shoot.",
    src: "/card_boldmoves.jpg",
  },
];

export function MediumGrid() {
  return (
    <section className="bg-[var(--bg)] py-20 lg:py-28 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Header */}
        <div className="mb-12 max-w-[900px]">
          <h2 className="font-display text-[36px] lg:text-[56px] tracking-display font-medium leading-[1.0]">
            Every model in the room.{" "}
            <em className="italic text-gradient-brand-deep">Routed for you.</em>
          </h2>
          <p className="mt-5 text-[var(--muted-ink)] text-[15px] lg:text-[17px] leading-[1.5] max-w-[720px]">
            One subscription wraps the best AI models in each category. Your references go in. Veo, Magnific, Nano Banana Pro, Suno do the work. You never pick a tool again.
          </p>
        </div>

        {/* Asymmetric card grid: first card spans 2 cols on lg, rest 1 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TOOLS.map((t) => (
            <ToolCard key={t.name} tool={t} />
          ))}
        </div>

        {/* Claude / ChatGPT / Gemini MCP banner */}
        <ClaudeMcpBanner />
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const spanClass =
    tool.span === "wide"
      ? "lg:col-span-2 lg:aspect-[16/9]"
      : "aspect-[4/5]";

  return (
    <Link
      href="#"
      aria-label={`${tool.name} — ${tool.pitch}`}
      className={`group relative block overflow-hidden bg-[var(--ink)] ${spanClass}`}
    >
      <Image
        src={tool.src}
        alt={tool.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={tool.span === "wide" ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 50vw"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      {/* Top-right "open" affordance */}
      <ArrowUpRight className="absolute top-4 right-4 size-4 text-white/65 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />

      {/* Tool name badge top-left */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5">
        <Sparkles className="size-3 text-[var(--envato)]" />
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/95">
          {tool.name}
        </span>
      </div>

      {/* Bottom block: pitch + model badges */}
      <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6 flex flex-col gap-3">
        <div className="text-white font-display font-medium leading-[1.05] text-[22px] lg:text-[28px] max-w-[460px]">
          {tool.pitch}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tool.models.map((m) => (
            <span
              key={m}
              className="text-[10px] font-mono uppercase tracking-[0.14em] text-white border border-white/30 px-2 py-0.5 rounded-full bg-white/8 backdrop-blur-sm"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ClaudeMcpBanner() {
  return (
    <div className="mt-3 relative overflow-hidden bg-[var(--ink)] text-white p-6 lg:p-8">
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(135,230,75,0.18),transparent_55%)] pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="max-w-[640px]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[var(--envato)]">
              Now via MCP
            </span>
            <span className="flex items-center gap-1.5">
              <AssistantPill label="Claude" />
              <AssistantPill label="ChatGPT" />
              <AssistantPill label="Gemini" />
            </span>
          </div>
          <div className="font-display text-[24px] lg:text-[32px] font-medium leading-[1.1]">
            Use Envato inside Claude, ChatGPT, and Gemini.
          </div>
          <div className="text-[13.5px] text-white/70 mt-2 leading-snug">
            Real-time, structured asset and AI access from any assistant. No tab switching, no
            re-uploads. The reference layer becomes a tool your AI already knows about.
          </div>
        </div>
        <Link
          href="#"
          className="inline-flex items-center gap-2 self-start md:self-auto px-6 py-3 bg-[var(--envato)] text-black font-semibold text-[13px] rounded-full hover:bg-white transition-colors shrink-0"
        >
          Connect MCP <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function AssistantPill({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-mono uppercase tracking-[0.14em] border border-white/25 bg-white/5 backdrop-blur-sm px-2 py-0.5 rounded-full text-white/90">
      {label}
    </span>
  );
}
