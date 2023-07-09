import dayjs from 'dayjs';

export const toSlug = (args: { created_at: string; slug: string }): string =>
  `${dayjs(args.created_at).format('YYYY/MM/DD')}/${args.slug}`;
