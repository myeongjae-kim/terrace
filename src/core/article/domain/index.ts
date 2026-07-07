import type { Brand, IsoDateTimeString } from "#/core/common/domain";

export type ArticleId = Brand<string, "ArticleId">;
export type ArticleCategory = "BLOG_ARTICLE" | "DAILY_ARTICLE";

export type Article = {
  readonly id: ArticleId;
  readonly category: ArticleCategory | string | null;
  readonly seq: number | null;
  readonly title: string | null;
  readonly slug: string | null;
  readonly content: string | null;
  readonly createdAt: IsoDateTimeString | null;
  readonly updatedAt: IsoDateTimeString | null;
  readonly publishedAt: IsoDateTimeString | null;
  readonly userId: string | null;
};

export type CreateArticleInput = {
  readonly category?: string | null;
  readonly seq?: number | null;
  readonly title?: string | null;
  readonly slug?: string | null;
  readonly content?: string | null;
  readonly publishedAt?: Date | null;
  readonly userId?: string | null;
};

export type UpdateArticleValues = {
  readonly category?: string | null;
  readonly seq?: number | null;
  readonly title?: string | null;
  readonly slug?: string | null;
  readonly content?: string | null;
  readonly publishedAt?: Date | null;
  readonly userId?: string | null;
};
