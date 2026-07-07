import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { List, ListItem } from "@astryxdesign/core/List";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/tanstack-query")({
  component: TanStackQueryDemo,
});

function TanStackQueryDemo() {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      Promise.resolve([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ]),
    initialData: [],
  });

  return (
    <VStack as="main" padding={6} maxWidth={720} width="100%">
      <Card padding={6}>
        <VStack gap={4}>
          <VStack gap={2}>
            <Text type="label" color="accent">
              TanStack Query
            </Text>
            <Heading level={1}>Simple promise handling</Heading>
          </VStack>
          <List header={<Text type="label">Loaded names</Text>} hasDividers>
            {data.map((todo) => (
              <ListItem key={todo.id} label={todo.name} />
            ))}
          </List>
        </VStack>
      </Card>
    </VStack>
  );
}
