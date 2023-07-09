import { formatDate } from '@/app/common/domain/model/formatDate';

export const toSlug = (args: { created_at: string; slug: string }): string =>
  `${formatDate(args.created_at, '/')}/${args.slug}`;
