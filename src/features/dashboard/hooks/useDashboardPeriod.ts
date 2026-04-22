import {
  formatShortDate,
  getIsoWeekCount,
  getIsoWeekInfo,
  getIsoWeekStartDate,
  getWeekOfMonthLabel,
  getWeekRangeLabel,
} from "../lib/date";
import type { DashboardSummary } from "../types";

export type DashboardPeriodParams = {
  selectedYear: string;
  selectedWeek: string;
  trendPoints: DashboardSummary["submissionTrend"];
};

export const useDashboardPeriod = ({
  selectedYear,
  selectedWeek,
  trendPoints,
}: DashboardPeriodParams) => {
  const currentIsoWeek = getIsoWeekInfo(new Date());
  const parsedYear = Number(selectedYear);
  const totalWeekCount = getIsoWeekCount(parsedYear);
  const weekWindowStart =
    parsedYear === currentIsoWeek.year ? Math.max(currentIsoWeek.week - 3, 1) : 1;
  const weekWindowEnd =
    parsedYear === currentIsoWeek.year ? currentIsoWeek.week : totalWeekCount;
  const weekOptions = Array.from(
    { length: Math.max(weekWindowEnd - weekWindowStart + 1, 1) },
    (_, index) => weekWindowStart + index,
  );
  const fallbackWeek = weekOptions[weekOptions.length - 1];
  const parsedWeek = weekOptions.includes(Number(selectedWeek))
    ? Number(selectedWeek)
    : fallbackWeek;

  return {
    currentIsoWeek,
    parsedWeek,
    periodLabel: getWeekRangeLabel(parsedYear, parsedWeek),
    weekSelectOptions: weekOptions.map((week) => {
      const startDate = getIsoWeekStartDate(parsedYear, week);

      return {
        value: week,
        label: getWeekOfMonthLabel(startDate),
      };
    }),
    submissionTrendData: trendPoints.map((point, index) => {
      const chartWeek = parsedWeek - (trendPoints.length - 1 - index);
      const normalizedWeek = chartWeek > 0 ? chartWeek : 1;
      const startDate = getIsoWeekStartDate(parsedYear, normalizedWeek);

      return {
        ...point,
        label: formatShortDate(startDate),
      };
    }),
  };
};
