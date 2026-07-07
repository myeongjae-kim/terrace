import { HStack } from "@astryxdesign/core/HStack";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <VStack as="footer" gap={2} padding={6} hAlign="center">
      <Text type="supporting" justify="center">
        &copy; {year} Myeongjae Kim. All rights reserved.
      </Text>
      <HStack gap={2} wrap="wrap" hAlign="center">
        <Link
          href="https://github.com/myeongjae-kim"
          isExternalLink
          isStandalone
        >
          GitHub
        </Link>
        <Link href="mailto:dev@myeongjae.kim" isStandalone>
          Email
        </Link>
      </HStack>
    </VStack>
  );
}
