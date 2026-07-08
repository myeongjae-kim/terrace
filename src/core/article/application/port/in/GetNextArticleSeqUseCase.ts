import type { ArticleCategory } from "#/core/article/domain";

export interface GetNextArticleSeqUseCase {
	getNextSeq(input: { category: ArticleCategory }): Promise<number>;
}

