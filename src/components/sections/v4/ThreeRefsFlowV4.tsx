"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MousePointerClick, Sparkles, CircleCheck, ArrowRight } from "lucide-react";

type LucideIcon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

/*
 * Mechanism — Your references become the AI's instructions.
 *
 * One big looping video. THREE step cards sit INSIDE the video at the
 * bottom on lg+, stack BELOW the video on mobile (so the 16:9 frame
 * doesn't clip them). The active card highlights as the video crosses
 * its matching third.
 */

type Step = {
  num: number;
  label: string;
  Icon: LucideIcon;
};

const STEPS: Step[] = [
  { num: 1, label: "Pick references",                Icon: MousePointerClick },
  { num: 2, label: "AI generates in your direction", Icon: Sparkles },
  { num: 3, label: "Refine and ship",                Icon: CircleCheck },
];

export function ThreeRefsFlowV4() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const tick = () => {
      const dur = v.duration;
      if (dur && !Number.isNaN(dur)) {
        // wrap with modulo so progress always loops 0 → 1, even if the
        // browser stalls timeupdate after the video loops
        const progress = (v.currentTime % dur) / dur;
        const idx = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
        setActive((prev) => (prev === idx ? prev : idx));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="bg-[var(--hero)] text-white py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* LEFT: video + steps. order-2 on mobile so the title reads first. */}
          <div className="order-2 lg:order-1">
            <div
              className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-dark-frame)] ring-1 ring-white/5"
              style={{ borderRadius: "var(--radius-card)" }}
            >
              <video
                ref={videoRef}
                poster="/v4/mechanism_flow_poster.jpg"
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              >
                <source src="/v4/mechanism_flow.mp4" type="video/mp4" />
              </video>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3"
              style={{ marginTop: "var(--space-4)", gap: "var(--space-3)" }}
            >
              {STEPS.map((step, i) => (
                <StepCard key={step.num} step={step} active={active === i} />
              ))}
            </div>
          </div>

          {/* RIGHT: title + subtext. Title scales up so its block of text
              roughly fills the height of the video on lg+. No forced line
              breaks; the headline simply wraps to the column width. */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display tracking-display font-medium leading-[1.05] text-[36px] md:text-[48px] lg:text-[56px] xl:text-[64px] pr-4 lg:pr-6 xl:pr-8 overflow-visible">
              Your references become{" "}
              <em className="italic text-gradient-brand inline-block pr-3 lg:pr-4 xl:pr-6">the AI&apos;s instructions.</em>
            </h2>
            <p
              className="text-[14px] lg:text-[15px] xl:text-[16px] leading-[1.55] text-white/65"
              style={{ marginTop: "var(--gap-text-lg)" }}
            >
              Prompt-only AI guesses. With Envato, three references tell the model your palette, motion, type, and mood before it generates a single frame.
            </p>
            <div style={{ marginTop: "var(--gap-text-lg)" }}>
              <Link
                href="/creative-flow"
                className="group inline-flex items-center gap-2 border border-white/40 bg-transparent text-white hover:bg-[var(--envato)]/15 hover:border-[var(--envato)] hover:text-[var(--envato)] px-6 py-3 rounded-full font-semibold text-[14px] transition-colors"
              >
                See How It Works
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.2}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, active }: { step: Step; active: boolean }) {
  const { Icon } = step;
  return (
    <div
      className={`backdrop-blur-md transition-all duration-500 ease-out flex flex-col ${
        active
          ? "bg-[var(--envato)]/15 shadow-[var(--shadow-glow-soft-drop)] ray-border"
          : "bg-black/35 ring-1 ring-white/10"
      }`}
      style={{
        padding: "var(--space-4) var(--space-5)",
        borderRadius: "var(--radius-card)",
        gap: "4px",
      }}
    >
      <div
        className={`text-[10px] font-mono uppercase tracking-[0.22em] transition-colors ${
          active ? "text-[var(--envato)]" : "text-white/55"
        }`}
      >
        Step {step.num}
      </div>
      <div className="flex items-center gap-3 flex-1">
        <Icon
          className="size-7 lg:size-8 shrink-0 text-[var(--envato)]"
          strokeWidth={1.8}
        />
        <div className="font-display tracking-display font-medium text-[15px] lg:text-[18px] leading-[1.15] text-white min-w-0">
          {step.label}
        </div>
      </div>
    </div>
  );
}
