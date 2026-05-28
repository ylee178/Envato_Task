type Stat = {
  kpi: string;
  label: string;
};

const STATS: Stat[] = [
  { kpi: "28M+", label: "Human-crafted references" },
  { kpi: "Unlimited", label: "Downloads" },
  { kpi: "One subscription", label: "All-in-one" },
  { kpi: "Lifetime", label: "Commercial license" },
];

export function KpiV4() {
  return (
    <section
      className="bg-[var(--bg)]"
      style={{ paddingTop: "var(--space-8)", paddingBottom: "var(--space-8)" }}
    >
      <div className="mx-auto max-w-[1180px] w-full px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-4 items-center">
          {STATS.map(({ kpi, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1 min-w-0">
              <span className="font-display text-[18px] lg:text-[22px] tracking-display font-medium text-[var(--ink)] leading-[1.1]">
                {kpi}
              </span>
              <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-[var(--muted-ink)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
