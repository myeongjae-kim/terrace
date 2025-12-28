import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList } from '@/app/articles/domain/ArticleInList';

export interface GetNextArticleUseCase {
  execute: (args: { category: ArticleCategory; seq: number }) => Promise<ArticleInList>;
}
