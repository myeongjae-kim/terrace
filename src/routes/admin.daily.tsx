import { AdminArticleTable } from "#/components/admin/AdminArticleTable";
import { listAdminArticles } from "#/lib/admin/articleServerFns";
import { siteConstants } from "#/lib/site/constants";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

function normalizePage(value: unknown) {
	const page = Number(value ?? 1);
	return Number.isInteger(page) && page > 0 ? page : 1;
}

export const Route = createFileRoute("/admin/daily")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("Admin Daily") },
			{ name: "description", content: "Daily 콘텐츠 관리" },
		],
	}),
	validateSearch: (search) => ({
		page: normalizePage(search.page),
	}),
	loaderDeps: ({ search }) => ({ page: search.page }),
	loader: async ({ deps }) =>
		await listAdminArticles({ data: { kind: "daily", page: deps.page } }),
	component: AdminDailyPage,
});

function AdminDailyPage() {
	const { pathname } = useLocation();
	const articles = Route.useLoaderData();

	if (pathname !== "/admin/daily") {
		return <Outlet />;
	}

	return (
		<AdminArticleTable
			kind="daily"
			articles={articles.items}
			page={articles.page}
			totalPages={articles.totalPages}
		/>
	);
}
