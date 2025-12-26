import dayjs from 'dayjs';

export const formatDate = (date: Date, separator = ' / '): string =>
  dayjs(date).format(`YYYY${separator}MM${separator}DD`);
