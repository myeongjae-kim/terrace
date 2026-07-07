import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <VStack as="footer" gap={2} padding={6} hAlign="center">
      <Text type="supporting" justify="center">
        &copy; {year} Your name here. All rights reserved.
      </Text>
      <HStack gap={2} wrap="wrap" hAlign="center">
        <Link href="https://x.com/tan_stack" isExternalLink isStandalone>
          TanStack on X
        </Link>
        <Link href="https://github.com/TanStack" isExternalLink isStandalone>
          TanStack GitHub
        </Link>
      </HStack>
    </VStack>
  );
}
