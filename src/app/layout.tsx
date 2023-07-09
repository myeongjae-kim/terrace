import './globals.css';
import React from 'react';
import HeaderButton from '@/app/common/components/HeaderButton';
import Link from 'next/link';
import clsx from 'clsx';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import { suit } from '@/app/common/fonts/suit';
import CategoriesOnClientContainer from '@/app/common/containers/CategoriesOnClientContainer';
import { Metadata } from 'next';
import { createTitle } from '@/app/common/domain/model/constants';

export const metadata: Metadata = {
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
};

const categories = ['about', 'blog', 'daily', 'musings', 'places'];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={clsx(suit.className, 'flex h-screen flex-col items-center break-keep')}>
        <header className={'select-none'}>
          <div className={'mb-2 mt-6 flex justify-center sm:mb-5 sm:mt-10'}>
            <div>
              <Link href="/">
                <HeaderButton className={clsx(inconsolata.className, 'uppercase tracking-[3px]')}>
                  Myeongjae Kim
                </HeaderButton>
              </Link>
            </div>
          </div>
          <div className={'flex justify-center'}>
            <CategoriesOnClientContainer categories={categories} />
          </div>
        </header>
        <div className={'flex w-full grow justify-center'}>{children}</div>
        <footer className={'mt-auto flex justify-center'}>
          <div className={'sticky flex-shrink-0 py-2'}>
            <span className={'text-xs'}>
              If you like my website, you can copy it from{' '}
              <Link href={'https://github.com/myeongjae-kim/terrace'}>here</Link>.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
