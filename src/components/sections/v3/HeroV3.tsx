"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*
 * Single-clip hero (mirrors HeroV2 logic):
 *   - hero_v3_main.mp4 autoplays once from start to end (~4s)
 *   - On ended, the watermarked last frame fades into hero_v3_main.jpg
 *     so the resting state is the sharp, unbranded collage.
 *   - A page refresh re-mounts the component → video plays again.
 */

const FINAL_FADE_MS = 1400;

export function HeroV3() {
  const [showFinal, setShowFinal] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative isolate bg-[var(--hero)] text-[var(--hero-ink)] overflow-hidden">
      <HeroV3Stage
        videoRef={videoRef}
        showFinal={showFinal}
        onEnded={() => setShowFinal(true)}
      />

      {/* Scrims so left-side copy stays readable over the collage */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--hero)]/78 via-[var(--hero)]/35 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--hero)]/62 via-[var(--hero)]/12 to-[var(--hero)]/25" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-10 pt-24 lg:pt-28 pb-20 lg:pb-28 flex items-center min-h-[92svh]">
        <div className="relative z-10 max-w-[760px]">
          <h1
            className="font-display tracking-display font-medium leading-[0.86]"
            style={{ filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5)) drop-shadow(0 8px 28px rgba(0,0,0,0.35))" }}
          >
            <span
              className="block text-[clamp(60px,10.5vw,164px)] animate-rise-in"
              style={{ animationDuration: "1500ms", animationDelay: "500ms" }}
            >
              ESCAPE
            </span>
            <span
              className="block text-[clamp(60px,10.5vw,164px)] animate-rise-in"
              style={{ animationDuration: "1500ms", animationDelay: "800ms" }}
            >
              THE
            </span>
            <span
              className="block animate-rise-in"
              style={{ animationDuration: "1500ms", animationDelay: "1100ms" }}
            >
              <span className="inline-block text-[clamp(68px,11.5vw,180px)] italic text-white">
                GENERIC.
              </span>
            </span>
          </h1>

          <p
            className="text-[16px] lg:text-[18px] leading-[1.4] text-white/85 animate-rise-in"
            style={{ animationDuration: "1500ms", animationDelay: "1700ms", marginTop: "var(--gap-text-lg)" }}
          >
            Pick{" "}
            <span
              className="font-semibold text-white animate-highlight-draw"
              style={{
                backgroundImage:
                  "linear-gradient(to top, var(--envato) 0%, var(--envato) 20%, transparent 20%, transparent 100%)",
                padding: "0 4px",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                animationDuration: "1400ms",
                animationDelay: "2800ms",
              }}
            >
              references, not prompts
            </span>
            . AI generates with your taste.
          </p>

          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-3 animate-rise-in"
            style={{ animationDuration: "1500ms", animationDelay: "2400ms", marginTop: "var(--gap-asset-title)" }}
          >
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center bg-[var(--envato)] text-[var(--ink)] hover:bg-[var(--envato-deep)] hover:text-white px-7 py-4 rounded-full font-semibold text-[14px] transition-colors"
            >
              Go Unlimited
            </Link>
            <Link
              href="/creative-flow"
              className="inline-flex items-center justify-center border border-white/40 bg-transparent text-white hover:bg-[var(--envato)]/15 hover:border-[var(--envato)] hover:text-[var(--envato)] px-7 py-4 rounded-full font-semibold text-[14px] transition-colors"
            >
              See How It Works
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

function HeroV3Stage({
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
      <div className="absolute inset-0">
        {/* Hero video plays once, fades to the clean still on ended */}
        <video
          ref={videoRef}
          poster="/v3/hero_v3_main.jpg"
          muted
          playsInline
          autoPlay
          preload="auto"
          onEnded={onEnded}
          className="absolute inset-0 w-full h-full object-cover object-right"
        >
          <source src="/v3/hero_v3_main.mp4" type="video/mp4" />
        </video>

        {/* Clean, unbranded final image fades in once the video ends */}
        <Image
          src="/v3/hero_v3_main.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={92}
          className="object-cover object-right"
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
