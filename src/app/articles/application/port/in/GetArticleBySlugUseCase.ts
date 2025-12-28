import { Article } from '@/app/articles/domain/Article';
import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';

export interface GetArticleBySlugUseCase {
  getBySlug: (args: {
    category: ArticleCategory;
    slug: string;
    isOwner: boolean;
  }) => Promise<Article>;
}
