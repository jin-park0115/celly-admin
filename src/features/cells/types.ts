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
