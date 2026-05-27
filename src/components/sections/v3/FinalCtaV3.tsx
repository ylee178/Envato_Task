import Image from "next/image";
import Link from "next/link";

export function FinalCtaV3() {
  return (
    <section className="relative isolate bg-[var(--hero)] text-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/v3/finalcta_v3_bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hero)] via-[var(--hero)]/55 to-[var(--hero)]/25" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10 py-24 lg:py-32 text-center">
        <h2 className="font-display tracking-display font-medium leading-[0.98] text-[44px] lg:text-[72px]">
          Stop describing taste.
          <br />
          <em className="italic text-gradient-brand">Start showing it.</em>
        </h2>

        <p className="mt-7 text-[12.5px] font-mono uppercase tracking-[0.2em] text-white/65">
          Save 35% annually · Lifetime license · 30-day money back
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center bg-[var(--envato)] text-[var(--ink)] hover:bg-[var(--envato-deep)] hover:text-white px-7 py-4 rounded-full font-semibold text-[14px] transition-colors"
          >
            Go Unlimited
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center justify-center border border-white/40 bg-transparent text-white hover:bg-[var(--envato)]/15 hover:border-[var(--envato)] hover:text-[var(--envato)] px-7 py-4 rounded-full font-semibold text-[14px] transition-colors"
          >
            See Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
