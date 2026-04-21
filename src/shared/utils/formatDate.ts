export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("ko-KR").format(new Date(value));
};
