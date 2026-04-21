import { getMembers } from "../api";

export const useMemberList = () => {
  return {
    data: getMembers(),
  };
};
