"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";

/* ============================================================
   Stage data. Title + body with inline {{highlight}} markup.
   ============================================================ */

type Pin = {
  /** Horizontal position as % of viewport */
  x: string;
  /** Vertical position as % of viewport */
  y: string;
  /** Label text */
  label: string;
  /** 0..1 fraction of the stage's scroll slot at which the pin appears.
      When omitted on a single pin, defaults to the slot midpoint. */
  appearAt?: number;
  /** Optional accent: changes the pill color. */
  tone?: "envato" | "warn";
};

type Stage = {
  num: string;
  eyebrow: string;
  title: string;
  /** Body copy. Use {{...}} to wrap a key phrase that gets the highlight pill. */
  body: string;
  src: string;
  /** Sequential pin annotations overlaid on the image, animating in as the
      reader scrolls through this stage's slot. */
  pins?: Pin[];
  /** Special interactive layer to render in place of the image */
  layer?: "reference-wall";
};

const STAGES: Stage[] = [
  {
    num: "01",
    eyebrow: "The Problem",
    title: "Creative chaos.",
    body: "Switching between tools, tabs, plugins, downloads. {{Every transition costs you taste}}, and the version of the work only you can make.",
    src: "/cf_01_opening.jpg",
    pins: [
      { x: "12%", y: "26%", label: "Tab · Figma", appearAt: 0.18 },
      { x: "78%", y: "22%", label: "Tab · After Effects", appearAt: 0.32 },
      { x: "22%", y: "58%", label: "Tab · Photoshop", appearAt: 0.46 },
      { x: "72%", y: "62%", label: "Tab · Browser × 12", appearAt: 0.6 },
      { x: "48%", y: "40%", label: "Context lost.", appearAt: 0.78, tone: "warn" },
    ],
  },
  {
    num: "02",
    eyebrow: "Reference",
    title: "Pick what moves you.",
    body: "Three references is all we need. A frame, a sound, a font. {{Your taste is the input}}, not a generic prompt.",
    src: "/cf_02_reference.jpg",
    layer: "reference-wall",
  },
  {
    num: "03",
    eyebrow: "Analysis",
    title: "We read what you picked.",
    body: "Colour palette, motion language, voice, typography, extracted from your references and held as {{your anchor across every step}}.",
    src: "/cf_03_analysis.jpg",
    pins: [
      { x: "20%", y: "30%", label: "Palette · #87E64B / #1a1d21 / #f6f2e8", appearAt: 0.18 },
      { x: "76%", y: "26%", label: "Type · editorial serif, 92pt", appearAt: 0.36 },
      { x: "26%", y: "62%", label: "Motion · long lens, hold beats", appearAt: 0.54 },
      { x: "74%", y: "58%", label: "Voice · plain, direct, low-volume", appearAt: 0.72 },
    ],
  },
  {
    num: "04",
    eyebrow: "Orchestration",
    title: "The right AI, picked for you.",
    body: "Veo for video, MusicGen for sound, your foundry families for type. {{Routed automatically}}. You never pick a tool again.",
    src: "/cf_04_orchestration.jpg",
    pins: [
      { x: "26%", y: "20%", label: "→ Veo 3", appearAt: 0.15 },
      { x: "76%", y: "20%", label: "→ MusicGen", appearAt: 0.3 },
      { x: "16%", y: "55%", label: "→ ImageGen", appearAt: 0.45 },
      { x: "84%", y: "55%", label: "→ Magnific", appearAt: 0.6 },
      { x: "48%", y: "78%", label: "→ GPT-4o", appearAt: 0.75 },
    ],
  },
  {
    num: "05",
    eyebrow: "Generation",
    title: "Reference becomes asset.",
    body: "In one move. Brief → frame → finished piece. {{One subscription}}, no credit counting, no model-of-the-week confusion.",
    src: "/cf_05_generation.jpg",
    pins: [
      { x: "18%", y: "30%", label: "01 · Brief locked", appearAt: 0.15 },
      { x: "50%", y: "26%", label: "02 · Frame rendered", appearAt: 0.4 },
      { x: "82%", y: "30%", label: "03 · Finished piece", appearAt: 0.65 },
    ],
  },
  {
    num: "06",
    eyebrow: "Licence",
    title: "Use it fearlessly.",
    body: "{{Lifetime commercial licence}} on every download, including everything you generate. IP indemnified. No surprise lawyers.",
    src: "/cf_06_license.jpg",
    pins: [
      { x: "22%", y: "32%", label: "✓ Lifetime", appearAt: 0.18 },
      { x: "78%", y: "28%", label: "✓ Commercial use", appearAt: 0.4 },
      { x: "25%", y: "60%", label: "✓ IP indemnified", appearAt: 0.6 },
      { x: "75%", y: "62%", label: "✓ Every download", appearAt: 0.78 },
    ],
  },
  {
    num: "07",
    eyebrow: "Flow State",
    title: "Less tabs. More flow.",
    body: "The work, only. {{25 million references and 7 AI tools, in one place}}, at the same speed your idea is moving.",
    src: "/cf_07_flow.jpg",
    pins: [
      { x: "22%", y: "28%", label: "25M+ references", appearAt: 0.2 },
      { x: "78%", y: "28%", label: "7 native AI tools", appearAt: 0.42 },
      { x: "50%", y: "65%", label: "1 subscription", appearAt: 0.64 },
    ],
  },
  {
    num: "08",
    eyebrow: "Out there",
    title: "Make something only you can make.",
    body: "{{25M+ references behind every move}}. Yours, and the ones still to come.",
    src: "/cf_08_outthere.jpg",
  },
];

export function CreativeFlowScrub() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#050505] text-white"
      style={{ height: `${STAGES.length * 160}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed image stack */}
        {STAGES.map((s, i) => (
          <ImageLayer key={s.num} stage={s} index={i} progress={scrollYProgress} />
        ))}

        {/* Vignette + grain. Readability + cinema. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay pointer-events-none" />

        {/* Active text overlay */}
        <ActiveOverlay progress={scrollYProgress} />

        {/* Top label */}
        <div className="absolute top-24 lg:top-28 inset-x-0 px-6 lg:px-10 z-20 pointer-events-none">
          <div className="mx-auto max-w-[1440px] flex items-baseline justify-between text-[10.5px] font-mono uppercase tracking-[0.22em] text-white/40">
            <span>Creative Flow</span>
            <CounterLabel progress={scrollYProgress} />
          </div>
        </div>

        {/* Scroll cue */}
        <ScrollCue progress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ============================================================
   Image layer. Crossfade + Ken Burns.
   ============================================================ */

function ImageLayer({
  stage,
  index,
  progress,
}: {
  stage: Stage;
  index: number;
  progress: MotionValue<number>;
}) {
  const n = STAGES.length;
  const slot = 1 / n;
  const isFirst = index === 0;
  const isLast = index === n - 1;

  const inStart = Math.max(0, index * slot - slot * 0.3);
  const inEnd = Math.max(0, index * slot + slot * 0.2);
  const outStart = Math.min(1, (index + 1) * slot - slot * 0.2);
  const outEnd = Math.min(1, (index + 1) * slot + slot * 0.3);

  const offsets = isLast ? [inStart, inEnd, 1] : [inStart, inEnd, outStart, outEnd];
  const values = isLast ? [isFirst ? 1 : 0, 1, 1] : [isFirst ? 1 : 0, 1, 1, 0];

  const opacity = useTransform(progress, offsets, values);
  const scale = useTransform(progress, [inStart, outEnd], [1.04, 1.12]);

  const slotStart = index * slot;

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 will-change-transform">
      {stage.layer === "reference-wall" ? (
        <ReferenceWall progress={progress} stageIdx={index} totalStages={n} />
      ) : (
        <Image
          src={stage.src}
          alt={stage.eyebrow}
          fill
          priority={index < 2}
          sizes="100vw"
          className="object-cover"
        />
      )}
      {stage.pins?.map((pin, i) => (
        <ScrollPin
          key={i}
          pin={pin}
          progress={progress}
          slotStart={slotStart}
          slot={slot}
          index={i}
        />
      ))}
    </motion.div>
  );
}

/* Animated pin annotation, scroll-tied. Appears at pin.appearAt within
   the stage's slot. Order index is shown as a small numbered chip. */
function ScrollPin({
  pin,
  progress,
  slotStart,
  slot,
  index,
}: {
  pin: Pin;
  progress: MotionValue<number>;
  slotStart: number;
  slot: number;
  index: number;
}) {
  const appearAt = pin.appearAt ?? 0.5;
  const enterStart = slotStart + slot * appearAt;
  const enterEnd = enterStart + slot * 0.1;

  const opacity = useTransform(progress, [enterStart, enterEnd], [0, 1]);
  const scale = useTransform(progress, [enterStart, enterEnd], [0.7, 1]);
  const y = useTransform(progress, [enterStart, enterEnd], [8, 0]);

  const isWarn = pin.tone === "warn";
  const pillBg = isWarn ? "bg-[#ff6b4a]" : "bg-[var(--envato)]";
  const pillShadow = isWarn
    ? "shadow-[0_0_22px_rgba(255,107,74,0.55)]"
    : "shadow-[0_0_22px_rgba(135,230,75,0.55)]";

  return (
    <motion.div
      style={{ opacity, left: pin.x, top: pin.y }}
      className="absolute z-10 pointer-events-none"
    >
      <motion.div
        style={{ scale, y }}
        className="relative -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
      >
        <span
          className={`relative grid place-items-center size-7 rounded-full ${pillBg} ${pillShadow}`}
        >
          <span className="text-[9.5px] font-mono font-bold text-[#0a0a0a]">
            {String(index + 1).padStart(2, "0")}
          </span>
          {!isWarn && (
            <span className="absolute inset-0 rounded-full bg-[var(--envato)] animate-ping opacity-30" />
          )}
        </span>
        <span className="text-[10.5px] font-mono uppercase tracking-[0.22em] text-white bg-black/70 backdrop-blur px-2.5 py-1.5 whitespace-nowrap shadow-[0_4px_18px_rgba(0,0,0,0.5)]">
          {pin.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   ReferenceWall. Stage 02 custom layer.
   A wall of many reference thumbnails (signals scale: 25M+).
   Three specific cards get "selected" as the user scrolls
   through stage 02's slot, with pin annotations.
   ============================================================ */

type WallCard = {
  src: string;
  /** Grid column start, 1..GRID_COLS */
  col: number;
  /** Grid row start, 1..GRID_ROWS */
  row: number;
  /** Span columns */
  colSpan?: number;
  /** Span rows */
  rowSpan?: number;
  /** Slight tilt for editorial feel */
  rotate?: number;
};

const GRID_COLS = 12;
const GRID_ROWS = 6;

/** Background wall of references. Hand-tuned to feel dense and editorial. */
const WALL_CARDS: WallCard[] = [
  { src: "/collage_silhouette.jpg", col: 1, row: 1, colSpan: 2, rowSpan: 2, rotate: -2 },
  { src: "/reel_1.jpg", col: 3, row: 1, colSpan: 1, rowSpan: 2, rotate: 1.5 },
  { src: "/collage_wave.jpg", col: 4, row: 1, colSpan: 2, rowSpan: 2, rotate: -1 },
  { src: "/hero_purple.jpg", col: 6, row: 1, colSpan: 1, rowSpan: 2, rotate: 2 },
  { src: "/collage_purple.jpg", col: 7, row: 1, colSpan: 2, rowSpan: 2, rotate: -1.5 },
  { src: "/reel_2.jpg", col: 9, row: 1, colSpan: 1, rowSpan: 2, rotate: 1 },
  { src: "/collage_eye.jpg", col: 10, row: 1, colSpan: 2, rowSpan: 2, rotate: -2 },
  { src: "/reel_3.jpg", col: 12, row: 1, colSpan: 1, rowSpan: 2, rotate: 2 },

  { src: "/hero_silhouette.jpg", col: 1, row: 3, colSpan: 1, rowSpan: 2, rotate: 1 },
  { src: "/card_boldmoves.jpg", col: 2, row: 3, colSpan: 2, rowSpan: 2, rotate: -1 },
  { src: "/collage_mountain.jpg", col: 4, row: 3, colSpan: 2, rowSpan: 2, rotate: 1.5 },
  { src: "/reel_4.jpg", col: 6, row: 3, colSpan: 1, rowSpan: 2, rotate: -2 },
  { src: "/hero_wave.jpg", col: 7, row: 3, colSpan: 2, rowSpan: 2, rotate: 1 },
  { src: "/reel_5.jpg", col: 9, row: 3, colSpan: 1, rowSpan: 2, rotate: -1.5 },
  { src: "/card_analysis.jpg", col: 10, row: 3, colSpan: 2, rowSpan: 2, rotate: 2 },
  { src: "/reel_6.jpg", col: 12, row: 3, colSpan: 1, rowSpan: 2, rotate: -1 },

  { src: "/reel_7.jpg", col: 1, row: 5, colSpan: 1, rowSpan: 2, rotate: -2 },
  { src: "/hero_untamed.jpg", col: 2, row: 5, colSpan: 2, rowSpan: 2, rotate: 1 },
  { src: "/hero_mountain.jpg", col: 4, row: 5, colSpan: 2, rowSpan: 2, rotate: -1 },
  { src: "/hero_eye.jpg", col: 6, row: 5, colSpan: 1, rowSpan: 2, rotate: 2 },
  { src: "/collage_portrait.jpg", col: 7, row: 5, colSpan: 2, rowSpan: 2, rotate: -1.5 },
  { src: "/hero_frame_opening.jpg", col: 9, row: 5, colSpan: 2, rowSpan: 2, rotate: 1 },
  { src: "/visual_1_reference.png", col: 11, row: 5, colSpan: 2, rowSpan: 2, rotate: -2 },
];

/** The three references that get sequentially selected.
    Each has a card index in WALL_CARDS, an "appearAt" fraction (0..1)
    of stage 02's slot, and a label. The 3rd selection completes by
    ~68% of the slot, leaving a long hold window where all 3 are bright
    and readable before the wall fades into stage 03. */
const SELECTED = [
  { cardIdx: 2, label: "Reference 01 · Frame", appearAt: 0.1 },
  { cardIdx: 12, label: "Reference 02 · Sound", appearAt: 0.3 },
  { cardIdx: 20, label: "Reference 03 · Type", appearAt: 0.5 },
];

function ReferenceWall({
  progress,
  stageIdx,
  totalStages,
}: {
  progress: MotionValue<number>;
  stageIdx: number;
  totalStages: number;
}) {
  const slot = 1 / totalStages;
  const start = stageIdx * slot;

  return (
    <div className="absolute inset-0 bg-[#0a0a0a]">
      {/* Soft purple/green glow backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(135,230,75,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(178,143,255,0.10),transparent_55%)]" />

      {/* Grid wall */}
      <div
        className="absolute inset-0 p-[3vh] grid gap-[1.2vh]"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
        }}
      >
        {WALL_CARDS.map((card, i) => {
          const selectedMeta = SELECTED.find((s) => s.cardIdx === i);
          return (
            <WallCardTile
              key={i}
              card={card}
              progress={progress}
              slotStart={start}
              slot={slot}
              isSelectable={!!selectedMeta}
              appearAt={selectedMeta?.appearAt}
              label={selectedMeta?.label}
              selectionOrder={selectedMeta ? SELECTED.findIndex((s) => s.cardIdx === i) + 1 : 0}
            />
          );
        })}
      </div>

      {/* Caption counter top-right of wall */}
      <SelectionCounter progress={progress} slotStart={start} slot={slot} />
    </div>
  );
}

function WallCardTile({
  card,
  progress,
  slotStart,
  slot,
  isSelectable,
  appearAt,
  label,
  selectionOrder,
}: {
  card: WallCard;
  progress: MotionValue<number>;
  slotStart: number;
  slot: number;
  isSelectable: boolean;
  appearAt?: number;
  label?: string;
  selectionOrder: number;
}) {
  // Wider entry window so each pick reads as a deliberate moment, not a flicker.
  const enterStart = slotStart + slot * (appearAt ?? 0);
  const enterEnd = enterStart + slot * 0.18;

  // Non-selectable cards dim further as the picks happen so the selected ones
  // pop forward. Selectable cards stay full opacity.
  const dim = useTransform(
    progress,
    [slotStart, slotStart + slot * 0.25, slotStart + slot * 0.85],
    isSelectable ? [1, 1, 1] : [0.7, 0.45, 0.22]
  );

  // Selected card pops forward in scale once its moment arrives.
  const tileScale = useTransform(
    progress,
    isSelectable ? [enterStart, enterEnd] : [0, 1],
    isSelectable ? [1, 1.07] : [1, 1]
  );

  const ringOpacity = useTransform(progress, [enterStart, enterEnd], [0, 1]);
  const ringScale = useTransform(progress, [enterStart, enterEnd], [0.88, 1.03]);
  const pinY = useTransform(progress, [enterStart, enterEnd], [10, 0]);
  const pinOpacity = useTransform(progress, [enterStart, enterEnd], [0, 1]);

  return (
    <motion.div
      className="relative overflow-visible"
      style={{
        gridColumn: `${card.col} / span ${card.colSpan ?? 1}`,
        gridRow: `${card.row} / span ${card.rowSpan ?? 1}`,
        rotate: card.rotate ?? 0,
        opacity: dim,
        scale: tileScale,
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#111] ring-1 ring-white/8 shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        <Image
          src={card.src}
          alt=""
          fill
          sizes="20vw"
          className="object-cover"
        />
      </div>

      {isSelectable && (
        <>
          {/* Outer soft glow */}
          <motion.div
            style={{ opacity: ringOpacity }}
            className="pointer-events-none absolute -inset-4 rounded-sm bg-[radial-gradient(ellipse_at_center,rgba(135,230,75,0.35),transparent_70%)] blur-[2px]"
          />
          {/* Crisp green selection ring */}
          <motion.div
            style={{ opacity: ringOpacity, scale: ringScale }}
            className="pointer-events-none absolute -inset-[4px] ring-[3px] ring-[var(--envato)] shadow-[0_0_40px_rgba(135,230,75,0.7)]"
          />
          {/* Selected badge: numbered chip top-left */}
          <motion.div
            style={{ opacity: pinOpacity, y: pinY }}
            className="pointer-events-none absolute -top-3 -left-3 z-10 flex items-center gap-1"
          >
            <span className="grid place-items-center size-7 rounded-full bg-[var(--envato)] text-[11px] font-mono font-bold text-[#0a0a0a] shadow-[0_0_22px_rgba(135,230,75,0.85)]">
              {String(selectionOrder).padStart(2, "0")}
            </span>
          </motion.div>
          {/* Label pinned along the bottom edge */}
          <motion.div
            style={{ opacity: pinOpacity, y: pinY }}
            className="pointer-events-none absolute left-1 right-1 -bottom-8 z-10 flex justify-center"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white bg-black/80 backdrop-blur px-2.5 py-1.5 whitespace-nowrap shadow-[0_4px_18px_rgba(0,0,0,0.6)]">
              ✓ {label}
            </span>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

function SelectionCounter({
  progress,
  slotStart,
  slot,
}: {
  progress: MotionValue<number>;
  slotStart: number;
  slot: number;
}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const update = (v: number) => {
      const local = (v - slotStart) / slot;
      let c = 0;
      for (const s of SELECTED) if (local >= s.appearAt) c += 1;
      setCount(c);
    };
    update(progress.get());
    const unsub = progress.on("change", update);
    return () => unsub();
  }, [progress, slotStart, slot]);

  return (
    <div className="absolute top-36 lg:top-40 right-6 lg:right-10 z-20 pointer-events-none">
      <div className="bg-black/70 backdrop-blur-md border border-white/10 px-4 py-3 flex items-center gap-3 shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display text-[32px] leading-none font-medium text-[var(--envato)]"
        >
          {String(count).padStart(2, "0")}
        </motion.span>
        <span className="text-white/30 text-[18px]">/</span>
        <span className="font-display text-[18px] leading-none text-white/60">03</span>
        <span className="ml-2 text-[10px] font-mono uppercase tracking-[0.22em] text-white/70 max-w-[120px] leading-tight">
          References<br />Selected
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   Active overlay. Fixed bottom-left, crossfades between stages.
   ============================================================ */

function ActiveOverlay({ progress }: { progress: MotionValue<number> }) {
  const idx = useMotionIndex(progress, STAGES.length);
  const stage = STAGES[idx];
  const isFinal = idx === STAGES.length - 1;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="mx-auto max-w-[1440px] h-full px-6 lg:px-12 xl:px-20 pb-28 lg:pb-32 pt-32 flex items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage.num}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.2, 0.65, 0.2, 1] }}
            className={isFinal ? "w-full text-center" : "max-w-[820px]"}
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-white/55 mb-5">
              <span className="text-[var(--envato)]">{stage.num}</span>
              <span className="text-white/25 mx-2">/</span>
              <span>{stage.eyebrow.toUpperCase()}</span>
            </div>

            <h2
              className="font-display tracking-display font-medium leading-[0.95]"
              style={{
                fontSize: "clamp(56px, 8.5vw, 124px)",
                color: "rgba(255, 255, 255, 0.96)",
              }}
            >
              {stage.title}
            </h2>

            <p
              className={`mt-7 text-[17px] lg:text-[20px] leading-[1.5] text-white/85 ${
                isFinal ? "max-w-[640px] mx-auto" : "max-w-[600px]"
              }`}
            >
              <HighlightedBody body={stage.body} progress={progress} stageIdx={idx} totalStages={STAGES.length} />
            </p>

            {isFinal && (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center border border-[var(--envato)] bg-transparent text-white hover:bg-[var(--envato)] hover:text-[var(--ink)] px-7 py-4 rounded-full font-semibold text-[14px] transition-colors shadow-[0_0_60px_rgba(135,230,75,0.25)]"
                >
                  Start Your Flow
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-white border border-white/40 hover:border-[var(--envato)] hover:text-[var(--envato)] px-6 py-4 rounded-full text-[14px] font-semibold transition-colors"
                >
                  Back to Homepage
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   HighlightedBody. Letter-by-letter underline fill in primary.
   Each character gets a thin envato-green underline that draws in
   from 0 to full width across its own tiny scroll window. Letters
   stay in their natural inline flow, so when the phrase wraps the
   underline continues seamlessly on the next line. Text colour
   never changes so white copy stays legible at every step.
   ============================================================ */

function HighlightedBody({
  body,
  progress,
  stageIdx,
  totalStages,
}: {
  body: string;
  progress: MotionValue<number>;
  stageIdx: number;
  totalStages: number;
}) {
  const slot = 1 / totalStages;
  const start = stageIdx * slot;
  const fillStart = start + slot * 0.22;
  const fillEnd = start + slot * 0.88;

  const parts = body.split(/\{\{(.+?)\}\}/g);

  return (
    <>
      {parts.map((part, i) => {
        const isHighlight = i % 2 === 1;
        if (!isHighlight) return <span key={i}>{part}</span>;
        return (
          <HighlightPhrase
            key={i}
            text={part}
            progress={progress}
            fillStart={fillStart}
            fillEnd={fillEnd}
          />
        );
      })}
    </>
  );
}

function HighlightPhrase({
  text,
  progress,
  fillStart,
  fillEnd,
}: {
  text: string;
  progress: MotionValue<number>;
  fillStart: number;
  fillEnd: number;
}) {
  const chars = Array.from(text);
  const total = chars.length;
  const span = fillEnd - fillStart;
  const perChar = span / Math.max(total, 1);
  // Slight overlap between consecutive characters so the underline reads
  // as a continuous draw rather than discrete dashes.
  const overlap = perChar * 0.35;

  return (
    <>
      {chars.map((ch, i) => {
        const cStart = fillStart + i * perChar;
        const cEnd = cStart + perChar + overlap;
        return (
          <HighlightChar
            key={i}
            char={ch}
            progress={progress}
            startAt={cStart}
            endAt={cEnd}
          />
        );
      })}
    </>
  );
}

function HighlightChar({
  char,
  progress,
  startAt,
  endAt,
}: {
  char: string;
  progress: MotionValue<number>;
  startAt: number;
  endAt: number;
}) {
  const bgSize = useTransform(
    progress,
    [startAt, endAt],
    ["0% 3px", "100% 3px"]
  );

  // Render whitespace as a regular space so word-break stays natural;
  // the underline still draws under it because we set the same background.
  return (
    <motion.span
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--envato), var(--envato))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom 0px",
        backgroundSize: bgSize,
        paddingBottom: "4px",
      }}
      className="font-semibold text-white"
    >
      {char}
    </motion.span>
  );
}

/* ============================================================
   MotionValue → integer state
   ============================================================ */

function useMotionIndex(mv: MotionValue<number>, total: number): number {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const update = (v: number) =>
      setVal(Math.max(0, Math.min(total - 1, Math.floor(v * total * 0.9999))));
    update(mv.get());
    const unsub = mv.on("change", update);
    return () => unsub();
  }, [mv, total]);
  return val;
}

/* ============================================================
   Counter / progress / scroll cue
   ============================================================ */

function CounterLabel({ progress }: { progress: MotionValue<number> }) {
  const idx = useMotionIndex(progress, STAGES.length);
  return (
    <span>
      <span className="text-white/80">{String(idx + 1).padStart(2, "0")}</span>
      <span className="text-white/25 mx-1">/</span>
      <span>{String(STAGES.length).padStart(2, "0")}</span>
    </span>
  );
}

function ScrollCue({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.05], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-12 right-8 lg:right-14 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-white/45 z-20 pointer-events-none"
    >
      <span>Scroll the flow</span>
      <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
        <rect x="0.5" y="0.5" width="13" height="21" rx="6.5" stroke="currentColor" strokeWidth="1" />
        <motion.circle
          cx="7"
          cy="8"
          r="2"
          fill="currentColor"
          animate={{ cy: [8, 14, 8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.div>
  );
}
