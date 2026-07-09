import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getAdminArticle } from "#/features/admin/article-management/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog/$articleId")({
	head: () => ({
		meta: [
			{ title: siteMetadata.createTitle("Edit Blog") },
			{ name: "description", content: "Blog 글 수정" },
		],
	}),
	loader: async ({ params }) =>
		await getAdminArticle({
			data: { kind: "blog", id: params.articleId },
		}),
	component: EditBlogPage,
});

function EditBlogPage() {
	const article = Route.useLoaderData();

	return <AdminArticleForm kind="blog" mode="edit" initialArticle={article} />;
}

