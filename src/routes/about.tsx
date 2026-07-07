import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <VStack as="main" padding={6} maxWidth={900} width="100%">
      <Section padding={8}>
        <VStack gap={3} maxWidth={720}>
          <Text type="label" color="accent">
            About
          </Text>
          <Heading level={1} type="display-2" textWrap="balance">
            A small starter with room to grow.
          </Heading>
          <Text type="large" color="secondary" textWrap="pretty">
            TanStack Start gives you type-safe routing, server functions, and
            modern SSR defaults. This project now uses Astryx for its interface
            frame, theme tokens, and accessible component patterns.
          </Text>
        </VStack>
      </Section>
    </VStack>
  );
}
