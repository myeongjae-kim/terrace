import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getNextArticleSeq } from "#/features/admin/article-management/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog/new")({
	head: () => ({
		meta: [
			{ title: siteMetadata.createTitle("New Blog") },
			{ name: "description", content: "Blog 글 작성" },
		],
	}),
	loader: async () => await getNextArticleSeq({ data: { kind: "blog" } }),
	component: NewBlogPage,
});

function NewBlogPage() {
	const { seq } = Route.useLoaderData();

	return <AdminArticleForm kind="blog" mode="create" nextSeq={seq} />;
}

