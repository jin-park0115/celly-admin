import { ArrowDown, ArrowUp } from "lucide-react";
import type { DashboardMetric } from "../types";

type DashboardMetricCardsProps = {
  metrics: DashboardMetric[];
};

export const DashboardMetricCards = ({ metrics }: DashboardMetricCardsProps) => {
  return (
    <section className="grid gap-4 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article
          key={metric.label}
          className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]"
        >
          <p className="text-sm font-semibold text-slate-500">{metric.label}</p>
          <div className="mt-4 flex items-end gap-1">
            <strong className="text-4xl font-bold tracking-[-0.04em] text-slate-900">
              {metric.value}
            </strong>
            {metric.unit ? (
              <span className="pb-1 text-base font-semibold text-slate-500">
                {metric.unit}
              </span>
            ) : null}
          </div>
          <div
            className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
              metric.trend === "up" ? "text-emerald-600" : "text-rose-500"
            }`}
          >
            {metric.trend === "up" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>{metric.change}</span>
          </div>
        </article>
      ))}
    </section>
  );
};
