import { SupabaseClient } from '@supabase/supabase-js';
import { supabaseClient } from '@/app/common/adapter/remote-call/supabaseClient';
import { Paginated } from '@/app/common/domain/model/Paginated';
import { getPagination } from '@/app/common/domain/model/getPagination';
import { DailyArticleInList } from '@/app/daily/domain/model/DailyArticleInList';
import { DailyArticle, dailyArticleDefault } from '@/app/daily/domain/model/DailyArticle';

const createDailyPersistenceAdapter = (supabase: SupabaseClient) => {
  const findAll = async (page: number): Promise<Paginated<DailyArticleInList>> => {
    const pageSize = 20;
    const { from, to } = getPagination(page, pageSize);
    const { data: dailies, count } = await supabase
      .from('dailies')
      .select('id,seq,title,slug,created_at,updated_at', { count: 'exact' })
      .order('seq', { ascending: false })
      .not('published_at', 'is', null)
      .range(from, to);

    return {
      content: dailies || [],
      page,
      pageSize,
      pageCount: Math.ceil((count || 0) / pageSize),
      total: count || 0,
    };
  };

  const getBySlug = async (slug: string): Promise<DailyArticle> => {
    const { data: dailies } = await supabase
      .from('dailies')
      .select('*')
      .eq('slug', slug)
      .not('published_at', 'is', null);

    return dailies?.[0] || dailyArticleDefault();
  };

  return { findAll, getBySlug };
};

export const dailyPersistenceAdapter = createDailyPersistenceAdapter(supabaseClient);
