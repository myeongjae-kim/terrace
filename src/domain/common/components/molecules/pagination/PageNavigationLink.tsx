import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import React from 'react';
import { match } from 'ts-pattern';

const PageNavigationLink = ({
  disabled,
  ...props
}: React.ComponentProps<typeof Link> & {
  direction: 'prev' | 'next';
  disabled?: boolean;
}) => {
  const className = clsx(
    'flex h-8 items-center justify-center bg-white px-3 leading-tight text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    {
      ['hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white']:
        !disabled,
      ['cursor-default opacity-10']: disabled,
      ['rounded-r-lg']: props.direction === 'next',
      ['rounded-l-lg']: props.direction === 'prev',
    },
  );
  const style = { color: disabled ? 'initial' : undefined };

  return match(disabled)
    .with(true, () => (
      <div className={className} style={style}>
        {props.children as React.ReactNode}
      </div>
    ))
    .otherwise(() => <Link className={className} style={style} {...props} />);
};

export default PageNavigationLink;
