import { Article } from '@/app/articles/domain/Article';
import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList } from '@/app/articles/domain/ArticleInList';
import { Paginated } from '@/app/common/domain/model/Paginated';

export interface ArticleQueryPort {
  findAll: (args: {
    category: ArticleCategory;
    page: number;
    pageSize: number;
    isOwner: boolean;
  }) => Promise<Paginated<ArticleInList>>;

  getBySlug: (args: {
    category: ArticleCategory;
    slug: string;
    isOwner: boolean;
  }) => Promise<Article>;

  getNext: (args: {
    category: ArticleCategory;
    seq: number;
    isOwner: boolean;
  }) => Promise<ArticleInList>;

  getNextSeqOf: (args: { category: ArticleCategory }) => Promise<number>;

  getPrev: (args: {
    category: ArticleCategory;
    seq: number;
    isOwner: boolean;
  }) => Promise<ArticleInList>;
}
