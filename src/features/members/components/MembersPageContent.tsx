import { PageSection } from "../../../shared/components/PageSection";
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
  return (
    <PageSection
      title="Members"
      description="members feature가 목록 화면과 관련 컴포넌트, 타입, API를 함께 소유합니다."
    >
      <MemberTable members={members} />
    </PageSection>
  );
};
