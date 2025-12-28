import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList } from '@/app/articles/domain/ArticleInList';
import { Paginated } from '@/app/common/domain/model/Paginated';

export interface FindAllArticlesUseCase {
  findAll: (args: {
    category: ArticleCategory;
    page: number;
    pageSize: number;
    isOwner: boolean;
  }) => Promise<Paginated<ArticleInList>>;
}
