import type { Article } from "#/core/article/domain";

const timeZone = "Asia/Seoul";

export function normalizePage(value: unknown) {
	const page = Number(value ?? 1);

  if (!Number.isInteger(page) || page < 1) {
    return 1;
  }

	return page;
}

function formatDateParts(value: string) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return value.slice(0, 10).split("-");
	}

	const formatted = new Intl.DateTimeFormat("en-CA", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		timeZone,
	}).format(date);

	return formatted.split("-");
}

export function formatDate(
	value: string | null | undefined,
	separator = " / ",
) {
	if (!value) {
		return "";
	}

	return formatDateParts(value).join(separator);
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
