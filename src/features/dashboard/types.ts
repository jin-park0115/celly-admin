export type DashboardMetric = {
  label: string;
  value: string;
  unit?: string;
  change: string;
  trend: "up" | "down";
};

export type DashboardTrendPoint = {
  label: string;
  rate: number;
};

export type DashboardCellRate = {
  name: string;
  leader: string;
  rate: number;
  tone: "good" | "warning" | "danger";
};

export type DashboardAlert = {
  id: number;
  message: string;
};

export type DashboardSummary = {
  periodLabel: string;
  metrics: DashboardMetric[];
  submissionTrend: DashboardTrendPoint[];
  cellRates: DashboardCellRate[];
  alerts: DashboardAlert[];
};
