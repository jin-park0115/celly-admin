import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { ArrowLeft, Check, Copy, Search, Sparkles } from "lucide-react";
import { getUnassignedMembers } from "../api";
import { ROUTES } from "../../../shared/constants/routes";

type CellCreateFormValues = {
  name: string;
  department: string;
  leaderId: string;
  memberIds: string[];
};

type CreatedCellPreview = {
  inviteCode: string;
  name: string;
  leaderName: string;
  memberCount: number;
};

const createInviteCode = (
  name: string,
  department: string,
  randomChunk = "PRE",
) => {
  const nameChunk = name.replace(/\s+/g, "").slice(0, 3).toUpperCase() || "CEL";
  const departmentChunk = department.slice(0, 2).toUpperCase() || "DP";

  return `${departmentChunk}-${nameChunk}${randomChunk}`;
};

export const CellNewPageContent = () => {
  const members = getUnassignedMembers();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CellCreateFormValues>({
    defaultValues: {
      name: "",
      department: "청년 1부",
      leaderId: "",
      memberIds: [],
    },
  });
  const [leaderSearch, setLeaderSearch] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [createdCellPreview, setCreatedCellPreview] =
    useState<CreatedCellPreview | null>(null);

  const selectedLeaderId = watch("leaderId");
  const selectedMemberIds = watch("memberIds");
  const selectedDepartment = watch("department");
  const selectedName = watch("name");
  const inviteCodePreview = createInviteCode(selectedName, selectedDepartment);

  const leaderCandidates = useMemo(() => {
    return members.filter((member) => {
      const matchesRole = member.role === "LEADER";
      const matchesSearch =
        leaderSearch.trim().length === 0 ||
        member.name.includes(leaderSearch) ||
        member.phone.includes(leaderSearch);

      return matchesRole && matchesSearch;
    });
  }, [leaderSearch, members]);

  const memberCandidates = useMemo(() => {
    return members.filter((member) => {
      const isNotLeader = String(member.id) !== selectedLeaderId;
      const matchesSearch =
        memberSearch.trim().length === 0 ||
        member.name.includes(memberSearch) ||
        member.phone.includes(memberSearch);

      return isNotLeader && matchesSearch;
    });
  }, [memberSearch, members, selectedLeaderId]);

  const selectedLeader =
    members.find((member) => String(member.id) === selectedLeaderId) ?? null;
  const selectedMembers = members.filter((member) =>
    selectedMemberIds.includes(String(member.id)),
  );

  const toggleMember = (memberId: string) => {
    const nextMemberIds = selectedMemberIds.includes(memberId)
      ? selectedMemberIds.filter((id) => id !== memberId)
      : [...selectedMemberIds, memberId];

    setValue("memberIds", nextMemberIds, { shouldDirty: true });
  };

  const onSubmit = handleSubmit((values) => {
    const leader = members.find(
      (member) => String(member.id) === values.leaderId,
    );
    const randomChunk = Math.random().toString(36).slice(2, 5).toUpperCase();

    setCreatedCellPreview({
      inviteCode: createInviteCode(values.name, values.department, randomChunk),
      name: values.name,
      leaderName: leader?.name ?? "-",
      memberCount: values.memberIds.length,
    });
  });

  return (
    <main className="min-h-full bg-[#f4f6fb] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <Link
              to={ROUTES.cells}
              className="inline-flex items-center gap-2 self-start  text-sm font-semibold text-gray-500  transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />셀 목록
            </Link>

            <p className="text-sm text-slate-500">
              목업 폼 단계입니다. 실제 API는 이후 `POST /api/v1/admin/cells`로
              연결합니다.
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <form
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]"
            onSubmit={onSubmit}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="셀 이름" required error={errors.name?.message}>
                <input
                  {...register("name", {
                    required: "셀 이름은 필수입니다.",
                  })}
                  placeholder="예: 바울셀"
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm text-slate-700 outline-none"
                />
              </Field>

              <Field label="부서" required error={errors.department?.message}>
                <select
                  {...register("department", {
                    required: "부서를 선택해 주세요.",
                  })}
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-sm text-slate-700 outline-none"
                >
                  <option value="청년 1부">청년 1부</option>
                  <option value="청년 2부">청년 2부</option>
                  <option value="대학부">대학부</option>
                </select>
              </Field>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Sparkles className="h-4 w-4 text-[#1976d2]" />
                초대코드 자동 생성
              </div>
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <span className="font-mono text-sm font-semibold text-slate-700">
                  {inviteCodePreview}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500"
                >
                  <Copy className="h-3.5 w-3.5" />
                  복사
                </button>
              </div>
            </div>

            <Field
              label="리더 선택"
              required
              error={errors.leaderId?.message}
              className="mt-5"
            >
              <div className="rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 border-b border-slate-200 px-4">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={leaderSearch}
                    onChange={(event) => setLeaderSearch(event.target.value)}
                    placeholder="리더 이름 또는 연락처 검색"
                    className="h-12 w-full border-0 bg-transparent text-sm text-slate-700 outline-none"
                  />
                </div>
                <div className="max-h-56 overflow-y-auto p-3">
                  <input
                    {...register("leaderId", {
                      required: "리더는 필수 선택입니다.",
                    })}
                    type="hidden"
                  />
                  <div className="grid gap-2">
                    {leaderCandidates.map((member) => {
                      const isSelected = String(member.id) === selectedLeaderId;

                      return (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() =>
                            setValue("leaderId", String(member.id), {
                              shouldDirty: true,
                            })
                          }
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                            isSelected
                              ? "border-[#1976d2] bg-blue-50"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div>
                            <p className="font-semibold text-slate-800">
                              {member.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {member.department} · {member.phone}
                            </p>
                          </div>
                          {isSelected ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#1976d2] text-white">
                              <Check className="h-3.5 w-3.5" />
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Field>

            <Field label="멤버 배정" className="mt-5">
              <div className="rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 border-b border-slate-200 px-4">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    value={memberSearch}
                    onChange={(event) => setMemberSearch(event.target.value)}
                    placeholder="미소속 멤버 검색"
                    className="h-12 w-full border-0 bg-transparent text-sm text-slate-700 outline-none"
                  />
                </div>
                <div className="max-h-64 overflow-y-auto p-3">
                  <div className="grid gap-2">
                    {memberCandidates.map((member) => {
                      const isSelected = selectedMemberIds.includes(
                        String(member.id),
                      );

                      return (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => toggleMember(String(member.id))}
                          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                            isSelected
                              ? "border-[#1976d2] bg-blue-50"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <div>
                            <p className="font-semibold text-slate-800">
                              {member.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {member.department} · {member.phone}
                            </p>
                          </div>
                          <div
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-md border ${
                              isSelected
                                ? "border-[#1976d2] bg-[#1976d2] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {isSelected ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Field>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#1976d2] px-6 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(25,118,210,0.22)] transition hover:bg-[#1669bc]"
              >
                목업 셀 생성
              </button>
            </div>
          </form>

          <aside className="flex flex-col gap-5">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
              <h2 className="text-lg font-semibold text-slate-900">
                선택 요약
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <SummaryItem
                  label="선택된 리더"
                  value={selectedLeader?.name ?? "선택 전"}
                />
                <SummaryItem
                  label="배정 멤버 수"
                  value={`${selectedMembers.length}명`}
                />
                <SummaryItem
                  label="예상 초대코드"
                  value={inviteCodePreview}
                  mono
                />
              </dl>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_10px_24px_rgba(15,23,42,0.04)]">
              <h2 className="text-lg font-semibold text-slate-900">
                생성 결과
              </h2>
              {createdCellPreview ? (
                <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-emerald-700">
                    {createdCellPreview.name} 생성 완료
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    리더: {createdCellPreview.leaderName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    초기 멤버: {createdCellPreview.memberCount}명
                  </p>
                  <p className="mt-3 rounded-xl bg-white px-3 py-2 font-mono text-sm font-semibold text-slate-700">
                    {createdCellPreview.inviteCode}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  목업 셀을 생성하면 여기에 자동 생성된 초대코드와 요약 결과가
                  표시됩니다.
                </p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

const Field = ({
  label,
  children,
  error,
  required = false,
  className = "",
}: {
  label: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center gap-1 text-sm font-semibold text-slate-800">
        <span>{label}</span>
        {required ? <span className="text-rose-500">*</span> : null}
      </div>
      {children}
      {error ? (
        <p className="mt-2 text-xs font-medium text-rose-500">{error}</p>
      ) : null}
    </div>
  );
};

const SummaryItem = ({
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
