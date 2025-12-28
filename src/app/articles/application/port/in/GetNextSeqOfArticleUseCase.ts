import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';

export interface GetNextSeqOfArticleUseCase {
  execute: (args: { category: ArticleCategory }) => Promise<number>;
}
