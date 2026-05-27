"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RotateCcw, Sparkles, X } from "lucide-react";

type Asset = {
  id: string;
  src: string;
  label: string;
  type: "motion" | "photo" | "audio" | "type" | "3d";
  tone: string;
};

const LIBRARY: Asset[] = [
  { id: "wave",     src: "/visual_4_generation.png", label: "Untamed wave",     type: "motion", tone: "Cinematic motion" },
  { id: "studio",   src: "/visual_6_flow.png",       label: "Studio quiet",     type: "photo",  tone: "Low-light photographic" },
  { id: "moves",    src: "/visual_1_reference.png",  label: "Bold Moves",       type: "type",   tone: "Editorial display" },
  { id: "mountain", src: "/visual_7_finalcta.png",   label: "Coastal mountain", type: "photo",  tone: "Aspirational landscape" },
  { id: "license",  src: "/visual_5_license.png",    label: "On the rocks",     type: "motion", tone: "Solitude, golden hour" },
  { id: "orch",     src: "/visual_3_orchestration.png", label: "Model graph",   type: "3d",     tone: "Schematic, technical" },
  { id: "analysis", src: "/visual_2_analysis.png",   label: "Spectral read",    type: "audio",  tone: "Analytical, dark UI" },
];

export function ReferencePicker() {
  const [picked, setPicked] = useState<Asset[]>([]);
  const [pulse, setPulse] = useState(0);

  const handlePick = (a: Asset) => {
    if (picked.find((p) => p.id === a.id)) {
      setPicked(picked.filter((p) => p.id !== a.id));
      return;
    }
    if (picked.length >= 3) return;
    setPicked([...picked, a]);
    setPulse((p) => p + 1);
  };

  const reset = () => setPicked([]);
  const complete = picked.length === 3;

  const brief = useMemo(() => {
    if (!complete) return null;
    const tones = picked.map((p) => p.tone.toLowerCase()).join(" · ");
    const types = picked.map((p) => p.type);
    const hasMotion = types.includes("motion");
    const hasType = types.includes("type");
    const hasPhoto = types.includes("photo");
    let pitch = "";
    if (hasMotion && hasType) pitch = "Title sequence with editorial display type over cinematic plates.";
    else if (hasMotion && hasPhoto) pitch = "Brand film cut from atmospheric stills and live motion.";
    else if (hasType && hasPhoto) pitch = "Editorial campaign: large type, photographic anchors.";
    else pitch = "Multi-asset story blending motion, type, and photography.";
    return { tones, pitch };
  }, [picked, complete]);

  return (
    <div className="relative w-full max-w-[460px] ml-auto pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-mono uppercase tracking-eyebrow text-[var(--envato)]">
          <span className="bg-[var(--hero)]/85 px-2 py-1 backdrop-blur">
            Try it · pick 3 references
          </span>
        </div>
        {picked.length > 0 && (
          <button
            onClick={reset}
            className="text-[10px] font-mono uppercase tracking-eyebrow text-white/45 hover:text-white inline-flex items-center gap-1"
          >
            <RotateCcw className="size-3" /> Reset
          </button>
        )}
      </div>

      {/* Slots */}
      <div className="relative grid grid-cols-3 gap-2 p-3 bg-black/45 backdrop-blur-md border border-white/10">
        {[0, 1, 2].map((slot) => {
          const a = picked[slot];
          return (
            <div
              key={slot}
              className="relative aspect-[3/4] overflow-hidden bg-white/[0.04] border border-dashed border-white/15"
            >
              <AnimatePresence mode="wait">
                {a ? (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image src={a.src} alt={a.label} fill sizes="140px" className="object-cover" />
                    <button
                      onClick={() => handlePick(a)}
                      className="absolute top-1 right-1 size-5 grid place-items-center bg-black/65 backdrop-blur hover:bg-black"
                      aria-label="Remove"
                    >
                      <X className="size-3 text-white" strokeWidth={2.4} />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="text-[9.5px] text-white font-medium leading-tight">{a.label}</div>
                      <div className="text-[8px] font-mono uppercase tracking-eyebrow text-white/55">{a.type}</div>
                    </div>
                    <motion.div
                      key={`ring-${pulse}-${slot}`}
                      initial={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.15 }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 border border-[var(--envato)]"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <Plus className="size-4 text-white/30" strokeWidth={1.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="col-span-3 mt-2 flex items-center justify-between text-[10.5px] text-white/70 font-mono uppercase tracking-eyebrow">
          <span>
            {complete ? (
              <span className="text-[var(--envato)] inline-flex items-center gap-1">
                <Sparkles className="size-3" /> Brief generated
              </span>
            ) : (
              `Pick ${3 - picked.length} more`
            )}
          </span>
          <span className={complete ? "text-[var(--envato)]" : "text-white/45"}>
            {picked.length} / 3
          </span>
        </div>
      </div>

      {/* Library */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {LIBRARY.map((a) => {
          const isPicked = !!picked.find((p) => p.id === a.id);
          return (
            <button
              key={a.id}
              onClick={() => handlePick(a)}
              disabled={picked.length >= 3 && !isPicked}
              className={`group relative aspect-square size-12 overflow-hidden border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                isPicked
                  ? "border-[var(--envato)] ring-1 ring-[var(--envato)]"
                  : "border-white/15 hover:border-white/45"
              }`}
              title={a.label}
            >
              <Image src={a.src} alt="" fill sizes="48px" className="object-cover" />
              {isPicked && (
                <div className="absolute inset-0 grid place-items-center bg-[var(--envato)]/30">
                  <span className="text-[9px] font-mono font-bold tracking-eyebrow text-[var(--envato)] bg-black/70 px-1">
                    PICKED
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Brief reveal */}
      <AnimatePresence>
        {brief && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.2, 0.65, 0.2, 1] }}
            className="absolute -bottom-2 right-0 translate-y-full max-w-[280px] bg-[var(--hero)]/95 backdrop-blur border border-[var(--envato)]/40 p-3.5 shadow-2xl z-10"
          >
            <div className="text-[10px] font-mono uppercase tracking-eyebrow text-[var(--envato)] mb-1.5 inline-flex items-center gap-1">
              <Sparkles className="size-3" /> Brief · auto-drafted
            </div>
            <div className="text-[12.5px] leading-snug text-white/95 mb-2">{brief.pitch}</div>
            <div className="text-[10px] text-white/55 leading-snug">{brief.tones}</div>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[9.5px] font-mono uppercase tracking-eyebrow text-white/40">
                Next: pick category
              </span>
              <button className="text-[11px] font-semibold text-[var(--envato)] hover:text-white inline-flex items-center gap-1">
                Generate →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
