"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*
 * Single-clip hero:
 *   - hero_v2_main.mp4 plays once from start to end (10s)
 *   - On ended, the watermarked last frame fades into hero_v2_final.jpg
 *     so the resting state is the sharp, unbranded collage.
 *   - A page refresh re-mounts the component → video plays again.
 */

const FINAL_FADE_MS = 1400;

export function HeroV2() {
  const [showFinal, setShowFinal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative isolate bg-[var(--hero)] text-[var(--hero-ink)] overflow-hidden">
      <HeroV2Stage
        videoRef={videoRef}
        showFinal={showFinal}
        onEnded={() => setShowFinal(true)}
      />

      {/* Scrims for headline legibility — balanced between video read-through and text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--hero)]/80 via-[var(--hero)]/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--hero)]/72 via-[var(--hero)]/20 to-[var(--hero)]/35" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10 pt-24 lg:pt-28 pb-16 lg:pb-24 flex items-center min-h-[92svh]">
        <div className="relative z-10 max-w-[640px]">
          <h1 className="font-display tracking-display font-medium leading-[0.86]">
            <span className="block text-[clamp(60px,10.5vw,164px)] animate-rise-in">ESCAPE</span>
            <span className="block text-[clamp(60px,10.5vw,164px)] animate-rise-in delay-100">THE</span>
            <span className="block animate-rise-in delay-200">
              <span className="inline-block text-[clamp(68px,11.5vw,180px)] italic text-gradient-brand animate-glow-pulse">
                GENERIC.
              </span>
            </span>
          </h1>

          <p className="mt-7 text-[16px] lg:text-[18px] leading-[1.4] text-white/85 animate-rise-in delay-400">
            Pick a few references. We match the rest to your taste. You ship.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 animate-rise-in delay-500">
            <Link
              href="/creative-flow"
              className="inline-flex items-center justify-center border border-[var(--envato)] bg-transparent text-white hover:bg-[var(--envato)] hover:text-[var(--ink)] px-7 py-4 rounded-full font-semibold text-[14px] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center bg-[var(--envato)] text-[var(--ink)] hover:bg-[var(--envato-deep)] hover:text-white px-7 py-4 rounded-full font-semibold text-[14px] transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}

function HeroV2Stage({
  videoRef,
  showFinal,
  onEnded,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showFinal: boolean;
  onEnded: () => void;
}) {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-[var(--hero)]">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "max(100vw, calc(100vh * 1.5))",
          aspectRatio: "3 / 2",
        }}
      >
        {/* Single hero video — plays once, freezes on last frame underneath */}
        <video
          ref={videoRef}
          poster="/hero_v2_main_start.jpg"
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={onEnded}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero_v2_main.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
          <source src="/hero_v2_main.h264.mp4" type="video/mp4" />
        </video>

        {/* Sharp, unbranded final image — fades in once the video ends */}
        <Image
          src="/hero_v2_final.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={92}
          className="object-cover"
          style={{
            opacity: showFinal ? 1 : 0,
            transitionProperty: "opacity",
            transitionDuration: `${FINAL_FADE_MS}ms`,
            transitionTimingFunction: "cubic-bezier(0.45, 0, 0.25, 1)",
          }}
        />
      </div>
    </div>
  );
}

