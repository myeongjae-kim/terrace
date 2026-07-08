import type { Article, ArticleCategory } from "#/core/article/domain";

export interface GetArticleBySlugUseCase {
	getBySlug(input: {
		category: ArticleCategory;
		slug: string;
	}): Promise<Article | null>;
}

