import { HStack } from "@astryxdesign/core/HStack";
import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
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

const pageSize = 20;

const listDailyArticles = createServerFn({ method: "GET" })
	.validator((data: { page: number }) => data)
	.handler(async ({ data }) => {
		const page = normalizePage(data.page);
		const articles = await applicationContext()
			.get("ListPublishedArticlesUseCase")
			.list({
				category: "DAILY_ARTICLE",
				limit: pageSize,
				offset: (page - 1) * pageSize,
			});

		return { ...articles, page };
	});

export const Route = createFileRoute("/daily")({
	head: () => ({
		meta: [
			{ title: siteConstants.createTitle("Daily") },
			{ name: "description", content: "글 목록" },
		],
	}),
	validateSearch: (search) => ({
		page: search.page == null ? undefined : normalizePage(search.page),
	}),
	loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
	loader: async ({ deps }) => await listDailyArticles({ data: deps }),
	component: DailyPage,
});

function DailyPage() {
	const dailies = Route.useLoaderData();

	return (
		<VStack
			as="main"
			className="flex grow flex-col items-center justify-between bg-white"
			hAlign="center"
		>
			<Section variant="transparent" padding={0} className="contents">
				<Heading
					level={1}
					className="terrace-page-header terrace-suit-heading text-center text-black"
				>
					Daily
				</Heading>
				<VStack className="flex grow flex-col items-center" hAlign="center">
					<VStack
						className="my-2 flex grow flex-col gap-0.5 text-[15px]"
						gap={0}
						hAlign="center"
					>
						{dailies.items.map((daily) => (
							<TerraceLink
								key={daily.id}
								href={articlePermalink("/daily", daily)}
								isStandalone
								variant="dailyList"
							>
								<HStack className="flex" gap={0}>
									<Text
										as="span"
										className="terrace-daily-list-index w-8 text-right"
									>
										{daily.seq ?? "-"}.
									</Text>
									<Text as="span" className="terrace-daily-list-date">
										[{formatDate(daily.createdAt, ".")}]
									</Text>
									<Text
										as="span"
										className="terrace-daily-list-title w-56 pl-1 text-[0.9rem]"
									>
										{articleDisplayTitle(daily)}
									</Text>
								</HStack>
							</TerraceLink>
						))}
						{dailies.items.length === 0 && (
							<Text className="p-3 text-center text-gray-500">
								Published entries will appear here.
							</Text>
						)}
					</VStack>
					<TerracePagination
						currentPage={dailies.page}
						totalPages={dailies.totalPages}
						createHref={(pageNumber) =>
							pageNumber === 1 ? "/daily" : `/daily?page=${pageNumber}`
						}
					/>
				</VStack>
			</Section>
		</VStack>
	);
}
