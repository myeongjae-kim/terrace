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

type GetParams = {
  category: ArticleCategory;
  slug: string;
};

export const createArticlePersistenceAdapter = (
  supabase: SupabaseClient<Database>,
  now = () => new Date(),
) => {
  const isOwner = () =>
    supabase.auth.getSession().then(({ data }) => data?.session?.user?.role === 'owner');

  const getBySlug = async ({ category, slug }: GetParams): Promise<Article> => {
    const query = supabase
      .from('article')
      .select('*')
      .eq('category', category)
      .eq('slug', decodeURIComponent(slug));

    const { data: article } = await isOwner().then((result) =>
      (result ? query : query.not('published_at', 'is', null)).single(),
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
    const { from, to } = getPagination(page, pageSize);

    const query = supabase
      .from('article')
      .select('id,seq,title,slug,created_at,updated_at,published_at', { count: 'exact' })
      .eq('category', category)
      .order('seq', { ascending: false });

    const { data: article, count } = await isOwner().then((result) =>
      (result ? query : query.not('published_at', 'is', null)).range(from, to),
    );

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
    const query = supabase
      .from('article')
      .select('id,seq,title,slug,created_at,updated_at,published_at')
      .eq('category', category)
      .order('seq', { ascending: true })
      .gt('seq', seq);

    const { data } = await isOwner().then((result) =>
      (result ? query : query.not('published_at', 'is', null)).range(0, 0).single(),
    );

    return data || articleListResponseDefault();
  };

  const getPrevOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }): Promise<ArticleListResponse> => {
    const query = supabase
      .from('article')
      .select('id,seq,title,slug,created_at,updated_at,published_at')
      .eq('category', category)
      .order('seq', { ascending: false })
      .lt('seq', seq);

    const { data } = await isOwner().then((result) =>
      (result ? query : query.not('published_at', 'is', null)).range(0, 0).single(),
    );

    return data || articleListResponseDefault();
  };

  const create = (article: Article) =>
    supabase.from('article').insert({
      ...article,
      created_at: dateToStringISO8601(now()),
      updated_at: dateToStringISO8601(now()),
    });

  const update = (article: Article) =>
    supabase
      .from('article')
      .update({
        ...article,
        updated_at: dateToStringISO8601(now()),
      })
      .eq('slug', article.slug);

  const publish = async (getParams: GetParams) => {
    const article = await getBySlug(getParams);

    return supabase
      .from('article')
      .update({
        ...article,
        updated_at: dateToStringISO8601(now()),
        published_at: dateToStringISO8601(now()),
      })
      .eq('slug', article.slug);
  };

  const unpublish = async (getParams: GetParams) => {
    const article = await getBySlug(getParams);

    return supabase
      .from('article')
      .update({
        ...article,
        updated_at: dateToStringISO8601(now()),
        published_at: null,
      })
      .eq('slug', article.slug);
  };

  const getNextSeq = async ({ category }: { category: ArticleCategory }): Promise<number> => {
    const { data } = await supabase
      .from('article')
      .select('seq')
      .eq('category', category)
      .order('seq', { ascending: false })
      .range(0, 0)
      .single();

    return (data?.seq || 0) + 1;
  };

  return {
    getBySlug,
    findAll,
    getNextOf,
    getPrevOf,
    create,
    update,
    publish,
    unpublish,
    isOwner,
    getNextSeq,
  };
};
