import { CalendarDays, Search } from "lucide-react";
import type { UseFormRegister } from "react-hook-form";

type DashboardFilterValues = {
  year: string;
  week: string;
};

type DashboardFiltersProps = {
  periodLabel: string;
  register: UseFormRegister<DashboardFilterValues>;
  weekOptions: Array<{
    value: number;
    label: string;
  }>;
};

export const DashboardFilters = ({
  periodLabel,
  register,
  weekOptions,
}: DashboardFiltersProps) => {
  return (
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
        {weekOptions.map((week) => (
          <option key={week.value} value={week.value}>
            {week.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb] text-white"
      >
        <Search className="h-4 w-4" />
      </button>
      <span className="ml-1 text-sm font-semibold text-slate-500">{periodLabel}</span>
    </form>
  );
};
