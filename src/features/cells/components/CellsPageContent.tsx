import { useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Plus, Search } from "lucide-react";
import { getCells } from "../api";
import { ROUTES } from "../../../shared/constants/routes";
import type { CellItem, CellStatus } from "../types";

type CellFilters = {
  search: string;
  department: string;
  status: "ALL" | CellStatus;
  year: string;
};

const statusLabelMap: Record<CellStatus, string> = {
  ACTIVE: "활성",
  ARCHIVED: "비활성",
  PENDING: "준비 중",
};

const statusClassNameMap: Record<CellStatus, string> = {
  ACTIVE: "border-emerald-200 bg-emerald-50 text-emerald-600",
  ARCHIVED: "border-slate-200 bg-slate-100 text-slate-500",
  PENDING: "border-orange-200 bg-orange-50 text-orange-500",
};

export const CellsPageContent = () => {
  const navigate = useNavigate();
  const { register, watch } = useForm<CellFilters>({
    defaultValues: {
      search: "",
      department: "ALL",
      status: "ALL",
      year: "2026",
    },
  });

  const cells = getCells();
  const search = watch("search");
  const department = watch("department");
  const status = watch("status");

  const filteredCells = useMemo(() => {
    return cells.filter((cell) => {
      const matchesSearch =
        search.trim().length === 0 ||
        cell.name.toLowerCase().includes(search.toLowerCase()) ||
        (cell.leader ?? "").toLowerCase().includes(search.toLowerCase());
      const matchesDepartment =
        department === "ALL" || cell.department === department;
      const matchesStatus = status === "ALL" || cell.status === status;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [cells, department, search, status]);

  const summary = useMemo(() => {
    const activeCount = cells.filter((cell) => cell.status === "ACTIVE").length;
    const pendingCount = cells.filter(
      (cell) => cell.status === "PENDING",
    ).length;
    const archivedCount = cells.filter(
      (cell) => cell.status === "ARCHIVED",
    ).length;

    return {
      total: cells.length,
      activeCount,
      pendingCount,
      archivedCount,
    };
  }, [cells]);

  return (
    <main className="min-h-full bg-[#f4f6fb] px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-[22px] font-bold tracking-[-0.03em] text-slate-900">
              셀 관리
            </h1>
          </div>
          <Link
            to={ROUTES.cellNew}
            className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-md bg-[#1976d2] px-4 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(25,118,210,0.22)] transition hover:bg-[#1669bc]"
          >
            <Plus className="h-4 w-4" />새 셀 만들기
          </Link>
        </div>

        <section className="flex flex-col gap-3 md:flex-row">
          <div className="flex flex-1 items-center gap-3 bg-slate-50 rounded-md border border-slate-200 px-4">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              {...register("search")}
              placeholder="셀 이름 또는 셀리더 이름..."
              className="h-9 w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <select
            {...register("department")}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none md:w-[160px]"
          >
            <option value="ALL">전체 구역</option>
            <option value="청년 2부">청년 2부</option>
          </select>
          <select
            {...register("status")}
            className="h-9 rounded-md border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none md:w-[140px]"
          >
            <option value="ALL">상태: 전체</option>
            <option value="ACTIVE">상태: 활성</option>
            <option value="ARCHIVED">상태: 비활성</option>
            <option value="PENDING">상태: 준비 중</option>
          </select>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-white text-slate-500">
                <tr>
                  <th className="py-[10px] text-center font-semibold">
                    셀 이름
                  </th>
                  <th className="py-[10px] font-semibold">부서</th>
                  <th className="py-[10px] font-semibold">셀리더</th>
                  <th className="py-[10px] font-semibold">인원</th>
                  <th className="py-[10px] font-semibold">제출률</th>
                  <th className="py-[10px] font-semibold">상태</th>
                </tr>
              </thead>
              <tbody>
                {filteredCells.map((cell) => (
                  <tr
                    key={cell.id}
                    className="cursor-pointer border-b border-slate-100 text-slate-700 transition hover:bg-slate-50 last:border-b-0"
                    onClick={() => void navigate({ to: ROUTES.cellDetail(cell.id) })}
                  >
                    <td className="py-[9px] text-center font-semibold text-slate-900">
                      {cell.name}
                    </td>
                    <td className="py-[9px]">{cell.department}</td>
                    <td className="py-[9px]">{cell.leader ?? "-"}</td>
                    <td className="py-[9px]">
                      {cell.memberCount}명 / {cell.maxMembers}명
                    </td>
                    <td className="py-[9px]">
                      <SubmissionRateCell
                        submissionRate={cell.submissionRate}
                      />
                    </td>

                    <td className="py-[9px]">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClassNameMap[cell.status]}`}
                      >
                        {statusLabelMap[cell.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            총 {summary.total}개 셀 | 활성 {summary.activeCount}개 | 준비 중{" "}
            {summary.pendingCount}개 | 비활성 {summary.archivedCount}개
          </p>
          <div className="flex items-center gap-2 self-end">
            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-300"
            >
              이전
            </button>
            <span className="px-2 text-slate-500">1 / 1</span>
            <button
              type="button"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 font-medium text-slate-300"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const SubmissionRateCell = ({
  submissionRate,
}: {
  submissionRate: CellItem["submissionRate"];
}) => {
  if (submissionRate === null) {
    return <span className="text-slate-400">-</span>;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#1976d2]"
          style={{ width: `${submissionRate}%` }}
        />
      </div>
      <span className="font-medium text-slate-600">{submissionRate}%</span>
    </div>
  );
};
