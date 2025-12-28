import { Article } from '@/app/articles/domain/Article';

export interface CreateArticleUseCase {
  execute: (article: Omit<Article, 'id'>) => Promise<Article>;
}
