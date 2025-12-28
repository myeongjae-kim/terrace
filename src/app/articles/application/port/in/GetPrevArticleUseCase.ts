import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList } from '@/app/articles/domain/ArticleInList';

export interface GetPrevArticleUseCase {
  execute: (args: { category: ArticleCategory; seq: number }) => Promise<ArticleInList>;
}
