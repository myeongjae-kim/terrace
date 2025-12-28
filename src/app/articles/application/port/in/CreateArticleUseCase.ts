import { Article } from '@/app/articles/domain/Article';

export interface CreateArticleUseCase {
  create: (article: Omit<Article, 'id'>) => Promise<Article>;
}
