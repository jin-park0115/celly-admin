import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardCellRate } from "../types";

const toneClassName = {
  good: "#4C9A57",
  warning: "#D8922F",
  danger: "#D92D20",
} as const;

type CellRateChartProps = {
  data: DashboardCellRate[];
};

export const CellRateChart = ({ data }: CellRateChartProps) => {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
      <h2 className="text-base font-bold text-slate-900">셀별 제출률</h2>
      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              {data.map((entry) => (
                <Cell key={entry.name} fill={toneClassName[entry.tone]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};
