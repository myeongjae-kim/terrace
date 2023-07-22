import './globals.css';
import React from 'react';
import HeaderButton from '@/app/common/components/HeaderButton';
import Link from 'next/link';
import clsx from 'clsx';
import { inconsolata } from '@/app/common/fonts/inconsolata';
import { suit } from '@/app/common/fonts/suit';
import CategoriesOnClientContainer from '@/app/common/containers/CategoriesOnClientContainer';
import { Metadata } from 'next';
import { createMetadata } from '@/app/common/domain/model/createMetadata';
import ClientDependencyContainer from '@/app/common/containers/ClientDependencyContainer';
import LoginLogoutButtonContainer from '@/app/auth/logout/containers/LoginLogoutButtonContainer';

export const metadata: Metadata = createMetadata();

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
        <div className={'flex w-full grow justify-center'}>
          <ClientDependencyContainer>
            <div className={'absolute right-4 top-2'}>
              <LoginLogoutButtonContainer />
            </div>
            {children}
          </ClientDependencyContainer>
        </div>
        <footer className={'mt-auto flex justify-center'}>
          <div className={'sticky flex-shrink-0 py-2'}>
            <span className={'select-none text-xs'}>
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
