import type { Article } from "#/core/article/domain";

export function normalizePage(value: unknown) {
  const page = Number(value ?? 1);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

export function formatDate(value: string | null | undefined, separator = "-") {
  if (!value) {
    return "";
  }

  return value.slice(0, 10).replaceAll("-", separator);
}

export function articlePermalink(
  basePath: "/blog" | "/daily",
  article: Article,
) {
  const datePath = formatDate(article.createdAt, "/");
  const slug = article.slug ?? String(article.id);

  return `${basePath}/${datePath}/${encodeURIComponent(slug)}`;
}

export function articleDisplayTitle(article: Article) {
  return article.title?.trim() || "Untitled";
}

export function articleDescription(article: Article, length = 180) {
  const content = article.content?.replace(/\s+/g, " ").trim() ?? "";

  if (content.length <= length) {
    return content;
  }

  return `${content.slice(0, length).trim()}...`;
}
