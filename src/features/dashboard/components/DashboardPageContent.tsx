import { useForm } from "react-hook-form";
import { CellRateChart } from "./CellRateChart";
import { DashboardAlerts } from "./DashboardAlerts";
import { DashboardFilters } from "./DashboardFilters";
import { DashboardMetricCards } from "./DashboardMetricCards";
import { SubmissionTrendChart } from "./SubmissionTrendChart";
import { useDashboardPeriod } from "../hooks/useDashboardPeriod";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

type DashboardFilterValues = {
  year: string;
  week: string;
};

export const DashboardPageContent = () => {
  const { data } = useDashboardSummary();
  const { register, watch } = useForm<DashboardFilterValues>({
    defaultValues: {
      year: String(new Date().getFullYear()),
      week: "1",
    },
  });
  const dashboardPeriod = useDashboardPeriod({
    selectedYear: watch("year"),
    selectedWeek: watch("week"),
    trendPoints: data.submissionTrend,
  });

  return (
    <main className="min-h-full bg-[#f4f6fb] px-5 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[30px] font-bold tracking-[-0.03em] text-slate-900">
              대시보드
            </h1>
          </div>
          <DashboardFilters
            register={register}
            weekOptions={dashboardPeriod.weekSelectOptions}
            periodLabel={dashboardPeriod.periodLabel}
          />
        </div>

        <DashboardMetricCards metrics={data.metrics} />

        <section className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
          <SubmissionTrendChart data={dashboardPeriod.submissionTrendData} />
          <CellRateChart data={data.cellRates} />
        </section>

        <DashboardAlerts alerts={data.alerts} />
      </div>
    </main>
  );
};
