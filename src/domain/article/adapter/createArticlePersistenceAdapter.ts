import { Paginated } from '@/domain/common/domain/model/Paginated';
import { db } from '@/lib/db/drizzle';
import { article as articleTable } from '@/lib/db/schema';
import { and, asc, count, desc, eq, gt, isNotNull, lt } from 'drizzle-orm';
import { PgInsertValue, PgUpdateSetSource } from 'drizzle-orm/pg-core';
import { ArticleCategory } from '../model/ArticleCategory';

type GetParams = {
  category: ArticleCategory;
  slug: string;
};

export const createArticlePersistenceAdapter = (
  // Context or other deps can be injected here if needed, but removing supabase
  now = () => new Date(),
) => {
  const isOwner = async () => {
    // const sessionToken = (await cookies()).get('session')?.value;
    // if (!sessionToken) return false;
    // const payload = await verifySession(sessionToken);
    // return payload?.sub === ENV.OWNER_SUB;
    return false;
  };

  const getBySlug = async ({ category, slug }: GetParams) => {
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
    if (!article) return null;

    return {
      ...article,
      id: article.id,
      seq: article.seq || 0,
      title: article.title || '',
      slug: article.slug || '',
      content: article.content || '',
      category: (article.category as ArticleCategory) || 'BLOG_ARTICLE',
      user_id: article.user_id,
      created_at: article.created_at,
      updated_at: article.updated_at,
      published_at: article.published_at,
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
  }) => {
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

    const content = articles.map((a) => ({
      id: a.id,
      seq: a.seq || 0,
      title: a.title || '',
      slug: a.slug || '',
      created_at: a.created_at,
      updated_at: a.updated_at,
      published_at: a.published_at,
    }));

    return {
      content,
      page,
      pageSize,
      pageCount: Math.ceil(totalCount / pageSize),
      total: totalCount,
    } satisfies Paginated<unknown>;
  };

  const getNextOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }) => {
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
    if (!a) return null;

    return {
      id: a.id,
      seq: a.seq || 0,
      title: a.title || '',
      slug: a.slug || '',
      created_at: a.created_at,
      updated_at: a.updated_at,
      published_at: a.published_at,
    };
  };

  const getPrevOf = async ({
    category,
    seq,
  }: {
    category: ArticleCategory;
    seq: number;
  }) => {
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
    if (!a) return null;

    return {
      id: a.id,
      seq: a.seq || 0,
      title: a.title || '',
      slug: a.slug || '',
      created_at: a.created_at,
      updated_at: a.updated_at,
      published_at: a.published_at,
    };
  };

  const create = async (article: Omit<PgInsertValue<typeof articleTable>, "id">) => {
    await db.insert(articleTable).values(article);
  };

  const update = async (article: PgUpdateSetSource<typeof articleTable>) => {
    if (typeof article.id !== "number") {
      throw Error("Invalid article id: " + article.id);
    }

    await db
      .update(articleTable)
      .set({
        category: article.category,
        seq: article.seq,
        title: article.title,
        content: article.content,
        updated_at: now(),
        published_at: article.published_at,
        slug: article.slug,
      })
      .where(eq(articleTable.id, article.id));
  };

  const publish = async (getParams: GetParams) => {
    const article = await getBySlug(getParams);

    if (!article) {
      throw Error("Article not found. slug: " + getParams.slug);
    }

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

    if (!article) {
      throw Error("Article not found. slug: " + getParams.slug);
    }

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
