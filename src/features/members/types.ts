export type MemberStatus = "active" | "inactive";

export type Member = {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  status: MemberStatus;
};

export type MemberFormValues = Pick<Member, "name" | "email" | "phone" | "status">;
