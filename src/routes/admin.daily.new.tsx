import { AdminArticleForm } from "#/components/admin/AdminArticleForm";
import { getNextArticleSeq } from "#/lib/admin/articleServerFns";
import { siteConstants } from "#/lib/site/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/daily/new")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("New Daily") },
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

