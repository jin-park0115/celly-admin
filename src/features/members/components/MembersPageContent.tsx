import { PageSection } from "../../../shared/components/PageSection";
import { useFilterStore } from "../../../store/filterStore";
import { MemberTable } from "./MemberTable";
import type { Member } from "../types";

const members: Member[] = [
  {
    id: 1,
    name: "김민수",
    email: "minsu@celly.app",
    phone: "010-1234-5678",
    joinedAt: "2026-04-01",
    status: "active",
  },
  {
    id: 2,
    name: "이지은",
    email: "jieun@celly.app",
    phone: "010-4321-8765",
    joinedAt: "2026-04-07",
    status: "inactive",
  },
];

export const MembersPageContent = () => {
  const keyword = useFilterStore((state) => state.keyword);
  const status = useFilterStore((state) => state.status);
  const setKeyword = useFilterStore((state) => state.setKeyword);
  const setStatus = useFilterStore((state) => state.setStatus);
  const reset = useFilterStore((state) => state.reset);

  const filteredMembers = members.filter((member) => {
    const matchesKeyword =
      keyword.trim().length === 0 ||
      member.name.includes(keyword) ||
      member.email.includes(keyword) ||
      member.phone.includes(keyword);
    const matchesStatus = status === "all" || member.status === status;

    return matchesKeyword && matchesStatus;
  });

  return (
    <PageSection
      title="Members"
      description="members feature가 목록 화면과 관련 컴포넌트, 타입, API를 함께 소유합니다."
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="이름, 이메일, 연락처 검색"
          className="flex-1 rounded-xl border border-slate-200 px-3 py-2"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2"
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
        >
          필터 초기화
        </button>
      </div>
      <MemberTable members={filteredMembers} />
    </PageSection>
  );
};
