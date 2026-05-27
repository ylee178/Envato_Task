import {
  MiamiDolphinsLogo,
  KpmgLogo,
  AudibleLogo,
  WarnerMediaLogo,
  PepsicoLogo,
  UnicefLogo,
} from "@/components/icons/brand-logos";

/*
 * Minimal "Trusted by top brands" band — sits above the footer, reuses the
 * verified brand logos from the main homepage's SocialProof section.
 */

const LOGOS = [
  MiamiDolphinsLogo,
  KpmgLogo,
  AudibleLogo,
  WarnerMediaLogo,
  PepsicoLogo,
  UnicefLogo,
];

export function TrustedByV4() {
  return (
    <section
      className="bg-[var(--bg)] border-t border-[var(--line)]"
      style={{ paddingTop: "var(--space-16)", paddingBottom: "var(--space-16)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center text-[10.5px] font-mono uppercase tracking-[0.24em] text-[var(--muted-ink)] mb-8 lg:mb-10">
          Trusted by top brands
        </div>
        <div className="flex items-center justify-center flex-wrap lg:flex-nowrap gap-x-8 md:gap-x-12 lg:gap-x-14 gap-y-8">
          {LOGOS.map((Logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-9 lg:h-10 overflow-visible shrink-0 [&>svg]:h-full [&>svg]:w-auto"
            >
              <Logo />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
