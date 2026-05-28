"use client";

import { useState } from "react";
import Image from "next/image";

type ModelKey =
  | "Seedance 2.0"
  | "Veo 3.1"
  | "Flux.2"
  | "Kling 3.0"
  | "Nano Banana"
  | "Seedream 4.5"
  | "Imagen 4"
  | "Magnific";

type ModelBadge = { initials: string; bg: string; fg: string };

const MODEL_BADGES: Record<ModelKey, ModelBadge> = {
  "Seedance 2.0": { initials: "SC", bg: "#d97706", fg: "#0a0a0a" },
  "Veo 3.1":      { initials: "VE", bg: "#15803d", fg: "#ffffff" },
  "Flux.2":       { initials: "FX", bg: "#0a1f44", fg: "#ffffff" },
  "Kling 3.0":    { initials: "KL", bg: "#6d28d9", fg: "#ffffff" },
  "Nano Banana":  { initials: "NB", bg: "#fbbf24", fg: "#0a0a0a" },
  "Seedream 4.5": { initials: "SD", bg: "#b91c1c", fg: "#ffffff" },
  "Imagen 4":     { initials: "IM", bg: "#1d4ed8", fg: "#ffffff" },
  "Magnific":     { initials: "MG", bg: "#be185d", fg: "#ffffff" },
};

// Ordered by popularity. Hovering popular chips lights up more pins.
const FILTER_ORDER: ModelKey[] = [
  "Seedance 2.0",
  "Veo 3.1",
  "Flux.2",
  "Kling 3.0",
  "Nano Banana",
  "Seedream 4.5",
  "Imagen 4",
  "Magnific",
];

type Pin = {
  src: string;
  model: ModelKey;
  aspect: "1/1" | "16/9" | "9/16";
};

/*
 * Pinterest-style masonry grid of finished AI outputs. Each pin carries a
 * `model` attribute. Filter chips above the grid let the visitor see which
 * model produced which examples. Inactive chip → all pins normal.
 * Active chip → matching pins glow, others dim.
 */
// Pin counts are popularity-weighted: hovering a top chip glows more cards.
//   Seedance 2.0: 3  ·  Veo 3.1: 3  ·  Flux.2: 2  ·  Kling 3.0: 2
//   Nano Banana: 1   ·  Seedream 4.5: 1  ·  Imagen 4: 1  ·  Magnific: 1
const PINS: Pin[] = [
  { src: "/v4/pin_01.jpg", model: "Seedance 2.0", aspect: "1/1"  },
  { src: "/v4/pin_02.jpg", model: "Veo 3.1",      aspect: "16/9" },
  { src: "/v4/pin_03.jpg", model: "Magnific",     aspect: "1/1"  },
  { src: "/v4/pin_04.jpg", model: "Imagen 4",     aspect: "9/16" },
  { src: "/v4/pin_05.jpg", model: "Kling 3.0",    aspect: "16/9" },
  { src: "/v4/pin_06.jpg", model: "Flux.2",       aspect: "9/16" },
  { src: "/v4/pin_07.jpg", model: "Veo 3.1",      aspect: "16/9" },
  { src: "/v4/pin_08.jpg", model: "Seedream 4.5", aspect: "1/1"  },
  { src: "/v4/pin_09.jpg", model: "Seedance 2.0", aspect: "1/1"  },
  { src: "/v4/pin_10.jpg", model: "Veo 3.1",      aspect: "16/9" },
  { src: "/v4/pin_11.jpg", model: "Kling 3.0",    aspect: "9/16" },
  { src: "/v4/pin_12.jpg", model: "Nano Banana",  aspect: "1/1"  },
  { src: "/v4/pin_13.jpg", model: "Flux.2",       aspect: "9/16" },
  { src: "/v4/pin_14.jpg", model: "Seedance 2.0", aspect: "16/9" },
];

export function SixToolsV4() {
  const [filter, setFilter] = useState<ModelKey | null>(null);
  const [hovered, setHovered] = useState<ModelKey | null>(null);

  return (
    <section
      className="bg-[var(--hero)] text-white border-t border-white/5"
      style={{ paddingTop: "var(--space-24)", paddingBottom: "var(--space-24)" }}
    >
      <div className="mx-auto max-w-[1920px] px-6 lg:px-10">
        {/* Header */}
        <div style={{ marginBottom: "var(--gap-asset-title)" }}>
          <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[60px]">
            Built on{" "}
            <em className="italic text-gradient-brand">every leading model.</em>
          </h2>
          <p
            className="text-[14px] lg:text-[16px] leading-[1.5] text-white/65 lg:whitespace-nowrap"
            style={{ marginTop: "var(--gap-text-lg)" }}
          >
            All connected by your references. Pick the engine that fits the shot.
          </p>

          {/* Filter chips */}
          <div
            className="flex flex-wrap items-center gap-2"
            style={{ marginTop: "var(--gap-asset-title)" }}
          >
            <FilterChip
              label="All"
              active={filter === null}
              onClick={() => setFilter(null)}
              onMouseEnter={() => setHovered(null)}
              onMouseLeave={() => setHovered(null)}
            />
            {FILTER_ORDER.map((m) => (
              <FilterChip
                key={m}
                label={m}
                active={filter === m}
                onClick={() => setFilter(filter === m ? null : m)}
                onMouseEnter={() => setHovered(m)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>

        {/* Pinterest masonry */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3 lg:gap-4 [column-fill:balance]">
          {PINS.map((pin, i) => (
            <PinCard key={pin.src} pin={pin} filter={filter} hovered={hovered} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group px-3.5 py-1.5 text-[11.5px] font-mono uppercase tracking-[0.14em] transition-all border whitespace-nowrap ${
        active ? "font-bold" : "font-normal"
      }`}
      style={
        active
          ? {
              borderRadius: 8,
              background: "var(--envato)",
              color: "var(--ink)",
              borderColor: "var(--envato)",
              boxShadow: "var(--shadow-glow-primary)",
            }
          : {
              borderRadius: 8,
              background: "transparent",
              color: "#ffffff",
              borderColor: "var(--envato)",
              boxShadow: "var(--shadow-chip-border-glow)",
            }
      }
      onMouseOver={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgb(var(--envato-rgb) / 0.12)";
        }
      }}
      onMouseOut={(e) => {
        if (!active) {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }
      }}
    >
      {label}
    </button>
  );
}

function PinCard({
  pin,
  filter,
  hovered,
  index,
}: {
  pin: Pin;
  filter: ModelKey | null;
  hovered: ModelKey | null;
  index: number;
}) {
  const matched = filter === null || filter === pin.model;
  const isHoverGlow = hovered !== null && hovered === pin.model;
  const isSelectGlow = filter === pin.model;
  const badge = MODEL_BADGES[pin.model];

  // class string built so the hover backlight wins visually
  const glowClasses = isHoverGlow
    ? "ring-2 ring-[var(--envato)] shadow-[var(--shadow-glow-primary-strong)]"
    : isSelectGlow
    ? "ring-[var(--envato)]/70 shadow-[var(--shadow-glow-soft-drop)]"
    : matched
    ? "ring-white/8"
    : "ring-white/5";

  return (
    <div className="break-inside-avoid mb-3 lg:mb-4">
      <a
        href="#"
        aria-label={`Generated with ${pin.model}`}
        className={`group relative block w-full overflow-hidden rounded-md bg-[var(--surface-dark-card)] ring-1 transition-all duration-300 hover:ring-2 hover:ring-[var(--envato)] hover:shadow-[var(--shadow-glow-primary-strong)] ${
          matched ? "opacity-100" : "opacity-30 grayscale"
        } ${glowClasses}`}
        style={{ aspectRatio: pin.aspect.replace("/", " / ") }}
      >
        <Image
          src={pin.src}
          alt={`AI generated example, ${pin.model}`}
          fill
          sizes="(min-width:1280px) 20vw, (min-width:768px) 25vw, 45vw"
          loading={index < 4 ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {/* Model badge — visible on card-hover, filter-select, or filter-chip-hover */}
        <div
          className={`absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 rounded-full pl-1 pr-2.5 py-1 transition-opacity duration-200 ${
            isSelectGlow || isHoverGlow ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <span
            className="grid place-items-center size-4 rounded-full text-[8.5px] font-bold tracking-tight shrink-0"
            style={{ backgroundColor: badge.bg, color: badge.fg }}
          >
            {badge.initials}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-white whitespace-nowrap">
            {pin.model}
          </span>
        </div>
      </a>
    </div>
  );
}
