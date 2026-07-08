import type { ArticleCategory, ArticleNeighbors } from "#/core/article/domain";

export interface GetPublishedArticleNeighborsUseCase {
	getNeighbors(input: {
		category: ArticleCategory;
		seq: number;
	}): Promise<ArticleNeighbors>;
}
