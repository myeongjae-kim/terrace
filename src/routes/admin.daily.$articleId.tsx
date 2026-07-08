import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getAdminArticle } from "#/lib/admin/articleServerFns";
import { siteConstants } from "#/lib/site/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/daily/$articleId")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("Edit Daily") },
			{ name: "description", content: "Daily 글 수정" },
		],
	}),
	loader: async ({ params }) =>
		await getAdminArticle({
			data: { kind: "daily", id: params.articleId },
		}),
	component: EditDailyPage,
});

function EditDailyPage() {
	const article = Route.useLoaderData();

	return <AdminArticleForm kind="daily" mode="edit" initialArticle={article} />;
}

