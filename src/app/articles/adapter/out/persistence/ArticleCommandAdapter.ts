import { Article } from '@/app/articles/domain/Article';
import { dateToStringISO8601 } from '@/app/common/utils/dateToStringISO8601';
import { db } from '@/lib/db/drizzle';
import { article as articleTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

import { ArticleCommandPort } from '@/app/articles/application/port/out/ArticleCommandPort';
import { ArticleCategory } from '@/app/articles/domain/ArticleCategory';
import { Component } from '@/app/config/Component';

const now = () => new Date();

@Component()
export class ArticleCommandAdapter implements ArticleCommandPort {
  create = async (article: Omit<Article, 'id'>): Promise<Article> => {
    // Note: Creating an article generally requires ownership or specific rights,
    // but the reference create() didn't explicitly check ownership inside the function,
    // relying on the caller or context. However, for a command adapter,
    // we simply execute the persistence logic.
    // If strict ownership is needed here, we should add it.
    // Given the prompt asks to use the BODY of the reference, and the reference create body
    // does just the insert, we'll stick to that.

    // However, published_at processing is needed.
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

    // We need to return the created article. The interface says Promise<Article>.
    // The reference "create" returns void (implicit Promise<void>).
    // The interface CreateArticleUseCase expects Promise<Article>.
    // So we need to fetch it back or return the constructed object including generated ID/timestamps.
    // Drizzle insert can use .returning() in Postgres.
    // Assuming Postgres based on "drizzle" typically.
    // But since I don't know if .returning() is supported or what the DB is (likely Postgres or SQLite),
    // and the reference didn't return anything.
    // I will try to fetch it or construct it.
    // Or closer to reference: simply return the input object merged with new timestamps.
    // But we don't know the ID unless we fetch or use .returning().
    // I will try to use .returning() if possible, or query by slug.

    // Let's query by slug to be safe and compatible.
    const result = await db
      .select()
      .from(articleTable)
      .where(eq(articleTable.slug, article.slug))
      .limit(1);

    // If we assume it was inserted:
    const created = result[0];
    if (!created) throw new Error('Failed to create article');

    // Helper to format dates same as Article type (strings)
    // const dateToString = (d: Date) => d.toISOString(); // Simplified ISO string

    return {
      // Spread created properties
      id: created.id,
      category: created.category as ArticleCategory,
      seq: created.seq || 0,
      title: created.title || '',
      slug: created.slug || '',
      content: created.content || '',
      user_id: created.user_id,
      created_at: created.created_at ? dateToStringISO8601(created.created_at) : '',
      updated_at: created.updated_at ? dateToStringISO8601(created.updated_at) : '',
      published_at: created.published_at ? dateToStringISO8601(created.published_at) : null,
    };
  };

  update = async (article: Omit<Article, 'id'> & { originalSlug?: string }): Promise<void> => {
    await db
      .update(articleTable)
      .set({
        category: article.category,
        seq: article.seq,
        title: article.title,
        content: article.content,
        updated_at: now(),
        published_at: article.published_at ? new Date(article.published_at) : null,
        slug: article.slug,
      })
      .where(eq(articleTable.slug, article.originalSlug || article.slug));
  };

  publish = async ({ slug }: { slug: string }): Promise<void> => {
    await db
      .update(articleTable)
      .set({
        updated_at: now(),
        published_at: now(),
      })
      .where(eq(articleTable.slug, slug));
  };

  unpublish = async ({ slug }: { slug: string }): Promise<void> => {
    await db
      .update(articleTable)
      .set({
        updated_at: now(),
        published_at: null,
      })
      .where(eq(articleTable.slug, slug));
  };
}
