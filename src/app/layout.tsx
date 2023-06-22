import './globals.css';
import React from 'react';
import HeaderButton from '@/app/common/components/HeaderButton';
import Link from 'next/link';
import { Inconsolata } from 'next/font/google';
import clsx from 'clsx';
import CategoryButton from '@/app/common/components/CategoryButton';
import localFont from 'next/font/local';

const suit = localFont({ src: './SUIT-Variable.woff2' });
const inconsolata = Inconsolata({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={suit.className}>
        <header>
          <div className={'mb-2 mt-6 flex justify-center sm:mb-6 sm:mt-10'}>
            <div>
              <Link href="/">
                <HeaderButton className={clsx(inconsolata.className, 'uppercase tracking-[3px]')}>
                  Myeongjae Kim
                </HeaderButton>
              </Link>
            </div>
          </div>
          <div className={'flex justify-center'}>
            <nav className={clsx(inconsolata.className, 'text-sm')}>
              <Link href="/about">
                <CategoryButton>About</CategoryButton>
              </Link>
              <Link href="/blog">
                <CategoryButton>Blog</CategoryButton>
              </Link>
              <Link href="/daily">
                <CategoryButton>Daily</CategoryButton>
              </Link>
              <Link href="/musings">
                <CategoryButton>Musings</CategoryButton>
              </Link>
              <Link href="/places">
                <CategoryButton>Places</CategoryButton>
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
