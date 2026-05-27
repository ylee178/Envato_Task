import { Fragment } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    num: "01",
    label: "Pick references",
    visual: "image" as const,
    src: "/v3/flow_01_refs.jpg",
    alt: "Four reference stills",
  },
  {
    num: "02",
    label: "AI decodes your taste",
    visual: "orb" as const,
  },
  {
    num: "03",
    label: "Multiple models generate",
    visual: "image" as const,
    src: "/v3/flow_03_generate.jpg",
    alt: "Four generated outputs",
  },
  {
    num: "04",
    label: "Refine and ship",
    visual: "final" as const,
  },
];

const REFINEMENT_KNOBS = ["Color", "Contrast", "Motion", "Mood"];

export function ThreeRefsFlow() {
  return (
    <section className="bg-[var(--hero)] text-white py-24 lg:py-32 border-t border-white/5">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-14 items-start">
          {/* Left header column */}
          <div>
            <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[56px]">
              From three references,
              <br />
              <em className="italic text-gradient-brand">one creation.</em>
            </h2>

            {/* Handwritten note + curved arrow */}
            <div className="mt-8 relative">
              <span
                className="block text-[var(--envato)] leading-tight"
                style={{ fontFamily: "Caveat, 'Brush Script MT', cursive", fontSize: 26 }}
              >
                Your references become the AI&apos;s instructions.
              </span>
              <svg
                viewBox="0 0 120 60"
                className="mt-2 ml-2 w-[120px] text-[var(--envato)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 8 C 30 32, 70 48, 110 40" />
                <path d="M100 32 L 110 40 L 100 48" />
              </svg>
            </div>
          </div>

          {/* Right side: 4 step flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1.1fr] gap-4 lg:gap-3 items-start">
            {STEPS.map((step, i) => (
              <Fragment key={step.num}>
                <StepBlock step={step} />
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center pt-12">
                    <ArrowRight className="size-5 text-[var(--envato)]" strokeWidth={2} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Step = (typeof STEPS)[number];

function StepBlock({ step }: { step: Step }) {
  return (
    <div className="space-y-3">
      <div className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-white/45">
        <span className="text-[var(--envato)]">{step.num}</span>
        <span className="text-white/25 mx-2">/</span>
        <span>{step.label}</span>
      </div>
      <StepVisual step={step} />
    </div>
  );
}

function StepVisual({ step }: { step: Step }) {
  if (step.visual === "image" && step.src) {
    return (
      <div className="relative aspect-square overflow-hidden ring-1 ring-white/10 bg-[#1a1a1a]">
        <Image
          src={step.src}
          alt={step.alt ?? ""}
          fill
          sizes="(min-width:1024px) 18vw, 50vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (step.visual === "orb") {
    return (
      <div className="relative aspect-square overflow-hidden ring-1 ring-white/10 bg-[#080808] grid place-items-center">
        <Image
          src="/v3/flow_02_orb.png"
          alt=""
          fill
          sizes="(min-width:1024px) 18vw, 50vw"
          className="object-cover animate-glow-pulse"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden ring-1 ring-white/15 bg-[#0e0e0e]">
      <Image
        src="/v3/flow_04_final.jpg"
        alt="Final refined still"
        fill
        sizes="(min-width:1024px) 20vw, 50vw"
        className="object-cover"
      />
      <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm border border-white/10 rounded-md p-3 w-[55%] space-y-1.5">
        {REFINEMENT_KNOBS.map((k, i) => (
          <div key={k} className="flex items-center gap-2 text-[9px]">
            <span className="font-mono uppercase tracking-[0.16em] text-white/70 w-[52px]">{k}</span>
            <div className="flex-1 h-[2px] bg-white/15 rounded-full relative">
              <div
                className="absolute inset-y-0 left-0 bg-[var(--envato)] rounded-full"
                style={{ width: `${30 + i * 18}%` }}
              />
              <div
                className="absolute -top-[3px] size-2 bg-[var(--envato)] rounded-full"
                style={{ left: `calc(${30 + i * 18}% - 4px)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
