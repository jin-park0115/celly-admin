import type { DashboardSummary } from "./types";

export const getDashboardSummary = (): DashboardSummary => {
  return {
    periodLabel: "2026년 4월 20일 - 2026년 4월 26일",
    metrics: [
      {
        label: "총 셀 수",
        value: "42",
        unit: "개",
        change: "+2 전주 대비",
        trend: "up",
      },
      {
        label: "총 셀원",
        value: "312",
        unit: "명",
        change: "+8 전주 대비",
        trend: "up",
      },
      {
        label: "이번 주 제출률",
        value: "78%",
        change: "-3% 전주 대비",
        trend: "down",
      },
      {
        label: "전체 출석률",
        value: "85%",
        change: "+2% 전주 대비",
        trend: "up",
      },
    ],
    submissionTrend: [
      { label: "3/2", rate: 77 },
      { label: "3/9", rate: 80 },
      { label: "3/16", rate: 85 },
      { label: "3/23", rate: 82 },
      { label: "3/30", rate: 79 },
      { label: "4/6", rate: 83 },
      { label: "4/13", rate: 81 },
      { label: "4/20", rate: 78 },
    ],
    cellRates: [
      { name: "모세셀", leader: "김민수", rate: 89, tone: "good" },
      { name: "다윗셀", leader: "박수진", rate: 84, tone: "good" },
      { name: "느헤미야셀", leader: "이도윤", rate: 85, tone: "good" },
      { name: "여호수아셀", leader: "최하은", rate: 82, tone: "good" },
      { name: "사무엘셀", leader: "정우성", rate: 79, tone: "good" },
      { name: "다니엘셀", leader: "최유리", rate: 74, tone: "warning" },
      { name: "에스더셀", leader: "한서윤", rate: 71, tone: "warning" },
      { name: "요셉셀", leader: "오지훈", rate: 60, tone: "danger" },
    ],
    alerts: [
      { id: 1, message: "요셉셀 - 제출률 60% (전주 대비 -20%)" },
      { id: 2, message: "최유리(다니엘셀) - 3주 연속 미제출" },
      { id: 3, message: "청년부 전체 출석률이 전주 대비 4% 하락했습니다." },
    ],
  };
};
