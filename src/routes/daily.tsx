import { Heading } from "@astryxdesign/core/Heading";
import { List, ListItem } from "@astryxdesign/core/List";
import { Pagination } from "@astryxdesign/core/Pagination";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { applicationContext } from "#/core/config/applicationContext";
import {
  articleDisplayTitle,
  articlePermalink,
  formatDate,
  normalizePage,
} from "#/lib/site/articles";

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
    meta: [{ title: "Daily" }],
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
  const navigate = Route.useNavigate();

  return (
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Section padding={6}>
        <VStack gap={5}>
          <VStack gap={1}>
            <Text type="label" color="accent">
              Daily
            </Text>
            <Heading level={1}>Daily</Heading>
          </VStack>

          <List density="compact" hasDividers>
            {dailies.items.map((daily) => (
              <ListItem
                key={daily.id}
                href={articlePermalink("/daily", daily)}
                label={`${daily.seq ?? "-"} · ${articleDisplayTitle(daily)}`}
                description={formatDate(daily.createdAt, ".")}
              />
            ))}
            {dailies.items.length === 0 && (
              <ListItem
                label="No daily entries"
                description="Published entries will appear here."
              />
            )}
          </List>

          <Pagination
            page={dailies.page}
            pageSize={pageSize}
            totalPages={dailies.totalPages}
            variant="pages"
            label="Daily pagination"
            onChange={(page) => {
              void navigate({
                search: { page: page === 1 ? undefined : page },
              });
            }}
          />
        </VStack>
      </Section>
    </VStack>
  );
}
