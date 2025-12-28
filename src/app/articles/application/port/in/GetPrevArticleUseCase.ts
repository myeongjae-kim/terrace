import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList } from '@/app/articles/domain/ArticleInList';

export interface GetPrevArticleUseCase {
  getPrev: (args: {
    category: ArticleCategory;
    seq: number;
    isOwner: boolean;
  }) => Promise<ArticleInList>;
}
