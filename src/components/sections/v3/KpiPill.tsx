import { Files, Users, ShieldCheck, Download, Gem } from "lucide-react";

const STATS = [
  { Icon: Files, kpi: "25M+", label: "Assets" },
  { Icon: Users, kpi: "3M+", label: "Creators" },
  { Icon: ShieldCheck, kpi: "100%", label: "Licensed" },
  { Icon: Download, kpi: "Unlimited", label: "Downloads" },
  { Icon: Gem, kpi: "One", label: "Subscription" },
];

export function KpiPill() {
  return (
    <section className="bg-[var(--bg)] min-h-[180px] lg:min-h-[220px] flex items-center">
      <div className="mx-auto max-w-[1180px] w-full px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4 items-center">
          {STATS.map(({ Icon, kpi, label }) => (
            <div key={label} className="flex items-center gap-4 min-w-0">
              <Icon className="size-8 lg:size-9 text-[var(--ink)]/70 shrink-0" strokeWidth={1.6} />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[24px] lg:text-[30px] tracking-display font-medium text-[var(--ink)] whitespace-nowrap">
                  {kpi}
                </span>
                <span className="text-[10.5px] font-mono uppercase tracking-[0.2em] text-[var(--muted-ink)]">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
