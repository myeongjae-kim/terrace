import { Blockquote } from "@astryxdesign/core/Blockquote";
import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { applicationContext } from "#/core/config/applicationContext";

const listMusings = createServerFn({ method: "GET" }).handler(async () => {
  return await applicationContext()
    .get("ListPublishedMusingsUseCase")
    .list({ limit: 100, offset: 0 });
});

export const Route = createFileRoute("/musings")({
  head: () => ({
    meta: [{ title: "Musings" }],
  }),
  loader: async () => await listMusings(),
  component: MusingsPage,
});

function MusingsPage() {
  const musings = Route.useLoaderData();

  return (
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Section padding={6}>
        <VStack gap={5}>
          <VStack gap={1} hAlign="center">
            <Text type="label" color="accent">
              Musings
            </Text>
            <Heading level={1}>Quotes</Heading>
          </VStack>

          <VStack gap={4}>
            {musings.items.map((musing) => (
              <Blockquote key={musing.id} cite={musing.from ?? undefined}>
                {musing.quote ?? ""}
              </Blockquote>
            ))}
            {musings.items.length === 0 && (
              <Text color="secondary" justify="center">
                Published musings will appear here.
              </Text>
            )}
          </VStack>
        </VStack>
      </Section>
    </VStack>
  );
}
