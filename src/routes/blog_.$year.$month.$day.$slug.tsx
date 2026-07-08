import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import TerraceLink from "#/components/TerraceLink";
import { TerraceMarkdownRendererContainer } from "#/components/TerraceMarkdownRenderer";
import { applicationContext } from "#/core/config/applicationContext";
import {
	articleDescription,
	articleDisplayTitle,
	articlePermalink,
	formatDate,
} from "#/lib/site/articles";
import { siteConstants } from "#/lib/site/constants";

const getBlogArticle = createServerFn({ method: "GET" })
	.validator((data: { slug: string }) => data)
	.handler(async ({ data }) => {
		const article = await applicationContext()
			.get("GetPublishedArticleBySlugUseCase")
			.getBySlug({
				category: "BLOG_ARTICLE",
				slug: data.slug,
			});

		if (!article) {
			return null;
		}

		const neighbors =
			article.seq == null
				? { previous: null, next: null }
				: await applicationContext()
						.get("GetPublishedArticleNeighborsUseCase")
						.getNeighbors({
							category: "BLOG_ARTICLE",
							seq: article.seq,
						});

		return { article, ...neighbors };
	});

export const Route = createFileRoute("/blog_/$year/$month/$day/$slug")({
	loader: async ({ params }) => {
		return await getBlogArticle({ data: { slug: params.slug } });
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData
					? siteConstants.createTitle(articleDisplayTitle(loaderData.article))
					: siteConstants.createTitle("Article not found"),
			},
			{
				name: "description",
				content: loaderData ? articleDescription(loaderData.article, 512) : "",
			},
		],
	}),
	component: BlogArticlePage,
});

function BlogArticlePage() {
	const loaderData = Route.useLoaderData();

	if (!loaderData) {
		return <ArticleNotFound backHref="/blog" backLabel="Article List" />;
	}

	const { article, next, previous } = loaderData;

	return (
		<VStack
			as="main"
			className="terrace-suit mx-auto w-full max-w-[50rem] bg-white"
		>
			<Section variant="transparent" padding={0}>
				<VStack className="text-center" hAlign="stretch" gap={0}>
					<TerraceLink href="#" isStandalone variant="articleTitle">
						<Heading
							level={1}
							className="terrace-suit m-4 text-[2.5rem] font-thin leading-[1.4] text-black"
						>
							{articleDisplayTitle(article)}
						</Heading>
					</TerraceLink>
					<p className="terrace-blog-article-date cursor-default select-none text-black">
						{formatDate(article.createdAt)}
					</p>
				</VStack>
				<VStack className="m-4" gap={0}>
					<TerraceMarkdownRendererContainer
						className="terrace-markdown terrace-blog-markdown terrace-suit mb-4 leading-[1.8] text-black"
						markdown={article.content ?? ""}
						enableToc
					/>
					<VStack className="text-sm" gap={0}>
						<hr />
						<VStack className="my-4 text-center" hAlign="center" gap={1.5}>
							{next && (
								<>
									<Text as="span" className="select-none text-black">
										Next Article
									</Text>
									<TerraceLink
										href={articlePermalink("/blog", next)}
										isStandalone
										className="terrace-suit"
									>
										{articleDisplayTitle(next)}
									</TerraceLink>
								</>
							)}
							{previous && (
								<>
									<Text as="span" className="select-none text-black">
										Previous Article
									</Text>
									<TerraceLink
										href={articlePermalink("/blog", previous)}
										isStandalone
										className="terrace-suit"
									>
										{articleDisplayTitle(previous)}
									</TerraceLink>
								</>
							)}
						</VStack>
						<hr />
						<VStack className="my-4 flex justify-center" hAlign="center">
							<TerraceLink
								href="/blog"
								isStandalone
								variant="button"
								className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
							>
								Article List
							</TerraceLink>
						</VStack>
					</VStack>
				</VStack>
			</Section>
		</VStack>
	);
}

function ArticleNotFound({
	backHref,
	backLabel,
}: {
	backHref: string;
	backLabel: string;
}) {
	return (
		<VStack as="main" className="mx-auto w-full max-w-[32rem] bg-white p-6">
			<Section variant="transparent" padding={0}>
				<Heading level={1} className="text-black">
					Article not found
				</Heading>
				<Text className="text-gray-500">
					The article is missing or not published.
				</Text>
				<TerraceLink href={backHref} isStandalone>
					{backLabel}
				</TerraceLink>
			</Section>
		</VStack>
	);
}
