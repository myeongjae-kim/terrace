import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { Markdown } from "@astryxdesign/core/Markdown";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { applicationContext } from "#/core/config/applicationContext";
import {
  articleDescription,
  articleDisplayTitle,
  formatDate,
} from "#/lib/site/articles";

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

export const Route = createFileRoute("/daily/$year/$month/$day/$slug")({
  loader: async ({ params }) => {
    return await getDailyArticle({ data: { slug: params.slug } });
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? articleDisplayTitle(loaderData) : "Daily not found",
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
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Section padding={6}>
        <VStack gap={5}>
          <VStack gap={2} hAlign="center">
            <Text type="label" color="accent" hasTabularNumbers>
              {article.seq ?? "-"} · {formatDate(article.createdAt, ".")}
            </Text>
            <Heading level={1} textWrap="balance">
              {articleDisplayTitle(article)}
            </Heading>
          </VStack>

          <Markdown contentWidth={640} contentAlign="center" autolink="gfm">
            {article.content ?? ""}
          </Markdown>

          <Link href="/daily" isStandalone>
            Daily List
          </Link>
        </VStack>
      </Section>
    </VStack>
  );
}

function ArticleNotFound() {
  return (
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Section padding={6}>
        <VStack gap={3}>
          <Heading level={1}>Daily not found</Heading>
          <Text color="secondary">The entry is missing or not published.</Text>
          <Link href="/daily" isStandalone>
            Daily List
          </Link>
        </VStack>
      </Section>
    </VStack>
  );
}
