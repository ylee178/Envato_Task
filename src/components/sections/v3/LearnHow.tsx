import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

type Tutorial = {
  badge: string;
  badgeStyle: "lime" | "neutral";
  title: string;
  duration: string;
  src: string;
};

const TUTORIALS: Tutorial[] = [
  {
    badge: "ENVATO AI STACK",
    badgeStyle: "lime",
    title: "From Idea to Publish: Full AI Video Workflow",
    duration: "45 min",
    src: "/v3/learn_01_aistack.jpg",
  },
  {
    badge: "IMAGEGEN",
    badgeStyle: "lime",
    title: "AI Posters from Reference Images",
    duration: "20 min",
    src: "/v3/learn_02_imagegen.jpg",
  },
  {
    badge: "VIDEOGEN",
    badgeStyle: "lime",
    title: "Consistent AI Characters with Reference Sheets",
    duration: "30 min",
    src: "/v3/learn_03_videogen.jpg",
  },
  {
    badge: "VIDEOGEN + AFTER EFFECTS",
    badgeStyle: "neutral",
    title: "Cinematic AI Video Effects on Any Budget",
    duration: "35 min",
    src: "/v3/learn_04_aftereffects.jpg",
  },
];

export function LearnHow() {
  return (
    <section className="bg-[var(--bg)] py-20 lg:py-28 border-t border-[var(--line)] relative overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-12">
          {/* Left header */}
          <div>
            <h2 className="font-display tracking-display font-medium leading-[1.0] text-[40px] lg:text-[52px] text-[var(--ink)]">
              Learn how
              <br />
              it&apos;s{" "}
              <span className="inline-block relative">
                made.
                <svg
                  viewBox="0 0 160 14"
                  className="absolute -bottom-2 left-0 w-full text-[var(--envato)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 8 C 35 12, 95 4, 156 9" />
                </svg>
              </span>
            </h2>
            <p className="mt-8 text-[14px] lg:text-[15px] leading-[1.55] text-[var(--muted-ink)] max-w-[280px]">
              AI generation workflows taught by working creators. All free.
            </p>
          </div>

          {/* Right: 4 cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {TUTORIALS.map((t) => (
              <TutorialCard key={t.title} tutorial={t} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <Link
            href="#"
            className="group inline-flex items-center gap-2 border border-[var(--ink)] px-7 py-3.5 rounded-full text-[13.5px] font-semibold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
          >
            Browse All Tutorials
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const badgeClass =
    tutorial.badgeStyle === "lime"
      ? "bg-[var(--envato)] text-[var(--ink)]"
      : "bg-white text-[var(--ink)] border border-[var(--line)]";

  return (
    <a href="#" className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#111] shadow-[0_8px_30px_-15px_rgba(0,0,0,0.35)]">
        <Image
          src={tutorial.src}
          alt={tutorial.title}
          fill
          sizes="(min-width:1024px) 20vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Tool badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center text-[9.5px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-md ${badgeClass}`}
        >
          {tutorial.badge}
        </span>

        {/* Play button */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <span className="grid place-items-center size-10 rounded-full bg-black/85 backdrop-blur-sm border border-white/20 opacity-70 group-hover:opacity-100 transition-opacity">
            <Play className="size-3.5 text-white fill-white translate-x-[1px]" strokeWidth={0} />
          </span>
        </div>
      </div>

      <h3 className="mt-4 font-display text-[17px] lg:text-[19px] leading-[1.15] tracking-tight text-[var(--ink)] line-clamp-2">
        {tutorial.title}
      </h3>

      <div className="mt-2 flex items-center gap-2 text-[12px]">
        <span className="font-mono text-[var(--ink)]/85">{tutorial.duration}</span>
        <span className="text-[var(--muted-ink)]">·</span>
        <span className="inline-block bg-[var(--envato)] text-[var(--ink)] font-mono uppercase tracking-[0.14em] text-[10px] px-2 py-0.5 rounded-full">
          FREE
        </span>
      </div>
    </a>
  );
}
