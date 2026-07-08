import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import TerraceLink from "#/components/TerraceLink";
import TerraceMarkdownRenderer from "#/components/TerraceMarkdownRenderer";
import { applicationContext } from "#/core/config/applicationContext";
import {
	articleDescription,
	articleDisplayTitle,
	formatDate,
} from "#/lib/site/articles";
import { siteConstants } from "#/lib/site/constants";

const getDailyArticle = createServerFn({ method: "GET" })
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		return await applicationContext()
			.get("GetPublishedArticleBySlugUseCase")
			.getBySlug({
				category: "DAILY_ARTICLE",
				slug: data.slug,
			});
	});

export const Route = createFileRoute("/daily_/$year/$month/$day/$slug")({
	loader: async ({ params }) => {
		return await getDailyArticle({ data: { slug: params.slug } });
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? siteConstants.createTitle(articleDisplayTitle(loaderData))
					: siteConstants.createTitle("Daily not found"),
			},
			{
				name: "description",
				content: loaderData ? articleDescription(loaderData, 512) : "",
			},
		],
	}),
	component: DailyArticlePage,
});

function DailyArticlePage() {
	const article = Route.useLoaderData();

	if (!article) {
		return <ArticleNotFound />;
	}

	return (
		<VStack
			as="main"
			className="terrace-suit mx-auto w-full max-w-[32rem] bg-white"
		>
			<Section variant="transparent" padding={0}>
				<VStack className="text-center" hAlign="center" gap={0}>
					<TerraceLink href="" isStandalone variant="articleTitle">
						<Text
							as="span"
							className="terrace-suit terrace-daily-detail-title m-4 block text-base text-black"
						>
							{article.seq ?? "-"}. [{formatDate(article.createdAt, ".")}]{" "}
							{articleDisplayTitle(article)}
						</Text>
					</TerraceLink>
				</VStack>
				<VStack className="px-4 py-1" gap={0}>
					<Section
						variant="transparent"
						padding={0}
						className="daily-content terrace-daily-content"
					>
						<TerraceMarkdownRenderer
							className="terrace-daily-markdown terrace-suit m-4 text-sm leading-[1.8] text-black"
							markdown={article.content ?? ""}
						/>
					</Section>
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
