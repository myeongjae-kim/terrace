import { Article } from '@/app/articles/domain/Article';

export interface ArticleCommandPort {
  create: (article: Omit<Article, 'id'>) => Promise<Article>;
  publish: (args: { slug: string }) => Promise<void>;
  unpublish: (args: { slug: string }) => Promise<void>;
  update: (args: Omit<Article, 'id'> & { originalSlug?: string }) => Promise<void>;
}
