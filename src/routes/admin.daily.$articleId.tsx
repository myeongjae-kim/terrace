import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getAdminArticle } from "#/features/admin/article-management/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/daily/$articleId")({
	head: () => ({
		meta: [
			{ title: siteMetadata.createTitle("Edit Daily") },
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

