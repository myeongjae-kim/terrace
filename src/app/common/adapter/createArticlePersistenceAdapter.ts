import { SupabaseClient } from '@supabase/supabase-js';
import { ArticleCategory } from '@/app/common/domain/model/ArticleCategory';
import { Article, articleDefault } from '@/app/common/domain/model/Article';
import { Paginated } from '@/app/common/domain/model/Paginated';
import {
  ArticleListResponse,
  articleListResponseDefault,
} from '@/app/common/domain/model/ArticleInList';
import { Database } from '@/lib/database.types';
import { dateToStringISO8601 } from '@/app/common/utils/dateToStringISO8601';
import { db } from '@/lib/db/drizzle';
import { article as articleTable } from '@/lib/db/schema';
import { and, asc, count, desc, eq, gt, isNotNull, lt } from 'drizzle-orm';

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
    const owner = await isOwner();
    const result = await db
      .select()
      .from(articleTable)
      .where(
        and(
          eq(articleTable.category, category),
          eq(articleTable.slug, decodeURIComponent(slug)),
          owner ? undefined : isNotNull(articleTable.published_at),
        ),
      )
      .limit(1);

    const article = result[0];
    if (!article) return articleDefault();

    return {
      ...article,
      id: article.id,
      seq: article.seq || 0,
      title: article.title || '',
      slug: article.slug || '',
      content: article.content || '',
      category: (article.category as ArticleCategory) || 'BLOG_ARTICLE',
      user_id: article.user_id,
      created_at: article.created_at ? dateToStringISO8601(article.created_at) : '',
      updated_at: article.updated_at ? dateToStringISO8601(article.updated_at) : '',
      published_at: article.published_at ? dateToStringISO8601(article.published_at) : null,
    };
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
    const owner = await isOwner();
    const whereClause = and(
      eq(articleTable.category, category),
      owner ? undefined : isNotNull(articleTable.published_at),
    );

    const totalCountResult = await db
      .select({ count: count() })
      .from(articleTable)
      .where(whereClause);
    const totalCount = totalCountResult[0]?.count || 0;

    const offset = (page - 1) * pageSize;

    const articles = await db
      .select({
        id: articleTable.id,
        seq: articleTable.seq,
        title: articleTable.title,
        slug: articleTable.slug,
        created_at: articleTable.created_at,
        updated_at: articleTable.updated_at,
        published_at: articleTable.published_at,
      })
      .from(articleTable)
      .where(whereClause)
      .orderBy(desc(articleTable.seq))
      .limit(pageSize)
      .offset(offset);

    const content: ArticleListResponse[] = articles.map((a) => ({
      id: a.id,
      seq: a.seq || 0,
      title: a.title || '',
      slug: a.slug || '',
      created_at: a.created_at ? dateToStringISO8601(a.created_at) : '',
      updated_at: a.updated_at ? dateToStringISO8601(a.updated_at) : '',
      published_at: a.published_at ? dateToStringISO8601(a.published_at) : null,
    }));

    return {
      content,
      page,
      pageSize,
      pageCount: Math.ceil(totalCount / pageSize),
      total: totalCount,
    };
  };

  const getNextOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }): Promise<ArticleListResponse> => {
    const owner = await isOwner();
    const result = await db
      .select({
        id: articleTable.id,
        seq: articleTable.seq,
        title: articleTable.title,
        slug: articleTable.slug,
        created_at: articleTable.created_at,
        updated_at: articleTable.updated_at,
        published_at: articleTable.published_at,
      })
      .from(articleTable)
      .where(
        and(
          eq(articleTable.category, category),
          gt(articleTable.seq, seq),
          owner ? undefined : isNotNull(articleTable.published_at),
        ),
      )
      .orderBy(asc(articleTable.seq))
      .limit(1);

    const a = result[0];
    if (!a) return articleListResponseDefault();

    return {
      id: a.id,
      seq: a.seq || 0,
      title: a.title || '',
      slug: a.slug || '',
      created_at: a.created_at ? dateToStringISO8601(a.created_at) : '',
      updated_at: a.updated_at ? dateToStringISO8601(a.updated_at) : '',
      published_at: a.published_at ? dateToStringISO8601(a.published_at) : null,
    };
  };

  const getPrevOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }): Promise<ArticleListResponse> => {
    const owner = await isOwner();
    const result = await db
      .select({
        id: articleTable.id,
        seq: articleTable.seq,
        title: articleTable.title,
        slug: articleTable.slug,
        created_at: articleTable.created_at,
        updated_at: articleTable.updated_at,
        published_at: articleTable.published_at,
      })
      .from(articleTable)
      .where(
        and(
          eq(articleTable.category, category),
          lt(articleTable.seq, seq),
          owner ? undefined : isNotNull(articleTable.published_at),
        ),
      )
      .orderBy(desc(articleTable.seq))
      .limit(1);

    const a = result[0];
    if (!a) return articleListResponseDefault();

    return {
      id: a.id,
      seq: a.seq || 0,
      title: a.title || '',
      slug: a.slug || '',
      created_at: a.created_at ? dateToStringISO8601(a.created_at) : '',
      updated_at: a.updated_at ? dateToStringISO8601(a.updated_at) : '',
      published_at: a.published_at ? dateToStringISO8601(a.published_at) : null,
    };
  };

  const create = async (article: Article) => {
    await db.insert(articleTable).values({
      category: article.category,
      seq: article.seq,
      title: article.title,
      slug: article.slug,
      content: article.content,
      user_id: article.user_id,
      created_at: now(),
      updated_at: now(),
      published_at: article.published_at ? new Date(article.published_at) : null,
    });
  };

  const update = async (article: Article) => {
    await db
      .update(articleTable)
      .set({
        category: article.category,
        seq: article.seq,
        title: article.title,
        content: article.content,
        updated_at: now(),
        published_at: article.published_at ? new Date(article.published_at) : null,
      })
      .where(eq(articleTable.slug, article.slug));
  };

  const publish = async (getParams: GetParams) => {
    const article = await getBySlug(getParams);

    // We already have logic in update but the requirement is specific about update_at and published_at
    // But getBySlug already queries DB.
    // The original implementation fetched then updated.

    await db
      .update(articleTable)
      .set({
        updated_at: now(),
        published_at: now(),
      })
      .where(eq(articleTable.slug, article.slug));
  };

  const unpublish = async (getParams: GetParams) => {
    const article = await getBySlug(getParams);

    await db
      .update(articleTable)
      .set({
        updated_at: now(),
        published_at: null,
      })
      .where(eq(articleTable.slug, article.slug));
  };

  const getNextSeq = async ({ category }: { category: ArticleCategory }): Promise<number> => {
    const result = await db
      .select({ seq: articleTable.seq })
      .from(articleTable)
      .where(eq(articleTable.category, category))
      .orderBy(desc(articleTable.seq))
      .limit(1);

    return (result[0]?.seq || 0) + 1;
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
