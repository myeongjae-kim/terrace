import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { match } from 'ts-pattern';

export type Article = {
  id: number;
  seq: number;
  created_at: string;
  updated_at: string;
  published_at: string | null;
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
  published_at: null,
  title: '',
  slug: '',
  content: '',
  category: 'BLOG_ARTICLE',
  user_id: null,
});

export const addWipEmojiToTitle = <T extends { title: string; published_at: string | null }>(
  article: T,
): T => ({
  ...article,
  title: match(!!article.published_at)
    .with(true, () => article.title)
    .with(false, () => '📝 ' + article.title)
    .exhaustive(),
});

export const addSeqToTitle = <T extends { title: string; seq: number }>(article: T): T => ({
  ...article,
  title: `[${article.seq}] ` + article.title,
});
