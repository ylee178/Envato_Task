"use client";

import { useEffect, useRef } from "react";
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

// One copy only: each chapter shows once. The auto-scroll ping-pongs
// between the two ends instead of looping so nothing duplicates on screen.
const REEL = CHAPTERS;

export function CinemaReelV4() {
  return (
    <section className="relative bg-black text-white overflow-hidden pb-20 lg:pb-28">
      {/* Section header. paddingBottom is the 40px gap into the carousel. */}
      <div
        className="mx-auto max-w-[1920px] px-6 lg:px-10 pt-20 lg:pt-28"
        style={{ paddingBottom: "var(--gap-asset-title)" }}
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

      <ReelMarquee />

      {/* Bottom cinema bar */}
      <div className="h-6 lg:h-10 bg-black" />
    </section>
  );
}

function ReelMarquee() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lastInteractionRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const dragRef = useRef<{ startX: number; startScroll: number; active: boolean }>(
    { startX: 0, startScroll: 0, active: false }
  );
  const draggedRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const PIXELS_PER_SECOND = 80;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const max = el.scrollWidth - el.clientWidth;
      if (max > 0) {
        const idleFor = now - lastInteractionRef.current;
        if (!reduced && idleFor > 1100) {
          el.scrollLeft += PIXELS_PER_SECOND * dt * directionRef.current;
        }
        // Ping-pong: reverse direction at each end so nothing repeats on screen.
        if (el.scrollLeft <= 0) {
          el.scrollLeft = 0;
          directionRef.current = 1;
        } else if (el.scrollLeft >= max) {
          el.scrollLeft = max;
          directionRef.current = -1;
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const noteInteraction = () => {
    lastInteractionRef.current = performance.now();
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    noteInteraction();
    const el = scrollerRef.current;
    if (!el) return;
    // Convert vertical wheel intent into horizontal scroll so wheel-mouse users
    // can move the reel. Trackpad horizontal gestures already produce deltaX
    // and scroll natively, so we only intercept dominant vertical wheels.
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 1) {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    noteInteraction();
    // Touch and pen use native overflow-x scrolling; only intercept mouse.
    if (e.pointerType !== "mouse") return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      startX: e.clientX,
      startScroll: el.scrollLeft,
      active: true,
    };
    draggedRef.current = false;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) draggedRef.current = true;
    el.scrollLeft = dragRef.current.startScroll - dx;
    noteInteraction();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const el = scrollerRef.current;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  };

  // Swallow the click that fires immediately after a drag so we don't trigger
  // the card link the reader was using as a handle.
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      draggedRef.current = false;
    }
  };

  return (
    <div
      ref={scrollerRef}
      onWheel={onWheel}
      onTouchStart={noteInteraction}
      onTouchMove={noteInteraction}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={onClickCapture}
      className="relative w-full overflow-x-auto overflow-y-hidden bg-[#070707] overscroll-x-contain cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
    >
      <div className="flex w-max gap-3 lg:gap-4 py-4 lg:py-6">
        {REEL.map((c, i) => (
          <ReelFrame key={`${c.title}-${i}`} chapter={c} index={i} />
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 lg:w-40 bg-gradient-to-l from-black to-transparent" />
    </div>
  );
}

function ReelFrame({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="group relative w-[68vw] sm:w-[44vw] lg:w-[34vw] aspect-[16/9] shrink-0 overflow-hidden rounded-md bg-[var(--surface-dark-card)] ring-1 ring-white/5 hover:ring-2 hover:ring-[var(--envato)] hover:shadow-[var(--shadow-glow-primary-strong)] transition-all duration-300">
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
