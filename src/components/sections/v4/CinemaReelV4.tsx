"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

type Chapter = {
  title: string;
  creator: string;
  city: string;
  src: string;
};

/*
 * Full-bleed cinema reel.
 * Edge-to-edge, ~80vh on lg. Cinema bars top + bottom.
 * Horizontal auto-scroll marquee of finished pieces ("made with Envato"),
 * each labelled with chapter title + creator credit underneath in mono.
 * Placeholder assets reuse v3 story / collage shots; swap with real assets later.
 */

const CHAPTERS: Chapter[] = [
  { title: "Boutique Hotel Launch", creator: "@cool_lookin_bug", city: "Melbourne", src: "/v4/reel_01_hotel.jpg" },
  { title: "Indie Beauty Campaign", creator: "@Tapewarp.ai", city: "Sydney", src: "/v4/reel_02_beauty.jpg" },
  { title: "Festival Identity", creator: "@JosephMartin", city: "Berlin", src: "/v4/reel_03_festival.jpg" },
  { title: "Editorial Magazine Spread", creator: "@Rourke", city: "London", src: "/v4/reel_04_editorial.jpg" },
  { title: "Cinematic Short", creator: "@JamieFenn", city: "Tokyo", src: "/v4/reel_05_tokyo.jpg" },
  { title: "Botanical Macro Series", creator: "@studioMere", city: "Auckland", src: "/v4/reel_06_botanical.jpg" },
  { title: "Analog Romance", creator: "@papermill_co", city: "Lisbon", src: "/v4/reel_07_analog.jpg" },
  { title: "Neo-Brutalist Print", creator: "@hard_paper", city: "Brooklyn", src: "/v4/reel_08_brutalist.jpg" },
];

const REEL = [...CHAPTERS, ...CHAPTERS];

export function CinemaReelV4() {
  return (
    <section className="relative bg-black text-white overflow-hidden pb-20 lg:pb-28">
      {/* Section header */}
      <div
        className="mx-auto max-w-[1920px] px-6 lg:px-10 pt-20 lg:pt-28"
        style={{ paddingBottom: "var(--gap-text-lg)" }}
      >
        <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[60px]">
          Made by the{" "}
          <em className="italic text-gradient-brand">creator floor.</em>
        </h2>
        <p
          className="text-[14px] lg:text-[16px] leading-[1.5] text-white/65 lg:whitespace-nowrap"
          style={{ marginTop: "var(--gap-text-lg)" }}
        >
          See what creators are making with Envato. Browse styles, get inspired, share your own work.
        </p>
      </div>

      {/* Cinema bars + full-bleed marquee */}
      <div className="relative w-full">
        {/* Top cinema bar */}
        <div className="h-6 lg:h-10 bg-black" />

        {/* Marquee strip */}
        <div className="relative w-full overflow-hidden bg-[#070707]">
          <div className="flex w-max animate-cinema-scroll gap-3 lg:gap-4 py-4 lg:py-6">
            {REEL.map((c, i) => (
              <ReelFrame key={`${c.title}-${i}`} chapter={c} index={i} />
            ))}
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-40 bg-gradient-to-l from-black to-transparent" />
        </div>

        {/* Bottom cinema bar */}
        <div className="h-6 lg:h-10 bg-black" />
      </div>
    </section>
  );
}

function ReelFrame({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="group relative w-[68vw] sm:w-[44vw] lg:w-[34vw] aspect-[16/9] shrink-0 overflow-hidden bg-[#101010]">
      <Image
        src={chapter.src}
        alt={`${chapter.title} by ${chapter.creator}`}
        fill
        sizes="(min-width:1024px) 34vw, (min-width:640px) 44vw, 68vw"
        loading={index < 2 ? "eager" : "lazy"}
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

      {/* Top-left chapter tag */}
      <div className="absolute top-3 left-3 lg:top-4 lg:left-4 text-[9.5px] lg:text-[10px] font-mono uppercase tracking-[0.22em] text-white/85">
        Ch · {String(index + 1).padStart(2, "0")}
      </div>

      {/* Bottom-left title + credit */}
      <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="font-display text-[18px] lg:text-[22px] leading-[1.05] tracking-display font-medium truncate">
            {chapter.title}
          </div>
          <div className="mt-1 text-[10px] lg:text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/65 truncate">
            {chapter.creator} · {chapter.city}
          </div>
        </div>

        {/* Bottom-right "Generate This Style" — always visible, translucent */}
        <Link
          href="#"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 inline-flex items-center gap-1.5 bg-white/15 hover:bg-[var(--envato)] hover:text-[var(--ink)] backdrop-blur-md border border-white/25 text-white text-[11px] lg:text-[11.5px] font-semibold px-3 py-1.5 rounded-full transition-colors"
        >
          <Sparkles className="size-3" strokeWidth={2.2} />
          Generate This Style
        </Link>
      </div>
    </div>
  );
}
