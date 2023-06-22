export type BlogArticle = {
  id: number;
  seq: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
};

export const blogArticleDefault = (): BlogArticle => ({
  id: 0,
  seq: 0,
  created_at: '',
  updated_at: '',
  title: '',
  slug: '',
  content: '',
});
