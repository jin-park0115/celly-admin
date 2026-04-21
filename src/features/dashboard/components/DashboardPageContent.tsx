import { useForm } from "react-hook-form";
import { AlertTriangle, ArrowDown, ArrowUp, CalendarDays, Search } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import type { DashboardAlert, DashboardCellRate, DashboardMetric } from "../types";

type DashboardFilterValues = {
  year: string;
  week: string;
};

const toneClassName = {
  good: "#4C9A57",
  warning: "#D8922F",
  danger: "#D92D20",
} as const;

export const DashboardPageContent = () => {
  const { register, watch } = useForm<DashboardFilterValues>({
    defaultValues: {
      year: "2025",
      week: "2",
    },
  });
  const selectedYear = watch("year");
  const selectedWeek = watch("week");
  const { data } = useDashboardSummary();
  const weekLabelMap: Record<string, string> = {
    "1": "첫째 주",
    "2": "둘째 주",
    "3": "셋째 주",
    "4": "넷째 주",
    "5": "다섯째 주",
  };
  const periodLabel = `${selectedYear}년 1월 ${weekLabelMap[selectedWeek] ?? `${selectedWeek}주차`}`;

  return (
    <main className="min-h-full bg-[#f4f6fb] px-5 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-900">
              대시보드
            </h1>
          </div>
          <form className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <CalendarDays className="h-4 w-4" />
            </div>
            <select
              {...register("year")}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
            <select
              {...register("week")}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
            >
              <option value="1">1주차</option>
              <option value="2">2주차</option>
              <option value="3">3주차</option>
              <option value="4">4주차</option>
              <option value="5">5주차</option>
            </select>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] text-white"
            >
              <Search className="h-4 w-4" />
            </button>
            <span className="ml-1 text-sm font-semibold text-slate-500">{periodLabel}</span>
          </form>
        </div>

        <section className="grid gap-4 xl:grid-cols-4">
          {data.metrics.map((metric: DashboardMetric) => (
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

        <section className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
            <h2 className="text-base font-bold text-slate-900">제출률 추이 (최근 8주)</h2>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.submissionTrend} margin={{ top: 12, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid stroke="#dbe4f0" strokeDasharray="3 3" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <YAxis
                    domain={[60, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${String(value)}%`, "제출률"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#3b82f6" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
            <h2 className="text-base font-bold text-slate-900">셀별 제출률</h2>
            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.cellRates}
                  layout="vertical"
                  margin={{ top: 6, right: 16, left: 10, bottom: 4 }}
                  barCategoryGap={10}
                >
                  <CartesianGrid horizontal={false} stroke="#e5e7eb" strokeDasharray="2 4" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={86}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${String(value)}%`, "제출률"]}
                    labelFormatter={(_, payload) => {
                      if (!payload?.length) return "";
                      const cell = payload[0].payload as DashboardCellRate;
                      return `${cell.name} / ${cell.leader}`;
                    }}
                  />
                  <Bar dataKey="rate" radius={[0, 8, 8, 0]}>
                    {data.cellRates.map((entry: DashboardCellRate) => (
                      <Cell key={entry.name} fill={toneClassName[entry.tone]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
            <h2 className="text-base font-bold text-slate-900">주의 필요</h2>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {data.alerts.map((alert: DashboardAlert) => (
              <div
                key={alert.id}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
              >
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
};
