import { Article } from '@/app/articles/domain/Article';
import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';

export interface GetArticleBySlugUseCase {
  execute: (args: { category: ArticleCategory; slug: string }) => Promise<Article>;
}
