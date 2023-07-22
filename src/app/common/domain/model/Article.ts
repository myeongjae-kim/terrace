export type Article = {
  id: number;
  seq: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
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
  user_id: null,
});
