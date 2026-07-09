import type { Article, ArticleId } from "#/core/article/domain";
import {
	type AdminArticleKind,
	articleKindToCategory,
} from "#/lib/admin/articles";
import { createOwnerServerFn } from "#/lib/auth/serverFns";
import { z } from "zod";

const pageSize = 20;

const articleKindSchema = z.enum(["blog", "daily"]);

const articleIdSchema = z.object({
	kind: articleKindSchema,
	id: z.string().min(1),
});

const articleValuesSchema = z.object({
	kind: articleKindSchema,
	seq: z.number().int().positive(),
	title: z.string().trim().min(1).max(255),
	slug: z.string().trim().min(1).max(255),
	content: z.string(),
	isPublished: z.boolean(),
});

async function getApplicationContext() {
	const { applicationContext } = await import("#/core/config/applicationContext");
	return applicationContext();
}

function articleId(id: string) {
	return id as ArticleId;
}

function assertManagedArticle(kind: AdminArticleKind, article: Article | null) {
	if (!article || article.category !== articleKindToCategory(kind)) {
		throw new Error("글을 찾을 수 없습니다.");
	}

	return article;
}

async function assertSlugAvailable(input: {
	kind: AdminArticleKind;
	slug: string;
	excludeId?: string;
}) {
	const category = articleKindToCategory(input.kind);
	const existing = await (await getApplicationContext())
		.get("GetArticleBySlugUseCase")
		.getBySlug({ category, slug: input.slug });

	if (existing && existing.id !== input.excludeId) {
		throw new Error("같은 slug를 사용하는 글이 이미 있습니다.");
	}
}

export const listAdminArticles = createOwnerServerFn({ method: "GET" })
	.validator(
		z.object({
			kind: articleKindSchema,
			page: z.number().int().positive().default(1),
		}),
	)
	.handler(async ({ data }) => {
		const page = data.page;
		const articles = await (await getApplicationContext())
			.get("ListArticlesByCategoryUseCase")
			.listByCategory({
				category: articleKindToCategory(data.kind),
				limit: pageSize,
				offset: (page - 1) * pageSize,
			});

		return { ...articles, page };
	});

export const getAdminArticle = createOwnerServerFn({ method: "GET" })
	.validator(articleIdSchema)
	.handler(async ({ data }) => {
		const article = await (await getApplicationContext())
			.get("GetArticleUseCase")
			.get({ id: articleId(data.id) });

		return assertManagedArticle(data.kind, article);
	});

export const getNextArticleSeq = createOwnerServerFn({ method: "GET" })
	.validator(z.object({ kind: articleKindSchema }))
	.handler(async ({ data }) => {
		const seq = await (await getApplicationContext())
			.get("GetNextArticleSeqUseCase")
			.getNextSeq({ category: articleKindToCategory(data.kind) });

		return { seq };
	});

export const createAdminArticle = createOwnerServerFn({ method: "POST" })
	.validator(articleValuesSchema)
	.handler(async ({ data, context }) => {
		await assertSlugAvailable({ kind: data.kind, slug: data.slug });

		const article = await (await getApplicationContext())
			.get("CreateArticleUseCase")
			.create({
				category: articleKindToCategory(data.kind),
				seq: data.seq,
				title: data.title,
				slug: data.slug,
				content: data.content,
				publishedAt: data.isPublished ? new Date() : null,
				userId: context.session.sub,
			});

		return article;
	});

export const updateAdminArticle = createOwnerServerFn({ method: "POST" })
	.validator(
		articleValuesSchema.extend({
			id: z.string().min(1),
		}),
	)
	.handler(async ({ data, context }) => {
		const current = await (await getApplicationContext())
			.get("GetArticleUseCase")
			.get({ id: articleId(data.id) });
		assertManagedArticle(data.kind, current);
		await assertSlugAvailable({
			kind: data.kind,
			slug: data.slug,
			excludeId: data.id,
		});

		const article = await (await getApplicationContext())
			.get("UpdateArticleUseCase")
			.update({
				id: articleId(data.id),
				values: {
					category: articleKindToCategory(data.kind),
					seq: data.seq,
					title: data.title,
					slug: data.slug,
					content: data.content,
					publishedAt: data.isPublished
						? current?.publishedAt
							? new Date(current.publishedAt)
							: new Date()
						: null,
					userId: context.session.sub,
				},
			});

		return assertManagedArticle(data.kind, article);
	});

export const setArticlePublished = createOwnerServerFn({ method: "POST" })
	.validator(
		articleIdSchema.extend({
			isPublished: z.boolean(),
		}),
	)
	.handler(async ({ data }) => {
		const current = await (await getApplicationContext())
			.get("GetArticleUseCase")
			.get({ id: articleId(data.id) });
		assertManagedArticle(data.kind, current);

		const article = await (await getApplicationContext())
			.get("UpdateArticleUseCase")
			.update({
				id: articleId(data.id),
				values: {
					publishedAt: data.isPublished
						? current?.publishedAt
							? new Date(current.publishedAt)
							: new Date()
						: null,
				},
			});

		return assertManagedArticle(data.kind, article);
	});
