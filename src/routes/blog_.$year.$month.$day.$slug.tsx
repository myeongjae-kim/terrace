import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { Token } from "@astryxdesign/core/Token";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import Comment from "#/components/Comment";
import TerraceLink from "#/components/TerraceLink";
import { TerraceMarkdownRendererContainer } from "#/components/TerraceMarkdownRenderer";
import { articleEditPath } from "#/features/admin/article-management/articleKinds";
import { getOwnerSession } from "#/features/owner-auth/serverFns";
import {
	articleDescription,
	articleDisplayTitle,
	articlePermalink,
	formatDate,
} from "#/features/publishing/articlePresentation";
import { getBlogArticle } from "#/features/publishing/articleServerFns";
import { siteMetadata } from "#/features/site/siteMetadata";

export const Route = createFileRoute("/blog_/$year/$month/$day/$slug")({
	loader: async ({ params }) => {
		const [articleData, session] = await Promise.all([
			getBlogArticle({ data: { slug: params.slug } }),
			getOwnerSession(),
		]);

		return { articleData, isLoggedIn: session != null };
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title: loaderData?.articleData
					? siteMetadata.createTitle(
							articleDisplayTitle(loaderData.articleData.article),
						)
					: siteMetadata.createTitle("Article not found"),
			},
			{
				name: "description",
				content: loaderData?.articleData
					? articleDescription(loaderData.articleData.article, 512)
					: "",
			},
		],
	}),
	component: BlogArticlePage,
});

function BlogArticlePage() {
	const { articleData: loaderData, isLoggedIn } = Route.useLoaderData();

	if (!loaderData) {
		return <ArticleNotFound backHref="/blog" backLabel="Article List" />;
	}

	const { article, next, previous } = loaderData;
	const commentIdentifier = `blog/${formatDate(article.createdAt, "/")}/${article.slug}`;

	return (
		<VStack as="main" className="mx-auto w-full max-w-[50rem] bg-white">
			<Section variant="transparent" padding={0}>
				<VStack className="text-center" hAlign="stretch" gap={0}>
					<TerraceLink
						href="#"
						isStandalone
						variant="articleTitle"
						className="justify-center"
					>
						<Heading
							level={1}
							className="m-4 text-[2.5rem] font-thin leading-[1.4] text-black"
						>
							{articleDisplayTitle(article)}
						</Heading>
					</TerraceLink>
					<p className="terrace-blog-article-date cursor-default select-none text-black">
						{formatDate(article.createdAt)}
					</p>
					{!article.publishedAt && (
						<Token label="Draft" color="orange" size="sm" />
					)}
					{isLoggedIn && (
						<TerraceLink
							href={articleEditPath("blog", article.id)}
							isStandalone
							variant="button"
							className="mt-3 w-fit self-center rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200"
						>
							Edit
						</TerraceLink>
					)}
				</VStack>
				<VStack className="m-4" gap={0}>
					<TerraceMarkdownRendererContainer
						className="terrace-markdown terrace-blog-markdown mb-4 leading-[1.8] text-black"
						markdown={article.content ?? ""}
						enableToc
					/>
					<VStack className="terrace-article-neighbors text-sm" gap={0}>
						<hr />
						<VStack className="my-4 text-center" hAlign="center" gap={1.5}>
							{next && (
								<>
									<Text
										as="span"
										className="terrace-article-neighbor-label select-none text-black"
									>
										Next Article
									</Text>
									<TerraceLink
										href={articlePermalink("/blog", next)}
										isStandalone
										className="terrace-article-neighbor-link"
									>
										{articleDisplayTitle(next)}
									</TerraceLink>
								</>
							)}
							{previous && (
								<>
									<Text
										as="span"
										className="terrace-article-neighbor-label select-none text-black"
									>
										Previous Article
									</Text>
									<TerraceLink
										href={articlePermalink("/blog", previous)}
										isStandalone
										className="terrace-article-neighbor-link"
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
					<Comment identifier={commentIdentifier} />
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
