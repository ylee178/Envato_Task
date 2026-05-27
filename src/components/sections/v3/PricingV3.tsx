"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";

type Tier = {
  name: string;
  monthly: number;
  pitch: string;
  features: string[];
  cta: string;
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Core",
    monthly: 16.5,
    pitch: "For all creators.",
    features: ["10 AI generations / month", "Unlimited downloads", "Lifetime commercial licence"],
    cta: "Start with Core",
  },
  {
    name: "Plus",
    monthly: 39,
    pitch: "For active creators.",
    features: ["100 AI generations / month", "Everything in Core", "Priority support"],
    cta: "Try Plus, 7 Days Free",
    recommended: true,
  },
  {
    name: "Ultimate",
    monthly: 109,
    pitch: "For teams and agencies.",
    features: ["Unlimited AI generations", "Everything in Plus", "Team management"],
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
];

const formatPrice = (n: number) =>
  `A$${n.toLocaleString("en-AU", { minimumFractionDigits: n % 1 ? 2 : 2, maximumFractionDigits: 2 })}`;

export function PricingV3() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="bg-[var(--bg)] py-24 lg:py-32 border-t border-[var(--line)] relative overflow-hidden">
      {/* Glass orb decoration */}
      <div aria-hidden className="hidden lg:block absolute left-4 bottom-12 w-[180px] h-[180px] opacity-90 pointer-events-none">
        <Image src="/v3/glass_orb.png" alt="" fill sizes="180px" className="object-contain" />
      </div>

      <div className="mx-auto max-w-[1180px] px-6 lg:px-10 relative">
        {/* Heading row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[56px]">
              Simple pricing.
              <br />
              <em className="italic text-gradient-brand-deep">Serious value.</em>
            </h2>
          </div>
          <div className="flex flex-col items-start lg:items-end">
            <BillingToggle annual={annual} onToggle={() => setAnnual((v) => !v)} />
            <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--envato-deep)]">
              Save up to 30%
            </div>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} annual={annual} />
          ))}
        </div>

        <p className="mt-5 text-center text-[12px] text-[var(--muted-ink)]">
          Price-locked 12 months · Lifetime license · Cancel anytime.
        </p>

        {/* FAQ block (abbreviated) */}
        <div className="mt-20 max-w-[720px] mx-auto">
          <div className="text-center mb-6">
            <div className="text-[10.5px] font-mono uppercase tracking-[0.24em] text-[var(--muted-ink)] mb-2">
              FAQ
            </div>
            <h3 className="font-display text-[24px] lg:text-[28px] tracking-display font-medium">
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

function BillingToggle({ annual, onToggle }: { annual: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle annual billing"
      className="relative inline-flex items-center bg-[var(--paper)] border border-[var(--line)] rounded-full p-1 text-[12px] font-semibold"
    >
      <span
        className={`px-4 py-1.5 rounded-full transition-colors ${
          !annual ? "bg-[var(--ink)] text-white" : "text-[var(--ink)]/65"
        }`}
      >
        Monthly
      </span>
      <span
        className={`px-4 py-1.5 rounded-full transition-colors ${
          annual ? "bg-[var(--ink)] text-white" : "text-[var(--ink)]/65"
        }`}
      >
        Annual
      </span>
    </button>
  );
}

function TierCard({ tier, annual }: { tier: Tier; annual: boolean }) {
  const annualTotal = +(tier.monthly * 12 * 0.7).toFixed(2);
  const annualPerMonth = +(annualTotal / 12).toFixed(2);

  const headlinePrice = annual ? formatPrice(annualTotal) : formatPrice(tier.monthly);
  const headlineCadence = annual ? "/ year" : "/ month";
  const subline = annual ? `${formatPrice(annualPerMonth)} / mo billed annually` : null;

  return (
    <div
      className={`relative p-7 lg:p-8 flex flex-col transition-all rounded-md ${
        tier.recommended
          ? "bg-[var(--ink)] text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]"
          : "bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink)]"
      }`}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.24em] bg-[var(--envato)] text-[var(--ink)] px-2.5 py-1 rounded-sm">
          Most popular
        </div>
      )}

      <div className="mb-1">
        <h4 className="text-[18px] font-semibold tracking-tight">{tier.name}</h4>
      </div>
      <p className={`text-[12.5px] mb-7 ${tier.recommended ? "text-white/65" : "text-[var(--muted-ink)]"}`}>
        {tier.pitch}
      </p>

      <div className="flex flex-col mb-7">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-[36px] lg:text-[44px] leading-none tracking-display font-medium">
            {headlinePrice}
          </span>
          <span className={`text-[12px] ${tier.recommended ? "text-white/60" : "text-[var(--muted-ink)]"}`}>
            {headlineCadence}
          </span>
        </div>
        {subline && (
          <span className={`text-[11px] mt-1 ${tier.recommended ? "text-white/60" : "text-[var(--muted-ink)]"}`}>
            {subline}
          </span>
        )}
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
