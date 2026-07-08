import TerraceLink from "#/components/TerraceLink";
import TerracePagination from "#/components/TerracePagination";
import { applicationContext } from "#/core/config/applicationContext";
import {
	articleDisplayTitle,
	articlePermalink,
	formatDate,
	normalizePage,
} from "#/lib/site/articles";
import { siteConstants } from "#/lib/site/constants";
import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const pageSize = 10;

const listBlogArticles = createServerFn({ method: "GET" })
	.validator((data: { page: number }) => data)
	.handler(async ({ data }) => {
		const page = normalizePage(data.page);
		const articles = await applicationContext()
			.get("ListPublishedArticlesUseCase")
			.list({
				category: "BLOG_ARTICLE",
				limit: pageSize,
				offset: (page - 1) * pageSize,
			});

		return { ...articles, page };
	});

export const Route = createFileRoute("/blog")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("Blog") },
			{ name: "description", content: "글 목록" },
		],
	}),
	validateSearch: (search) => ({
		page: search.page == null ? undefined : normalizePage(search.page),
	}),
	loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
	loader: async ({ deps }) => await listBlogArticles({ data: deps }),
	component: BlogPage,
});

function BlogPage() {
	const articles = Route.useLoaderData();

	return (
		<VStack
			as="main"
			className="flex grow flex-col items-center justify-between bg-white"
			hAlign="center"
		>
			<Section variant="transparent" padding={0} className="contents">
				<Heading
					level={1}
					className="terrace-page-header text-center text-black"
				>
					Articles
				</Heading>
				<VStack className="-mt-3 grow" hAlign="center" gap={0}>
					{articles.items.map((article) => (
						<TerraceLink
							key={article.id}
							href={articlePermalink("/blog", article)}
							isStandalone
							variant="blogList"
							className="my-2 block max-w-2xl py-3 px-6 text-center"
						>
							<Text
								as="span"
								className="terrace-blog-title block text-base"
							>
								{articleDisplayTitle(article)}
							</Text>
							<Text
								as="span"
								className="terrace-blog-date block text-base text-black"
							>
								{formatDate(article.createdAt)}
							</Text>
						</TerraceLink>
					))}
					{articles.items.length === 0 && (
						<Text className="p-3 text-center text-gray-500">
							Published articles will appear here.
						</Text>
					)}
				</VStack>
				<TerracePagination
					currentPage={articles.page}
					totalPages={articles.totalPages}
					createHref={(pageNumber) =>
						pageNumber === 1 ? "/blog" : `/blog?page=${pageNumber}`
					}
				/>
			</Section>
		</VStack>
	);
}
