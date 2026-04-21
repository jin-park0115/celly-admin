import type { MemberFormValues } from "../types";

type MemberFormProps = {
  initialValues?: MemberFormValues;
};

export const MemberForm = ({ initialValues }: MemberFormProps) => {
  return (
    <form className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="member-name">
          이름
        </label>
        <input
          id="member-name"
          defaultValue={initialValues?.name}
          className="rounded-xl border border-slate-200 px-3 py-2"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="member-email">
          이메일
        </label>
        <input
          id="member-email"
          defaultValue={initialValues?.email}
          className="rounded-xl border border-slate-200 px-3 py-2"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="member-phone">
          연락처
        </label>
        <input
          id="member-phone"
          defaultValue={initialValues?.phone}
          className="rounded-xl border border-slate-200 px-3 py-2"
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="member-status">
          상태
        </label>
        <select
          id="member-status"
          defaultValue={initialValues?.status ?? "active"}
          className="rounded-xl border border-slate-200 px-3 py-2"
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>
    </form>
  );
};
