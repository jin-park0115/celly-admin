import {
  Link,
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  BarChart3,
  Building2,
  CalendarCheck2,
  LayoutDashboard,
  Menu,
  Megaphone,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import DashboardPage from "../pages/DashboardPage";
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
    items: [
      { label: "대시보드", icon: LayoutDashboard, to: ROUTES.dashboard },
    ],
  },
  {
    label: "셀 관리",
    items: [
      { label: "셀 목록", icon: Building2 },
    ],
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

const RootLayout = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loginAsAdmin = useAuthStore((state) => state.loginAsAdmin);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-[#eef2f7] text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[208px_1fr]">
        <aside
          className={`flex-col border-r border-slate-800 bg-[#11141b] px-4 py-5 text-slate-100 ${
            isSidebarOpen ? "flex" : "hidden"
          } md:flex`}
        >
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3b82f6]">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <strong className="text-xl font-semibold text-white">Celly Admin</strong>
          </div>
          <nav className="mt-8 flex flex-col gap-6">
            {navGroups.map((group, index) => (
              <div key={`${group.label ?? "main"}-${index}`} className="flex flex-col gap-2">
                {group.label ? (
                  <p className="px-2 text-xs font-semibold text-slate-500">{group.label}</p>
                ) : null}
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;

                    if (item.to) {
                      return (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                          activeProps={{
                            className:
                              "flex items-center gap-3 rounded-xl bg-white/6 px-3 py-3 text-sm font-medium text-white",
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.label}
                        type="button"
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-slate-200"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-auto px-2 pt-10 text-xs text-slate-500">Celly Admin v1.0</div>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleSidebar}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="ml-4 hidden border-l border-slate-200 pl-4 text-sm font-semibold text-slate-700 md:block">
                대시보드
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
                <span className="font-semibold">김목사</span>
              </div>
              <button
                type="button"
                onClick={isAuthenticated ? logout : loginAsAdmin}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
              >
                {isAuthenticated ? "로그아웃" : "Dev Login"}
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
