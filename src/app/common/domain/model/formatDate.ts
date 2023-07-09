import dayjs from 'dayjs';

export const formatDate = (date: string, separator = ' / '): string =>
  dayjs(date).format(`YYYY${separator}MM${separator}DD`);
