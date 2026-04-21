export const usePagination = (page = 1, pageSize = 10) => {
  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
  };
};
