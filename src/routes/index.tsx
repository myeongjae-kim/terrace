import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Code } from "@astryxdesign/core/Code";
import { Grid } from "@astryxdesign/core/Grid";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

const features = [
  ["Type-safe routing", "Routes and links stay in sync across every page."],
  [
    "Server functions",
    "Call server code from your UI without creating API boilerplate.",
  ],
  [
    "Streaming by default",
    "Ship progressively rendered responses for faster experiences.",
  ],
  [
    "Astryx interface",
    "Build with a component system, theme tokens, and accessible defaults.",
  ],
] as const;

function App() {
  return (
    <VStack as="main" gap={6} padding={6} maxWidth={1120} width="100%">
      <Section variant="muted" padding={8}>
        <VStack gap={4} maxWidth={760}>
          <Text type="label" color="accent">
            TanStack Start Base Template
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            Start simple, ship quickly.
          </Heading>
          <Text type="large" color="secondary" textWrap="pretty">
            This base starter keeps the frame light: typed routes, server
            functions, API wiring, and Astryx components ready for production
            UI.
          </Text>
          <HStack gap={2} wrap="wrap">
            <Link href="/about" isStandalone>
              About this starter
            </Link>
            <Button
              label="Open router guide"
              variant="secondary"
              size="sm"
              onClick={() =>
                window.open("https://tanstack.com/router", "_blank")
              }
            />
          </HStack>
        </VStack>
      </Section>

      <Grid columns={{ minWidth: 220, max: 4 }} gap={3}>
        {features.map(([title, description]) => (
          <Card key={title} padding={4}>
            <VStack gap={2}>
              <Heading level={2}>{title}</Heading>
              <Text type="supporting">{description}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>

      <Section padding={5}>
        <List
          header={<Heading level={2}>Quick start</Heading>}
          listStyle="disc"
          density="balanced"
        >
          <ListItem
            label="Edit the home page"
            description={
              <Text>
                Customize <Code>src/routes/index.tsx</Code>.
              </Text>
            }
          />
          <ListItem
            label="Update navigation"
            description={
              <Text>
                Change <Code>src/components/Header.tsx</Code> and{" "}
                <Code>src/components/Footer.tsx</Code>.
              </Text>
            }
          />
          <ListItem
            label="Add more routes"
            description={
              <Text>
                Create files in <Code>src/routes</Code> and keep shared UI in
                components.
              </Text>
            }
          />
        </List>
      </Section>
    </VStack>
  );
}
