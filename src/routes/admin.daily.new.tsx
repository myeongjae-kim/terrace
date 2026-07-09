import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getNextArticleSeq } from "#/features/admin/article-management/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/daily/new")({
	head: () => ({
		meta: [
			{ title: siteMetadata.createTitle("New Daily") },
			{ name: "description", content: "Daily 글 작성" },
		],
	}),
	loader: async () => await getNextArticleSeq({ data: { kind: "daily" } }),
	component: NewDailyPage,
});

function NewDailyPage() {
	const { seq } = Route.useLoaderData();

	return <AdminArticleForm kind="daily" mode="create" nextSeq={seq} />;
}

