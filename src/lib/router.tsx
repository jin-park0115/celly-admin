import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  CalendarCheck2,
  ChevronLeft,
  PanelLeft,
  LayoutDashboard,
  Menu,
  Megaphone,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import DashboardPage from "../pages/DashboardPage";
import CellNewPage from "../pages/cells/CellNewPage";
import CellsPage from "../pages/cells/CellsPage";
import LoginPage from "../pages/login/LoginPage";
import MemberDetailPage from "../pages/members/MemberDetailPage";
import MemberEditPage from "../pages/members/MemberEditPage";
import MembersPage from "../pages/members/MembersPage";
import { NotFound } from "../shared/components/NotFound";
import { ROUTES } from "../shared/constants/routes";
import { useAuthStore } from "../store/authStore";
import { useUiStore } from "../store/uiStore";

type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  to?: string;
};

type NavGroup = {
  label: string | null;
  items: NavItem[];
};

const navGroups = [
  {
    label: null,
    items: [{ label: "대시보드", icon: LayoutDashboard, to: ROUTES.dashboard }],
  },
  {
    label: "셀 관리",
    items: [{ label: "셀 목록", icon: Building2, to: ROUTES.cells }],
  },
  {
    label: "셀원 관리",
    items: [
      { label: "셀원 목록", icon: Users, to: ROUTES.members },
      { label: "주간 체크 데이터", icon: CalendarCheck2 },
    ],
  },
  {
    label: "통계",
    items: [
      { label: "전체 통계", icon: BarChart3 },
      { label: "셀별 비교", icon: BarChart3 },
    ],
  },
  {
    label: "설정",
    items: [
      { label: "관리자 계정", icon: ShieldCheck },
      { label: "시스템 설정", icon: Settings },
      { label: "공지 발송", icon: Megaphone },
    ],
  },
] satisfies NavGroup[];

const labelVisibilityClassName = (isOpen: boolean) =>
  isOpen
    ? "opacity-100 translate-x-0 duration-300 delay-0 ease-in-out"
    : "pointer-events-none opacity-0 -translate-x-2 duration-300 delay-0 ease-in-out";

const requireAuth = () => {
  if (!useAuthStore.getState().isAuthenticated) {
    throw redirect({ to: ROUTES.login });
  }
};

const redirectIfAuthenticated = () => {
  if (useAuthStore.getState().isAuthenticated) {
    throw redirect({ to: ROUTES.dashboard });
  }
};

const RootLayout = () => {
  const navigate = useNavigate();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  if (pathname === ROUTES.login) {
    return <Outlet />;
  }

  const handleLogout = () => {
    logout();
    void navigate({ to: ROUTES.login });
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  const headerLabel =
    pathname === ROUTES.dashboard
      ? "대시보드"
      : pathname === ROUTES.cells
        ? "셀 관리 > 셀 목록"
        : pathname === ROUTES.cellNew
          ? "셀 관리 > 셀 생성"
          : pathname.startsWith(ROUTES.members)
            ? "셀원 관리 > 셀원 목록"
            : "Celly Admin";

  return (
    <div className="min-h-screen bg-[#eef2f7] text-slate-900">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="사이드바 닫기"
          onClick={handleSidebarClose}
          className="fixed inset-0 z-30 bg-slate-950/45 md:hidden"
        />
      ) : null}
      <div
        className={`grid min-h-screen grid-cols-1 ${
          isSidebarOpen
            ? "md:grid-cols-[208px_minmax(0,1fr)]"
            : "md:grid-cols-[72px_minmax(0,1fr)]"
        }`}
      >
        <aside
          className={`fixed inset-y-0 left-0 z-40 overflow-hidden bg-[#11141b] text-slate-100 transition-[transform,width] duration-300 ease-in-out md:static ${
            isSidebarOpen
              ? "flex w-[286px] translate-x-0 border-r border-slate-800 md:w-[208px]"
              : "flex w-[286px] -translate-x-full border-r border-slate-800 md:w-[72px] md:translate-x-0"
          }`}
        >
          <div className="flex w-[286px] min-w-[286px] flex-col px-4 py-5 md:w-[208px] md:min-w-[208px]">
            <div className="flex items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6]">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <strong
                  className={`overflow-hidden whitespace-nowrap text-xl font-semibold text-white transition-all ${labelVisibilityClassName(
                    isSidebarOpen,
                  )}`}
                >
                  Celly Admin
                </strong>
              </div>
              <button
                type="button"
                onClick={handleSidebarClose}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/5 hover:text-white md:hidden"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-6">
              {navGroups.map((group, index) => (
                <div
                  key={`${group.label ?? "main"}-${index}`}
                  className="flex flex-col gap-2"
                >
                  {group.label ? (
                    <p
                      className={`overflow-hidden px-2 whitespace-nowrap text-xs font-semibold text-slate-500 transition-all ${labelVisibilityClassName(
                        isSidebarOpen,
                      )}`}
                    >
                      {group.label}
                    </p>
                  ) : null}
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const itemClassName =
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium";

                      if (item.to) {
                        return (
                          <Link
                            key={item.label}
                            to={item.to}
                            title={item.label}
                            onClick={() => setSidebarOpen(false)}
                            className={`${itemClassName} text-slate-400 transition hover:bg-white/5 hover:text-white`}
                            activeProps={{
                              className: `${itemClassName} bg-white/6 text-white`,
                            }}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span
                              className={`overflow-hidden whitespace-nowrap transition-all ${labelVisibilityClassName(
                                isSidebarOpen,
                              )}`}
                            >
                              {item.label}
                            </span>
                          </Link>
                        );
                      }

                      return (
                        <button
                          key={item.label}
                          type="button"
                          title={item.label}
                          className={`${itemClassName} text-left text-slate-400 transition hover:bg-white/5 hover:text-slate-200`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span
                            className={`overflow-hidden whitespace-nowrap transition-all ${labelVisibilityClassName(
                              isSidebarOpen,
                            )}`}
                          >
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
            <div className="mt-auto px-2 pt-10 text-xs text-slate-500">
              <span
                className={`overflow-hidden whitespace-nowrap transition-all ${labelVisibilityClassName(
                  isSidebarOpen,
                )}`}
              >
                Celly Admin v1.0
              </span>
              {!isSidebarOpen ? (
                <span className="flex text-[10px] font-medium text-slate-500">
                  v1.0
                </span>
              ) : null}
            </div>
          </div>
        </aside>
        <div className="flex min-h-screen min-w-0 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex h-10 w-10 items-center justify-center  text-slate-600"
              >
                <PanelLeft className="h-5 w-5" />
              </button>
              <div className="ml-4 hidden border-l border-slate-200 pl-4 text-sm font-semibold text-slate-700 md:block">
                {headerLabel}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="hidden text-slate-400 md:block">
                {isAuthenticated ? "운영 중" : "미인증"}
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                  <Users className="h-4 w-4" />
                </div>
                <span className="font-semibold">{user?.name ?? "관리자"}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                로그아웃
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
  beforeLoad: requireAuth,
  component: DashboardPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  beforeLoad: redirectIfAuthenticated,
  component: LoginPage,
});

const membersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "members",
  beforeLoad: requireAuth,
  component: MembersPage,
});

const cellsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "cells",
  beforeLoad: requireAuth,
  component: CellsPage,
});

const cellNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "cells/new",
  beforeLoad: requireAuth,
  component: CellNewPage,
});

const memberDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "members/$memberId",
  beforeLoad: requireAuth,
  component: MemberDetailPage,
});

const memberEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "members/$memberId/edit",
  beforeLoad: requireAuth,
  component: MemberEditPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  dashboardRoute,
  cellsRoute,
  cellNewRoute,
  membersRoute,
  memberDetailRoute,
  memberEditRoute,
]);

const routerInstance = createRouter({ routeTree });

export const router = routerInstance;

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof routerInstance;
  }
}
