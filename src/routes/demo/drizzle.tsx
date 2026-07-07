import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Code } from "@astryxdesign/core/Code";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { List, ListItem } from "@astryxdesign/core/List";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import { useState } from "react";
import { db } from "#/db/index";
import { articleTable } from "#/db/schema";

const getArticles = createServerFn({
  method: "GET",
}).handler(async () => {
  return await db
    .select()
    .from(articleTable)
    .orderBy(desc(articleTable.createdAt));
});

const createArticle = createServerFn({
  method: "POST",
})
  .inputValidator((data: { title: string }) => data)
  .handler(async ({ data }) => {
    await db.insert(articleTable).values({ title: data.title });
    return { success: true };
  });

export const Route = createFileRoute("/demo/drizzle")({
  component: DemoDrizzle,
  loader: async () => await getArticles(),
});

function DemoDrizzle() {
  const router = useRouter();
  const articles = Route.useLoaderData();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await createArticle({ data: { title: title.trim() } });
      await router.invalidate();
      setTitle("");
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  };

  return (
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Card padding={6}>
        <VStack gap={5}>
          <HStack gap={3} hAlign="start">
            <Card padding={2} width={56} height={56}>
              <img
                src="/drizzle.svg"
                alt="Drizzle logo"
                width="32"
                height="32"
              />
            </Card>
            <VStack gap={1}>
              <Text type="label" color="accent">
                Database
              </Text>
              <Heading level={1}>Drizzle Demo</Heading>
            </VStack>
          </HStack>

          <List header={<Heading level={2}>Articles</Heading>} hasDividers>
            {articles.map((article) => (
              <ListItem
                key={article.id}
                label={article.title ?? "Untitled article"}
                endContent={
                  <Text type="supporting" hasTabularNumbers>
                    #{article.id}
                  </Text>
                }
              />
            ))}
            {articles.length === 0 && (
              <ListItem
                label="No articles yet"
                description="Create one below."
              />
            )}
          </List>

          <HStack as="form" onSubmit={handleSubmit} gap={2} wrap="wrap">
            <TextInput
              label="Article title"
              value={title}
              onChange={setTitle}
              placeholder="Add a new article..."
            />
            <Button label="Add article" type="submit" variant="primary" />
          </HStack>

          <Card variant="muted" padding={4}>
            <List
              header={<Heading level={2}>Powered by Drizzle ORM</Heading>}
              listStyle="decimal"
            >
              <ListItem
                label="Configure the database"
                description={
                  <Text>
                    Set <Code>DATABASE_URL</Code> in <Code>.env.local</Code>.
                  </Text>
                }
              />
              <ListItem
                label="Generate migrations"
                description={<Code>npx -y drizzle-kit generate</Code>}
              />
              <ListItem
                label="Run migrations"
                description={<Code>npx -y drizzle-kit migrate</Code>}
              />
              <ListItem
                label="Open Studio"
                description={<Code>npx -y drizzle-kit studio</Code>}
              />
            </List>
          </Card>
        </VStack>
      </Card>
    </VStack>
  );
}
