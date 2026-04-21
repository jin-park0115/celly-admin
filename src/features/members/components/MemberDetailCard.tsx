import type { Member } from "../types";

type MemberDetailCardProps = {
  member: Member;
};

export const MemberDetailCard = ({ member }: MemberDetailCardProps) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{member.name}</h2>
      <dl className="mt-4 grid gap-3 text-sm text-slate-600">
        <div>
          <dt className="font-medium text-slate-500">이메일</dt>
          <dd>{member.email}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">연락처</dt>
          <dd>{member.phone}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">가입일</dt>
          <dd>{member.joinedAt}</dd>
        </div>
        <div>
          <dt className="font-medium text-slate-500">상태</dt>
          <dd>{member.status}</dd>
        </div>
      </dl>
    </section>
  );
};
