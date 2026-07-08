import { logoutOwner } from "#/lib/auth/serverFns";
import { AppShell } from "@astryxdesign/core/AppShell";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import {
	SideNav,
	SideNavHeading,
	SideNavItem,
	SideNavSection,
} from "@astryxdesign/core/SideNav";
import { TopNav, TopNavHeading, TopNavItem } from "@astryxdesign/core/TopNav";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import type { ReactNode } from "react";

export function AdminShell({ children }: { children: ReactNode }) {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const isBlog = pathname.startsWith("/admin/blog");
	const isDaily = pathname.startsWith("/admin/daily");

	return (
		<AppShell
			height="fill"
			variant="section"
			contentPadding={0}
			topNav={
				<TopNav
					label="Admin top navigation"
					heading={
						<TopNavHeading
							heading="Terrace Admin"
							subheading="Content desk"
							headingHref="/admin/blog"
						/>
					}
					startContent={
						<HStack gap={1}>
							<TopNavItem
								label="Blog"
								href="/admin/blog"
								isSelected={isBlog}
							/>
							<TopNavItem
								label="Daily"
								href="/admin/daily"
								isSelected={isDaily}
							/>
							<TopNavItem label="Site" href="/" />
						</HStack>
					}
					endContent={
						<Button
							label="Logout"
							variant="ghost"
							size="sm"
							icon={<LogOut size={16} />}
							clickAction={async () => {
								await logoutOwner();
								await navigate({ to: "/" });
							}}
						/>
					}
				/>
			}
			sideNav={
				<SideNav
					header={
						<SideNavHeading
							heading="Content"
							superheading="Terrace"
							subheading="Blog and Daily"
							headingHref="/admin/blog"
						/>
					}
					collapsible
				>
					<SideNavSection title="Manage">
						<SideNavItem
							label="Blog"
							href="/admin/blog"
							icon="viewColumns"
							selectedIcon="viewColumns"
							isSelected={isBlog}
						/>
						<SideNavItem
							label="Daily"
							href="/admin/daily"
							icon="calendar"
							selectedIcon="calendar"
							isSelected={isDaily}
						/>
					</SideNavSection>
					<SideNavSection title="Create">
						<SideNavItem label="New blog" href="/admin/blog/new" icon="copy" />
						<SideNavItem label="New daily" href="/admin/daily/new" icon="copy" />
					</SideNavSection>
				</SideNav>
			}
		>
			{children}
		</AppShell>
	);
}
