export const ROUTES = {
  dashboard: "/",
  members: "/members",
  memberDetail: (memberId: string | number) => `/members/${memberId}`,
  memberEdit: (memberId: string | number) => `/members/${memberId}/edit`,
} as const;
