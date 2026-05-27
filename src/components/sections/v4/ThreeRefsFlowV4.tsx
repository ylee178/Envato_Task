"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointerClick, Sparkles, CircleCheck } from "lucide-react";

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
    <section className="bg-[var(--hero)] text-white py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10">
        {/* Title + subtext, single-line each, no eyebrow */}
        <div style={{ marginBottom: "var(--gap-asset-title)" }}>
          <h2 className="font-display tracking-display font-medium leading-[1.0] text-[34px] md:text-[44px] lg:text-[54px] lg:whitespace-nowrap">
            Your references become{" "}
            <em className="italic text-gradient-brand">the AI&apos;s instructions.</em>
          </h2>
          <p
            className="text-[13px] md:text-[14.5px] lg:text-[16px] leading-[1.45] text-white/65 lg:whitespace-nowrap"
            style={{ marginTop: "var(--gap-text-lg)" }}
          >
            Prompt-only AI guesses. With Envato, three references tell the model your palette, motion, type, and mood before it generates a single frame.
          </p>
        </div>

        {/* Big looping video. From lg+, step cards live inside at the bottom.
            On mobile they stack BELOW the video so the 16:9 frame stays clean. */}
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

          {/* Bottom darkening so cards inside the video stay legible (lg+) */}
          <div className="pointer-events-none hidden lg:block absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Step cards INSIDE video — lg+ only */}
          <div className="hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
            <div
              className="grid grid-cols-3 w-full"
              style={{
                maxWidth: 1280,
                padding: "0 var(--space-10) var(--space-10) var(--space-10)",
                gap: "var(--space-6)",
              }}
            >
              {STEPS.map((step, i) => (
                <StepCard key={step.num} step={step} active={active === i} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile step cards — stack BELOW the video, no clipping risk */}
        <div
          className="lg:hidden grid grid-cols-1 sm:grid-cols-3"
          style={{ marginTop: "var(--space-6)", gap: "var(--space-3)" }}
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} active={active === i} />
          ))}
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
        gap: "var(--gap-text-sm)",
      }}
    >
      <div
        className={`text-[10px] font-mono uppercase tracking-[0.22em] transition-colors ${
          active ? "text-[var(--envato)]" : "text-white/55"
        }`}
      >
        Step {step.num}
      </div>
      <div className="flex items-center gap-3">
        <Icon
          className="size-7 lg:size-8 shrink-0 text-[var(--envato)]"
          strokeWidth={1.8}
        />
        <div className="font-display tracking-display font-medium text-[15px] lg:text-[18px] leading-[1.15] text-white whitespace-nowrap">
          {step.label}
        </div>
      </div>
    </div>
  );
}
