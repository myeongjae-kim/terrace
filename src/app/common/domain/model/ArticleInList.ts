export type ArticleListResponse = {
  id: number;
  seq: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export const articleListResponseDefault = (): ArticleListResponse => ({
  id: 0,
  seq: 0,
  title: '',
  slug: '',
  created_at: '',
  updated_at: '',
  published_at: null,
});
