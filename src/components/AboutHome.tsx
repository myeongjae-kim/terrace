import { Avatar } from "@astryxdesign/core/Avatar";
import { Heading } from "@astryxdesign/core/Heading";
import { Link } from "@astryxdesign/core/Link";
import { List, ListItem } from "@astryxdesign/core/List";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { aboutProfile } from "#/lib/site/about";

export default function AboutHome() {
  return (
    <VStack as="main" padding={6} maxWidth={760} width="100%">
      <Section padding={8}>
        <VStack gap={5} hAlign="center">
          <Avatar
            src={aboutProfile.profile}
            name={aboutProfile.name.en}
            alt={`${aboutProfile.name.en} profile image`}
            size={180}
          />
          <VStack gap={1} hAlign="center">
            <Heading level={1} type="display-2" textWrap="balance">
              {aboutProfile.name.en}
            </Heading>
            <Text color="secondary">{aboutProfile.name.kr}</Text>
          </VStack>
          <List density="compact">
            {aboutProfile.descriptions.map((description) => (
              <ListItem
                key={description.label}
                label={
                  description.href ? (
                    <Link
                      href={description.href}
                      isExternalLink={description.isExternal}
                      type="inherit"
                    >
                      {description.label}
                    </Link>
                  ) : (
                    description.label
                  )
                }
              />
            ))}
          </List>
        </VStack>
      </Section>
    </VStack>
  );
}
