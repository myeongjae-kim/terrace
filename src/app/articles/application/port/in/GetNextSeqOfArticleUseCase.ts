import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';

export interface GetNextSeqOfArticleUseCase {
  getNextSeqOf: (args: { category: ArticleCategory }) => Promise<number>;
}
