import { and, asc, count, desc, eq, gt, isNotNull, lt, max } from "drizzle-orm";
import type { ArticleCommandPort } from "#/core/article/application/port/out/ArticleCommandPort";
import type { ArticleQueryPort } from "#/core/article/application/port/out/ArticleQueryPort";
import type { Article, ArticleId } from "#/core/article/domain";
import type { IsoDateTimeString } from "#/core/common/domain";
import type { PaginatedResult } from "#/core/common/model/Pagination";
import { normalizePagination } from "#/core/common/model/Pagination";
import { db } from "#/db/index";
import { articleTable } from "#/db/schema";

type ArticleRow = typeof articleTable.$inferSelect;
type ArticleInsert = typeof articleTable.$inferInsert;

function toNumericId(id: ArticleId) {
	const numericId = Number(id);

	if (!Number.isInteger(numericId) || numericId <= 0) {
		throw new Error("잘못된 id입니다.");
	}

	return numericId;
}

function toIsoDateTime(value: Date | null) {
	return (value ? value.toISOString() : null) as IsoDateTimeString | null;
}

function toArticle(row: ArticleRow): Article {
	return {
		id: String(row.id) as ArticleId,
		category: row.category,
		seq: row.seq,
		title: row.title,
		slug: row.slug,
		content: row.content,
		createdAt: toIsoDateTime(row.createdAt),
		updatedAt: toIsoDateTime(row.updatedAt),
		publishedAt: toIsoDateTime(row.publishedAt),
		userId: row.userId,
	};
}

export class ArticleDrizzleAdapter
	implements ArticleCommandPort, ArticleQueryPort
{
	async create(input: Parameters<ArticleCommandPort["create"]>[0]) {
		const now = new Date();
		const [row] = await db
			.insert(articleTable)
			.values({
				category: input.category ?? null,
				seq: input.seq ?? null,
				title: input.title ?? null,
				slug: input.slug ?? null,
				content: input.content ?? null,
				createdAt: now,
				updatedAt: now,
				publishedAt: input.publishedAt ?? null,
				userId: input.userId ?? null,
			})
			.returning();

		if (!row) {
			throw new Error("article 생성에 실패했습니다.");
		}

		return toArticle(row);
	}

	async get(input: Parameters<ArticleQueryPort["get"]>[0]) {
		const [row] = await db
			.select()
			.from(articleTable)
			.where(eq(articleTable.id, toNumericId(input.id)))
			.limit(1);

		return row ? toArticle(row) : null;
	}

	async list(
		input?: Parameters<ArticleQueryPort["list"]>[0],
	): Promise<PaginatedResult<Article>> {
		const { limit, offset } = normalizePagination(input);
		const rows = await db
			.select()
			.from(articleTable)
			.orderBy(desc(articleTable.createdAt), desc(articleTable.id))
			.limit(limit + 1)
			.offset(offset);

		return {
			items: rows.slice(0, limit).map(toArticle),
			limit,
			offset,
			hasMore: rows.length > limit,
		};
	}

	async listByCategory(
		input: Parameters<ArticleQueryPort["listByCategory"]>[0],
	): Promise<PaginatedResult<Article>> {
		const { limit, offset } = normalizePagination(input);
		const whereClause = eq(articleTable.category, input.category);
		const [totalRow] = await db
			.select({ count: count() })
			.from(articleTable)
			.where(whereClause);
		const total = totalRow?.count ?? 0;
		const rows = await db
			.select()
			.from(articleTable)
			.where(whereClause)
			.orderBy(desc(articleTable.seq), desc(articleTable.id))
			.limit(limit + 1)
			.offset(offset);

		return {
			items: rows.slice(0, limit).map(toArticle),
			limit,
			offset,
			hasMore: rows.length > limit,
			total,
			totalPages: Math.ceil(total / limit),
		};
	}

	async getBySlug(input: Parameters<ArticleQueryPort["getBySlug"]>[0]) {
		const [row] = await db
			.select()
			.from(articleTable)
			.where(
				and(
					eq(articleTable.category, input.category),
					eq(articleTable.slug, decodeURIComponent(input.slug)),
				),
			)
			.limit(1);

		return row ? toArticle(row) : null;
	}

	async getNextSeq(input: Parameters<ArticleQueryPort["getNextSeq"]>[0]) {
		const [row] = await db
			.select({ value: max(articleTable.seq) })
			.from(articleTable)
			.where(eq(articleTable.category, input.category));

		return (row?.value ?? 0) + 1;
	}

	async listPublished(
		input: Parameters<ArticleQueryPort["listPublished"]>[0],
	): Promise<PaginatedResult<Article>> {
		const { limit, offset } = normalizePagination(input);
		const whereClause = and(
			eq(articleTable.category, input.category),
			isNotNull(articleTable.publishedAt),
		);
		const [totalRow] = await db
			.select({ count: count() })
			.from(articleTable)
			.where(whereClause);
		const total = totalRow?.count ?? 0;
		const rows = await db
			.select()
			.from(articleTable)
			.where(whereClause)
			.orderBy(desc(articleTable.seq), desc(articleTable.id))
			.limit(limit + 1)
			.offset(offset);

		return {
			items: rows.slice(0, limit).map(toArticle),
			limit,
			offset,
			hasMore: rows.length > limit,
			total,
			totalPages: Math.ceil(total / limit),
		};
	}

	async getPublishedBySlug(
		input: Parameters<ArticleQueryPort["getPublishedBySlug"]>[0],
	) {
		const [row] = await db
			.select()
			.from(articleTable)
			.where(
				and(
					eq(articleTable.category, input.category),
					eq(articleTable.slug, decodeURIComponent(input.slug)),
					isNotNull(articleTable.publishedAt),
				),
			)
			.limit(1);

		return row ? toArticle(row) : null;
	}

	async getPublishedNeighbors(
		input: Parameters<ArticleQueryPort["getPublishedNeighbors"]>[0],
	) {
		const publishedInCategory = and(
			eq(articleTable.category, input.category),
			isNotNull(articleTable.publishedAt),
		);
		const [nextRow] = await db
			.select()
			.from(articleTable)
			.where(and(publishedInCategory, gt(articleTable.seq, input.seq)))
			.orderBy(asc(articleTable.seq), asc(articleTable.id))
			.limit(1);
		const [previousRow] = await db
			.select()
			.from(articleTable)
			.where(and(publishedInCategory, lt(articleTable.seq, input.seq)))
			.orderBy(desc(articleTable.seq), desc(articleTable.id))
			.limit(1);

		return {
			previous: previousRow ? toArticle(previousRow) : null,
			next: nextRow ? toArticle(nextRow) : null,
		};
	}

	async update(input: Parameters<ArticleCommandPort["update"]>[0]) {
		const values: Partial<ArticleInsert> = {
			updatedAt: new Date(),
		};

		if ("category" in input.values)
			values.category = input.values.category ?? null;
		if ("seq" in input.values) values.seq = input.values.seq ?? null;
		if ("title" in input.values) values.title = input.values.title ?? null;
		if ("slug" in input.values) values.slug = input.values.slug ?? null;
		if ("content" in input.values)
			values.content = input.values.content ?? null;
		if ("publishedAt" in input.values) {
			values.publishedAt = input.values.publishedAt ?? null;
		}
		if ("userId" in input.values) values.userId = input.values.userId ?? null;

		const [row] = await db
			.update(articleTable)
			.set(values)
			.where(eq(articleTable.id, toNumericId(input.id)))
			.returning();

		return row ? toArticle(row) : null;
	}

	async delete(input: Parameters<ArticleCommandPort["delete"]>[0]) {
		const rows = await db
			.delete(articleTable)
			.where(eq(articleTable.id, toNumericId(input.id)))
			.returning({ id: articleTable.id });

		return rows.length > 0;
	}
}
