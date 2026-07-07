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
  articleDescription,
  articleDisplayTitle,
  articlePermalink,
  formatDate,
  normalizePage,
} from "#/lib/site/articles";

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
    meta: [{ title: "Blog" }],
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
  const navigate = Route.useNavigate();

  return (
    <VStack as="main" padding={6} maxWidth={900} width="100%">
      <Section padding={6}>
        <VStack gap={5}>
          <VStack gap={1}>
            <Text type="label" color="accent">
              Blog
            </Text>
            <Heading level={1}>Articles</Heading>
          </VStack>

          <List hasDividers>
            {articles.items.map((article) => (
              <ListItem
                key={article.id}
                href={articlePermalink("/blog", article)}
                label={articleDisplayTitle(article)}
                description={articleDescription(article)}
                endContent={
                  <Text type="supporting" hasTabularNumbers>
                    {formatDate(article.createdAt, ".")}
                  </Text>
                }
              />
            ))}
            {articles.items.length === 0 && (
              <ListItem
                label="No articles"
                description="Published articles will appear here."
              />
            )}
          </List>

          <Pagination
            page={articles.page}
            pageSize={pageSize}
            hasMore={articles.hasMore}
            variant="compact"
            label="Blog pagination"
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
