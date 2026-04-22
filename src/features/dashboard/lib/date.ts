const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const getIsoWeekStartDate = (year: number, week: number) => {
  const januaryFourth = new Date(year, 0, 4);
  const dayOfWeek = januaryFourth.getDay() || 7;
  const firstIsoWeekMonday = new Date(
    januaryFourth.getTime() - (dayOfWeek - 1) * DAY_IN_MS,
  );

  return new Date(firstIsoWeekMonday.getTime() + (week - 1) * 7 * DAY_IN_MS);
};

export const formatShortDate = (date: Date) =>
  `${date.getMonth() + 1}/${date.getDate()}`;

export const formatLongDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

export const getWeekOfMonthLabel = (date: Date) => {
  const month = date.getMonth() + 1;
  const weekOfMonth = Math.floor((date.getDate() - 1) / 7) + 1;

  return `${month}월 ${weekOfMonth}주`;
};

export const getWeekRangeLabel = (year: number, week: number) => {
  const startDate = getIsoWeekStartDate(year, week);
  const endDate = new Date(startDate.getTime() + 6 * DAY_IN_MS);

  return `${formatLongDate(startDate)} - ${formatLongDate(endDate)}`;
};

export const getIsoWeekCount = (year: number) => {
  const december28 = new Date(year, 11, 28);
  const dayOfWeek = december28.getDay() || 7;
  const lastWeekStart = new Date(
    december28.getTime() - (dayOfWeek - 1) * DAY_IN_MS,
  );
  const firstWeekStart = getIsoWeekStartDate(year, 1);

  return (
    Math.round(
      (lastWeekStart.getTime() - firstWeekStart.getTime()) / (7 * DAY_IN_MS),
    ) + 1
  );
};

export const getIsoWeekInfo = (date: Date) => {
  const target = new Date(date);
  const dayNumber = target.getDay() || 7;

  target.setDate(target.getDate() + 4 - dayNumber);

  const isoYear = target.getFullYear();
  const yearStart = new Date(isoYear, 0, 1);
  const weekNumber = Math.ceil(
    ((target.getTime() - yearStart.getTime()) / DAY_IN_MS + 1) / 7,
  );

  return {
    year: isoYear,
    week: weekNumber,
  };
};
