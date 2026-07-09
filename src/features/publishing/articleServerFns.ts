import { applicationContext } from "#/core/config/applicationContext";
import { createServerFn } from "@tanstack/react-start";
import { normalizePage } from "./articlePresentation";

const blogPageSize = 10;
const dailyPageSize = 20;

export const listBlogArticles = createServerFn({ method: "GET" })
	.validator((data: { page: number }) => data)
	.handler(async ({ data }) => {
		const page = normalizePage(data.page);
		const articles = await applicationContext()
			.get("ListPublishedArticlesUseCase")
			.list({
				category: "BLOG_ARTICLE",
				limit: blogPageSize,
				offset: (page - 1) * blogPageSize,
			});

		return { ...articles, page };
	});

export const listDailyArticles = createServerFn({ method: "GET" })
	.validator((data: { page: number }) => data)
	.handler(async ({ data }) => {
		const page = normalizePage(data.page);
		const articles = await applicationContext()
			.get("ListPublishedArticlesUseCase")
			.list({
				category: "DAILY_ARTICLE",
				limit: dailyPageSize,
				offset: (page - 1) * dailyPageSize,
			});

		return { ...articles, page };
	});

export const getBlogArticle = createServerFn({ method: "GET" })
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const article = await applicationContext()
			.get("GetPublishedArticleBySlugUseCase")
			.getBySlug({
				category: "BLOG_ARTICLE",
				slug: data.slug,
			});

		if (!article) {
			return null;
		}

		const neighbors =
			article.seq == null
				? { previous: null, next: null }
				: await applicationContext()
						.get("GetPublishedArticleNeighborsUseCase")
						.getNeighbors({
							category: "BLOG_ARTICLE",
							seq: article.seq,
						});

		return { article, ...neighbors };
	});

export const getDailyArticle = createServerFn({ method: "GET" })
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		return await applicationContext()
			.get("GetPublishedArticleBySlugUseCase")
			.getBySlug({
				category: "DAILY_ARTICLE",
				slug: data.slug,
			});
	});
