import { SupabaseClient } from '@supabase/supabase-js';
import { ArticleCategory } from '@/app/common/domain/model/ArticleCategory';
import { Article, articleDefault } from '@/app/common/domain/model/Article';
import { Paginated } from '@/app/common/domain/model/Paginated';
import {
  ArticleListResponse,
  articleListResponseDefault,
} from '@/app/common/domain/model/ArticleInList';
import { getPagination } from '@/app/common/domain/model/getPagination';
import { Database } from '@/lib/database.types';
import { dateToStringISO8601 } from '@/app/common/utils/dateToStringISO8601';

export const createArticlePersistenceAdapter = (supabase: SupabaseClient<Database>) => {
  const isOwner = () =>
    supabase.auth.getSession().then(({ data }) => data?.session?.user?.role === 'owner');

  const getBySlug = async ({
    category,
    slug,
  }: {
    category: ArticleCategory;
    slug: string;
  }): Promise<Article> => {
    const query = supabase
      .from('article')
      .select('*')
      .eq('category', category)
      .eq('slug', decodeURIComponent(slug));

    const { data: article } = await isOwner().then((result) =>
      result ? query.single() : query.not('published_at', 'is', null).single(),
    );

    return article || articleDefault();
  };

  const findAll = async ({
    category,
    page,
    pageSize,
  }: {
    category: ArticleCategory;
    page: number;
    pageSize: number;
  }): Promise<Paginated<ArticleListResponse>> => {
    // const pageSize = 10; // blog = 10, daily = 20
    const { from, to } = getPagination(page, pageSize);
    const { data: article, count } = await supabase
      .from('article')
      .select('id,seq,title,slug,created_at,updated_at', { count: 'exact' })
      .eq('category', category)
      .order('seq', { ascending: false })
      .not('published_at', 'is', null)
      .range(from, to);

    return {
      content: article || [],
      page,
      pageSize,
      pageCount: Math.ceil((count || 0) / pageSize),
      total: count || 0,
    };
  };

  const getNextOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }): Promise<ArticleListResponse> => {
    const { data } = await supabase
      .from('article')
      .select('id,seq,title,slug,created_at,updated_at')
      .eq('category', category)
      .order('seq', { ascending: true })
      .gt('seq', seq)
      .not('published_at', 'is', null)
      .range(0, 0)
      .single();

    return data || articleListResponseDefault();
  };

  const getPrevOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }): Promise<ArticleListResponse> => {
    const { data } = await supabase
      .from('article')
      .select('id,seq,title,slug,created_at,updated_at')
      .eq('category', category)
      .order('seq', { ascending: false })
      .lt('seq', seq)
      .not('published_at', 'is', null)
      .range(0, 0)
      .single();

    return data || articleListResponseDefault();
  };

  const create = (article: Article) =>
    supabase.from('article').insert({
      ...article,
      created_at: dateToStringISO8601(new Date()),
      updated_at: dateToStringISO8601(new Date()),
    });

  const update = (article: Article) =>
    supabase.from('article').insert({
      ...article,
      updated_at: dateToStringISO8601(new Date()),
    });

  return { getBySlug, findAll, getNextOf, getPrevOf, create, update };
};
