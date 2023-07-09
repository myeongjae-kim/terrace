'use client';

import React from 'react';
import Categories from '@/app/common/components/Categories';
import { usePathname } from 'next/navigation';

type Props = Omit<React.ComponentProps<typeof Categories>, 'activePath'>;

const CategoriesOnClientContainer = (props: Props): JSX.Element => {
  const activePath = usePathname();
  return <Categories activePath={activePath} {...props} />;
};

export default CategoriesOnClientContainer;
