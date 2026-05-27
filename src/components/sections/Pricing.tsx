"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  pitch: string;
  features: string[];
  cta: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Core",
    price: "A$16.50",
    cadence: "/ month",
    pitch: "For all creators.",
    features: ["Unlimited downloads", "100M+ premium assets", "Lifetime commercial licence"],
    cta: "Start with Core",
  },
  {
    name: "Plus",
    price: "A$33",
    cadence: "/ month",
    pitch: "For active creators.",
    features: ["Everything in Core", "100 AI generations / month", "Priority support"],
    cta: "Try Plus, 7 Days Free",
    recommended: true,
  },
  {
    name: "Ultimate",
    price: "A$109",
    cadence: "/ month",
    pitch: "For teams & agencies.",
    features: ["Everything in Plus", "Unlimited AI generations", "Team management"],
    cta: "Go Ultimate",
  },
];

const FAQS = [
  {
    q: "Can I use Envato assets for client work?",
    a: "Yes. Every download includes a lifetime commercial licence, including AI generations. Use across paid client work, brand campaigns, broadcast, and your own products.",
  },
  {
    q: "Are AI generations commercially safe?",
    a: "Our models are trained on licensed content with IP indemnification on every output. Use AI generations with the same legal confidence as any other Envato asset.",
  },
  {
    q: "Do you have a free trial?",
    a: "Yes. 7 days free on any plan. No credit card required to start.",
  },
  {
    q: "What happens if I cancel?",
    a: "Anything you downloaded or generated during your subscription stays licensed forever. You just lose access to new downloads and AI generations.",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-[var(--bg)] py-24 lg:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        {/* Headline */}
        <div className="text-center mb-14 max-w-[640px] mx-auto">
          <div className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[var(--muted-ink)] mb-3">
            05 · One subscription
          </div>
          <h2 className="font-display text-[40px] lg:text-[56px] leading-[1] tracking-display font-medium">
            Everything you need.<br />
            <em className="italic">Nothing you don&apos;t.</em>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted-ink)]">
            All plans include unlimited downloads, lifetime commercial licence, and access to
            every Envato library. What changes is how much AI you generate.
          </p>
        </div>

        {/* Tier cards: wider, more breathable */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5 mb-20">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-6">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[var(--muted-ink)] mb-2">
              FAQ
            </div>
            <h3 className="font-display text-[26px] lg:text-[32px] tracking-display font-medium">
              Things creators often ask.
            </h3>
          </div>
          <div className="space-y-px bg-[var(--line)]">
            {FAQS.map((f, i) => (
              <FaqRow key={i} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="mt-6 text-center text-[12px] text-[var(--muted-ink)]">
            More questions?{" "}
            <a href="#" className="text-[var(--ink)] font-medium hover:text-[var(--envato-deep)] hover:underline underline-offset-4 transition-colors">
              Visit the Help Centre →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className={`relative p-7 lg:p-8 flex flex-col transition-all ${
        tier.recommended
          ? "bg-[var(--ink)] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]"
          : "bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink)]"
      }`}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.24em] bg-[var(--envato)] text-[#0a0a0a] px-2.5 py-1">
          Most popular
        </div>
      )}

      <div className="mb-1">
        <h4 className="text-[18px] font-semibold tracking-tight">{tier.name}</h4>
      </div>
      <p className={`text-[12.5px] mb-7 ${tier.recommended ? "text-white/65" : "text-[var(--muted-ink)]"}`}>
        {tier.pitch}
      </p>

      <div className="flex items-baseline gap-1 mb-7">
        <span className="font-display text-[40px] lg:text-[48px] leading-none tracking-display font-medium">
          {tier.price}
        </span>
        <span className={`text-[12px] ${tier.recommended ? "text-white/60" : "text-[var(--muted-ink)]"}`}>
          {tier.cadence}
        </span>
      </div>

      <ul className="space-y-2.5 mb-8 grow">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] leading-snug">
            <Check
              className={`size-4 shrink-0 mt-0.5 ${
                tier.recommended ? "text-[var(--envato)]" : "text-[var(--envato-deep)]"
              }`}
              strokeWidth={2.4}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className={`inline-flex items-center justify-center px-5 py-3.5 rounded-full font-semibold text-[13.5px] transition-colors ${
          tier.recommended
            ? "bg-[var(--envato)] text-[var(--ink)] hover:bg-[var(--envato-deep)] hover:text-white"
            : "border border-[var(--envato)] bg-transparent text-[var(--ink)] hover:bg-[var(--envato)]"
        }`}
      >
        {tier.cta}
      </a>
    </div>
  );
}

function FaqRow({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="bg-[var(--paper)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-[14px] font-medium leading-tight">{q}</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.8}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-1 text-[13px] leading-relaxed text-[var(--muted-ink)]">
          {a}
        </div>
      )}
    </div>
  );
}
