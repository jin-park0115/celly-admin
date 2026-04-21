import type { Member } from "../types";

type MemberTableProps = {
  members: Member[];
};

export const MemberTable = ({ members }: MemberTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">이름</th>
            <th className="px-4 py-3 font-medium">이메일</th>
            <th className="px-4 py-3 font-medium">연락처</th>
            <th className="px-4 py-3 font-medium">상태</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-t border-slate-100">
              <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
              <td className="px-4 py-3 text-slate-600">{member.email}</td>
              <td className="px-4 py-3 text-slate-600">{member.phone}</td>
              <td className="px-4 py-3 text-slate-600">{member.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
