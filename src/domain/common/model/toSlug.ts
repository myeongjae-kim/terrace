import { formatDate } from './formatDate';

export const toSlug = (args: { created_at: Date | null; slug: string }): string => {
  if (!args.created_at) {
    return args.slug;
  }
  return `${formatDate(args.created_at, '/')}/${args.slug}`;
};
