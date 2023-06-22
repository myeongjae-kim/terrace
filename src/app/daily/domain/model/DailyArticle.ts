export interface DailyArticle {
  id: number;
  seq: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
}

export const dailyArticleDefault: () => DailyArticle = () => ({
  id: 0,
  seq: 0,
  created_at: '',
  updated_at: '',
  title: '',
  slug: '',
  content: '',
});
