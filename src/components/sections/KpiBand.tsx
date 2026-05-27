/*
 * Light-mode KPI band that sits between the dark hero and the dark
 * reference-layer section. Acts as a visual divider while carrying the five
 * trust signals (Assets / Creators / Licensed / Downloads / Subscription).
 */

const STATS = [
  { kpi: "25M+",      label: "Assets" },
  { kpi: "3M+",       label: "Creators" },
  { kpi: "100%",      label: "Licensed" },
  { kpi: "Unlimited", label: "Downloads" },
  { kpi: "One",       label: "Subscription" },
];

export function KpiBand() {
  return (
    <section className="bg-[var(--bg)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-10 lg:py-14 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-4 text-center">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col items-center">
            <div className="font-display text-[28px] lg:text-[34px] leading-none tracking-display font-medium text-[var(--ink)] whitespace-nowrap">
              {s.kpi}
            </div>
            <div className="mt-2 text-[12px] text-[var(--muted-ink)] whitespace-nowrap">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
