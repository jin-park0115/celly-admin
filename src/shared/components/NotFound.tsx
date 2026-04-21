import { Link } from "@tanstack/react-router";
import { ROUTES } from "../constants/routes";

export const NotFound = () => {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-slate-600">라우터는 연결됐지만 요청한 경로는 정의되어 있지 않습니다.</p>
        <Link
          to={ROUTES.dashboard}
          className="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white"
        >
          대시보드로 이동
        </Link>
      </div>
    </main>
  );
};
