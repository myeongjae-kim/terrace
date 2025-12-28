import { Article, articleDefault } from '@/app/articles/domain/Article';
import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { ArticleInList, articleListResponseDefault } from '@/app/articles/domain/ArticleInList';
import { Paginated } from '@/app/common/domain/model/Paginated';
import { dateToStringISO8601 } from '@/app/common/utils/dateToStringISO8601';
import { db } from '@/lib/db/drizzle';
import { article as articleTable } from '@/lib/db/schema';
import { and, asc, count, desc, eq, gt, isNotNull, lt } from 'drizzle-orm';

import { ArticleQueryPort } from '@/app/articles/application/port/out/ArticleQueryPort';

export class ArticleQueryAdapter implements ArticleQueryPort {
  findAll = async ({
    category,
    page,
    pageSize,
    isOwner,
  }: {
    category: ArticleCategory;
    page: number;
    pageSize: number;
    isOwner: boolean;
  }): Promise<Paginated<ArticleInList>> => {
    // Note: referencing implementation uses internal isOwner check, but interface passes it in.
    // We use the passed isOwner flag.
    const whereClause = and(
      eq(articleTable.category, category),
      isOwner ? undefined : isNotNull(articleTable.published_at),
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

    const content: ArticleInList[] = articles.map((a) => ({
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

  getBySlug = async ({
    category,
    slug,
    isOwner,
  }: {
    category: ArticleCategory;
    slug: string;
    isOwner: boolean;
  }): Promise<Article> => {
    const result = await db
      .select()
      .from(articleTable)
      .where(
        and(
          eq(articleTable.category, category),
          eq(articleTable.slug, decodeURIComponent(slug)),
          isOwner ? undefined : isNotNull(articleTable.published_at),
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

  getNext = async ({
    category,
    seq,
    isOwner,
  }: {
    category: ArticleCategory;
    seq: number;
    isOwner: boolean;
  }): Promise<ArticleInList> => {
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
          isOwner ? undefined : isNotNull(articleTable.published_at),
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

  getPrev = async ({
    category,
    seq,
    isOwner,
  }: {
    category: ArticleCategory;
    seq: number;
    isOwner: boolean;
  }): Promise<ArticleInList> => {
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
          isOwner ? undefined : isNotNull(articleTable.published_at),
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

  getNextSeqOf = async ({ category }: { category: ArticleCategory }): Promise<number> => {
    const result = await db
      .select({ seq: articleTable.seq })
      .from(articleTable)
      .where(eq(articleTable.category, category))
      .orderBy(desc(articleTable.seq))
      .limit(1);

    return (result[0]?.seq || 0) + 1;
  };
}
