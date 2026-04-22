import { AlertTriangle } from "lucide-react";
import type { DashboardAlert } from "../types";

type DashboardAlertsProps = {
  alerts: DashboardAlert[];
};

export const DashboardAlerts = ({ alerts }: DashboardAlertsProps) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-2 text-amber-500">
        <AlertTriangle className="h-5 w-5" />
        <h2 className="text-base font-bold text-slate-900">주의 필요</h2>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {alerts.map((alert) => (
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
  );
};
