import { PageSection } from "../../../shared/components/PageSection";
import { MemberDetailCard } from "./MemberDetailCard";
import type { Member } from "../types";

const member: Member = {
  id: 1,
  name: "김민수",
  email: "minsu@celly.app",
  phone: "010-1234-5678",
  joinedAt: "2026-04-01",
  status: "active",
};

export const MemberDetailPageContent = () => {
  return (
    <PageSection
      title="Member Detail"
      description="상세 페이지도 page가 아니라 members feature 내부 구현에 위임합니다."
    >
      <MemberDetailCard member={member} />
    </PageSection>
  );
};
