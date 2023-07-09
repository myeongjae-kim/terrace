import dayjs from 'dayjs';

export const formatDate = (date: string): string => dayjs(date).format('YYYY / MM / DD');
