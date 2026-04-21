import { PageSection } from "../../../shared/components/PageSection";

const stats = [
  { label: "총 회원", value: "1,280" },
  { label: "활성 셀", value: "48" },
  { label: "대기 리포트", value: "12" },
];

export const DashboardPageContent = () => {
  return (
    <PageSection
      title="Dashboard"
      description="페이지는 진입점만 맡고, 실제 화면 구성은 dashboard feature가 소유합니다."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <section
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <strong className="mt-2 block text-3xl font-semibold text-slate-900">
              {stat.value}
            </strong>
          </section>
        ))}
      </div>
    </PageSection>
  );
};
