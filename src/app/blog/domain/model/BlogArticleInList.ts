export type BlogArticleListResponse = {
  id: number;
  seq: number;
  title: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export const blogArticleListResponseDefault = (): BlogArticleListResponse => ({
  id: 0,
  seq: 0,
  title: '',
  slug: '',
  created_at: '',
  updated_at: '',
});
