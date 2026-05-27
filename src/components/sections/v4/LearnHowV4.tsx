"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

/*
 * Tutorial row — 4 verified Envato Tuts+ workflows + a 5th "Browse All"
 * CTA card. Single row, no auto-scroll. Each card carries a cinematic
 * cover still and the actual workflow metadata.
 */

type Tutorial = {
  badge: string;
  title: string;
  duration: string;
  src: string;
};

const TUTORIALS: Tutorial[] = [
  {
    badge: "Envato AI Stack",
    title: "From Idea to Publish: Full AI Video Workflow",
    duration: "45 min",
    src: "/v4/tuto_01_aistack.jpg",
  },
  {
    badge: "Reference Studio",
    title: "AI Posters from Reference Images",
    duration: "20 min",
    src: "/v4/tuto_02_imagegen.jpg",
  },
  {
    badge: "Cinema Studio",
    title: "Consistent AI Characters with Reference Sheets",
    duration: "30 min",
    src: "/v4/tuto_03_character.jpg",
  },
  {
    badge: "Cinema Studio + After Effects",
    title: "Cinematic AI Video Effects on Any Budget",
    duration: "35 min",
    src: "/v4/tuto_04_aftereffects.jpg",
  },
];

export function LearnHowV4() {
  return (
    <section
      className="relative bg-[var(--bg)] text-[var(--ink)] overflow-hidden border-t border-[var(--line)]"
      style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--space-24)" }}
    >
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10">
        {/* Header */}
        <div style={{ marginBottom: "var(--gap-asset-title)" }}>
          <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[60px] text-[var(--ink)]">
            Learn how{" "}
            <em className="italic text-gradient-brand-deep">it&apos;s made.</em>
          </h2>
          <p
            className="text-[14px] lg:text-[16px] leading-[1.5] text-[var(--muted-ink)] lg:whitespace-nowrap"
            style={{ marginTop: "var(--gap-text-lg)" }}
          >
            Real Envato Tuts+ workflows from working AI creators. All free.
          </p>
        </div>

        {/* Single row — 4 tutorials + Browse All CTA card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {TUTORIALS.map((t) => (
            <TutorialCard key={t.title} tutorial={t} />
          ))}
          <BrowseAllCard />
        </div>
      </div>
    </section>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <a
      href="#"
      aria-label={`${tutorial.title}, ${tutorial.duration}`}
      className="group relative block aspect-[3/4] overflow-hidden bg-[#101010] rounded-md ring-1 ring-[var(--line)]"
    >
      <Image
        src={tutorial.src}
        alt={tutorial.title}
        fill
        sizes="(min-width:1024px) 20vw, (min-width:640px) 45vw, 100vw"
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <span className="absolute top-3 left-3 lg:top-4 lg:left-4 inline-flex items-center text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-md bg-[var(--envato)] text-[var(--ink)]">
        {tutorial.badge}
      </span>

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="grid place-items-center size-11 rounded-full bg-black/85 backdrop-blur-sm border border-white/20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <Play className="size-4 text-white fill-white translate-x-[1px]" strokeWidth={0} />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
        <div className="font-display text-[16px] lg:text-[18px] leading-[1.15] tracking-display font-medium text-white">
          {tutorial.title}
        </div>
        <div className="mt-1 text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/65">
          {tutorial.duration} · Free
        </div>
      </div>
    </a>
  );
}

function BrowseAllCard() {
  return (
    <Link
      href="#"
      aria-label="Browse all tutorials"
      className="group relative block aspect-[3/4] overflow-hidden bg-[#101010] rounded-md ring-1 ring-[var(--line)]"
    >
      <Image
        src="/v3/moodboard_collage.jpg"
        alt=""
        fill
        sizes="(min-width:1024px) 20vw, (min-width:640px) 45vw, 100vw"
        className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

      <span className="absolute top-3 left-3 lg:top-4 lg:left-4 inline-flex items-center text-[10px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 rounded-md bg-[var(--envato)] text-[var(--ink)]">
        Envato Tuts+
      </span>

      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="grid place-items-center size-11 rounded-full bg-black/85 backdrop-blur-sm border border-white/20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <ArrowRight className="size-4 text-white" strokeWidth={2.2} />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
        <div className="font-display text-[16px] lg:text-[18px] leading-[1.15] tracking-display font-medium text-white">
          Browse All Tutorials
        </div>
        <div className="mt-1 text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/65">
          1,000+ free workflows
        </div>
      </div>
    </Link>
  );
}
