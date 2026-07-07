import { HStack } from "@astryxdesign/core/HStack";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <TopNav
      label="Primary navigation"
      heading={<TopNavHeading heading="TanStack Start" headingHref="/" />}
      startContent={
        <HStack gap={1} wrap="wrap">
          <TopNavItem label="Home" href="/" />
          <TopNavItem label="About" href="/about" />
          <TopNavItem label="Drizzle" href="/demo/drizzle" />
          <TopNavItem label="Query" href="/demo/tanstack-query" />
          <TopNavItem
            label="Docs"
            href="https://tanstack.com/start/latest/docs/framework/react/overview"
          />
        </HStack>
      }
      endContent={<ThemeToggle />}
    />
  );
}
