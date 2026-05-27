"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Play, Heart, MessageCircle, BadgeCheck } from "lucide-react";

type Pick = {
  /** Meme-style caption shown over the still, like a Reel's stuck text */
  caption: string;
  /** Creator IG handle, no @ */
  handle: string;
  /** Display name shown next to the handle */
  name: string;
  /** Like count display, kept as a string so we can render "1.2k" etc. */
  likes: string;
  /** Comment count display */
  comments: string;
  /** Envato AI tools the creator chained for this piece. Surfaced as small
      pills above the @handle so the audience sees the tool combo behind the
      reel — answers "which Envato tools made this?" without a click. */
  tools: string[];
  cat: "Video" | "Audio" | "Graphics" | "Templates" | "3D" | "Photos";
  src: string;
};

const PICKS: Pick[] = [
  { caption: "Stop editing to the beat 😏",        handle: "michaelfbarker", name: "Michael Barker",   likes: "196",  comments: "17", tools: ["VideoGen", "MusicGen"],                cat: "Video",     src: "/creator_night_drive.png" },
  { caption: "Everyone's brand looks the same",    handle: "_alexpillow",    name: "Alex Pillow",      likes: "126",  comments: "5",  tools: ["ImageGen", "Nano Banana Pro"],         cat: "Graphics",  src: "/creator_kinetic_typography.png" },
  { caption: "Create a brand identity with Envato",handle: "saraplaysrec",   name: "Sara, designer",   likes: "243",  comments: "11", tools: ["MockupGen", "GraphicsGen"],            cat: "Templates", src: "/creator_documentary.png" },
  { caption: "Scored my edit in 60 seconds",       handle: "sonic.studio",   name: "Sonic Studio",     likes: "312",  comments: "24", tools: ["MusicGen", "Suno"],                    cat: "Audio",     src: "/creator_ambient_future.png" },
  { caption: "Why your photos look 'stock'",       handle: "pixelperfect",   name: "Pixel Perfect",    likes: "89",   comments: "8",  tools: ["ImageGen", "Magnific"],                cat: "Photos",    src: "/creator_architectural.png" },
  { caption: "The drone shot that earns the cut",  handle: "marinerstudio",  name: "Mariner Studio",   likes: "421",  comments: "39", tools: ["VideoGen", "Veo 3.1"],                 cat: "Video",     src: "/creator_untamed_waves.png" },
];

const TABS = ["All", "Video", "Audio", "Graphics", "Templates", "3D", "Photos"] as const;

export function CreatorGrid() {
  const [active, setActive] = useState<(typeof TABS)[number]>("All");
  const filtered = active === "All" ? PICKS : PICKS.filter((p) => p.cat === active);

  return (
    <section className="bg-[var(--bg)] py-20 lg:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Head */}
        <div className="flex items-end justify-between gap-6 mb-8">
          <div className="max-w-[900px]">
            <h2 className="font-display text-[36px] lg:text-[52px] tracking-display font-medium leading-[1.02]">
              Made with Envato,{" "}
              <em className="italic text-gradient-brand-deep">by real creators.</em>
            </h2>
          </div>
          <a href="#" className="group hidden md:inline-flex items-center gap-2 text-[13px] font-medium hover:text-[var(--envato-deep)] transition-colors shrink-0">
            <span className="group-hover:underline underline-offset-4">See more reels</span>
            <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`shrink-0 px-4 py-1.5 text-[13px] font-medium transition-colors rounded-full border ${
                active === t
                  ? "bg-[var(--bg)] text-[var(--ink)] border-[var(--ink)]"
                  : "bg-transparent text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--bg)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Vertical card grid with arrows */}
        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {filtered.slice(0, 5).map((p) => (
              <CreatorCard key={p.handle + p.caption} pick={p} />
            ))}
          </div>

          {/* Carousel arrows */}
          <button className="hidden md:grid place-items-center absolute -left-12 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink)] transition-colors">
            <ArrowLeft className="size-4" />
          </button>
          <button className="hidden md:grid place-items-center absolute -right-12 top-1/2 -translate-y-1/2 size-10 rounded-full bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink)] transition-colors">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CreatorCard({ pick }: { pick: Pick }) {
  return (
    <a
      href="#"
      aria-label={`Watch ${pick.name}: ${pick.caption}`}
      className="group block relative aspect-[3/4] overflow-hidden bg-[var(--ink)] shadow-sm hover:shadow-xl transition-shadow"
    >
      <Image
        src={pick.src}
        alt={pick.caption}
        fill
        sizes="(min-width:1024px) 20vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />

      {/* Light scrims top + bottom so the meme caption and footer meta read
          cleanly without fully blacking out the creator behind the still. */}
      <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/55 via-black/15 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

      {/* Top-left envato brand mark, the lime square seen on real Envato reels */}
      <div className="absolute top-3 left-3 z-10">
        <span className="grid place-items-center size-6 rounded-[5px] bg-[var(--envato)] shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 17 L11 5 L13 11 L19 7 L13 19 Z" fill="#0a0a0a" />
          </svg>
        </span>
      </div>

      {/* Meme-style caption stuck near the top, bold sans on a translucent
          dark pill so it reads on any background image. Matches the look of
          Reels/TikTok stuck text. */}
      <div className="absolute top-3 left-12 right-3 z-10">
        <span
          className="inline-block text-white font-extrabold leading-[1.15] tracking-tight bg-black/65 backdrop-blur-[2px] px-2 py-1.5 rounded-[3px]"
          style={{
            fontSize: "clamp(11px, 1.05vw, 14px)",
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
        >
          {pick.caption}
        </span>
      </div>

      {/* Black overlay play button, centered. Slightly grows on hover. */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="grid place-items-center size-12 lg:size-14 rounded-full bg-black/80 backdrop-blur-sm border border-white/15 shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-black/90">
          <Play className="size-4 lg:size-5 text-white fill-white translate-x-[1px]" strokeWidth={0} />
        </span>
      </div>

      {/* Tool-combo strip — answers "which Envato tools made this?" without a click */}
      <div className="absolute inset-x-3 bottom-12 z-10 flex flex-wrap gap-1">
        {pick.tools.map((tool) => (
          <span
            key={tool}
            className="text-[9px] font-mono uppercase tracking-[0.14em] text-white bg-black/65 backdrop-blur-sm border border-white/15 px-1.5 py-0.5 rounded-sm"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Bottom strip: @handle + verified tick on the left, engagement on the right */}
      <div className="absolute inset-x-0 bottom-0 p-3 z-10 flex items-end justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="grid place-items-center size-5 rounded-full bg-[var(--envato)] shrink-0">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 17 L11 5 L13 11 L19 7 L13 19 Z" fill="#0a0a0a" />
            </svg>
          </span>
          <span className="flex items-center gap-0.5 text-white text-[11.5px] font-semibold truncate">
            <span className="truncate">@{pick.handle}</span>
            <BadgeCheck className="size-3 text-white/95 fill-[var(--envato)] shrink-0" strokeWidth={2} />
          </span>
        </div>
        <div className="flex items-center gap-2 text-white shrink-0">
          <span className="flex items-center gap-0.5 text-[10.5px] font-medium">
            <Heart className="size-3.5" strokeWidth={2.2} />
            {pick.likes}
          </span>
          <span className="flex items-center gap-0.5 text-[10.5px] font-medium">
            <MessageCircle className="size-3.5" strokeWidth={2.2} />
            {pick.comments}
          </span>
        </div>
      </div>
    </a>
  );
}
