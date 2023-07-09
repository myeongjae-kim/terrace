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
    },
    {
      icon: 'room',
      label: 'Seoul, Korea',
      href: '/places',
    },
    {
      icon: 'developer_board',
      label: 'Résumé',
      href: '',
    },
    {
      icon: 'code',
      label: 'github/myeongjae-kim',
      href: 'https://github.com/myeongjae-kim',
    },
    {
      icon: 'email',
      label: 'dev@myeongjae.kim',
      href: 'mailto:dev@myeongjae.kim',
    },
    {
      icon: 'create',
      label: 'blog.myeongjae.kim',
      href: 'https://blog.myeongjae.kim',
    },
  ],
} as const;

export type About = typeof about;
