import { PageSection } from "../../../shared/components/PageSection";
import { MemberForm } from "./MemberForm";

export const MemberEditPageContent = () => {
  return (
    <PageSection
      title="Member Edit"
      description="수정 폼도 members feature 안에서 관리하면 화면별 로직이 흩어지지 않습니다."
    >
      <MemberForm
        initialValues={{
          name: "김민수",
          email: "minsu@celly.app",
          phone: "010-1234-5678",
          status: "active",
        }}
      />
    </PageSection>
  );
};
