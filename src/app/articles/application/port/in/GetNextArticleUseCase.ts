import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList } from '@/app/articles/domain/ArticleInList';

export interface GetNextArticleUseCase {
  getNext: (args: {
    category: ArticleCategory;
    seq: number;
    isOwner: boolean;
  }) => Promise<ArticleInList>;
}
