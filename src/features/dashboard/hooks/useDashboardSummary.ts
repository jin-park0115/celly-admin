import { getDashboardSummary } from "../api";

export const useDashboardSummary = () => {
  return {
    data: getDashboardSummary(),
  };
};
