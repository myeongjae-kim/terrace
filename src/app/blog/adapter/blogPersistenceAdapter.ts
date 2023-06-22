import { SupabaseClient } from '@supabase/supabase-js';
import { BlogArticle, blogArticleDefault } from '@/app/blog/domain/model/BlogArticle';
import { supabase } from '@/app/common/adapter/remote-call/supabase';
import { Paginated } from '@/app/common/domain/model/Paginated';
import {
  BlogArticleListResponse,
  blogArticleListResponseDefault,
} from '@/app/blog/domain/model/BlogArticleInList';
import { getPagination } from '@/app/common/domain/model/getPagination';

const createBlogPersistenceAdapter = (supabase: SupabaseClient) => {
  const getBySlug = async (slug: string): Promise<BlogArticle> => {
    const { data: blog_articles } = await supabase
      .from('blog_articles')
      .select('*')
      .eq('slug', slug)
      .not('published_at', 'is', null);

    return blog_articles?.[0] || blogArticleDefault();
  };

  const findAll = async (page: number): Promise<Paginated<BlogArticleListResponse>> => {
    const pageSize = 10;
    const { from, to } = getPagination(page, pageSize);
    const { data: blog_articles, count } = await supabase
      .from('blog_articles')
      .select('id,seq,title,slug,created_at,updated_at', { count: 'exact' })
      .order('seq', { ascending: false })
      .not('published_at', 'is', null)
      .range(from, to);

    return {
      content: blog_articles || [],
      page,
      pageSize,
      pageCount: Math.ceil((count || 0) / pageSize),
      total: count || 0,
    };
  };

  const getNextOf = async (seq: number): Promise<BlogArticleListResponse> => {
    const { data } = await supabase
      .from('blog_articles')
      .select('id,seq,title,slug,created_at,updated_at')
      .order('seq', { ascending: true })
      .gt('seq', seq)
      .not('published_at', 'is', null)
      .range(0, 0);

    return data?.[0] || blogArticleListResponseDefault();
  };

  const getPrevOf = async (seq: number): Promise<BlogArticleListResponse> => {
    const { data } = await supabase
      .from('blog_articles')
      .select('id,seq,title,slug,created_at,updated_at')
      .order('seq', { ascending: false })
      .lt('seq', seq)
      .not('published_at', 'is', null)
      .range(0, 0);

    return data?.[0] || blogArticleListResponseDefault();
  };

  return { getBySlug, findAll, getNextOf, getPrevOf };
};

export const blogPersistenceAdapter = createBlogPersistenceAdapter(supabase);
