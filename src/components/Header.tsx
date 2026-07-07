import { HStack } from "@astryxdesign/core/HStack";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <TopNav
      label="Primary navigation"
      heading={<TopNavHeading heading="Myeongjae Kim" headingHref="/" />}
      startContent={
        <HStack gap={1} wrap="wrap">
          <TopNavItem label="Home" href="/" />
          <TopNavItem label="Blog" href="/blog" />
          <TopNavItem label="Daily" href="/daily" />
          <TopNavItem label="Musings" href="/musings" />
        </HStack>
      }
      endContent={<ThemeToggle />}
    />
  );
}
