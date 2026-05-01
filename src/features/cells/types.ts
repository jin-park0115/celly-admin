export type CellStatus = "ACTIVE" | "ARCHIVED" | "PENDING";

export type UnassignedMember = {
  id: number;
  name: string;
  role: "LEADER" | "MEMBER";
  department: string;
  phone: string;
};

export type CellItem = {
  id: number;
  name: string;
  department: string;
  leader: string | null;
  memberCount: number;
  maxMembers: number;
  submissionRate: number | null;
  status: CellStatus;
};

export type CellDetailMember = {
  id: number;
  name: string;
  cellRole: "LEADER" | "MEMBER";
  phone: string;
  joinedAt: string;
  recentSubmissionWeek: string;
  submissionRate: number;
};

export type CellDetail = {
  id: number;
  name: string;
  description: string;
  department: string;
  year: number;
  status: CellStatus;
  maxMembers: number;
  inviteCode: string;
  inviteCodeExpiresAt: string;
  leader: {
    name: string;
    phone: string;
  };
  stats: {
    averageSubmissionRate: number;
    totalPrayerRequests: number;
    activePrayerRequests: number;
  };
  members: CellDetailMember[];
};
