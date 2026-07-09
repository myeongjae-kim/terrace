import { AdminArticleTable } from "#/components/admin/AdminArticleTable";
import { listAdminArticles } from "#/features/admin/article-management/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

function normalizePage(value: unknown) {
	const page = Number(value ?? 1);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

export const Route = createFileRoute("/admin/blog")({
	head: () => ({
		meta: [
			{ title: siteMetadata.createTitle("Admin Blog") },
			{ name: "description", content: "Blog 콘텐츠 관리" },
		],
	}),
	validateSearch: (search) => ({
		page: normalizePage(search.page),
	}),
	loaderDeps: ({ search }) => ({ page: search.page }),
	loader: async ({ deps }) =>
		await listAdminArticles({ data: { kind: "blog", page: deps.page } }),
	component: AdminBlogPage,
});

function AdminBlogPage() {
	const { pathname } = useLocation();
	const articles = Route.useLoaderData();

	if (pathname !== "/admin/blog") {
		return <Outlet />;
	}

	return (
		<AdminArticleTable
			kind="blog"
			articles={articles.items}
			page={articles.page}
			totalPages={articles.totalPages}
		/>
	);
}
