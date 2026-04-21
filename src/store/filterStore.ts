export type FilterState = {
  keyword: string;
  status: string;
};

export const filterStoreInitialState: FilterState = {
  keyword: "",
  status: "all",
};
