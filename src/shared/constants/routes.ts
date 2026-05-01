export const ROUTES = {
  login: "/login",
  dashboard: "/",
  cells: "/cells",
  cellNew: "/cells/new",
  cellDetail: (cellId: string | number) => `/cells/${cellId}`,
  members: "/members",
  memberDetail: (memberId: string | number) => `/members/${memberId}`,
  memberEdit: (memberId: string | number) => `/members/${memberId}/edit`,
} as const;
