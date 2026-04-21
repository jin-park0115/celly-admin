import { create } from "zustand";

type FilterState = {
  keyword: string;
  status: string;
  setKeyword: (keyword: string) => void;
  setStatus: (status: string) => void;
  reset: () => void;
};

const filterStoreInitialState = {
  keyword: "",
  status: "all",
};

export const useFilterStore = create<FilterState>((set) => ({
  ...filterStoreInitialState,
  setKeyword: (keyword) => set({ keyword }),
  setStatus: (status) => set({ status }),
  reset: () => set(filterStoreInitialState),
}));
