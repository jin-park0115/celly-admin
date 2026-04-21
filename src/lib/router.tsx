import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";
import MemberDetailPage from "../pages/members/MemberDetailPage";
import MemberEditPage from "../pages/members/MemberEditPage";
import MembersPage from "../pages/members/MembersPage";
import { NotFound } from "../shared/components/NotFound";
import { ROUTES } from "../shared/constants/routes";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

const RootLayout = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loginAsAdmin = useAuthStore((state) => state.loginAsAdmin);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-7xl md:grid-cols-[240px_1fr]">
        <aside
          className={`border-r border-slate-200 bg-slate-950 px-5 py-6 text-slate-100 ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Celly</p>
              <strong className="mt-2 block text-lg">Admin Console</strong>
            </div>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            <Link
              to={ROUTES.dashboard}
              className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              activeProps={{ className: "rounded-xl bg-white/10 px-3 py-2 text-sm text-white" }}
            >
              Dashboard
            </Link>
            <Link
              to={ROUTES.members}
              className="rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              activeProps={{ className: "rounded-xl bg-white/10 px-3 py-2 text-sm text-white" }}
            >
              Members
            </Link>
          </nav>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
            <button
              type="button"
              onClick={toggleSidebar}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
            >
              Sidebar
            </button>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">
                {isAuthenticated ? "로그인됨" : "로그아웃 상태"}
              </span>
              <button
                type="button"
                onClick={isAuthenticated ? logout : loginAsAdmin}
                className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white"
              >
                {isAuthenticated ? "로그아웃" : "관리자 로그인"}
              </button>
            </div>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const membersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "members",
  component: MembersPage,
});

const memberDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "members/$memberId",
  component: MemberDetailPage,
});

const memberEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "members/$memberId/edit",
  component: MemberEditPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  membersRoute,
  memberDetailRoute,
  memberEditRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
