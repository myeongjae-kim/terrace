import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateToStringISO8601 = (date: Date): string => {
  return dayjs(date).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss.SSS+09:00');
};
