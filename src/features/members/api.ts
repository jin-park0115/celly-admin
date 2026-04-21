import type { Member } from "./types";

const members: Member[] = [
  {
    id: 1,
    name: "김민수",
    email: "minsu@celly.app",
    phone: "010-1234-5678",
    joinedAt: "2026-04-01",
    status: "active",
  },
  {
    id: 2,
    name: "이지은",
    email: "jieun@celly.app",
    phone: "010-4321-8765",
    joinedAt: "2026-04-07",
    status: "inactive",
  },
];

export const getMembers = async (): Promise<Member[]> => {
  return members;
};

export const getMemberDetail = async (memberId: number): Promise<Member | null> => {
  return members.find((member) => member.id === memberId) ?? null;
};
