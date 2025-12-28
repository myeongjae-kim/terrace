import { Article } from '@/app/articles/domain/Article';

export interface UpdateArticleUseCase {
  execute: (args: Omit<Article, 'id'> & { originalSlug?: string }) => Promise<void>;
}
