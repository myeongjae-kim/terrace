import { SupabaseClient } from '@supabase/supabase-js';
import { supabaseClient } from '@/app/common/adapter/remote-call/supabaseClient';
import { Paginated } from '@/app/common/domain/model/Paginated';
import { getPagination } from '@/app/common/domain/model/getPagination';
import { ArticleCategory } from '@/app/common/domain/model/ArticleCategory';
import { Article, articleDefault } from '@/app/common/domain/model/Article';
import {
  ArticleListResponse,
  articleListResponseDefault,
} from '@/app/common/domain/model/ArticleInList';

const createArticlePersistenceAdapter = (supabase: SupabaseClient) => {
  const getBySlug = async ({
    category,
    slug,
  }: {
    category: ArticleCategory;
    slug: string;
  }): Promise<Article> => {
    const { data: article } = await supabase
      .from('article')
      .select('*')
      .eq('category', category)
      .eq('slug', slug)
      .not('published_at', 'is', null);

    return article?.[0] || articleDefault();
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
      .range(0, 0);

    return data?.[0] || articleListResponseDefault();
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
      .range(0, 0);

    return data?.[0] || articleListResponseDefault();
  };

  return { getBySlug, findAll, getNextOf, getPrevOf };
};

export const articlePersistenceAdapter = createArticlePersistenceAdapter(supabaseClient);
