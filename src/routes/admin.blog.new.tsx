import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getNextArticleSeq } from "#/lib/admin/articleServerFns";
import { siteConstants } from "#/lib/site/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blog/new")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("New Blog") },
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

