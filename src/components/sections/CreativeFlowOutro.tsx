import Link from "next/link";

export function CreativeFlowOutro() {
  return (
    <section className="bg-[var(--bg)] py-24 lg:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10 text-center">
        <div className="text-[10.5px] font-mono uppercase tracking-eyebrow text-[var(--muted-ink)] mb-4">
          08 / 08 · Out there
        </div>
        <h2 className="font-display text-[44px] lg:text-[72px] leading-[0.95] tracking-display font-medium">
          That&apos;s the flow.<br />
          <span className="italic text-[var(--accent-purple)]">Now make something.</span>
        </h2>
        <p className="mt-6 text-[16px] leading-relaxed text-[var(--muted-ink)] max-w-[560px] mx-auto">
          One subscription. 25M+ references. Native AI tools. Lifetime commercial licence
          on everything you generate or download.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#"
            className="inline-flex items-center justify-center border border-[var(--envato)] bg-transparent text-[var(--ink)] hover:bg-[var(--envato)] px-7 py-4 rounded-full font-semibold text-[15px] transition-colors"
          >
            Start Your Trial
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-[14px] font-semibold text-[var(--ink)] border border-[var(--ink)]/30 hover:border-[var(--envato-deep)] hover:text-[var(--envato-deep)] transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
