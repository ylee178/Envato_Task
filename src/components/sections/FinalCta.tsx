import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="relative isolate bg-[var(--hero)] text-white overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/finalcta_bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--hero)] via-[var(--hero)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hero)]/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <h2 className="font-display text-[40px] lg:text-[60px] leading-[0.98] tracking-display font-medium">
            Your next project<br />
            starts with a <em className="not-italic text-gradient-brand">reference.</em>
          </h2>
          <p className="mt-4 text-[17px] leading-snug text-white/85">
            Millions of assets. Powerful AI. One creative flow.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center border border-[var(--envato)] bg-transparent text-white hover:bg-[var(--envato)] hover:text-[var(--ink)] px-6 py-3.5 rounded-full font-semibold text-[13.5px] transition-colors"
            >
              Start with References
            </Link>
            <Link
              href="/creative-flow"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[13.5px] font-semibold text-white border border-white/40 hover:border-[var(--envato)] hover:text-[var(--envato)] transition-colors"
            >
              Explore Envato
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
