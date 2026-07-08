import type { ReactNode } from "react";

export type AboutDescription = {
	readonly icon: string;
	readonly label: string;
	readonly href?: string;
	readonly isExternal?: boolean;
};

export type AboutProfile = {
  readonly profile: string;
  readonly name: {
    readonly en: string;
    readonly kr: string;
  };
  readonly descriptions: readonly AboutDescription[];
};

export const aboutProfile: AboutProfile = {
  profile:
    "https://s.gravatar.com/avatar/4e9916981adb804e1db438874e3789c6?s=400",
  name: {
    en: "Myeongjae Kim",
    kr: "김명재",
  },
	descriptions: [
		{
			icon: "emoji_people",
			label: "Programmer",
		},
		{
			icon: "room",
			label: "Seoul, Korea",
			href: "/places",
		},
		{
			icon: "developer_board",
			label: "Résumé",
			href: "https://myeongjae.wiki/notes/4-%EC%9D%B4%EB%A0%A5%EC%84%9C",
			isExternal: true,
		},
		{
			icon: "code",
			label: "github/myeongjae-kim",
			href: "https://github.com/myeongjae-kim",
			isExternal: true,
		},
		{
			icon: "email",
			label: "dev@myeongjae.kim",
			href: "mailto:dev@myeongjae.kim",
		},
		{
			icon: "create",
			label: "blog.myeongjae.kim",
			href: "https://blog.myeongjae.kim",
      isExternal: true,
    },
  ],
};

export type AboutLinkRenderer = (description: AboutDescription) => ReactNode;
