"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

/*
 * Section 02 — proves the reference layer mechanism above the fold of the
 * scroll. Three reference stills on the left, a decoded "taste" panel in the
 * middle, an AI output on the right. Mirrors the CreativeFlowScrub story but
 * collapsed into a single static frame so it lands on the homepage without
 * scroll-driven choreography.
 */

const REFS = [
  { src: "/collage_silhouette.jpg", tag: "Cinematic", by: "Anya R." },
  { src: "/collage_wave.jpg",       tag: "Editorial", by: "Diego F." },
  { src: "/collage_eye.jpg",        tag: "Atmospheric", by: "Hannah L." },
];

const DECODED = [
  { label: "Palette", value: "#0a0a0a · #87E64B · #f6f2e8" },
  { label: "Motion",  value: "Long lens, hold beats" },
  { label: "Type",    value: "Editorial serif, 92pt" },
  { label: "Mood",    value: "Atmospheric, low key" },
];

export function ReferenceLayerDemo() {
  return (
    <section className="bg-[#0a0a0a] text-white py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-14">
          <h2 className="font-display tracking-display font-medium leading-[1.05] text-[36px] lg:text-[52px]">
            Your references become{" "}
            <em className="italic text-gradient-brand">the AI&apos;s instructions.</em>
          </h2>
          <p className="mt-6 text-white/70 text-[16px] lg:text-[18px] leading-[1.5] max-w-[920px]">
            Prompt-only AI guesses. With Envato, three references tell the model your palette, motion, type, and mood, before it generates a single frame.
          </p>
        </div>

        {/* The flow: refs → decoded → output */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1.15fr] gap-6 lg:gap-5 items-start">
          {/* 01 — References */}
          <FlowStepLabel num="01" text="You bring 3 references" />
          <div />
          <FlowStepLabel num="02" text="We decode taste" />
          <div />
          <FlowStepLabel num="03" text="AI generates in your range" />

          {/* References column */}
          <div className="space-y-3">
            {REFS.map((ref, i) => (
              <div key={ref.tag} className="relative aspect-[16/10] overflow-hidden ring-1 ring-white/12 bg-[#111]">
                <Image src={ref.src} alt={ref.tag} fill className="object-cover" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute top-2 right-2 grid place-items-center size-6 rounded-full bg-[var(--envato)] text-[10px] font-mono font-bold text-black shadow-[0_0_18px_rgba(135,230,75,0.55)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] bg-black/70 backdrop-blur-sm px-2 py-1 text-white">
                    {ref.tag}
                  </span>
                  <span className="text-[10px] text-white/70 truncate">by {ref.by}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <FlowArrow />

          {/* Decoded panel */}
          <div className="space-y-2.5">
            {DECODED.map((d) => (
              <div key={d.label} className="bg-white/[0.04] border border-white/10 px-4 py-3">
                <div className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-[var(--envato)]">
                  {d.label}
                </div>
                <div className="text-[13.5px] mt-1 font-medium text-white/92">{d.value}</div>
              </div>
            ))}
            <div className="mt-4 text-[11.5px] text-white/50 leading-relaxed">
              The same dimensions a creative director uses to brief a project. Decomposed automatically and held as your anchor through every step.
            </div>
          </div>

          {/* Arrow */}
          <FlowArrow />

          {/* AI output column */}
          <div>
            <div className="relative aspect-[3/4] overflow-hidden ring-1 ring-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-[#111]">
              <Image src="/hero_silhouette.jpg" alt="Generated output" fill className="object-cover" sizes="33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles className="size-3 text-[var(--envato)]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/85">
                    Routed to Veo 3.1
                  </span>
                </div>
                <div className="text-[15px] lg:text-[17px] font-medium leading-tight text-white">
                  First-pass output, already in your taste range.
                </div>
              </div>
            </div>
            {/* Compared-to strip */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
              <div className="border border-white/10 p-3 bg-white/[0.02]">
                <div className="font-mono uppercase tracking-[0.18em] text-white/45 mb-1 text-[9.5px]">
                  Prompt-only AI
                </div>
                <div className="text-white/75 leading-snug">
                  ~10 generations to land. Tokens spent on iteration.
                </div>
              </div>
              <div className="border border-[var(--envato)]/40 p-3 bg-[var(--envato)]/[0.06]">
                <div className="font-mono uppercase tracking-[0.18em] text-[var(--envato)] mb-1 text-[9.5px]">
                  Reference-conditioned
                </div>
                <div className="text-white leading-snug">First pass holds. Output stays you.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowStepLabel({ num, text }: { num: string; text: string }) {
  return (
    <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/45 mb-3 hidden lg:block">
      <span className="text-[var(--envato)]">{num}</span>
      <span className="text-white/25 mx-2">/</span>
      <span>{text}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center self-stretch pt-8">
      <ArrowRight className="size-5 text-white/30" />
    </div>
  );
}
