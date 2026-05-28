"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as PhotoIcon,
  Music,
  Search,
} from "lucide-react";

/*
 * HeroV4 — split-screen hero.
 *   Left half  : headline + plain subhead + frosted search bar + trending row.
 *   Right half : the looping hero video.
 *   Mobile     : video stacks on top, content below.
 */

type Trend = { label: string; src: string };

const TRENDING: Trend[] = [
  { label: "Editorial portraits", src: "/v4/trend_01_editorial_portraits.jpg" },
  { label: "Cinematic Tokyo",     src: "/v4/trend_02_cinematic_tokyo.jpg" },
  { label: "Ambient scores",      src: "/v4/trend_03_ambient_scores.jpg" },
  { label: "Cinematic SFX",       src: "/v4/trend_04_cinematic_sfx.jpg" },
  { label: "Chrome 3D",           src: "/v4/trend_05_chrome_3d.jpg" },
  { label: "Brand systems",       src: "/v4/trend_06_brand_systems.jpg" },
  { label: "Display serifs",      src: "/v4/trend_07_display_serifs.jpg" },
  { label: "Promo intros",        src: "/v4/trend_08_promo_intros.jpg" },
  { label: "Dreamy brutalism",    src: "/v4/trend_09_dreamy_brutalism.jpg" },
  { label: "Halftone print",      src: "/v4/trend_10_halftone_print.jpg" },
];

const SEARCH_CATEGORIES = [
  "All Items",
  "Stock Video",
  "Video Templates",
  "Music",
  "Sound Effects",
  "Graphic Templates",
  "Graphics",
  "3D",
  "Presentation Templates",
  "Photos",
  "Fonts",
  "Add-ons",
];

export function HeroV4() {
  return (
    <section className="relative bg-[var(--hero)] text-white overflow-hidden">
      {/* Full viewport-width grid so the video on the right edges off to the
          viewport boundary on ultra-wide screens. The left column keeps the
          copy on a sane max-width, right-aligned next to the video. */}
      <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 min-h-[78svh] lg:min-h-[82svh]">
        {/* Mobile: video first, content second. lg+: content left, video right. */}
        <HeroContent />
        <HeroVideo />
      </div>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="order-2 lg:order-1 flex flex-col justify-center px-6 lg:px-12 xl:px-16 py-10 lg:py-16 lg:pr-16 xl:pr-24">
      <div
        className="max-w-[800px] w-full mx-auto lg:mx-0 lg:ml-auto animate-rise-in"
        style={{ animationDuration: "1100ms", animationDelay: "200ms" }}
      >
        <h1
          className="font-display tracking-display font-medium leading-[0.86] overflow-visible"
          style={{ filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.4))" }}
        >
          <span className="block text-[clamp(48px,6.2vw,132px)]">ESCAPE</span>
          <span className="block text-[clamp(48px,6.2vw,132px)]">THE</span>
          <span className="block italic text-[clamp(52px,6.7vw,144px)] text-gradient-brand pr-6 lg:pr-8">
            GENERIC.
          </span>
        </h1>

        <p className="mt-6 lg:mt-7 text-[15px] lg:text-[17px] leading-[1.45] text-white/85">
          Search taste. Create with confidence.
        </p>

        <div className="mt-6 lg:mt-7">
          <HeroSearchBar />
        </div>

        <TrendingRow />
      </div>
    </div>
  );
}

function TrendingRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(160, el.clientWidth * 0.6);
    el.scrollBy({ left: distance * dir, behavior: "smooth" });
  };

  return (
    <div className="mt-6 lg:mt-7">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">
          Trending searches
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Scroll trending left"
            className="cursor-pointer grid place-items-center h-7 w-7 rounded-full bg-white/8 border border-white/15 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/30 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Scroll trending right"
            className="cursor-pointer grid place-items-center h-7 w-7 rounded-full bg-white/8 border border-white/15 text-white/80 hover:bg-white/15 hover:text-white hover:border-white/30 transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.4} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-2.5 lg:gap-3 overflow-x-auto py-4 -my-4 scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {TRENDING.map((t) => (
          <TrendCard key={t.label} trend={t} />
        ))}
      </div>
    </div>
  );
}

function HeroVideo() {
  const [showFinal, setShowFinal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.currentTime = 0;
    } catch {
      /* metadata not ready */
    }
    const start = () => {
      v.play().catch(() => {
        /* autoplay blocked */
      });
    };
    if (v.readyState >= 2) start();
    else v.addEventListener("loadeddata", start, { once: true });
    return () => v.removeEventListener("loadeddata", start);
  }, []);

  return (
    <div className="order-1 lg:order-2 relative min-h-[40svh] sm:min-h-[48svh] lg:min-h-0 bg-black">
      <video
        ref={videoRef}
        poster="/v3/hero_v3_first_frame.jpg"
        muted
        playsInline
        autoPlay
        preload="auto"
        onEnded={() => setShowFinal(true)}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src="/v3/hero_v3_main.mp4" type="video/mp4" />
      </video>
      <Image
        src="/v3/hero_v3_main.jpg"
        alt=""
        fill
        sizes="(min-width:1024px) 50vw, 100vw"
        quality={92}
        className="object-cover object-center"
        style={{
          opacity: showFinal ? 1 : 0,
          transitionProperty: "opacity",
          transitionDuration: "1400ms",
          transitionTimingFunction: "cubic-bezier(0.45, 0, 0.25, 1)",
        }}
      />
      {/* Substantial left-edge feather so the dark left column melts into
          the video instead of butting up against a sharp seam. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 lg:w-48 xl:w-64 bg-gradient-to-r from-[var(--hero)] via-[var(--hero)]/55 to-transparent hidden lg:block" />
      {/* Soft top + bottom vignette tying the video tonally to the panel */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 lg:h-28 bg-gradient-to-b from-[var(--hero)]/65 to-transparent hidden lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 lg:h-28 bg-gradient-to-t from-[var(--hero)]/65 to-transparent hidden lg:block" />
    </div>
  );
}

function HeroSearchBar() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("All Items");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const placeholder =
    category === "All Items"
      ? "Search references, moods, styles…"
      : `Search ${category.toLowerCase()}`;

  return (
    <div ref={wrapRef} className="relative w-full">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center h-14 lg:h-[60px] rounded-full bg-white/10 backdrop-blur-2xl border border-white/25 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] px-2 transition-colors focus-within:bg-white/15 focus-within:border-white/40"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer shrink-0 inline-flex items-center gap-1.5 text-[12.5px] lg:text-[13.5px] font-semibold text-white px-3 py-2 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
        >
          {category}
          <ChevronDown
            className={`h-3.5 w-3.5 opacity-70 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={2.2}
          />
        </button>
        <span className="h-6 w-px bg-white/20 mx-0.5 shrink-0" aria-hidden />
        <Search
          className="h-4 w-4 text-white/65 ml-2 shrink-0"
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder={placeholder}
          aria-label="Search Envato library"
          className="flex-1 bg-transparent text-[13.5px] lg:text-[14.5px] text-white placeholder-white/45 outline-none ml-2 mr-1 min-w-0"
        />
        <button
          type="button"
          aria-label="Search by audio"
          className="cursor-pointer shrink-0 grid place-items-center h-9 w-9 lg:h-10 lg:w-10 rounded-full text-white/75 hover:text-white hover:bg-white/15 transition-colors"
        >
          <Music className="h-4 w-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Visual search by image"
          className="cursor-pointer shrink-0 grid place-items-center h-9 w-9 lg:h-10 lg:w-10 rounded-full text-white/75 hover:text-white hover:bg-white/15 transition-colors"
        >
          <PhotoIcon className="h-4 w-4" strokeWidth={2} />
        </button>
      </form>

      {open && (
        <div className="absolute z-50 left-0 top-full mt-2 w-60 bg-black/95 backdrop-blur-xl border border-white/15 rounded-2xl p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] max-h-[60vh] overflow-y-auto">
          {SEARCH_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setOpen(false);
              }}
              className={`cursor-pointer w-full text-left px-3 py-2 rounded-xl text-[13px] transition-colors flex items-center justify-between ${
                category === c
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{c}</span>
              {category === c && (
                <Check
                  className="h-3.5 w-3.5 text-[var(--envato)]"
                  strokeWidth={2.5}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TrendCard({ trend }: { trend: Trend }) {
  return (
    <Link
      href="#"
      className="group shrink-0 w-[96px] sm:w-[108px] lg:w-[116px]"
    >
      <div className="relative aspect-square rounded-md overflow-hidden ring-1 ring-white/10 group-hover:ring-[var(--envato)] group-hover:shadow-[var(--shadow-glow-primary)] transition-all">
        <Image
          src={trend.src}
          alt={trend.label}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>
      <div className="mt-2 text-[11px] lg:text-[11.5px] text-white/80 group-hover:text-white text-center px-0.5 leading-tight">
        {trend.label}
      </div>
    </Link>
  );
}
