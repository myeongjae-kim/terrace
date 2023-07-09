import dayjs from 'dayjs';

export const formatDate = (date: string, separator = ' / '): string =>
  dayjs(date.substring(0, '2023-01-01'.length)).format(`YYYY${separator}MM${separator}DD`);
