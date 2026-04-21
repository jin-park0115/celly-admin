import { getMemberDetail } from "../api";

export const useMemberDetail = (memberId: number) => {
  return {
    data: getMemberDetail(memberId),
  };
};
