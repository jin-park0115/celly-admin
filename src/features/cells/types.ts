export type CellStatus = "ACTIVE" | "ARCHIVED" | "PENDING";

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
