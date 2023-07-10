import { Metadata } from 'next';
import { createTitle } from '@/app/common/domain/model/constants';
import * as R from 'ramda';

export const createMetadata = (metadata: Metadata = {}): Metadata =>
  R.mergeDeepLeft<Metadata, Metadata>(metadata, {
    // https://realfavicongenerator.net
    title: createTitle('').trim(),
    icons: {
      icon: [
        {
          url: '/favicon-32x32.png',
          type: 'image/png',
          sizes: '32x32',
        },
        {
          url: '/favicon-16x16.png',
          type: 'image/png',
          sizes: '16x16',
        },
      ],
      apple: {
        sizes: '180x180',
        url: '/apple-touch-icon.png',
      },
    },
    themeColor: '#ffffff',
    manifest: '/site.webmanifest',
    twitter: {
      creatorId: '@myeongjae_kim',
      site: '@myeongjae_kim',
      images: [
        {
          url: 'https://cdn.myeongjae.kim/blog/default-thumbnail.png',
          width: 400,
          height: 400,
          alt: '김명재, Myeongjae Kim',
        },
      ],
    },
    openGraph: {
      locale: 'ko_KR',
      url: 'https://myeongjae.kim',
      title: '김명재, Myeongjae Kim',
      images: [
        {
          url: 'https://cdn.myeongjae.kim/blog/default-thumbnail.png',
          width: 400,
          height: 400,
          alt: '김명재, Myeongjae Kim',
        },
      ],
    },
  }) as Metadata;
