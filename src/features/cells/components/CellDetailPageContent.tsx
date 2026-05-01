import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import { Archive, Check, Copy, Pencil, Plus, Users } from "lucide-react";
import { getCellDetail } from "../api";
import { ROUTES } from "../../../shared/constants/routes";
import { ArrowLeft } from "lucide-react";
import type { CellDetailMember, CellStatus } from "../types";

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

const formatDate = (value: string) => {
  const date = new Date(value);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate(),
  ).padStart(2, "0")}`;
};

export const CellDetailPageContent = () => {
  const { cellId } = useParams({ from: "/cells/$cellId" });
  const cell = getCellDetail(Number(cellId));
  const [isInviteCodeCopied, setIsInviteCodeCopied] = useState(false);

  const handleCopyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(cell.inviteCode);
      setIsInviteCodeCopied(true);
      window.setTimeout(() => setIsInviteCodeCopied(false), 1800);
    } catch {
      setIsInviteCodeCopied(false);
    }
  };

  return (
    <main className="min-h-full bg-[#f4f6fb] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <Link
              to={ROUTES.cells}
              className="inline-flex items-center gap-2 self-start   text-sm font-semibold text-gray-500 transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />셀 목록
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil className="h-4 w-4" />
              수정
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#1976d2] px-4 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(25,118,210,0.22)] transition hover:bg-[#1669bc]"
            >
              <Plus className="h-4 w-4" />
              셀원 추가
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-500 transition hover:bg-rose-100"
            >
              <Archive className="h-4 w-4" />
              아카이브
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <h2 className="text-[30px] font-bold tracking-[-0.03em] text-slate-900">
                {cell.name}
              </h2>
              <span
                className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClassNameMap[cell.status]}`}
              >
                {statusLabelMap[cell.status]}
              </span>
            </div>
            <p className="text-sm text-slate-500">{cell.description}</p>

            <dl className="mt-5 grid gap-5 md:grid-cols-2">
              <DetailItem label="부서" value={cell.department} />
              <DetailItem label="연도" value={`${cell.year}년`} />
              <div>
                <dt className="text-xs font-medium text-slate-400">초대코드</dt>
                <dd className="mt-1 flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold text-slate-700">
                    {cell.inviteCode}
                  </span>
                  <button
                    type="button"
                    onClick={() => void handleCopyInviteCode()}
                    className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                  >
                    {isInviteCodeCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        복사됨
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        복사하기
                      </>
                    )}
                  </button>
                </dd>
              </div>
              <DetailItem
                label="초대코드 만료일"
                value={formatDate(cell.inviteCodeExpiresAt)}
              />
              <DetailItem label="리더" value={cell.leader.name} />
              <DetailItem label="리더 연락처" value={cell.leader.phone} />
            </dl>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#1976d2]" />
              <h2 className="text-lg font-semibold text-slate-900">통계</h2>
            </div>
            <div className="mt-5 grid gap-4">
              <StatCard
                label="평균 제출률"
                value={`${cell.stats.averageSubmissionRate}%`}
              />
              <StatCard
                label="총 기도제목 수"
                value={`${cell.stats.totalPrayerRequests}개`}
              />
              <StatCard
                label="활성 기도제목 수"
                value={`${cell.stats.activePrayerRequests}개`}
              />
            </div>
          </section>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">셀원 목록</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-white text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">이름</th>
                  <th className="px-4 py-4 font-semibold">셀 역할</th>
                  <th className="px-4 py-4 font-semibold">전화번호</th>
                  <th className="px-4 py-4 font-semibold">합류일</th>
                  <th className="px-4 py-4 font-semibold">최근 제출 주차</th>
                  <th className="px-6 py-4 font-semibold">제출률</th>
                </tr>
              </thead>
              <tbody>
                {cell.members.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-slate-100 text-slate-700 last:border-b-0"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {member.name}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          member.cellRole === "LEADER"
                            ? "bg-blue-50 text-[#1976d2]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {member.cellRole === "LEADER" ? "리더" : "셀원"}
                      </span>
                    </td>
                    <td className="px-4 py-4">{member.phone}</td>
                    <td className="px-4 py-4">{formatDate(member.joinedAt)}</td>
                    <td className="px-4 py-4">{member.recentSubmissionWeek}</td>
                    <td className="px-6 py-4">
                      <SubmissionRateCell
                        submissionRate={member.submissionRate}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const DetailItem = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-400">{label}</dt>
      <dd
        className={`mt-1 text-sm font-semibold text-slate-700 ${mono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <strong className="mt-1 block text-2xl font-bold tracking-[-0.03em] text-slate-900">
        {value}
      </strong>
    </div>
  );
};

const SubmissionRateCell = ({
  submissionRate,
}: {
  submissionRate: CellDetailMember["submissionRate"];
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-[#1976d2]"
          style={{ width: `${submissionRate}%` }}
        />
      </div>
      <span className="font-medium text-slate-600">{submissionRate}%</span>
    </div>
  );
};
