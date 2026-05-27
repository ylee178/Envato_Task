import {
  MiamiDolphinsLogo,
  KpmgLogo,
  AudibleLogo,
  WarnerMediaLogo,
  PepsicoLogo,
  UnicefLogo,
} from "@/components/icons/brand-logos";

const LOGOS = [
  MiamiDolphinsLogo,
  KpmgLogo,
  AudibleLogo,
  WarnerMediaLogo,
  PepsicoLogo,
  UnicefLogo,
];

export function LovedByBrands() {
  return (
    <section className="bg-[var(--bg)] py-20 lg:py-24 border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <h2 className="font-display tracking-display font-medium leading-[1.05] text-[28px] lg:text-[34px] text-[var(--ink)]">
              Loved by creators
              <br />
              around the world.
            </h2>
            <p className="mt-3 text-[13px] text-[var(--muted-ink)]">And thousands more.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 lg:gap-x-8 gap-y-8 items-center">
            {LOGOS.map((Logo, i) => (
              <div key={i} className="flex items-center justify-center h-8 w-full overflow-visible text-[var(--ink)]/85">
                <Logo />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
