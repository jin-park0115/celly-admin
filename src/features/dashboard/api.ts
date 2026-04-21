import type { DashboardSummary } from "./types";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  return {
    totalMembers: 1280,
    activeCells: 48,
    pendingReports: 12,
  };
};
