"use client";

import { useState } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";

type Feature = {
  icon: "check" | "spark";
  text: string;
  highlight?: string; // inline pill before the text (e.g., "Unlimited")
  subItems?: string[];
};

type Tier = {
  name: string;
  annualMonthly: number;   // $/month when paid annually
  monthlyMonthly: number;  // $/month when paid monthly
  features: Feature[];
  cta: string;
  recommended?: boolean;
};

/*
 * PricingV4 — content mirrors the live Envato pricing page verbatim:
 *   Core $16.50/mo (annual) · $198/yr · or $33/mo monthly
 *   Plus $39/mo (annual) · $468/yr · or $59/mo monthly
 *   Ultimate $109/mo (annual) · $1,308/yr · or $169/mo monthly
 * Two icon types: Check (asset/licence features), Sparkles (AI features).
 */
const TIERS: Tier[] = [
  {
    name: "Core",
    annualMonthly: 16.5,
    monthlyMonthly: 33,
    cta: "Select",
    features: [
      {
        icon: "check",
        text: "Unlimited downloads of 28+ million creative assets:",
        subItems: [
          "Stock Video & Photos",
          "Video Templates",
          "Music & Sound Effects",
          "Design Templates",
          "Graphics & 3D",
          "Fonts & add-ons",
          "& more",
        ],
      },
      { icon: "spark", text: "10 AI generations per month across our AI toolkit" },
      { icon: "check", text: "Lifetime commercial license for all creative assets and AI generations" },
    ],
  },
  {
    name: "Plus",
    annualMonthly: 39,
    monthlyMonthly: 59,
    cta: "Select",
    recommended: true,
    features: [
      { icon: "check", text: "Everything in Core" },
      {
        icon: "spark",
        text: "100 AI generations per month across our AI toolkit:",
        subItems: [
          "AI image generation & editing",
          "AI video generation & editing",
          "AI voice over",
          "AI music & sound effects generation",
          "AI graphics & mockup generation",
          "& more",
        ],
      },
    ],
  },
  {
    name: "Ultimate",
    annualMonthly: 109,
    monthlyMonthly: 169,
    cta: "Select",
    features: [
      { icon: "check", text: "Everything in Plus" },
      {
        icon: "spark",
        highlight: "Unlimited",
        text: "AI generations per month across our AI toolkit",
      },
    ],
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
    q: "Why one subscription instead of stacking tools?",
    a: "Most creative pros pay for 5+ tools every month. Envato bundles the 25M+ reference library, six AI tools, and tutorials into one plan with one commercial licence. No credits to count, no per-tool seat math.",
  },
];

const fmt = (n: number) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: n % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;

export function PricingV4() {
  const [annual, setAnnual] = useState(true);

  return (
    <section
      id="pricing"
      className="bg-[var(--bg)] border-t border-[var(--line)] relative overflow-hidden"
      style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--space-24)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative">
        {/* Centered heading + subhead + billing toggle */}
        <div className="text-center" style={{ marginBottom: "var(--space-16)" }}>
          <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[56px] lg:whitespace-nowrap">
            Stop stacking tools.{" "}
            <em className="italic text-gradient-brand-deep">Start showing taste.</em>
          </h2>
          <p
            className="text-[14px] lg:text-[16px] leading-[1.5] text-[var(--muted-ink)] lg:whitespace-nowrap"
            style={{ marginTop: "var(--gap-text-lg)" }}
          >
            One subscription. AI tools, 25M+ references, lifetime commercial licence.
          </p>
          <div
            className="flex justify-center"
            style={{ marginTop: "var(--gap-asset-title)" }}
          >
            <BillingToggle annual={annual} onToggle={() => setAnnual((v) => !v)} />
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} annual={annual} />
          ))}
        </div>

        <p
          className="text-center text-[12px] text-[var(--muted-ink)]"
          style={{ marginTop: "var(--gap-text-lg)" }}
        >
          Price in US Dollars · Lifetime commercial licence · Cancel anytime
        </p>

        {/* FAQ block — full container width */}
        <div className="mt-20">
          <div className="text-center mb-6">
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
            <a
              href="#"
              className="text-[var(--ink)] font-medium hover:text-[var(--envato-deep)] hover:underline underline-offset-4 transition-colors"
            >
              Visit the Help Centre
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BillingToggle({ annual, onToggle }: { annual: boolean; onToggle: () => void }) {
  return (
    <div className="relative inline-flex items-center bg-[var(--paper)] border border-[var(--line)] rounded-full p-1 text-[12.5px] font-semibold">
      <button
        type="button"
        onClick={() => annual && onToggle()}
        aria-pressed={!annual}
        className={`px-5 py-2 rounded-full transition-colors ${
          !annual ? "bg-[var(--ink)] text-white" : "text-[var(--ink)]/70 hover:text-[var(--ink)]"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => !annual && onToggle()}
        aria-pressed={annual}
        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full transition-colors ${
          annual ? "bg-[var(--ink)] text-white" : "text-[var(--ink)]/70 hover:text-[var(--ink)]"
        }`}
      >
        <span>Annual</span>
        <span
          className="text-[10.5px] font-mono uppercase tracking-[0.14em] font-bold transition-colors"
          style={{
            color: annual ? "var(--envato)" : "var(--gradient-brand-end)",
          }}
        >
          Save 35%
        </span>
      </button>
    </div>
  );
}

function TierCard({ tier, annual }: { tier: Tier; annual: boolean }) {
  const monthlyShown = annual ? tier.annualMonthly : tier.monthlyMonthly;
  const annualTotal = +(tier.annualMonthly * 12).toFixed(0);

  return (
    <div
      className={`relative p-7 lg:p-8 flex flex-col transition-all rounded-md ${
        tier.recommended
          ? "bg-[var(--ink)] text-white shadow-[0_12px_24px_-14px_rgba(0,0,0,0.35)]"
          : "bg-[var(--paper)] border border-[var(--line)] hover:border-[var(--ink)]"
      }`}
    >
      {tier.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.24em] bg-[var(--envato)] text-[var(--ink)] px-2.5 py-1 rounded-sm">
          Most popular
        </div>
      )}

      <div className="mb-5">
        <h4 className="text-[20px] font-semibold tracking-tight">{tier.name}</h4>
      </div>

      {/* Price */}
      <div className="flex flex-col mb-6">
        <div className="flex items-baseline gap-1">
          <span className="font-display text-[36px] lg:text-[44px] leading-none tracking-display font-medium">
            {fmt(monthlyShown)}
          </span>
          <span className={`text-[12px] ${tier.recommended ? "text-white/60" : "text-[var(--muted-ink)]"}`}>
            / month
          </span>
        </div>
        <div className={`mt-3 text-[12px] leading-[1.55] ${tier.recommended ? "text-white/65" : "text-[var(--muted-ink)]"}`}>
          {annual ? (
            <>
              USD ${annualTotal.toLocaleString("en-US")} billed annually
              <br />
              or monthly for {fmt(tier.monthlyMonthly)}
            </>
          ) : (
            <>
              Billed monthly · Cancel anytime
              <br />
              Save 35% with annual
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3.5 rounded-md font-semibold text-[14px] transition-colors mb-7 bg-[var(--envato)] text-[var(--ink)] hover:bg-[var(--envato-deep)] hover:text-white"
      >
        {tier.cta}
      </a>

      {/* Includes */}
      <div className={`text-[12.5px] mb-3 ${tier.recommended ? "text-white/65" : "text-[var(--muted-ink)]"}`}>
        Includes:
      </div>
      <ul className="space-y-4 grow">
        {tier.features.map((f, i) => (
          <FeatureRow key={i} feature={f} recommended={!!tier.recommended} />
        ))}
      </ul>
    </div>
  );
}

function FeatureRow({ feature, recommended }: { feature: Feature; recommended: boolean }) {
  return (
    <li className="text-[13px] leading-[1.5]">
      <div className="flex items-start gap-2.5">
        {feature.icon === "check" ? (
          <Check
            className={`size-4 shrink-0 mt-0.5 ${
              recommended ? "text-[var(--envato)]" : "text-[var(--envato-deep)]"
            }`}
            strokeWidth={2.4}
          />
        ) : (
          <Sparkles
            className={`size-4 shrink-0 mt-0.5 ${
              recommended ? "text-[var(--envato)]" : "text-[var(--envato-deep)]"
            }`}
            strokeWidth={2}
          />
        )}
        <span className="font-semibold">
          {feature.highlight && (
            <span
              className={`inline-flex items-center px-2 py-0.5 mr-1.5 rounded-full text-[10.5px] font-mono uppercase tracking-[0.16em] align-middle ${
                recommended
                  ? "bg-white text-[var(--ink)]"
                  : "bg-[var(--ink)] text-white"
              }`}
            >
              {feature.highlight}
            </span>
          )}
          {feature.text}
        </span>
      </div>
      {feature.subItems && (
        <ul className="mt-2 ml-7 space-y-1.5 list-disc list-outside marker:text-[var(--muted-ink)]">
          {feature.subItems.map((s) => (
            <li
              key={s}
              className={`text-[12.5px] ${recommended ? "text-white/80" : "text-[var(--ink)]/80"}`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function FaqRow({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const panelId = `faq-${q.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
  return (
    <div className="bg-[var(--paper)]">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-[14px] font-medium leading-tight">{q}</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.8}
        />
      </button>
      {open && (
        <div id={panelId} className="px-5 pb-5 -mt-1 text-[13px] leading-relaxed text-[var(--muted-ink)]">
          {a}
        </div>
      )}
    </div>
  );
}
