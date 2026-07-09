import type { ArticleCategory } from "#/core/article/domain";

export type AdminArticleKind = "blog" | "daily";

export const adminArticleKinds = ["blog", "daily"] as const;

export function articleKindToCategory(kind: AdminArticleKind): ArticleCategory {
	return kind === "blog" ? "BLOG_ARTICLE" : "DAILY_ARTICLE";
}

export function categoryToArticleKind(
	category: ArticleCategory | string | null,
): AdminArticleKind | null {
	if (category === "BLOG_ARTICLE") return "blog";
	if (category === "DAILY_ARTICLE") return "daily";
	return null;
}

export function articleKindLabel(kind: AdminArticleKind) {
	return kind === "blog" ? "Blog" : "Daily";
}

export function articleKindListPath(kind: AdminArticleKind) {
	return `/admin/${kind}`;
}

export function articleKindNewPath(kind: AdminArticleKind) {
	return `/admin/${kind}/new`;
}

export function articleEditPath(kind: AdminArticleKind, id: string) {
	return `/admin/${kind}/${id}`;
}

