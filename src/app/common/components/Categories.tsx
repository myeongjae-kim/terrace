import React, { type JSX } from 'react';
import clsx from 'clsx';
import { inconsolataLight } from '@/app/common/fonts/inconsolata';
import Link from 'next/link';
import CategoryButton from '@/app/common/components/CategoryButton';

const Categories = ({
  activePath,
  categories,
}: {
  activePath: string;
  categories: string[];
}): JSX.Element => {
  return (
    <nav className={clsx(inconsolataLight.className, 'text-sm')}>
      {categories.map((category) => {
        const href = `/${category}`;
        return (
          <Link key={category} href={href}>
            <CategoryButton
              active={activePath.startsWith(href) || (activePath === '/' && href === '/about')}
            >
              {category}
            </CategoryButton>
          </Link>
        );
      })}
    </nav>
  );
};

export default Categories;
