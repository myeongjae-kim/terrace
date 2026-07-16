import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import Comment from "#/components/Comment";
import TerraceLink from "#/components/TerraceLink";
import TerraceMarkdownRenderer from "#/components/TerraceMarkdownRenderer";
import { articleEditPath } from "#/features/admin/article-management/articleKinds";
import { getOwnerSession } from "#/features/owner-auth/serverFns";
import {
	articleDescription,
	articleDisplayTitle,
	formatDate,
} from "#/features/publishing/articlePresentation";
import { getDailyArticle } from "#/features/publishing/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";

export const Route = createFileRoute("/daily_/$year/$month/$day/$slug")({
	loader: async ({ params }) => {
		const [article, session] = await Promise.all([
			getDailyArticle({ data: { slug: params.slug } }),
			getOwnerSession(),
		]);

		return { article, isLoggedIn: session != null };
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData?.article
					? siteMetadata.createTitle(articleDisplayTitle(loaderData.article))
					: siteMetadata.createTitle("Daily not found"),
			},
			{
				name: "description",
				content: loaderData?.article
					? articleDescription(loaderData.article, 512)
					: "",
			},
		],
	}),
	component: DailyArticlePage,
});

function DailyArticlePage() {
	const { article, isLoggedIn } = Route.useLoaderData();

	if (!article) {
		return <ArticleNotFound />;
	}

	const commentIdentifier = `daily/${formatDate(article.createdAt, "/")}/${article.slug}`;

	return (
		<VStack as="main" className="mx-auto w-full max-w-[32rem] bg-white">
			<Section variant="transparent" padding={0}>
				<VStack className="text-center" hAlign="center" gap={0}>
					<TerraceLink href="" isStandalone variant="articleTitle">
						<Text
							as="span"
							className="terrace-daily-detail-title m-4 block text-base text-black"
						>
							{article.seq ?? "-"}. [{formatDate(article.createdAt, ".")}]{" "}
							{articleDisplayTitle(article)}
						</Text>
					</TerraceLink>
					{!article.publishedAt && (
						<Token label="Draft" color="orange" size="sm" />
					)}
					{isLoggedIn && (
						<TerraceLink
							href={articleEditPath("daily", article.id)}
							isStandalone
							variant="button"
							className="mt-3 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200"
						>
							Edit
						</TerraceLink>
					)}
				</VStack>
				<VStack className="px-4 py-1" gap={0}>
					<Section
						variant="transparent"
						padding={0}
						className="daily-content terrace-daily-content"
					>
						<TerraceMarkdownRenderer
							className="terrace-daily-markdown m-4 text-black"
							markdown={article.content ?? ""}
						/>
					</Section>
					<Comment identifier={commentIdentifier} />
				</VStack>
			</Section>
		</VStack>
	);
}

function ArticleNotFound() {
	return (
		<VStack as="main" className="mx-auto w-full max-w-[32rem] bg-white p-6">
			<Section variant="transparent" padding={0}>
				<Text as="p" className="text-black">
					Daily not found
				</Text>
				<TerraceLink href="/daily" isStandalone>
					Daily List
				</TerraceLink>
			</Section>
		</VStack>
	);
}
