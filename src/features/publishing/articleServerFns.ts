import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { readOwnerSessionFromCookie } from "#/features/owner-auth/serverFns";
import { getUseCase } from "#/infrastructure/config/getUseCase";
import { normalizePage } from "./articlePresentation";

const blogPageSize = 10;
const dailyPageSize = 20;
const pageSchema = z.object({ page: z.number().int().positive() });
const slugSchema = z.object({ slug: z.string().min(1) });

async function listVisibleArticles(input: {
	category: "BLOG_ARTICLE" | "DAILY_ARTICLE";
	limit: number;
	offset: number;
}) {
	const session = await readOwnerSessionFromCookie();

	if (session) {
		return await getUseCase("ListArticlesByCategoryUseCase").listByCategory(
			input,
		);
	}

	return await getUseCase("ListPublishedArticlesUseCase").list(input);
}

async function getVisibleArticleBySlug(input: {
	category: "BLOG_ARTICLE" | "DAILY_ARTICLE";
	slug: string;
}) {
	const session = await readOwnerSessionFromCookie();

	return session
		? await getUseCase("GetArticleBySlugUseCase").getBySlug(input)
		: await getUseCase("GetPublishedArticleBySlugUseCase").getBySlug(input);
}

export const listBlogArticles = createServerFn({ method: "GET" })
	.validator(pageSchema)
	.handler(async ({ data }) => {
		const page = normalizePage(data.page);
		const articles = await listVisibleArticles({
			category: "BLOG_ARTICLE",
			limit: blogPageSize,
			offset: (page - 1) * blogPageSize,
		});

		return { ...articles, page };
	});

export const listDailyArticles = createServerFn({ method: "GET" })
	.validator(pageSchema)
	.handler(async ({ data }) => {
		const page = normalizePage(data.page);
		const articles = await listVisibleArticles({
			category: "DAILY_ARTICLE",
			limit: dailyPageSize,
			offset: (page - 1) * dailyPageSize,
		});

		return { ...articles, page };
	});

export const getBlogArticle = createServerFn({ method: "GET" })
	.validator(slugSchema)
	.handler(async ({ data }) => {
		const article = await getVisibleArticleBySlug({
			category: "BLOG_ARTICLE",
			slug: data.slug,
		});

		if (!article) {
			return null;
		}

		const neighbors =
			article.seq == null
				? { previous: null, next: null }
				: await getUseCase("GetPublishedArticleNeighborsUseCase").getNeighbors({
						category: "BLOG_ARTICLE",
						seq: article.seq,
					});

		return { article, ...neighbors };
	});

export const getDailyArticle = createServerFn({ method: "GET" })
	.validator(slugSchema)
	.handler(async ({ data }) => {
		return await getVisibleArticleBySlug({
			category: "DAILY_ARTICLE",
			slug: data.slug,
		});
	});
