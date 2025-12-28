import { Article } from '@/app/articles/domain/Article';

export interface UpdateArticleUseCase {
  update: (args: Omit<Article, 'id'> & { originalSlug?: string }) => Promise<void>;
}
