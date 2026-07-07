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

const getBlogArticle = createServerFn({ method: "GET" })
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    return await applicationContext()
      .get("GetPublishedArticleBySlugUseCase")
      .getBySlug({
        category: "BLOG_ARTICLE",
        slug: data.slug,
      });
  });

export const Route = createFileRoute("/blog/$year/$month/$day/$slug")({
  loader: async ({ params }) => {
    return await getBlogArticle({ data: { slug: params.slug } });
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? articleDisplayTitle(loaderData)
          : "Article not found",
      },
      {
        name: "description",
        content: loaderData ? articleDescription(loaderData, 512) : "",
      },
    ],
  }),
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const article = Route.useLoaderData();

  if (!article) {
    return <ArticleNotFound backHref="/blog" backLabel="Article List" />;
  }

  return (
    <VStack as="main" padding={6} maxWidth={900} width="100%">
      <Section padding={6}>
        <VStack gap={5}>
          <VStack gap={2} hAlign="center">
            <Heading level={1} type="display-2" textWrap="balance">
              {articleDisplayTitle(article)}
            </Heading>
            <Text color="secondary" hasTabularNumbers>
              {formatDate(article.createdAt)}
            </Text>
          </VStack>

          <Markdown contentWidth={760} contentAlign="center" autolink="gfm">
            {article.content ?? ""}
          </Markdown>

          <Link href="/blog" isStandalone>
            Article List
          </Link>
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
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Section padding={6}>
        <VStack gap={3}>
          <Heading level={1}>Article not found</Heading>
          <Text color="secondary">
            The article is missing or not published.
          </Text>
          <Link href={backHref} isStandalone>
            {backLabel}
          </Link>
        </VStack>
      </Section>
    </VStack>
  );
}
