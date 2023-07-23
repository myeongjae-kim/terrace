import { ArticleCategory } from '@/app/common/domain/model/ArticleCategory';

export type Article = {
  id: number;
  seq: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  category: ArticleCategory;
  user_id: string | null;
};

export const articleDefault = (): Article => ({
  id: 0,
  seq: 0,
  created_at: '',
  updated_at: '',
  title: '',
  slug: '',
  content: '',
  category: 'BLOG_ARTICLE',
  user_id: null,
});
