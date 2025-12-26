export const about = {
  profile: 'https://s.gravatar.com/avatar/4e9916981adb804e1db438874e3789c6?s=400',
  name: {
    en: 'Myeongjae Kim',
    kr: '김명재',
  },
  descriptions: [
    {
      icon: 'emoji_people',
      label: 'Programmer',
      href: '',
      internal: false,
    },
    {
      icon: 'room',
      label: 'Seoul, Korea',
      href: '/places',
      internal: true,
    },
    {
      icon: 'developer_board',
      label: 'Résumé',
      href: 'https://myeongjae.wiki/notes/4-%EC%9D%B4%EB%A0%A5%EC%84%9C',
      internal: false,
    },
    {
      icon: 'code',
      label: 'github/myeongjae-kim',
      href: 'https://github.com/myeongjae-kim',
      internal: false,
    },
    {
      icon: 'email',
      label: 'dev@myeongjae.kim',
      href: 'mailto:dev@myeongjae.kim',
      internal: false,
    },
    {
      icon: 'create',
      label: 'blog.myeongjae.kim',
      href: 'https://blog.myeongjae.kim',
      internal: false,
    },
  ],
} as const;

export type About = typeof about;
